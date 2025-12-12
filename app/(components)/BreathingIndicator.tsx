"use client";

import { motion } from "framer-motion";

export default function BreathingIndicator() {
    return (
        <motion.div
            className="fixed bottom-6 right-6 z-40 pointer-events-none mix-blend-multiply"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <div className="relative flex items-center justify-center w-12 h-12">
                {/* Outer expanding ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-amber-400/30"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: 4, // 4-second breath cycle
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Inner core */}
                <motion.div
                    className="w-2 h-2 rounded-full bg-amber-500/50"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </motion.div>
    );
}
