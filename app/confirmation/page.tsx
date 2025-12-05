// app/confirmation/page.tsx
// Server component — reads searchParams from the router on the server side

import React from "react";

type Props = {
  searchParams?: { orderId?: string | string[] };
};

export default function Confirmation({ searchParams }: Props) {
  // When Next.js renders the page on the server, searchParams is available.
  const raw = searchParams?.orderId;
  const orderId = Array.isArray(raw) ? raw[0] : raw ?? "—";

  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="max-w-xl text-center rounded-2xl border p-8">
        <h1 className="text-2xl font-semibold">Order Received</h1>
        <p className="mt-3 text-sm text-gray-700">
          Thank you — your order is received. Our team will call you to confirm delivery.
        </p>
        <div className="mt-6">
          <p className="text-xs text-gray-500">Order ID</p>
          <div className="mt-1 rounded-md bg-gray-100 px-4 py-2 font-mono">{orderId}</div>
        </div>

        <div className="mt-6">
          <a href="/" className="rounded-full border px-4 py-2">Back to Home</a>
        </div>
      </div>
    </main>
  );
}
