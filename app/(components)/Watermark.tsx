"use client";

import { motion } from "framer-motion";

export default function Watermark() {
    return (
        <div className="fixed bottom-[-10vh] right-[-10vh] w-[40vh] h-[40vh] pointer-events-none z-0 opacity-[0.03]">
            <motion.svg
                viewBox="0 0 200 200"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="w-full h-full text-amber-900"
            >
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            </motion.svg>
        </div>
    );
}
