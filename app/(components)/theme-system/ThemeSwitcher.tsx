"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { themes } from './themeDefinitions';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-8 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center text-2xl hover:bg-white/30 transition-all"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 1 }}
      >
        🎨
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Choose Your Ambience
                    </h2>
                    <p className="text-gray-600">
                      Select a spiritual atmosphere to enhance your journey
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-xl transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Theme grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.values(themes).map((theme) => {
                    const isActive = currentTheme === theme.id;
                    return (
                      <motion.button
                        key={theme.id}
                        onClick={() => {
                          setTheme(theme.id);
                          setTimeout(() => setIsOpen(false), 500);
                        }}
                        className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all ${
                          isActive
                            ? 'ring-4 ring-amber-500 shadow-xl'
                            : 'hover:shadow-lg'
                        }`}
                        style={{
                          background: theme.background.gradient,
                        }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Theme preview overlay */}
                        <div
                          className="absolute inset-0 opacity-40"
                          style={{
                            background: theme.background.overlay || 'transparent',
                          }}
                        />

                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 15 }}
                          >
                            <span className="text-amber-600">✓</span>
                          </motion.div>
                        )}

                        {/* Content */}
                        <div className="relative z-10">
                          <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: theme.colors.text }}
                          >
                            {theme.name}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {theme.description}
                          </p>
                        </div>

                        {/* Mini particle preview */}
                        <div className="absolute bottom-4 right-4 flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: theme.particles.color }}
                              animate={{
                                y: [-5, 5, -5],
                                opacity: [0.3, 0.8, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer tip */}
                <motion.div
                  className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-amber-800 text-center">
                    💡 Your theme preference will be saved and applied across all visits
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
