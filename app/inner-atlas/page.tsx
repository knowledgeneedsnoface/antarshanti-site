"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChariotArrival from "@/components/InnerAtlas/ChariotArrival";
import MindRealm, { MindStateKey } from "@/components/InnerAtlas/MindRealm";
import HeartRealm, { HeartStateKey } from "@/components/InnerAtlas/HeartRealm";
import ShadowRealm, { ShadowStateKey } from "@/components/InnerAtlas/ShadowRealm";
import KurukshetraSelection, { BattleKey } from "@/components/InnerAtlas/KurukshetraSelection";
import PowerObjectsSelector, { DhanushKey, ChakraKey, RathKey } from "@/components/InnerAtlas/PowerObjectsSelector";
import CosmicGitaMoment from "@/components/InnerAtlas/CosmicGitaMoment";
import SoulMapReveal from "@/components/InnerAtlas/SoulMapReveal";
import RitualAssignment from "@/components/InnerAtlas/RitualAssignment";
import ProgressIndicator from "@/components/InnerAtlas/ProgressIndicator";

import AudioProvider, { useAudio } from "@/components/InnerAtlas/AudioController";

// Mappings for Gita Line (Duplicated from CosmicGitaMoment for state management)
const GITA_MAPPINGS: Record<BattleKey, string> = {
    duty_vs_desire: "Jo tumhara sachcha raasta hai… wahi tumhara dharma hai.",
    fear_vs_ambition: "Himmat ka matlab darr na hona nahin… darr ke bawajood aage badhna hai.",
    love_vs_boundaries: "Pyaar tab tak sundar hai jab tak tum khud ko nahi khona.",
    truth_vs_comfort: "Sach ki taraf uthaya ek kadam… poori zindagi badal deta hai.",
    chaos_vs_focus: "Jahan tumhara dhyaan jaata hai… wahan tumhari zindagi banti hai."
};

function InnerAtlasContent() {
    const { playAmbient, playSelect, playHover, playTransition, playReveal } = useAudio();
    const [step, setStep] = useState<"ARRIVAL" | "MIND" | "HEART" | "SHADOW" | "KURUKSHETRA" | "POWER_OBJECTS" | "COSMIC_GITA" | "RESULTS" | "RITUAL_ASSIGNMENT">("ARRIVAL");
    const [selectedMind, setSelectedMind] = useState<MindStateKey | null>(null);
    const [selectedHeart, setSelectedHeart] = useState<HeartStateKey | null>(null);
    const [selectedShadow, setSelectedShadow] = useState<ShadowStateKey | null>(null);
    const [selectedBattle, setSelectedBattle] = useState<BattleKey | null>(null);
    const [selectedPowerObjects, setSelectedPowerObjects] = useState<{ dhanush: DhanushKey; chakra: ChakraKey; rath: RathKey } | null>(null);

    // Initial Ambience
    useEffect(() => {
        playAmbient("calm");
    }, [playAmbient]);

    const handleStartAtlas = () => {
        playSelect();
        playTransition();
        setStep("MIND");
    };

    const handleMindSelection = (state: MindStateKey) => {
        playSelect();
        setSelectedMind(state);
        setTimeout(() => {
            playTransition();
            setStep("HEART");
        }, 500);
    };

    const handleHeartSelection = (state: HeartStateKey) => {
        playSelect();
        setSelectedHeart(state);
        setTimeout(() => {
            playTransition();
            setStep("SHADOW");
        }, 500);
    };

    const handleShadowSelection = (state: ShadowStateKey) => {
        playSelect();
        setSelectedShadow(state);
        playAmbient("battle"); // Switch ambience for Battle
        setTimeout(() => {
            playTransition();
            setStep("KURUKSHETRA");
        }, 500);
    };

    const handleKurukshetraSelection = (battle: BattleKey) => {
        playSelect();
        setSelectedBattle(battle);
        playAmbient("cosmic"); // Switch ambience for Cosmic/Power
        playTransition();
        setStep("POWER_OBJECTS");
    };

    const handlePowerObjectsSelection = (selections: { dhanush: DhanushKey; chakra: ChakraKey; rath: RathKey }) => {
        playSelect();
        setSelectedPowerObjects(selections);
        playReveal();
        setStep("COSMIC_GITA");
    };

    const handleGitaMomentComplete = () => {
        playTransition();
        setStep("RESULTS");
    };

    const handleSoulMapComplete = () => {
        playSelect();
        playTransition();
        setStep("RITUAL_ASSIGNMENT");
    };

    const handleRitualAssigned = (assignedRitualKey: string) => {
        // Redirect to ritual onboarding or dashboard with the assigned ritual
        console.log("Assigned Ritual:", assignedRitualKey);
        // For now, redirect to Get Started page
        window.location.href = `/get-started?ritual=${assignedRitualKey}`;
    };

    return (
        <main className="w-full h-screen bg-black overflow-hidden relative">
            {/* Progress Indicator */}
            {step !== "RITUAL_ASSIGNMENT" && <ProgressIndicator currentStep={step === "RESULTS" ? "RESULTS" : step as any} />}

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

                {step === "COSMIC_GITA" && selectedBattle && (
                    <motion.div
                        key="cosmic-gita"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                        className="absolute inset-0 z-10"
                    >
                        <CosmicGitaMoment
                            kurukshetraBattleKey={selectedBattle}
                            onGitaMomentComplete={handleGitaMomentComplete}
                        />
                    </motion.div>
                )}

                {step === "RESULTS" && selectedMind && selectedHeart && selectedShadow && selectedBattle && selectedPowerObjects && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10"
                    >
                        <SoulMapReveal
                            mindStateKey={selectedMind}
                            heartStateKey={selectedHeart}
                            shadowStateKey={selectedShadow}
                            kurukshetraBattleKey={selectedBattle}
                            powerObjects={selectedPowerObjects}
                            gitaLine={GITA_MAPPINGS[selectedBattle] || GITA_MAPPINGS.truth_vs_comfort}
                            onSoulMapComplete={handleSoulMapComplete}
                        />
                    </motion.div>
                )}

                {step === "RITUAL_ASSIGNMENT" && selectedBattle && selectedMind && selectedHeart && selectedShadow && selectedPowerObjects && (
                    <motion.div
                        key="ritual"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10"
                    >
                        <RitualAssignment
                            kurukshetraBattleKey={selectedBattle}
                            mindStateKey={selectedMind}
                            heartStateKey={selectedHeart}
                            shadowStateKey={selectedShadow}
                            powerObjects={selectedPowerObjects}
                            onRitualAssigned={handleRitualAssigned}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function InnerAtlasPage() {
    return (
        <AudioProvider>
            <InnerAtlasContent />
        </AudioProvider>
    );
}
