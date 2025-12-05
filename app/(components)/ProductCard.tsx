"use client";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const router = useRouter();

  const product = { id: "antarshanti-30", name: "AntarShanti – 30 Days Kit", price: 1299 };

  function addToCart() {
    add({ id: product.id, name: product.name, price: product.price, qty });
    // Client-side navigation preserves context
    router.push("/checkout");
  }

  return (
    <section id="product" className="py-12 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <img
src="/flatlay.jpg"
  alt="AntarShanti Box"
  className="w-full h-80 object-cover rounded-xl"
/>

            <p className="mt-4 text-sm text-gray-600">AntarShanti Box preview</p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border p-6">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-700">A 30-day guided puja-as-meditation kit.</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded border px-3 py-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2">-</button>
                  <div className="w-8 text-center">{qty}</div>
                  <button onClick={() => setQty(qty + 1)} className="px-2">+</button>
                </div>
                <div className="ml-4 text-lg font-semibold">₹{product.price * qty}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={addToCart} className="rounded-full bg-amber-600 px-5 py-3 text-white">
                Add & Checkout
              </button>
              <a href="#whats-inside" className="rounded-full border px-4 py-3">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
