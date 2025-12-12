"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { Analytics } from '../lib/Analytics';

export default function SceneBreath() {
    const { nextScene } = useRitual();
    const [phase, setPhase] = useState<'INHALE' | 'HOLD' | 'EXHALE'>('INHALE');
    const [cycles, setCycles] = useState(0);

    // Cycle duration
    const INHALE_TIME = 4000;
    const HOLD_TIME = 2000;
    const EXHALE_TIME = 4000;
    const TARGET_CYCLES = 3;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const runCycle = () => {
            // INHALE
            setPhase('INHALE');
            timer = setTimeout(() => {
                // HOLD
                setPhase('HOLD');
                timer = setTimeout(() => {
                    // EXHALE
                    setPhase('EXHALE');
                    timer = setTimeout(() => {
                        // END CYCLE
                        setCycles(c => {
                            const newCount = c + 1;
                            Analytics.track('breath_cycle_complete', { count: newCount });
                            if (newCount >= TARGET_CYCLES) {
                                nextScene();
                            } else {
                                runCycle(); // Loop
                            }
                            return newCount;
                        });
                    }, EXHALE_TIME);
                }, HOLD_TIME);
            }, INHALE_TIME);
        };

        // Start delay
        timer = setTimeout(runCycle, 1000);

        return () => clearTimeout(timer);
    }, [nextScene]);

    return (
        <div className="flex flex-col items-center justify-center text-center">

            <AnimatePresence mode="wait">
                <motion.h3
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-serif text-white tracking-widest mb-16 uppercase"
                >
                    {phase === 'INHALE' && "Breathe In..."}
                    {phase === 'HOLD' && "Hold..."}
                    {phase === 'EXHALE' && "Release..."}
                </motion.h3>
            </AnimatePresence>

            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-white/10" />

                {/* Expanding Orb */}
                <motion.div
                    animate={{
                        scale: phase === 'INHALE' ? 1.5 : (phase === 'HOLD' ? 1.5 : 1),
                        opacity: phase === 'INHALE' ? 0.8 : (phase === 'HOLD' ? 0.8 : 0.4),
                    }}
                    transition={{
                        duration: phase === 'INHALE' ? (INHALE_TIME / 1000) : (phase === 'HOLD' ? 0 : (EXHALE_TIME / 1000)),
                        ease: "easeInOut"
                    }}
                    className="w-32 h-32 rounded-full bg-white blur-xl"
                />

                {/* Core */}
                <div className="w-4 h-4 rounded-full bg-white z-10" />
            </div>
        </div>
    );
}
