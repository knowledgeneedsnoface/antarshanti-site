"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Share2, Sparkles } from "lucide-react";
import * as htmlToImage from "html-to-image";

// Import types from other modules
import { MindStateKey } from "./MindRealm";
import { HeartStateKey } from "./HeartRealm";
import { ShadowStateKey } from "./ShadowRealm";
import { BattleKey } from "./KurukshetraSelection";
import { DhanushKey, ChakraKey, RathKey } from "./PowerObjectsSelector";

// ============================================================================
// Types
// ============================================================================

interface SoulMapRevealProps {
    mindStateKey: MindStateKey;
    heartStateKey: HeartStateKey;
    shadowStateKey: ShadowStateKey;
    kurukshetraBattleKey: BattleKey;
    powerObjects: {
        dhanush: DhanushKey;
        chakra: ChakraKey;
        rath: RathKey;
    };
    gitaLine: string;
    onSoulMapComplete: () => void;
}

// ============================================================================
// Data Mappings
// ============================================================================

const MIND_MAP: Record<MindStateKey, { title: string; desc: string; icon: string }> = {
    stormy_sky: { title: "Stormy Sky", desc: "Dimag bhaaga bhaaga.", icon: "/assets/mind-storm.svg" },
    quiet_lake: { title: "Quiet Lake", desc: "Shaant aur saaf.", icon: "/assets/mind-lake.svg" },
    crowded_bazaar: { title: "Crowded Bazaar", desc: "Bohot zyada noise.", icon: "/assets/mind-bazaar.svg" },
    desert_wind: { title: "Desert Wind", desc: "Thoda khokhla lag raha hai.", icon: "/assets/mind-desert.svg" },
    old_forest: { title: "Old Forest", desc: "Soch gehri ho rahi hai.", icon: "/assets/mind-forest.svg" },
};

const HEART_MAP: Record<HeartStateKey, { title: string; desc: string; icon: string }> = {
    peaceful: { title: "Peaceful", desc: "Dil halka lag raha hai.", icon: "/assets/heart-peace.svg" },
    loving: { title: "Loving", desc: "Pyaar aur warmth.", icon: "/assets/heart-love.svg" },
    heavy: { title: "Heavy", desc: "Thoda bojh sa hai.", icon: "/assets/heart-sad.svg" },
    grateful: { title: "Grateful", desc: "Dil full of appreciation.", icon: "/assets/heart-grateful.svg" },
    longing: { title: "Longing", desc: "Kuch adhura sa lag raha hai.", icon: "/assets/heart-longing.svg" },
};

const SHADOW_MAP: Record<ShadowStateKey, { title: string; desc: string; icon: string }> = {
    held_pain: { title: "Held Pain", desc: "Jo baat andar daba rakhi hai.", icon: "/assets/shadow-chest.svg" },
    self_doubt: { title: "Self-Doubt", desc: "Apni value par shak.", icon: "/assets/shadow-mirror.svg" },
    overprotection: { title: "Overprotection", desc: "Dil ke ird-gird zyada layer.", icon: "/assets/shadow-armor.svg" },
    fear_of_loss: { title: "Fear of Loss", desc: "Kisi ko kho dene ka darr.", icon: "/assets/shadow-silhouette.svg" },
    overthinking: { title: "Overthinking", desc: "Dimag ki fake kahaniyan.", icon: "/assets/shadow-mask.svg" },
};

const BATTLE_MAP: Record<BattleKey, { title: string; desc: string; icon: string }> = {
    duty_vs_desire: { title: "Duty vs Desire", desc: "Dil kuch aur chahta hai… zimmedari kuch aur.", icon: "/assets/battle-duty-desire.svg" },
    fear_vs_ambition: { title: "Fear vs Ambition", desc: "Badhne ka mann hai… par darr rok raha hai.", icon: "/assets/battle-fear-ambition.svg" },
    love_vs_boundaries: { title: "Love vs Boundaries", desc: "Pyaar hai… par khud ko lose karne ka bhi darr.", icon: "/assets/battle-love-boundaries.svg" },
    truth_vs_comfort: { title: "Truth vs Comfort", desc: "Sach pata hai… par bolna mushkil lagta hai.", icon: "/assets/battle-truth-comfort.svg" },
    chaos_vs_focus: { title: "Chaos vs Focus", desc: "Dimag bikhar raha hai… direction chahiye.", icon: "/assets/battle-chaos-focus.svg" },
};

const DHANUSH_MAP: Record<DhanushKey, { title: string; desc: string; icon: string }> = {
    focus: { title: "Focus", desc: "Arjuna's Focus", icon: "/assets/dhanush-focus.svg" },
    strength: { title: "Strength", desc: "Bhima's Strength", icon: "/assets/dhanush-strength.svg" },
    care: { title: "Care", desc: "Nakula's Care", icon: "/assets/dhanush-care.svg" },
    wisdom: { title: "Wisdom", desc: "Sahadeva's Wisdom", icon: "/assets/dhanush-wisdom.svg" },
    fire: { title: "Fire", desc: "Draupadi's Fire", icon: "/assets/dhanush-fire.svg" },
};

const CHAKRA_MAP: Record<ChakraKey, { title: string; desc: string; icon: string }> = {
    truth: { title: "Truth", desc: "Sach mein jeena", icon: "/assets/chakra-truth.svg" },
    love: { title: "Love", desc: "Connection aur warmth", icon: "/assets/chakra-love.svg" },
    freedom: { title: "Freedom", desc: "Khule mann se jeena", icon: "/assets/chakra-freedom.svg" },
    growth: { title: "Growth", desc: "Seekhna aur evolve hona", icon: "/assets/chakra-growth.svg" },
    stability: { title: "Stability", desc: "Balance aur sukoon", icon: "/assets/chakra-stability.svg" },
};

const RATH_MAP: Record<RathKey, { title: string; desc: string; icon: string }> = {
    stability_path: { title: "Stability", desc: "Sukoon aur routine", icon: "/assets/rath-stability.svg" },
    expansion_path: { title: "Expansion", desc: "Naye experiences", icon: "/assets/rath-expansion.svg" },
    healing_path: { title: "Healing", desc: "Dil aur mann ka ilaj", icon: "/assets/rath-healing.svg" },
};

// ============================================================================
// Component
// ============================================================================

export default function SoulMapReveal({
    mindStateKey,
    heartStateKey,
    shadowStateKey,
    kurukshetraBattleKey,
    powerObjects,
    gitaLine,
    onSoulMapComplete
}: SoulMapRevealProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!scrollRef.current) return;
        setIsDownloading(true);
        try {
            const dataUrl = await htmlToImage.toPng(scrollRef.current, { backgroundColor: '#fdf6e3' }); // Light parchment bg
            const link = document.createElement("a");
            link.download = "inner-atlas-soul-map.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Failed to download soul map", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const mind = MIND_MAP[mindStateKey];
    const heart = HEART_MAP[heartStateKey];
    const shadow = SHADOW_MAP[shadowStateKey];
    const battle = BATTLE_MAP[kurukshetraBattleKey];
    const dhanush = DHANUSH_MAP[powerObjects.dhanush];
    const chakra = CHAKRA_MAP[powerObjects.chakra];
    const rath = RATH_MAP[powerObjects.rath];

    return (
        <div className="relative w-full h-full bg-[#0b1020] overflow-y-auto overflow-x-hidden font-sans pb-20">

            {/* 
        -------------------------------------------------------------
        Background (Shared with Cosmic Module + Some Gold)
        -------------------------------------------------------------
      */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2f1e4b_0%,_#0b1020_80%)] opacity-80" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
                {/* Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -50, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                        className="absolute w-1 h-1 bg-[#d4a94a] rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">

                {/* 
          -------------------------------------------------------------
          THE SOUL MAP SCROLL CONTAINER
          -------------------------------------------------------------
        */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg mx-auto"
                >
                    <div
                        ref={scrollRef}
                        className="relative bg-[#f7f3e8] text-[#1a1a2e] p-6 md:p-10 rounded-xl shadow-[0_0_50px_rgba(212,169,74,0.2)] border-2 border-[#d4a94a]/30 overflow-hidden"
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />

                        {/* Decorative Borders */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#d4a94a] to-transparent opacity-50" />
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#d4a94a] to-transparent opacity-50" />

                        {/* Header */}
                        <div className="text-center mb-8 relative z-10">
                            <div className="mx-auto w-12 h-12 mb-3 text-[#d4a94a]">
                                <Sparkles size={48} strokeWidth={1} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2438] mb-1 font-serif tracking-wide">
                                Your Inner Atlas
                            </h2>
                            <p className="text-[#8b7355] text-sm italic">
                                Yeh tumhari andar ki kahani ka naksha hai.
                            </p>
                            <div className="w-16 h-[1px] bg-[#d4a94a] mx-auto mt-4" />
                        </div>

                        {/* SECTION 2: Mind / Heart / Shadow */}
                        <div className="space-y-4 mb-8 relative z-10">
                            {/* Mind */}
                            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg border border-[#d4a94a]/10">
                                <img src={mind.icon} alt={mind.title} className="w-12 h-12 object-contain opacity-80" />
                                <div>
                                    <h4 className="font-bold text-[#2d2438] text-sm uppercase tracking-wider">Mind</h4>
                                    <p className="text-[#5a4a3a] text-sm"><span className="font-semibold">{mind.title}</span> — {mind.desc}</p>
                                </div>
                            </div>

                            {/* Heart */}
                            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg border border-[#d4a94a]/10">
                                <img src={heart.icon} alt={heart.title} className="w-12 h-12 object-contain opacity-80" />
                                <div>
                                    <h4 className="font-bold text-[#2d2438] text-sm uppercase tracking-wider">Heart</h4>
                                    <p className="text-[#5a4a3a] text-sm"><span className="font-semibold">{heart.title}</span> — {heart.desc}</p>
                                </div>
                            </div>

                            {/* Shadow */}
                            <div className="flex items-center gap-4 p-3 bg-white/50 rounded-lg border border-[#d4a94a]/10">
                                <img src={shadow.icon} alt={shadow.title} className="w-12 h-12 object-contain opacity-80" />
                                <div>
                                    <h4 className="font-bold text-[#2d2438] text-sm uppercase tracking-wider">Shadow</h4>
                                    <p className="text-[#5a4a3a] text-sm"><span className="font-semibold">{shadow.title}</span> — {shadow.desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Battle */}
                        <div className="bg-[#2d2438] text-white p-5 rounded-xl mb-8 relative overflow-hidden z-10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a94a] opacity-10 blur-[40px] rounded-full" />
                            <h4 className="text-[#d4a94a] font-bold text-xs uppercase tracking-widest mb-2">Inner Battle</h4>
                            <div className="flex items-center gap-4">
                                <img src={battle.icon} alt={battle.title} className="w-14 h-14 object-contain" />
                                <div>
                                    <h3 className="font-bold text-lg">{battle.title}</h3>
                                    <p className="text-white/70 text-sm font-light italic">{battle.desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: Power Objects */}
                        <div className="mb-8 relative z-10">
                            <h4 className="text-center text-[#8b7355] text-xs uppercase tracking-widest mb-4">Your Power Objects</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {/* Dhanush */}
                                <div className="flex flex-col items-center text-center p-2 bg-white/40 rounded-lg">
                                    <img src={dhanush.icon} alt={dhanush.title} className="w-10 h-10 mb-2 object-contain" />
                                    <p className="font-bold text-xs text-[#2d2438]">{dhanush.title}</p>
                                    <p className="text-[10px] text-[#5a4a3a]">{dhanush.desc}</p>
                                </div>
                                {/* Chakra */}
                                <div className="flex flex-col items-center text-center p-2 bg-white/40 rounded-lg">
                                    <img src={chakra.icon} alt={chakra.title} className="w-10 h-10 mb-2 object-contain" />
                                    <p className="font-bold text-xs text-[#2d2438]">{chakra.title}</p>
                                    <p className="text-[10px] text-[#5a4a3a]">{chakra.desc}</p>
                                </div>
                                {/* Rath */}
                                <div className="flex flex-col items-center text-center p-2 bg-white/40 rounded-lg">
                                    <img src={rath.icon} alt={rath.title} className="w-10 h-10 mb-2 object-contain" />
                                    <p className="font-bold text-xs text-[#2d2438]">{rath.title}</p>
                                    <p className="text-[10px] text-[#5a4a3a] leading-tight">{rath.desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 5: Gita */}
                        <div className="border border-[#d4a94a] p-6 rounded-lg text-center relative z-10">
                            <h4 className="text-[#d4a94a] font-bold text-xs uppercase tracking-widest mb-3">Tumhari Antar Gita</h4>
                            <p className="text-xl md:text-2xl font-bold text-[#2d2438] leading-snug mb-3">
                                "{gitaLine}"
                            </p>
                            <p className="text-[#5a4a3a] text-xs font-light">
                                Yeh tumhara inner compass hai — jo tumhe agle decisions mein guide karega.
                            </p>
                        </div>

                        {/* Footer Hallmark */}
                        <div className="text-center mt-8">
                            <p className="text-[10px] text-[#8b7355] uppercase tracking-widest">AntarShanti • Inner Atlas</p>
                        </div>

                    </div>
                </motion.div>

                {/* 
          -------------------------------------------------------------
          SECTION 6 & 7: ACTIONS
          -------------------------------------------------------------
        */}
                <div className="mt-8 flex flex-col items-center gap-4 w-full">

                    {/* Download Button */}
                    <motion.button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-[#d4a94a] hover:text-[#eebb55] transition-colors text-sm font-medium"
                    >
                        <Download size={18} />
                        {isDownloading ? "Generating..." : "Download Your Soul Map"}
                    </motion.button>

                    {/* Final CTA */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        onClick={onSoulMapComplete}
                        className="
                  group relative flex items-center gap-3 px-8 py-4 
                  bg-gradient-to-r from-[#d4a94a] to-[#b8860b] 
                  text-[#0b1020] font-bold text-lg rounded-full 
                  shadow-[0_0_20px_rgba(212,169,74,0.3)] 
                  hover:shadow-[0_0_30px_rgba(212,169,74,0.5)]
                  transition-all duration-300 w-full md:w-auto justify-center
                "
                    >
                        Begin Your 10-Minute Ritual
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                </div>

            </div>
        </div>
    );
}
