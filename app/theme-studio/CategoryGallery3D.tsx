'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface RefCategory {
  id: string;
  label: string;
  appCount: number;
  preview: string | null;
}

const COLS = 5;
const CARD_W = 2.6;
const CARD_H = 3.6;
const SPACING_X = 3.2;
const SPACING_Y = 4.8;

// ── Single floating card ──────────────────────────────────────────────────────

function CategoryCard3D({
  cat,
  index,
  onClick,
  hovered,
  onHover,
}: {
  cat: RefCategory;
  index: number;
  onClick: () => void;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!cat.preview) return;
    const loader = new THREE.TextureLoader();
    loader.load(cat.preview, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      setTex(t);
    });
    return () => { tex?.dispose(); };
  }, [cat.preview]);

  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const offsetX = ((COLS - 1) / 2) * SPACING_X;
  const x = col * SPACING_X - offsetX;
  const y = -row * SPACING_Y + 4;

  const targetScale = hovered ? 1.08 : 1.0;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.12
    );
  });

  return (
    <Float speed={1.1} rotationIntensity={hovered ? 0 : 0.06} floatIntensity={hovered ? 0 : 0.25}>
      <group ref={groupRef} position={[x, y, 0]}>

        {/* Glow border when hovered */}
        {hovered && (
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[CARD_W + 0.1, CARD_H + 0.1, 0.01]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
          </mesh>
        )}

        {/* Card body */}
        <mesh
          onClick={onClick}
          onPointerOver={() => onHover(cat.id)}
          onPointerOut={() => onHover(null)}
        >
          <boxGeometry args={[CARD_W, CARD_H, 0.08]} />
          <meshStandardMaterial
            color={hovered ? '#1a2740' : '#0f1724'}
            roughness={0.25}
            metalness={0.5}
            emissive={hovered ? '#0d1f3c' : '#000'}
            emissiveIntensity={hovered ? 0.6 : 0}
          />
        </mesh>

        {/* Preview image */}
        <mesh
          position={[0, 0.35, 0.05]}
          onClick={onClick}
          onPointerOver={() => onHover(cat.id)}
          onPointerOut={() => onHover(null)}
        >
          <planeGeometry args={[CARD_W - 0.28, CARD_H - 1.4]} />
          {tex ? (
            <meshBasicMaterial map={tex} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#1a2a3a" roughness={0.9} />
          )}
        </mesh>

      </group>
    </Float>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function Scene({
  cats,
  hoveredId,
  onHover,
  onClickCat,
}: {
  cats: RefCategory[];
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClickCat: (cat: RefCategory) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 6]} intensity={1.4} />
      <pointLight position={[-8, -8, -8]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[8, 8, 8]} intensity={0.3} color="#8b5cf6" />

      {cats.map((cat, i) => (
        <CategoryCard3D
          key={cat.id}
          cat={cat}
          index={i}
          onClick={() => onClickCat(cat)}
          hovered={hoveredId === cat.id}
          onHover={onHover}
        />
      ))}
    </>
  );
}

// ── HTML overlay labels ───────────────────────────────────────────────────────

function OverlayLabels({
  cats,
  hoveredId,
  onClickCat,
}: {
  cats: RefCategory[];
  hoveredId: string | null;
  onClickCat: (cat: RefCategory) => void;
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {cats.map((cat, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const leftPct = (col / (COLS - 1)) * 80 + 10;
        const topPct = row * 21.5 + 61;
        const hov = hoveredId === cat.id;
        return (
          <div
            key={cat.id}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => onClickCat(cat)}
          >
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: hov ? '#60a5fa' : '#e2e8f0',
              textShadow: '0 1px 8px rgba(0,0,0,1)',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}>
              {cat.label}
            </div>
            <div style={{
              fontSize: 9,
              color: hov ? '#93c5fd' : '#94a3b8',
              textShadow: '0 1px 6px rgba(0,0,0,1)',
              transition: 'color 0.15s',
            }}>
              {cat.appCount} apps
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CategoryGallery3D({
  cats,
  loading,
  onClickCat,
  themeColors,
}: {
  cats: RefCategory[];
  loading: boolean;
  onClickCat: (cat: RefCategory) => void;
  themeColors: Record<string, string>;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rows = Math.ceil(cats.length / COLS);
  const canvasHeight = Math.max(520, rows * 210 + 80);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: themeColors.ink3 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
        <div style={{ fontSize: 15 }}>Loading categories…</div>
      </div>
    );
  }

  if (cats.length === 0) return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: canvasHeight,
      background: 'linear-gradient(160deg, #060c18 0%, #0c1828 50%, #060c18 100%)',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      <Canvas
        camera={{ position: [0, 3, 17], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
        onPointerMissed={() => setHoveredId(null)}
      >
        <Suspense fallback={null}>
          <Scene
            cats={cats}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onClickCat={onClickCat}
          />
        </Suspense>
      </Canvas>

      <OverlayLabels
        cats={cats}
        hoveredId={hoveredId}
        onClickCat={onClickCat}
      />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
      }} />
    </div>
  );
}
