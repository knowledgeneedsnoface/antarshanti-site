"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const journeyNodes = [
    {
        day: "Day 1",
        title: "The Opening",
        desc: "You receive the box. You light the candle for the first time. It feels strange, but good.",
        icon: "✉️"
    },
    {
        day: "Day 5",
        title: "The Shift",
        desc: "Your body starts to expect the peace. Shoulders drop automatically when you smell the fragrance.",
        icon: "🕯️"
    },
    {
        day: "Day 12",
        title: "The Craving",
        desc: "It’s no longer a task. You find yourself hurrying home just to have your 10 minutes.",
        icon: "🧠"
    },
    {
        day: "Day 21",
        title: "The Integration",
        desc: "The calm from the morning stays with you during stressful meetings.",
        icon: "🌱"
    },
    {
        day: "Day 30",
        title: "The Embodiment",
        desc: "You are different. Calmer. Stronger. You have built a sanctuary inside yourself.",
        icon: "🕊️"
    }
];

export default function ImmersiveGuide() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 text-center">
                        Your 30-Day Journey
                    </h2>
                    <p className="text-xl text-gray-500 font-light text-center max-w-2xl mx-auto">
                        What begins as a practice transforms into a state of being.
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* The Path Line */}
                    <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2" />
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-[27px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 -translate-x-1/2 origin-top"
                    />

                    <div className="space-y-24">
                        {journeyNodes.map((node, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className={`flex-1 w-full md:w-auto ${isEven ? "md:text-right md:pr-12 pl-16 md:pl-0" : "md:text-left md:pl-12 pl-16 md:pr-0"}`}>
                                        <span className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-2 block">
                                            {node.day}
                                        </span>
                                        <h3 className="text-2xl font-medium text-gray-900 mb-3">{node.title}</h3>
                                        <p className="text-gray-600 font-light leading-relaxed">
                                            {node.desc}
                                        </p>
                                    </div>

                                    {/* Node */}
                                    <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-gray-50 shadow-lg z-10">
                                        <span className="text-xl">{node.icon}</span>
                                    </div>

                                    {/* Empty spacer for grid alignment */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
