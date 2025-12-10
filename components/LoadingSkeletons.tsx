"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function TwinSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg w-[200px]">
      {/* Avatar skeleton */}
      <div className="relative w-16 h-16">
        <motion.div
          className="w-full h-full rounded-full bg-white/20"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Stats skeleton */}
      <div className="flex flex-col gap-2 flex-1">
        <motion.div
          className="h-3 bg-white/20 rounded w-24"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
        <motion.div
          className="h-2 bg-white/20 rounded w-16"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <div className="flex gap-1 mt-1">
          <motion.div
            className="flex-1 h-1.5 bg-white/20 rounded-full"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="flex-1 h-1.5 bg-white/20 rounded-full"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Hero skeleton */}
      <div className="space-y-4">
        <motion.div
          className="h-12 bg-gray-200 rounded-xl w-3/4 mx-auto"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-6 bg-gray-200 rounded w-1/2 mx-auto"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
      </div>

      {/* Cards skeleton */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-48 bg-gray-200 rounded-2xl"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
