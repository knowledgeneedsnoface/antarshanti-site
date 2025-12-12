"use client";

import { useAtlas } from "../(store)/atlasContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { relicStore } from "../(store)/relicStore";
import { MirrorSnapshot } from "./MirrorSnapshot";
import { ATLAS_AUDIO_ASSETS } from "../(hooks)/useAtlasAudio";

type ChamberState = 'IDLE' | 'BREATHE' | 'HOLD' | 'RELEASE' | 'RELIC';

export default function Chamber({ onComplete }: { onComplete: () => void }) {
    const { config, currentPath, audio } = useAtlas();
    const [state, setState] = useState<ChamberState>('IDLE');

    // Simulate flow
    useEffect(() => {
        const runSequence = async () => {
            await new Promise(r => setTimeout(r, 1000));
            setState('BREATHE');

            await new Promise(r => setTimeout(r, 4000));
            setState('HOLD');

            await new Promise(r => setTimeout(r, 3000)); // --duration-chamber-hold
            setState('RELEASE');

            await new Promise(r => setTimeout(r, 4000));
            setState('RELIC');

            audio.playSound(ATLAS_AUDIO_ASSETS.RELIC_GET);

            // Save Relic
            if (config && currentPath) {
                relicStore.addRelic({
                    id: crypto.randomUUID(),
                    seed: config.seed,
                    path: currentPath,
                    timestamp: Date.now()
                });
            }
        };

        runSequence();

        return () => { }; // Cleanup not strictly needed for this scaffold simulation
    }, [config, currentPath, audio]); // Run once on mount basically (or when deps change)

    return (
        <section className="h-screen flex flex-col items-center justify-center bg-black/50 overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/80" />

            <AnimatePresence mode="wait">
                {state === 'IDLE' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-white/60 text-xl font-light">Entering Chamber...</h2>
                    </motion.div>
                )}
                {state === 'BREATHE' && (
                    <motion.div key="breathe" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-white text-4xl font-light tracking-widest">Inhale</h2>
                    </motion.div>
                )}
                {state === 'HOLD' && (
                    <motion.div key="hold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-white text-4xl font-light tracking-widest">Hold</h2>
                    </motion.div>
                )}
                {state === 'RELEASE' && (
                    <motion.div key="release" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 0.9 }} exit={{ opacity: 0 }}>
                        <h2 className="text-white text-4xl font-light tracking-widest">Exhale</h2>
                    </motion.div>
                )}
                {state === 'RELIC' && (
                    <motion.div key="relic" className="text-center z-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-tr from-amber-300 to-amber-600 animate-pulse shadow-[0_0_50px_rgba(217,119,6,0.5)]" />
                        <h2 className="text-3xl text-amber-500 font-bold mb-2">Relic Discovered</h2>
                        <p className="text-white/60 mb-8">Your session has been saved to the Shrine.</p>

                        <div className="flex gap-4 justify-center">
                            <MirrorSnapshot />
                            <button onClick={onComplete} className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10">
                                Continue
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
