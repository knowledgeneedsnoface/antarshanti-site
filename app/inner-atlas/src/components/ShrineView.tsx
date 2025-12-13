"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useShrine, Relic } from '../contexts/ShrineContext';
import RelicGallery from './RelicGallery';
import { Analytics } from '../lib/Analytics';

export default function ShrineView() {
    const { shrine, checkStreak } = useShrine();
    const [selectedRelic, setSelectedRelic] = useState<Relic | null>(null);

    React.useEffect(() => {
        checkStreak();
        Analytics.track('shrine_viewed', {
            level: shrine.level,
            relicCount: shrine.relics.length
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRelicClick = (relic: Relic) => {
        setSelectedRelic(relic);
        Analytics.track('relic_clicked', { id: relic.id });
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-void)] text-white relative overflow-y-auto pb-20">

            {/* HEADER / STATS */}
            <header className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-serif tracking-wide text-[var(--color-gold)]">
                        Inner Shrine
                    </h1>
                    <p className="text-[10px] uppercase tracking-widest text-white/50">
                        Level {shrine.level} • {shrine.streakDays} Day Streak
                    </p>
                </div>
                {/* Glow Meter */}
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-gold)] transition-all duration-1000"
                        style={{ width: `${shrine.glowLevel}%` }}
                    />
                </div>
            </header>

            {/* MAIN VISUALIZATION (The "Shrine" itself) */}
            <section className="relative h-[50vh] flex items-center justify-center">
                {/* Background Aura expanding with level */}
                <motion.div
                    className="absolute rounded-full blur-[80px]"
                    style={{
                        width: `${200 + (shrine.level * 20)}px`,
                        height: `${200 + (shrine.level * 20)}px`,
                        background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)'
                    }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Shrine Geometry (Placeholder for Lottie) */}
                <div className="relative z-10 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center space-y-2 opacity-60">
                        <div className="text-4xl">🛕</div>
                        <p className="text-xs uppercase tracking-widest">Shrine Level {shrine.level}</p>
                    </div>
                </div>
            </section>

            {/* RELIC COLLECTION */}
            <section className="px-6 max-w-5xl mx-auto">
                <RelicGallery onRelicClick={handleRelicClick} />

                {/* Funnel: Link to Twin Demo */}
                <div className="mt-12 mb-8 text-center">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">The Shrine is just the beginning</p>
                    <a
                        href="/twin/demo"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] rounded-full hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 font-serif"
                    >
                        <span>🔮</span> Explore your Spiritual Twin
                    </a>
                </div>
            </section>

            {/* MODAL FOR SELECTED RELIC */}
            {selectedRelic && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setSelectedRelic(null)}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-zinc-900 border border-white/10 rounded-xl p-8 max-w-sm w-full text-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/40 hover:text-white"
                            onClick={() => setSelectedRelic(null)}
                        >
                            ✕
                        </button>

                        <div className="w-24 h-24 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center" style={{ background: 'var(--color-bg-void)' }}>
                            <span className="text-4xl">{selectedRelic.path === 'IGNITE' ? '🔥' : selectedRelic.path === 'RELEASE' ? '🌬️' : '🪨'}</span>
                        </div>

                        <h3 className="text-xl font-serif text-[var(--color-gold)] mb-1">
                            {selectedRelic.seed}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-white/50 mb-6">
                            {selectedRelic.rarity} {selectedRelic.path} Relic
                        </p>

                        <div className="flex gap-2 justify-center">
                            {/* In a real app, this would open RelicShareCard */}
                            <button className="px-6 py-2 bg-white/10 rounded-full text-xs uppercase hover:bg-white/20">
                                Share Card
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
