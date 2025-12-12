"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail } from "lucide-react";

export default function AboutFounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="founder" ref={ref} className="py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="founder-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#founder-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            About the Founder
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Founder photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="bg-gradient-to-br from-amber-100 to-orange-100 p-12 flex items-center justify-center relative"
              >
                {/* Glowing circle background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-64 h-64 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full blur-3xl"
                />

                {/* Avatar placeholder */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-48 h-48 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 shadow-2xl flex items-center justify-center text-7xl border-4 border-white"
                >
                  👤
                  
                  {/* Glow effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/50 to-orange-400/50 blur-xl"
                    style={{ zIndex: -1 }}
                  />
                </motion.div>
              </motion.div>

              {/* Right: Founder info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-light text-gray-900 mb-2">
                    Siddharth Chouhan
                  </h3>
                  <p className="text-amber-600 font-medium mb-6">
                    Founder, AntarShanti
                  </p>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-light">
                      Bringing peaceful digital experiences to life.
                    </p>
                    
                    <p className="font-light">
                      Making mind-body wellness accessible through modern spiritual tools that honor ancient traditions.
                    </p>
                  </div>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-l-4 border-amber-400"
                  >
                    <p className="text-gray-700 italic leading-relaxed">
                      "In our hyperconnected world, we've lost touch with the sacred. AntarShanti is my attempt to bridge that gap—to create digital experiences that restore your energy."
                    </p>
                  </motion.div>

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="mt-8 flex gap-4"
                  >
                    <motion.a
                      href="https://linkedin.com/in/siddharthchouhan"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300"
                    >
                      <Linkedin className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                    </motion.a>

                    <motion.a
                      href="mailto:siddharth@antarshanti.com"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-all border border-amber-200 hover:border-amber-300"
                    >
                      <Mail className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
