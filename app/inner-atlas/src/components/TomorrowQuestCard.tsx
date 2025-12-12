"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

interface TomorrowQuestCardProps {
    quest: string;
    theme: string;
}

export default function TomorrowQuestCard({ quest, theme }: TomorrowQuestCardProps) {
    const { play } = useAudio();

    useEffect(() => {
        const timer = setTimeout(() => {
            play('quest_reveal_soft', 0.25);
        }, 1200);

        Analytics.track('quest_generated', { quest, theme });

        return () => clearTimeout(timer);
    }, [quest, theme, play]);

    return (
        <motion.div
            className="relative max-w-md mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            <div className="relative bg-gradient-to-br from-white/3 to-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-40" />

                <div className="relative z-10">
                    <motion.p
                        className="text-white/30 text-xs uppercase tracking-[0.2em] mb-3 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        Tomorrow's Quest (Optional)
                    </motion.p>

                    <motion.p
                        className="text-white/80 text-base font-light text-center italic leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        {quest}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
}
