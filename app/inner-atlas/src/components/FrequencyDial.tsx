"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useAudio } from "../contexts/AudioContext";

interface FrequencyDialProps {
    onFrequencySelected: (frequency: number, label: string) => void;
    onFrequencyChange: (frequency: number) => void;
}

const FREQUENCY_STATES = [
    { range: [0, 33], label: "Stillness", color: "#60A5FA" }, // Blue-400
    { range: [34, 66], label: "Balance", color: "#F59E0B" },   // Amber-500
    { range: [67, 100], label: "Sacred", color: "#A855F7" },   // Purple-500
];

export default function FrequencyDial({ onFrequencySelected, onFrequencyChange }: FrequencyDialProps) {
    const [value, setValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const knobX = useMotionValue(0);
    const { play } = useAudio();

    // Calculate value based on position
    const handleDrag = () => {
        if (!constraintsRef.current) return;
        const width = constraintsRef.current.offsetWidth;
        const x = knobX.get();
        // Normalize x (-width/2 to width/2) to 0-100
        // Actually framer motion drag constraints are a bit tricky. 
        // Let's assume the constraints box is the track width.
        // If we use a different approach: controlled drag.

        // Simpler: Just map the x value relative to bounds.
        // Let's treat the center as 50.
    };

    // Let's use a simpler range input styled as a dial or a slider for robust touch support,
    // but the prompt asked for "Draggable circular knob" or "Dial".
    // A linear slider is easier to implement robustly as a "tuner". 
    // Let's do a horizontal "Frecuency Tuner" slider as described in Option 2 ("dial/slider").

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value);
        setValue(newVal);
        onFrequencyChange(newVal);

        // Haptic tick every 10 steps
        if (newVal % 10 === 0) {
            if (navigator.vibrate) navigator.vibrate(5);
            play('hover_tick', 0.1);
        }
    };

    const handleRelease = () => {
        const state = FREQUENCY_STATES.find(s => value >= s.range[0] && value <= s.range[1]);
        if (state) {
            onFrequencySelected(value, state.label);
        }
    };

    const currentState = FREQUENCY_STATES.find(s => value >= s.range[0] && value <= s.range[1]) || FREQUENCY_STATES[1];

    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
            <div className="relative w-full h-12 flex items-center justify-center">
                {/* Label Display */}
                <motion.div
                    key={currentState.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-3xl font-serif tracking-widest uppercase font-light"
                    style={{ color: currentState.color }}
                >
                    {currentState.label}
                </motion.div>
            </div>

            {/* The Tuner Track */}
            <div className="relative w-64 h-2 bg-white/10 rounded-full">
                {/* Active Fill */}
                <div
                    className="absolute left-0 top-0 bottom-0 rounded-full transition-colors duration-300"
                    style={{
                        width: `${value}%`,
                        backgroundColor: currentState.color
                    }}
                />

                {/* The Knob */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleInput}
                    onMouseUp={handleRelease}
                    onTouchEnd={handleRelease}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    aria-label="Tune your frequency"
                />

                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none"
                    style={{ left: `calc(${value}% - 12px)` }}
                    animate={{ scale: isDragging ? 1.2 : 1 }}
                />
            </div>

            <p className="text-white/40 text-xs tracking-widest uppercase">Tune Your State</p>
        </div>
    );
}
