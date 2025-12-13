"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";
import HeartRealm, { HeartStateKey } from "@/components/InnerAtlas/HeartRealm";
import ShadowRealm, { ShadowStateKey } from "@/components/InnerAtlas/ShadowRealm";
import InnerAtlasResults from "@/components/InnerAtlas/InnerAtlasResults";

export default function InnerAtlasDemo() {
    const [step, setStep] = useState<"ARRIVAL" | "MIND" | "HEART" | "SHADOW" | "RESULTS">("ARRIVAL");
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
        setStep("RESULTS");
    };

    const handleReset = () => {
        setStep("ARRIVAL");
        setSelectedMind(null);
        setSelectedHeart(null);
        setSelectedShadow(null);
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

                {step === "RESULTS" && selectedMind && selectedHeart && selectedShadow && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10"
                    >
                        <InnerAtlasResults
                            mindState={selectedMind}
                            heartState={selectedHeart}
                            shadowState={selectedShadow}
                            onContinue={handleReset}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
