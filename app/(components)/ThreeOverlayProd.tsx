"use client";
import React from "react";

/**
 * Overlay for 3D scene:
 * - shows progress
 * - shows modal when activeSign passed
 */

export default function ThreeOverlayProd({
  activeSign,
  onClose,
  onContinue,
  onProceed,
  visited,
}: any) {
  return (
    <>
      {/* Top HUD */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <span className="font-bold text-amber-900">Your Ritual Journey</span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm">
          <span className="font-semibold">{Object.keys(visited).length}</span>
          <span className="text-gray-600"> / 3 discovered</span>
        </div>
      </div>

      {/* Modal */}
      {activeSign && (
        <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              <img 
                src={activeSign.image} 
                className="w-full md:w-64 h-48 object-cover rounded-xl" 
                alt={activeSign.title} 
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {activeSign.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {activeSign.content}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={onContinue}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Continue Journey
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-medium transition-colors"
                  >
                    Back to Path
                  </button>
                  {Object.keys(visited).length === 3 && (
                    <button 
                      onClick={onProceed}
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Complete Journey →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
