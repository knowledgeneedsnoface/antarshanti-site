"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function PortalHero() {
    const { scrollY } = useScroll();

    // Parallax the hero content slightly for depth
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Fog Layers (Atmosphere) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/5 to-stone-900/20"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                style={{ y: y1, opacity }}
            >
                {/* 1. The Validation */}
                <motion.h1
                    className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    You’re not broken. <br />
                    <span className="text-stone-500 italic block mt-2">You’re just overstimulated.</span>
                </motion.h1>

                {/* 2. The Subtext (Delayed) */}
                <motion.p
                    className="text-stone-600 text-xl font-light tracking-wide mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    Let’s slow things down — together.
                </motion.p>

                {/* 3. The Soft CTA */}
                <motion.button
                    onClick={() => {
                        const nextSection = document.getElementById("orientation");
                        nextSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex flex-col items-center gap-4 mx-auto text-stone-400 hover:text-amber-600 transition-colors duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span className="uppercase tracking-[0.2em] text-sm">Begin quietly</span>
                    <ArrowDown className="w-5 h-5 animate-bounce opacity-50Group-hover:opacity-100" />
                </motion.button>
            </motion.div>
        </section>
    );
}
