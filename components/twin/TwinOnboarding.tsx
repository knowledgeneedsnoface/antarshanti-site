"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpiritualPath } from '@/lib/twin/rules';

interface TwinOnboardingProps {
  onComplete: (name: string, path: SpiritualPath, avatarSeed: number) => void;
  onSkip?: () => void;
}

const PATHS: { id: SpiritualPath; name: string; description: string; icon: string }[] = [
  {
    id: 'Peace',
    name: 'Path of Peace',
    description: 'Amplifies calmness and emotional balance. For those seeking inner tranquility.',
    icon: '🕊️',
  },
  {
    id: 'Strength',
    name: 'Path of Strength',
    description: 'Enhances discipline and emotional resilience. For warriors of the spirit.',
    icon: '💪',
  },
  {
    id: 'Devotion',
    name: 'Path of Devotion',
    description: 'Boosts discipline and energy. For dedicated practitioners.',
    icon: '🙏',
  },
  {
    id: 'Light',
    name: 'Path of Light',
    description: 'Increases calmness and energy. For seekers of illumination.',
    icon: '✨',
  },
];

export default function TwinOnboarding({ onComplete, onSkip }: TwinOnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedPath, setSelectedPath] = useState<SpiritualPath>('Peace');
  const [avatarSeed, setAvatarSeed] = useState(Math.floor(Math.random() * 10000));

  const handleComplete = () => {
    if (name.trim()) {
      onComplete(name.trim(), selectedPath, avatarSeed);
    }
  };

  // Generate preview avatar
  function generateAvatar(seed: number) {
    const hue = (seed * 137.508) % 360;
    const shapes = Math.floor((seed % 5) + 3);

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-onboard-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue}, 70%, 60%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 70%, 40%)`} />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill={`url(#grad-onboard-${seed})`} opacity="0.3" />

        {Array.from({ length: shapes }).map((_, i) => {
          const angle = (360 / shapes) * i;
          const x = 50 + 25 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 25 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="8"
              fill={`hsl(${(hue + i * 30) % 360}, 80%, 60%)`}
            />
          );
        })}

        <circle cx="50" cy="50" r="12" fill={`hsl(${hue}, 90%, 70%)`} />
      </svg>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-br from-amber-900/90 via-orange-900/90 to-amber-950/90 backdrop-blur-sm">
      <motion.div
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Soul Twin</h2>
          <p className="text-gray-600">Your spiritual companion on the journey to inner peace</p>

          {/* Progress */}
          <div className="flex gap-2 justify-center mt-6">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full ${s <= step ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">What shall we call your twin?</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-amber-500 focus:outline-none"
                autoFocus
                maxLength={30}
              />
              <p className="text-sm text-gray-500 mt-2">Choose a meaningful name for your spiritual companion</p>
            </motion.div>
          )}

          {/* Step 2: Path */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Choose your spiritual path</h3>
              <p className="text-sm text-gray-600 mb-6">Click on a path to select it, then click Continue</p>
              <div className="grid grid-cols-2 gap-4">
                {PATHS.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedPath === path.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                      }`}
                  >
                    <div className="text-4xl mb-3">{path.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{path.name}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{path.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Avatar */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900">Choose your twin's appearance</h3>

              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl bg-white">
                {generateAvatar(avatarSeed)}
              </div>

              <button
                onClick={() => setAvatarSeed(Math.floor(Math.random() * 10000))}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-medium text-gray-900 transition-colors"
              >
                🎲 Generate New Look
              </button>

              <div className="mt-8 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <p className="text-amber-800 font-serif italic text-lg leading-relaxed">
                  "I grow when you perform real-world rituals.<br />
                  Without them, I stay asleep."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <div>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Back
              </button>
            )}
            {onSkip && step === 1 && (
              <button
                onClick={onSkip}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium"
              >
                Skip for now
              </button>
            )}
          </div>

          <div>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !name.trim()}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                Create Twin ✨
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
