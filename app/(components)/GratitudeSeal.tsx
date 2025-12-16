"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GratitudeSeal() {
    const [clicked, setClicked] = useState(false);

    // Particles for explosion
    const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

    const handleClick = () => {
        setClicked(true);
        // Generate particles
        const newParticles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 1) * 200 // Mostly moving up
        }));
        setParticles(newParticles);
    };

    return (
        <section className="py-24 bg-[#faf9f6] flex flex-col items-center justify-center text-center overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                onClick={handleClick}
                className="mb-8 p-4 bg-white rounded-full shadow-sm cursor-pointer hover:shadow-lg transition-shadow relative z-10"
            >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-50 text-3xl select-none">
                    🙏
                </div>

                {/* Particle Explosion */}
                {clicked && particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full"
                    />
                ))}
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-serif text-gray-800 italic mb-4"
            >
                One breath. One thank you.
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 tracking-[0.2em] uppercase text-xs"
            >
                {clicked ? "Ritual Complete" : "Tap to Seal Your Ritual"}
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-[10px] md:text-xs text-amber-900/40 font-serif italic max-w-sm leading-relaxed"
            >
                "The digital realm honors your physical truth. Your intention is the bridge."
            </motion.p>
        </section>
    );
}
