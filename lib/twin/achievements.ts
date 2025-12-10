// lib/twin/achievements.ts
// Achievement system for Soul Twin

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (twin: any) => boolean;
  reward: {
    xp?: number;
    attributes?: {
      calmness?: number;
      discipline?: number;
      emotionalStrength?: number;
      energy?: number;
    };
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_ritual',
    name: 'First Steps',
    description: 'Complete your first ritual',
    icon: '🌱',
    requirement: (twin) => twin.history.length >= 1,
    reward: { xp: 25 },
  },
  {
    id: 'level_5',
    name: 'Dedicated Practitioner',
    description: 'Reach level 5',
    icon: '⭐',
    requirement: (twin) => twin.level >= 5,
    reward: { xp: 100, attributes: { calmness: 5, discipline: 5 } },
  },
  {
    id: 'level_10',
    name: 'Spiritual Warrior',
    description: 'Reach level 10',
    icon: '🏆',
    requirement: (twin) => twin.level >= 10,
    reward: { xp: 250, attributes: { emotionalStrength: 10, energy: 10 } },
  },
  {
    id: 'streak_7',
    name: 'Week of Peace',
    description: 'Complete rituals for 7 consecutive days',
    icon: '🔥',
    requirement: (twin) => checkStreak(twin, 7),
    reward: { xp: 150, attributes: { discipline: 8 } },
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Complete rituals for 30 consecutive days',
    icon: '💎',
    requirement: (twin) => checkStreak(twin, 30),
    reward: { xp: 500, attributes: { discipline: 20, calmness: 15 } },
  },
  {
    id: 'total_10',
    name: 'Seeker',
    description: 'Complete 10 total rituals',
    icon: '🌟',
    requirement: (twin) => twin.history.length >= 10,
    reward: { xp: 100 },
  },
  {
    id: 'total_50',
    name: 'Devotee',
    description: 'Complete 50 total rituals',
    icon: '🙌',
    requirement: (twin) => twin.history.length >= 50,
    reward: { xp: 300, attributes: { calmness: 10, discipline: 10 } },
  },
  {
    id: 'total_100',
    name: 'Enlightened',
    description: 'Complete 100 total rituals',
    icon: '✨',
    requirement: (twin) => twin.history.length >= 100,
    reward: { xp: 1000, attributes: { calmness: 25, discipline: 25, emotionalStrength: 25, energy: 25 } },
  },
  {
    id: 'meditation_master',
    name: 'Meditation Master',
    description: 'Complete 20 meditation sessions',
    icon: '🧘',
    requirement: (twin) => countRitualType(twin, 'meditation_15min') >= 20,
    reward: { xp: 200, attributes: { calmness: 15 } },
  },
  {
    id: 'morning_person',
    name: 'Morning Person',
    description: 'Complete 15 morning rituals',
    icon: '🌅',
    requirement: (twin) => countRitualType(twin, 'morning_ritual') >= 15,
    reward: { xp: 150, attributes: { energy: 12 } },
  },
  {
    id: 'breath_expert',
    name: 'Breath Expert',
    description: 'Complete 25 breathwork sessions',
    icon: '💨',
    requirement: (twin) => countRitualType(twin, 'breathwork') >= 25,
    reward: { xp: 200, attributes: { emotionalStrength: 15 } },
  },
  {
    id: 'high_calmness',
    name: 'Peaceful Soul',
    description: 'Reach 50 calmness',
    icon: '☮️',
    requirement: (twin) => twin.attributes.calmness >= 50,
    reward: { xp: 300 },
  },
  {
    id: 'high_discipline',
    name: 'Disciplined Mind',
    description: 'Reach 50 discipline',
    icon: '🎯',
    requirement: (twin) => twin.attributes.discipline >= 50,
    reward: { xp: 300 },
  },
  {
    id: 'high_emotional',
    name: 'Emotional Fortress',
    description: 'Reach 50 emotional strength',
    icon: '🛡️',
    requirement: (twin) => twin.attributes.emotionalStrength >= 50,
    reward: { xp: 300 },
  },
  {
    id: 'high_energy',
    name: 'Boundless Energy',
    description: 'Reach 50 energy',
    icon: '⚡',
    requirement: (twin) => twin.attributes.energy >= 50,
    reward: { xp: 300 },
  },
];

// Helper function to check consecutive day streak
function checkStreak(twin: any, days: number): boolean {
  if (twin.history.length < days) return false;

  const dates = twin.history
    .map((event: any) => new Date(event.date).toDateString())
    .reverse(); // Most recent first

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const current = new Date(dates[i]);
    const previous = new Date(dates[i - 1]);
    const diffDays = Math.floor((previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
      if (streak >= days) return true;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  return streak >= days;
}

// Helper function to count specific ritual types
function countRitualType(twin: any, ritualId: string): number {
  return twin.history.filter((event: any) => event.ritualId === ritualId).length;
}

// Check which achievements were just unlocked
export function checkNewAchievements(
  oldTwin: any,
  newTwin: any,
  unlockedAchievements: string[]
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  ACHIEVEMENTS.forEach((achievement) => {
    // Skip if already unlocked
    if (unlockedAchievements.includes(achievement.id)) return;

    // Check if requirement is now met
    const wasNotMet = !achievement.requirement(oldTwin);
    const isNowMet = achievement.requirement(newTwin);

    if (wasNotMet && isNowMet) {
      newlyUnlocked.push(achievement);
    }
  });

  return newlyUnlocked;
}

// Get all unlocked achievements
export function getUnlockedAchievements(twin: any): Achievement[] {
  return ACHIEVEMENTS.filter((achievement) => achievement.requirement(twin));
}

// Get achievement progress
export function getAchievementProgress(twin: any): {
  unlocked: number;
  total: number;
  percentage: number;
} {
  const unlocked = getUnlockedAchievements(twin).length;
  const total = ACHIEVEMENTS.length;
  return {
    unlocked,
    total,
    percentage: Math.round((unlocked / total) * 100),
  };
}
