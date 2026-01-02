"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import FluidMesh from "./FluidMesh";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function InteractiveLights() {
    const lightRef = useRef<THREE.PointLight>(null);

    useFrame(({ mouse, viewport }) => {
        if (lightRef.current) {
            // Move light with mouse
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            lightRef.current.position.set(x, y, 2);
        }
    });

    return (
        <pointLight
            ref={lightRef}
            color="#fbbf24" // Amber glow
            intensity={5}
            distance={5}
            decay={2}
        />
    );
}

export default function EtherealScene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 2]} // Crisp on retina
            >
                <Suspense fallback={null}>
                    {/* Environment Reflection */}
                    <Environment preset="night" blur={0.8} />

                    {/* The Moving Fabric */}
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <FluidMesh />
                    </Float>

                    {/* Dynamic Lighting */}
                    <ambientLight intensity={0.2} color="#4c0519" /> {/* Deep Rose Ambient */}
                    <InteractiveLights />

                    {/* Cinematic Post-Processing */}
                    <EffectComposer disableNormalPass>
                        <Bloom
                            luminanceThreshold={0.5}
                            luminanceSmoothing={0.9}
                            intensity={1.5}
                        />
                        <Noise opacity={0.05} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
