"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type DhanushKey = "focus" | "strength" | "care" | "wisdom" | "fire";
export type ChakraKey = "truth" | "love" | "freedom" | "growth" | "stability";
export type RathKey = "stability_path" | "expansion_path" | "healing_path";

interface PowerObjectsSelections {
    dhanush: DhanushKey;
    chakra: ChakraKey;
    rath: RathKey;
}

interface PowerObjectsSelectorProps {
    onPowerObjectsSelection: (selections: PowerObjectsSelections) => void;
}

type ScreenType = "dhanush" | "chakra" | "rath";

// ============================================================================
// Data Configurations
// ============================================================================

const DHANUSH_OPTIONS = [
    { id: "focus" as DhanushKey, title: "Arjuna's Focus", subtitle: "Clarity aur precision", img: "/assets/dhanush-focus.svg", color: "#d4a94a" },
    { id: "strength" as DhanushKey, title: "Bhima's Strength", subtitle: "Himmat aur power", img: "/assets/dhanush-strength.svg", color: "#ff6b6b" },
    { id: "care" as DhanushKey, title: "Nakula's Care", subtitle: "Kindness aur nurturing", img: "/assets/dhanush-care.svg", color: "#4ecdc4" },
    { id: "wisdom" as DhanushKey, title: "Sahadeva's Wisdom", subtitle: "Insight aur samajh", img: "/assets/dhanush-wisdom.svg", color: "#9b59b6" },
    { id: "fire" as DhanushKey, title: "Draupadi's Fire", subtitle: "Passion aur boundaries", img: "/assets/dhanush-fire.svg", color: "#e74c3c" },
];

const CHAKRA_OPTIONS = [
    { id: "truth" as ChakraKey, title: "Truth", subtitle: "Sach mein jeena", img: "/assets/chakra-truth.svg", color: "#d4a94a" },
    { id: "love" as ChakraKey, title: "Love", subtitle: "Connection aur warmth", img: "/assets/chakra-love.svg", color: "#ff69b4" },
    { id: "freedom" as ChakraKey, title: "Freedom", subtitle: "Khule mann se jeena", img: "/assets/chakra-freedom.svg", color: "#3498db" },
    { id: "growth" as ChakraKey, title: "Growth", subtitle: "Seekhna aur evolve hona", img: "/assets/chakra-growth.svg", color: "#2ecc71" },
    { id: "stability" as ChakraKey, title: "Stability", subtitle: "Balance aur sukoon", img: "/assets/chakra-stability.svg", color: "#8b7355" },
];

const RATH_OPTIONS = [
    { id: "stability_path" as RathKey, title: "Path of Stability", subtitle: "Sukoon, structure aur routine", img: "/assets/rath-stability.svg", color: "#8b7355" },
    { id: "expansion_path" as RathKey, title: "Path of Expansion", subtitle: "Naye experiences, naye steps", img: "/assets/rath-expansion.svg", color: "#e67e22" },
    { id: "healing_path" as RathKey, title: "Path of Healing", subtitle: "Dil aur mann ko theek karna", img: "/assets/rath-healing.svg", color: "#4ecdc4" },
];

// ============================================================================
// Animation Variants
// ============================================================================

const particleVariants: any = {
    float: (i: number) => ({
        y: [0, -20, 0],
        x: [0, Math.random() * 15 - 7.5, 0],
        opacity: [0.2, 0.5, 0.2],
        transition: {
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
        },
    }),
};

const cardVariants: any = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" }
    }),
};

// ============================================================================
// Component
// ============================================================================

export default function PowerObjectsSelector({ onPowerObjectsSelection }: PowerObjectsSelectorProps) {
    const [screen, setScreen] = useState<ScreenType>("dhanush");
    const [dhanush, setDhanush] = useState<DhanushKey | null>(null);
    const [chakra, setChakra] = useState<ChakraKey | null>(null);
    const [rath, setRath] = useState<RathKey | null>(null);

    // Handle Continue from Dhanush screen
    const handleDhanushContinue = () => {
        if (dhanush) {
            setScreen("chakra");
        }
    };

    // Handle Continue from Chakra screen
    const handleChakraContinue = () => {
        if (chakra) {
            setScreen("rath");
        }
    };

    // Handle Continue from Rath screen (final)
    const handleRathContinue = () => {
        if (dhanush && chakra && rath) {
            onPowerObjectsSelection({ dhanush, chakra, rath });
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white font-sans overflow-y-auto overflow-x-hidden">

            {/* Cosmic background particles */}
            <div className="fixed inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={particleVariants}
                        animate="float"
                        className="absolute w-1 h-1 bg-[#d4a94a] rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            filter: "blur(1px)"
                        }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ============================================================
            SCREEN 1: DHANUSH SELECTION
            ============================================================ */}
                {screen === "dhanush" && (
                    <motion.div
                        key="dhanush"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center min-h-screen"
                    >
                        {/* Golden aura ring */}
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a94a] opacity-5 blur-[100px] rounded-full pointer-events-none" />

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-8 md:mb-12"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold text-[#d4a94a] mb-3 tracking-wide drop-shadow-[0_0_20px_rgba(212,169,74,0.4)]">
                                Choose Your Dhanush — Your Inner Strength
                            </h1>
                            <p className="text-[#b8bac4] text-base md:text-xl font-light px-4">
                                Yeh woh shakti hai jo tumhe chalati hai, tumhe protect karti hai.
                            </p>
                        </motion.div>

                        {/* Dhanush Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mb-20">
                            {DHANUSH_OPTIONS.map((option, i) => {
                                const isSelected = dhanush === option.id;
                                const isDimmed = dhanush !== null && !isSelected;

                                return (
                                    <motion.div
                                        key={option.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onClick={() => setDhanush(option.id)}
                                        whileHover={{ scale: isSelected ? 1.05 : 1.03, y: -4 }}
                                        className={`
                      relative cursor-pointer rounded-2xl overflow-hidden border-2 p-6 md:p-8
                      transition-all duration-500
                      ${isSelected
                                                ? "border-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.6)] scale-105"
                                                : "border-white/10 hover:border-[#d4a94a]/40"
                                            }
                      ${isDimmed ? "!opacity-60 grayscale" : "opacity-100"}
                    `}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f]" />
                                        <motion.div
                                            animate={{ opacity: isSelected ? 0.3 : 0.1 }}
                                            className="absolute inset-0 blur-2xl"
                                            style={{ backgroundColor: option.color }}
                                        />

                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 1, opacity: 0.8 }}
                                                animate={{ scale: 1.15, opacity: 0 }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                                className="absolute inset-0 border-4 border-[#d4a94a] rounded-2xl"
                                            />
                                        )}

                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
                                                <img src={option.img} alt={option.title} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,169,74,0.3)]" />
                                            </div>
                                            <h3 className={`text-lg md:text-xl font-bold mb-2 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                                {option.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-[#b8bac4]">{option.subtitle}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
                            <AnimatePresence>
                                {dhanush && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDhanushContinue}
                                        className="flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-[#0a0a0f] font-bold text-base md:text-lg rounded-full shadow-[0_0_25px_rgba(212,169,74,0.5)]"
                                    >
                                        Continue
                                        <ArrowRight size={20} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* ============================================================
            SCREEN 2: CHAKRA SELECTION
            ============================================================ */}
                {screen === "chakra" && (
                    <motion.div
                        key="chakra"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center min-h-screen"
                    >
                        {/* Rotating chakra wheel effect */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5 pointer-events-none"
                        >
                            <div className="w-full h-full border-4 border-[#9b59b6] rounded-full" />
                            <div className="absolute inset-0 border-4 border-[#d4a94a] rounded-full rotate-45" />
                        </motion.div>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-8 md:mb-12"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b59b6] via-[#d4a94a] to-[#9b59b6] mb-3 tracking-wide drop-shadow-[0_0_20px_rgba(212,169,74,0.4)]">
                                Choose Your Chakra — Your Guiding Value
                            </h1>
                            <p className="text-[#b8bac4] text-base md:text-xl font-light px-4">
                                Tumhari asli value kya hai, jo tumhe decide karne me madad karti hai?
                            </p>
                        </motion.div>

                        {/* Chakra Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mb-20">
                            {CHAKRA_OPTIONS.map((option, i) => {
                                const isSelected = chakra === option.id;
                                const isDimmed = chakra !== null && !isSelected;

                                return (
                                    <motion.div
                                        key={option.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onClick={() => setChakra(option.id)}
                                        whileHover={{ scale: isSelected ? 1.05 : 1.03, y: -4 }}
                                        className={`
                      relative cursor-pointer rounded-2xl overflow-hidden border-2 p-6 md:p-8
                      transition-all duration-500
                      ${isSelected
                                                ? "border-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.6)] scale-105"
                                                : "border-white/10 hover:border-[#d4a94a]/40"
                                            }
                      ${isDimmed ? "!opacity-60 grayscale" : "opacity-100"}
                    `}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f]" />
                                        <motion.div
                                            animate={{ opacity: isSelected ? 0.3 : 0.1 }}
                                            className="absolute inset-0 blur-2xl"
                                            style={{ backgroundColor: option.color }}
                                        />

                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 1, opacity: 0.8 }}
                                                animate={{ scale: 1.15, opacity: 0 }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                                className="absolute inset-0 border-4 border-[#d4a94a] rounded-2xl"
                                            />
                                        )}

                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
                                                <img src={option.img} alt={option.title} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,169,74,0.3)]" />
                                            </div>
                                            <h3 className={`text-lg md:text-xl font-bold mb-2 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                                {option.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-[#b8bac4]">{option.subtitle}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
                            <AnimatePresence>
                                {chakra && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleChakraContinue}
                                        className="flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-[#0a0a0f] font-bold text-base md:text-lg rounded-full shadow-[0_0_25px_rgba(212,169,74,0.5)]"
                                    >
                                        Continue
                                        <ArrowRight size={20} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* ============================================================
            SCREEN 3: RATH SELECTION
            ============================================================ */}
                {screen === "rath" && (
                    <motion.div
                        key="rath"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center min-h-screen"
                    >
                        {/* Dawn horizon effect */}
                        <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#d4a94a]/10 to-transparent pointer-events-none" />
                        <motion.div
                            animate={{ x: [-20, 20, -20], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 20, repeat: Infinity }}
                            className="fixed top-1/3 left-0 right-0 h-32 bg-white/5 blur-3xl pointer-events-none"
                        />

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-8 md:mb-12"
                        >
                            <h1 className="text-2xl md:text-4xl font-bold text-[#d4a94a] mb-3 tracking-wide drop-shadow-[0_0_20px_rgba(212,169,74,0.4)]">
                                Choose Your Rath — Your Current Direction
                            </h1>
                            <p className="text-[#b8bac4] text-base md:text-xl font-light px-4">
                                Abhi zindagi kis disha mein ja rahi hai?
                            </p>
                        </motion.div>

                        {/* Rath Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mb-20">
                            {RATH_OPTIONS.map((option, i) => {
                                const isSelected = rath === option.id;
                                const isDimmed = rath !== null && !isSelected;

                                return (
                                    <motion.div
                                        key={option.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        onClick={() => setRath(option.id)}
                                        whileHover={{ scale: isSelected ? 1.05 : 1.03, y: -4 }}
                                        className={`
                      relative cursor-pointer rounded-2xl overflow-hidden border-2 p-8 md:p-10
                      transition-all duration-500
                      ${isSelected
                                                ? "border-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.6)] scale-105"
                                                : "border-white/10 hover:border-[#d4a94a]/40"
                                            }
                      ${isDimmed ? "!opacity-60 grayscale" : "opacity-100"}
                    `}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f]" />
                                        <motion.div
                                            animate={{ opacity: isSelected ? 0.3 : 0.1 }}
                                            className="absolute inset-0 blur-2xl"
                                            style={{ backgroundColor: option.color }}
                                        />

                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 1, opacity: 0.8 }}
                                                animate={{ scale: 1.15, opacity: 0 }}
                                                transition={{ duration: 1.2, repeat: Infinity }}
                                                className="absolute inset-0 border-4 border-[#d4a94a] rounded-2xl"
                                            />
                                        )}

                                        <div className="relative flex flex-col items-center text-center">
                                            <div className="w-32 h-32 md:w-40 md:h-40 mb-6">
                                                <img src={option.img} alt={option.title} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,169,74,0.3)]" />
                                            </div>
                                            <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                                {option.title}
                                            </h3>
                                            <p className="text-base md:text-lg text-[#b8bac4]">{option.subtitle}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Continue Button */}
                        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
                            <AnimatePresence>
                                {rath && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleRathContinue}
                                        className="flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-[#0a0a0f] font-bold text-base md:text-lg rounded-full shadow-[0_0_25px_rgba(212,169,74,0.5)]"
                                    >
                                        Continue
                                        <ArrowRight size={20} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
