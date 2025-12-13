"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Gift } from "lucide-react";

export type SurpriseType = "affirmation" | "action" | "reflection" | "mini_ritual" | "blessing" | "self_gift" | "insight";

export type SurpriseItem = {
    id: string;
    type: SurpriseType;
    title: string;
    message: string;
    icon: string;
};

interface DailySurpriseGeneratorProps {
    lastSurpriseDate: number | null; // Timestamp
    onSurpriseGenerated: (surprise: SurpriseItem) => void;
    onClose: () => void;
}

// -------------------------------------------------------------
// SURPRISE LIBRARY
// -------------------------------------------------------------
const SURPRISE_LIBRARY: SurpriseItem[] = [
    // Affirmations
    { id: "affirmation_strength", type: "affirmation", title: "You Are Strong", message: "Aaj tum apne dimaag se zyada dil se chal rahe ho — aur woh enough hai.", icon: "/assets/surprise-icon.svg" },
    { id: "affirmation_clarity", type: "affirmation", title: "Clarity Is Coming", message: "Jo confusion lag raha hai… woh bas clarity ka pehla step hai.", icon: "/assets/surprise-icon.svg" },

    // Actions
    { id: "action_small_step", type: "action", title: "Take One Tiny Step", message: "Koi ek chhota sa kaam choose karo jo 2 minutes me ho jaaye. Bas woh kar do.", icon: "/assets/surprise-icon.svg" },
    { id: "action_gratitude_msg", type: "action", title: "Send Gratitude", message: "Kisi ek insaan ko ‘thank you’ bol do — dil halka ho jaayega.", icon: "/assets/surprise-icon.svg" },

    // Reflections
    { id: "reflect_truth", type: "reflection", title: "Truth Check", message: "Aaj ka sach kya hai jise tum ignore kar rahe ho?", icon: "/assets/surprise-icon.svg" },
    { id: "reflect_feeling", type: "reflection", title: "Name Your Feeling", message: "Ek line me likho — aaj tumhara dil sabse zyada kya feel kar raha hai?", icon: "/assets/surprise-icon.svg" },

    // Mini Rituals
    { id: "mini_breath", type: "mini_ritual", title: "3-Breath Reset", message: "3 deep breaths lo… nose → chest → belly.", icon: "/assets/surprise-icon.svg" },
    { id: "mini_heart", type: "mini_ritual", title: "Heart Warmth", message: "Haath ko dil par rakho aur 10 seconds tak warmth feel karo.", icon: "/assets/surprise-icon.svg" },
    { id: "mini_focus", type: "mini_ritual", title: "30-Second Focus", message: "Aankhen band karke sirf ek cheez imagine karo jo tumhe important lagti hai.", icon: "/assets/surprise-icon.svg" },

    // Blessings
    { id: "blessing_peace", type: "blessing", title: "A Blessing for Peace", message: "Aaj tumhare liye shanti ka ek halka sa badal bhej raha hoon.", icon: "/assets/surprise-icon.svg" },
    { id: "blessing_courage", type: "blessing", title: "A Blessing for Courage", message: "Jo bhi aaj tough lage — tum usse sambhaal loge. Main hoon yahin.", icon: "/assets/surprise-icon.svg" },

    // Advanced
    { id: "gift_self_compassion", type: "self_gift", title: "Be Kinder Today", message: "Aaj khud ko judge mat karo. Sirf observe karo.", icon: "/assets/surprise-icon.svg" },
    { id: "gift_boundaries", type: "self_gift", title: "Set One Boundary", message: "Aaj ek chhoti si limit set karo — for yourself.", icon: "/assets/surprise-icon.svg" },
    { id: "insight_shadow", type: "insight", title: "Shadow Insight", message: "Jis cheez se tum bach rahe ho… woh hi tumhe grow kar rahi hai.", icon: "/assets/surprise-icon.svg" },
    { id: "insight_power", type: "insight", title: "Your Power Today", message: "Aaj tumhari shakti clarity + patience me hai.", icon: "/assets/surprise-icon.svg" },
];

export default function DailySurpriseGenerator({
    lastSurpriseDate,
    onSurpriseGenerated,
    onClose
}: DailySurpriseGeneratorProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [generatedSurprise, setGeneratedSurprise] = useState<SurpriseItem | null>(null);
    const [shake, setShake] = useState(false);

    // Check lock
    const isToday = (timestamp: number) => {
        const date = new Date(timestamp);
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isLocked = lastSurpriseDate ? isToday(lastSurpriseDate) : false;

    const handleTap = () => {
        if (isLocked || isRevealed) return;

        setShake(true);
        setTimeout(() => {
            const random = SURPRISE_LIBRARY[Math.floor(Math.random() * SURPRISE_LIBRARY.length)];
            setGeneratedSurprise(random);
            setIsRevealed(true);
            onSurpriseGenerated(random);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D0A46] to-[#0A0A12] overflow-hidden pointer-events-none">
                {/* Ripples */}
                <motion.div
                    animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-purple-500/30 rounded-full"
                />
                {/* Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: -100, opacity: [0, 1, 0] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                        className="absolute w-1 h-1 bg-amber-200 rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%`, top: `100%` }}
                    />
                ))}
            </div>

            <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white z-50">
                <X size={24} />
            </button>

            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="box-view"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {isLocked ? (
                            <div className="text-center text-white/80">
                                <p className="text-lg font-serif mb-2">Aaj ka surprise pehle hi mil chuka hai.</p>
                                <button onClick={onClose} className="px-6 py-2 bg-white/10 rounded-full text-sm font-bold mt-4 hover:bg-white/20">
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-amber-200 font-serif mb-8 text-center"
                                >
                                    Tap to reveal your Daily Surprise
                                </motion.p>
                                <motion.div
                                    animate={shake ? { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0] } : { y: [0, -10, 0] }}
                                    transition={shake ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={handleTap}
                                    className="w-48 h-48 cursor-pointer relative group"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-purple-500 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"
                                    />
                                    <img src="/assets/magic-box.svg" alt="Magic Box" className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="card-view"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="relative z-20 w-full max-w-xs bg-gradient-to-b from-[#FFFDF5] to-[#FDFBF7] rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(255,215,0,0.3)] border border-amber-200"
                    >
                        {/* Glow Burst */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-400 blur-[80px] opacity-40 pointer-events-none" />

                        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center shadow-inner">
                            <img src={generatedSurprise?.icon} alt="Icon" className="w-8 h-8" />
                        </div>

                        <h2 className="text-2xl font-serif text-gray-900 mb-2">{generatedSurprise?.title}</h2>
                        <div className="w-8 h-0.5 bg-amber-300 mx-auto mb-4" />
                        <p className="text-gray-600 italic leading-relaxed mb-8 font-medium">
                            "{generatedSurprise?.message}"
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Surprise
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
