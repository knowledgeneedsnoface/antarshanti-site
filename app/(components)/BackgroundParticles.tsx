import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePerformanceMode } from "./PerformanceManager";

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  spread?: number;
}

function ParticleSystem({
  count = 50,
  color = "#D4AF37",
  size = 0.02,
  speed = 0.5,
  spread = 8
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { isLiteMode } = usePerformanceMode();

  // Reduce count in lite mode
  const finalCount = isLiteMode ? Math.max(5, Math.floor(count * 0.3)) : count;

  const particles = useMemo(() => {
    return Array.from({ length: finalCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        Math.random() * 6 + 1,
        (Math.random() - 0.5) * spread - 8
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.2 + 0.1,
        (Math.random() - 0.5) * 0.1
      ),
      life: Math.random() * Math.PI * 2,
      maxLife: Math.random() * 10 + 5
    }));
  }, [count, spread, finalCount]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Update particle life
      particle.life += 0.016;

      // Reset particle when it gets too old or too high
      if (particle.life > particle.maxLife || particle.position.y > 8) {
        particle.position.set(
          (Math.random() - 0.5) * spread,
          0.5,
          (Math.random() - 0.5) * spread - 8
        );
        particle.velocity.set(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.2 + 0.1,
          (Math.random() - 0.5) * 0.1
        );
        particle.life = 0;
      }

      // Update position
      particle.position.add(
        particle.velocity.clone().multiplyScalar(speed)
      );

      // Add subtle turbulence
      particle.position.x += Math.sin(time * 2 + particle.life) * 0.002;
      particle.position.z += Math.cos(time * 1.5 + particle.life) * 0.002;

      // Set instance matrix
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(
        size * (1 + Math.sin(particle.life * 2) * 0.3)
      );
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, finalCount]}>
      <sphereGeometry args={[size, 8, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

export default function BackgroundParticles() {
  return (
    <>
      {/* Incense smoke particles */}
      <ParticleSystem
        count={80}
        color="#D4AF37"
        size={0.03}
        speed={0.3}
        spread={6}
      />

      {/* Golden dust particles */}
      <ParticleSystem
        count={60}
        color="#F4E4BC"
        size={0.015}
        speed={0.2}
        spread={10}
      />

      {/* Sacred geometry sparkles */}
      <ParticleSystem
        count={40}
        color="#CD853F"
        size={0.008}
        speed={0.1}
        spread={8}
      />
    </>
  );
}
