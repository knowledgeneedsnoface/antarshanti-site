"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { Analytics } from '../lib/Analytics';

export default function SceneIgnition() {
    const { nextScene } = useRitual();
    const [taps, setTaps] = useState(0);
    const REQUIRED_TAPS = 3;

    const handleTap = () => {
        if (taps < REQUIRED_TAPS) {
            setTaps(t => t + 1);
            // play spark sound
            Analytics.track('ignite_complete', { tap: taps + 1 });

            if (taps + 1 >= REQUIRED_TAPS) {
                // Ignite!
                setTimeout(nextScene, 1000);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-white/60 mb-12 uppercase tracking-[0.2em] animate-pulse">
                Strike to Ignite
            </h2>

            <motion.button
                onClick={handleTap}
                className="w-40 h-40 rounded-full bg-slate-800 relative overflow-hidden"
                whileTap={{ scale: 0.95 }}
            >
                {/* Embers */}
                {[...Array(taps)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-orange-500 blur-xl opacity-50"
                        style={{ transformOrigin: 'center' }}
                    />
                ))}

                {/* Center flint */}
                <div className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
            </motion.button>

            <p className="mt-8 text-xs text-white/40">{taps} / {REQUIRED_TAPS}</p>
        </div>
    );
}
