"use client";

import React from "react";
import { motion } from "framer-motion";

interface CheckoutThemeWrapperProps {
    children: React.ReactNode;
}

export default function CheckoutThemeWrapper({ children }: CheckoutThemeWrapperProps) {
    return (
        <div className="relative min-h-screen bg-[#FDFBF7] overflow-hidden">
            {/* Ambient Background - Himalayan Mist / Amber Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-200/20 blur-[120px] rounded-full mix-blend-multiply opacity-60 animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-100/30 blur-[100px] rounded-full mix-blend-multiply opacity-50" />
                <div className="absolute top-[40%] left-[20%] w-[60%] h-[60%] bg-white/40 blur-[80px] rounded-full mix-blend-overlay" />
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,251,245,0)_60%,rgba(146,64,14,0.03)_100%)]" />

            {/* Light Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-amber-400/20"
                        initial={{
                            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.4, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5,
                        }}
                        style={{
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 4 + 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}
