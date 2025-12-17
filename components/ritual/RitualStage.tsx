"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RitualStageProps {
    primaryText: string;   // Hinglish
    secondaryText: string; // English
    durationSeconds?: number;
    allowManualAdvance?: boolean;
    onAdvance: () => void;
}

/**
 * Renders a single ritual instruction
 * Text fades in, holds, then fades out before advancing
 * Shows "Done" button if manual advance is allowed
 */
export default function RitualStage({
    primaryText,
    secondaryText,
    durationSeconds,
    allowManualAdvance = false,
    onAdvance
}: RitualStageProps) {
    const [showDoneButton, setShowDoneButton] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Show "Done" button after 2 seconds if manual advance is allowed
        if (allowManualAdvance) {
            const timer = setTimeout(() => setShowDoneButton(true), 2000);
            return () => clearTimeout(timer);
        }
    }, [allowManualAdvance]);

    useEffect(() => {
        // Auto-advance if duration is provided
        if (durationSeconds && !allowManualAdvance) {
            const timer = setTimeout(() => {
                handleAdvance();
            }, durationSeconds * 1000);
            return () => clearTimeout(timer);
        }
    }, [durationSeconds, allowManualAdvance]);

    const handleAdvance = () => {
        setIsExiting(true);
        // Wait for fade-out animation before advancing
        setTimeout(() => {
            onAdvance();
        }, 800);
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Primary text (Hinglish) */}
                <motion.p
                    className="text-2xl md:text-3xl font-light text-gray-900 mb-4 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    {primaryText}
                </motion.p>

                {/* Secondary text (English) */}
                <motion.p
                    className="text-lg md:text-xl font-light text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    {secondaryText}
                </motion.p>

                {/* Manual advance button */}
                {allowManualAdvance && showDoneButton && !isExiting && (
                    <motion.button
                        onClick={handleAdvance}
                        className="mt-12 px-6 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Done
                    </motion.button>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
