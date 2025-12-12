"use client";

import React from "react";
import { usePerformanceMode } from "./PerformanceManager";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

export default function LiteModeToggle() {
    const { isLiteMode, toggleLiteMode } = usePerformanceMode();

    return (
        <button
            onClick={toggleLiteMode}
            className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-sm border ${isLiteMode
                    ? "bg-green-50/80 text-green-700 border-green-200 shadow-sm"
                    : "bg-white/40 text-gray-500 border-white/20 hover:bg-white/90 hover:shadow-md"
                }`}
            title={isLiteMode ? "Restore full effects" : "Reduce effects for smooth experience"}
        >
            <Leaf className={`w-3 h-3 ${isLiteMode ? "fill-current" : ""}`} />
            <span>{isLiteMode ? "Lite Mode On" : "Smooth Mode"}</span>
        </button>
    );
}
