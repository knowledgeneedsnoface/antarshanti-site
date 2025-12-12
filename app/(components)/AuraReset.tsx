"use client";

import { motion, useScroll, useTransform, useMotionValue, useVelocity, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { triggerHaptic, hapticPatterns } from "./Haptics";

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
            "linear-gradient(180deg, #FEF3C7 0%, #FDF4FF 100%)"  // Amber-100 -> Fuchsia-50
        ]
    );

    const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

    // Velocity-Aware Cursor Orb
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

    const velocityX = useVelocity(smoothX);
    const velocityY = useVelocity(smoothY);

    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        // Determine speed magnitude
        const updateSpeed = () => {
            const vx = velocityX.get();
            const vy = velocityY.get();
            const currentSpeed = Math.sqrt(vx * vx + vy * vy);
            setSpeed(currentSpeed);
        };

        const unsubscribeX = velocityX.on("change", updateSpeed);
        const unsubscribeY = velocityY.on("change", updateSpeed);
        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [velocityX, velocityY]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Trigger haptic when text becomes fully visible (around 0.3)
            // Use a small range or state to prevent multiple triggers
            if (latest > 0.28 && latest < 0.32) {
                triggerHaptic(hapticPatterns.light);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Map speed to visual properties (Slower = Bigger/Brighter, Faster = Smaller/Dimmer)
    // Speed is roughly 0 to several thousands. 
    // Let's cap effective speed at 2000 for calculation
    const orbScale = useSpring(useTransform(useMotionValue(speed), [0, 2000], [1.5, 0.5]), { damping: 20 });
    const orbOpacity = useSpring(useTransform(useMotionValue(speed), [0, 2000], [0.6, 0.2]), { damping: 20 });


    const handleMouseMove = (e: React.MouseEvent) => {
        // Only update if client active
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <motion.section
            ref={containerRef}
            style={{ background }}
            onMouseMove={handleMouseMove}
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden cursor-none" // Hide default cursor for immersion
        >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* The Awareness Orb */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full bg-amber-400 mix-blend-multiply pointer-events-none z-50 blur-md"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: orbScale,
                    opacity: orbOpacity
                }}
            />
            {/* Larger Halo that is also affected */}
            <motion.div
                className="fixed top-0 left-0 w-64 h-64 rounded-full bg-orange-300/20 mix-blend-multiply pointer-events-none z-40 blur-3xl"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: useTransform(orbScale, (s) => s * 2), // Amplified effect
                    opacity: useTransform(orbOpacity, (o) => o * 0.5)
                }}
            />

            <div className="text-center px-6 max-w-4xl relative z-10 pointer-events-none">
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
                    Your day changes...<br />
                    <span className="text-amber-600/80 italic font-serif">when your breath changes.</span>
                </motion.h2>

                <motion.p
                    style={{ opacity: textOpacity, y: textY }}
                    className="text-xl text-gray-500 font-light max-w-xl mx-auto"
                >
                    One scroll at a time, your mind returns home.
                </motion.p>
            </div>

        </motion.section>
    );
}
