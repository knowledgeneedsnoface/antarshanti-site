"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

export default function LivePresenceWidget() {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial random count 11-42
        setCount(Math.floor(Math.random() * (42 - 11 + 1)) + 11);

        // Show after delay
        const showTimer = setTimeout(() => setIsVisible(true), 2000);

        const interval = setInterval(() => {
            // Randomly fluctuate count slightly
            setCount(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                const next = Math.max(11, Math.min(42, prev + change));
                return next;
            });
        }, 15000);

        return () => {
            clearTimeout(showTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 mt-4 text-xs font-medium text-amber-800/80 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-100/50 shadow-sm w-fit mx-auto"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span>✨ {count} people are breathing with you right now</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
