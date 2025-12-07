"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  id: string;
  type: "intro" | "benefit" | "product" | "checkout";
  position: [number, number, number];
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  color: string;
  image?: string;
}

interface ModalOverlayProps {
  node: NodeData;
  onClose: () => void;
  onAddToCart: () => void;
  visitedNodes: Set<string>;
}

export default function ModalOverlay({
  node,
  onClose,
  onAddToCart,
  visitedNodes
}: ModalOverlayProps) {
  const getModalContent = () => {
    switch (node.type) {
      case "intro":
        return {
          bgGradient: "from-amber-50 to-orange-50",
          accentColor: "amber",
          showCta: false
        };
      case "benefit":
        return {
          bgGradient: "from-emerald-50 to-green-50",
          accentColor: "emerald",
          showCta: false
        };
      case "product":
        return {
          bgGradient: "from-amber-50 to-yellow-50",
          accentColor: "amber",
          showCta: true,
          ctaText: "Add to Cart - ₹1299",
          ctaAction: onAddToCart
        };
      case "checkout":
        return {
          bgGradient: "from-green-50 to-emerald-50",
          accentColor: "green",
          showCta: true,
          ctaText: "Complete Purchase",
          ctaAction: () => window.location.href = "/checkout"
        };
      default:
        return {
          bgGradient: "from-amber-50 to-orange-50",
          accentColor: "amber",
          showCta: false
        };
    }
  };

  const modalConfig = getModalContent();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl bg-gradient-to-br ${modalConfig.bgGradient} rounded-3xl shadow-2xl border border-white/50 overflow-hidden`}
        >
          <div className="flex flex-col md:flex-row min-h-[600px]">
            {/* Left side - Image/Icon */}
            <div className="md:w-1/2 p-8 flex items-center justify-center">
              {node.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full h-80 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={node.image}
                    alt={node.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <div
                    className="text-8xl mb-4 filter drop-shadow-lg"
                    style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.3))" }}
                  >
                    {node.icon}
                  </div>
                  <div
                    className="w-24 h-1 rounded-full mx-auto"
                    style={{ backgroundColor: node.color }}
                  />
                </motion.div>
              )}
            </div>

            {/* Right side - Content */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                  {node.title}
                </h2>

                {node.subtitle && (
                  <p className="text-lg text-gray-700 italic mb-6">
                    {node.subtitle}
                  </p>
                )}

                <div className="prose prose-lg text-gray-800 leading-relaxed mb-8">
                  {node.description}
                </div>

                {/* Progress indicator for benefits */}
                {node.type === "benefit" && (
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">
                      Your journey progress:
                    </div>
                    <div className="flex gap-2">
                      {["reduce-anxiety", "daily-focus", "screen-free-pause"].map((benefitId) => (
                        <div
                          key={benefitId}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            visitedNodes.has(benefitId)
                              ? "bg-green-600 scale-125"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Product details */}
                {node.type === "product" && (
                  <div className="bg-white/50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">🪔</span>
                        Handcrafted brass diya
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">📿</span>
                        Sacred rudraksha mala
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">📖</span>
                        30-day practice guide
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">🕯️</span>
                        Pure ghee wicks (30 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">🎨</span>
                        Sacred geometry cards
                      </li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  {modalConfig.showCta && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={modalConfig.ctaAction}
                      className={`px-8 py-4 bg-gradient-to-r from-${modalConfig.accentColor}-600 to-${modalConfig.accentColor}-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {modalConfig.ctaText}
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    Continue Journey
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
