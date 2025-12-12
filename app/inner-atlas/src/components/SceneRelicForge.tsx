"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { useShrine, Relic } from '../contexts/ShrineContext';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

export default function SceneRelicForge() {
    const { nextScene } = useRitual();
    const { addRelic } = useShrine();
    const { theme } = usePersonalization();
    const { play } = useAudio();

    const [status, setStatus] = useState<'FORGING' | 'ASSEMBLED' | 'REVEAL'>('FORGING');
    const [relic, setRelic] = useState<Relic | null>(null);

    useEffect(() => {
        // 1. Start Audio
        play('forge_hum', 0.5);

        // 2. Mock Process
        const phases = async () => {
            // Generate data immediately (hidden)
            const newRelic = addRelic(theme?.seed || 'void', theme?.path || 'ANCHOR');
            setRelic(newRelic);

            // Phase 1: Forging (Fragments swirling)
            await new Promise(r => setTimeout(r, 2000));
            play('relic_construct', 0.6);
            setStatus('ASSEMBLED');

            // Phase 2: Glow/Assembly
            await new Promise(r => setTimeout(r, 1200));
            play('relic_complete_chime', 0.8);
            if (newRelic.rarity !== 'COMMON') {
                play('relic_rare_shimmer', 0.7);
            }
            setStatus('REVEAL');
        };

        phases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once

    const handleAccept = () => {
        play('path_select_bell', 0.4);
        nextScene();
    };

    const getRelicColor = () => {
        if (!theme) return '#fff';
        if (relic?.rarity === 'MYTHIC') return '#FFD700'; // Gold
        if (relic?.rarity === 'RARE') return '#E0F7FA'; // Cyan/Diamond
        return theme.palette.primary;
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8 w-full h-full">
            <AnimatePresence mode="wait">

                {/* STATUS TEXT */}
                <motion.h2
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/80 text-sm uppercase tracking-[0.3em] absolute top-1/4"
                >
                    {status === 'FORGING' && "Crystallizing Memory..."}
                    {status === 'ASSEMBLED' && "Forming..."}
                    {status === 'REVEAL' && relic?.rarity + " RELIC"}
                </motion.h2>

                {/* THE FORGE / ARTIFACT CONTAINER */}
                <div className="relative w-64 h-64 flex items-center justify-center">

                    {/* Background Aura */}
                    <motion.div
                        animate={{
                            scale: status === 'REVEAL' ? [1, 1.2, 1] : [0.8, 1, 0.8],
                            opacity: status === 'REVEAL' ? 0.3 : 0.1
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-full blur-[60px]"
                        style={{ backgroundColor: getRelicColor() }}
                    />

                    {/* Fragments (Forging Phase) */}
                    {status === 'FORGING' && (
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    animate={{
                                        x: Math.cos(i) * 60,
                                        y: Math.sin(i) * 60,
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white"
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* The Relic Itself */}
                    {relic && (
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{
                                scale: status === 'REVEAL' ? 1 : (status === 'ASSEMBLED' ? 0.8 : 0),
                                rotate: status === 'REVEAL' ? 0 : 180
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="relative z-10 w-32 h-32 flex items-center justify-center"
                        >
                            {/* Shape varies by path & rarity */}
                            {/* Placeholder for Lottie: `relics/${relic.visualId}.json` */}
                            <div
                                className={`w-full h-full shadow-lg ${relic.path === 'ANCHOR' ? 'rounded-lg' :
                                        relic.path === 'RELEASE' ? 'rounded-full' : 'rounded-none rotate-45'
                                    }`}
                                style={{
                                    background: `linear-gradient(135deg, ${getRelicColor()}20, ${getRelicColor()}80)`,
                                    border: `1px solid ${getRelicColor()}`,
                                    boxShadow: `0 0 30px ${getRelicColor()}40`
                                }}
                            />

                            {/* Shiny Overlay for Rare/Mythic */}
                            {relic.rarity !== 'COMMON' && (
                                <motion.div
                                    className="absolute inset-0 bg-white/30 mix-blend-overlay"
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    )}
                </div>

                {/* INFO & ACTION */}
                {status === 'REVEAL' && relic && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-1/4 text-center space-y-6"
                    >
                        <div>
                            <p className="text-white font-serif text-2xl tracking-wide">{theme?.seed}</p>
                            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
                                {relic.path} • {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <motion.button
                            onClick={handleAccept}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white uppercase text-xs tracking-[0.2em] backdrop-blur-sm transition-colors"
                        >
                            AddTo Shrine
                        </motion.button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
