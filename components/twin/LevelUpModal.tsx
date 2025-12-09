"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  attributeGains: {
    calmness: number;
    discipline: number;
    emotionalStrength: number;
    energy: number;
  };
  onClose: () => void;
}

export default function LevelUpModal({ isOpen, newLevel, attributeGains, onClose }: LevelUpModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-3xl shadow-2xl max-w-md w-full p-8 overflow-hidden"
          initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            {/* Level Badge */}
            <motion.div
              className="mx-auto w-32 h-32 mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
            >
              <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">{newLevel}</div>
                  <div className="text-sm font-medium">LEVEL</div>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Level Up!
            </motion.h2>
            
            <motion.p
              className="text-white/90 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your twin has grown stronger through your practice
            </motion.p>

            {/* Attribute Gains */}
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-bold mb-4 text-lg">Attribute Increases</h3>
              <div className="space-y-3">
                {Object.entries(attributeGains).map(([attr, gain], index) => {
                  if (gain === 0) return null;
                  const label = attr.charAt(0).toUpperCase() + attr.slice(1).replace(/([A-Z])/g, ' $1');
                  return (
                    <motion.div
                      key={attr}
                      className="flex justify-between items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <span className="font-medium">{label}</span>
                      <span className="font-bold text-xl">+{gain}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="w-full py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Your Journey
            </motion.button>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-yellow-300/30 to-transparent rounded-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
