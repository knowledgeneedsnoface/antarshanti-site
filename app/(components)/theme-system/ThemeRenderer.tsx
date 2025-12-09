"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { themes } from './themeDefinitions';
import ParticleSystem from './ParticleSystem';
import ThemeEffects from './ThemeEffects';

export default function ThemeRenderer() {
  const { currentTheme, isClient } = useTheme();
  
  // Don't render on server
  if (!isClient) {
    return null;
  }

  const theme = themes[currentTheme];

  if (!theme) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTheme}
        className="fixed inset-0 -z-10"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      >
        {/* Base gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: theme.background.gradient,
          }}
        />

        {/* Overlay gradient */}
        {theme.background.overlay && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: theme.background.overlay,
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.glow.color}${Math.round(theme.glow.intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: `blur(${theme.glow.blur}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Particle system */}
        <ParticleSystem theme={theme} />

        {/* Special effects */}
        <ThemeEffects theme={theme} />

        {/* Breathing overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
