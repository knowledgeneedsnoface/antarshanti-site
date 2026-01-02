"use client";

import React from "react";
import Link from "next/link";
import { MoveRight, Sparkles, Flame, Wind, Anchor } from "lucide-react";

export default function LandingNarrative() {
    return (
        <div className="bg-[#faf9f6] text-stone-800">
            {/* SECTION 1: WHY THIS EXISTS (Validation) */}
            <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
                    You’re not broken. <br />
                    <span className="text-stone-500 italic">You’re just overstimulated.</span>
                </h2>
                <div className="max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                    <p>
                        Most people don’t need motivation or discipline.
                        They need a pause that feels safe.
                    </p>
                    <p>
                        AntarShanti isn’t about becoming better.
                        It’s about returning to yourself — a little, every day.
                    </p>
                </div>
            </section>

            {/* SECTION 2: WHAT YOU ACTUALLY DO (Methodology) */}
            <section id="why-it-works" className="py-24 bg-white border-y border-stone-100">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-medium text-center text-stone-900 mb-16">
                        What happens in those 10 minutes?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        {/* Step 1 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0">
                                <Anchor className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900">1. You arrive</h3>
                            <p className="text-stone-600 leading-relaxed">
                                A gentle prompt brings your attention back — no silence pressure.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0">
                                <Flame className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900">2. You practice</h3>
                            <p className="text-stone-600 leading-relaxed">
                                A simple ritual: breath, awareness, a small act of presence.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4 mx-auto md:mx-0">
                                <Wind className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900">3. You leave lighter</h3>
                            <p className="text-stone-600 leading-relaxed">
                                No tracking. No streak guilt. Just calm.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12 text-sm text-stone-400 uppercase tracking-widest font-medium">
                        Nothing to achieve. Nothing to unlock.
                    </div>
                </div>
            </section>

            {/* SECTION 3: DIFFERENTIATION (Comparison) */}
            <section className="py-24 px-6 md:px-12 bg-stone-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-medium text-center text-stone-900 mb-16">
                        This is not meditation. <br />
                        <span className="text-stone-500">And it’s not therapy.</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                        {/* Not AntarShanti */}
                        <div className="p-8 rounded-2xl bg-[#f0efeb] text-stone-500 opacity-80">
                            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-stone-400">Not AntarShanti</h3>
                            <ul className="space-y-4 font-medium">
                                <li className="flex items-center gap-3"><span className="text-stone-300">✕</span> Long sessions</li>
                                <li className="flex items-center gap-3"><span className="text-stone-300">✕</span> Positive thinking</li>
                                <li className="flex items-center gap-3"><span className="text-stone-300">✕</span> Fix-your-life energy</li>
                                <li className="flex items-center gap-3"><span className="text-stone-300">✕</span> Someone talking at you</li>
                            </ul>
                        </div>

                        {/* AntarShanti */}
                        <div className="p-8 rounded-2xl bg-white shadow-xl shadow-stone-200/50 text-stone-800 ring-1 ring-amber-100 transform md:-translate-y-4">
                            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-amber-600">AntarShanti</h3>
                            <ul className="space-y-4 font-medium text-lg">
                                <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> 10 minutes</li>
                                <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> Small, human acts</li>
                                <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> No fixing required</li>
                                <li className="flex items-center gap-3"><span className="text-amber-500">✓</span> You stay in control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INNER ATLAS (Primary Product) */}
            <section className="py-32 px-6 bg-stone-900 text-white relative overflow-hidden">
                {/* Background Hint */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-serif text-amber-100">Your Inner Atlas</h2>
                        <div className="space-y-6 text-lg text-stone-300 font-light leading-relaxed">
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
                        <div className="pt-4">
                            <Link href="/inner-atlas" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-lg font-medium border-b border-amber-400/30 hover:border-amber-300 pb-1">
                                Enter today’s ritual <MoveRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    {/* Visual Placeholder for Atlas - Keeping it abstract text or simple graphic */}
                    <div className="flex-1 w-full max-w-sm aspect-square rounded-full border border-stone-700/50 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full" />
                        <div className="text-stone-600 font-serif italic text-2xl">Day 1</div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-stone-800 rounded-full animate-[spin_60s_linear_infinite] opacity-50" />
                    </div>
                </div>
            </section>

            {/* SECTION 5: SOUL TWIN (Secondary Product) */}
            <section className="py-24 px-6 md:px-12 bg-amber-50/50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full text-amber-700 mb-8">
                        <Sparkles className="w-6 h-6" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">
                        When you want a companion, not advice.
                    </h2>

                    <div className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                        <p className="mb-4">
                            Soul Twin listens. Reflects. And responds — without judging or correcting you.
                        </p>
                        <p>
                            Think of it as a calm mirror, not a coach.
                        </p>
                    </div>

                    <Link href="/twin/demo" className="inline-block px-8 py-3 rounded-full border border-amber-600/30 text-amber-700 font-medium hover:bg-amber-100/50 transition-colors">
                        Try a short Soul Twin demo →
                    </Link>
                </div>
            </section>

            {/* SECTION 6: PHYSICAL RITUAL KIT (Delayed Monetization - The content is here, logic for visibility can be handled by parent or just show it) */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                            Some people like to make it physical.
                        </h2>
                        <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
                            <p>
                                A candle. A scent. <br />
                                A quiet signal to your nervous system that it’s time to pause.
                            </p>
                            <p className="font-medium text-stone-800">
                                The ritual kit isn’t required — it’s an invitation.
                            </p>
                        </div>
                        <div className="pt-4">
                            <Link href="/get-started" className="inline-flex items-center gap-2 text-stone-900 hover:text-amber-600 transition-colors font-medium border-b border-stone-200 hover:border-amber-600 pb-1">
                                See what’s inside the 10-Minute Ritual Kit <MoveRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full bg-stone-100 aspect-[4/3] rounded-2xl flex items-center justify-center text-stone-400">
                        {/* Placeholder for Kit Image */}
                        <div className="text-center">
                            <div className="text-6xl mb-4">🕯️</div>
                            <p className="uppercase tracking-widest text-sm">Ritual Kit</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: CLOSING INVITATION */}
            <section className="py-32 px-6 bg-[#faf9f6] text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-8 leading-tight">
                        You don’t need to change your life today.
                    </h2>
                    <p className="text-xl text-stone-600 mb-12">
                        Just give yourself <br />
                        <span className="font-medium text-stone-900">10 uninterrupted minutes.</span>
                    </p>

                    <Link
                        href="/inner-atlas"
                        className="inline-block px-10 py-5 bg-stone-900 text-white rounded-full text-xl font-medium shadow-xl hover:bg-stone-800 hover:scale-105 transition-all duration-300"
                    >
                        Begin when you’re ready →
                    </Link>
                </div>
            </section>
        </div>
    );
}
