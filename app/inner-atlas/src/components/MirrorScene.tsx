"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { useShrine, Relic } from '../contexts/ShrineContext';
import { useAudio } from '../contexts/AudioContext';
import { ReflectionQuoteEngine } from '../lib/ReflectionQuoteEngine';
import { Analytics } from '../lib/Analytics';
import SnapshotGenerator, { SnapshotHandle } from './SnapshotGenerator';
import { RitualPath } from '../lib/Personalizer';

interface MirrorSceneProps {
    onComplete: () => void;
}

export default function MirrorScene({ onComplete }: MirrorSceneProps) {
    const { theme } = usePersonalization();
    const { shrine } = useShrine();
    const { play } = useAudio();

    // Get the most recent relic (the one just forged)
    const currentRelic = shrine.relics[0] || null;

    const [quote, setQuote] = useState("");
    const [phase, setPhase] = useState<'FADE_IN' | 'REFLECT' | 'SNAPSHOT' | 'DONE'>('FADE_IN');

    const snapshotRef = useRef<SnapshotHandle>(null);

    useEffect(() => {
        // Analytics
        Analytics.track('mirror_viewed');

        // Audio
        play('mirror_drone', 0.6); // Ambient Hum

        // Generate Quote
        if (currentRelic && theme) {
            const q = ReflectionQuoteEngine.generate(
                theme.path as RitualPath,
                currentRelic.rarity,
                theme.seed
            );
            setQuote(q);
            Analytics.track('mirror_quote_generated', { quote: q });
        }

        // Sequence
        const seq = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setPhase('REFLECT');
            play('mirror_chime', 0.5); // Reveal sound
        };
        seq();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCapture = () => {
        setPhase('SNAPSHOT');
        play('shutter_soft', 0.8);

        // Trigger capture
        if (snapshotRef.current) {
            snapshotRef.current.generateImage();
        }

        // Wait then move on
        setTimeout(() => {
            setPhase('DONE');
        }, 3000);
    };

    const handleFinish = () => {
        play('portal_close', 0.4);
        onComplete();
    };

    if (!theme || !currentRelic) return null;

    // Visual styles based on path
    const rippleColor = theme.path === 'IGNITE' ? 'rgba(255, 87, 34, 0.1)'
        : theme.path === 'RELEASE' ? 'rgba(3, 169, 244, 0.1)'
            : 'rgba(121, 85, 72, 0.1)';

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden">

            {/* 1. Mirror Surface (Ripples) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-white/5"
                        style={{
                            width: '40vh',
                            height: '40vh',
                            background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`
                        }}
                        animate={{
                            scale: [1, 1.5, 2],
                            opacity: [0.4, 0.1, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 2.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {phase === 'REFLECT' && (
                    <motion.div
                        className="relative z-10 text-center max-w-lg px-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2 }}
                    >
                        {/* Silhouette / Aura */}
                        <motion.div
                            className="w-32 h-32 mx-auto mb-8 rounded-full blur-xl"
                            style={{ background: theme.palette.primary }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Quote */}
                        <h2 className="text-2xl md:text-3xl font-serif text-white/90 leading-relaxed mb-4">
                            &ldquo;{quote}&rdquo;
                        </h2>

                        <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-12">
                            The Mirror Reveals
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 items-center">
                            <motion.button
                                onClick={handleCapture}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[var(--color-gold)] text-black rounded-full text-xs uppercase font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            >
                                Capture Reflection
                            </motion.button>

                            <button
                                onClick={handleFinish}
                                className="text-white/30 text-xs hover:text-white transition-colors"
                            >
                                Continue to Shrine
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === 'SNAPSHOT' && (
                    <motion.div
                        key="flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white z-50 pointer-events-none"
                    />
                )}

                {phase === 'DONE' && (
                    <motion.div
                        className="relative z-10 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className="text-white text-xl font-serif mb-6">Reflection Saved.</h3>
                        <button
                            onClick={handleFinish}
                            className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white text-xs uppercase hover:bg-white/20 transition-all"
                        >
                            Enter Shrine
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Hidden Canvas Generator */}
            <SnapshotGenerator
                ref={snapshotRef}
                relic={currentRelic}
                quote={quote}
                level={shrine.level}
            />
        </div>
    );
}
