"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const journeySteps = [
  {
    day: "Day 1",
    title: "You open your first ritual envelope.",
    description: "The paper is soft, the scent of sandalwood rises. You sit, breathe, and begin.",
    visual: "✉️",
    affirmation: "I am worthy of this peace."
  },
  {
    day: "Day 5",
    title: "You start feeling calmer.",
    description: "The morning rush feels different. Your mind is clearer, your heart more open.",
    visual: "🌅",
    affirmation: "Peace flows through me naturally."
  },
  {
    day: "Day 12",
    title: "Your mind begins anticipating peace.",
    description: "The ritual becomes a gentle friend. Your body knows what comes next.",
    visual: "🧠",
    affirmation: "I choose peace in every moment."
  },
  {
    day: "Day 20",
    title: "You look forward to the ritual.",
    description: "What began as discipline has become desire. Peace calls to you.",
    visual: "💫",
    affirmation: "Peace is my natural state."
  },
  {
    day: "Day 30",
    title: "You complete the cycle of inner reset.",
    description: "A new rhythm has been established. You carry peace within you always.",
    visual: "🕉",
    affirmation: "I am peace embodied."
  }
];

export default function RitualJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="ritual-journey"
      ref={containerRef}
      className="py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="60" height="60" className="absolute inset-0">
          <defs>
            <pattern id="mandala-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#D97706" strokeWidth="0.5" opacity="0.3" />
              <circle cx="30" cy="30" r="15" fill="none" stroke="#D97706" strokeWidth="0.5" opacity="0.4" />
              <circle cx="30" cy="30" r="5" fill="none" stroke="#D97706" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-amber-900 mb-6">
            Your 30-Day Ritual Journey
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto leading-relaxed">
            What begins as a simple daily practice transforms into a profound relationship with peace.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central path line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-200 to-amber-400 h-full" />

          {/* Animated path reveal */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 to-amber-600"
            style={{
              height: "100%",
              scaleY: pathLength,
              transformOrigin: "top",
            }}
          />

          {/* Journey steps */}
          <div className="space-y-24">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.day}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <motion.div
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="text-4xl"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {step.visual}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-semibold text-amber-900">{step.day}</h3>
                        <p className="text-sm text-amber-600 italic">{step.affirmation}</p>
                      </div>
                    </div>

                    <h4 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>

                {/* Timeline node */}
                <div className="w-1/12 flex justify-center relative">
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(245, 158, 11, 0.7)",
                        "0 0 0 10px rgba(245, 158, 11, 0)",
                        "0 0 0 0 rgba(245, 158, 11, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl text-amber-800 mb-8 font-light">
            Ready to begin your journey?
          </p>
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("product-reveal")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Start My Ritual Journey →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
