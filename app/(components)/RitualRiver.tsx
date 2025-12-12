"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        id: 1,
        title: "Instant Calm",
        desc: "The moment you open the box, the world slows.",
        hindi: "Zyada sochne se pehle… bas khud se shuru karna zaroori hai.",
        icon: "🕯️"
    },
    {
        id: 2,
        title: "The Candle",
        desc: "A single flame. A quiet shift inside you.",
        icon: "🔥"
    },
    {
        id: 3,
        title: "The Fragrance",
        desc: "Scent that instantly transports you home.",
        icon: "💨" // Representing smoke/scent
    },
    {
        id: 4,
        title: "The Mantra",
        desc: "Sound medicine. Repeat it 3 times.",
        icon: "🕉️"
    },
    {
        id: 5,
        title: "Manifestation",
        desc: "Your voice becomes your intention.",
        icon: "🗣️"
    },
    {
        id: 6,
        title: "Meaning",
        desc: "Transform sound into personal truth.",
        icon: "📖"
    },
    {
        id: 7,
        title: "Flame Focus",
        desc: "No input. No output. Just be.",
        icon: "👁️"
    },
    {
        id: 8,
        title: "Gratitude",
        desc: "One breath. One thank you.",
        icon: "❤️"
    }
];

export default function RitualRiver() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-stone-50">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* River Header - always visible until river ends */}
                <div className="absolute top-10 left-6 md:left-20 z-20">
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-2">The Ritual River</h2>
                    <p className="text-gray-500 font-light">Walk the path. Let each step open you.</p>
                </div>

                <motion.div style={{ x }} className="flex gap-10 pl-[5vw] md:pl-[20vw] pr-20">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="group relative h-[50vh] w-[80vw] md:w-[35vw] md:h-[60vh] flex-shrink-0 rounded-3xl bg-white shadow-xl overflow-hidden border border-stone-100 flex flex-col justify-center items-center text-center p-8 hover:scale-[1.02] transition-transform duration-500"
                        >
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full opacity-50" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-50 rounded-tr-full opacity-50" />

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-8xl mb-8 group-hover:scale-110 transition-transform duration-700"
                            >
                                {step.icon}
                            </motion.div>

                            <h3 className="text-2xl font-medium text-gray-900 mb-4">{step.title}</h3>

                            <p className="text-gray-600 font-light leading-relaxed max-w-sm mb-6">
                                {step.desc}
                            </p>

                            {step.hindi && (
                                <p className="text-amber-700/70 font-serif italic text-lg max-w-sm text-center">
                                    "{step.hindi}"
                                </p>
                            )}

                            <span className="absolute bottom-8 text-6xl font-black text-gray-50 select-none -z-10">
                                0{step.id}
                            </span>
                        </div>
                    ))}

                    {/* End cap */}
                    <div className="w-[10vw]" />
                </motion.div>
            </div>
        </section>
    );
}
