"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleLayer from './ParticleLayer';
import SeedInput from './SeedInput';
import MapReveal from './MapReveal';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

type SceneState = 'SEED' | 'MAP' | 'TRANSITION_OUT';

export default function PortalScene({ onComplete }: { onComplete: (path: string) => void }) {
    const [sceneState, setSceneState] = useState<SceneState>('SEED');
    const { play } = useAudio();

    useEffect(() => {
        // Entrance Sound
        play('bell_intro', 0.5);
        Analytics.track('visit_started');
    }, [play]);

    const handleSeedSubmitted = () => {
        setSceneState('MAP');
    };

    const handlePathSelected = (path: string) => {
        // Here we would trigger the transition to the next big scene (Chamber)
        // For now we just call onComplete
        setSceneState('TRANSITION_OUT');
        setTimeout(() => {
            onComplete(path);
        }, 1000);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0A0605] to-[#120D0B] flex items-center justify-center">

            {/* 1. Ambient Background */}
            <ParticleLayer />

            {/* 2. Portal Ring (Lottie Placeholder or Pulse Div) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <motion.div
                    className="w-[500px] h-[500px] rounded-full border border-white/5"
                    animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%)'
                    }}
                />
            </div>

            {/* 3. Main Content Flow */}
            <div className="relative z-10 w-full max-w-5xl px-6">
                <AnimatePresence mode="wait">

                    {sceneState === 'SEED' && (
                        <motion.div
                            key="seed"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <SeedInput onSeedSubmitted={handleSeedSubmitted} />
                        </motion.div>
                    )}

                    {sceneState === 'MAP' && (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <MapReveal onPathSelected={handlePathSelected} />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Audio Captions (Accessibility) */}
            <div id="atlas-captions" className="sr-only" aria-live="polite" />
        </section>
    );
}
