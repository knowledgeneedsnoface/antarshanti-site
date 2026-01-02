"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import FluidMesh from "./FluidMesh";
import { Suspense } from "react";

export default function EtherealScene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-60 mix-blend-soft-light">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <FluidMesh />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
                </Suspense>
            </Canvas>
        </div>
    );
}
