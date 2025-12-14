"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, BookOpen, Sparkles } from "lucide-react";

interface LoreBookProps {
    onCloseLoreBook: () => void;
}

type Page = "home" | "gann" | "mira" | "meeting" | "realms" | "teachings";

export default function LoreBook({ onCloseLoreBook }: LoreBookProps) {
    const [activePage, setActivePage] = useState<Page>("home");

    // ------------------------------------------------------------------
    // CONTENT MAP
    // ------------------------------------------------------------------
    const renderContent = () => {
        switch (activePage) {
            case "gann":
                return (
                    <div className="space-y-6">
                        <img src="/assets/lore-gann.svg" alt="Gann Baba" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-indigo-900 p-2" />
                        <h2 className="text-3xl font-serif text-amber-200 text-center mb-4">Gann Baba — The Wise Rebel</h2>
                        <p>
                            Gann Baba ek modern mystic hain jo Himalayas me nahi, tumhare dimaag ke 'Space Between Thoughts' me rehte hain.
                            Woh sarcastic hain, seedhi baat karte hain, aur unhe spiritual jargon se allergy hai.
                        </p>
                        <p>
                            He represents absolute clarity (Satya). Jab tum overthink karte ho, Gann Baba woh aawaz hai jo kehti hai:
                            <em>"Bas kar bhai, saans le."</em>
                        </p>
                        <p>
                            Unka maksad tumhe 'perfect' banana nahi hai, bas tumhe tumhare apne delusions se free karna hai.
                            He is the calm observer behind the chaos.
                        </p>
                    </div>
                );
            case "mira":
                return (
                    <div className="space-y-6">
                        <img src="/assets/lore-mira.svg" alt="Mira Maya" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-red-900 p-2" />
                        <h2 className="text-3xl font-serif text-pink-200 text-center mb-4">Mira Maya — The Heart of Chaos</h2>
                        <p>
                            Mira Maya is pure emotion, drama, and relatability. Woh tumhari inner voice hai jo kehti hai:
                            <em>"Main aaj workout karungi lekin pehle 3 ghante reel scroll kar leti hoon."</em>
                        </p>
                        <p>
                            She represents the Heart (Hridaya) and the playful energy of life (Maya).
                            She makes mistakes, she feels deeply, and she learns through experience.
                        </p>
                        <p>
                            Agar Gann Baba 'Logic' hain, toh Mira 'Life' hai.
                            Woh humein sikhati hai ki girna okay hai, rona okay hai, aur khud par hasna sabse bada spiritual power hai.
                        </p>
                    </div>
                );
            case "meeting":
                return (
                    <div className="space-y-6">
                        <img src="/assets/lore-meeting.svg" alt="Meeting" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-purple-900 p-2" />
                        <h2 className="text-3xl font-serif text-purple-200 text-center mb-4">When Gann Baba Met Mira Maya</h2>
                        <p>
                            Ek din Mira bohot panic me thi because usne life ka "Grand Purpose" figure out nahi kiya tha.
                            Woh chillayi: <em>"Mujhe universe se sign chahiye!"</em>
                        </p>
                        <p>
                            Tabhi wahan Gann Baba pragat hue, chai peete hue.
                            Unhone kaha: <em>"Sign ye hai ki chai thandi ho rahi hai. Pi lo."</em>
                        </p>
                        <p>
                            Mira ko laga ye koi hallucination hai. Unhone argue kiya, roye, aur finally has pade.
                            Uss din unhone decide kiya: Mira chaos layegi, aur Gann Baba clarity denge.
                            Aur saath milkar, woh tumhare inner world ko guide karenge.
                        </p>
                    </div>
                );
            case "realms":
                return (
                    <div className="space-y-6">
                        <img src="/assets/lore-realms.svg" alt="Realms" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-blue-900 p-2" />
                        <h2 className="text-3xl font-serif text-blue-200 text-center mb-4">The Four Realms</h2>

                        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-amber-300 mb-1">Mind Realm (Manas Bhoomi)</h3>
                            <p className="text-sm">Where thoughts align seamlessly with intention. The land of focus.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-pink-300 mb-1">Heart Realm (Hridaya Mandir)</h3>
                            <p className="text-sm">The space of deep emotion, compassion, and connection.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-gray-400 mb-1">Shadow Realm (Vasana Guha)</h3>
                            <p className="text-sm">Where fears and hidden attachments live. Not evil, just unlit.</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-red-300 mb-1">Kurukshetra</h3>
                            <p className="text-sm">The battlefield where your inner conflict is resolved into action.</p>
                        </div>
                    </div>
                );
            case "teachings":
                return (
                    <div className="space-y-6">
                        <img src="/assets/lore-teachings.svg" alt="Teachings" className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-orange-900 p-2" />
                        <h2 className="text-3xl font-serif text-orange-200 text-center mb-4">Gann Baba’s Teachings</h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-black/20 rounded-lg">
                                <h3 className="font-bold text-lg text-white mb-2">The River That Forgot</h3>
                                <p className="italic text-white/80">
                                    "Ek nadi sochne lagi ki woh ruk gayi hai. Gann Baba ne kaha: 'Tum paani ho. Behna tumhara nature hai. Rukna tumhara illusion hai.' Thoughts bhi aise hi hain — unhe pakdo mat, behne do."
                                </p>
                            </div>
                            <div className="p-4 bg-black/20 rounded-lg">
                                <h3 className="font-bold text-lg text-white mb-2">Mira and the Bowl</h3>
                                <p className="italic text-white/80">
                                    "Mira keeps shouting into a metal bowl hoping for silence. It only echoes back loud noise. Gann Baba teaches: 'If you want silence, stop feeding the noise.' Attention hi shor ki khuraak hai."
                                </p>
                            </div>
                            <div className="p-4 bg-black/20 rounded-lg">
                                <h3 className="font-bold text-lg text-white mb-2">The Monkey</h3>
                                <p className="italic text-white/80">
                                    "Man ek bandar ki tarah hai. Woh koodega. Tum uske har jump ko analyse mat karo. Just watch the monkey. Eventually, it gets tired and sits down."
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[70] bg-[#0F0C29] text-white flex flex-col font-sans overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E]" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between p-6">
                {activePage !== "home" ? (
                    <button
                        onClick={() => setActivePage("home")}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} /> Back
                    </button>
                ) : (
                    <div className="flex items-center gap-2 text-amber-400 font-serif text-xl">
                        <BookOpen size={24} />
                        <span>The Lore Book</span>
                    </div>
                )}

                <button
                    onClick={onCloseLoreBook}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                >
                    <X size={20} />
                </button>
            </header>

            {/* Content Area */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 pb-24">
                <AnimatePresence mode="wait">
                    {activePage === "home" ? (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
                        >
                            <LoreCard
                                title="Who is Gann Baba?"
                                subtitle="The calm rebel of the inner world."
                                onClick={() => setActivePage("gann")}
                                icon="/assets/lore-gann.svg"
                                color="bg-indigo-900/50"
                            />
                            <LoreCard
                                title="Who is Mira Maya?"
                                subtitle="Chaos, drama, aur dil ki baat."
                                onClick={() => setActivePage("mira")}
                                icon="/assets/lore-mira.svg"
                                color="bg-red-900/50"
                            />
                            <LoreCard
                                title="How They Met"
                                subtitle="When clarity met chaos."
                                onClick={() => setActivePage("meeting")}
                                icon="/assets/lore-meeting.svg"
                                color="bg-purple-900/50"
                            />
                            <LoreCard
                                title="The Inner Worlds"
                                subtitle="Mind, Heart, Shadow & Kurukshetra."
                                onClick={() => setActivePage("realms")}
                                icon="/assets/lore-realms.svg"
                                color="bg-blue-900/50"
                            />
                            <LoreCard
                                title="Teachings & Parables"
                                subtitle="Short stories with deeper meaning."
                                onClick={() => setActivePage("teachings")}
                                icon="/assets/lore-teachings.svg"
                                color="bg-orange-900/50"
                                className="md:col-span-2"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="max-w-2xl mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl"
                        >
                            {renderContent()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function LoreCard({ title, subtitle, onClick, icon, color, className = "" }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`cursor-pointer p-6 rounded-2xl border border-white/10 ${color} ${className} flex items-center gap-4 relative overflow-hidden group`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine" />

            <img src={icon} alt="" className="w-16 h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />

            <div>
                <h3 className="text-xl font-bold font-serif text-white mb-1 group-hover:text-amber-200 transition-colors">{title}</h3>
                <p className="text-sm text-white/60">{subtitle}</p>
            </div>
        </motion.div>
    );
}
