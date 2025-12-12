"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Mini Components for Step Interactions

// Step 2: Interactive Candle (Mini)
function ActiveCandle() {
    const mouseX = useMotionValue(0);
    const rotate = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), { stiffness: 100 });

    return (
        <div className="relative w-16 h-32" onMouseMove={(e) => mouseX.set(e.clientX - e.currentTarget.getBoundingClientRect().left - 32)}>
            <motion.div
                style={{ rotate, transformOrigin: "bottom center" }}
                className="w-full h-full flex flex-col items-center justify-end"
            >
                {/* Flame */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-4 h-8 bg-orange-400 rounded-full blur-[2px] mb-1"
                />
                {/* Wick & Base */}
                <div className="w-1 h-3 bg-black/50" />
                <div className="w-12 h-20 bg-[#f0e6d2] rounded-t-lg" />
            </motion.div>
        </div>
    )
}

// Step 3: Reactive Smoke
function ActiveSmoke() {
    return (
        <div className="relative w-24 h-40 flex items-end justify-center">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full bg-gray-400/20 blur-xl"
                    initial={{ y: 0, opacity: 0, x: 0 }}
                    animate={{ y: -100, opacity: [0, 0.5, 0], x: (i % 2 === 0 ? 20 : -20) }}
                    transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
            <div className="w-1 h-20 bg-amber-900 rounded-full" />
        </div>
    )
}

// Step 4: Draw Mantra
function ActiveMantra() {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-80">
            <motion.path
                d="M30 50 Q50 20 70 50 T90 50" // Abstract Om-like wave
                fill="none"
                stroke="#d97706"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
                d="M30 70 Q50 90 70 70"
                fill="none"
                stroke="#d97706"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
        </svg>
    )
}

const steps = [
    {
        id: 1,
        title: "Instant Calm",
        desc: "The moment you open the box, the world slows.",
        hindi: "Zyada sochne se pehle… bas khud se shuru karna zaroori hai.",
        component: <div className="text-6xl">✨</div> // Placeholder for breath rise
    },
    {
        id: 2,
        title: "The Candle",
        desc: "A single flame. A quiet shift inside you.",
        component: <ActiveCandle />
    },
    {
        id: 3,
        title: "The Fragrance",
        desc: "Scent that instantly transports you home.",
        component: <ActiveSmoke />
    },
    {
        id: 4,
        title: "The Mantra",
        desc: "Sound medicine. Repeat it 3 times.",
        component: <ActiveMantra />
    },
    {
        id: 5,
        title: "Manifestation",
        desc: "Your voice becomes your intention.",
        component: <div className="text-6xl">🗣️</div> // Soundwave placehoder
    },
    {
        id: 6,
        title: "Meaning",
        desc: "Transform sound into personal truth.",
        component: <div className="text-6xl group-hover:rotate-y-180 transition-transform duration-700">📖</div>
    },
    {
        id: 7,
        title: "Flame Focus",
        desc: "No input. No output. Just be.",
        component: <div className="text-6xl">👁️</div>
    },
    {
        id: 8,
        title: "Gratitude",
        desc: "One breath. One thank you.",
        component: <div className="text-6xl animate-pulse text-red-400">❤️</div>
    }
];

export default function RitualRiver() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-stone-50">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* River Header - always visible until river ends */}
                <div className="absolute top-10 left-6 md:left-20 z-20">
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-2">The Ritual River</h2>
                    <p className="text-gray-500 font-light">Walk the path. Let each step open you.</p>
                </div>

                <motion.div style={{ x }} className="flex gap-10 pl-[5vw] md:pl-[20vw] pr-20">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="group relative h-[50vh] w-[80vw] md:w-[35vw] md:h-[60vh] flex-shrink-0 rounded-3xl bg-white shadow-xl overflow-hidden border border-stone-100 flex flex-col justify-center items-center text-center p-8 hover:scale-[1.02] transition-transform duration-500"
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-50 rounded-tr-full opacity-50 transition-opacity group-hover:opacity-100" />

                            <div className="mb-8 scale-150 relative z-10">
                                {step.component}
                            </div>

                            <h3 className="text-2xl font-medium text-gray-900 mb-4">{step.title}</h3>

                            <p className="text-gray-600 font-light leading-relaxed max-w-sm mb-6">
                                {step.desc}
                            </p>

                            {step.hindi && (
                                <p className="text-amber-700/70 font-serif italic text-lg max-w-sm text-center">
                                    "{step.hindi}"
                                </p>
                            )}

                            <span className="absolute bottom-8 text-6xl font-black text-gray-50 select-none -z-10 group-hover:text-amber-50 transition-colors">
                                0{step.id}
                            </span>
                        </div>
                    ))}

                    {/* End cap */}
                    <div className="w-[10vw]" />
                </motion.div>
            </div>
        </section>
    );
}
