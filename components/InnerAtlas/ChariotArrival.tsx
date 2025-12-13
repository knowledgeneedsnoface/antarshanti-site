"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react"; // Using Lucide icon for the button arrow if available

// ============================================================================
// Types
// ============================================================================

interface ChariotArrivalProps {
    /**
     * Callback function triggered when the user clicks "Begin Inner Atlas".
     * This signals the transition to the next module.
     */
    onStartInnerAtlas?: () => void;
}

// ============================================================================
// Animation Variants
// ============================================================================

const fogVariants: any = {
    animate: {
        x: ["-10%", "10%"],
        opacity: [0.3, 0.6, 0.3],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 20,
                ease: "easeInOut",
            },
            opacity: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 10,
                ease: "easeInOut",
            },
        },
    },
};

const particleVariants: any = {
    animate: (i: number) => ({
        y: [0, -100],
        opacity: [0, 0.8, 0],
        transition: {
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
        },
    }),
};

const chariotVariants: any = {
    initial: {
        scale: 0.2, // Start far away (small)
        opacity: 0,
        y: 50, // Slightly lower to simulate ground level approach
    },
    enter: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            duration: 5,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth "arrival"
        },
    },
};

const wheelVariants: any = {
    spin: {
        rotate: 360,
        transition: {
            repeat: Infinity,
            duration: 3,
            ease: "linear",
        },
    },
};

const contentVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.5,
            ease: "easeOut",
            delay: 5.2, // Wait for chariot to mostly arrive (5s duration)
        },
    },
};

// ============================================================================
// Component: Chariot Arrival
// ============================================================================

export default function ChariotArrival({
    onStartInnerAtlas = () => console.log("Begin Inner Atlas"),
}: ChariotArrivalProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger animations on mount
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0d1a26] text-white font-sans selection:bg-[#d4a94a] selection:text-black">
            {/* 
        -------------------------------------------------------------
        1. Background Layer: Fog & Particles
        -------------------------------------------------------------
      */}

            {/* Deep gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a26] via-[#1a2c42] to-[#3a2c53] opacity-80" />

            {/* Fog Animation */}
            <motion.div
                className="absolute inset-0 bg-[url('/assets/fog-bg.svg')] bg-cover bg-center pointer-events-none mix-blend-screen"
                variants={fogVariants}
                animate="animate"
                initial={{ opacity: 0 }}
            />
            {/* Fallback procedural fog if image missing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={particleVariants}
                        animate="animate"
                        className="absolute rounded-full bg-[#d4a94a] w-1 h-1 blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100 + 20}%`, // Start mostly from lower half
                        }}
                    />
                ))}
            </div>

            {/* 
        -------------------------------------------------------------
        2. Chariot Layer
        -------------------------------------------------------------
      */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.div
                    className="relative w-[300px] md:w-[500px] lg:w-[600px] aspect-square flex items-center justify-center"
                    variants={chariotVariants}
                    initial="initial"
                    animate={isLoaded ? "enter" : "initial"}
                >
                    {/* Main Chariot Image */}
                    <div className="relative w-full h-full">
                        {/* Glow Effect Behind Chariot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#d4a94a] opacity-20 blur-[80px] rounded-full animate-pulse" />

                        {/* 3D/2D Chariot Placeholder */}
                        {/* Note: Replacing this 'src' with the real asset is crucial. Currently using SVG placeholder. */}
                        <img
                            src="/assets/chariot.svg"
                            alt="Golden Chariot"
                            className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,169,74,0.3)]"
                        />

                        {/* Simulated Wheel Rotation (Overlay if image permits separation, roughly placed) */}
                        {/* If the chariot image is a single flat layer, this might look odd. 
                Ideally, wheels would be separate. Disabled for single-image simplicity. 
                Uncomment below if wheels are separate assets or clearly defined. */}
                        {/* 
            <motion.div 
               variants={wheelVariants} 
               animate="spin" 
               className="absolute bottom-10 left-10 w-16 h-16 border-2 border-[#d4a94a] rounded-full border-dashed opacity-50"
            /> 
            */}
                    </div>
                </motion.div>
            </div>

            {/* 
        -------------------------------------------------------------
        3. Content Layer (Text + CTA)
        -------------------------------------------------------------
      */}
            <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-20 md:pb-0 z-20">
                <motion.div
                    className="text-center px-6 max-w-2xl mt-[30vh] md:mt-[40vh]" // Push content down to avoid covering chariot
                    variants={contentVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                >
                    {/* Welcome Message */}
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d4a94a] to-white mb-4 drop-shadow-sm font-sans tracking-wide">
                        Chalo… tumhare andar ke <br className="hidden md:block" />
                        <span className="text-[#d4a94a]">Kurukshetra</span> ka safar shuru karte hain.
                    </h1>

                    {/* Subline */}
                    <p className="text-base md:text-xl text-gray-300 mb-10 font-light tracking-wide">
                        Yeh journey tumhari clarity, shanti aur direction ke liye hai.
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={onStartInnerAtlas}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 169, 74, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a94a]/80 to-[#b8860b]/80 hover:from-[#d4a94a] hover:to-[#b8860b] text-[#0d1a26] font-semibold text-lg rounded-full transition-all duration-300 backdrop-blur-sm border border-[#d4a94a]/30"
                    >
                        <span className="relative z-10">Begin Inner Atlas</span>
                        <MoveRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />

                        {/* Ripple/Glow insert */}
                        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
