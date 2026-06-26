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

// Forces WebGL context loss on unmount so the browser slot is freed immediately
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
      {/* Body — titanium silver */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 4.0, 0.16]} />
        <meshStandardMaterial color="#b0b8c8" roughness={0.08} metalness={0.92} />
      </mesh>
      {/* Inner frame */}
      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[2.0, 3.78, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.04, 0.088]}>
        <planeGeometry args={[1.82, 3.52]} />
        {tex
          ? <meshBasicMaterial map={tex} toneMapped={false} />
          : <meshStandardMaterial color="#0d1117" roughness={0.9} />}
      </mesh>
      {/* Dynamic island */}
      <mesh position={[0, 1.72, 0.092]}>
        <boxGeometry args={[0.38, 0.09, 0.01]} />
        <meshStandardMaterial color="#050508" roughness={0.9} />
      </mesh>
      {/* Home bar */}
      <mesh position={[0, -1.76, 0.092]}>
        <boxGeometry args={[0.5, 0.036, 0.005]} />
        <meshStandardMaterial color="#8892a4" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Camera bump */}
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
      {/* Buttons */}
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

export default function Phone3DViewer({
  app,
  catId,
  onClose,
}: {
  app: RefApp;
  catId: string;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Delay canvas mount by one frame to avoid flash + give browser time to free prior context
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Suppress THREE.Clock deprecation warning from @react-three/fiber internals
  useEffect(() => {
    const orig = console.warn.bind(console);
    console.warn = (...args: unknown[]) => { if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return; orig(...args); };
    return () => { console.warn = orig; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(p => (p + 1) % app.screens.length);
      if (e.key === 'ArrowLeft') setActiveIdx(p => (p - 1 + app.screens.length) % app.screens.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app.screens.length, onClose]);

  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx(p => (p - 1 + app.screens.length) % app.screens.length); }, [app.screens.length]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setActiveIdx(p => (p + 1) % app.screens.length); }, [app.screens.length]);

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}
    >
      <button onClick={prev} style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>

      <div onClick={e => e.stopPropagation()} style={{ width: 340, height: 600, borderRadius: 16, overflow: 'hidden', flexShrink: 0, background: '#0d1117' }}>
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

      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200, maxWidth: 240 }}>
        <div style={{ color: '#fff' }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{app.name}</div>
          {app.developer && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{app.developer}</div>}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Screen {activeIdx + 1} / {app.screens.length}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {app.screens.map((src, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} style={{ width: 44, height: 78, borderRadius: 6, overflow: 'hidden', padding: 0, cursor: 'pointer', border: `2px solid ${i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.15)'}`, transition: 'border-color 0.15s', background: 'none' }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            const a = document.createElement('a');
            a.href = `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(app.id)}`;
            a.download = `${app.id}-reference.zip`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
          }}
          style={{ padding: '10px 0', background: '#3b82f6', color: '#fff', border: 0, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          ⬇ Download Images + Claude Prompt
        </button>
        <button onClick={onClose} style={{ padding: '8px 0', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 12, cursor: 'pointer' }}>✕ Close  (Esc)</button>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>← → arrow keys to navigate</div>
      </div>

      <button onClick={next} style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 22, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
    </div>
  );
}
