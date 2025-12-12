"use client";

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// The Heart of the Practice - Digital Temple Edition
export default function FlameMeditation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [phase, setPhase] = useState<"hold" | "inhale" | "exhale">("hold");

    // Mouse Physics for Flame Tilt
    const mouseX = useMotionValue(0);
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

    // Breath Cycle Logic
    useEffect(() => {
        const cycle = async () => {
            setPhase("inhale");
            await new Promise(r => setTimeout(r, 4000));
            setPhase("hold");
            await new Promise(r => setTimeout(r, 2000));
            setPhase("exhale");
            await new Promise(r => setTimeout(r, 4000));
            cycle();
        }
        cycle(); // Start breath cycle
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-40 bg-[#160f0a] text-white flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Ambience with Breath Pulse */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-[#160f0a] via-[#2a180e] to-[#160f0a] opacity-80"
                animate={{ opacity: phase === "inhale" ? 0.9 : 0.7 }}
                transition={{ duration: 4 }}
            />

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
                    className="relative mx-auto w-24 h-64 mb-16 cursor-crosshair group"
                    style={{ rotate: flameRotate, transformOrigin: "bottom center" }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Flame Glow - Syncs with Breath */}
                    <motion.div
                        className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-56 bg-orange-500/20 rounded-full blur-[60px]"
                        animate={{
                            opacity: phase === "inhale" ? 0.7 : 0.3,
                            scale: phase === "inhale" ? 1.3 : 1.0
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    />

                    {/* SVG Flame - Sharpens on Focus (Hover) */}
                    <svg width="100" height="280" viewBox="0 0 100 280" fill="none" className={`drop-shadow-2xl transition-all duration-700 ${isHovering ? 'filter-none' : 'blur-[1px]'}`}>
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

                {/* Guided Text - Context Aware */}
                <div className="space-y-4 h-32 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        {phase === "inhale" && (
                            <motion.h3 key="inhale" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-3xl font-light text-white">
                                Take a deep breath...
                            </motion.h3>
                        )}
                        {phase === "hold" && (
                            <motion.h3 key="hold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-3xl font-light text-white">
                                Hold... focus on the flame.
                            </motion.h3>
                        )}
                        {phase === "exhale" && (
                            <motion.h3 key="exhale" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-3xl font-light text-white">
                                Exhale slowly...
                            </motion.h3>
                        )}
                    </AnimatePresence>

                    <motion.div
                        animate={{ width: phase === "inhale" ? "200px" : "100px", opacity: phase === "hold" ? 1 : 0.5 }}
                        transition={{ duration: 4 }}
                        className="h-[1px] bg-amber-500/50"
                    />
                </div>
            </div>
        </section>
    );
}
