"use client";

import React from "react";
import Link from "next/link";
import { MoveRight, Sparkles, Flame, Wind, Anchor } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingNarrative() {
    return (
        <div className="bg-[#faf9f6] text-stone-800 overflow-hidden">
            {/* SECTION 1: WHY THIS EXISTS (Validation) */}
            <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
                        You’re not broken. <br />
                        <span className="text-stone-500 italic">You’re just overstimulated.</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto space-y-6 text-xl text-stone-600 font-light leading-relaxed"
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

            {/* SECTION 2: WHAT YOU ACTUALLY DO (Methodology) */}
            <section id="why-it-works" className="py-32 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] opacity-60" />
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

                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        {/* Step 1 */}
                        <motion.div
                            className="space-y-6 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                <Anchor className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900">1. You arrive</h3>
                            <p className="text-stone-600 leading-relaxed text-lg">
                                A gentle prompt brings your attention back — no silence pressure.
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            className="space-y-6 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                <Flame className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900">2. You practice</h3>
                            <p className="text-stone-600 leading-relaxed text-lg">
                                A simple ritual: breath, awareness, a small act of presence.
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            className="space-y-6 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                <Wind className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-serif text-stone-900">3. You leave lighter</h3>
                            <p className="text-stone-600 leading-relaxed text-lg">
                                No tracking. No streak guilt. Just calm.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="text-center mt-20 text-sm text-stone-400 uppercase tracking-widest font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        Nothing to achieve. Nothing to unlock.
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: DIFFERENTIATION (Comparison) */}
            <section className="py-32 px-6 md:px-12 bg-stone-50">
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
                        {/* Not AntarShanti */}
                        <motion.div
                            className="p-10 rounded-3xl bg-[#efedea] text-stone-500 opacity-80 hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 0.8, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-stone-400">Not AntarShanti</h3>
                            <ul className="space-y-6 font-medium">
                                <li className="flex items-center gap-4"><span className="text-stone-300 text-xl">✕</span> Long sessions</li>
                                <li className="flex items-center gap-4"><span className="text-stone-300 text-xl">✕</span> Positive thinking</li>
                                <li className="flex items-center gap-4"><span className="text-stone-300 text-xl">✕</span> Fix-your-life energy</li>
                                <li className="flex items-center gap-4"><span className="text-stone-300 text-xl">✕</span> Someone talking at you</li>
                            </ul>
                        </motion.div>

                        {/* AntarShanti */}
                        <motion.div
                            className="p-10 rounded-3xl bg-white shadow-2xl shadow-stone-200/50 text-stone-800 ring-1 ring-amber-100 relative md:-top-6"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
                            <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-amber-600">AntarShanti</h3>
                            <ul className="space-y-6 font-medium text-lg">
                                <li className="flex items-center gap-4"><span className="text-amber-500 text-xl">✓</span> 10 minutes</li>
                                <li className="flex items-center gap-4"><span className="text-amber-500 text-xl">✓</span> Small, human acts</li>
                                <li className="flex items-center gap-4"><span className="text-amber-500 text-xl">✓</span> No fixing required</li>
                                <li className="flex items-center gap-4"><span className="text-amber-500 text-xl">✓</span> You stay in control</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INNER ATLAS (Primary Product) */}
            <section className="py-32 px-6 bg-[#0c0a09] text-white relative overflow-hidden">
                {/* Background Hint */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
                    <motion.div
                        className="flex-1 space-y-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-amber-50">Your Inner Atlas</h2>
                        <div className="space-y-6 text-xl text-stone-300 font-light leading-relaxed">
                            <p>
                                The Inner Atlas is your personal ritual path.
                                Each day offers a small practice designed to bring you back to the present.
                            </p>
                            <p>
                                Some days it’s breath.
                                Some days it’s noticing light, sound, or stillness.
                            </p>
                            <p className="text-white font-medium">
                                Always simple. Always optional.
                            </p>
                        </div>
                        <div className="pt-6">
                            <Link href="/inner-atlas" className="group inline-flex items-center gap-3 text-amber-400 hover:text-amber-300 transition-colors text-lg font-medium">
                                <span className="border-b border-amber-400/30 group-hover:border-amber-300 pb-1">Enter today’s ritual</span>
                                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Animated Abstract Atlas */}
                    <motion.div
                        className="flex-1 w-full flex items-center justify-center p-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        <div className="relative w-80 h-80">
                            {/* Rotating Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-stone-800 rounded-full opacity-60"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 border border-stone-800 rounded-full opacity-40 border-dashed"
                            />

                            {/* Glowing Core */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full" />
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-amber-500/5 via-amber-900/10 to-transparent rounded-full blur-2xl"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="text-center">
                                    <span className="block text-4xl font-serif italic text-stone-500 mb-1">Day 1</span>
                                    <span className="text-xs uppercase tracking-[0.3em] text-stone-600">Beginning</span>
                                </div>
                            </div>

                            {/* Orbiting Dot */}
                            <motion.div
                                className="absolute top-0 left-1/2 w-1 h-32 -translate-x-1/2 origin-bottom"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5: SOUL TWIN (Secondary Product) */}
            <section className="py-32 px-6 md:px-12 bg-amber-50/30">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="inline-flex items-center justify-center p-4 bg-amber-100/50 rounded-full text-amber-700 mb-8"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-serif text-stone-900 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        When you want a companion, <br /> not advice.
                    </motion.h2>

                    <motion.div
                        className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p className="mb-4">
                            Soul Twin listens. Reflects. And responds — without judging or correcting you.
                        </p>
                        <p>
                            Think of it as a calm mirror, not a coach.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/twin/demo" className="inline-block px-10 py-4 rounded-full border border-amber-600/30 text-amber-800 font-medium hover:bg-amber-100 hover:scale-105 hover:shadow-lg transition-all duration-300">
                            Try a short Soul Twin demo →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 6: PHYSICAL RITUAL KIT */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
                    <motion.div
                        className="flex-1 space-y-10"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
                            Some people like to <br /> make it physical.
                        </h2>
                        <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                            <p>
                                A candle. A scent. <br />
                                A quiet signal to your nervous system that it’s time to pause.
                            </p>
                            <p className="font-medium text-stone-800 text-xl">
                                The ritual kit isn’t required — it’s an invitation.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Link href="/get-started" className="group inline-flex items-center gap-2 text-stone-900 hover:text-amber-700 transition-colors font-medium text-lg">
                                <span className="border-b border-stone-200 group-hover:border-amber-600 pb-1">See what’s inside the 10-Minute Ritual Kit</span>
                                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full bg-stone-50 aspect-[4/3] rounded-3xl flex items-center justify-center text-stone-400 relative overflow-hidden group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="text-center relative z-10">
                            <motion.div
                                className="text-7xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                🕯️
                            </motion.div>
                            <p className="uppercase tracking-[0.3em] text-xs font-bold text-stone-400 group-hover:text-stone-600 transition-colors">The Ritual Kit</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 7: CLOSING INVITATION */}
            <section className="py-40 px-6 bg-[#faf9f6] text-center relative">
                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.h2
                        className="text-4xl md:text-6xl font-serif text-stone-900 mb-10 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        You don’t need to change your life today.
                    </motion.h2>

                    <motion.p
                        className="text-2xl text-stone-600 mb-16 font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Just give yourself <br />
                        <span className="font-medium text-stone-900 mt-2 block">10 uninterrupted minutes.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Link
                            href="/inner-atlas"
                            className="inline-block px-12 py-5 bg-stone-900 text-white rounded-full text-xl font-medium shadow-2xl hover:bg-stone-800 hover:shadow-stone-900/20 hover:scale-[1.03] transition-all duration-300"
                        >
                            Begin when you’re ready →
                        </Link>
                    </motion.div>
                </div>

                {/* Subtle ambient light at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />
            </section>
        </div>
    );
}
