"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type BattleKey =
    | "duty_vs_desire"
    | "fear_vs_ambition"
    | "love_vs_boundaries"
    | "truth_vs_comfort"
    | "chaos_vs_focus";

interface KurukshetraSelectionProps {
    onKurukshetraSelection: (battleKey: BattleKey) => void;
}

interface BattleOption {
    id: BattleKey;
    title: string;
    subtitle: string;
    img: string;
    color: string;
}

// ============================================================================
// Data
// ============================================================================

const BATTLES: BattleOption[] = [
    {
        id: "duty_vs_desire",
        title: "Duty vs Desire",
        subtitle: "Dil kuch aur chahta hai… zimmedari kuch aur.",
        img: "/assets/battle-duty-desire.svg",
        color: "#d4a94a"
    },
    {
        id: "fear_vs_ambition",
        title: "Fear vs Ambition",
        subtitle: "Badhne ka mann hai… par darr rok raha hai.",
        img: "/assets/battle-fear-ambition.svg",
        color: "#6b7280"
    },
    {
        id: "love_vs_boundaries",
        title: "Love vs Boundaries",
        subtitle: "Pyaar hai… par khud ko lose karne ka bhi darr.",
        img: "/assets/battle-love-boundaries.svg",
        color: "#ff69b4"
    },
    {
        id: "truth_vs_comfort",
        title: "Truth vs Comfort",
        subtitle: "Sach pata hai… par bolna mushkil lagta hai.",
        img: "/assets/battle-truth-comfort.svg",
        color: "#d4a94a"
    },
    {
        id: "chaos_vs_focus",
        title: "Chaos vs Focus",
        subtitle: "Dimag bikhar raha hai… direction chahiye.",
        img: "/assets/battle-chaos-focus.svg",
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
            delayChildren: 0.3,
        },
    },
};

const cardVariants: any = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

const particleVariants: any = {
    float: (i: number) => ({
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.6, 0.2],
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

export default function KurukshetraSelection({
    onKurukshetraSelection
}: KurukshetraSelectionProps) {
    const [selectedBattle, setSelectedBattle] = useState<BattleKey | null>(null);

    const handleSelect = (id: BattleKey) => {
        setSelectedBattle(id);
    };

    const handleContinue = () => {
        if (selectedBattle) {
            onKurukshetraSelection(selectedBattle);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-[#1a1a2e] via-[#2d2438] to-[#1a1a2e] text-white font-sans overflow-y-auto overflow-x-hidden selection:bg-[#d4a94a] selection:text-black">

            {/* 
        -------------------------------------------------------------
        1. Battlefield Background
        -------------------------------------------------------------
      */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Golden dawn gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#3d2f1f]/30 to-[#d4a94a]/10" />

                {/* Radial glow from horizon */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4a94a] opacity-10 blur-[120px]" />

                {/* Rising mist effect */}
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/5 to-transparent"
                />

                {/* Floating particles (symbolic of distant armies) */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={particleVariants}
                        animate="float"
                        className="absolute w-1 h-1 bg-[#d4a94a] rounded-full blur-[1px]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 60 + 20}%`,
                        }}
                    />
                ))}

                {/* Symbolic armies (abstract silhouettes on horizon) */}
                <div className="absolute bottom-20 left-0 right-0 flex justify-between px-20 opacity-20">
                    {/* Left army */}
                    <div className="flex gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={`left-${i}`}
                                className="w-1 bg-[#d4a94a] rounded-t"
                                style={{ height: `${Math.random() * 40 + 20}px` }}
                            />
                        ))}
                    </div>
                    {/* Right army */}
                    <div className="flex gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={`right-${i}`}
                                className="w-1 bg-[#d4a94a] rounded-t"
                                style={{ height: `${Math.random() * 40 + 20}px` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-10 md:py-16 flex flex-col items-center min-h-screen">

                {/* 
          -------------------------------------------------------------
          2. Header
          -------------------------------------------------------------
        */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h1 className="text-2xl md:text-4xl font-bold text-[#d4a94a] mb-3 tracking-wide font-sans drop-shadow-[0_0_20px_rgba(212,169,74,0.4)]">
                        Your Personal Kurukshetra
                    </h1>
                    <p className="text-[#b8bac4] text-base md:text-xl font-light px-4">
                        In conflicts me se kaunsa tumhari life ka asli challenge lagta hai?
                    </p>
                </motion.div>

                {/* 
          -------------------------------------------------------------
          3. Battle Cards Grid
          -------------------------------------------------------------
        */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mb-20"
                >
                    {BATTLES.map((battle) => {
                        const isSelected = selectedBattle === battle.id;
                        const isDimmed = selectedBattle !== null && !isSelected;

                        return (
                            <motion.div
                                key={battle.id}
                                variants={cardVariants}
                                onClick={() => handleSelect(battle.id)}
                                whileHover={{ scale: isSelected ? 1.05 : 1.03, y: -4 }}
                                className={`
                  relative group cursor-pointer rounded-2xl overflow-hidden border-2
                  transition-all duration-500 ease-out
                  ${isSelected
                                        ? "border-[#d4a94a] shadow-[0_0_40px_rgba(212,169,74,0.6)] scale-105 z-20"
                                        : "border-white/10 hover:border-[#d4a94a]/40 hover:shadow-[0_0_20px_rgba(212,169,74,0.2)]"
                                    }
                  ${isDimmed ? "!opacity-60 grayscale" : "opacity-100"}
                `}
                            >
                                {/* Card background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2d2438] to-[#1a1a2e]" />

                                {/* Glow effect */}
                                <motion.div
                                    animate={{
                                        opacity: isSelected ? 0.3 : 0.1,
                                        scale: isSelected ? 1.1 : 1,
                                    }}
                                    className="absolute inset-0 blur-2xl"
                                    style={{ backgroundColor: battle.color }}
                                />

                                {/* Selection ring animation */}
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.8 }}
                                        animate={{ scale: 1.15, opacity: 0 }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        className="absolute inset-0 border-4 border-[#d4a94a] rounded-2xl"
                                    />
                                )}

                                {/* Content */}
                                <div className="relative p-6 md:p-8 flex flex-col items-center text-center h-full min-h-[280px]">
                                    {/* Battle image */}
                                    <div className="w-32 h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center">
                                        <img
                                            src={battle.img}
                                            alt={battle.title}
                                            className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,169,74,0.3)] transition-transform duration-500 ${isSelected ? "scale-110" : ""}`}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-300 ${isSelected ? "text-[#d4a94a]" : "text-white"}`}>
                                        {battle.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm md:text-base text-[#b8bac4] leading-relaxed">
                                        {battle.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* 
          -------------------------------------------------------------
          4. Continue CTA - FIXED AT BOTTOM
          -------------------------------------------------------------
        */}
                <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center z-50">
                    <AnimatePresence>
                        {selectedBattle && (
                            <motion.button
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 169, 74, 0.6)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContinue}
                                className="
                  flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 
                  bg-gradient-to-r from-[#d4a94a] to-[#b8860b] 
                  text-[#1a1a2e] font-bold text-base md:text-lg rounded-full
                  shadow-[0_0_25px_rgba(212,169,74,0.5)]
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
