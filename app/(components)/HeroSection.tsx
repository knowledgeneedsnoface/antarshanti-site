"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useTransition } from "./TransitionController";
import Tooltip from "./Tooltip";
import { triggerHaptic, hapticPatterns } from "./Haptics";

export default function HeroSection() {
  const MANDALA_OPACITY = 0.15;
  const ROTATION_DURATION = 30;
  const DRAW_DURATION = 6;
  const GLOW_OPACITY = 0.2;
  const GLOW_DURATION = 4;

  const { startTransition } = useTransition();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgX = useTransform(x, (v) => `${v / 35}%`);
  const imgY = useTransform(y, (v) => `${v / 55}%`);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);

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
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden rounded-b-3xl shadow-2xl">
      {/* Parallax background */}
      <motion.div
        style={{ x: imgX, y: parallaxY }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src="/hero.jpg"
          alt="AntarShanti hero"
          fill
          className="object-cover object-center brightness-[0.85] scale-110 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/10" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Breathing mandala */}
      <div className="pointer-events-none absolute right-8 top-12 hidden lg:block" style={{ width: 260, height: 260 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="mandala-glow" />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: ROTATION_DURATION }}
          className="will-change-transform relative z-10"
          style={{ width: 260, height: 260 }}
          role="img"
          aria-label="Breathing Mandala Animation"
        >
          <svg viewBox="0 0 200 200" width="240" height="240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.circle
              cx="100" cy="100" r="88"
              fill="none" stroke="url(#g1)" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_DURATION, ease: "anticipate" }}
              filter="url(#glow)"
            />

            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const x1 = 100 + Math.cos(angle) * 54;
              const y1 = 100 + Math.sin(angle) * 54;
              const x2 = 100 + Math.cos(angle) * 82;
              const y2 = 100 + Math.sin(angle) * 82;
              return (
                <motion.path
                  key={i}
                  d={`M ${x1} ${y1} Q ${100 + Math.cos(angle) * 65} ${100 + Math.sin(angle) * 65} ${x2} ${y2}`}
                  fill="none" stroke="url(#g1)" strokeWidth="0.9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: DRAW_DURATION * 0.7 }}
                  filter="url(#glow)"
                />
              );
            })}

            <motion.circle
              cx="100" cy="100" r="48"
              fill="none" stroke="#FCD34D" strokeWidth="0.7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: DRAW_DURATION * 0.9 }}
            />

            <motion.circle
              cx="100" cy="100" r="5"
              fill="#F59E0B"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, duration: 0.7, ease: "backOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="container mx-auto px-6 py-10 md:py-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-2xl"
          >
            {/* Word-by-word reveal */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.15] text-white drop-shadow-2xl">
              {["10", "Minutes", "of", "Puja."].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["A", "Whole", "Day", "of", "Inner", "Peace."].map((word, i) => (
                <motion.span
                  key={i + 10}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="inline-block mr-3 mt-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-6 text-base md:text-lg text-white/95 font-light tracking-wide"
            >
              30 days. Screen-free. Self-therapy.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <Tooltip text="The ritual begins when you slow down…">
                <motion.a
                  href="#product"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerHaptic(hapticPatterns.ritualStart);
                    startTransition(() => {
                      const el = document.querySelector("#product");
                      el?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                  className="relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-white font-medium shadow-2xl text-lg overflow-hidden group"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(245, 158, 11, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Start Your 10 Minute Ritual Journey"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  Start Your Journey →
                </motion.a>
              </Tooltip>

              <motion.a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 text-white/95 backdrop-blur-md hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.6)" }}
                aria-label="Learn How the Ritual Works"
              >
                See How ↓
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-6 text-sm text-white/80"
            >
              ₹1299 • Free Delivery • 7-Day Guarantee
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Floating quick buy */}
      <motion.a
        href="#product"
        className="hidden md:flex items-center gap-2 fixed right-8 bottom-8 z-50 rounded-full bg-white/95 px-5 py-3 shadow-2xl text-sm font-medium backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: ["0 10px 40px rgba(0,0,0,0.1)", "0 15px 60px rgba(245,158,11,0.3)", "0 10px 40px rgba(0,0,0,0.1)"]
        }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          boxShadow: { duration: 3, repeat: Infinity }
        }}
        whileHover={{ scale: 1.05 }}
      >
        ✨ Quick buy
      </motion.a>

      <style jsx>{`
        .mandala-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 45%, rgba(252,211,77, ${GLOW_OPACITY}) 0%, rgba(252,211,77, ${GLOW_OPACITY * 0.7}) 30%, rgba(252,211,77,0.08) 50%, transparent 75%);
          filter: blur(30px);
          animation: breathe ${GLOW_DURATION}s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(0.94); opacity: 0.7; }
          50% { transform: scale(1.06); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
