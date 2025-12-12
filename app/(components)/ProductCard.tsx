"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Shield, Truck, CreditCard } from "lucide-react";
import { useCart } from "../(components)/CartContext";
import { useRouter } from "next/navigation";

const trustBadges = [
  { icon: Shield, text: "7-day peace guarantee" },
  { icon: Truck, text: "Free delivery" },
  { icon: CreditCard, text: "COD available" },
];

export default function ProductCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { add } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    add({
      id: "ritual-kit-30",
      name: "AntarShanti 30-Day Ritual Kit",
      price: 1299,
      qty: 1,
    });
    router.push("/checkout");
  };

  return (
    <section id="product" ref={ref} className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative h-[400px] lg:h-auto"
              >
                <Image
                  src="/flatlay.jpg"
                  alt="AntarShanti 30-Day Ritual Kit"
                  fill
                  className="object-cover"
                />

                {/* Floating sparkles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full"
                    style={{
                      top: `${15 + i * 10}%`,
                      left: `${10 + i * 8}%`,
                    }}
                    animate={{
                      y: [-5, -20, -5],
                      opacity: [0.4, 1, 0.4],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Premium badge */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 left-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl px-4 py-2 shadow-lg"
                >
                  <p className="text-xs font-semibold flex items-center gap-1">
                    <span>✨</span> Premium Quality
                  </p>
                </motion.div>

                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
              </motion.div>

              {/* Product Details */}
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-light text-gray-900 mb-3"
                  >
                    AntarShanti 30-Day Ritual Kit
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-gray-600 mb-6 font-light leading-relaxed"
                  >
                    Everything you need for 30 days of daily rituals. Eco-friendly, screen-free, and designed to ground you in peace.
                  </motion.p>

                  {/* Trust badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-wrap gap-3 mb-8"
                  >
                    {trustBadges.map((badge, index) => {
                      const Icon = badge.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 bg-amber-50 rounded-full px-4 py-2 border border-amber-200"
                        >
                          <Icon className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-700">{badge.text}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Price */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mb-8"
                  >
                    <motion.p
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-5xl font-light text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text mb-2"
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      ₹1299
                    </motion.p>
                    <p className="text-sm text-gray-500">
                      Free delivery • COD available • 7-day peace guarantee
                    </p>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleAddToCart}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group w-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300" />
                  <div className="relative w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full py-5 px-8 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300">
                    <span className="flex items-center justify-center gap-2">
                      Start My Ritual Journey
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>
                </motion.button>

                {/* Reassurance text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-xs text-center text-gray-500 mt-4 italic"
                >
                  Join thousands finding their daily peace
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1 }}
          className="max-w-3xl mx-auto mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
        >
          {["🛡️ 7-Day Peace Guarantee", "🚚 Free Delivery", "💳 COD Available"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
