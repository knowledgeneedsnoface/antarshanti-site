"use client";

import { motion } from "framer-motion";

export default function GratitudeSeal() {
    return (
        <section className="py-24 bg-[#faf9f6] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-8 p-4 bg-white rounded-full shadow-sm"
            >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-50 text-3xl">
                    🙏
                </div>
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
                Your ritual is sealed.
            </motion.p>
        </section>
    );
}
