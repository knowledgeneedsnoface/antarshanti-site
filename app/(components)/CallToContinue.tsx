"use client";

import { motion } from "framer-motion";

export default function CallToContinue() {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-light text-gray-900 mb-8">Carry This Calm Forward</h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <motion.a
                        href="#product"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-amber-500 text-white rounded-full font-medium shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
                    >
                        Get My AntarShanti Kit
                    </motion.a>

                    <motion.a
                        href="/twin/demo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-600 border border-gray-200 rounded-full font-medium hover:border-amber-400 hover:text-amber-600 transition-all"
                    >
                        See the Ritual in Action
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
