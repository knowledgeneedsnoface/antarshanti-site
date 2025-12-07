"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    id: "envelopes",
    name: "30 Ritual Envelopes",
    description: "Handcrafted paper envelopes, each containing a unique puja sequence.",
    emoji: "✨",
    color: "from-amber-100 to-orange-100",
    position: { top: "20%", left: "10%" },
  },
  {
    id: "diya",
    name: "Brass Diya",
    description: "Traditional oil lamp for creating sacred space and intention.",
    emoji: "🪔",
    color: "from-yellow-100 to-amber-100",
    position: { top: "35%", left: "25%" },
  },
  {
    id: "incense",
    name: "Handmade Incense",
    description: "Pure, natural incense sticks for grounding and presence.",
    emoji: "🌿",
    color: "from-green-100 to-emerald-100",
    position: { top: "50%", left: "15%" },
  },
  {
    id: "thread",
    name: "Sacred Thread",
    description: "Red sacred thread for traditional rituals and intention-setting.",
    emoji: "🧵",
    color: "from-red-100 to-pink-100",
    position: { top: "30%", left: "60%" },
  },
  {
    id: "card",
    name: "Daily Intention Card",
    description: "Beautiful card with affirmations and space for personal intentions.",
    emoji: "💌",
    color: "from-purple-100 to-indigo-100",
    position: { top: "45%", left: "70%" },
  },
  {
    id: "stand",
    name: "Wooden Deity Stand",
    description: "Small wooden platform for placing photos or sacred objects.",
    emoji: "🪵",
    color: "from-amber-100 to-brown-100",
    position: { top: "60%", left: "50%" },
  },
];

export default function WhatsInside() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      id="whats-inside"
      className="py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-amber-900 mb-6">
            What's Inside Your Kit
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto leading-relaxed">
            Every element is carefully chosen to support your journey toward inner peace.
          </p>
        </motion.div>

        {/* Flatlay container */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Main kit image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <img
              src="/flatlay.jpg"
              alt="AntarShanti Ritual Kit Contents"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />

            {/* Overlay glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent rounded-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Interactive items */}
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              style={item.position}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setHoveredItem(hoveredItem === item.id ? null : item.id)}
            >
              {/* Item emoji */}
              <motion.div
                className="text-3xl md:text-4xl mb-2"
                animate={{
                  scale: hoveredItem === item.id ? 1.2 : 1,
                  rotate: hoveredItem === item.id ? [0, -5, 5, 0] : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.emoji}
              </motion.div>

              {/* Hover card */}
              <motion.div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-amber-100 p-4 min-w-[200px] z-10 ${
                  hoveredItem === item.id ? "block" : "hidden"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: hoveredItem === item.id ? 1 : 0,
                  y: hoveredItem === item.id ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>

                {/* Energy particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl text-amber-800 mb-8 font-light">
            Ready to receive your sacred tools?
          </p>
          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("voices-of-peace")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Experience the Ritual →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
