"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Signboard3D({ data, onClick }: any) {
  const ref = useRef<any>(null);
  const tex = useTexture(data.image) as THREE.Texture;
  tex.colorSpace = THREE.SRGBColorSpace;


  useFrame(({ clock }) => {
    if (!ref.current) return;
    // gentle bob + face camera slight rotation
    ref.current.position.y = 0.6 + Math.sin(clock.getElapsedTime() * 0.8) * 0.03;
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.04;
  });

  return (
    <group position={data.position}>
      {/* pole */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 12]} />
        <meshStandardMaterial color="#6b4a2f" />
      </mesh>

      {/* billboard plane */}
      <mesh
        ref={ref}
        position={[0, 0.6, 0]}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { (e.object as any).scale.set(1.04, 1.04, 1.04); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { (e.object as any).scale.set(1,1,1); document.body.style.cursor = ""; }}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[1.9, 1.05]} />
        <meshStandardMaterial map={tex} toneMapped />
      </mesh>

      {/* title HTML label */}
      <Html position={[0, -0.05, 0]} center>
        <div style={{ width: 180, textAlign: "center", fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.88)", padding: "6px 8px", borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 700 }}>{data.title}</div>
        </div>
      </Html>
    </group>
  );
}
