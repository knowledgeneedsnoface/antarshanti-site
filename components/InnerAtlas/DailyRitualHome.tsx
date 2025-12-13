"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Sun } from "lucide-react";

interface DailyRitualHomeProps {
    assignedRitualKey: string;
    gitaLine?: string;
    onStartRitual: (key: string, mood?: string | null) => void;
}

// Ritual Data Mapping (Keyed by the ID passed in URL)
const RITUAL_DATA: Record<string, { name: string; subline: string; desc: string; img: string; color: string }> = {
    karma_yoga: {
        name: "Karma Yoga",
        subline: "Action with clarity.",
        desc: "10 minutes to reconnect with purpose.",
        img: "/assets/ritual-card-karma.svg",
        color: "#D4A94A"
    },
    tapasya: {
        name: "Tapasya",
        subline: "Inner courage practice.",
        desc: "Break fear through small disciplined effort.",
        img: "/assets/ritual-card-tapasya.svg",
        color: "#E74C3C"
    },
    bhakti: {
        name: "Bhakti",
        subline: "Warmth and self-love.",
        desc: "Reconnect with softness and gratitude.",
        img: "/assets/ritual-card-bhakti.svg",
        color: "#FF69B4"
    },
    satya: {
        name: "Satya",
        subline: "Truth alignment practice.",
        desc: "Face what matters with honesty.",
        img: "/assets/ritual-card-satya.svg",
        color: "#3498DB"
    },
    dhyana: {
        name: "Dhyana",
        subline: "Mind calming ritual.",
        desc: "Grounding breath work for clarity.",
        img: "/assets/ritual-card-dhyana.svg",
        color: "#9B59B6"
    }
};

// Mood Data
const MOODS = [
    { id: "energized", emoji: "😀", label: "Energized" },
    { id: "okay", emoji: "🙂", label: "Okay" },
    { id: "neutral", emoji: "😐", label: "Neutral" },
    { id: "low", emoji: "😔", label: "Low" },
    { id: "drained", emoji: "😩", label: "Drained" }
];

// Twin Reactions Map
const TWIN_REACTIONS: Record<string, string> = {
    energized: "Aaj tumhari energy strong lag rahi hai 😄",
    okay: "Sahi hai… chalo thoda sa clarity lete hain.",
    neutral: "Koi baat nahi... bas 10 minute khud ke liye.",
    low: "Main yahin hoon… aaj halka sa saath de dete hain ❤️",
    drained: "Chalo 10 minute ka ritual tumhe thoda grounded karega."
};

import DailyDashboard, { MoodHistoryItem, RitualHistoryItem } from "./DailyDashboard";
import SoulTwinReaction from "./SoulTwinReaction";
import DailySurpriseGenerator, { SurpriseItem } from "./DailySurpriseGenerator";
import { BarChart3, Gift } from "lucide-react";

// MOCK DATA FOR DASHBOARD
const MOCK_MOOD_HISTORY: MoodHistoryItem[] = [
    { date: Date.now() - 86400000 * 6, previousMood: "low", afterMood: "neutral" },
    { date: Date.now() - 86400000 * 5, previousMood: "neutral", afterMood: "ok" },
    { date: Date.now() - 86400000 * 4, previousMood: "low", afterMood: "low" },
    { date: Date.now() - 86400000 * 3, previousMood: "neutral", afterMood: "ok" },
    { date: Date.now() - 86400000 * 2, previousMood: "ok", afterMood: "energized" },
    { date: Date.now() - 86400000 * 1, previousMood: "ok", afterMood: "energized" },
    { date: Date.now(), previousMood: "neutral", afterMood: "ok" }
];

const MOCK_RITUAL_HISTORY: RitualHistoryItem[] = [
    { date: Date.now() - 86400000 * 6, ritualKey: "karma_yoga" },
    { date: Date.now() - 86400000 * 5, ritualKey: "tapasya" },
    { date: Date.now() - 86400000 * 4, ritualKey: "bhakti" },
    { date: Date.now() - 86400000 * 3, ritualKey: "karma_yoga" },
    { date: Date.now() - 86400000 * 2, ritualKey: "karma_yoga" },
    { date: Date.now() - 86400000 * 1, ritualKey: "dhyana" },
    { date: Date.now(), ritualKey: "karma_yoga" }
];

export default function DailyRitualHome({
    assignedRitualKey,
    gitaLine,
    onStartRitual
}: DailyRitualHomeProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showSurprise, setShowSurprise] = useState(false);
    const [lastSurpriseDate, setLastSurpriseDate] = useState<number | null>(null);

    // Default to Karma Yoga if key invalid
    const ritual = RITUAL_DATA[assignedRitualKey] || RITUAL_DATA["karma_yoga"];
    const twinText = selectedMood ? TWIN_REACTIONS[selectedMood] : "Kaisa mehsoos kar rahe ho aaj?";

    const handleSurpriseGenerated = (surprise: SurpriseItem) => {
        setLastSurpriseDate(Date.now());
        console.log("Surprise Unlocked:", surprise);
    };

    if (showDashboard) {
        return (
            <DailyDashboard
                streakCount={12}
                weeklyCompletion={[true, true, false, true, true, true, true]}
                moodHistory={MOCK_MOOD_HISTORY}
                ritualHistory={MOCK_RITUAL_HISTORY}
                onCloseDashboard={() => setShowDashboard(false)}
            />
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF5E1] via-[#FFFBF2] to-[#FFFFFF] font-sans text-gray-900 overflow-hidden flex flex-col items-center">

            {/* Surprise Overlay */}
            {showSurprise && (
                <DailySurpriseGenerator
                    lastSurpriseDate={lastSurpriseDate}
                    onSurpriseGenerated={handleSurpriseGenerated}
                    onClose={() => setShowSurprise(false)}
                />
            )}

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-gradient-to-b from-[#FFE4B5] to-transparent opacity-40 blur-[80px] rounded-full" />
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-2 h-2 bg-[#D4A94A] rounded-full blur-[2px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center h-full min-h-screen justify-between">

                {/* Header */}
                <header className="text-center mt-4 w-full relative">
                    <button
                        onClick={() => setShowSurprise(true)}
                        className="absolute left-0 top-0 p-2 text-purple-700/60 hover:text-purple-700 hover:bg-purple-100/50 rounded-full transition-all"
                    >
                        <Gift size={24} />
                        {/* Notification Dot */}
                        {!lastSurpriseDate && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
                    </button>
                    <button
                        onClick={() => setShowDashboard(true)}
                        className="absolute right-0 top-0 p-2 text-amber-700/60 hover:text-amber-700 hover:bg-amber-100/50 rounded-full transition-all"
                    >
                        <BarChart3 size={24} />
                    </button>
                    <h3 className="text-xs font-bold tracking-widest text-[#8B7355] uppercase mb-1 flex items-center justify-center gap-1">
                        <Sun size={14} /> Your Daily Ritual
                    </h3>
                    <h1 className="text-2xl font-serif text-[#2D2438]">{ritual.subline}</h1>
                    {gitaLine && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs text-[#8B7355]/80 mt-2 italic max-w-xs mx-auto"
                        >
                            "{gitaLine}"
                        </motion.p>
                    )}
                </header>

                {/* Big Ritual Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onStartRitual(assignedRitualKey, selectedMood)}
                    className="w-full relative aspect-[3/4] max-h-[400px] rounded-[30px] overflow-hidden shadow-2xl shadow-[#D4A94A]/20 cursor-pointer group my-6"
                >
                    <img src={ritual.img} alt={ritual.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-6 right-6 text-white">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-2"
                        >
                            <Sparkles className="text-[#F1C40F] opacity-80" />
                        </motion.div>
                        <h2 className="text-3xl font-bold font-serif mb-1">{ritual.name}</h2>
                        <p className="text-white/80 text-sm">{ritual.desc}</p>
                    </div>
                </motion.div>

                {/* Mood & Twin Section */}
                <div className="w-full space-y-6 mb-4">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm">
                        <p className="text-center text-xs font-bold text-[#5A4A3A] mb-3 uppercase tracking-wide">How are you feeling today?</p>
                        <div className="flex justify-between items-center text-2xl">
                            {MOODS.map((mood) => (
                                <button
                                    key={mood.id}
                                    onClick={() => setSelectedMood(mood.id)}
                                    className={`
                                transition-all duration-300 transform hover:scale-125 p-2 rounded-full relative
                                ${selectedMood === mood.id ? "scale-125 bg-[#FFEDD5]" : "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"}
                            `}
                                >
                                    {mood.emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Twin Presence */}
                    <div className="flex justify-center w-full">
                        <SoulTwinReaction
                            eventType={selectedMood ? "mood_selected" : "random_idle"}
                            eventPayload={{ mood: selectedMood }}
                            characterMode="duo"
                            onTwinTapped={() => { }} // Optional interaction
                            className="bg-white/40 p-2 pr-6 rounded-full backdrop-blur-sm"
                        />
                    </div>
                </div>

                {/* Start CTA */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(212,169,74,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onStartRitual(assignedRitualKey, selectedMood)}
                    className="w-full py-4 bg-gradient-to-r from-[#D4A94A] to-[#B8860B] text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2 mb-4"
                >
                    <Play fill="currentColor" size={20} />
                    Start Ritual (10 min)
                </motion.button>
            </div>
        </div>
    );
}
