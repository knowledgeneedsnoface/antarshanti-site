"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { MindStateKey } from "./MindRealm";
import { HeartStateKey } from "./HeartRealm";
import { ShadowStateKey } from "./ShadowRealm";
import { generateInsight } from "@/lib/innerAtlasInsights";

// ============================================================================
// Types
// ============================================================================

interface InnerAtlasResultsProps {
    mindState: MindStateKey;
    heartState: HeartStateKey;
    shadowState: ShadowStateKey;
    onContinue?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export default function InnerAtlasResults({
    mindState,
    heartState,
    shadowState,
    onContinue
}: InnerAtlasResultsProps) {
    const profile = generateInsight(mindState, heartState, shadowState);

    // State labels for display
    const stateLabels = {
        mind: mindState.replace(/_/g, " "),
        heart: heartState.replace(/_/g, " "),
        shadow: shadowState.replace(/_/g, " ")
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white font-sans overflow-y-auto overflow-x-hidden">

            {/* Background ambiance */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,169,74,0.1)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 md:py-20">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                        className="inline-block mb-6"
                    >
                        <Sparkles className="w-16 h-16 text-[#d4a94a]" />
                    </motion.div>

                    <h1 className="text-2xl md:text-3xl font-light text-gray-400 mb-3">
                        Your Inner Atlas
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a94a] via-white to-[#d4a94a] mb-4">
                        {profile.archetype}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#d4a94a] font-light">
                        {profile.title}
                    </p>
                </motion.div>

                {/* Your Selections Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
                >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Mind</p>
                        <p className="text-sm md:text-base text-white capitalize">{stateLabels.mind}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Heart</p>
                        <p className="text-sm md:text-base text-pink-300 capitalize">{stateLabels.heart}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Shadow</p>
                        <p className="text-sm md:text-base text-[#bfa76a] capitalize">{stateLabels.shadow}</p>
                    </div>
                </motion.div>

                {/* Main Insight Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-10 mb-8 shadow-2xl"
                >
                    <div className="space-y-6">
                        {/* Insight */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#d4a94a]" />
                                Insight
                            </h3>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                {profile.insight}
                            </p>
                        </div>

                        {/* Guidance */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#d4a94a]" />
                                Guidance
                            </h3>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                {profile.guidance}
                            </p>
                        </div>

                        {/* Next Step */}
                        <div className="bg-[#d4a94a]/10 border border-[#d4a94a]/30 rounded-xl p-5">
                            <h3 className="text-lg font-semibold text-[#d4a94a] mb-2">
                                Next Step
                            </h3>
                            <p className="text-base text-gray-200">
                                {profile.nextStep}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    {onContinue && (
                        <button
                            onClick={onContinue}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4a94a] to-[#b8860b] text-[#0a0a0f] font-bold text-lg rounded-xl shadow-lg hover:shadow-[#d4a94a]/50 hover:scale-105 transition-all"
                        >
                            Continue Your Journey
                            <ArrowRight size={20} />
                        </button>
                    )}

                    <button
                        onClick={() => window.print()}
                        className="px-8 py-4 bg-white/5 border border-white/20 text-white font-medium text-lg rounded-xl hover:bg-white/10 transition-all"
                    >
                        Save This Insight
                    </button>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-center text-sm text-gray-500 mt-12"
                >
                    Remember: This is just a snapshot of where you are right now. You can always return.
                </motion.p>

            </div>
        </div>
    );
}
