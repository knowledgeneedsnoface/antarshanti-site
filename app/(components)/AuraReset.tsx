"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AuraReset() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Gradient shifts from Peach -> Pale Gold based on scroll
    const background = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [
            "linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 100%)", // White -> Orange-50
            "linear-gradient(180deg, #FFF7ED 0%, #FEF3C7 100%)", // Orange-50 -> Amber-100
            "linear-gradient(180deg, #FEF3C7 0%, #FDF4FF 100%)"  // Amber-100 -> Fuchsia-50 (transition to river)
        ]
    );

    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

    return (
        <motion.section
            ref={containerRef}
            style={{ background }}
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="text-center px-6 max-w-4xl relative z-10">
                <motion.span
                    style={{ opacity: textOpacity, y: textY }}
                    className="block text-amber-600/60 font-medium tracking-[0.2em] uppercase text-sm mb-6"
                >
                    The Aura Reset
                </motion.span>

                <motion.h2
                    style={{ opacity: textOpacity, y: textY }}
                    className="text-4xl md:text-6xl font-light text-gray-800 leading-tight mb-8"
                >
                    When You Slow Down,<br />
                    <span className="text-amber-600/80 italic font-serif">Life Softens With You.</span>
                </motion.h2>

                <motion.p
                    style={{ opacity: textOpacity, y: textY }}
                    className="text-xl text-gray-500 font-light max-w-xl mx-auto"
                >
                    One scroll at a time, your mind returns home.
                </motion.p>
            </div>

            {/* Light Halo Following Cursor (Simplified for just center swell on scroll) */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full bg-white/40 blur-[100px] pointer-events-none"
                style={{
                    left: "50%",
                    top: "50%",
                    x: "-50%",
                    y: "-50%",
                    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])
                }}
            />
        </motion.section>
    );
}
