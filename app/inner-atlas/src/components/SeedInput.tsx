"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { Analytics } from '../lib/Analytics';
import FrequencyDial from './FrequencyDial';

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
                        className="w-full max-w-md text-center flex flex-col items-center"
                    >
                        <FrequencyDial
                            onFrequencyChange={(val) => {
                                // Optional: Update background gradient based on val
                            }}
                            onFrequencySelected={(val, label) => {
                                setInputValue(label); // Use the label (e.g. "Stillness") as the seed
                                // Auto-submit after a brief delay or let user click?
                                // Let's auto-confirm for maximum "tuner" feel, but waiting for user to let go is handled by onFrequencySelected (onMouseUp)
                                // We'll add a confirm button that appears after tuning, or just a delay.
                                // User plan: "Submit the mapped word as the seed."
                            }}
                        />

                        <motion.button
                            onClick={submitSeed}
                            disabled={!inputValue}
                            className="mt-12 px-8 py-3 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 hover:border-amber-500/30 transition-all disabled:opacity-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: inputValue ? 1 : 0 }}
                        >
                            Enter The Atlas
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
