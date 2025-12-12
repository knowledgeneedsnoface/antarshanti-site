"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { Analytics } from '../lib/Analytics';

interface SeedInputProps {
    onSeedSubmitted: () => void;
}

export default function SeedInput({ onSeedSubmitted }: SeedInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { play } = useAudio();
    const { setSeed } = usePersonalization();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Typing audio feedback
        if (e.key.length === 1) {
            play('hover_tick', 0.2); // Low volume tick
        }
        if (e.key === 'Enter' && inputValue.trim().length > 0) {
            submitSeed();
        }
    };

    const submitSeed = () => {
        if (!inputValue.trim()) return;

        setIsSubmitted(true);
        play('path_select_bell'); // Trigger sound
        setSeed(inputValue);      // Generate theme

        // Delay to allow animation to play
        setTimeout(() => {
            onSeedSubmitted();
        }, 600);
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.div
                        key="input-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md text-center"
                    >
                        <label htmlFor="seed-input" className="block text-white/60 text-lg mb-6 font-light">
                            One word about your day.
                        </label>

                        <div className="relative group">
                            <input
                                id="seed-input"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g. still, tired, hopeful..."
                                className="w-full bg-transparent border-b border-white/20 text-center text-4xl text-white py-4 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/10 font-serif"
                                autoFocus
                                autoComplete="off"
                            />
                            {/* Glow effect on focus */}
                            <div className="absolute -inset-4 bg-amber-500/5 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                        </div>

                        <motion.button
                            onClick={submitSeed}
                            disabled={!inputValue.trim()}
                            className="mt-12 px-8 py-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all disabled:opacity-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Plant My Word
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="seed-token"
                        layoutId="seed-token"
                        className="w-12 h-12 rounded-full bg-amber-500 shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center"
                        initial={{ width: 300, borderRadius: 8, opacity: 1 }} // Starting from input roughly
                        animate={{ width: 44, borderRadius: 50, opacity: 0 }} // Morph to dot and vanish
                        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }} // --ease-exhale
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
