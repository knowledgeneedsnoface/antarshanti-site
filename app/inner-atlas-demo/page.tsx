"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";
import HeartRealm, { HeartStateKey } from "@/components/InnerAtlas/HeartRealm";
import ShadowRealm, { ShadowStateKey } from "@/components/InnerAtlas/ShadowRealm";
import KurukshetraSelection, { BattleKey } from "@/components/InnerAtlas/KurukshetraSelection";
import PowerObjectsSelector, { DhanushKey, ChakraKey, RathKey } from "@/components/InnerAtlas/PowerObjectsSelector";
import InnerAtlasResults from "@/components/InnerAtlas/InnerAtlasResults";
import ProgressIndicator from "@/components/InnerAtlas/ProgressIndicator";

export default function InnerAtlasDemo() {
    const [step, setStep] = useState<"ARRIVAL" | "MIND" | "HEART" | "SHADOW" | "KURUKSHETRA" | "POWER_OBJECTS" | "RESULTS">("ARRIVAL");
    const [selectedMind, setSelectedMind] = useState<MindStateKey | null>(null);
    const [selectedHeart, setSelectedHeart] = useState<HeartStateKey | null>(null);
    const [selectedShadow, setSelectedShadow] = useState<ShadowStateKey | null>(null);
    const [selectedBattle, setSelectedBattle] = useState<BattleKey | null>(null);
    const [selectedPowerObjects, setSelectedPowerObjects] = useState<{ dhanush: DhanushKey; chakra: ChakraKey; rath: RathKey } | null>(null);

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
        setStep("KURUKSHETRA");
    };

    const handleKurukshetraSelection = (battle: BattleKey) => {
        setSelectedBattle(battle);
        setStep("POWER_OBJECTS");
    };

    const handlePowerObjectsSelection = (selections: { dhanush: DhanushKey; chakra: ChakraKey; rath: RathKey }) => {
        setSelectedPowerObjects(selections);
        setStep("RESULTS");
    };

    const handleReset = () => {
        setStep("ARRIVAL");
        setSelectedMind(null);
        setSelectedHeart(null);
        setSelectedShadow(null);
        setSelectedBattle(null);
        setSelectedPowerObjects(null);
    };

    return (
        <main className="w-full h-screen bg-black overflow-hidden relative">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={step} />

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

                {step === "KURUKSHETRA" && (
                    <motion.div
                        key="kurukshetra"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 z-10"
                    >
                        <KurukshetraSelection onKurukshetraSelection={handleKurukshetraSelection} />
                    </motion.div>
                )}

                {step === "POWER_OBJECTS" && (
                    <motion.div
                        key="power-objects"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 z-10"
                    >
                        <PowerObjectsSelector onPowerObjectsSelection={handlePowerObjectsSelection} />
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
