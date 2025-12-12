"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionContextType {
    startTransition: (callback?: () => void) => void;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
    startTransition: () => { },
    isTransitioning: false,
});

export function useTransition() {
    return useContext(TransitionContext);
}

export default function TransitionController({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = (callback?: () => void) => {
        setIsTransitioning(true);
        // Sequence: White -> #FCE8D2 -> #F6B56E -> Transparent (but effectively we leave the screen covered or navigate)
        // If we are navigating, we just need to cover the screen.
        // If this is an entry transition, it should start covered and reveal.
        // The prompt says: "When 'Open the Ritual' clicked -> trigger TransitionController."
        // implying an EXIT transition.

        // Duration: 700-900ms.
        setTimeout(() => {
            if (callback) callback();
            setTimeout(() => setIsTransitioning(false), 500); // Reset after Nav
        }, 800);
    };

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        className="fixed inset-0 z-[9999] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* Layered fade */}
                        <motion.div
                            className="absolute inset-0 bg-[#F6B56E]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-[#FCE8D2]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
}
