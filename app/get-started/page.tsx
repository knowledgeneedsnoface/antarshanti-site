"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QuickBuySticky from '../(components)/QuickBuySticky';
import DailyRitualHome from '@/components/InnerAtlas/DailyRitualHome';

function SalesLanding() {
    return (
        <div className="min-h-screen bg-[#faf9f6]">
            {/* Header */}
            <header className="p-6 border-b border-amber-100 flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <Link href="/" className="font-serif text-2xl text-amber-900 tracking-tight hover:opacity-80 transition-opacity">
                    AntarShanti
                </Link>
                <div className="text-xs font-semibold uppercase tracking-widest text-amber-700/60">
                    Step 2 of 3: Your Kit
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>The path to inner peace is ready</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                        Turn 10 Minutes a Day<br />
                        <span className="text-amber-600 italic">Into Infinite Calm</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        You’ve experienced the demo. Now, get the physical tools to anchor that feeling into your daily reality.
                        No complex dogmas, just simple rituals.
                    </p>
                </motion.div>

                {/* The Problem & Solution Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">✕</span>
                            Without a Ritual
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex gap-3">
                                <span className="text-gray-400">•</span>
                                <div>Stress accumulates unnoticed until burnout.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-gray-400">•</span>
                                <div>Mornings feel rushed and chaotic.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-gray-400">•</span>
                                <div>Sleep is restless and mind won't shut off.</div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-amber-50 p-8 rounded-2xl border border-amber-200"
                    >
                        <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
                            <span className="bg-amber-200 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">✓</span>
                            With AntarShanti
                        </h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                <div>Instant reset button for your nervous system.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                <div>Start every day with intention and clarity.</div>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                <div>Deep, restorative sleep every night.</div>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* How it Works */}
                <section className="mb-20">
                    <h2 className="text-2xl font-serif text-center text-gray-900 mb-10">How it Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🌅",
                                title: "Morning Light",
                                desc: "Light the Diffuser. 5 minutes of focused breathing to set your intention."
                            },
                            {
                                icon: "⏸️",
                                title: "Midday Reset",
                                desc: "Use the Grip Stone when stress hits. 30 seconds to ground yourself."
                            },
                            {
                                icon: "🌙",
                                title: "Evening Release",
                                desc: "Journal one gratitude. Close the circle. Sleep deeply."
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-4">{step.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* What's Inside & CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

                    <h2 className="text-3xl font-serif mb-6 relative z-10">Ready to transform your daily routine?</h2>
                    <p className="text-white/70 mb-8 max-w-lg mx-auto relative z-10">
                        Join 2,000+ others who have found their peace.
                        Your kit includes the Copper Diffuser, Essential Oils, Grip Stone, and Journal.
                    </p>

                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <Link
                            href="/#product"
                            className="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/25 flex items-center gap-2 group"
                        >
                            Get My Starter Kit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            30-Day Money Back Guarantee
                        </div>
                    </div>
                </motion.div>

            </main>

            <QuickBuySticky />
        </div>
    );
}

function GetStartedContent() {
    const searchParams = useSearchParams();
    const ritualKey = searchParams.get('ritual');

    if (ritualKey) {
        return (
            <DailyRitualHome
                assignedRitualKey={ritualKey}
                onStartRitual={(key) => window.location.href = `/ritual/player?id=${key}`}
            />
        );
    }

    return <SalesLanding />;
}

export default function GetStartedPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GetStartedContent />
        </Suspense>
    );
}

