"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import FluidMesh from "./FluidMesh";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function InteractiveBackLight() {
    const lightRef = useRef<THREE.PointLight>(null);

    // The light moves BEHIND the glass to create refraction patterns
    useFrame(({ mouse, viewport }) => {
        if (lightRef.current) {
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            lightRef.current.position.set(x, y, -2); // Negative Z to be behind the mesh
        }
    });

    return (
        <pointLight
            ref={lightRef}
            color="#f43f5e" // Rose/Red glow behind the amber glass
            intensity={15}
            distance={10}
            decay={2}
        />
    );
}

export default function EtherealScene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]} // Limit DPR for performance with Transmission
            >
                <Suspense fallback={null}>
                    {/* 1. Environment - Studio Lighting */}
                    <Environment preset="studio" blur={1} />

                    {/* 2. Background Particles (The "Divine Dust") */}
                    <Sparkles
                        count={200}
                        scale={12}
                        size={4}
                        speed={0.4}
                        opacity={0.5}
                        color="#fbbf24"
                    />

                    {/* 3. The Liquid Glass Mesh */}
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                        <FluidMesh />
                    </Float>

                    {/* 4. Lighting */}
                    {/* Ambient light to lift the shadows */}
                    <ambientLight intensity={0.5} color="#fff1f2" />
                    {/* Interactive light BEHIND the mesh for refraction */}
                    <InteractiveBackLight />

                    {/* 5. Post-Processing Stack */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.8} // Only bloom very bright spots (refractions)
                            intensity={0.5}
                            radius={0.4}
                        />
                        <Noise opacity={0.04} /> {/* Subtle Film Grain */}
                        <Vignette eskil={false} offset={0.1} darkness={0.8} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
