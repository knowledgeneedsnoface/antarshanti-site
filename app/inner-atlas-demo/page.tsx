"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";

export default function InnerAtlasDemo() {
    const [step, setStep] = useState<"ARRIVAL" | "MIND" | "COMPLETE">("ARRIVAL");
    const [selectedMind, setSelectedMind] = useState<MindStateKey | null>(null);

    const handleStartAtlas = () => {
        setStep("MIND");
    };

    const handleMindSelection = (state: MindStateKey) => {
        setSelectedMind(state);
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

                {step === "COMPLETE" && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-[#0b1020] text-white"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">Journey Begun</h2>
                            <p className="text-xl text-gray-400">
                                Selected Mind State: <span className="text-[#d4a94a]">{selectedMind}</span>
                            </p>
                            <button
                                onClick={() => setStep("ARRIVAL")}
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
