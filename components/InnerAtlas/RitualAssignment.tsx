"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Import types
import { BattleKey } from "./KurukshetraSelection";
import { MindStateKey } from "./MindRealm";
import { HeartStateKey } from "./HeartRealm";
import { ShadowStateKey } from "./ShadowRealm";
import { DhanushKey, ChakraKey, RathKey } from "./PowerObjectsSelector";

// ============================================================================
// Types
// ============================================================================

interface RitualAssignmentProps {
    kurukshetraBattleKey: BattleKey;
    mindStateKey: MindStateKey;
    heartStateKey: HeartStateKey;
    shadowStateKey: ShadowStateKey;
    powerObjects: {
        dhanush: DhanushKey;
        chakra: ChakraKey;
        rath: RathKey;
    };
    onRitualAssigned: (assignedRitualKey: string) => void;
}

interface RitualConfig {
    id: string;
    name: string;
    desc: string;
    steps: string[];
    img: string;
    color: string;
}

// ============================================================================
// Data
// ============================================================================

const RITUAL_MAP: Record<BattleKey, RitualConfig> = {
    duty_vs_desire: {
        id: "karma_yoga",
        name: "Karma Yoga",
        desc: "Action with clarity. 10 minutes to reconnect with purpose.",
        steps: [
            "Sit quietly for 1 minute and observe your breath.",
            "Identify one simple action aligned with your purpose.",
            "Commit to taking that action today."
        ],
        img: "/assets/ritual-karma.svg",
        color: "#D4A94A"
    },
    fear_vs_ambition: {
        id: "tapasya",
        name: "Tapasya",
        desc: "Build inner courage. Break fear through small disciplined effort.",
        steps: [
            "Slow breathing for 60 seconds.",
            "Choose one small discomfort to willingly face.",
            "Hold the feeling with courage for a few breaths."
        ],
        img: "/assets/ritual-tapasya.svg",
        color: "#E74C3C"
    },
    love_vs_boundaries: {
        id: "bhakti",
        name: "Bhakti",
        desc: "Reconnect with softness, warmth, and self-love.",
        steps: [
            "Put your hand on your heart.",
            "Recall one person or moment that felt warm.",
            "Send gratitude inward."
        ],
        img: "/assets/ritual-bhakti.svg",
        color: "#FF69B4"
    },
    truth_vs_comfort: {
        id: "satya",
        name: "Satya",
        desc: "A truth-alignment practice. 10 minutes to face what matters.",
        steps: [
            "Sit with your spine straight.",
            "Ask internally: “What truth am I avoiding?”",
            "Write one sentence about it."
        ],
        img: "/assets/ritual-satya.svg",
        color: "#3498DB"
    },
    chaos_vs_focus: {
        id: "dhyana",
        name: "Dhyana",
        desc: "A grounding breath-based practice for mental clarity.",
        steps: [
            "2-minute deep breathing.",
            "Follow breath from nose → chest → belly.",
            "Label thoughts as they arise: “thinking, thinking.”"
        ],
        img: "/assets/ritual-dhyana.svg",
        color: "#9B59B6"
    }
};

// ============================================================================
// Component
// ============================================================================

export default function RitualAssignment({
    kurukshetraBattleKey,
    onRitualAssigned
}: RitualAssignmentProps) {
    const ritual = RITUAL_MAP[kurukshetraBattleKey];

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfbf7] to-[#f4ecd8] text-[#1a1a2e] font-sans flex items-center justify-center overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#d4a94a] opacity-5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d4a94a] opacity-5 blur-[120px] rounded-full" />

                {/* Subtle Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: [0, 0.4, 0], y: -50 }}
                        transition={{ duration: Math.random() * 8 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-2 h-2 bg-[#d4a94a] rounded-full blur-[2px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md mx-auto p-6"
            >

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(212,169,74,0.15)] border border-[#d4a94a]/20 overflow-hidden relative">

                    {/* Top Pattern */}
                    <div className="h-2 bg-gradient-to-r from-[#d4a94a]/40 via-[#d4a94a] to-[#d4a94a]/40" />

                    {/* Header Content */}
                    <div className="p-8 pb-4 text-center">
                        <p className="text-xs font-bold tracking-widest text-[#8b7355] uppercase mb-4 flex items-center justify-center gap-2">
                            <Sparkles size={14} /> Your Daily Ritual
                        </p>

                        {/* Ritual Icon */}
                        <div className="w-24 h-24 mx-auto mb-6 bg-[#fdfbf7] rounded-full p-4 border border-[#d4a94a]/10 shadow-sm relative group">
                            <div className="absolute inset-0 bg-[#d4a94a] opacity-0 group-hover:opacity-5 rounded-full transition-opacity duration-500" />
                            <img src={ritual.img} alt={ritual.name} className="w-full h-full object-contain" />
                        </div>

                        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2 font-serif">{ritual.name}</h1>
                        <p className="text-[#5a4a3a] leading-relaxed text-sm md:text-base">
                            {ritual.desc}
                        </p>
                    </div>

                    {/* Steps Section */}
                    <div className="px-8 pb-8">
                        <div className="bg-[#f9f7f2] rounded-xl p-6 border border-[#d4a94a]/10">
                            <h3 className="text-sm font-bold text-[#2d2438] mb-4">How This Ritual Works (3 Simple Steps)</h3>
                            <ul className="space-y-4">
                                {ritual.steps.map((step, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm text-[#5a4a3a]">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-[#d4a94a]/30 flex items-center justify-center text-[10px] font-bold text-[#d4a94a] shadow-sm">
                                            {idx + 1}
                                        </span>
                                        <span className="leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="p-8 pt-0">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onRitualAssigned(ritual.id)}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-white font-bold text-lg shadow-[0_10px_30px_rgba(212,169,74,0.3)] hover:shadow-[0_15px_40px_rgba(212,169,74,0.4)] transition-all flex items-center justify-center gap-2"
                        >
                            Start My Ritual Journey
                            <ArrowRight size={20} />
                        </motion.button>
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-[#8b7355] text-xs mt-6 opacity-60">
                    Based on your Inner Atlas diagnosis
                </p>

            </motion.div>
        </div>
    );
}
