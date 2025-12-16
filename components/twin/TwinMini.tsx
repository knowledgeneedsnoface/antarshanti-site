"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SoulTwin, xpToNextLevel } from '@/lib/twin/rules';

interface TwinMiniProps {
  twin: SoulTwin | null;
  onClick?: () => void;
}

// Generate procedural avatar from seed
function generateAvatar(seed: number) {
  const hue = (seed * 137.508) % 360;
  const shapes = Math.floor((seed % 5) + 3);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue}, 70%, 60%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 70%, 40%)`} />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill={`url(#grad-${seed})`} opacity="0.3" />

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

export default function TwinMini({ twin, onClick }: TwinMiniProps) {
  if (!twin) return null;

  const hasRitual = twin.history && twin.history.length > 0;

  const xpNeeded = xpToNextLevel(twin.level);
  const xpProgress = (twin.xp / xpNeeded) * 100;

  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Avatar with level ring */}
      <div className="relative w-16 h-16">
        {/* XP Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="url(#xp-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 30}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - xpProgress / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Avatar Container - Controlled Visuals */}
        <div className={`absolute inset-1 rounded-full overflow-hidden transition-all duration-700 ${hasRitual ? 'opacity-100 scale-100' : 'opacity-60 scale-95 grayscale-[0.5]'
          }`}>
          {generateAvatar(twin.avatarSeed)}

          {/* Sleep Overlay if inactive */}
          {!hasRitual && (
            <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]" />
          )}
        </div>

        {/* Glow/Pulse Effect - Only when active */}
        {hasRitual && (
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-400/20 z-[-1]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Level badge - Hide if asleep? Or show "Zzz"? Keeping badge but maybe distinct style? */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-colors ${hasRitual ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-gray-400 text-white'
          }`}>
          {hasRitual ? twin.level : '1'}
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="text-sm font-bold text-white text-left">{twin.name}</div>
        <div className="text-xs text-white/70 text-left">{twin.path} Path</div>

        {/* Mini attribute bars */}
        <div className="flex gap-1 mt-1">
          {(['calmness', 'discipline'] as const).map((attr) => (
            <div key={attr} className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (twin.attributes[attr] / 50) * 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
