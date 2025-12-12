"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function SacredHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringCandle, setIsHoveringCandle] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Mouse Physics for Flame Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the flame movement
  const springConfig = { damping: 25, stiffness: 150 };
  const flameRotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig); // Storyboard: +/- 6deg
  const flameX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig); // Storyboard: +/- 6px translation

  // Cursor Glow
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Storyboard: Scroll Transition Out - Scale 1 -> 0.7, Move down 40px
  const flameScaleScroll = useTransform(scrollY, [0, 300], [1, 0.7]);
  const flameYScroll = useTransform(scrollY, [0, 300], [0, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates -0.5 to 0.5
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  // Sparkle trigger on hover
  useEffect(() => {
    if (isHoveringCandle) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isHoveringCandle]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[850px] overflow-hidden bg-[#0F0805] text-white flex flex-col items-center justify-center"
    >
      {/* 1. Full-screen soft gradient background (peach → gold) */}
      <div
        className="absolute inset-0 z-0 opacity-40 transition-opacity duration-[2000ms]"
        style={{
          background: "radial-gradient(circle at 50% 60%, #FFD6A5 0%, #C27835 30%, #451a03 60%, #0F0805 100%)"
        }}
      />

      {/* Cursor Glow Effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-amber-400/5 pointer-events-none blur-[100px] z-10"
        style={{
          left: "50%",
          top: "50%",
          x: useTransform(cursorX, (v) => v * (typeof window !== "undefined" ? window.innerWidth : 1000) - 300),
          y: useTransform(cursorY, (v) => v * (typeof window !== "undefined" ? window.innerHeight : 1000) - 300)
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
      >
        {/* The Living Flame - SCENE 1 & 2 */}
        <motion.div
          className="relative mb-14 cursor-pointer group"
          style={{
            scale: flameScaleScroll,
            y: flameYScroll,
            rotate: flameRotate,
            x: flameX,
            transformOrigin: "bottom center"
          }}
          onMouseEnter={() => setIsHoveringCandle(true)}
          onMouseLeave={() => setIsHoveringCandle(false)}
        >
          {/* Hover Ring Pulse (Storyboard: 16px -> 40px, fade to 0%) */}
          <AnimatePresence>
            {isHoveringCandle && (
              <motion.div
                initial={{ width: 80, height: 80, opacity: 0.6, borderColor: "rgba(255, 215, 0, 0.8)" }}
                animate={{
                  width: 140,
                  height: 140,
                  opacity: 0,
                  borderColor: "rgba(255, 215, 0, 0)"
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300 blur-sm pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Sparkle Particle (from Storyboard) */}
          <AnimatePresence>
            {showSparkle && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -40 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full blur-[1px] shadow-[0_0_10px_#fff]"
              />
            )}
          </AnimatePresence>

          {/* Flame Glow - Breathing Loop (Scene 2) */}
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] bg-orange-400/30"
            initial={{ width: 140, height: 180, opacity: 0.4 }}
            animate={{
              width: isHoveringCandle ? 180 : [140, 160, 140], // Glow radius 8px movement approximated
              height: isHoveringCandle ? 220 : [180, 200, 180],
              opacity: isHoveringCandle ? 0.6 : [0.4, 0.52, 0.4], // Brightness +12%
            }}
            transition={{
              duration: 1.2, // Storyboard loop length 1.2s
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Minimal Candle SVG */}
          <div className="relative">
            <svg width="100" height="280" viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Flame - The Soul */}
              <motion.path
                // Scene 1: Soft Emergence
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{
                  opacity: 0.85,
                  scale: isHoveringCandle ? 1.12 : [1, 1.06, 1], // Scene 2: 1->1.06, Hover 1.12
                  y: 0,
                  rotate: isHoveringCandle ? 0 : [-2, 2, -2], // Scene 2: +/- 2deg sway
                  d: [
                    "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z",
                    "M51 3 C51 3 29 44 29 57 C29 71 39 80 51 80 C63 80 73 71 73 57 C73 44 51 3 51 3 Z", // Subtle organic shift
                    "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z"
                  ]
                }}
                transition={{
                  opacity: { duration: 0.4, ease: "easeOut" }, // Scene 1: 0.4s
                  y: { duration: 0.4, ease: "easeOut" },
                  scale: {
                    delay: 0.4, // Wait for emergence
                    duration: 1.2, // Loop 1.2s
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    delay: 0.4,
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  d: {
                    duration: 2, // Slower organic morph independent of breath
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                fill="url(#livingFlameGradient)"
                style={{ originX: 0.5, originY: 1 }}
              />

              {/* Wick */}
              <path d="M50 80 V95" stroke="#3d2817" strokeWidth="3" strokeLinecap="round" />

              {/* Minimal Base */}
              <path d="M20 100 H80 V260 C80 271.046 71.0457 280 60 280 H40 C28.9543 280 20 271.046 20 260 V100 Z" fill="url(#candleBodyGradient)" />
              <path d="M20 100 C20 94.4772 33.4315 90 50 90 C66.5685 90 80 94.4772 80 100 C80 105.523 66.5685 110 50 110 C33.4315 110 20 105.523 20 100 Z" fill="#FDF3E6" />

              <defs>
                <linearGradient id="livingFlameGradient" x1="50" y1="0" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#FFF7E6" />
                  <stop offset="0.3" stopColor="#FFD858" />
                  <stop offset="0.8" stopColor="#FF9500" />
                  <stop offset="1" stopColor="#FF5C00" opacity="0.8" />
                </linearGradient>
                <linearGradient id="candleBodyGradient" x1="50" y1="90" x2="50" y2="280" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#F9F1E6" />
                  <stop offset="1" stopColor="#EAD8C0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Headline - "Return to Yourself" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-50 to-amber-100/70 mb-8 drop-shadow-sm"
        >
          Return to Yourself.<br />
          <span className="text-4xl md:text-6xl lg:text-7xl opacity-80">In Just 10 Minutes.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-amber-100/70 font-light max-w-2xl leading-relaxed mb-12"
        >
          Your daily ritual of calm, clarity, and emotional grounding — <span className="text-amber-50">beautifully simplified.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          {/* Primary CTA - Pulse Syncs with Flame */}
          <motion.a
            href="#product"
            onMouseEnter={() => setIsHoveringCTA(true)}
            onMouseLeave={() => setIsHoveringCTA(false)}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-[#F59E0B] rounded-full text-white font-medium text-lg tracking-wide overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[#FFB02E]"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} // Synced with flame loop 1.2s
            />
            <span className="relative z-10 flex items-center gap-2">
              Begin the Ritual
              <motion.span animate={{ x: isHoveringCTA ? 5 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
            </span>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: isHoveringCTA ? "0 0 25px rgba(255,180,100,0.6)" : "0 0 0px rgba(255,180,100,0)" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Secondary CTA - Ghost */}
          <motion.a
            href="#immersive-ritual"
            whileHover={{ scale: 1.05, color: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-white/50 hover:text-white transition-all duration-300 font-light tracking-wide text-lg"
          >
            See How It Works
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - "Flame elongates" transition hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-4 opacity-40"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-100">Exhale</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-amber-200/0 via-amber-200 to-amber-200/0"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
