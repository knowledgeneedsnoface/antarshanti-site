"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PathProphecyProps {
    isVisible: boolean;
    text: string;
}

export default function PathProphecy({ isVisible, text }: PathProphecyProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 text-center pointer-events-none z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}
                >
                    <p className="text-white/90 text-sm font-serif italic leading-relaxed tracking-wide drop-shadow-lg">
                        “{text}”
                    </p>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-2" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
