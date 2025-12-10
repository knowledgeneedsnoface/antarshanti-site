"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
            🕉
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            AntarShanti
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
            Home
          </Link>
          <a href="#about" className="text-gray-700 hover:text-amber-600 transition-colors font-medium cursor-pointer">
            About
          </a>
          <a href="#founder" className="text-gray-700 hover:text-amber-600 transition-colors font-medium cursor-pointer">
            Founder
          </a>
          <Link href="/twin/demo" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
            Twin Demo
          </Link>
          <Link
            href="/checkout"
            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
          >
            Get Started
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
    </nav>
  );
}
