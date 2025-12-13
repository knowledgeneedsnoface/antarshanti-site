"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "./Tooltip";
import { Compass, Sparkles, BookOpen, Users } from "lucide-react";

export default function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
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
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Tooltip text="Begin your 10-minute journey">
            <Link href="/inner-atlas" className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50/50 transition-all">
              <Compass className="w-4 h-4 text-amber-600/70 group-hover:text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-amber-700">Inner Atlas</p>
                <p className="text-[10px] text-gray-400 font-light hidden xl:block">Your 10-minute ritual path</p>
              </div>
            </Link>
          </Tooltip>

          <Tooltip text="Meet your evolving spiritual companion">
            <Link href="/twin/demo" className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50/50 transition-all">
              <Sparkles className="w-4 h-4 text-amber-600/70 group-hover:text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-amber-700">Soul Twin</p>
                <p className="text-[10px] text-gray-400 font-light hidden xl:block">Your spiritual companion</p>
              </div>
            </Link>
          </Tooltip>

          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
            Our Story
          </a>

          <Link
            href="/#product"
            className="ml-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
