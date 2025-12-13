"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type MindStateKey =
    | "stormy_sky"
    | "quiet_lake"
    | "crowded_bazaar"
    | "desert_wind"
    | "old_forest";

interface MindRealmProps {
    /**
     * Callback when user confirms their mind state selection.
     */
    onMindSelection: (mindStateKey: MindStateKey) => void;
}

interface MindStateOption {
    id: MindStateKey;
    title: string;
    subtitle: string;
    img: string;
}

// ============================================================================
// Data
// ============================================================================

const MIND_STATES: MindStateOption[] = [
    {
        id: "stormy_sky",
        title: "Stormy Sky",
        subtitle: "Dimag bhaaga bhaaga",
        img: "/assets/mind-storm.svg"
    },
    {
        id: "quiet_lake",
        title: "Quiet Lake",
        subtitle: "Shaant aur saaf",
        img: "/assets/mind-lake.svg"
    },
    {
        id: "crowded_bazaar",
        title: "Crowded Bazaar",
        subtitle: "Bohot zyada noise",
        img: "/assets/mind-bazaar.svg"
    },
    {
        id: "desert_wind",
        title: "Desert Wind",
        subtitle: "Thoda khokhla lag raha hai",
        img: "/assets/mind-desert.svg"
    },
    {
        id: "old_forest",
        title: "Old Forest",
        subtitle: "Soch gehri ho rahi hai",
        img: "/assets/mind-forest.svg"
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
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

const particleVariants: any = {
    animate: (i: number) => ({
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.5, 0.2],
        transition: {
            duration: Math.random() * 5 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
        },
    }),
};

// ============================================================================
// Component
// ============================================================================

export default function MindRealm({ onMindSelection }: MindRealmProps) {
    const [selectedState, setSelectedState] = useState<MindStateKey | null>(null);

    const handleSelect = (id: MindStateKey) => {
        setSelectedState(id);
    };

    const handleContinue = () => {
        if (selectedState) {
            onMindSelection(selectedState);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#0b1020] text-white font-sans overflow-x-hidden selection:bg-[#d4a94a] selection:text-black flex flex-col items-center py-10 md:py-20">

            {/* 
        -------------------------------------------------------------
        1. Background Layer
        -------------------------------------------------------------
      */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Soft mystical gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020] via-[#151b30] to-[#2f1e4b] opacity-90" />

                {/* Floating Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={particleVariants}
                        animate="animate"
                        className="absolute rounded-full bg-[#d4a94a] w-1 h-1 blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                {/* Fog Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020]/80 via-transparent to-transparent z-0" />
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
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#d4a94a] to-white mb-2 tracking-wide font-sans">
                        Manas Bhoomi — The Realm of Your Mind
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl font-light">
                        In visuals ka istemaal karke choose karo… aaj tumhara mind kaisa mehsoos ho raha hai?
                    </p>
                </motion.div>

                {/* 
          -------------------------------------------------------------
          3. Grid of Cards
          -------------------------------------------------------------
        */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl place-items-center"
                >
                    {MIND_STATES.map((state) => {
                        const isSelected = selectedState === state.id;
                        const isDimmed = selectedState !== null && !isSelected;

                        return (
                            <motion.div
                                key={state.id}
                                variants={cardVariants}
                                onClick={() => handleSelect(state.id)}
                                whileHover={{ scale: 1.03 }}
                                className={`
                  relative group cursor-pointer w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 glass-panel
                  transition-all duration-500 ease-out
                  ${isSelected
                                        ? "ring-2 ring-[#d4a94a] shadow-[0_0_30px_rgba(212,169,74,0.3)] scale-[1.02] -translate-y-2 opacity-100 z-10"
                                        : "hover:border-[#d4a94a]/50 hover:shadow-lg opacity-100"
                                    }
                  ${isDimmed ? "!opacity-40 grayscale-[0.5] hover:!opacity-80 hover:grayscale-0" : ""}
                `}
                            >
                                {/* Card Background Image */}
                                <div className="aspect-[4/3] w-full bg-gray-900 relative overflow-hidden">
                                    <img
                                        src={state.img}
                                        alt={state.title}
                                        className={`
                       w-full h-full object-cover transition-transform duration-700
                       ${isSelected ? "scale-110" : "group-hover:scale-105"}
                     `}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-transparent opacity-90" />

                                    {/* Selected Icon Overlay */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 bg-[#d4a94a] text-black rounded-full p-1 shadow-lg">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 pt-10 bg-gradient-to-t from-[#0b1020] to-transparent">
                                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                        {state.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">{state.subtitle}</p>
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
                <div className="h-24 flex items-center justify-center mt-8 w-full">
                    <AnimatePresence>
                        {selectedState && (
                            <motion.button
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContinue}
                                className="
                  flex items-center gap-3 px-10 py-4 
                  bg-gradient-to-r from-[#d4a94a] to-[#b8860b] 
                  text-[#0b1020] font-bold text-lg rounded-full 
                  shadow-[0_0_20px_rgba(212,169,74,0.4)]
                  animate-pulse-slow relative z-20
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
