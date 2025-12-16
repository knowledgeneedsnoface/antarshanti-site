"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type EventType =
    | "mood_selected"
    | "ritual_started"
    | "ritual_completed"
    | "streak_updated"
    | "dashboard_opened"
    | "daily_check_in"
    | "encouragement_needed"
    | "random_idle";

export type CharacterMode = "gann_baba" | "mira_maya" | "duo";

interface SoulTwinReactionProps {
    eventType: EventType;
    eventPayload?: any;
    characterMode: CharacterMode;
    onTwinTapped?: () => void;
    className?: string; // Allow positioning overrides
}

// --------------------------------------------------------
// DIALOGUE MAPPINGS
// --------------------------------------------------------

const REACTIONS = {
    mood_selected: {
        gann_baba: (p: any) => {
            if (p.mood === "energized") return "Achha… aaj tumhari battery full lag rahi hai ⚡";
            if (p.mood === "ok") return "Stable ho… sahi direction me ho.";
            if (p.mood === "neutral") return "Beech me latke ho. Clarity aa jaayegi.";
            if (p.mood === "low") return "Theek hai… aaj hum halka sa saath denge.";
            if (p.mood === "drained") return "Aaj bas saans par dhyaan rakho.";
            return "Kaisa mehsoos kar rahe ho?";
        },
        mira_maya: (p: any) => {
            if (p.mood === "energized") return "Same vibes! Coffee bhi nahi pi aur phir bhi hyper 😭🔥";
            if (p.mood === "ok") return "Like… kinda fine-ish? I get it 😌";
            if (p.mood === "neutral") return "Mood = meh. Certified fact.";
            if (p.mood === "low") return "Uff same… thoda pyaar le lo 🫂💖";
            if (p.mood === "drained") return "BRB going to cry for you 😭 but also hugging you.";
            return "How are you really??";
        }
    },
    ritual_started: {
        gann_baba: () => "Shuru karte hain… bina drama ke.",
        mira_maya: () => "10 minutes? Fine. I’ll behave."
    },
    ritual_completed: {
        gann_baba: () => "Accha kiya. Roz ki choti jeet badi hoti hai.",
        mira_maya: () => "OMG YESS you did ittt 😭✨"
    },
    streak_updated: {
        gann_baba: (p: any) => {
            const s = p.streak || 0;
            if (s === 1) return "Pehla kadam hamesha sabse important hota hai.";
            if (s < 5) return "Consistency build ho rahi hai.";
            if (s < 20) return "Shabash. Tumhari aadat ban rahi hai.";
            return "Yeh tapasya hai. Aise hi banega naya tum.";
        },
        mira_maya: (p: any) => {
            const s = p.streak || 0;
            if (s === 1) return "Day 1 girlie 🔥 we’re starting STRONG.";
            if (s < 5) return "OMG tum actually kar rahe ho?? I’m impressed 😳";
            if (s < 20) return "We’re in our disciplined era 💅✨";
            return "20+ days?? Main faint ho jaaun kya 😭💖";
        }
    },
    dashboard_opened: {
        gann_baba: () => "Aao, apne pattern samajh lein.",
        mira_maya: () => "Analytics baby! Charts and vibes 📈💖"
    },
    encouragement_needed: {
        gann_baba: () => "Ruko mat. Tum soch se zyada strong ho.",
        mira_maya: () => "NO 😭 listen… you got this. I believe in you so much."
    },
    random_idle: {
        gann_baba: () => {
            const opts = [
                "Soch raha hoon… tum kaise ho actual me?",
                "Bina soch badle, life nahi badalti.",
                "Tum jyada soch lete ho. Saans lo."
            ];
            return opts[Math.floor(Math.random() * opts.length)];
        },
        mira_maya: () => {
            const opts = [
                "Hiii did you miss me 😭?",
                "Scrolling mat karo… talk to me 😤",
                "I’m bored. Entertain me pls."
            ];
            return opts[Math.floor(Math.random() * opts.length)];
        }
    },
    daily_check_in: {
        gann_baba: () => "Aaj ka din tumhare control me hai.",
        mira_maya: () => "Rise and shine bestie! ☀️"
    }
};

const AVATARS = {
    gann_baba: "/assets/gann-baba-avatar.svg",
    mira_maya: "/assets/mira-maya-avatar.svg",
    duo: "/assets/twin-duo-avatar.svg"
};

export default function SoulTwinReaction({
    eventType,
    eventPayload = {},
    characterMode,
    onTwinTapped,
    className = ""
}: SoulTwinReactionProps) {
    const [activeChar, setActiveChar] = useState<"gann_baba" | "mira_maya">("gann_baba");
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(0); // For forcing re-render of animation
    const [show, setShow] = useState(true); // Control visibility with timer

    useEffect(() => {
        // 1. Determine Character
        let nextChar: "gann_baba" | "mira_maya" = activeChar;

        if (characterMode === "gann_baba") nextChar = "gann_baba";
        else if (characterMode === "mira_maya") nextChar = "mira_maya";
        else if (characterMode === "duo") {
            // Toggle char for variety if duo
            nextChar = activeChar === "gann_baba" ? "mira_maya" : "gann_baba";
        }

        setActiveChar(nextChar);

        // 2. Determine Message
        const handler = REACTIONS[eventType];
        if (handler) {
            // @ts-ignore
            const getMsg = handler[nextChar];
            if (getMsg) {
                setMessage(getMsg(eventPayload));
                setKey(prev => prev + 1);
                setShow(true); // Show the message when a new one is set
            }
        }

    }, [eventType, eventPayload.mood, eventPayload.streak, eventPayload.timestamp, characterMode]);
    // Added key dependencies to trigger effect when payload actually changes (e.g. timestamp for refreshing idle)

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => setShow(false), 6000); // Increased from 2000 to 6000
            return () => clearTimeout(timer);
        }
    }, [show, eventType, eventPayload]); // Re-run timer if show state changes or event changes

    // Avatar Image source logic
    // If Mode is Duo, we still show the SPEAKER's avatar to make it clear who is talking? 
    // User Requirement: "Displays Soul Twin avatar (Gann + Mira dual presence)".
    // But also: "characterMode = 'duo' -> alternate lines".
    // If I switch activeChar, I should show THAT avatar. 
    // But maybe the Duo avatar is a group shot. 
    // Let's use individual avatar for the active speaker so it's clear who is talking in the bubble.
    const displayAvatar = AVATARS[activeChar];

    return (
        <div className={`flex items-end gap-3 ${className}`}>

            {/* Avatar */}
            <motion.div
                key={activeChar}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={onTwinTapped}
                className="w-12 h-12 rounded-full shadow-lg cursor-pointer bg-white p-0.5 z-10 hover:shadow-xl transition-shadow border-2 border-white"
            >
                <img
                    src={displayAvatar}
                    alt={activeChar}
                    className="w-full h-full rounded-full object-cover"
                />
            </motion.div>

            {/* Bubble */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${message}-${key}`}
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`
                relative px-4 py-3 rounded-2xl rounded-bl-none shadow-sm max-w-[240px] text-sm font-medium leading-relaxed
                ${activeChar === "gann_baba"
                            ? "bg-[#2D2438] text-white"
                            : "bg-[#FFB7C5] text-[#90303d]"
                        }
            `}
                    onClick={onTwinTapped} // Allow tapping bubble too
                >
                    {message}
                </motion.div>
            </AnimatePresence>

        </div>
    );
}
