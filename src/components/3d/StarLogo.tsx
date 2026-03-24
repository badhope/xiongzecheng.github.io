'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import styles from './StarLogo.module.css';

function StarMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const timeRef = useRef(0);

  // Create star shape geometry that morphs between sphere and star
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.5, 64, 64);
    const positions = geo.attributes.position;
    const originalPositions = new Float32Array(positions.array);

    return { geo, originalPositions };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    timeRef.current = time;

    const positions = geometry.geo.attributes.position;
    const original = geometry.originalPositions;

    for (let i = 0; i < positions.count; i++) {
      const ox = original[i * 3];
      const oy = original[i * 3 + 1];
      const oz = original[i * 3 + 2];

      // Convert to spherical coordinates
      const r = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const theta = Math.atan2(Math.sqrt(ox * ox + oz * oz), oy);
      const phi = Math.atan2(oz, ox);

      // Star morph factor: oscillates between 0 (sphere) and 1 (star)
      const morphFactor = (Math.sin(time * 0.5) + 1) / 2;
      
      // Create star-like bumps
      const starFactor = 1 + morphFactor * 0.3 * (
        Math.pow(Math.abs(Math.cos(2.5 * theta + time * 0.3)), 2) +
        Math.pow(Math.abs(Math.sin(2.5 * phi + time * 0.2)), 2) * 0.5
      );

      // Add subtle noise
      const noise = 1 + 0.05 * Math.sin(theta * 8 + time) * Math.cos(phi * 6 + time * 0.7);

      const newR = r * starFactor * noise;

      positions.setXYZ(
        i,
        newR * Math.sin(theta) * Math.cos(phi),
        newR * Math.cos(theta),
        newR * Math.sin(theta) * Math.sin(phi)
      );
    }

    positions.needsUpdate = true;
    geometry.geo.computeVertexNormals();

    // Rotation
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Pulse glow
    if (glowRef.current) {
      const pulse = 2 + Math.sin(time * 2) * 0.5;
      glowRef.current.intensity = pulse;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} geometry={geometry.geo}>
          <MeshDistortMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.15}
            speed={2}
          />
        </mesh>
      </Float>
      <pointLight ref={glowRef} color="#ffd700" intensity={2} distance={10} />
      <ambientLight intensity={0.3} />
    </group>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd700"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface StarLogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export default function StarLogo({ size = 300, className = '', interactive = false }: StarLogoProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <StarMesh />
        <ParticleField />
      </Canvas>
      {interactive && (
        <div className={styles.hint}>
          <span>✦ drag to rotate</span>
        </div>
      )}
    </div>
  );
}
