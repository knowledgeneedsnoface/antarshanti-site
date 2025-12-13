"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { X, Flame, TrendingUp, Activity, ArrowUpRight, ArrowRight, Minus, ArrowDownRight } from "lucide-react";
import SoulTwinReaction from "./SoulTwinReaction";

// Types
export type MoodHistoryItem = {
    date: number;
    previousMood: string;
    afterMood: string;
};

export type RitualHistoryItem = {
    date: number;
    ritualKey: string;
};

interface DailyDashboardProps {
    streakCount: number;
    weeklyCompletion: boolean[];
    moodHistory: MoodHistoryItem[];
    ritualHistory: RitualHistoryItem[];
    onCloseDashboard: () => void;
}

// Mood Value Setup
const MOOD_VALUES: Record<string, number> = {
    energized: 5,
    ok: 4,
    neutral: 3,
    low: 2,
    drained: 1
};

export default function DailyDashboard({
    streakCount,
    weeklyCompletion,
    moodHistory,
    ritualHistory,
    onCloseDashboard
}: DailyDashboardProps) {

    // -----------------------------------------------------------------
    // LOGIC: Insights Calculation
    // -----------------------------------------------------------------
    const insights = useMemo(() => {
        if (!ritualHistory.length || !moodHistory.length) return null;

        // 1. Most Common Ritual
        const ritualCounts: Record<string, number> = {};
        ritualHistory.forEach(r => {
            ritualCounts[r.ritualKey] = (ritualCounts[r.ritualKey] || 0) + 1;
        });
        const topRitual = Object.entries(ritualCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
        // Format Name (simple capitalize or map)
        const formatName = (key: string) => key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // 2. Most Frequent Mood
        const moodCounts: Record<string, number> = {};
        moodHistory.forEach(m => {
            moodCounts[m.afterMood] = (moodCounts[m.afterMood] || 0) + 1;
        });
        const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

        // 3. Shift
        let totalShift = 0;
        moodHistory.forEach(m => {
            const pre = MOOD_VALUES[m.previousMood] || 3;
            const post = MOOD_VALUES[m.afterMood] || 3;
            totalShift += (post - pre);
        });
        const avgShift = totalShift / moodHistory.length;
        let shiftText = "Steady";
        if (avgShift > 0.5) shiftText = "Improving";
        if (avgShift < -0.2) shiftText = "Dipping";

        // 4. Trajectory (Last 3)
        let trajectory = "Stable";
        if (moodHistory.length >= 3) {
            const last3 = moodHistory.slice(-3).map(m => MOOD_VALUES[m.afterMood] || 3);
            if (last3[2] > last3[0]) trajectory = "Rising";
            else if (last3[2] < last3[0]) trajectory = "Fluctuating";
        }

        return {
            topRitual: formatName(topRitual),
            topMood: topMood.charAt(0).toUpperCase() + topMood.slice(1),
            shift: shiftText,
            trajectory
        };
    }, [ritualHistory, moodHistory]);


    // -----------------------------------------------------------------
    // LOGIC: Graph Generation
    // -----------------------------------------------------------------
    const graphPath = useMemo(() => {
        if (moodHistory.length < 2) return "";

        const width = 100;
        const height = 50;
        const points = moodHistory.slice(-14).map((m, i, arr) => {
            const val = MOOD_VALUES[m.afterMood] || 3;
            const x = (i / (arr.length - 1)) * width;
            const y = height - ((val - 1) / 4) * height; // Scale 1-5 to height
            return `${x},${y}`;
        });

        // Simple line for now (Bezier would be nicer but basic polyline meets requirements)
        return `M ${points.join(" L ")}`;
    }, [moodHistory]);


    return (
        <div className="fixed inset-0 z-50 bg-[#FDFBF7] text-gray-800 overflow-y-auto font-sans flex flex-col">

            {/* Header */}
            <header className="p-6 flex items-center justify-between border-b border-amber-100 bg-white/50 backdrop-blur-md sticky top-0 z-40">
                <h2 className="text-xl font-serif text-[#2D2438]">Your Insights</h2>
                <button onClick={onCloseDashboard} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <X size={20} />
                </button>
            </header>

            <div className="p-6 space-y-6 max-w-md mx-auto w-full pb-24">

                {/* Twin Welcome */}
                <SoulTwinReaction
                    eventType="dashboard_opened"
                    characterMode="gann_baba"
                    className="mb-2"
                />

                {/* 
                    SECTION 1: STREAK CARD
                */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-[40px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div className="flex items-center gap-2 mb-1">
                        <Flame className="text-orange-500 fill-orange-500" size={24} />
                        <span className="text-3xl font-bold text-gray-900">{streakCount} Streak</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Consistency creates change.</p>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">This Week</span>
                        </div>
                        <div className="flex justify-between">
                            {weeklyCompletion.map((done, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 + (i * 0.05) }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                                        ${done ? "bg-amber-400 border-amber-400 text-white shadow-md" : "border-gray-200 bg-gray-50 text-transparent"}
                                    `}
                                >
                                    {done && <Activity size={14} />}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 
                    SECTION 2: MOOD GRAPH
                */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100"
                >
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-900">Mood Trend</h3>
                        <p className="text-xs text-gray-500">Aapke dil aur mann ka safar.</p>
                    </div>

                    <div className="h-40 relative w-full flex items-end">
                        {moodHistory.length < 3 ? (
                            <div className="w-full h-full flex items-center justify-center text-center text-sm text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                More data needed to<br />show your mood trend.
                            </div>
                        ) : (
                            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                {/* Grid Lines */}
                                <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.5" />
                                <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                                <line x1="0" y1="40" x2="100" y2="40" stroke="#f3f4f6" strokeWidth="0.5" />

                                <defs>
                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F59E0B" />
                                        <stop offset="1" stopColor="#D97706" />
                                    </linearGradient>
                                </defs>

                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    d={graphPath}
                                    fill="none"
                                    stroke="url(#lineGrad)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Points */}
                                {moodHistory.slice(-14).map((m, i, arr) => {
                                    const val = MOOD_VALUES[m.afterMood] || 3;
                                    const x = (i / (arr.length - 1)) * 100;
                                    const y = 50 - ((val - 1) / 4) * 50;
                                    return (
                                        <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" stroke="#D97706" strokeWidth="0.5" />
                                    )
                                })}
                            </svg>
                        )}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase tracking-wide">
                        <span>Past 2 Weeks</span>
                        <span>Today</span>
                    </div>
                </motion.div>

                {/* 
                    SECTION 3: INSIGHTS
                */}
                {insights && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 rounded-2xl p-6 shadow-sm border border-amber-200/50"
                    >
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-amber-600" />
                            Key Insights
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                <p className="text-[10px] text-amber-700 font-bold uppercase mb-1">Top Ritual</p>
                                <p className="text-sm font-semibold text-gray-800">{insights.topRitual}</p>
                            </div>
                            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                <p className="text-[10px] text-amber-700 font-bold uppercase mb-1">Top Mood</p>
                                <p className="text-sm font-semibold text-gray-800">{insights.topMood}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                                <p className="text-[10px] text-blue-700 font-bold uppercase mb-1">Shift</p>
                                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                                    {insights.shift === "Improving" ? <ArrowUpRight size={14} className="text-green-500" /> :
                                        insights.shift === "Dipping" ? <ArrowDownRight size={14} className="text-red-500" /> : <Minus size={14} className="text-blue-400" />}
                                    {insights.shift}
                                </div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                <p className="text-[10px] text-green-700 font-bold uppercase mb-1">Trajectory</p>
                                <p className="text-sm font-semibold text-gray-800">{insights.trajectory}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Section 4: Close Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCloseDashboard}
                    className="w-full py-4 bg-gradient-to-r from-[#D4A94A] to-[#B8860B] text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                    Back to Home
                    <ArrowRight size={20} />
                </motion.button>

            </div>
        </div>
    );
}
