'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

function SpinningKnot({ hovered }: { hovered: boolean }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.4;
    mesh.current.rotation.y = t * 0.6;
    mesh.current.rotation.z = t * 0.2;
    if (mat.current) {
      mat.current.emissiveIntensity = hovered ? 1.2 + Math.sin(t * 4) * 0.4 : 0.6 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <TorusKnot ref={mesh} args={[0.7, 0.22, 128, 16, 2, 3]}>
      <meshStandardMaterial
        ref={mat}
        color="#A855F7"
        emissive="#A855F7"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
        wireframe={false}
      />
    </TorusKnot>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null!);
  const geo = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(300);
    for (let i = 0; i < 300; i += 3) {
      pos[i] = (Math.random() - 0.5) * 5;
      pos[i + 1] = (Math.random() - 0.5) * 5;
      pos[i + 2] = (Math.random() - 0.5) * 5;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial color="#EC4899" size={0.025} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function VortexCanvas({ hovered }: { hovered: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 55 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#A855F7" />
      <pointLight position={[-2, -2, -2]} intensity={0.8} color="#EC4899" />
      <SpinningKnot hovered={hovered} />
      <ParticleField />
    </Canvas>
  );
}
