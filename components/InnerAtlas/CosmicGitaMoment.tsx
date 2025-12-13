"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export type BattleKey =
  | "duty_vs_desire"
  | "fear_vs_ambition"
  | "love_vs_boundaries"
  | "truth_vs_comfort"
  | "chaos_vs_focus";

interface CosmicGitaMomentProps {
  kurukshetraBattleKey: BattleKey;
  onGitaMomentComplete: () => void;
}

// ============================================================================
// Data
// ============================================================================

const FLOATING_LINES = [
  "Zindagi ka raasta hamesha tumhare karm se banta hai.",
  "Jo tum control kar sakte ho, uspar dhyaan do.",
  "Tumhara sach… tumhari shakti hai."
];

const GITA_MAPPINGS: Record<BattleKey, string> = {
  duty_vs_desire: "Jo tumhara sachcha raasta hai… wahi tumhara dharma hai.",
  fear_vs_ambition: "Himmat ka matlab darr na hona nahin… darr ke bawajood aage badhna hai.",
  love_vs_boundaries: "Pyaar tab tak sundar hai jab tak tum khud ko nahi khona.",
  truth_vs_comfort: "Sach ki taraf uthaya ek kadam… poori zindagi badal deta hai.",
  chaos_vs_focus: "Jahan tumhara dhyaan jaata hai… wahan tumhari zindagi banti hai."
};

// ============================================================================
// Component
// ============================================================================

export default function CosmicGitaMoment({
  kurukshetraBattleKey,
  onGitaMomentComplete
}: CosmicGitaMomentProps) {
  const [sequenceStage, setSequenceStage] = useState<number>(0);
  const personalizedLine = GITA_MAPPINGS[kurukshetraBattleKey] || GITA_MAPPINGS.truth_vs_comfort;

  // Manage sequence timing
  useEffect(() => {
    // 0: Start
    // 1: Line 1 (1s)
    // 2: Line 2 (4s)
    // 3: Line 3 (7s)
    // 4: Pause before reveal (10s)
    // 5: Main Reveal (11s)
    
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setSequenceStage(1), 1000));
    timers.push(setTimeout(() => setSequenceStage(2), 4000));
    timers.push(setTimeout(() => setSequenceStage(3), 7000));
    timers.push(setTimeout(() => setSequenceStage(4), 10000)); // Hides floating lines
    timers.push(setTimeout(() => setSequenceStage(5), 11500)); // Reveals main content

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-center font-sans">
      
      {/* 
        -------------------------------------------------------------
        1. Cosmic Background
        -------------------------------------------------------------
      */}
      <div className="absolute inset-0 z-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#000000_100%)]" />
        
        {/* Nebula clouds */}
        <motion.div 
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(88,28,135,0.2),_transparent_40%)]"
        />
        <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_rgba(234,179,8,0.1),_transparent_40%)]"
        />

        {/* Stars */}
        <div className="absolute inset-0 opacity-70">
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    initial={{ opacity: Math.random() }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() > 0.9 ? 2 : 1,
                        height: Math.random() > 0.9 ? 2 : 1,
                    }}
                />
            ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        
        {/* 
          -------------------------------------------------------------
          2. Floating Intro Lines Sequence
          -------------------------------------------------------------
        */}
        <AnimatePresence mode="wait">
            {sequenceStage >= 1 && sequenceStage < 4 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    {sequenceStage === 1 && (
                        <motion.p
                            key="line1"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="text-xl md:text-2xl text-[#b8bac4] font-light"
                        >
                            {FLOATING_LINES[0]}
                        </motion.p>
                    )}
                    {sequenceStage === 2 && (
                        <motion.p
                            key="line2"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="text-xl md:text-2xl text-[#b8bac4] font-light"
                        >
                            {FLOATING_LINES[1]}
                        </motion.p>
                    )}
                    {sequenceStage === 3 && (
                        <motion.p
                            key="line3"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="text-xl md:text-2xl text-[#d4a94a] font-medium"
                        >
                            {FLOATING_LINES[2]}
                        </motion.p>
                    )}
                </div>
            )}
        </AnimatePresence>


        {/* 
          -------------------------------------------------------------
          3. Main Revelation (Gita Moment)
          -------------------------------------------------------------
        */}
        {sequenceStage >= 5 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex flex-col items-center"
            >
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-sm md:text-base uppercase tracking-[0.2em] text-[#b8bac4] mb-6 flex items-center gap-2"
                >
                    <span className="w-8 h-[1px] bg-[#d4a94a]/50"></span>
                    Tumhari Antar Gita
                    <span className="w-8 h-[1px] bg-[#d4a94a]/50"></span>
                </motion.h2>

                {/* Personalized Line */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ delay: 1, duration: 1.2, type: "spring", stiffness: 50 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#d4a94a] leading-tight md:leading-snug mb-8 drop-shadow-[0_0_30px_rgba(212,169,74,0.3)]"
                >
                    "{personalizedLine}"
                </motion.h1>

                {/* Meaning Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm mb-12"
                >
                    <p className="text-[#e2e8f0] text-base md:text-lg leading-relaxed font-light">
                        Iska matlab hai ki tumhari strength, tumhare values aur tumhari life direction — sab tumhe ek hi message de rahe hain. 
                        Yeh tumhara andar ka compass hai, jo tumhe sahi raasta dikhayega.
                    </p>
                </motion.div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5, duration: 0.8 }}
                    onClick={onGitaMomentComplete}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,169,74,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex items-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-[#0a0a0f] font-bold text-lg rounded-full shadow-[0_0_20px_rgba(212,169,74,0.3)] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                    <Sparkles className="w-5 h-5 text-black/70" />
                    See Your Inner Atlas
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </motion.div>
        )}

      </div>
    </div>
  );
}
