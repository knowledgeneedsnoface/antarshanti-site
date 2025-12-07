"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LightingRig() {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle pulsing ambient light
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = 0.4 + Math.sin(time * 0.5) * 0.05;
    }

    // Gentle directional light animation
    if (directionalLightRef.current) {
      directionalLightRef.current.position.x = 5 + Math.sin(time * 0.2) * 0.5;
      directionalLightRef.current.position.z = 5 + Math.cos(time * 0.2) * 0.5;
    }

    // Warm point lights for temple atmosphere
    if (pointLight1Ref.current) {
      pointLight1Ref.current.intensity = 0.8 + Math.sin(time * 0.7) * 0.1;
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.intensity = 0.6 + Math.sin(time * 0.9) * 0.08;
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight
        ref={ambientLightRef}
        color="#D4AF37"
        intensity={0.4}
      />

      {/* Main directional light (warm temple light) */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 8, 5]}
        color="#F4E4BC"
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Warm point lights for depth */}
      <pointLight
        ref={pointLight1Ref}
        position={[-3, 3, -6]}
        color="#CD853F"
        intensity={0.8}
        distance={12}
        decay={2}
      />

      <pointLight
        ref={pointLight2Ref}
        position={[3, 2.5, -4]}
        color="#DEB887"
        intensity={0.6}
        distance={10}
        decay={2}
      />

      {/* Volumetric rays effect (simulated with spotlights) */}
      <spotLight
        position={[0, 6, -8]}
        target-position={[0, 0, -8]}
        color="#F4E4BC"
        intensity={0.5}
        angle={Math.PI / 6}
        penumbra={0.5}
        distance={15}
        decay={1}
      />

      <spotLight
        position={[-2, 5, -6]}
        target-position={[-2, 1, -6]}
        color="#D4AF37"
        intensity={0.3}
        angle={Math.PI / 8}
        penumbra={0.7}
        distance={12}
        decay={1}
      />

      <spotLight
        position={[2, 4, -4]}
        target-position={[2, 1, -4]}
        color="#CD853F"
        intensity={0.4}
        angle={Math.PI / 8}
        penumbra={0.6}
        distance={10}
        decay={1}
      />

      {/* Fog for depth and atmosphere */}
      <fog attach="fog" args={["#2C1810", 8, 25]} />
    </>
  );
}
