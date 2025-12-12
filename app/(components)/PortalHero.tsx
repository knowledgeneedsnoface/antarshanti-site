"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export default function PortalHero() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Particles generator
    const particles = Array.from({ length: 20 });

    return (
        <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center z-50">

            {/* Floating Embers */}
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-amber-500/40 blur-[1px]"
                    initial={{
                        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                        y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
                        scale: Math.random() * 0.5 + 0.2,
                        opacity: 0
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 0.6, 0],
                        x: `+=${Math.random() * 100 - 50}`
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2 }}
                />
            ))}

            {/* The Portal Ring */}
            <motion.div
                className="relative mb-12 cursor-pointer group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setIsClicked(true)}
                animate={{ scale: isClicked ? 50 : (isHovering ? 1.05 : 1) }}
                transition={{ duration: isClicked ? 1.5 : 0.8, ease: isClicked ? "circIn" : "easeInOut" }}
            >
                {/* Glow Halo */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-amber-600/20 blur-2xl"
                    animate={{ opacity: isHovering ? 0.6 : 0.3, scale: isHovering ? 1.2 : 1 }}
                />

                {/* Ring SVG */}
                <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle
                        cx="120" cy="120" r="100"
                        stroke="url(#portalGradient)"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <motion.circle
                        cx="120" cy="120" r="100"
                        stroke="url(#portalGradient)"
                        strokeWidth="4"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{ pathLength: isClicked ? 1 : 0.3, rotate: 270 }}
                        transition={{ duration: 3, ease: "easeInOut", repeat: isClicked ? 0 : Infinity, repeatType: "mirror" }}
                        className="opacity-60"
                    />
                    <defs>
                        <linearGradient id="portalGradient" x1="20" y1="20" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F59E0B" stopOpacity="0" />
                            <stop offset="0.5" stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center Text specific to portal */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.2em] text-amber-500/60 uppercase font-light"
                    animate={{ opacity: isHovering ? 1 : 0 }}
                >
                    Enter
                </motion.div>
            </motion.div>

            {/* Main Copy */}
            <div className="z-10 text-center max-w-2xl px-6">
                <motion.h1
                    className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Enter Your 10-Minute Sanctuary.
                </motion.h1>
                <motion.p
                    className="text-white/40 font-light text-lg tracking-wide mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    A place made for your breath, your peace, your becoming.
                </motion.p>

                <motion.button
                    onClick={() => setIsClicked(true)}
                    className="px-8 py-3 rounded-full border border-amber-500/30 text-amber-500/80 hover:bg-amber-500/10 hover:border-amber-500/60 hover:text-amber-400 transition-all duration-500 uppercase text-sm tracking-widest"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Open the Ritual
                </motion.button>
            </div>

            {/* Transition Whiteout Overlay */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        className="fixed inset-0 bg-white z-[100] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeIn" }}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}
