"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const weeks = [
    {
        week: "Week 01",
        hindi: "Main ruk kar khud se milta hoon.",
        translation: "I pause and meet myself.",
        petal: "scale-75 opacity-60"
    },
    {
        week: "Week 02",
        hindi: "Main apni value pe khada hoon.",
        translation: "I stand in my own value.",
        petal: "scale-90 opacity-80"
    },
    {
        week: "Week 03",
        hindi: "Jo mere liye nahi hai usey jaane deta hoon.",
        translation: "I let go of what isn't for me.",
        petal: "scale-100 opacity-100"
    },
    {
        week: "Week 04",
        hindi: "Main waise hi kaafi hoon.",
        translation: "I am enough as I am.",
        petal: "scale-110 opacity-100 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
    }
];

export default function LotusTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-32 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl text-gray-900 font-light mb-2">The Blooming Lotus</h2>
                    <p className="text-lg text-amber-700/80 font-medium mb-1">A 30-day structural journey of personal growth.</p>
                    <p className="text-gray-500 font-light">Week by week, build a habit that blooms.</p>
                </div>

                <div className="grid grid-cols-1 gap-24 max-w-4xl mx-auto">
                    {weeks.map((week, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center gap-10"
                        >
                            {/* Visual Lotus Metaphor */}
                            <div className={`w-32 h-32 flex-shrink-0 flex items-center justify-center bg-pink-50 rounded-full ${week.petal} transition-all duration-700`}>
                                <span className="text-4xl">🪷</span>
                            </div>

                            {/* Content */}
                            <div className="text-center md:text-left">
                                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase block mb-2">{week.week}</span>
                                <h3 className="text-2xl font-serif text-gray-900 italic mb-2">"{week.hindi}"</h3>
                                <p className="text-gray-500 font-light">{week.translation}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
