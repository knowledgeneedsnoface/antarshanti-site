"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import { Analytics } from '../lib/Analytics';

export default function ReminderPreferences() {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const { play } = useAudio();

    const handleToggle = () => {
        setShowOptions(!showOptions);
        play('reminder_toggle_click', 0.2);
        if (!showOptions) {
            Analytics.track('reminder_prompt_opened');
        }
    };

    const handleSelectTime = (time: string) => {
        setSelectedTime(time);
        play('reminder_toggle_click', 0.2);
        Analytics.track('reminder_set', { time });

        // Close after selection
        setTimeout(() => {
            setShowOptions(false);
        }, 1000);
    };

    return (
        <motion.div
            className="relative max-w-md mx-auto mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
        >
            {/* Main CTA */}
            <motion.button
                onClick={handleToggle}
                className="w-full text-white/50 hover:text-white/70 text-sm font-light transition-colors duration-300 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {selectedTime
                    ? `Reminder set for ${selectedTime}`
                    : "Would you like a gentle morning nudge?"}
            </motion.button>

            {/* Options Popup */}
            <AnimatePresence>
                {showOptions && (
                    <motion.div
                        className="absolute bottom-full left-0 right-0 mb-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-3 text-center">
                            Choose a time
                        </p>

                        <div className="flex flex-col gap-2">
                            {['Morning (8 AM)', 'Evening (6 PM)', 'Same time tomorrow'].map((time) => (
                                <motion.button
                                    key={time}
                                    onClick={() => handleSelectTime(time)}
                                    className="text-white/70 hover:text-white hover:bg-white/5 text-sm py-2 px-4 rounded-lg transition-all duration-200"
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {time}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
