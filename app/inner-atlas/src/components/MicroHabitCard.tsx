"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

interface MicroHabitCardProps {
    habit: string;
    path: string;
}

export default function MicroHabitCard({ habit, path }: MicroHabitCardProps) {
    const { play } = useAudio();

    useEffect(() => {
        // Play soft chime on reveal
        const timer = setTimeout(() => {
            play('micro_habit_chime', 0.3);
        }, 800);

        Analytics.track('microhabit_generated', { habit, path });

        return () => clearTimeout(timer);
    }, [habit, path, play]);

    return (
        <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
        >
            {/* Card Container */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl opacity-50" />

                {/* Content */}
                <div className="relative z-10">
                    <motion.p
                        className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Tomorrow's Micro Ritual
                    </motion.p>

                    <motion.p
                        className="text-white/90 text-lg font-light text-center leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {habit}
                    </motion.p>
                </div>

                {/* Subtle Icon Placeholder */}
                <motion.div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                >
                    <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                </motion.div>
            </div>
        </motion.div>
    );
}
