"use client";

import { useState } from "react";
import { useAtlas } from "./(store)/atlasContext";
import { usePersonalizer } from "./(hooks)/usePersonalizer";
import { motion, AnimatePresence } from "framer-motion";

// Components
import PathChooser from "./(components)/PathChooser";
import Chamber from "./(components)/Chamber";
import Shrine from "./(components)/Shrine";
import AtlasMap from "./(components)/AtlasMap";

export default function InnerAtlasPage() {
    const [view, setView] = useState<'ENTRY' | 'CHOOSER' | 'CHAMBER' | 'SHRINE'>('ENTRY');
    const [seedInput, setSeedInput] = useState("");

    const { setConfig, setCurrentPath, audio } = useAtlas();
    const { generateConfig } = usePersonalizer();

    const handleEntry = (e: React.FormEvent) => {
        e.preventDefault();
        if (!seedInput.trim()) return;

        // Init Audio
        audio.initAudio();
        // audio.startAmbientLoop(audio.ATLAS_AUDIO_ASSETS.AMBIENT_LOOP);

        // Generate Config
        const config = generateConfig(seedInput);
        setConfig(config);

        // Transition
        setView('CHOOSER');
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <AtlasMap /> {/* Background visual */}

            <AnimatePresence mode="wait">

                {/* 1. ENTRY PORTAL */}
                {view === 'ENTRY' && (
                    <motion.div
                        key="entry"
                        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Inner Atlas
                        </h1>
                        <p className="text-white/40 mb-12 max-w-md text-center">
                            A narrative map journey seeded by a single word.
                        </p>

                        <form onSubmit={handleEntry} className="flex flex-col gap-4 w-full max-w-sm">
                            <input
                                type="text"
                                value={seedInput}
                                onChange={(e) => setSeedInput(e.target.value)}
                                placeholder="What do you seek?"
                                className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-center text-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/20"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!seedInput}
                                className="px-8 py-3 bg-amber-600/20 text-amber-500 rounded-full hover:bg-amber-600/30 transition-all font-medium disabled:opacity-50"
                            >
                                Enter the Atlas
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* 2. PATH CHOOSER */}
                {view === 'CHOOSER' && (
                    <motion.div key="chooser" className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PathChooser onPathSelect={(path) => {
                            setCurrentPath(path);
                            setView('CHAMBER');
                        }} />
                    </motion.div>
                )}

                {/* 3. CHAMBER */}
                {view === 'CHAMBER' && (
                    <motion.div key="chamber" className="relative z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Chamber onComplete={() => setView('SHRINE')} />
                    </motion.div>
                )}

                {/* 4. SHRINE */}
                {view === 'SHRINE' && (
                    <motion.div key="shrine" className="relative z-10 pt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Shrine />
                        <div className="absolute top-6 right-6">
                            <button onClick={() => window.location.reload()} className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100">EXIT</button>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
