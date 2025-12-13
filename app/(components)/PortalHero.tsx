"use client";

import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'

// Dynamically import the 3D scene to avoid SSR issues with Canvas
const PortalScene = dynamic(() => import('./3d/PortalScene'), { ssr: false })

export default function PortalHero() {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <section
            className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center z-50 cursor-auto"
        >
            {/* The 3D Portal Scene Background */}
            <div className="absolute inset-0 z-0">
                <PortalScene />
            </div>

            {/* Main Copy */}
            <div className="z-10 text-center max-w-2xl px-6 pointer-events-none select-none mt-[20vh]">

                <motion.h1
                    className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Enter Your 10-Minute Sanctuary.
                </motion.h1>
                <motion.p
                    className="text-white/40 font-light text-lg tracking-wide mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    A place made for your breath, your peace, your becoming.
                </motion.p>

                <motion.button
                    onClick={() => {
                        setIsClicked(true);
                        setTimeout(() => router.push('/inner-atlas-demo'), 1500);
                    }}
                    className="pointer-events-auto px-8 py-3 rounded-full border border-amber-500/30 text-amber-500/80 hover:bg-amber-500/10 hover:border-amber-500/60 hover:text-amber-400 transition-all duration-500 uppercase text-sm tracking-widest mb-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Open the Ritual
                </motion.button>

                <motion.a
                    href="/twin/demo"
                    className="pointer-events-auto block text-xs text-white/30 hover:text-amber-400 transition-colors uppercase tracking-widest border-b border-transparent hover:border-amber-400/50 pb-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    Or try the Twin Demo <span className="text-[10px] ml-1 opacity-50">→ 30s</span>
                </motion.a>
            </div>

            {/* Transition Whiteout Overlay */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        className="fixed inset-0 bg-white z-[100] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeIn" }}
                    />
                )}
            </AnimatePresence>

        </section >
    );
}

