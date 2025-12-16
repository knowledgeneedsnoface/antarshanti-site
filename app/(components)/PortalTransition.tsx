"use client";

import { motion } from "framer-motion";

export default function PortalTransition() {
    return (
        <section className="relative w-full h-[40vh] bg-gradient-to-b from-[#0a0502] to-[#faf9f6] flex items-center justify-center overflow-hidden">
            {/* 
               Gradient Setup:
               from-[#0a0502] (Dark Portal)
               to-[#faf9f6] (Light River/Page BG)
            */}

            {/* Atmospheric Bloom (Option: Ambient light bloom) */}
            <motion.div
                className="absolute w-[200px] h-[200px] bg-amber-500/20 blur-[80px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1.2 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
            />

            {/* Subtle Text */}
            <motion.p
                className="relative z-10 text-amber-900/50 font-serif italic text-lg md:text-xl tracking-[0.2em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.5, delay: 0.2 }}
            >
                Breathe. Let the outside dissolve.
            </motion.p>
        </section>
    );
}
