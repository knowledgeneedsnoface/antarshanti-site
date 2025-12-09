// lib/twin/rules.ts
// Central configuration for Digital Soul Twin system
// All XP formulas, attribute gains, and leveling logic

export type SpiritualPath = 'Peace' | 'Strength' | 'Devotion' | 'Light';

export interface SoulTwin {
  userId: string;
  name: string;
  path: SpiritualPath;
  avatarSeed: number;
  level: number;
  xp: number;
  attributes: {
    calmness: number;
    discipline: number;
    emotionalStrength: number;
    energy: number;
  };
  attributesFraction: {
    calmness: number;
    discipline: number;
    emotionalStrength: number;
    energy: number;
  };
  history: TwinEvent[];
  createdAt: string;
  lastActive: string;
}

export interface TwinEvent {
  type: string;
  ritualId?: string;
  xp: number;
  changes: {
    calmness?: number;
    discipline?: number;
    emotionalStrength?: number;
    energy?: number;
  };
  date: string;
}

// XP FORMULA: Level progression
// Formula: xpToNext(level) = 200 + 100 * (level - 1)
// Example calculations:
// Level 1 → 2: 200 + 100*(1-1) = 200 + 0 = 200 XP needed
// Level 2 → 3: 200 + 100*(2-1) = 200 + 100 = 300 XP needed
// Level 3 → 4: 200 + 100*(3-1) = 200 + 200 = 400 XP needed
export function xpToNextLevel(level: number): number {
  return 200 + 100 * (level - 1);
}

// Calculate total XP needed to reach a specific level from level 1
export function totalXpForLevel(targetLevel: number): number {
  let total = 0;
  for (let lvl = 1; lvl < targetLevel; lvl++) {
    total += xpToNextLevel(lvl);
  }
  return total;
}

// RITUAL DEFINITIONS
// Each ritual grants base XP and attribute increases
export const RITUALS = {
  daily_puja_10min: {
    name: 'Daily Puja (10 min)',
    xp: 50,
    changes: {
      calmness: 2,
      discipline: 1,
      emotionalStrength: 1,
      energy: 1,
    },
  },
  meditation_15min: {
    name: 'Meditation (15 min)',
    xp: 75,
    changes: {
      calmness: 3,
      discipline: 2,
      emotionalStrength: 1,
      energy: 0,
    },
  },
  morning_ritual: {
    name: 'Morning Ritual',
    xp: 40,
    changes: {
      calmness: 1,
      discipline: 2,
      emotionalStrength: 1,
      energy: 2,
    },
  },
  breathwork: {
    name: 'Breathwork Session',
    xp: 30,
    changes: {
      calmness: 2,
      discipline: 1,
      emotionalStrength: 2,
      energy: 1,
    },
  },
} as const;

// PATH MULTIPLIERS
// Each path amplifies certain attributes
export const PATH_MULTIPLIERS: Record<SpiritualPath, {
  calmness: number;
  discipline: number;
  emotionalStrength: number;
  energy: number;
}> = {
  Peace: {
    calmness: 1.5,
    discipline: 1.0,
    emotionalStrength: 1.2,
    energy: 0.8,
  },
  Strength: {
    calmness: 0.8,
    discipline: 1.5,
    emotionalStrength: 1.5,
    energy: 1.2,
  },
  Devotion: {
    calmness: 1.2,
    discipline: 1.5,
    emotionalStrength: 1.0,
    energy: 1.3,
  },
  Light: {
    calmness: 1.3,
    discipline: 1.0,
    emotionalStrength: 1.0,
    energy: 1.5,
  },
};

// APPLY EVENT TO TWIN
// This is the core logic that updates twin state based on events
export function applyEventToTwin(twin: SoulTwin, event: TwinEvent): {
  twin: SoulTwin;
  leveledUp: boolean;
  newLevel: number;
} {
  const updatedTwin = { ...twin };
  const multipliers = PATH_MULTIPLIERS[twin.path];

  // Add XP
  updatedTwin.xp += event.xp;

  // Apply attribute changes with path multipliers and fractional carryover
  Object.entries(event.changes).forEach(([attr, change]) => {
    if (change === undefined) return;
    
    const key = attr as keyof typeof updatedTwin.attributes;
    const multiplier = multipliers[key];
    
    const multipliedGain = change * multiplier;
    const totalGain = multipliedGain + (updatedTwin.attributesFraction[key] || 0);
    
    const integerPart = Math.floor(totalGain);
    const fractionalPart = totalGain - integerPart;
    
    updatedTwin.attributes[key] += integerPart;
    updatedTwin.attributesFraction[key] = fractionalPart;
  });

  // Check for level up(s) with XP carryover
  let leveledUp = false;
  const oldLevel = updatedTwin.level;

  while (true) {
    const xpNeeded = xpToNextLevel(updatedTwin.level);
    
    if (updatedTwin.xp >= xpNeeded) {
      updatedTwin.xp -= xpNeeded;
      updatedTwin.level += 1;
      leveledUp = true;
    } else {
      break;
    }
  }

  updatedTwin.history.push(event);
  updatedTwin.lastActive = event.date;

  return {
    twin: updatedTwin,
    leveledUp,
    newLevel: updatedTwin.level,
  };
}

// CREATE NEW TWIN
export function createNewTwin(
  userId: string,
  name: string,
  path: SpiritualPath,
  avatarSeed: number
): SoulTwin {
  return {
    userId,
    name,
    path,
    avatarSeed,
    level: 1,
    xp: 0,
    attributes: {
      calmness: 10,
      discipline: 10,
      emotionalStrength: 10,
      energy: 10,
    },
    attributesFraction: {
      calmness: 0,
      discipline: 0,
      emotionalStrength: 0,
      energy: 0,
    },
    history: [],
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };
}

// GET RITUAL BY ID
export function getRitualById(ritualId: string) {
  return RITUALS[ritualId as keyof typeof RITUALS];
}
