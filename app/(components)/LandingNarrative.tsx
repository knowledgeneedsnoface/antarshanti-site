"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function LandingNarrative() {
    return (
        <div className="relative z-10 font-sans text-stone-200">

            {/* 2. ORIENTATION — WHAT THIS IS */}
            <section id="orientation" className="py-32 px-6 max-w-4xl mx-auto text-center">
                <FadeIn>
                    <h2 className="text-3xl font-serif mb-16 text-stone-400">What you’re about to do is simple.</h2>
                </FadeIn>

                <div className="space-y-12 text-2xl font-light text-stone-700">
                    <FadeIn delay={0.2}><p>You’ll pause for a moment.</p></FadeIn>
                    <FadeIn delay={0.4}><p>You’ll notice one small thing.</p></FadeIn>
                    <FadeIn delay={0.6}><p>You’ll return to your day — lighter.</p></FadeIn>
                </div>

                <FadeIn delay={1.0}>
                    <div className="mt-16 text-sm uppercase tracking-widest text-stone-400">
                        No chanting. No beliefs required.
                    </div>
                </FadeIn>
            </section>

            {/* 3. PERMISSION — WHY IT WORKS */}
            <section className="py-32 px-6 max-w-3xl mx-auto text-center">
                <FadeIn>
                    <p className="text-4xl text-stone-100 font-serif leading-snug mb-12">
                        Your mind is tired because it never gets a full stop.
                    </p>
                </FadeIn>

                <div className="space-y-6 text-xl text-stone-500 font-light">
                    <FadeIn delay={0.2}><p>AntarShanti is a daily full stop.</p></FadeIn>
                    <div className="grid gap-2 text-stone-400">
                        <FadeIn delay={0.4}><p>Not a habit tracker.</p></FadeIn>
                        <FadeIn delay={0.5}><p>Not motivation.</p></FadeIn>
                        <FadeIn delay={0.6}><p>Not productivity.</p></FadeIn>
                    </div>
                    <FadeIn delay={0.8}>
                        <p className="text-stone-100 font-medium text-2xl mt-8">Just presence — practiced gently.</p>
                    </FadeIn>
                </div>
            </section>

            {/* 4. THE FIRST GUIDED MOMENT (Scroll-Locked Experience) */}
            <GuidedMoment />

            {/* 5. NAMING THE PRODUCT */}
            <section className="py-32 px-6 text-center">
                <FadeIn>
                    <h2 className="text-stone-400 uppercase tracking-widest text-sm mb-4">You have arrived at</h2>
                    <h1 className="text-6xl md:text-8xl font-serif text-amber-300 mb-6 text-shadow-glow">The Inner Atlas</h1>
                    <p className="text-2xl text-stone-600 font-light italic">A quiet daily guide back to yourself.</p>
                </FadeIn>
            </section>

            {/* 6. THE RITUAL SYSTEM (Reframed) */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif text-stone-300">One small noticing per day.</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <RitualCard title="Watching steam" desc="Watch the steam rise from your chai for 30 seconds." />
                    <RitualCard title="Walking feet" desc="Feel the sensation of your feet touching the ground." />
                    <RitualCard title="Moon gazing" desc="Look at the moon. Don't analyze it. Just see it." />
                    <RitualCard title="Hidden sounds" desc="Listen to birds without trying to name them." />
                </div>

                <div className="text-center mt-12 text-stone-500 font-serif italic text-lg opacity-70">
                    This is enough.
                </div>
            </section>

            {/* 7. WHY 10 MINUTES */}
            <section className="py-32 px-6 max-w-3xl mx-auto text-center border-t border-stone-200/50 mt-12">
                <FadeIn>
                    <p className="text-3xl text-stone-200 font-light leading-relaxed mb-6">
                        Because your nervous system doesn’t need more input.<br />
                        <span className="font-serif italic text-stone-500">It needs space.</span>
                    </p>
                    <p className="text-stone-400">Even 2 minutes counts here.</p>
                </FadeIn>
            </section>

            {/* 8. COMMITMENT WITHOUT PRESSURE */}
            <section className="py-32 px-6 text-center bg-gradient-to-b from-transparent to-stone-100/50">
                <FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-8">Walk with us for 30 days.</h2>
                    <div className="flex flex-col items-center gap-2 mb-12 text-stone-500">
                        <p>No streaks.</p>
                        <p>No failure.</p>
                        <p>Just returning.</p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/inner-atlas"
                            className="px-10 py-4 bg-stone-100 text-stone-900 rounded-full text-lg font-medium hover:bg-amber-400 transition-colors shadow-xl hover:shadow-2xl hover:shadow-amber-400/20"
                        >
                            Start the journey
                        </Link>
                        <Link href="/twin/demo" className="text-sm text-stone-400 hover:text-stone-600 transition-colors">
                            Or just stay and explore
                        </Link>
                    </div>
                </FadeIn>
            </section>

        </div>
    );
}

// --- Sub Comps ---

function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function RitualCard({ title, desc }: { title: string, desc: string }) {
    return (
        <motion.div
            className="p-8 rounded-3xl bg-white/40 backdrop-blur-sm border border-stone-200/30 hover:bg-white/60 transition-colors text-center group cursor-pointer"
            whileHover={{ y: -5 }}
        >
            <h3 className="text-amber-300/80 font-medium uppercase tracking-widest text-sm mb-4">{title}</h3>
            <p className="text-xl text-stone-700 font-serif leading-relaxed">{desc}</p>
        </motion.div>
    )
}

function GuidedMoment() {
    // A sticky section that holds the user for a moment?
    // Using simple viewport triggering for simplicity and elegance.

    return (
        <section className="min-h-[150vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center bg-stone-900 text-stone-100 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500 rounded-full blur-[200px] animate-pulse" style={{ animationDuration: '8s' }} />
                </div>

                <div className="relative z-10 max-w-2xl px-8 text-center space-y-16">
                    <Step
                        text="Before scrolling further..."
                        subtext="Look away from the screen."
                    />
                    <Step
                        text="Notice the farthest sound you can hear."
                        subtext="(Don't name it. Just notice it.)"
                        delay={0.5}
                    />
                    <Step
                        text="That was it."
                        subtext="You just arrived."
                        delay={1}
                        final
                    />
                </div>
            </div>
        </section>
    )
}

function Step({ text, subtext, delay = 0, final = false }: { text: string, subtext?: string, delay?: number, final?: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

    return (
        <motion.div
            ref={ref}
            className={`transition-opacity duration-1000 ${isInView ? "opacity-100" : "opacity-20 blur-sm"}`}
        >
            <p className={`font-serif ${final ? "text-4xl text-amber-200" : "text-3xl"}`}>{text}</p>
            {subtext && <p className="text-stone-500 mt-4 text-lg font-light">{subtext}</p>}
        </motion.div>
    )
}
