"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickPayoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Positioned above AmbientSoundToggle */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-6 bottom-28 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xl">⚡</span>
        <span>Quick Payout</span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 blur-lg opacity-50 -z-10 animate-pulse" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    <h2 className="text-2xl font-bold">Quick Payout</h2>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/80 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-700 text-lg mb-6">
                  Get instant payouts directly to your account. Fast, secure, and hassle-free.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold text-gray-900">Instant Transfer</p>
                      <p className="text-sm text-gray-600">Money in your account within minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <span className="text-2xl">🔒</span>
                    <div>
                      <p className="font-semibold text-gray-900">Secure & Safe</p>
                      <p className="text-sm text-gray-600">Bank-grade encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-semibold text-gray-900">Easy Process</p>
                      <p className="text-sm text-gray-600">Just a few clicks away</p>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
                  onClick={() => alert("Payout feature coming soon!")}
                >
                  Request Payout Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
