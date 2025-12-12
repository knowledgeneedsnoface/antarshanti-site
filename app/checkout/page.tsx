"use client";
import React, { useState } from "react";
import { useCart } from "../(components)/CartContext";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Checkout — Cash on Delivery</h1>
        <p className="mt-2 text-sm text-gray-600">Fill your shipping details and confirm. We will contact you to confirm delivery.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form onSubmit={submitOrder} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded border p-3" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full rounded border p-3" />
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address" className="w-full rounded border p-3" />
            <div>
              <label className="flex items-center gap-2">
                <input defaultChecked type="checkbox" className="accent-amber-600" /> Cash on Delivery (COD)
              </label>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button disabled={loading} type="submit" className="rounded-full bg-amber-600 px-6 py-3 text-white">
              {loading ? "Placing order..." : `Confirm Order — ₹${total()}`}
            </button>
          </form>

          <aside className="rounded border p-4">
            <h3 className="font-semibold">Your order</h3>
            <div className="mt-2 text-sm">
              {items.length === 0 ? <p>Cart is empty.</p> : (
                <ul className="space-y-2">
                  {items.map(it => (
                    <li key={it.id} className="flex justify-between">
                      <span>{it.name} × {it.qty}</span>
                      <span>₹{it.price * it.qty}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 border-t pt-3 text-sm">
              <div className="flex justify-between"><span>Total</span><span>₹{total()}</span></div>
              <p className="mt-2 text-xs text-gray-500">We will call to confirm delivery. Please keep phone reachable.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
