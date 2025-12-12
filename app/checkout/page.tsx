"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../(components)/CartContext";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering cart dependent content on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !address) {
      setError("Please fill name, phone and address");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: { name, phone, address }, items, payment: { method: "COD" }, total: total() }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        window.location.href = `/confirmation?orderId=${data.orderId}`;
      } else {
        setError(data.message || "Failed to place order");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isClient) {
    return (
      <main className="min-h-screen bg-white py-12 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-100 rounded"></div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white py-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            🕉
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">Your spiritual journey awaits</h1>
          <p className="text-gray-600 mb-8">Your cart is currently empty. Visit our home to discover the rituals.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium px-8 py-3 rounded-full hover:shadow-lg transition-all"
          >
            Explore Rituals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6]/50 py-12 px-4 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-amber-600 mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl font-light text-gray-900">Checkout</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <span>1.</span> Shipping Details
              </h2>

              <form id="checkout-form" onSubmit={submitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="For delivery updates"
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full address including PIN code"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <span>2.</span> Payment Method
              </h2>
              <div className="p-4 border border-amber-200 bg-amber-50/50 rounded-xl flex items-start gap-3">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mt-1 w-4 h-4 text-amber-600 accent-amber-600"
                />
                <div>
                  <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                  <p className="text-sm text-gray-600 mt-1">Pay with cash or UPI when the kit arrives at your doorstep.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>

              <div className="divide-y divide-gray-100">
                {items.map(it => (
                  <div key={it.id} className="py-4 flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                      {/* Placeholder for item image if available in context later */}
                      <div className="absolute inset-0 bg-amber-100 flex items-center justify-center text-xs text-amber-800">
                        Ritual Kit
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{it.name}</p>
                      <p className="text-xs text-gray-500">Qty: {it.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{it.price * it.qty}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-medium text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-light text-gray-900">₹{total()}</span>
                    <p className="text-[10px] text-gray-500">Including all taxes</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {loading ? "Processing..." : "Confirm Support"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
