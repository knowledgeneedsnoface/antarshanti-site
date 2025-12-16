"use client";

import React from "react";
import { motion } from "framer-motion";

interface ChariotDriverProps {
    steerX: number; // -1 to 1
    velocity: number; // 0 to 10
}

export default function ChariotDriver({ steerX, velocity }: ChariotDriverProps) {

    // -- PHYSICS CALCULATIONS --

    // Rotation (Bank) based on steering
    // Steer Left (-1) -> Rotate Left (-15deg)
    const rotation = steerX * 15;

    // Horizontal Position (Sway)
    // Steer Left (-1) -> Move Left (-30%)
    const xPos = steerX * 30;

    // Camera Shake (At high velocity)
    // If velocity > 5, add random jitter
    const isWarping = velocity > 5;

    return (
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20 pb-10">

            <motion.div
                className="relative w-[300px] md:w-[500px] aspect-square"
                animate={{
                    x: `${xPos}%`,
                    rotateZ: rotation,
                    y: isWarping ? [0, 2, -2, 0] : 0, // Shake
                    scale: isWarping ? 0.95 : 1, // Slight zoom back on warp
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 10,
                    y: { duration: 0.1, repeat: isWarping ? Infinity : 0 }
                }}
            >

                {/* 1. THE CHARIOT IMAGE */}
                {/* Using the same asset placeholder as previously */}
                <img
                    src="/assets/chariot.svg"
                    alt="Golden Chariot"
                    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(212,169,74,0.3)]"
                />

                {/* 2. ENGINE GLOW (The Aura) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#d4a94a] rounded-full blur-[80px] opacity-20 animate-pulse" />

                {/* 3. PARTICLE WAKE (Dust kicking up) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-20 flex justify-center">
                    {velocity > 0 && (
                        <div className="w-10 h-10 bg-white/10 blur-xl rounded-full animate-ping" />
                    )}
                </div>

            </motion.div>

        </div>
    );
}
