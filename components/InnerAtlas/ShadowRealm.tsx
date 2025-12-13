"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Skull } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type ShadowStateKey =
    | "held_pain"
    | "self_doubt"
    | "overprotection"
    | "fear_of_loss"
    | "overthinking";

interface ShadowRealmProps {
    /**
     * Callback when user confirms their shadow state selection.
     */
    onShadowSelection: (shadowStateKey: ShadowStateKey) => void;
}

interface ShadowStateOption {
    id: ShadowStateKey;
    title: string;
    subtitle: string;
    img: string;
    color: string;
}

// ============================================================================
// Data
// ============================================================================

const SHADOW_STATES: ShadowStateOption[] = [
    {
        id: "held_pain",
        title: "Held Pain",
        subtitle: "Jo baat andar daba rakhi hai",
        img: "/assets/shadow-chest.svg",
        color: "#bfa76a"
    },
    {
        id: "self_doubt",
        title: "Self-Doubt",
        subtitle: "Apni value par shak",
        img: "/assets/shadow-mirror.svg",
        color: "#5a7a9e"
    },
    {
        id: "overprotection",
        title: "Overprotection",
        subtitle: "Dil ke ird-gird zyada layer",
        img: "/assets/shadow-armor.svg",
        color: "#bfa76a"
    },
    {
        id: "fear_of_loss",
        title: "Fear of Loss",
        subtitle: "Kisi ko kho dene ka darr",
        img: "/assets/shadow-silhouette.svg",
        color: "#6b7280"
    },
    {
        id: "overthinking",
        title: "Overthinking",
        subtitle: "Dimag ki fake kahaniyan",
        img: "/assets/shadow-mask.svg",
        color: "#7c5295"
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
            delayChildren: 0.5,
        },
    },
};

const symbolVariants: any = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const glowVariants: any = {
    flicker: {
        opacity: [0.4, 0.7, 0.5, 0.8, 0.6],
        scale: [1, 1.05, 1, 1.03, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

const sparkVariants: any = {
    animate: (i: number) => ({
        y: [0, -15, 0],
        x: [0, Math.random() * 10 - 5, 0],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
        transition: {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
        },
    }),
};

const fogDriftVariants: any = {
    drift: {
        x: [-20, 20, -20],
        opacity: [0.2, 0.4, 0.2],
        transition: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// ============================================================================
// Component
// ============================================================================

export default function ShadowRealm({ onShadowSelection }: ShadowRealmProps) {
    const [selectedState, setSelectedState] = useState<ShadowStateKey | null>(null);

    const handleSelect = (id: ShadowStateKey) => {
        setSelectedState(id);
    };

    const handleContinue = () => {
        if (selectedState) {
            onShadowSelection(selectedState);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#0a0a0f] text-white font-sans overflow-y-auto overflow-x-hidden selection:bg-[#bfa76a] selection:text-black">

            {/* 
        -------------------------------------------------------------
        1. Cave Background Layer
        -------------------------------------------------------------
      */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Dark cave gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1f2633] to-[#0a0a0f] opacity-95" />

                {/* Subtle shimmer on cave walls */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f2633_0%,transparent_70%)] opacity-30" />

                {/* Drifting fog */}
                <motion.div
                    variants={fogDriftVariants}
                    animate="drift"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1f2633]/20 to-transparent blur-3xl"
                />

                {/* Spark particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={sparkVariants}
                        animate="animate"
                        className="absolute rounded-full bg-[#bfa76a] w-1 h-1"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            filter: "blur(0.5px)"
                        }}
                    />
                ))}

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/50" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center min-h-screen">

                {/* 
          -------------------------------------------------------------
          2. Header
          -------------------------------------------------------------
        */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-wide font-sans drop-shadow-[0_0_15px_rgba(191,167,106,0.3)]">
                        Vasana Guha — The Realm of Your Shadow
                    </h1>
                    <p className="text-[#b8bac4] text-base md:text-xl font-light px-4">
                        In symbols ko dekhkar feel karo… kaunsa tumhari andar ki dabbi hui energy ko sabse zyada dikhata hai?
                    </p>
                </motion.div>

                {/* 
          -------------------------------------------------------------
          3. Symbol Grid
          -------------------------------------------------------------
        */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl place-items-center mb-6"
                >
                    {SHADOW_STATES.map((state) => {
                        const isSelected = selectedState === state.id;
                        const isDimmed = selectedState !== null && !isSelected;

                        return (
                            <motion.div
                                key={state.id}
                                variants={symbolVariants}
                                onClick={() => handleSelect(state.id)}
                                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                                className={`
                  relative group cursor-pointer w-full max-w-xs aspect-square rounded-2xl overflow-hidden border
                  transition-all duration-500 ease-out
                  ${isSelected
                                        ? "border-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.5)] scale-110 z-20"
                                        : "border-white/10 hover:border-[#bfa76a]/40 hover:shadow-[0_0_20px_rgba(191,167,106,0.2)]"
                                    }
                  ${isDimmed ? "!opacity-50 grayscale" : "opacity-100"}
                `}
                            >
                                {/* Dark background */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1f2633] to-[#0a0a0f]" />

                                {/* Glowing aura behind symbol */}
                                <motion.div
                                    variants={glowVariants}
                                    animate={isSelected ? {} : "flicker"}
                                    className="absolute inset-0 opacity-30 blur-2xl"
                                    style={{ backgroundColor: state.color }}
                                />

                                {/* Symbol image */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <img
                                        src={state.img}
                                        alt={state.title}
                                        className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(191,167,106,0.4)] transition-transform duration-700 ${isSelected ? "scale-110" : ""}`}
                                    />
                                </div>

                                {/* Ring animation on selection */}
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.8 }}
                                        animate={{ scale: 1.2, opacity: 0 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 border-2 border-[#d4a94a] rounded-2xl"
                                    />
                                )}

                                {/* Card Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 pt-8 bg-gradient-to-t from-[#0a0a0f] to-transparent">
                                    <h3 className={`text-lg md:text-xl font-semibold mb-1 transition-colors duration-300 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                        {state.title}
                                    </h3>
                                    <p className="text-[#b8bac4] text-xs md:text-sm">{state.subtitle}</p>
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
                <div className="w-full flex items-center justify-center py-6 md:py-8">
                    <AnimatePresence>
                        {selectedState && (
                            <motion.button
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(191, 167, 106, 0.5)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContinue}
                                className="
                  flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 
                  bg-gradient-to-r from-[#bfa76a] to-[#8b7355] 
                  text-[#0a0a0f] font-bold text-base md:text-lg rounded-xl
                  shadow-[0_0_25px_rgba(191,167,106,0.4)]
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
