"use client";

import { motion } from "framer-motion";

const benefits = [
    {
        title: "Peace in 30 Seconds",
        desc: "The candle flame creates a visual anchor that naturally slows alpha waves.",
        icon: "🕯️",
        span: "col-span-1 md:col-span-2",
        bg: "bg-amber-50"
    },
    {
        title: "Deep Nostalgia",
        desc: "Scent that instantly transports you home.",
        icon: "🌸",
        span: "col-span-1",
        bg: "bg-orange-50"
    },
    {
        title: "Brain Rewiring",
        desc: "Repetition creates new neural pathways for calm.",
        icon: "🧠",
        span: "col-span-1",
        bg: "bg-white border border-gray-100"
    },
    {
        title: "Confidence",
        desc: "Hearing your own voice builds self-belief.",
        icon: "🗣️",
        span: "col-span-1 md:col-span-2",
        bg: "bg-stone-50"
    },
];

export default function ImmersiveBenefits() {
    return (
        <section id="benefits" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-light text-gray-900 mb-4">Why it works</h2>
                    <p className="text-gray-500 font-light">Neuroscience wrapped in tradition.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {benefits.map((offer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                            className={`${offer.span} ${offer.bg} p-8 rounded-3xl min-h-[240px] flex flex-col justify-between transition-all duration-300`}
                        >
                            <span className="text-4xl mb-4 block">{offer.icon}</span>
                            <div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">{offer.title}</h3>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    {offer.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Big CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="col-span-1 md:col-span-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
                    >
                        <div>
                            <h3 className="text-2xl font-medium mb-2">Ready for your reset?</h3>
                            <p className="text-white/80 font-light">Join 1000+ others finding their peace.</p>
                        </div>
                        <a
                            href="#product"
                            className="px-8 py-3 bg-white text-amber-600 rounded-full font-medium hover:bg-amber-50 transition-colors"
                        >
                            Get the Kit →
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
