"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StreakDisplayProps {
    streak: number;
}

export default function StreakDisplay({ streak }: StreakDisplayProps) {
    const getStreakMessage = () => {
        if (streak === 0 || streak === 1) return "Today begins your practice.";
        if (streak === 7) return "Your first circle is complete.";
        if (streak > 7) return `Your thread grows stronger.\nDay ${streak}.`;
        return `A quiet thread continues.\nDay ${streak}.`;
    };

    // Show up to 10 beads, then just show count
    const beadCount = Math.min(streak, 10);
    const showCount = streak > 10;

    return (
        <div className="flex flex-col items-center gap-6 py-8">
            {/* Bead String */}
            <div className="flex items-center gap-2">
                {Array.from({ length: beadCount }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400/60 to-amber-600/40 shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            boxShadow: [
                                "0 0 8px rgba(251,191,36,0.3)",
                                "0 0 12px rgba(251,191,36,0.5)",
                                "0 0 8px rgba(251,191,36,0.3)"
                            ]
                        }}
                        transition={{
                            delay: i * 0.1,
                            duration: 0.5,
                            boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    />
                ))}
                {showCount && (
                    <motion.span
                        className="ml-2 text-amber-400/60 text-sm font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        +{streak - 10}
                    </motion.span>
                )}
            </div>

            {/* Streak Message */}
            <motion.p
                className="text-white/70 text-center text-sm font-light leading-relaxed whitespace-pre-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                {getStreakMessage()}
            </motion.p>
        </div>
    );
}
