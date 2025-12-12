"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";

// This is the "Heart of the Practice" - repurposed from the previous "Living Flame" Hero
export default function FlameMeditation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse Physics for Flame Tilt
    const mouseX = useMotionValue(0);

    // Smooth spring physics for the flame movement
    const springConfig = { damping: 25, stiffness: 150 };
    const flameRotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === "undefined") return;
        const { clientX } = e;
        const { innerWidth } = window;
        // Normalize coordinates -0.5 to 0.5
        const x = (clientX / (innerWidth || 1000)) - 0.5;
        mouseX.set(x);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-40 bg-[#160f0a] text-white flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#160f0a] via-[#2a180e] to-[#160f0a] opacity-80" />

            {/* Content Container */}
            <div className="relative z-10 text-center max-w-3xl px-6">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="block text-amber-500/80 uppercase tracking-[0.3em] text-xs font-bold mb-12"
                >
                    The Heart of the Practice
                </motion.span>

                {/* The Candle Focus Object */}
                <motion.div
                    className="relative mx-auto w-24 h-64 mb-16 cursor-crosshair"
                    style={{ rotate: flameRotate, transformOrigin: "bottom center" }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Flame Glow */}
                    <motion.div
                        className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-56 bg-orange-500/20 rounded-full blur-[60px]"
                        animate={{
                            opacity: isHovering ? 0.6 : [0.3, 0.5, 0.3],
                            scale: isHovering ? 1.2 : [0.95, 1.05, 0.95]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* SVG Flame */}
                    <svg width="100" height="280" viewBox="0 0 100 280" fill="none" className="drop-shadow-2xl">
                        <motion.path
                            animate={{
                                d: [
                                    "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z",
                                    "M52 2 C52 2 30 46 30 59 C30 73 40 81 52 81 C64 81 74 73 74 59 C74 46 52 2 52 2 Z",
                                    "M48 6 C48 6 26 44 26 57 C26 71 36 79 48 79 C60 79 70 71 70 57 C70 44 48 6 48 6 Z",
                                    "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            fill="url(#heartFlameGradient)"
                        />
                        <path d="M50 80 V95" stroke="#4a3020" strokeWidth="3" strokeLinecap="round" />
                        <path d="M25 100 H75 V180 C75 180 70 190 50 190 C30 190 25 180 25 180 V100 Z" fill="#E6DCCF" opacity="0.1" />
                        <path d="M25 100 C25 96 36 94 50 94 C64 94 75 96 75 100 C75 104 64 106 50 106 C36 106 25 104 25 100 Z" fill="#E6DCCF" opacity="0.2" />

                        <defs>
                            <linearGradient id="heartFlameGradient" x1="50" y1="0" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#FFFFFF" />
                                <stop offset="0.4" stopColor="#FFC107" />
                                <stop offset="1" stopColor="#FF5722" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>

                {/* Guided Text */}
                <div className="space-y-8">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-light text-white"
                    >
                        "The flame becomes your anchor."
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/50 text-xl font-light"
                    >
                        Close your eyes for 5 seconds...
                    </motion.p>
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100px" }}
                        transition={{ delay: 1, duration: 2 }}
                        className="h-[1px] bg-amber-500/50 mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}
