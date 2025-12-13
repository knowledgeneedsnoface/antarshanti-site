"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";
import HeartRealm, { HeartStateKey } from "@/components/InnerAtlas/HeartRealm";
import ShadowRealm, { ShadowStateKey } from "@/components/InnerAtlas/ShadowRealm";

export default function InnerAtlasDemo() {
    const [step, setStep] = useState<"ARRIVAL" | "MIND" | "HEART" | "SHADOW" | "COMPLETE">("ARRIVAL");
    const [selectedMind, setSelectedMind] = useState<MindStateKey | null>(null);
    const [selectedHeart, setSelectedHeart] = useState<HeartStateKey | null>(null);
    const [selectedShadow, setSelectedShadow] = useState<ShadowStateKey | null>(null);

    const handleStartAtlas = () => {
        setStep("MIND");
    };

    const handleMindSelection = (state: MindStateKey) => {
        setSelectedMind(state);
        setStep("HEART");
    };

    const handleHeartSelection = (state: HeartStateKey) => {
        setSelectedHeart(state);
        setStep("SHADOW");
    };

    const handleShadowSelection = (state: ShadowStateKey) => {
        setSelectedShadow(state);
        setStep("COMPLETE");
    };

    return (
        <main className="w-full h-screen bg-black overflow-hidden relative">
            <AnimatePresence mode="wait">
                {step === "ARRIVAL" && (
                    <motion.div
                        key="arrival"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                        className="absolute inset-0 z-10"
                    >
                        <ChariotArrival onStartInnerAtlas={handleStartAtlas} />
                    </motion.div>
                )}

                {step === "MIND" && (
                    <motion.div
                        key="mind"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 z-10"
                    >
                        <MindRealm onMindSelection={handleMindSelection} />
                    </motion.div>
                )}

                {step === "HEART" && (
                    <motion.div
                        key="heart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 z-10"
                    >
                        <HeartRealm onHeartSelection={handleHeartSelection} />
                    </motion.div>
                )}

                {step === "SHADOW" && (
                    <motion.div
                        key="shadow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 z-10"
                    >
                        <ShadowRealm onShadowSelection={handleShadowSelection} />
                    </motion.div>
                )}

                {step === "COMPLETE" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-[#0b1020] text-white"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-6">Inner Atlas Complete</h2>
                            <div className="space-y-3 text-lg">
                                <p className="text-gray-400">
                                    Mind State: <span className="text-[#d4a94a]">{selectedMind}</span>
                                </p>
                                <p className="text-gray-400">
                                    Heart State: <span className="text-pink-400">{selectedHeart}</span>
                                </p>
                                <p className="text-gray-400">
                                    Shadow: <span className="text-[#bfa76a]">{selectedShadow}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setStep("ARRIVAL");
                                    setSelectedMind(null);
                                    setSelectedHeart(null);
                                    setSelectedShadow(null);
                                }}
                                className="mt-8 text-sm underline opacity-50 hover:opacity-100"
                            >
                                Reset Demo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
