"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const product = { 
    id: "antarshanti-30", 
    name: "AntarShanti 30-Day Ritual Kit", 
    price: 1299 
  };

  function addToCart() {
    add({ id: product.id, name: product.name, price: product.price, qty });
    router.push("/checkout");
  }

  return (
    <section id="product" className="py-32 px-6 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Product showcase */}
        <motion.div
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Product image */}
          <div className="relative h-[400px] overflow-hidden">
            <motion.img
              src="/flatlay.jpg"
              alt="AntarShanti 30-Day Ritual Kit"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Floating badges */}
            <motion.div
              className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-amber-600">✨ Premium Quality</span>
            </motion.div>
          </div>

          {/* Product details */}
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                {product.name}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Everything you need for 30 days of daily rituals. Eco-friendly, screen-free, and designed to ground you in peace.
              </p>
            </motion.div>

            {/* Features grid */}
            <motion.div
              className="grid md:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">7-day peace guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Free delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">COD available</p>
                </div>
              </div>
            </motion.div>

            {/* Price and CTA */}
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-amber-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="text-4xl font-bold text-amber-900">₹{product.price}</div>
                <p className="text-sm text-gray-600 mt-1">Free delivery • COD available • 7-day peace guarantee</p>
              </div>

              <motion.button
                onClick={addToCart}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start My Ritual Journey
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Energy particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </section>
  );
}
