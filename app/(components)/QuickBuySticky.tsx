"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function QuickBuySticky() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show only after scrolling past 100vh
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 rounded-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <a
                        href="#product"
                        className="flex items-center gap-3 bg-white pl-4 pr-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(245,158,11,0.2)] transition-shadow duration-300 group"
                    >
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-amber-50">
                            <motion.div
                                animate={{ rotate: isHovered ? 15 : 0 }}
                                className="flex items-center justify-center w-full h-full text-lg"
                            >
                                📦
                            </motion.div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                                Quick Buy
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                                10-Min Ritual Kit
                            </span>
                        </div>

                        <motion.div
                            animate={{ x: isHovered ? 5 : 0 }}
                            className="ml-2 text-amber-500"
                        >
                            →
                        </motion.div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
