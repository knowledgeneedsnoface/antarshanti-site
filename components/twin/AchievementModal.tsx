"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/twin/achievements';

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl shadow-2xl max-w-md w-full p-8 overflow-hidden"
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Sparkle particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, -100],
                opacity: [1, 1, 0],
                scale: [1, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            {/* Achievement Icon */}
            <motion.div
              className="text-8xl mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 10 }}
            >
              {achievement.icon}
            </motion.div>

            {/* Achievement Unlocked Text */}
            <motion.div
              className="mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm font-medium text-white/90 mb-1">ACHIEVEMENT UNLOCKED!</p>
              <h2 className="text-3xl font-bold drop-shadow-lg">{achievement.name}</h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-white/90 text-lg mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {achievement.description}
            </motion.p>

            {/* Rewards */}
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-bold mb-3 text-sm">REWARDS</h3>
              <div className="space-y-2">
                {achievement.reward.xp && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span className="font-bold text-lg">+{achievement.reward.xp} XP</span>
                  </div>
                )}
                {achievement.reward.attributes && Object.entries(achievement.reward.attributes).map(([attr, value]) => (
                  value && (
                    <div key={attr} className="flex items-center justify-center gap-2 text-sm">
                      <span>+{value} {attr.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  )
                ))}
              </div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="w-full py-3 bg-white text-amber-600 font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Awesome!
            </motion.button>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-yellow-300/40 to-transparent rounded-3xl"
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
