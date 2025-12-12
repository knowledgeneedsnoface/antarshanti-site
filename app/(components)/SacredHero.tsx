"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function SacredHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCandle, setIsHoveringCandle] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 50;
    const y = (clientY - innerHeight / 2) / 50;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#0a0502] text-white flex flex-col items-center justify-center"
    >
      {/* Ambient Background - Warm Void */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 40%, #451a03 0%, #1c0a03 40%, #000000 100%)"
        }}
      />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl"
      >
        {/* The Candle - Central Visual Anchor */}
        <motion.div
          className="relative mb-12 cursor-pointer group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onMouseEnter={() => setIsHoveringCandle(true)}
          onMouseLeave={() => setIsHoveringCandle(false)}
          whileHover={{ scale: 1.05 }}
        >
          {/* Flame Glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-[60px]"
            animate={{
              scale: isHoveringCandle ? 1.5 : [1, 1.2, 1],
              opacity: isHoveringCandle ? 0.6 : [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Candle Body SVG */}
          <svg width="120" height="200" viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            {/* Candle Base */}
            <path d="M20 60 H100 V180 C100 191.046 91.0457 200 80 200 H40 C28.9543 200 20 191.046 20 180 V60 Z" fill="#E8DBC6" />
            <path d="M20 60 C20 54.4772 37.9086 50 60 50 C82.0914 50 100 54.4772 100 60 C100 65.5228 82.0914 70 60 70 C37.9086 70 20 65.5228 20 60 Z" fill="#F5EFE6" />

            {/* Wick */}
            <line x1="60" y1="50" x2="60" y2="35" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

            {/* Flame */}
            <motion.path
              d="M60 10 C60 10 45 35 45 45 C45 53.2843 51.7157 60 60 60 C68.2843 60 75 53.2843 75 45 C75 35 60 10 60 10 Z"
              fill="url(#flameGradient)"
              animate={{
                d: isHoveringCandle
                  ? "M60 5 C60 5 42 35 42 45 C42 55 50 63 60 63 C70 63 78 55 78 45 C78 35 60 5 60 5 Z"
                  : [
                    "M60 10 C60 10 45 35 45 45 C45 53.2843 51.7157 60 60 60 C68.2843 60 75 53.2843 75 45 C75 35 60 10 60 10 Z",
                    "M62 8 C62 8 48 34 48 44 C48 52.2843 54.7157 59 63 59 C71.2843 59 78 52.2843 78 44 C78 34 62 8 62 8 Z",
                    "M58 12 C58 12 42 36 42 46 C42 54.2843 48.7157 61 57 61 C65.2843 61 72 54.2843 72 46 C72 36 58 12 58 12 Z",
                    "M60 10 C60 10 45 35 45 45 C45 53.2843 51.7157 60 60 60 C68.2843 60 75 53.2843 75 45 C75 35 60 10 60 10 Z"
                  ],
                filter: isHoveringCandle ? "drop-shadow(0 0 15px #FF9500)" : "drop-shadow(0 0 5px #FF9500)"
              }}
              transition={{
                duration: isHoveringCandle ? 0.3 : 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                originX: 0.5,
                originY: 1,
              }}
            />

            <defs>
              <linearGradient id="flameGradient" x1="60" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#FFF7E6" />
                <stop offset="0.4" stopColor="#FFCC00" />
                <stop offset="1" stopColor="#FF6600" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-6 drop-shadow-sm"
          >
            10 Minutes to Meet Yourself.
          </motion.h1>
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-2xl text-amber-100/60 font-light max-w-2xl leading-relaxed mb-10"
        >
          A daily ritual box. A 30-day inner reset. <br className="hidden md:block" />
          <span className="text-amber-100">No screens, just peace.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.a
            href="#product"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full text-white font-medium text-lg shadow-[0_4px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_40px_rgba(245,158,11,0.5)] transition-shadow duration-300"
          >
            Start Your Ritual
          </motion.a>

          <motion.a
            href="#immersive-guide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-white/50 hover:text-white transition-colors duration-300 font-light tracking-wide text-lg"
          >
            See the Box
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-3 opacity-40 z-20"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Begin</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
        />
      </motion.div>
    </section>
  );
}
