"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const ritualSteps = [
    {
        number: "01",
        action: "Light the candle",
        concept: "The Anchor",
        description: "The flame becomes your anchor point.",
        whyTitle: "Why does this work?",
        whyContent: "Visual focus on a single point (Trataka) naturally slows brain waves from Beta to Alpha within 60 seconds.",
        color: "from-amber-400 to-orange-500"
    },
    {
        number: "02",
        action: "Light the agarbatti",
        concept: "Scent Memory",
        description: "The fragrance is your emotional trigger.",
        whyTitle: "Why does this work?",
        whyContent: "Olfactory bulb connects directly to the amygdala (emotion center). This scent instantly signals 'safety' to your nervous system.",
        color: "from-orange-400 to-rose-500"
    },
    {
        number: "03",
        action: "Read the mantra",
        concept: "Sound Medicine",
        description: "Repeat it 3 times slowly.",
        whyTitle: "Why repetition?",
        whyContent: "Rhythmic repetition calms the vagus nerve. You don't need to be religious; the vibration itself is the medicine.",
        color: "from-rose-400 to-pink-500"
    },
    {
        number: "04",
        action: "Read the meaning",
        concept: "Connection",
        description: "Transform sound into personal truth.",
        whyTitle: "Why translation?",
        whyContent: "Understanding bridges the gap between ancient sound and your modern life. It makes the ritual yours.",
        color: "from-pink-400 to-purple-500"
    },
    {
        number: "05",
        action: "Speak aloud",
        concept: "Manifestation",
        description: "Your voice becomes your intention.",
        whyTitle: "Why speak up?",
        whyContent: "Bone conduction allows you to hear your own voice internally, reinforcing self-belief more than listening to others.",
        color: "from-purple-400 to-indigo-500"
    },
    {
        number: "06",
        action: "Flame Meditation",
        concept: "The Release",
        description: "Simply watch. Just be.",
        whyTitle: "The secret",
        whyContent: "This is the dopamine detox. No input. No output. Just 2 minutes of existing without performing.",
        color: "from-indigo-400 to-blue-500",
        special: true
    }
];

export default function ImmersiveRitual() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto mb-20 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-600 font-medium tracking-widest text-sm uppercase mb-4 block"
                    >
                        The 10-Minute Reset
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-light text-gray-900 mb-6"
                    >
                        How it unfolds
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 font-light"
                    >
                        A sequence designed for maximum calm.
                    </motion.p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {ritualSteps.map((step, index) => {
                        const isExpanded = expandedIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${isExpanded ? "bg-white shadow-2xl scale-[1.02]" : "bg-white shadow-sm hover:shadow-md hover:scale-[1.01]"
                                    }`}
                            >
                                {/* Progress Bar / Color Edge */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${step.color}`} />

                                <div className="p-6 md:p-8">
                                    <div className="flex items-center gap-6">
                                        <span className={`text-2xl font-light font-mono opacity-30 group-hover:opacity-100 transition-opacity ${isExpanded ? "opacity-100" : ""}`}>
                                            {step.number}
                                        </span>

                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-1">
                                                <h3 className="text-xl font-medium text-gray-900">{step.action}</h3>
                                                <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">{step.concept}</span>
                                            </div>
                                            <p className="text-gray-500 font-light">{step.description}</p>
                                        </div>

                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            className="opacity-20 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronDown className="w-6 h-6" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 mt-6 border-t border-gray-100">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                                            <Sparkles className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 mb-2">{step.whyTitle}</h4>
                                                            <p className="text-gray-600 leading-relaxed font-light">
                                                                {step.whyContent}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
