"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type HeartStateKey =
    | "peaceful"
    | "loving"
    | "heavy"
    | "grateful"
    | "longing";

interface HeartRealmProps {
    /**
     * Callback when user confirms their heart state selection.
     */
    onHeartSelection: (heartStateKey: HeartStateKey) => void;
}

interface HeartStateOption {
    id: HeartStateKey;
    title: string;
    subtitle: string;
    img: string;
    color: string;
}

// ============================================================================
// Data
// ============================================================================

const HEART_STATES: HeartStateOption[] = [
    {
        id: "peaceful",
        title: "Peaceful",
        subtitle: "Dil halka lag raha hai",
        img: "/assets/heart-peace.svg",
        color: "#e6d9c7"
    },
    {
        id: "loving",
        title: "Loving",
        subtitle: "Pyaar aur warmth",
        img: "/assets/heart-love.svg",
        color: "#ff69b4"
    },
    {
        id: "heavy",
        title: "Heavy",
        subtitle: "Thoda bojh sa hai",
        img: "/assets/heart-sad.svg",
        color: "#4a90e2"
    },
    {
        id: "grateful",
        title: "Grateful",
        subtitle: "Dil full of appreciation",
        img: "/assets/heart-grateful.svg",
        color: "#d4a94a"
    },
    {
        id: "longing",
        title: "Longing",
        subtitle: "Kuch adhura sa lag raha hai",
        img: "/assets/heart-longing.svg",
        color: "#9b59b6"
    },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const auraVariants: any = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const pulseVariants: any = {
    pulse: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const lightParticleVariants: any = {
    animate: (i: number) => ({
        y: [0, -20, 0],
        x: [0, Math.random() * 10 - 5, 0],
        opacity: [0.3, 0.7, 0.3],
        transition: {
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
        },
    }),
};

// ============================================================================
// Component
// ============================================================================

export default function HeartRealm({ onHeartSelection }: HeartRealmProps) {
    const [selectedState, setSelectedState] = useState<HeartStateKey | null>(null);

    const handleSelect = (id: HeartStateKey) => {
        setSelectedState(id);
    };

    const handleContinue = () => {
        if (selectedState) {
            onHeartSelection(selectedState);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#3e1d2f] text-white font-sans overflow-x-hidden selection:bg-[#d4a94a] selection:text-black flex flex-col items-center py-10 md:py-16">

            {/* 
        -------------------------------------------------------------
        1. Temple Background Layer
        -------------------------------------------------------------
      */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Warm temple gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3e1d2f] via-[#4a2537] to-[#2f1b28] opacity-95" />

                {/* Radial glow at center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4a94a] opacity-10 blur-[120px] rounded-full" />

                {/* Floating light particles (dust motes) */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={lightParticleVariants}
                        animate="animate"
                        className="absolute rounded-full bg-[#e6d9c7] w-1 h-1 blur-[0.5px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                {/* Pink haze overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e1d2f]/70 via-pink-900/5 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center">

                {/* 
          -------------------------------------------------------------
          2. Header
          -------------------------------------------------------------
        */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d4a94a] to-pink-200 mb-2 tracking-wide font-sans drop-shadow-[0_0_20px_rgba(212,169,74,0.3)]">
                        Hridaya Mandir — The Realm of Your Heart
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl font-light">
                        Yeh visuals tumhari current emotional feeling ko dikhate hain. Jo sabse zyada connect ho… woh choose karo.
                    </p>
                </motion.div>

                {/* 
          -------------------------------------------------------------
          3. Aura Grid
          -------------------------------------------------------------
        */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl place-items-center mb-8"
                >
                    {HEART_STATES.map((state) => {
                        const isSelected = selectedState === state.id;
                        const isDimmed = selectedState !== null && !isSelected;

                        return (
                            <motion.div
                                key={state.id}
                                variants={auraVariants}
                                onClick={() => handleSelect(state.id)}
                                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                                className={`
                  relative group cursor-pointer w-full max-w-xs aspect-square rounded-3xl overflow-hidden
                  transition-all duration-500 ease-out
                  ${isSelected
                                        ? "ring-4 ring-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.5)] scale-110 z-20"
                                        : "hover:shadow-[0_0_25px_rgba(212,169,74,0.2)]"
                                    }
                  ${isDimmed ? "!opacity-60 grayscale" : "opacity-100"}
                `}
                            >
                                {/* Aura Glow Background */}
                                <div
                                    className="absolute inset-0 opacity-20 blur-2xl"
                                    style={{ backgroundColor: state.color }}
                                />

                                {/* Pulsing Aura Image */}
                                <motion.div
                                    variants={pulseVariants}
                                    animate={isSelected ? {} : "pulse"}
                                    className="absolute inset-0 flex items-center justify-center p-8"
                                >
                                    <img
                                        src={state.img}
                                        alt={state.title}
                                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    />
                                </motion.div>

                                {/* Selected indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 bg-[#d4a94a] text-[#3e1d2f] rounded-full p-2 shadow-lg">
                                        <Heart size={18} fill="currentColor" />
                                    </div>
                                )}

                                {/* Card Content (bottom overlay) */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#3e1d2f] to-transparent">
                                    <h3 className={`text-2xl font-semibold mb-1 transition-colors duration-300 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                        {state.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{state.subtitle}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 
          -------------------------------------------------------------
          4. Continue CTA
          -------------------------------------------------------------
        */}
                <div className="h-24 flex items-center justify-center w-full">
                    <AnimatePresence>
                        {selectedState && (
                            <motion.button
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 169, 74, 0.5)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContinue}
                                className="
                  flex items-center gap-3 px-12 py-4 
                  bg-gradient-to-r from-[#d4a94a] to-[#b8860b] 
                  text-[#3e1d2f] font-bold text-lg rounded-full 
                  shadow-[0_0_25px_rgba(212,169,74,0.4)]
                  relative z-30
                "
                            >
                                Continue
                                <ArrowRight size={20} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
