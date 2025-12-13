"use client";

import React from "react";
import { motion } from "framer-motion";

// ============================================================================
// Types
// ============================================================================

type Step = "ARRIVAL" | "MIND" | "HEART" | "SHADOW" | "KURUKSHETRA" | "POWER_OBJECTS" | "RESULTS";

interface ProgressIndicatorProps {
    currentStep: Step;
}

interface StepConfig {
    id: Step;
    label: string;
    index: number;
}

// ============================================================================
// Configuration
// ============================================================================

const STEPS: StepConfig[] = [
    { id: "ARRIVAL", label: "Arrival", index: 0 },
    { id: "MIND", label: "Mind", index: 1 },
    { id: "HEART", label: "Heart", index: 2 },
    { id: "SHADOW", label: "Shadow", index: 3 },
    { id: "KURUKSHETRA", label: "Battle", index: 4 },
    { id: "POWER_OBJECTS", label: "Power", index: 5 },
    { id: "RESULTS", label: "Insight", index: 6 },
];

// ============================================================================
// Component
// ============================================================================

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    const currentIndex = STEPS.find(s => s.id === currentStep)?.index ?? 0;

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="flex items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 md:px-6 py-3 shadow-2xl">
                {STEPS.map((step, idx) => {
                    const isActive = step.index === currentIndex;
                    const isComplete = step.index < currentIndex;
                    const isFuture = step.index > currentIndex;

                    return (
                        <React.Fragment key={step.id}>
                            {/* Step Circle */}
                            <div className="flex flex-col items-center gap-1">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.2 : 1,
                                        backgroundColor: isActive
                                            ? "#d4a94a"
                                            : isComplete
                                                ? "#6b7280"
                                                : "#1f2937"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`
                    w-2 h-2 md:w-3 md:h-3 rounded-full
                    ${isActive ? "ring-2 ring-[#d4a94a]/50 ring-offset-2 ring-offset-black/40" : ""}
                  `}
                                />
                                <motion.p
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : isFuture ? 0.3 : 0.5,
                                        color: isActive ? "#d4a94a" : "#9ca3af"
                                    }}
                                    className="text-[10px] md:text-xs font-medium hidden md:block"
                                >
                                    {step.label}
                                </motion.p>
                            </div>

                            {/* Connector Line */}
                            {idx < STEPS.length - 1 && (
                                <motion.div
                                    initial={false}
                                    animate={{
                                        backgroundColor: isComplete ? "#6b7280" : "#1f2937"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="h-[2px] rounded-full w-3 md:w-6"
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
