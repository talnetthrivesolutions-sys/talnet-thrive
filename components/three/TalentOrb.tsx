"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function TalentOrb() {
  const groupRef = useRef<THREE.Group>(null!);
  const orbRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const { pointer } = useThree();

  const { positions, colors } = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.75 + Math.random() * 0.65;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Gradient from cyan-blue to violet
      const t = Math.random();
      col[i * 3]     = 0.22 + t * 0.45;
      col[i * 3 + 1] = 0.45 + t * 0.15;
      col[i * 3 + 2] = 0.95;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.55,
        0.025
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35,
        0.025
      );
    }

    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 0.45) * 0.07;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.0045;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.003;
      ring2Ref.current.rotation.y += 0.001;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += 0.002;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0012;
      particlesRef.current.rotation.x = Math.sin(t * 0.08) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting rig */}
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 3, 3]}   color="#60a5fa" intensity={4}   distance={18} />
      <pointLight position={[-4, -3, -2]} color="#a78bfa" intensity={2.5} distance={18} />
      <pointLight position={[0, -4, 4]}   color="#06b6d4" intensity={1.8} distance={12} />

      {/* Glowing core sphere */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1, 80, 80]} />
        <MeshDistortMaterial
          color="#1e3a8a"
          emissive="#2563eb"
          emissiveIntensity={0.5}
          distort={0.38}
          speed={1.6}
          roughness={0.12}
          metalness={0.92}
        />
      </mesh>

      {/* Wireframe lattice over the orb */}
      <mesh>
        <sphereGeometry args={[1.03, 28, 28]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Ring 1 — tilted orbital */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.52, 0.013, 16, 120]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.72} />
      </mesh>

      {/* Ring 2 — counter-rotating */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 3.5, 0]}>
        <torusGeometry args={[1.82, 0.009, 16, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.52} />
      </mesh>

      {/* Ring 3 — wide slow equatorial */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.005, 16, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.32} />
      </mesh>

      {/* Particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
        </bufferGeometry>
        <pointsMaterial
          size={0.026}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
