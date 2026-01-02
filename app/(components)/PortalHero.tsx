"use client";

import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalHero() {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Mouse tracking for "Curtain Parting" effect
    const mouseX = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (typeof window === "undefined") return;
        const { clientX } = e;
        const { innerWidth } = window;
        mouseX.set(clientX / innerWidth - 0.5);
    };

    // Particles generator
    const particles = Array.from({ length: 30 });

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center z-50 cursor-default"
        >

            {/* Floating Embers with "Curtain Parting" Repulsion */}
            {particles.map((_, i) => {
                // Random initial positions
                const initialX = Math.random() < 0.5 ? -1 : 1; // Left or Right side bias

                return (
                    <Particle
                        key={i}
                        mouseX={mouseX}
                        initialSide={initialX}
                    />
                );
            })}

            {/* Main Content */}
            <div className="z-10 text-center max-w-4xl px-6 relative">

                {/* Decorative glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

                <motion.h1
                    className="relative text-6xl md:text-8xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-50 to-amber-200/60 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
                >
                    AntarShanti
                </motion.h1>

                <motion.p
                    className="relative text-xl md:text-2xl text-amber-100/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    Peace is a practice, not a destination.
                    <br />
                    <span className="text-base md:text-lg opacity-80 mt-4 block font-normal">
                        Discover the power of small, daily acts. Through simple, immersive activities, you bring yourself back to the present. This is self-therapy, where you hold the power to find your own peace.
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <button
                        onClick={() => {
                            setIsClicked(true);
                            setTimeout(() => router.push('/inner-atlas'), 1000);
                        }}
                        className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-medium text-lg tracking-wide shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_-5px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Your Practice
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>

                    <Link href="/twin/demo" className="text-sm text-amber-200/40 hover:text-amber-200 transition-colors uppercase tracking-widest border-b border-transparent hover:border-amber-200/30 pb-1">
                        Try Soul Twin Demo
                    </Link>
                </motion.div>
            </div>

            {/* Transition Whiteout Overlay */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        className="fixed inset-0 bg-white z-[100] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>

        </section >
    );
}

// Add Link import if not present, though Next usually handles it. But wait, removing imports might break things.
// Need to ensure imports are correct.
// The original file used `import { useRouter } from "next/navigation";` and framer motion etc.
// I need check imports. `Link` was NOT imported in original file (it used motion.a).
// I should add `import Link from "next/link";` at the top or use motion.a / standard a tag logic.
// Let's use `import Link` if I can edit imports, but `replace_file_content` targets a block.
// I will just use motion.a or add Link import via a separate edit if needed.
// Actually, in the replacement content I used <Link>. I must ensure Link is imported.
// The original imports were:
// import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// Only those. So I need to add Link import or use normal <a> or <motion.a>.
// I'll stick to maintaining existing imports and adding Link if possible, or just using `router.push` on a button or `a` tag.
// I used <Link> in my replacement content. I should probably use `motion.a` or just change the top of the file as well.
// But `replace_file_content` operates on a range.
// Let's do a replace on the whole file body, and I'll do a separate tool call to add the import if needed.
// actually, I'll just change <Link> to an <a href> or <button> logic to avoid import errors for now, or use the router.
// Wait, I can just use `motion.a` or standard `a`.
// Or I can add the import.
// I'll try to add the import in a subsequent step if it fails? No, that breaks compilation immediately.
// I'll use `motion.a` or standard `a` which works without `Link`, or `router.push`.
// I'll use a `motion.button` for the main CTA (already doing that) and `motion.a` for the secondary link.


function Particle({ mouseX, initialSide }: { mouseX: any, initialSide: number }) {
    // "Parting curtains" effect:
    // If initialSide is -1 (left), moving mouse moves it further left.
    // We use a spring for smooth repulsion.

    // xOffset is driven by mouseX. 
    // If mouseX goes -0.5 (left edge), we want particles to move AWAY from center or follow?
    // User said: "Drift away (like parting curtains)". 
    // Usually means moving cursor into them pushes them away.
    // Let's make them move away from the cursor broadly.

    const xRepulsion = useTransform(mouseX, [-0.5, 0.5], [initialSide * -50, initialSide * 50]);
    const springX = useSpring(xRepulsion, { stiffness: 50, damping: 20 });

    const randomDelay = Math.random() * 5;
    const randomDuration = Math.random() * 10 + 10;

    return (
        <motion.div
            className="absolute rounded-full bg-amber-500/40 blur-[1px]"
            initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
                scale: Math.random() * 0.5 + 0.2,
                opacity: 0
            }}
            style={{ x: springX }} // Apply repulsion
            animate={{
                y: -100,
                opacity: [0, 0.6, 0],
            }}
            transition={{
                y: {
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: randomDelay
                },
                opacity: {
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: randomDelay
                }
            }}
        // Only re-calc basic positions occasionally
        />
    )
}
