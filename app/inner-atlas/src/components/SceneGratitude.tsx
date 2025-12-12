"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { Analytics } from '../lib/Analytics';

export default function SceneGratitude() {
    const { nextScene } = useRitual();

    useEffect(() => {
        Analytics.track('ritual_complete', { type: 'full' });

        // Auto-close after 5 seconds
        const timer = setTimeout(() => {
            nextScene();
        }, 5000);
        return () => clearTimeout(timer);
    }, [nextScene]);

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
            >
                <div className="w-24 h-24 text-white opacity-90 mx-auto">
                    {/* Simple Heart/Lotus Icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-4xl font-serif text-white tracking-widest"
            >
                Thank You.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-4 text-white/60 text-sm font-sans"
            >
                The ritual is sealed.
            </motion.p>
        </div>
    );
}
