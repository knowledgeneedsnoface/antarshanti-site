"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RitualSeal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Expanding Ring */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute w-32 h-32 border border-amber-500/30 rounded-full"
                />

                {/* Amber Glow Pulse */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        className="text-4xl"
                    >
                        🕉
                    </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-xl md:text-2xl font-light text-amber-900 font-serif">
                        Your ritual offering is complete.
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 tracking-wide">
                        May peace be with you.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
