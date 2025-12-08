"use client";

import React from "react";

export default function AboutFounderSection() {
  return (
    <section id="founder" className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            About the Founder
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Founder Photo */}
            <div className="relative p-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                  {/* Placeholder - replace with actual image */}
                  <div className="text-8xl">👤</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
            </div>

            {/* Founder Text */}
            <div className="p-8 md:pr-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Siddharth Chouhan
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                AntarShanti was founded by <span className="font-semibold text-amber-600">Siddharth Chouhan</span>, 
                driven by a deep desire to bring peaceful digital experiences into people's lives.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                His vision is to make mind–body wellness accessible through modern, elegant spiritual tools 
                that honor ancient traditions while embracing contemporary design.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                "In our hyperconnected world, we've lost touch with the sacred. AntarShanti is my attempt 
                to bridge that gap—to create digital experiences that don't drain your energy, but restore it."
              </p>

              {/* Social links or CTA */}
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/siddharthchouhan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                >
                  Connect on LinkedIn
                </a>
                <a 
                  href="mailto:siddharth@antarshanti.com"
                  className="px-6 py-3 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
