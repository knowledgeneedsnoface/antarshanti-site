"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const benefits = [
  {
    id: "anxiety",
    title: "Reduce Anxiety",
    description: "A 10-minute ritual to reset your nervous system.",
    visual: "🧘‍♀️",
    color: "from-emerald-100 to-green-100",
    glowColor: "shadow-emerald-200",
    image: "/benefit1.jpg"
  },
  {
    id: "focus",
    title: "Daily Focus",
    description: "Clear your mind before the day begins.",
    visual: "🎯",
    color: "from-amber-100 to-orange-100",
    glowColor: "shadow-amber-200",
    image: "/benefit2.jpg"
  },
  {
    id: "pause",
    title: "Screen-Free Pause",
    description: "An offline moment of care.",
    visual: "📱",
    color: "from-indigo-100 to-purple-100",
    glowColor: "shadow-indigo-200",
    image: "/benefit3.jpg"
  }
];

export default function HealingPromise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-6 bg-gradient-to-b from-white to-amber-50/20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-amber-900 mb-6">
            The Healing Promise
          </h2>
          <p className="text-xl text-amber-700/80 max-w-2xl mx-auto leading-relaxed">
            Each ritual is designed to bring you back to yourself, one breath at a time.
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <motion.div
            className="flex gap-8 px-4 pb-8"
            style={{ width: "max-content" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className={`relative min-w-[320px] md:min-w-[400px] bg-gradient-to-br ${benefit.color} rounded-3xl p-8 shadow-xl ${benefit.glowColor} transition-all duration-500 cursor-pointer`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 * index,
                  
                }}
                
                whileHover={{
                  scale: 1.05,
                  rotateY: hoveredCard === benefit.id ? 5 : 0,
                  rotateX: hoveredCard === benefit.id ? -2 : 0,
                }}
                onHoverStart={() => setHoveredCard(benefit.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => {
                  document.getElementById("ritual-journey")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                viewport={{ once: true }}
              >
                {/* Energy field glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
                  animate={{
                    opacity: hoveredCard === benefit.id ? [0.3, 0.6, 0.3] : 0.1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === benefit.id ? Infinity : 0,
                  }}
                />

                {/* Visual */}
                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    scale: hoveredCard === benefit.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredCard === benefit.id ? Infinity : 0,
                  }}
                >
                  {benefit.visual}
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-2xl font-semibold text-gray-900 mb-4"
                  animate={{
                    color: hoveredCard === benefit.id ? "#059669" : "#111827",
                  }}
                >
                  {benefit.title}
                </motion.h3>

                <motion.p
                  className="text-gray-700 leading-relaxed text-lg"
                  animate={{
                    color: hoveredCard === benefit.id ? "#047857" : "#374151",
                  }}
                >
                  {benefit.description}
                </motion.p>

                {/* Energy particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: hoveredCard === benefit.id ? [0, 1, 0] : 0,
                      opacity: hoveredCard === benefit.id ? [0, 1, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: hoveredCard === benefit.id ? Infinity : 0,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="text-center mt-8 text-amber-600"
          animate={{
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ← Scroll horizontally to explore →
        </motion.div>
      </div>
    </section>
  );
}
