'use client';

import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface RefApp {
  id: string;
  name: string;
  developer: string;
  icon: string | null;
  screenCount: number;
  screens: string[];
}

function ContextDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      const ext = gl.getContext().getExtension('WEBGL_lose_context');
      ext?.loseContext();
      gl.dispose();
    };
  }, [gl]);
  return null;
}

function PhoneModel({ screens, activeIdx }: { screens: string[]; activeIdx: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const [textures, setTextures] = useState<THREE.Texture[]>([]);

  useEffect(() => {
    if (!screens.length) return;
    const loader = new THREE.TextureLoader();
    const loaded: (THREE.Texture | null)[] = new Array(screens.length).fill(null);
    let done = 0;
    screens.forEach((url, i) => {
      loader.load(url,
        (t) => { t.colorSpace = THREE.SRGBColorSpace; loaded[i] = t; done++; if (done === screens.length) setTextures(loaded.filter(Boolean) as THREE.Texture[]); },
        undefined,
        () => { done++; if (done === screens.length) setTextures(loaded.filter(Boolean) as THREE.Texture[]); }
      );
    });
    return () => { loaded.forEach(t => t?.dispose()); };
  }, [screens.join(',')]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.04;
  });

  const tex = textures[activeIdx] ?? textures[0] ?? null;

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.0, 0.16]} />
        <meshStandardMaterial color="#b0b8c8" roughness={0.08} metalness={0.92} />
      </mesh>
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[2.0, 3.78, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.04, 0.088]}>
        <planeGeometry args={[1.82, 3.52]} />
        {tex
          ? <meshBasicMaterial map={tex} toneMapped={false} />
          : <meshStandardMaterial color="#0d1117" roughness={0.9} />}
      </mesh>
      <mesh position={[0, 1.72, 0.092]}>
        <boxGeometry args={[0.38, 0.09, 0.01]} />
        <meshStandardMaterial color="#050508" roughness={0.9} />
      </mesh>
      <mesh position={[0, -1.76, 0.092]}>
        <boxGeometry args={[0.5, 0.036, 0.005]} />
        <meshStandardMaterial color="#8892a4" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.62, 1.55, -0.1]}>
        <boxGeometry args={[0.72, 0.72, 0.06]} />
        <meshStandardMaterial color="#9aa0ae" roughness={0.05} metalness={0.95} />
      </mesh>
      <mesh position={[-0.72, 1.65, -0.135]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-0.52, 1.65, -0.135]}>
        <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-0.62, 1.45, -0.135]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 24]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.05} metalness={0.9} />
      </mesh>
      <mesh position={[1.112, 0.5, 0]}>
        <boxGeometry args={[0.028, 0.4, 0.1]} />
        <meshStandardMaterial color="#c8d0dc" roughness={0.05} metalness={0.95} />
      </mesh>
      <mesh position={[-1.112, 0.68, 0]}>
        <boxGeometry args={[0.028, 0.28, 0.09]} />
        <meshStandardMaterial color="#c8d0dc" roughness={0.05} metalness={0.95} />
      </mesh>
      <mesh position={[-1.112, 0.28, 0]}>
        <boxGeometry args={[0.028, 0.28, 0.09]} />
        <meshStandardMaterial color="#c8d0dc" roughness={0.05} metalness={0.95} />
      </mesh>
      <mesh position={[-1.112, 1.1, 0]}>
        <boxGeometry args={[0.028, 0.16, 0.09]} />
        <meshStandardMaterial color="#c8d0dc" roughness={0.05} metalness={0.95} />
      </mesh>
      {tex && <pointLight position={[0, 0, 1.8]} intensity={1.8} color="#ffffff" distance={5} />}
      <pointLight position={[-3, 4, 3]} intensity={3.5} color="#e8eeff" distance={12} />
      <pointLight position={[3, -3, 2]} intensity={1.2} color="#ffd580" distance={10} />
    </group>
  );
}

// ─── Swipeable image carousel ─────────────────────────────────────────────────
// Works with touch (finger) and mouse drag on any screen size.
// Each card is the same size, snaps to center, smooth spring animation.

function ImageCarousel({ screens, activeIdx, onChangeIdx }: {
  screens: string[];
  activeIdx: number;
  onChangeIdx: (i: number) => void;
}) {
  const trackRef   = useRef<HTMLDivElement>(null);
  // offset in px — negative = scrolled right
  const [offset, setOffset]   = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart  = useRef(0);   // pointer x at drag start
  const baseOffset = useRef(0);   // offset at drag start
  const CARD_W     = 200;         // px per card
  const GAP        = 16;          // px between cards
  const STEP       = CARD_W + GAP;

  // Snap to activeIdx whenever it changes externally (thumbnail click / keyboard)
  useEffect(() => {
    setOffset(-activeIdx * STEP);
  }, [activeIdx, STEP]);

  const snapToNearest = useCallback((currentOffset: number) => {
    const raw = -currentOffset / STEP;
    const clamped = Math.max(0, Math.min(screens.length - 1, Math.round(raw)));
    onChangeIdx(clamped);
    setOffset(-clamped * STEP);
  }, [screens.length, STEP, onChangeIdx]);

  // ── Pointer events (mouse + touch via pointer events API) ────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current  = e.clientX;
    baseOffset.current = offset;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const delta = e.clientX - dragStart.current;
    // Rubber-band at edges
    let next = baseOffset.current + delta;
    const min = -(screens.length - 1) * STEP;
    if (next > 0)   next = next * 0.25;
    if (next < min) next = min + (next - min) * 0.25;
    setOffset(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const delta = e.clientX - dragStart.current;
    // Flick — if moved more than 40px snap one card in that direction
    if (Math.abs(delta) > 40) {
      const next = delta < 0
        ? Math.min(screens.length - 1, activeIdx + 1)
        : Math.max(0, activeIdx - 1);
      onChangeIdx(next);
      setOffset(-next * STEP);
    } else {
      snapToNearest(offset);
    }
  };

  // ── Wheel (horizontal or vertical) ──────────────────────────────────────────
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (dx > 20)  { const n = Math.min(screens.length - 1, activeIdx + 1); onChangeIdx(n); setOffset(-n * STEP); }
    if (dx < -20) { const n = Math.max(0, activeIdx - 1); onChangeIdx(n); setOffset(-n * STEP); }
  };

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: GAP,
          // Center on first card: shift right by (containerWidth/2 - CARD_W/2)
          // We use a CSS variable trick via padding instead
          paddingLeft: `calc(50% - ${CARD_W / 2}px)`,
          paddingRight: `calc(50% - ${CARD_W / 2}px)`,
          transform: `translateX(${offset}px)`,
          transition: dragging ? 'none' : 'transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'transform',
        }}
      >
        {screens.map((src, i) => {
          const dist = Math.abs(i - activeIdx);
          const scale = dist === 0 ? 1 : dist === 1 ? 0.88 : 0.78;
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.65 : 0.4;
          return (
            <div
              key={i}
              onClick={() => { if (!dragging) onChangeIdx(i); }}
              style={{
                flexShrink: 0,
                width: CARD_W,
                height: Math.round(CARD_W * 16 / 9),   // 9:16 portrait
                borderRadius: 14,
                overflow: 'hidden',
                border: `2px solid ${i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                transform: `scale(${scale})`,
                opacity,
                transition: dragging ? 'opacity 0.1s, transform 0.1s' : 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.25,1,0.5,1), border-color 0.2s',
                cursor: i === activeIdx ? 'default' : 'pointer',
                boxShadow: i === activeIdx ? '0 12px 40px rgba(59,130,246,0.35)' : '0 4px 16px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={src}
                alt={`Screen ${i + 1}`}
                loading="lazy"
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main viewer ──────────────────────────────────────────────────────────────

export default function Phone3DViewer({ app, catId, onClose }: { app: RefApp; catId: string; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted]     = useState(false);
  const [wide, setWide]           = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const check = () => setWide(window.innerWidth >= 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const orig = console.warn.bind(console);
    console.warn = (...args: unknown[]) => { if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return; orig(...args); };
    return () => { console.warn = orig; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(p => Math.min(p + 1, app.screens.length - 1));
      if (e.key === 'ArrowLeft')  setActiveIdx(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app.screens.length, onClose]);

  const phoneCanvas = (
    <div
      onClick={e => e.stopPropagation()}
      style={{ borderRadius: 16, overflow: 'hidden', background: '#0d1117', flexShrink: 0, ...(wide ? { width: 280, height: 500 } : { width: '100%', maxWidth: 280, height: 400, margin: '0 auto' }) }}
    >
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
        >
          <ContextDisposer />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 8, 6]} intensity={2.2} castShadow />
          <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#c8d8ff" />
          <pointLight position={[-4, -4, -4]} intensity={0.8} color="#7c3aed" />
          <Suspense fallback={null}>
            <PhoneModel screens={app.screens} activeIdx={activeIdx} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );

  const infoBlock = (
    <div onClick={e => e.stopPropagation()} style={{ color: '#fff', flexShrink: 0 }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{app.name}</div>
      {app.developer && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{app.developer}</div>}
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>
        {activeIdx + 1} / {app.screens.length} · swipe or drag · ← →
      </div>
      <button
        onClick={() => {
          const a = document.createElement('a');
          a.href = `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(app.id)}`;
          a.download = `${app.id}-reference.zip`;
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
        }}
        style={{ width: '100%', padding: '9px 0', background: '#3b82f6', color: '#fff', border: 0, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}
      >
        ⬇ Download Images + Claude Prompt
      </button>
      <button
        onClick={onClose}
        style={{ width: '100%', padding: '7px 0', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 12, cursor: 'pointer' }}
      >
        ✕ Close (Esc)
      </button>
    </div>
  );

  // Dot indicator
  const dots = (
    <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 200, margin: '0 auto' }}>
      {app.screens.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIdx(i)}
          style={{
            width: i === activeIdx ? 18 : 6,
            height: 6,
            borderRadius: 3,
            background: i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.25)',
            border: 0,
            padding: 0,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );

  // ── Wide layout ──────────────────────────────────────────────────────────────
  if (wide) {
    return (
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        {/* Top row: phone + info */}
        <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 28, padding: '0 24px' }}>
          {phoneCanvas}
          <div style={{ width: 220 }}>
            {infoBlock}
          </div>
        </div>

        {/* Full-width carousel */}
        <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 960 }}>
          <ImageCarousel screens={app.screens} activeIdx={activeIdx} onChangeIdx={setActiveIdx} />
        </div>
        <div style={{ marginTop: 14 }}>{dots}</div>
      </div>
    );
  }

  // ── Narrow layout ────────────────────────────────────────────────────────────
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)', zIndex: 500, overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 440, margin: '0 auto', padding: '16px 12px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {phoneCanvas}

        {/* Carousel */}
        <ImageCarousel screens={app.screens} activeIdx={activeIdx} onChangeIdx={setActiveIdx} />
        {dots}

        {infoBlock}
      </div>
    </div>
  );
}
