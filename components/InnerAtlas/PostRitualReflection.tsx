"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Flame, ArrowRight } from "lucide-react";
import SoulTwinReaction from "./SoulTwinReaction";

interface PostRitualReflectionProps {
    assignedRitualKey: string;
    previousMood: string;
    streakCount?: number;
    weeklyCompletion?: boolean[];
    onReflectionComplete: (data: ReflectionData) => void;
}

export type ReflectionData = {
    ritual: string;
    previousMood: string;
    afterMood: string;
    reflectionNote: string | null;
    timestamp: number;
};

const MOODS = [
    { id: "energized", emoji: "😀", label: "Energized" },
    { id: "ok", emoji: "🙂", label: "Okay" },
    { id: "neutral", emoji: "😐", label: "Neutral" },
    { id: "low", emoji: "😔", label: "Low" },
    { id: "drained", emoji: "😩", label: "Drained" }
];

const CELEBRATION_MESSAGES: Record<string, string> = {
    karma_yoga: "Clarity creates movement.",
    tapasya: "Aaj tumne courage build kiya.",
    bhakti: "Warmth flows from the heart.",
    satya: "Sach ne tumhe halka kiya.",
    dhyana: "Saans ne tumhe grounded kiya."
};

// Default placeholders if props missing
const DEFAULT_STREAK = 12;
const DEFAULT_WEEKLY = [true, true, false, true, true, true, true]; // Sun-Sat, today is last

export default function PostRitualReflection({
    assignedRitualKey,
    previousMood,
    streakCount = DEFAULT_STREAK,
    weeklyCompletion = DEFAULT_WEEKLY,
    onReflectionComplete
}: PostRitualReflectionProps) {
    const [afterMood, setAfterMood] = useState<string | null>(null);
    const [reflectionNote, setReflectionNote] = useState("");

    const handleFinish = () => {
        if (!afterMood) return;

        onReflectionComplete({
            ritual: assignedRitualKey,
            previousMood,
            afterMood,
            reflectionNote: reflectionNote.trim() || null,
            timestamp: Date.now()
        });
    };

    const subline = CELEBRATION_MESSAGES[assignedRitualKey] || "Ritual Complete";

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center py-10 px-6 font-sans text-gray-800 overflow-y-auto">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: [0, 0.6, 0], y: -100 }}
                        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
                        className="absolute w-2 h-2 bg-amber-200 rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10 space-y-8"
            >

                {/* 
           SECTION 1: CELEBRATION
        */}
                <div className="text-center flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 mb-4"
                    >
                        <img src="/assets/ritual-success.svg" alt="Success" className="w-full h-full drop-shadow-lg" />
                    </motion.div>
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Ritual Complete!</h1>
                    <p className="text-lg text-amber-800 italic font-medium">"{subline}"</p>
                </div>

                {/* 
           SECTION 2: MOOD SELECTOR
        */}
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50">
                    <label className="block text-center text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                        How do you feel now?
                    </label>
                    <div className="flex justify-between items-center text-3xl px-2">
                        {MOODS.map((mood) => (
                            <button
                                key={mood.id}
                                onClick={() => setAfterMood(mood.id)}
                                className={`transition-all duration-200 transform hover:scale-110 p-2 rounded-full relative
                            ${afterMood === mood.id ? "scale-125 bg-amber-100 shadow-md" : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"}
                        `}
                            >
                                {mood.emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 
           SECTION 3: REFLECTION
        */}
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50">
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Anything you want to note down?
                    </label>
                    <textarea
                        value={reflectionNote}
                        onChange={(e) => setReflectionNote(e.target.value)}
                        maxLength={240}
                        placeholder="Write a few words… optional."
                        className="w-full bg-white/50 border border-gray-200 rounded-xl p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none h-24"
                    />
                    <div className="text-right text-xs text-gray-400 mt-1">
                        {reflectionNote.length}/240
                    </div>
                </div>

                {/* 
            SECTION 4: STREAK
        */}
                <div className="flex items-center justify-between bg-[#2D2438] text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/20 p-2 rounded-full">
                            <Flame className="text-orange-400" fill="currentColor" size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-white/60 uppercase font-bold tracking-wider">Current Streak</p>
                            <p className="text-2xl font-bold">{streakCount} Days</p>
                        </div>
                    </div>

                    <div className="flex gap-1.5">
                        {weeklyCompletion.map((done, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full ${done ? "bg-orange-400" : "bg-white/20"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Twin Reaction */}
                <div className="flex justify-center -mt-2">
                    <SoulTwinReaction
                        eventType="streak_updated"
                        eventPayload={{ streak: streakCount }}
                        characterMode="mira_maya" // Celebratory mode
                        className="bg-white/60 p-2 pr-4 rounded-3xl"
                    />
                </div>

                {/* 
            SECTION 5: CTA
        */}
                <motion.button
                    disabled={!afterMood}
                    onClick={handleFinish}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all
                ${afterMood
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
                >
                    Finish & Continue
                    <ArrowRight size={20} />
                </motion.button>

            </motion.div>
        </div>
    );
}
