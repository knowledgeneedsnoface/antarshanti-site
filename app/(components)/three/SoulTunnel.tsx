"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "framer-motion";

export default function SoulTunnel() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport, clock } = useThree();
    const count = 1000; // Number of particles
    const tunnelLength = 50;
    const tunnelRadius = 6;

    // Dummy object for calculating transforms
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Instance data (random positions in a cylinder)
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Distribute along Z from -tunnelLength to 0 (so we fly TO start) or 0 to -tunnelLength
            const z = Math.random() * -tunnelLength;

            // Radius varies slightly for organic look
            const r = tunnelRadius + (Math.random() - 0.5) * 4;

            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;

            // Scale variations
            const scale = Math.random() * 0.5 + 0.1;

            temp.push({ x, y, z, scale, speed: Math.random() * 0.5 + 0.5 });
        }
        return temp;
    }, []);

    useFrame((state) => {
        // 1. Calculate Fly Speed from Scroll
        // We can just use time + scroll position
        const t = state.clock.getElapsedTime();
        const scrollOffset = window.scrollY * 0.02; // Map scroll pixels to Z units

        // 2. Animate Instances
        if (meshRef.current) {
            particles.forEach((particle, i) => {
                // Move particle towards camera (positive Z)
                // Initial Z is negative.
                let zPos = particle.z + scrollOffset + (t * particle.speed);

                // Loop logic: If particle passes camera (z > 2), send it back
                // Or better: modulo the position for infinite tunnel
                zPos = ((zPos % tunnelLength) + tunnelLength) % tunnelLength;
                // Now zPos is 0 to tunnelLength. We want -tunnelLength to 0 usually?
                // Let's say camera is at 0. Particles fly FROM -50 TO 0.
                // If zPos > 0, wrap to -50.

                zPos = zPos - tunnelLength; // Range -50 to 0 ?
                // Wait, we want them to fly PAST us.
                // Camera is at +5. Particles should go from -50 to +10.

                // Simplified Infinite Scroll Logic:
                // Normalize z based on scroll
                const infiniteZ = (particle.z + scrollOffset + t) % tunnelLength;

                dummy.position.set(
                    particle.x,
                    particle.y,
                    infiniteZ - tunnelLength / 2 // Center around -25?
                );

                // Spiral rotation
                dummy.rotation.z = t * 0.2 + infiniteZ * 0.1;
                dummy.rotation.x = t * 0.1;
                dummy.rotation.y = t * 0.1;

                dummy.scale.setScalar(particle.scale);

                dummy.updateMatrix();
                meshRef.current!.setMatrixAt(i, dummy.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {/* Geometries: Glowing Cubes or Tetras */}
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            {/* 
        Material: Emissive "Soul" Light
        Amber/Gold neon look
      */}
            <meshPhysicalMaterial
                color="#fbbf24"
                emissive="#f59e0b"
                emissiveIntensity={2}
                roughness={0.1}
                metalness={0.8}
                toneMapped={false} // Important for bloom!
            />
        </instancedMesh>
    );
}
