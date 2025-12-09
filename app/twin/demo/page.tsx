"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TwinFull from '@/components/twin/TwinFull';
import TwinOnboarding from '@/components/twin/TwinOnboarding';
import LevelUpModal from '@/components/twin/LevelUpModal';
import { getTwin, createTwin, postEvent, syncQueuedEvents, getEventQueue } from '@/lib/twin/twinClient';
import { SoulTwin, RITUALS, SpiritualPath } from '@/lib/twin/rules';

export default function TwinDemoPage() {
  const [twin, setTwin] = useState<SoulTwin | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTwinFull, setShowTwinFull] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ isOpen: boolean; newLevel: number; gains: any }>({
    isOpen: false,
    newLevel: 1,
    gains: {},
  });
  const [queuedCount, setQueuedCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  const userId = 'demo-user-123';

  useEffect(() => {
    loadTwin();
    updateQueueCount();
  }, []);

  async function loadTwin() {
    const data = await getTwin(userId);
    setTwin(data);
    if (!data) {
      setShowOnboarding(true);
    }
  }

  function updateQueueCount() {
    const queue = getEventQueue();
    setQueuedCount(queue.length);
  }

  async function handleCreateTwin(name: string, path: SpiritualPath, avatarSeed: number) {
    const newTwin = await createTwin(userId, name, path, avatarSeed);
    setTwin(newTwin);
    setShowOnboarding(false);
  }

  async function handleSimulateRitual(ritualId: string) {
    if (!twin) return;

    const ritual = RITUALS[ritualId as keyof typeof RITUALS];
    if (!ritual) return;

    const oldLevel = twin.level;

    const event = {
      type: 'ritual',
      ritualId,
      xp: ritual.xp,
      changes: ritual.changes,
      date: new Date().toISOString(),
    };

    const updatedTwin = await postEvent(userId, event);
    
    if (updatedTwin) {
      setTwin(updatedTwin);
      updateQueueCount();

      // Check for level up
      if (updatedTwin.level > oldLevel) {
        setLevelUpData({
          isOpen: true,
          newLevel: updatedTwin.level,
          gains: {
            calmness: 0,
            discipline: 0,
            emotionalStrength: 0,
            energy: 0,
          },
        });
      }
    }
  }

  async function handleSync() {
    setSyncing(true);
    const success = await syncQueuedEvents(userId);
    if (success) {
      await loadTwin();
      updateQueueCount();
    }
    setSyncing(false);
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Digital Soul Twin Demo
          </h1>
          <p className="text-xl text-gray-600">
            Test the complete Soul Twin system
          </p>
        </div>

        {/* Queue Indicator */}
        {queuedCount > 0 && (
          <motion.div
            className="mb-6 p-4 bg-yellow-100 border-2 border-yellow-300 rounded-xl flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-yellow-900">Offline Mode</p>
                <p className="text-sm text-yellow-700">Queued events: {queuedCount}</p>
              </div>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg disabled:opacity-50 transition-colors"
            >
              {syncing ? 'Syncing...' : 'Force Resync'}
            </button>
          </motion.div>
        )}

        {/* Main Content */}
        {twin ? (
          <div className="space-y-6">
            {/* Twin Stats Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{twin.name}</h2>
                  <p className="text-gray-600">Path of {twin.path}</p>
                </div>
                <button
                  onClick={() => setShowTwinFull(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  View Full Twin
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4">Level Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Level</span>
                      <span className="font-bold text-amber-600">{twin.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XP</span>
                      <span className="font-bold text-amber-600">
                        {twin.xp} / {200 + 100 * (twin.level - 1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Rituals</span>
                      <span className="font-bold text-amber-600">{twin.history.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Attributes</h3>
                  <div className="space-y-3">
                    {Object.entries(twin.attributes).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-bold text-amber-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ritual Simulator */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-8 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🧘 Ritual Simulator</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(RITUALS).map(([id, ritual]) => (
                  <button
                    key={id}
                    onClick={() => handleSimulateRitual(id)}
                    className="p-6 bg-white hover:bg-amber-100 border-2 border-amber-300 rounded-2xl text-left transition-all hover:shadow-lg"
                  >
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{ritual.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="font-bold text-amber-600">+{ritual.xp} XP</div>
                      {Object.entries(ritual.changes).map(([attr, value]) => (
                        value ? (
                          <div key={attr}>
                            +{value} {attr.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        ) : null
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-100 border-2 border-blue-300 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Each ritual increases XP and attributes based on your chosen path.
                  Path multipliers amplify certain attributes!
                </p>
              </div>
            </div>

            {/* Testing Info */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Testing Checklist</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span>Twin created and saved</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{twin.history.length > 0 ? '✅' : '⬜'}</span>
                  <span>Complete at least one ritual</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{twin.level > 1 ? '✅' : '⬜'}</span>
                  <span>Level up (complete 4+ Daily Pujas)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{queuedCount > 0 ? '✅' : '⬜'}</span>
                  <span>Test offline queue (stop server, complete ritual)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Twin...</h2>
            <p className="text-gray-600">If onboarding doesn't appear, the twin is loading</p>
          </div>
        )}

        {/* Modals */}
        {showOnboarding && (
          <TwinOnboarding
            onComplete={handleCreateTwin}
            onSkip={() => setShowOnboarding(false)}
          />
        )}

        {showTwinFull && twin && (
          <TwinFull
            twin={twin}
            onClose={() => setShowTwinFull(false)}
            onSimulateRitual={handleSimulateRitual}
          />
        )}

        <LevelUpModal
          isOpen={levelUpData.isOpen}
          newLevel={levelUpData.newLevel}
          attributeGains={levelUpData.gains}
          onClose={() => setLevelUpData({ ...levelUpData, isOpen: false })}
        />
      </div>
    </div>
  );
}
