"use client";
import React from "react";

const benefits = [
  { title: "Reduce Anxiety", desc: "A 10-minute ritual to calm the nervous system.", img: "/benefit1.jpg" },
  { title: "Daily Focus", desc: "Start each day with clarity and intention.", img: "/benefit2.jpg" },
  { title: "Screen-free Pause", desc: "An offline habit to reset your mind.", img: "/benefit3.jpg" },
];

export default function BenefitsCarousel() {
  return (
    <section id="benefits" className="py-12 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold">Benefits of a Daily Practice</h2>
        <p className="mt-2 text-sm text-gray-600">Little rituals, measurable calm.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border p-4 text-left">
              <div className="h-40 w-full overflow-hidden rounded-md bg-gray-100">
                <img src={b.img} alt={b.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a href="#product" className="rounded-full bg-amber-600 px-6 py-2 text-white">View the Kit</a>
        </div>
      </div>
    </section>
  );
}
