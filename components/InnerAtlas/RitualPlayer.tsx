"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface RitualPlayerProps {
    assignedRitualKey: string;
    onRitualComplete: (key: string) => void;
    mood?: string; // "energized" | "okay" | "neutral" | "low" | "drained"
    streakCount?: number;
}

type StepData = {
    title: string;
    instruction: string;
    duration: number; // in seconds
    isReflection?: boolean;
};

type RitualContent = {
    name: string;
    color: string;
    bgGradient: string;
    steps: StepData[];
    completion: {
        title: string;
        subline: string;
    };
};

const STEP_DURATION = 180; // 3 minutes
const REFLECTION_DURATION = 60; // 1 minute

// DEV OVERRIDE: Uncomment to test faster (5s per step)
// const STEP_DURATION = 5;
// const REFLECTION_DURATION = 5;

const RITUALS: Record<string, RitualContent> = {
    karma_yoga: {
        name: "Karma Yoga",
        color: "#D4A94A", // Gold
        bgGradient: "from-[#FDFBF7] to-[#F4ECD8]",
        steps: [
            { title: "Breathe & Observe", instruction: "Just watch your breath… bina control kiye.", duration: STEP_DURATION },
            { title: "Purpose Reflection", instruction: "Kaunsa ek simple kaam aaj tumhe aage le jaayega?", duration: STEP_DURATION },
            { title: "Commitment", instruction: "Is action ka mental commitment lo… sirf 10 minutes ki clarity.", duration: STEP_DURATION },
            { title: "Reflection", instruction: "Kal se behtar, aaj ho raha hai.", duration: REFLECTION_DURATION, isReflection: true }
        ],
        completion: { title: "Ritual Complete!", subline: "Clarity creates movement." }
    },
    tapasya: {
        name: "Tapasya",
        color: "#E74C3C", // Red/Orange
        bgGradient: "from-[#FFF5F5] to-[#FFE0E0]",
        steps: [
            { title: "Courageful Breathing", instruction: "Darr ko saans ke saath dheere dheere dissolve karo.", duration: STEP_DURATION },
            { title: "Face Discomfort", instruction: "Koi ek chhota discomfort choose karo… usko feel karo.", duration: STEP_DURATION },
            { title: "Hold Steadiness", instruction: "Is moment ko pakdo… tumhara courage yahin banta hai.", duration: STEP_DURATION },
            { title: "Reflection", instruction: "Aaj tumne apne aap ko prove kiya.", duration: REFLECTION_DURATION, isReflection: true }
        ],
        completion: { title: "Ritual Complete!", subline: "Courage grows in small steps." }
    },
    bhakti: {
        name: "Bhakti",
        color: "#FF69B4", // Pink
        bgGradient: "from-[#FFF0F5] to-[#FFE4EB]",
        steps: [
            { title: "Heart Activation", instruction: "Haath ko dil par rakho… warmth feel karo.", duration: STEP_DURATION },
            { title: "Recall Warmth", instruction: "Koi ek moment ya person yaad karo jahan tumne pyaar mehsoos kiya.", duration: STEP_DURATION },
            { title: "Send Gratitude", instruction: "Dil se shukriya bhejo… inward or outward.", duration: STEP_DURATION },
            { title: "Reflection", instruction: "Pyaar tumhare andar hi tha.", duration: REFLECTION_DURATION, isReflection: true }
        ],
        completion: { title: "Ritual Complete!", subline: "Warmth flows from the heart." }
    },
    satya: {
        name: "Satya",
        color: "#3498DB", // Blue
        bgGradient: "from-[#F0F8FF] to-[#E0F0FF]",
        steps: [
            { title: "Stillness", instruction: "Seedhe baith kar sirf silence ko suno.", duration: STEP_DURATION },
            { title: "Truth Inquiry", instruction: "Khud se poochho: 'Main kis sach se bach raha hoon?'", duration: STEP_DURATION },
            { title: "One Line Truth", instruction: "Is sach ko sirf ek sentence me naam do.", duration: STEP_DURATION },
            { title: "Reflection", instruction: "Simplicity hi sach hai.", duration: REFLECTION_DURATION, isReflection: true }
        ],
        completion: { title: "Ritual Complete!", subline: "Truth makes life lighter." }
    },
    dhyana: {
        name: "Dhyana",
        color: "#9B59B6", // Purple
        bgGradient: "from-[#FAFAFF] to-[#ECECFF]",
        steps: [
            { title: "Deep Breathing", instruction: "Nose → chest → belly… rhythm ko follow karo.", duration: STEP_DURATION },
            { title: "Thought Labeling", instruction: "Har thought ko label karo: 'soch', 'memory', 'planning'.", duration: STEP_DURATION },
            { title: "Return to Breath", instruction: "Bas saans par wapas aa jao… baar baar.", duration: STEP_DURATION },
            { title: "Reflection", instruction: "Clarity tumhare saath hi thi.", duration: REFLECTION_DURATION, isReflection: true }
        ],
        completion: { title: "Ritual Complete!", subline: "Calm brings direction." }
    }
};

// Mood-based step variations
const MOOD_VARIATIONS: Record<string, StepData> = {
    drained_short: { title: "Gentle Breathing", instruction: "Bas 5 minute... tumhare liye kaafi hai aaj.", duration: 60, isReflection: false },
    energized_challenge: { title: "Extended Practice", instruction: "Aaj tumhare paas energy hai... thoda aur deep jaate hain.", duration: STEP_DURATION + 60, isReflection: false },
    streak_celebration: { title: "Streak Reflection", instruction: "Dekho kitna door aa gaye ho... consistency tumhari strength hai.", duration: REFLECTION_DURATION, isReflection: true },
    broken_forgiveness: { title: "Self-Compassion", instruction: "Ruk gaye the... koi baat nahi. Aaj phir shuru karte hain.", duration: REFLECTION_DURATION, isReflection: true }
};

export default function RitualPlayer({ assignedRitualKey, onRitualComplete, mood, streakCount = 0 }: RitualPlayerProps) {
    const baseRitual = RITUALS[assignedRitualKey] || RITUALS["karma_yoga"];

    // Adapt ritual based on mood and streak
    const getAdaptedSteps = (): StepData[] => {
        let steps = [...baseRitual.steps];

        // If drained, shorten ritual
        if (mood === "drained") {
            steps = [MOOD_VARIATIONS.drained_short, steps[steps.length - 1]]; // Just breathing + reflection
        }

        // If energized, add challenge step
        if (mood === "energized") {
            steps.splice(steps.length - 1, 0, MOOD_VARIATIONS.energized_challenge);
        }

        // If 3+ day streak, add celebration
        if (streakCount >= 3 && streakCount % 3 === 0) {
            steps.splice(steps.length - 1, 0, MOOD_VARIATIONS.streak_celebration);
        }

        // If streak was broken (streakCount === 1 after gap), add forgiveness
        // This is a simplified check - in real implementation, you'd track last completion date
        if (streakCount === 1) {
            steps.splice(0, 0, MOOD_VARIATIONS.broken_forgiveness);
        }

        return steps;
    };

    const ritual: RitualContent = {
        ...baseRitual,
        steps: getAdaptedSteps()
    };

    const [stepIndex, setStepIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(ritual.steps[0].duration);
    const [complete, setComplete] = useState(false);
    const [isActive, setIsActive] = useState(true); // Auto-start

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && !complete) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Check if next step exists
                        if (stepIndex < ritual.steps.length - 1) {
                            handleNextStep();
                            return ritual.steps[stepIndex + 1].duration;
                        } else {
                            // Ritual Finish
                            setComplete(true);
                            setIsActive(false);
                            return 0;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, complete, stepIndex, ritual.steps]);

    const handleNextStep = () => {
        setStepIndex((prev) => prev + 1);
    };

    const currentStep = ritual.steps[stepIndex];
    const progress = ((currentStep.duration - timeLeft) / currentStep.duration) * 100;

    // Format Time MM:SS
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleExit = () => {
        if (window.confirm("End ritual early?")) {
            onRitualComplete(assignedRitualKey);
        }
    };

    if (complete) {
        return (
            <CompletionScreen
                ritual={ritual}
                onContinue={() => onRitualComplete(assignedRitualKey)}
            />
        );
    }

    return (
        <div className={`relative w-full h-full min-h-screen bg-gradient-to-b ${ritual.bgGradient} flex flex-col overflow-hidden`}>

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Breathing BG Overlay */}
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white/30"
                />
                {/* Particles */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: -100, opacity: [0, 1, 0] }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: ritual.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className="relative z-10 w-full p-6 flex justify-between items-center text-gray-800">
                <button onClick={handleExit} className="p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors">
                    <X size={20} />
                </button>
                <div className="text-sm font-bold tracking-widest uppercase opacity-60">
                    {ritual.name}
                </div>
                <div className="w-8" /> {/* Spacer */}
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 text-center">

                {/* Breathing Circle */}
                <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                    {/* Outer Rings */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-full h-full rounded-full border-2"
                        style={{ borderColor: ritual.color }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.2, 0.05] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute w-full h-full rounded-full border"
                        style={{ borderColor: ritual.color }}
                    />

                    {/* Inner Circle / Timer */}
                    <motion.div
                        animate={{ scale: [0.95, 1.05, 0.95] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 rounded-full bg-white/80 backdrop-blur-sm shadow-xl flex items-center justify-center flex-col border border-white"
                    >
                        <span className="text-4xl font-light tabular-nums text-gray-800 tracking-tight">
                            {formatTime(timeLeft)}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
                            {currentStep.isReflection ? "Reflect" : "Breathe"}
                        </span>
                    </motion.div>
                </div>

                {/* Text Content with Transitions */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md mx-auto"
                    >
                        <h2 className="text-xl md:text-2xl font-serif text-gray-900 mb-4 font-medium">
                            {currentStep.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed italic">
                            "{currentStep.instruction}"
                        </p>
                    </motion.div>
                </AnimatePresence>

            </div>

            {/* Footer / Progress */}
            <div className="relative z-10 w-full p-8 pb-12">
                <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">
                    <span>Step {stepIndex + 1} of {ritual.steps.length}</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                {/* Progress Bar Container */}
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: ritual.color }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 1 }}
                    />
                </div>
            </div>

        </div>
    );
}

function CompletionScreen({ ritual, onContinue }: { ritual: RitualContent, onContinue: () => void }) {
    return (
        <div className={`relative w-full h-screen bg-gradient-to-b ${ritual.bgGradient} flex flex-col items-center justify-center p-6 text-center overflow-hidden`}>

            {/* Burst Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="w-[800px] h-[800px] rounded-full"
                    style={{ backgroundColor: ritual.color }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 max-w-md"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mb-6"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg text-green-500">
                        <CheckCircle size={32} />
                    </div>
                </motion.div>

                <h1 className="text-3xl font-serif text-gray-900 mb-2">
                    {ritual.completion.title}
                </h1>
                <p className="text-lg text-gray-600 mb-10 italic">
                    "{ritual.completion.subline}"
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onContinue}
                    className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl"
                    style={{ backgroundColor: ritual.color }}
                >
                    Continue
                </motion.button>
            </motion.div>
        </div>
    );
}
