"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function SacredHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringCandle, setIsHoveringCandle] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  // Mouse Physics for Flame Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the flame movement
  const springConfig = { damping: 25, stiffness: 150 };
  const flameRotate = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const flameX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Cursor Glow
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]); // Parallax text
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out on scroll
  const flameScale = useTransform(scrollY, [0, 300], [1, 0.8]); // Flame shrinks slightly on scroll

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (typeof window === "undefined") return;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates -0.5 to 0.5
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

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
        {/* The Living Flame */}
        <motion.div
          className="relative mb-14 cursor-pointer group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            scale: flameScale,
            rotate: flameRotate,
            x: flameX,
            transformOrigin: "bottom center"
          }}
          onMouseEnter={() => setIsHoveringCandle(true)}
          onMouseLeave={() => setIsHoveringCandle(false)}
        >
          {/* Flame Glow - "Breathing" */}
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-orange-400/20 rounded-full blur-[80px]"
            animate={{
              scale: isHoveringCandle ? 1.4 : [1, 1.15, 1],
              opacity: isHoveringCandle ? 0.7 : [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4, // Slow breathing
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Minimal Candle SVG */}
          <div className="relative drop-shadow-[0_0_30px_rgba(255,160,50,0.4)]">
            <svg width="100" height="280" viewBox="0 0 100 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Flame - The Soul */}
              <motion.path
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  d: isHoveringCandle
                    ? "M50 0 C50 0 25 40 25 55 C25 70 36.1929 80 50 80 C63.8071 80 75 70 75 55 C75 40 50 0 50 0 Z"
                    : [
                      "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z", // Normal
                      "M52 2 C52 2 30 42 30 56 C30 70 40 78 52 78 C64 78 74 70 74 56 C74 42 52 2 52 2 Z", // Sway right
                      "M48 8 C48 8 26 48 26 60 C26 74 36 82 48 82 C60 82 70 74 70 60 C70 48 48 8 48 8 Z", // Sway left
                      "M50 5 C50 5 28 45 28 58 C28 72 38 80 50 80 C62 80 72 72 72 58 C72 45 50 5 50 5 Z"  // Return
                    ]
                }}
                transition={{
                  opacity: { delay: 1.5, duration: 1.5 }, // "Inhales" to full brightness
                  scale: { delay: 1.5, duration: 1.5 },
                  d: { duration: 6, repeat: Infinity, ease: "linear" } // Organic movement
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
                  <stop offset="0" stopColor="#FFFBF2" />
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
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} // Synced with flame
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
