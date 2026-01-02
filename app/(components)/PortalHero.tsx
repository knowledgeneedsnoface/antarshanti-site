"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function PortalHero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [step, setStep] = useState(0); // 0: Breath, 1: Listen, 2: Welcome

    // Parallax for Hero content
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Guided Moment Sequence
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && step < 2) {
            // Step duration logic
            const duration = step === 0 ? 4000 : 4000;
            timer = setTimeout(() => setStep(s => s + 1), duration);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, step]);

    const handleStart = () => {
        setIsPlaying(true);
    };

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* 1. VOLUMETRIC FOG LAYERS (New) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                {/* Layer 1: Slow drifting clouds */}
                <motion.div
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat"
                    animate={{ x: ["0%", "-10%"], scale: [1, 1.1] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* Layer 2: Mist drift left */}
                <motion.div
                    className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                {/* Layer 3: Mist drift right (slower) */}
                <motion.div
                    className="absolute bottom-0 right-0 w-[200%] h-1/2 bg-gradient-to-l from-transparent via-amber-100/20 to-transparent blur-3xl"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* 2. AMBIENT GLOW (Existing but refined) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-50/50 rounded-full blur-[120px] -z-10 mix-blend-overlay" />

            {/* 3. MAIN CONTENT */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-4xl"
                style={{ y: y1, opacity }}
            >
                <AnimatePresence mode="wait">
                    {!isPlaying ? (
                        /* INITIAL STATE: "The Invitation" */
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <h1 className="text-5xl md:text-8xl font-serif text-stone-800 tracking-tight leading-[1.1]">
                                <span className="block text-stone-400 text-3xl md:text-4xl italic mb-4 font-light">
                                    Stop scrolling for a moment.
                                </span>
                                Find your center.
                            </h1>

                            <button
                                onClick={handleStart}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md border border-amber-200 rounded-full text-stone-800 hover:bg-white hover:scale-105 transition-all duration-500 shadow-xl shadow-amber-100/50"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                                <span className="text-lg font-medium tracking-wide">Take a deep breath</span>
                            </button>

                            <div className="flex justify-center gap-8 pt-6 opacity-60 text-sm font-medium tracking-widest text-stone-500">
                                <span>14,204 People paused today</span>
                            </div>
                        </motion.div>
                    ) : (
                        /* PLAYING STATE: "The Guided Moment" */
                        <motion.div
                            key="guided"
                            className="flex flex-col items-center justify-center min-h-[400px]"
                        >
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="breath"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, blur: "10px" }}
                                        className="text-4xl md:text-6xl font-serif text-stone-700"
                                    >
                                        Inhale slowly...
                                    </motion.div>
                                )}
                                {step === 1 && (
                                    <motion.div
                                        key="hold"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-4xl md:text-6xl font-serif text-stone-700"
                                    >
                                        Exhale the noise...
                                    </motion.div>
                                )}
                                {step === 2 && (
                                    <motion.div
                                        key="welcome"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-4xl md:text-6xl font-serif text-stone-800">
                                            Welcome to AntarShanti.
                                        </h2>
                                        <p className="text-xl text-stone-500 max-w-lg mx-auto leading-relaxed">
                                            Your daily sanctuary for mental clarity and inner peace.
                                            No gamification. Just presence.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
