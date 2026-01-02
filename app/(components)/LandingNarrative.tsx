"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MoveRight, Sparkles, Flame, Wind, Anchor } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function LandingNarrative() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const methodologyRef = useRef(null);
    const { scrollYProgress: methodProgress } = useScroll({
        target: methodologyRef,
        offset: ["start center", "end center"]
    });

    // Portal Zoom Logic specifically for the Atlas Section
    const atlasRef = useRef(null);
    const { scrollYProgress: atlasProgress } = useScroll({
        target: atlasRef,
        offset: ["start end", "end start"]
    });

    const portalScale = useTransform(atlasProgress, [0.3, 0.6], [1, 50]);
    const portalOpacity = useTransform(atlasProgress, [0.3, 0.5, 0.6], [1, 1, 0]);
    const smoothScale = useSpring(portalScale, { stiffness: 60, damping: 20 });

    // Fade out text as we fly through
    const textOpacity = useTransform(atlasProgress, [0.4, 0.55], [1, 0]);

    return (
        <div ref={containerRef} className="text-stone-800 relative z-10 pointer-events-none">
            <div className="pointer-events-auto">

                {/* SECTION 1: WHY THIS EXISTS (Validation) */}
                <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
                    <RevealTitle text="You’re not broken." highlight="You’re just overstimulated." />

                    <motion.div
                        className="max-w-2xl mx-auto space-y-6 text-xl text-stone-600 font-light leading-relaxed mt-10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <p>
                            Most people don’t need motivation or discipline.
                            They need a pause that feels safe.
                        </p>
                        <p>
                            AntarShanti isn’t about becoming better.
                            It’s about returning to yourself — a little, every day.
                        </p>
                    </motion.div>
                </section>

                {/* SECTION 2: WHAT YOU ACTUALLY DO (Methodology) - CONSTELLATION PATH */}
                <section id="why-it-works" ref={methodologyRef} className="py-32 relative">
                    {/* Spirit Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-amber-400/20 rounded-full blur-xl"
                                style={{
                                    width: Math.random() * 100 + 50,
                                    height: Math.random() * 100 + 50,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
                                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}
                    </div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <motion.h2
                            className="text-3xl md:text-4xl font-medium text-center text-stone-900 mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            What happens in those 10 minutes?
                        </motion.h2>

                        <div className="relative grid md:grid-cols-3 gap-12 text-center md:text-left">

                            {/* CONSTELLATION PATH (New) */}
                            <div className="absolute top-8 left-[10%] w-[80%] h-px hidden md:block z-0 pointer-events-none">
                                {/* Base Faint Line */}
                                <div className="w-full h-full border-t border-dashed border-stone-300/50" />

                                {/* Glowing Active Beam */}
                                <motion.div
                                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                                    style={{ width: "100%", scaleX: methodProgress, transformOrigin: "left" }}
                                />
                            </div>

                            {[
                                { icon: Anchor, title: "1. You arrive", desc: "A gentle prompt brings your attention back." },
                                { icon: Flame, title: "2. You practice", desc: "A simple ritual: breath, awareness, presence." },
                                { icon: Wind, title: "3. You leave lighter", desc: "No tracking. No streak guilt. Just calm." }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    className="space-y-6 group relative z-10 p-6 rounded-2xl hover:bg-white/40 transition-colors duration-500"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.2, duration: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Glowing Star Node */}
                                    <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0 shadow-lg ring-1 ring-amber-100 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300">
                                        <step.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-stone-900">{step.title}</h3>
                                    <p className="text-stone-600 leading-relaxed text-lg">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 3: DIFFERENTIATION */}
                <section className="py-32 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            className="text-3xl md:text-5xl font-serif text-center text-stone-900 mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            This is not meditation. <br />
                            <span className="text-stone-400">And it’s not therapy.</span>
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <motion.div
                                className="p-10 rounded-3xl bg-white/40 backdrop-blur-md text-stone-500 hover:bg-white/60 transition-all duration-300 shadow-sm"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{ y: useTransform(scrollYProgress, [0.3, 0.6], [50, -50]) }}
                            >
                                <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-stone-400">Not AntarShanti</h3>
                                <ul className="space-y-6 font-medium">
                                    {["Long sessions", "Positive thinking", "Fix-your-life energy", "Someone talking at you"].map(item => (
                                        <li key={item} className="flex items-center gap-4"><span className="text-stone-300 text-xl">✕</span> {item}</li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                className="p-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl shadow-stone-200/20 text-stone-800 ring-1 ring-amber-100 relative md:-top-6 transform-gpu"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{ y: useTransform(scrollYProgress, [0.3, 0.6], [0, -100]) }}
                                whileHover={{ y: -5, rotateX: 2, rotateY: 2, transition: { duration: 0.3 } }}
                            >
                                <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-400 rounded-full blur-2xl opacity-20 pointer-events-none" />
                                <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-amber-600">AntarShanti</h3>
                                <ul className="space-y-6 font-medium text-lg">
                                    {["10 minutes", "Small, human acts", "No fixing required", "You stay in control"].map(item => (
                                        <li key={item} className="flex items-center gap-4"><span className="text-amber-500 text-xl">✓</span> {item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: INNER ATLAS - THE PORTAL ZOOM */}
                {/* 
          This is the key immersive moment.
          The container is tall (200vh) to allow scrolling "through" the moment.
      */}
                <div ref={atlasRef} className="relative h-[250vh]">
                    <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                        {/* The Portal Ring */}
                        <motion.div
                            className="absolute flex items-center justify-center z-0 pointer-events-none"
                            style={{ scale: smoothScale, opacity: portalOpacity }}
                        >
                            {/* Outer faint Rings */}
                            <div className="w-[45vh] h-[45vh] rounded-full border-[1px] border-amber-100/20" />
                            <div className="absolute inset-0 rounded-full border-[1px] border-amber-100/10 scale-90" />

                            {/* The TunneL: As it scales, this dark gradient swallows the screen */}
                            <div className="absolute w-[150vw] h-[150vw] bg-radial-gradient from-transparent via-[#0c0a09]/50 to-[#0c0a09] opacity-80" />
                        </motion.div>

                        {/* Content that fades in/out */}
                        <motion.div
                            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10 px-6 w-full"
                            style={{
                                opacity: textOpacity,
                                scale: useTransform(atlasProgress, [0.3, 0.5], [1, 1.2])
                            }}
                        >
                            <div className="flex-1 space-y-10 text-white">
                                <h2 className="text-4xl md:text-6xl font-serif text-amber-50 shadow-black drop-shadow-lg">Your Inner Atlas</h2>
                                <div className="space-y-6 text-xl text-stone-300 font-light leading-relaxed drop-shadow-md">
                                    <p>The Inner Atlas is your personal ritual path.</p>
                                    <p className="text-white font-medium">Always simple. Always optional.</p>
                                </div>
                                <div className="pt-6">
                                    <Link href="/inner-atlas" className="group inline-flex items-center gap-3 text-amber-400 text-lg font-medium">
                                        <span className="border-b border-amber-400/30 pb-1">Enter today’s ritual</span>
                                        <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Fixed Spinning Graphic - Disappears into zoom */}
                            <div className="flex-1 w-full flex items-center justify-center">
                                <div className="relative w-80 h-80">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-stone-500/50 rounded-full opacity-60" />
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <span className="block text-4xl font-serif italic text-stone-400">Day 1</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* SECTION 5: SOUL TWIN - LIQUID ORB EFFECT */}
                <section className="py-32 px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center relative">

                        {/* LIQUID ORB BACKDROP */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10 opacity-30 pointer-events-none">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-300 fill-current blur-3xl animate-pulse">
                                <path d="M42.7,-62.9C55.2,-52.8,65.2,-41.6,71.2,-29.1C77.2,-16.6,79.2,-2.8,75.4,9.5C71.6,21.9,62.1,32.8,51.8,42.3C41.6,51.8,30.6,59.9,18.3,63.9C6,68,-7.7,68,-20.3,63.4C-32.9,58.8,-44.4,49.7,-53.4,38.8C-62.5,27.8,-69.1,15.1,-68.6,2.6C-68,-9.9,-60.3,-22.1,-50.8,-31.8C-41.2,-41.5,-29.9,-48.6,-18.2,-59.4C-6.5,-70.2,5.6,-84.6,18.8,-83.4C32,-82.2,46.3,-65.4,42.7,-62.9Z" transform="translate(100 100)" />
                            </svg>
                        </div>

                        <motion.div
                            className="inline-flex items-center justify-center p-4 bg-white/40 rounded-full text-amber-700 mb-8 backdrop-blur-sm"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">
                            When you want a companion, <br /> not advice.
                        </h2>

                        <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                            Soul Twin listens. Reflects. And responds — without judging or correcting you.
                        </p>

                        <Link href="/twin/demo" className="inline-block px-10 py-4 rounded-full border border-amber-600/30 text-amber-800 font-medium hover:bg-amber-100/50 hover:scale-105 transition-all duration-300 shadow-xl shadow-amber-500/10">
                            Try a short Soul Twin demo →
                        </Link>
                    </div>
                </section>

                {/* RITUAL KIT - Clean Card */}
                <section className="py-32 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
                        {/* Reusing previous content */}
                        <div className="flex-1 space-y-10">
                            <h2 className="text-3xl md:text-5xl font-serif text-stone-900">Some people like to <br /> make it physical.</h2>
                            <p className="text-lg text-stone-600 font-light leading-relaxed">A quiet signal to your nervous system that it’s time to pause.</p>
                            <div className="pt-4">
                                <Link href="/get-started" className="group inline-flex items-center gap-2 text-stone-900 hover:text-amber-700 transition-colors font-medium text-lg">
                                    <span className="border-b border-stone-200 group-hover:border-amber-600 pb-1">See what’s inside the 10-Minute Ritual Kit</span>
                                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        {/* Image Card */}
                        <motion.div
                            className="flex-1 w-full bg-white/50 aspect-[4/3] rounded-3xl flex items-center justify-center text-stone-400 relative overflow-hidden group shadow-xl backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
                        >
                            <div className="text-center relative z-10">
                                <motion.div className="text-7xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🕯️</motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 7: CLOSING INVITATION */}
                <section className="py-40 px-6 text-center relative">
                    <div className="max-w-3xl mx-auto relative z-10">
                        <RevealTitle text="You don’t need to change your life today." />
                        <p className="text-2xl text-stone-600 mb-16 font-light mt-8">Just give yourself <span className="font-medium text-stone-900">10 uninterrupted minutes.</span></p>
                        <Link href="/inner-atlas" className="inline-block px-12 py-5 bg-stone-900 text-white rounded-full text-xl font-medium shadow-2xl hover:scale-[1.03] transition-all">Begin when you’re ready →</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

function RevealTitle({ text, highlight }: { text: string, highlight?: string }) {
    const words = text.split(" ");
    return (
        <motion.h2
            className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-3"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                >
                    {word}
                </motion.span>
            ))}
            {highlight && (
                <motion.span
                    className="block text-stone-500 italic mt-2"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { delay: 0.5, duration: 0.8 } }
                    }}
                >
                    {highlight}
                </motion.span>
            )}
        </motion.h2>
    )
}
