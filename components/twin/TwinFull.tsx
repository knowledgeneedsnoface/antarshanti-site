"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoulTwin, xpToNextLevel, RITUALS } from '@/lib/twin/rules';
import { X } from 'lucide-react';

interface TwinFullProps {
  twin: SoulTwin;
  onClose: () => void;
  onSimulateRitual?: (ritualId: string) => void;
}

// Generate procedural avatar
function generateAvatar(seed: number, size: number = 200) {
  const hue = (seed * 137.508) % 360;
  const shapes = Math.floor((seed % 5) + 3);
  
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <linearGradient id={`grad-full-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue}, 70%, 60%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 70%, 40%)`} />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="50" r="48" fill={`url(#grad-full-${seed})`} opacity="0.3" />
      
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

export default function TwinFull({ twin, onClose, onSimulateRitual }: TwinFullProps) {
  const [selectedTab, setSelectedTab] = useState<'stats' | 'history'>('stats');
  const xpNeeded = xpToNextLevel(twin.level);
  const xpProgress = (twin.xp / xpNeeded) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{twin.name}</h2>
                <p className="text-white/90">Path of {twin.path}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Avatar and Level */}
            <div className="flex flex-col items-center mb-8">
              {/* XP Ring */}
              <div className="relative w-48 h-48">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="90"
                    fill="none"
                    stroke="rgba(245,158,11,0.2)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="90"
                    fill="none"
                    stroke="url(#xp-gradient-full)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - xpProgress / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="xp-gradient-full" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-4 rounded-full overflow-hidden bg-white shadow-lg">
                  {generateAvatar(twin.avatarSeed, 176)}
                </div>
                
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                  Level {twin.level}
                </div>
              </div>

              {/* XP Text */}
              <div className="mt-6 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {twin.xp} / {xpNeeded} XP
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round(xpProgress)}% to next level
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('stats')}
                className={`px-6 py-3 font-medium transition-colors ${
                  selectedTab === 'stats'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Attributes
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`px-6 py-3 font-medium transition-colors ${
                  selectedTab === 'history'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                History
              </button>
            </div>

            {/* Content */}
            {selectedTab === 'stats' && (
              <div className="space-y-6">
                {/* Attributes */}
                {Object.entries(twin.attributes).map(([key, value]) => {
                  const maxValue = 100;
                  const percentage = (value / maxValue) * 100;
                  const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');

                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">{label}</span>
                        <span className="font-bold text-amber-600">{value}</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, percentage)}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Simulate Rituals */}
                {onSimulateRitual && (
                  <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
                    <h3 className="font-bold text-lg mb-4 text-gray-900">Test Rituals</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(RITUALS).map(([id, ritual]) => (
                        <button
                          key={id}
                          onClick={() => onSimulateRitual(id)}
                          className="px-4 py-3 bg-white hover:bg-amber-100 border border-amber-300 rounded-xl text-sm font-medium text-gray-900 transition-colors"
                        >
                          {ritual.name}
                          <div className="text-xs text-amber-600 mt-1">+{ritual.xp} XP</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'history' && (
              <div className="space-y-4">
                {twin.history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No rituals completed yet</p>
                    <p className="text-sm mt-2">Complete your first ritual to see history</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...twin.history].reverse().slice(0, 20).map((event, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {event.ritualId ? RITUALS[event.ritualId as keyof typeof RITUALS]?.name : event.type}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(event.date).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-600">+{event.xp} XP</p>
                            <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                              {Object.entries(event.changes).map(([attr, value]) => (
                                value ? <div key={attr}>+{value} {attr}</div> : null
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
