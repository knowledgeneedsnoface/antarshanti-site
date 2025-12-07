"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MinimalCheckout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log("Checkout data:", formData);
    alert("Thank you for your order! Your ritual kit will arrive soon. 🕉");
  };

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-amber-900 mb-6">
            Begin Your Journey
          </h2>
          <p className="text-xl text-amber-700/80 max-w-2xl mx-auto leading-relaxed">
            Your 30-day ritual kit is ready. Let's get it to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-amber-50/50 rounded-3xl p-8 border border-amber-100">
              <h3 className="text-2xl font-semibold text-amber-900 mb-6">Your Ritual Kit</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">AntarShanti 30-Day Ritual Kit</span>
                  <span className="font-semibold text-amber-900">₹1299</span>
                </div>
                <div className="flex justify-between items-center text-sm text-amber-600">
                  <span>Free Delivery</span>
                  <span>₹0</span>
                </div>
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-2xl text-amber-900">₹1299</span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3 text-sm text-amber-700"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-amber-500">✓</span>
                  <span>7-day peace guarantee</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-sm text-amber-700"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    delay: 0.5,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-amber-500">✓</span>
                  <span>Cash on delivery available</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-sm text-amber-700"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-amber-500">✓</span>
                  <span>Eco-friendly packaging</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <motion.textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50 resize-none"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <motion.input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <motion.input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 bg-white/50"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <motion.label
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.paymentMethod === "cod"
                        ? "border-amber-400 bg-amber-50"
                        : "border-amber-200 bg-white/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-medium">💰 Cash on Delivery</span>
                  </motion.label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Complete My Order 🕉
              </motion.button>

              <motion.p
                className="text-xs text-center text-amber-600"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Your ritual begins with delivery. Namaste. 🙏
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
