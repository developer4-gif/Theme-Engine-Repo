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

export default function Phone3DViewer({ app, catId, onClose }: { app: RefApp; catId: string; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  // true = wide layout (phone left + sidebar right), false = tall layout (phone top + strip bottom)
  const [wide, setWide] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

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

  // Suppress THREE.Clock deprecation warnings
  useEffect(() => {
    const orig = console.warn.bind(console);
    console.warn = (...args: unknown[]) => { if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return; orig(...args); };
    return () => { console.warn = orig; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(p => (p + 1) % app.screens.length);
      if (e.key === 'ArrowLeft')  setActiveIdx(p => (p - 1 + app.screens.length) % app.screens.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app.screens.length, onClose]);

  // Scroll active thumbnail into view in the strip
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIdx] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeIdx]);

  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx(p => (p - 1 + app.screens.length) % app.screens.length); }, [app.screens.length]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx(p => (p + 1) % app.screens.length); }, [app.screens.length]);

  const phoneCanvas = (
    <div
      onClick={e => e.stopPropagation()}
      style={{ borderRadius: 16, overflow: 'hidden', background: '#0d1117', flexShrink: 0, ...(wide ? { width: 300, height: 530 } : { width: '100%', maxWidth: 300, height: 420, margin: '0 auto' }) }}
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

  // Horizontal scrollable thumbnail strip (used in both layouts)
  const thumbStrip = (
    <div
      ref={stripRef}
      onClick={e => e.stopPropagation()}
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '6px 4px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) transparent',
        // contain scrolling so nothing bleeds outside
        maxWidth: '100%',
        flexShrink: 0,
      }}
    >
      {app.screens.map((src, i) => (
        <button
          key={i}
          onClick={() => setActiveIdx(i)}
          style={{
            flexShrink: 0,
            width: wide ? 44 : 38,
            height: wide ? 78 : 68,
            borderRadius: 6,
            overflow: 'hidden',
            padding: 0,
            cursor: 'pointer',
            border: `2px solid ${i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.15)'}`,
            transition: 'border-color 0.15s',
            background: 'none',
          }}
        >
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
        </button>
      ))}
    </div>
  );

  const infoAndActions = (
    <div onClick={e => e.stopPropagation()} style={{ color: '#fff', flexShrink: 0 }}>
      <div style={{ fontSize: wide ? 17 : 15, fontWeight: 700, marginBottom: 2 }}>{app.name}</div>
      {app.developer && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{app.developer}</div>}
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
        Screen {activeIdx + 1} / {app.screens.length} · ← → to navigate
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

  // ── Wide layout: [‹] [phone] [sidebar: info + strip] [›] ────────────────────
  if (wide) {
    return (
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '20px 16px', overflow: 'hidden' }}
      >
        <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>

        {phoneCanvas}

        <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 220, maxHeight: '90vh', overflow: 'hidden' }}>
          {infoAndActions}
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: -6 }}>All screens</div>
          {/* Wrap thumbnails so they don't overflow — 3-col grid in sidebar */}
          <div
            ref={stripRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 6,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: 340,
              paddingRight: 4,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent',
            }}
          >
            {app.screens.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: '100%',
                  aspectRatio: '9/16',
                  borderRadius: 6,
                  overflow: 'hidden',
                  padding: 0,
                  cursor: 'pointer',
                  border: `2px solid ${i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.15)'}`,
                  transition: 'border-color 0.15s',
                  background: 'none',
                }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      </div>
    );
  }

  // ── Narrow layout: stacked — phone → nav row → info → horizontal thumb strip ─
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)', zIndex: 500, overflowY: 'auto', overflowX: 'hidden', padding: '16px 12px 32px' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Phone canvas */}
        {phoneCanvas}

        {/* Prev / Next row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <button onClick={prev} style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 20, cursor: 'pointer' }}>‹ Prev</button>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{activeIdx + 1}/{app.screens.length}</span>
          <button onClick={next} style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 20, cursor: 'pointer' }}>Next ›</button>
        </div>

        {/* Info + actions */}
        {infoAndActions}

        {/* Horizontal thumbnail strip */}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>All screens — scroll sideways</div>
        {thumbStrip}
      </div>
    </div>
  );
}
