"use client";

import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalHero() {
    const router = useRouter();
    const [step, setStep] = useState<'breath' | 'content'>('breath');
    // Using a simple state availability check for browser-only logic if needed

    // Initial "Guided Moment" sequence
    useEffect(() => {
        // Step 1: Breath prompt is visible by default state 'breath'

        // Step 2: Transition to content after delay
        const timer = setTimeout(() => {
            setStep('content');
        }, 4000); // 4 seconds total for the breath moment

        return () => clearTimeout(timer);
    }, []);

    const mouseX = useMotionValue(0);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === "undefined") return;
        const { clientX } = e;
        const { innerWidth } = window;
        mouseX.set(clientX / innerWidth - 0.5);
    };

    const particles = Array.from({ length: 20 });

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center z-50 cursor-default"
        >
            {/* Particles - maintain atmosphere */}
            {particles.map((_, i) => (
                <Particle key={i} mouseX={mouseX} initialSide={Math.random() < 0.5 ? -1 : 1} />
            ))}

            {/* Decorative Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />


            {/* GUIDED MOMENT OVERLAY */}
            <AnimatePresence mode="wait">
                {step === 'breath' && (
                    <motion.div
                        key="breath"
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    >
                        <div className="text-xl md:text-2xl font-light text-amber-100/90 tracking-wide font-serif italic">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                Before you scroll...
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="mt-4"
                            >
                                take one slow breath.
                            </motion.p>
                        </div>
                    </motion.div>
                )}

                {/* MAIN HERO CONTENT */}
                {step === 'content' && (
                    <motion.div
                        key="content"
                        className="z-10 text-center max-w-3xl px-6 relative flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    >
                        {/* LAYER 1: Immediate Clarity (WHAT) */}
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-100/80 mb-8 leading-[1.1]">
                            A 10-Minute Daily Ritual <br /> to Calm Your Mind
                        </h1>

                        {/* LAYER 2: Emotional Resonance (WHY) */}
                        <h2 className="text-lg md:text-xl text-stone-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
                            For overthinking minds, tired hearts, and people who don’t want another meditation app.
                        </h2>

                        {/* LAYER 3: Ownership (POWER SHIFT) */}
                        <p className="text-xs md:text-sm text-stone-500/80 font-medium tracking-widest uppercase mb-12">
                            No guru. No lectures. <br className="md:hidden" />
                            You guide yourself — we simply hold the space.
                        </p>

                        {/* ACTION AREA */}
                        <div className="flex flex-col items-center gap-8">
                            {/* Primary CTA */}
                            <button
                                onClick={() => router.push('/inner-atlas')}
                                className="group relative px-9 py-4 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full text-white font-medium text-lg tracking-wide shadow-[0_4px_20px_-5px_rgba(180,83,9,0.3)] hover:shadow-[0_4px_30px_-5px_rgba(180,83,9,0.5)] hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-amber-600/30"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span className="text-xl">🕯</span> Start a 10-Minute Ritual
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            </button>

                            {/* Secondary Links */}
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm text-stone-500/80">
                                <a href="#why-it-works" className="hover:text-amber-200/80 transition-colors border-b border-transparent hover:border-amber-400/30 pb-0.5">
                                    See how it works →
                                </a>
                                <Link href="/get-started" className="hover:text-amber-200/80 transition-colors border-b border-transparent hover:border-amber-400/30 pb-0.5">
                                    Explore the ritual kit →
                                </Link>
                            </div>
                        </div>

                        {/* TRUST WHISPER */}
                        <div className="absolute -bottom-32 left-0 right-0">
                            <p className="text-[10px] md:text-xs text-stone-600/80 tracking-[0.2em] uppercase opacity-60">
                                Used quietly by people who don’t post about spirituality.
                            </p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function Particle({ mouseX, initialSide }: { mouseX: any, initialSide: number }) {
    // Reusing the particle logic from before...
    // Only difference is imports are handled above.
    const xRepulsion = useTransform(mouseX, [-0.5, 0.5], [initialSide * -50, initialSide * 50]);
    const springX = useSpring(xRepulsion, { stiffness: 50, damping: 20 });

    const randomDelay = Math.random() * 5;
    const randomDuration = Math.random() * 10 + 10;

    return (
        <motion.div
            className="absolute rounded-full bg-amber-500/40 blur-[1px]"
            initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
                scale: Math.random() * 0.5 + 0.2,
                opacity: 0
            }}
            style={{ x: springX }}
            animate={{
                y: -100,
                opacity: [0, 0.6, 0],
            }}
            transition={{
                y: {
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: randomDelay
                },
                opacity: {
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: randomDelay
                }
            }}
        />
    )
}
