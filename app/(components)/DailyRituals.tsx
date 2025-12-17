"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Ritual {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    duration: string;
}

const RITUALS: Ritual[] = [
    {
        id: "karma_yoga",
        name: "Karma Yoga",
        description: "Action without attachment. Find clarity in purposeful work.",
        color: "#D4A94A",
        icon: "🔥",
        duration: "10 min"
    },
    {
        id: "tapasya",
        name: "Tapasya",
        description: "Discipline through discomfort. Build courage in small steps.",
        color: "#E74C3C",
        icon: "⚡",
        duration: "10 min"
    },
    {
        id: "bhakti",
        name: "Bhakti",
        description: "Devotion and warmth. Connect with the heart's wisdom.",
        color: "#FF69B4",
        icon: "💖",
        duration: "10 min"
    },
    {
        id: "satya",
        name: "Satya",
        description: "Truth and clarity. See yourself without filters.",
        color: "#3498DB",
        icon: "🌊",
        duration: "10 min"
    },
    {
        id: "dhyana",
        name: "Dhyana",
        description: "Meditation and stillness. Rest in pure awareness.",
        color: "#9B59B6",
        icon: "🧘",
        duration: "10 min"
    }
];

export default function DailyRituals() {
    const router = useRouter();

    const handleRitualClick = (ritualId: string) => {
        // Navigate to ritual player with the selected ritual
        router.push(`/ritual/player?id=${ritualId}&mood=neutral`);
    };

    return (
        <section className="relative py-20 px-6 bg-gradient-to-b from-[#FFF8F0] to-[#F5EDE3] overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-500 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
                        Daily Rituals
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Five paths to inner clarity. Choose one each day, or let your journey guide you.
                    </p>
                </motion.div>

                {/* Rituals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RITUALS.map((ritual, index) => (
                        <motion.button
                            key={ritual.id}
                            onClick={() => handleRitualClick(ritual.id)}
                            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-left border border-gray-100 hover:border-gray-200"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Color accent bar */}
                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                style={{ backgroundColor: ritual.color }}
                            />

                            {/* Icon */}
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {ritual.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-serif text-gray-900 mb-2">
                                {ritual.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                {ritual.description}
                            </p>

                            {/* Duration badge */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {ritual.duration}
                                </span>
                                <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                    →
                                </span>
                            </div>

                            {/* Hover glow effect */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                                style={{ backgroundColor: ritual.color }}
                            />
                        </motion.button>
                    ))}

                    {/* "Start Your Journey" card */}
                    <motion.button
                        onClick={() => router.push('/get-started')}
                        className="group relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-left border-2 border-amber-200 hover:border-amber-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: RITUALS.length * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Icon */}
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            🌟
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-serif text-gray-900 mb-2">
                            Not Sure?
                        </h3>
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                            Take the Inner Atlas journey. We'll guide you to the ritual that matches your current state.
                        </p>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-700 uppercase tracking-wider">
                                Start Journey
                            </span>
                            <span className="text-amber-600 group-hover:text-amber-700 transition-colors">
                                →
                            </span>
                        </div>
                    </motion.button>
                </div>

                {/* Bottom note */}
                <motion.p
                    className="text-center text-sm text-gray-500 mt-12 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Each ritual adapts to your mood and streak. The more you practice, the deeper it goes.
                </motion.p>
            </div>
        </section>
    );
}
