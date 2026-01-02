"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "./Tooltip";
import { Compass, Sparkles, BookOpen, Users } from "lucide-react";

export default function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
        ? "bg-white/70 backdrop-blur-xl border-b border-stone-200/50 py-3 shadow-sm"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner border border-white/20">
              🕉
            </div>
          </div>
          <span className="text-2xl font-serif font-medium text-stone-800 tracking-tight group-hover:text-amber-700 transition-colors">
            AntarShanti
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Silent Mode Toggle - Visual only for now, can be wired up later */}
          <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-amber-600 transition-colors uppercase tracking-widest mr-4">
            <span className="text-base">🕊️</span> Silent Mode
          </button>

          <Link href="/inner-atlas" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
            Your Ritual
          </Link>

          <Link href="/twin/demo" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
            Your Companion
          </Link>

          <Link href="#why-it-works" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
            Why This Works
          </Link>

          <Link
            href="/inner-atlas"
            className="ml-2 px-6 py-2 bg-gray-900 text-white font-medium text-sm rounded-full hover:bg-gray-800 transition-all flex items-center gap-2"
          >
            Begin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-amber-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-4 space-y-3">
              <Link
                href="/"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/inner-atlas"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inner Atlas
              </Link>
              <Link
                href="/#about"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#founder"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Founder
              </Link>
              <Link
                href="/twin/demo"
                className="block text-gray-700 hover:text-amber-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Twin Demo
              </Link>
              <Link
                href="/checkout"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
}
