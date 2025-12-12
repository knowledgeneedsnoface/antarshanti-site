"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { useShrine } from '../contexts/ShrineContext';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { Analytics } from '../lib/Analytics';

export default function SceneRelicForge() {
    const { nextScene } = useRitual();
    const { addRelic } = useShrine();
    const { theme } = usePersonalization();
    const [status, setStatus] = useState<'FORGING' | 'READY'>('FORGING');

    useEffect(() => {
        // Simulate forging process
        const timer = setTimeout(() => {
            setStatus('READY');
            // Play forge complete sound
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleCollect = () => {
        // Generate Relic Data (Logic is inside ShrineContext now)
        const currentSeed = theme?.seed || 'unknown';
        const currentPath = theme?.path || 'ANCHOR';

        addRelic(currentSeed, currentPath);

        // Transition
        nextScene();
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-white/60 text-sm uppercase tracking-[0.3em] mb-4">
                {status === 'FORGING' ? "Forging Relic..." : "Relic Forged"}
            </h2>

            <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Energy Swirl */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                />

                {/* The Relic */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: status === 'READY' ? 1 : 0.5,
                        opacity: status === 'READY' ? 1 : 0.5
                    }}
                    className="w-20 h-20 bg-amber-200 rounded-lg rotate-45 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                />
            </div>

            {status === 'READY' && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleCollect}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white uppercase tracking-widest text-sm transition-all"
                >
                    Collect Relic
                </motion.button>
            )}
        </div>
    );
}
