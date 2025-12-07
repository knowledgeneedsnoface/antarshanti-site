"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ProductReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15, -5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.8, 1]);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsRevealed(true), 1000);
    }
  }, [isInView]);

  return (
    <section
      id="product-reveal"
      ref={containerRef}
      className="py-32 px-6 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden"
    >
      {/* Background incense particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${80 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-light text-amber-900 mb-6"
            animate={{
              textShadow: isRevealed
                ? ["0 0 0 rgba(245, 158, 11, 0)", "0 0 20px rgba(245, 158, 11, 0.3)", "0 0 0 rgba(245, 158, 11, 0)"]
                : "0 0 0 rgba(245, 158, 11, 0)",
            }}
            transition={{ duration: 3, repeat: isRevealed ? Infinity : 0 }}
          >
            AntarShanti
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl font-light text-amber-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            30-Day Ritual Kit
          </motion.p>

          <motion.p
            className="text-xl text-amber-700/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            A handcrafted, eco-friendly puja experience.
          </motion.p>
        </motion.div>

        {/* Product reveal */}
        <div className="relative mb-16">
          {/* Bloom effect background */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-amber-200/30 via-transparent to-transparent rounded-full"
            animate={{
              scale: isRevealed ? [1, 1.5, 1.2] : 1,
              opacity: isRevealed ? [0, 0.5, 0.3] : 0,
            }}
            transition={{ duration: 3, delay: 0.5 }}
          />

          {/* Product image */}
          <motion.div
            ref={productRef}
            className="relative mx-auto max-w-md"
            style={{ scale, rotateY }}
            animate={{
              filter: isRevealed ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{
                boxShadow: isRevealed
                  ? [
                      "0 0 0 0 rgba(245, 158, 11, 0)",
                      "0 0 50px 20px rgba(245, 158, 11, 0.3)",
                      "0 0 20px 10px rgba(245, 158, 11, 0.1)"
                    ]
                  : "0 0 0 0 rgba(245, 158, 11, 0)",
              }}
              transition={{ duration: 4, delay: 1 }}
            >
              <motion.img
                src="/packet.jpg"
                alt="AntarShanti Ritual Kit"
                className="w-full h-auto rounded-2xl shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />

              {/* Golden rim light */}
              <motion.div
                className="absolute inset-0 rounded-2xl ring-4 ring-amber-400/50"
                animate={{
                  boxShadow: isRevealed
                    ? "inset 0 0 20px rgba(245, 158, 11, 0.3)"
                    : "inset 0 0 0 rgba(245, 158, 11, 0)",
                }}
                transition={{ duration: 2, delay: 2 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Price and CTA */}
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div
            className="text-5xl font-bold text-amber-900 mb-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ₹1299
          </motion.div>

          <motion.button
            className="w-full px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 mb-4"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById("whats-inside")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Start My Ritual Journey
          </motion.button>

          <motion.p
            className="text-sm text-amber-600"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Free delivery • COD available • 7-day peace guarantee
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
