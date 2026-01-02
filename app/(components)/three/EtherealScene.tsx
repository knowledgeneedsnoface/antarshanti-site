
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import SoulTunnel from "./SoulTunnel";
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
                camera={{ position: [0, 0, 0], fov: 60 }} // Camera inside the tunnel
                gl={{ antialias: false, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#0c0a09"]} /> {/* Deep void background */}
                <fog attach="fog" args={["#0c0a09", 5, 30]} /> {/* Fade out distance */}

                <Suspense fallback={null}>
                    {/* The Tunnel */}
                    <SoulTunnel />

                    {/* Dynamic Lighting */}
                    <ambientLight intensity={0.2} color="#4c0519" />
                    <InteractiveBackLight />

                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.2} // Lower threshold so all particles glow
                            intensity={1.5}
                            radius={0.6}
                        />
                        <Noise opacity={0.1} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}

