"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    icon: "🧘‍♀️",
    title: "Reduce Anxiety",
    description: "10-minute nervous system reset",
  },
  {
    icon: "🎯",
    title: "Daily Focus",
    description: "Clear your mind daily",
  },
  {
    icon: "📱",
    title: "Screen-Free",
    description: "Offline moment of care",
  },
];

export default function HealingPromise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            The Healing Promise
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Each ritual brings you back to yourself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.6,
                ease: [0.19, 1, 0.22, 1]
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-amber-100/50 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100/0 to-orange-100/0 group-hover:from-amber-100/50 group-hover:to-orange-100/30 transition-all duration-500 -z-10" />
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl mb-6"
                >
                  {benefit.icon}
                </motion.div>

                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-6"
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="md:hidden text-center mt-8 text-sm text-gray-500"
        >
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ← Scroll horizontally →
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
