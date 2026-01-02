"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AtmosphericBackground() {
    const { scrollYProgress } = useScroll();

    // Color Mapping:
    // 0% - Hero: Morning Mist (Off-White)
    // 30% - Methodology: Grounding Warmth (Warm Amber)
    // 60% - Atlas: Cosmic Void (Deep Black/Brown)
    // 85% - Twin/End: Rebirth (Soft Dawn)

    const backgroundColor = useTransform(
        scrollYProgress,
        [
            "#030014", // Start: Deep Space (No more white start)
            "#0c0a09", // Transition: Warm Void
            "#1c1917", // Mid: Deep Earth
            "#0a0908", // Deep: Abyssal
            "#0f172a", // Hold: Midnight
            "#030014", // End: Return to Space
        ]
    );

    const gradientOpacity = useTransform(
        scrollYProgress,
        [0, 0.5, 0.6, 1],
        [0, 0.2, 0, 0.3]
    )

    return (
        <motion.div
            className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor }}
        >
            {/* Subtle Grain Overlay for texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Dynamic Gradient Orbs */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-400 blur-[150px]"
                style={{ opacity: gradientOpacity }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-300 blur-[180px]"
                style={{ opacity: gradientOpacity }}
            />
        </motion.div>
    );
}
