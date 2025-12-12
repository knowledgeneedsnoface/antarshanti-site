"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRitual } from '../contexts/RitualContext';
import { Analytics } from '../lib/Analytics';

export default function SceneMantra() {
    const { nextScene } = useRitual();
    const [count, setCount] = useState(0);
    const TARGET_COUNT = 3;

    // Simple interaction: Tap to "stamp" or affirm the mantra
    // In a full implementation, we would use Lottie for stroke writing
    const MANTRA_LINES = [
        "I am the stillness.",
        "I am the movement.",
        "I am the whole."
    ];

    const handleTap = () => {
        if (count < TARGET_COUNT) {
            setCount(c => c + 1);
            Analytics.track('mantra_pass_complete', { count: count + 1 });

            // Beep/Chime
            // play('mantra_stamp');

            if (count + 1 >= TARGET_COUNT) {
                setTimeout(nextScene, 1500);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-12">
            <h2 className="text-white/60 text-sm uppercase tracking-[0.3em]">
                Affirmation
            </h2>

            <div
                className="relative w-80 h-40 flex items-center justify-center cursor-pointer"
                onClick={handleTap}
            >
                {MANTRA_LINES.map((line, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: idx === count ? 1 : 0.1, // Highlight current
                            scale: idx === count ? 1 : 0.9,
                            y: (idx - count) * 40
                        }}
                        className="absolute text-center text-3xl md:text-4xl font-serif text-white whitespace-nowrap"
                    >
                        {line}
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTap}
                disabled={count >= TARGET_COUNT}
                className="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors uppercase text-xs tracking-widest"
            >
                {count >= TARGET_COUNT ? "Complete" : "Affirm"}
            </motion.button>
        </div>
    );
}
