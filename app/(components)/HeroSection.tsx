"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * HeroSection with animated SVG mandala and BREATHING GLOW.
 * Paste this over app/(components)/HeroSection.tsx
 */

export default function HeroSection() {
  // tweakables:
  const MANDALA_OPACITY = 0.12; // overall motif opacity
  const ROTATION_DURATION = 28; // seconds (slow rotation)
  const DRAW_DURATION = 6; // seconds for initial stroke draw
  const GLOW_OPACITY = 0.17; // peak glow opacity
  const GLOW_DURATION = 3.8; // seconds for one breath cycle

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
      {/* background image with parallax */}
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

      {/* BREATHING GLOW + Animated SVG Mandala (decorative) */}
      <div className="pointer-events-none absolute right-8 top-10 hidden md:block" style={{ width: 240, height: 240 }}>
        {/* breathing glow layer (radial gradient) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0.0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="mandala-glow"
            style={{
              position: "absolute",
              width: 240,
              height: 240,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </motion.div>

        {/* Rotation wrapper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: ROTATION_DURATION }}
          className="will-change-transform relative z-10 flex items-center justify-center"
          style={{ width: 240, height: 240 }}
          aria-hidden
        >
          {/* SVG mandala */}
          <svg viewBox="0 0 200 200" width="220" height="220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#F6E7C0" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E9B97A" stopOpacity="0.55" />
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

            {/* Radiating petals */}
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

            {/* Inner concentric ring */}
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
      </div>

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

      {/* breathing glow CSS (inlined for clarity) */}
      <style jsx>{`
        .mandala-glow {
          background: radial-gradient(circle at 50% 40%, rgba(250,200,120, ${GLOW_OPACITY}) 0%, rgba(250,200,120, ${GLOW_OPACITY * 0.6}) 35%, rgba(250,200,120,0.06) 55%, transparent 80%);
          filter: blur(26px);
          transform: scale(0.96);
          animation: mandala-breathe ${GLOW_DURATION}s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }

        @keyframes mandala-breathe {
          0% { transform: scale(0.96); opacity: 0.75; filter: blur(20px); }
          50% { transform: scale(1.03); opacity: 1; filter: blur(28px); }
          100% { transform: scale(0.96); opacity: 0.75; filter: blur(20px); }
        }

        /* small responsive tweak */
        @media (max-width: 768px) {
          .mandala-glow { display: none; }
        }
      `}</style>
    </section>
  );
}
