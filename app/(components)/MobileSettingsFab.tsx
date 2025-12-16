"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-system/ThemeContext";
import { themes } from "./theme-system/themeDefinitions";
import { usePerformanceMode } from "./PerformanceManager";
import { Settings, Leaf, Palette, X, Accessibility } from "lucide-react";

export default function MobileSettingsFab() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentTheme, setTheme } = useTheme();
    const { isLiteMode, toggleLiteMode } = usePerformanceMode();

    return (
        <>
            {/* FAB - Visible only on mobile */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed left-6 bottom-6 z-40 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 shadow-lg flex md:hidden items-center justify-center text-amber-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Settings size={20} />
            </motion.button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
                        />

                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-[101] max-h-[85vh] overflow-y-auto md:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Settings</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-gray-100 rounded-full text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* 1. Appearance / Theme */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4 text-amber-600 font-medium">
                                        <Palette size={18} />
                                        <h3>Ambience</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.values(themes).map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => setTheme(theme.id)}
                                                className={`p-3 rounded-xl border text-left transition-all ${currentTheme === theme.id
                                                        ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="font-semibold text-sm text-gray-900">{theme.name}</div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-1">{theme.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* 2. Performance / Accessibility */}
                                <section>
                                    <div className="flex items-center gap-2 mb-4 text-green-600 font-medium">
                                        <Accessibility size={18} />
                                        <h3>Experience</h3>
                                    </div>

                                    <div
                                        onClick={toggleLiteMode}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${isLiteMode
                                                ? "bg-green-50 border-green-200"
                                                : "bg-gray-50 border-gray-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${isLiteMode ? "bg-green-100 text-green-600" : "bg-white text-gray-400"}`}>
                                                <Leaf size={20} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Lite Mode</div>
                                                <div className="text-xs text-gray-500">Reduces motions for better performance</div>
                                            </div>
                                        </div>

                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isLiteMode ? "bg-green-500" : "bg-gray-300"}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isLiteMode ? "translate-x-6" : "translate-x-0"}`} />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-8 text-center text-xs text-gray-400">
                                v1.0.0 • AntarShanti
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
