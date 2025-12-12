"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const items = [
  {
    icon: "✨",
    title: "30 Ritual Envelopes",
    description: "Handcrafted paper envelopes, each containing a unique puja sequence.",
  },
  {
    icon: "🪔",
    title: "Brass Diya",
    description: "Traditional oil lamp for creating sacred space and intention.",
  },
  {
    icon: "🌿",
    title: "Handmade Incense",
    description: "Pure, natural incense sticks for grounding and presence.",
  },
  {
    icon: "🧵",
    title: "Sacred Thread",
    description: "Red sacred thread for traditional rituals and intention-setting.",
  },
  {
    icon: "💌",
    title: "Daily Intention Card",
    description: "Beautiful card with affirmations and space for personal intentions.",
  },
  {
    icon: "🪵",
    title: "Wooden Deity Stand",
    description: "Small wooden platform for placing photos or sacred objects.",
  },
];

export default function WhatsInside() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            What's Inside Your Kit
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Every element supports your journey to peace.
          </p>
        </motion.div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left: Parallax image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="sticky top-24"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/flatlay.jpg"
                alt="AntarShanti Ritual Kit Contents"
                fill
                className="object-cover"
              />
              
              {/* Glow overlay */}
              <motion.div
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-amber-200"
            >
              <div className="text-sm font-medium text-amber-600">✨ Premium Quality</div>
            </motion.div>
          </motion.div>

          {/* Right: Item list */}
          <div className="space-y-6">
            {items.map((item, index) => {
              const itemRef = useRef(null);
              const itemInView = useInView(itemRef, { once: true, margin: "-50px" });

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, x: 50 }}
                  animate={itemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-100/50 hover:border-amber-200">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                        className="text-5xl flex-shrink-0"
                      >
                        {item.icon}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-4"
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden space-y-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/flatlay.jpg"
              alt="AntarShanti Ritual Kit Contents"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent" />
          </motion.div>

          {/* Items */}
          <div className="space-y-4">
            {items.map((item, index) => {
              const itemRef = useRef(null);
              const itemInView = useInView(itemRef, { once: true, margin: "-30px" });

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100/50">
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                        className="text-4xl"
                      >
                        {item.icon}
                      </motion.div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 font-light">
            Ready to receive your sacred tools?
          </p>
          <motion.a
            href="#product"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-white font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            Experience the Ritual →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
