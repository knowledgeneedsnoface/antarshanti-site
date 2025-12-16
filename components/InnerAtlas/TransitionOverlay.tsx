"use client";

import React from "react";
import { motion } from "framer-motion";
import { JourneyPhase } from "./InnerAtlasJourney";

interface TransitionOverlayProps {
    show: boolean;
    phase: JourneyPhase;
}

// Contextual Gita lines for each realm transition
const GITA_LINES: Partial<Record<JourneyPhase, string>> = {
    mind_choice: "योगस्थः कुरु कर्माणि — Established in being, perform action.",
    heart_choice: "सर्वभूतहिते रताः — Devoted to the welfare of all beings.",
    shadow_choice: "अभयं सत्त्वसंशुद्धिः — Fearlessness and purity of heart.",
};

export default function TransitionOverlay({ show, phase }: TransitionOverlayProps) {
    const gitaLine = GITA_LINES[phase];

    if (!show || !gitaLine) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* White fade background */}
            <div className="absolute inset-0 bg-white/95" />

            {/* Breathing pulse indicator */}
            <motion.div
                className="relative z-10 flex flex-col items-center gap-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {/* Breathing circle */}
                <motion.div
                    className="w-24 h-24 rounded-full border-2 border-amber-600/30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: 3, // 3 breaths
                        ease: "easeInOut"
                    }}
                />

                {/* Gita line */}
                <motion.p
                    className="text-center text-lg md:text-xl text-gray-800 font-serif italic max-w-md px-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    {gitaLine}
                </motion.p>

                {/* Subtle instruction */}
                <motion.p
                    className="text-xs text-gray-500 uppercase tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    Breathe
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
