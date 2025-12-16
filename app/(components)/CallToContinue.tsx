"use client";

import { motion } from "framer-motion";
import LivePresenceWidget from "./LivePresenceWidget";

export default function CallToContinue() {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-light text-gray-900 mb-2">The Soul Twin</h2>
                <p className="text-lg text-amber-700/80 font-medium mb-8">A reflective witness that evolves with your consistency.</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <motion.a
                        href="/get-started" // Modified to link to our new pre-sell flow
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-amber-500 text-white rounded-full font-medium shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center gap-2"
                    >
                        Get My AntarShanti Kit
                    </motion.a>

                    <motion.a
                        href="/inner-atlas"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gray-900 text-amber-500 border border-gray-900 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
                    >
                        Start Inner Atlas
                    </motion.a>

                    <motion.a
                        href="/twin/demo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-600 border border-gray-200 rounded-full font-medium hover:border-amber-400 hover:text-amber-600 transition-all group"
                    >
                        Try the Twin Demo <span className="text-xs text-amber-500 ml-2 font-bold px-2 py-0.5 bg-amber-50 rounded-full">30s</span>
                    </motion.a>
                </div>

                <div className="mt-8">
                    <LivePresenceWidget />
                </div>
            </div>
        </section>
    );
}
