"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function MandalaGlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create a simple mandala texture (since we don't have the actual asset)
  const mandalaTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const centerX = 256;
    const centerY = 256;
    const radius = 200;

    // Create radial gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, "rgba(212, 175, 55, 0.9)");
    gradient.addColorStop(0.5, "rgba(205, 133, 63, 0.7)");
    gradient.addColorStop(1, "rgba(139, 69, 19, 0.3)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Draw mandala pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;

    // Outer circles
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * (radius * 0.8);
      const y = centerY + Math.sin(angle) * (radius * 0.8);

      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Inner pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1;

    for (let ring = 1; ring <= 3; ring++) {
      const ringRadius = (radius * 0.6) * (ring / 3);

      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.z = time * 0.1;

      // Subtle floating motion
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.05;
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);

      // Opacity pulsing
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group position={[0, 1.8, -12]}>
      {/* Main mandala */}
      <mesh ref={meshRef}>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial
          map={mandalaTexture}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer ring glow */}
      <mesh>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshBasicMaterial
          color="#F4E4BC"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
