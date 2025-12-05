"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Animated mandala SVG inside the hero.
 * - slow rotation (CSS transform)
 * - subtle SVG stroke-draw animation using strokeDashoffset
 * - low opacity so it reads as a decorative motif
 *
 * Tweakable variables are at the top of the component.
 */

export default function HeroSection() {
  // tweakables:
  const MANDALA_OPACITY = 0.12; // overall opacity of the motif
  const ROTATION_DURATION = 28; // seconds (slow rotation)
  const DRAW_DURATION = 6; // seconds for initial stroke draw

  // subtle parallax on mouse move:
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgX = useTransform(x, (v) => `${v / 30}%`);
  const imgY = useTransform(y, (v) => `${v / 50}%`);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      x.set(dx);
      y.set(dy);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [x, y]);

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-b-3xl shadow-md">
      {/* animated background image with parallax */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="absolute inset-0 -z-20 will-change-transform"
        aria-hidden
      >
        <Image
          src="/hero.jpg"
          alt="AntarShanti hero"
          fill
          className="object-cover object-center brightness-[0.88] transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </motion.div>

      {/* Animated SVG Mandala (decorative) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: MANDALA_OPACITY, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute right-8 top-10 hidden md:block"
        style={{ transformOrigin: "center center" }}
      >
        {/* Rotation wrapper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: ROTATION_DURATION }}
          className="will-change-transform"
          style={{ width: 220, height: 220 }}
          aria-hidden
        >
          {/* SVG mandala */}
          <svg viewBox="0 0 200 200" width="220" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#F6E7C0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E9B97A" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Outer circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="url(#g1)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_DURATION, ease: "anticipate" }}
              style={{ opacity: 0.95 }}
            />

            {/* Radiating petals (repeat pattern) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x1 = 100 + Math.cos(angle) * 52;
              const y1 = 100 + Math.sin(angle) * 52;
              const x2 = 100 + Math.cos(angle) * 78;
              const y2 = 100 + Math.sin(angle) * 78;
              const key = `petal-${i}`;
              return (
                <motion.path
                  key={key}
                  d={`M ${x1} ${y1} Q ${100 + Math.cos(angle) * 62} ${100 + Math.sin(angle) * 62} ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#g1)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: DRAW_DURATION * 0.6 }}
                  style={{ opacity: 0.9 }}
                />
              );
            })}

            {/* Inner concentric decorative ring */}
            <motion.circle
              cx="100"
              cy="100"
              r="46"
              fill="none"
              stroke="#F6E7C0"
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: DRAW_DURATION * 0.8 }}
              style={{ opacity: 0.9 }}
            />

            {/* central bindu dot */}
            <motion.circle
              cx="100"
              cy="100"
              r="4"
              fill="#E9B97A"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "backOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Heading block */}
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-lg text-white"
          >
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight drop-shadow-md">
              10 Minutes of Puja.
              <br />
              <span className="inline-block mt-2">A Whole Day of Inner Peace.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-4 text-sm md:text-base text-white/95"
            >
              A 30-day self-therapy ritual kit — eco-friendly, screen-free, grounding.
            </motion.p>

            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <motion.a
                href="#product"
                className="cta inline-flex items-center gap-3 rounded-full bg-amber-600 px-6 py-3 text-white font-medium shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                animate={{ boxShadow: "0 8px 30px rgba(217, 119, 6, 0.12)" }}
              >
                Start Your Journey
              </motion.a>

              <motion.a
                href="#benefits"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm text-white/95 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Learn why it works
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* small floating CTA pulse (lower-right) */}
      <motion.a
        href="#product"
        className="hidden md:flex items-center gap-2 fixed right-8 bottom-8 z-50 rounded-full bg-white/95 px-4 py-2 shadow-lg text-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [1, 1.04, 1], transition: { duration: 2, repeat: Infinity } }}
      >
        ✨ Quick buy
      </motion.a>
    </section>
  );
}
