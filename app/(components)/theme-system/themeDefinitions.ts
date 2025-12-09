export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  background: {
    gradient: string;
    overlay?: string;
  };
  particles: {
    count: number;
    color: string;
    size: { min: number; max: number };
    speed: { min: number; max: number };
    opacity: { min: number; max: number };
  };
  glow: {
    intensity: number;
    color: string;
    blur: number;
  };
  colors: {
    text: string;
    textSecondary: string;
    accent: string;
  };
  effects?: {
    type: 'mist' | 'beams' | 'stars' | 'clouds' | 'flare';
    config: any;
  };
}

export const themes: Record<string, ThemeDefinition> = {
  'himalayan-cave': {
    id: 'himalayan-cave',
    name: 'Himalayan Cave',
    description: 'Dark stone textures with mystical blue light',
    background: {
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      overlay: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    },
    particles: {
      count: 40,
      color: '#60a5fa',
      size: { min: 1, max: 3 },
      speed: { min: 0.3, max: 0.8 },
      opacity: { min: 0.2, max: 0.6 },
    },
    glow: {
      intensity: 0.3,
      color: '#3b82f6',
      blur: 60,
    },
    colors: {
      text: '#e0e7ff',
      textSecondary: '#a5b4fc',
      accent: '#60a5fa',
    },
    effects: {
      type: 'mist',
      config: {
        layers: 3,
        speed: 0.5,
        opacity: 0.15,
      },
    },
  },
  
  'temple-courtyard': {
    id: 'temple-courtyard',
    name: 'Temple Courtyard',
    description: 'Warm amber light with floating dust motes',
    background: {
      gradient: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 30%, #f59e0b 70%, #d97706 100%)',
      overlay: 'radial-gradient(circle at 30% 20%, rgba(255, 237, 213, 0.6) 0%, transparent 50%)',
    },
    particles: {
      count: 60,
      color: '#fbbf24',
      size: { min: 1, max: 2 },
      speed: { min: 0.2, max: 0.5 },
      opacity: { min: 0.3, max: 0.7 },
    },
    glow: {
      intensity: 0.5,
      color: '#f59e0b',
      blur: 80,
    },
    colors: {
      text: '#78350f',
      textSecondary: '#92400e',
      accent: '#f59e0b',
    },
    effects: {
      type: 'beams',
      config: {
        count: 3,
        width: 100,
        angle: -30,
        opacity: 0.15,
      },
    },
  },
  
  'golden-aura': {
    id: 'golden-aura',
    name: 'Golden Aura',
    description: 'Chakra-inspired radiant energy',
    background: {
      gradient: 'radial-gradient(ellipse at center, #fef3c7 0%, #fde68a 20%, #fbbf24 50%, #f59e0b 80%, #d97706 100%)',
      overlay: 'radial-gradient(circle at 50% 50%, rgba(253, 224, 71, 0.3) 0%, transparent 60%)',
    },
    particles: {
      count: 80,
      color: '#fde047',
      size: { min: 2, max: 4 },
      speed: { min: 0.1, max: 0.4 },
      opacity: { min: 0.4, max: 0.8 },
    },
    glow: {
      intensity: 0.7,
      color: '#fbbf24',
      blur: 100,
    },
    colors: {
      text: '#78350f',
      textSecondary: '#a16207',
      accent: '#f59e0b',
    },
    effects: {
      type: 'flare',
      config: {
        size: 300,
        pulseSpeed: 4,
        opacity: 0.2,
      },
    },
  },
  
  'night-sky': {
    id: 'night-sky',
    name: 'Night Sky Meditation',
    description: 'Starlit tranquility under cosmic depths',
    background: {
      gradient: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      overlay: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
    },
    particles: {
      count: 100,
      color: '#e0e7ff',
      size: { min: 1, max: 3 },
      speed: { min: 0.1, max: 0.3 },
      opacity: { min: 0.3, max: 1 },
    },
    glow: {
      intensity: 0.4,
      color: '#6366f1',
      blur: 70,
    },
    colors: {
      text: '#e0e7ff',
      textSecondary: '#c7d2fe',
      accent: '#818cf8',
    },
    effects: {
      type: 'stars',
      config: {
        shootingStars: true,
        frequency: 3000,
        twinkle: true,
      },
    },
  },
  
  'sunrise-rishikesh': {
    id: 'sunrise-rishikesh',
    name: 'Sunrise Over Rishikesh',
    description: 'Dawn breaks with serene beauty',
    background: {
      gradient: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 20%, #fda4af 40%, #fb923c 70%, #f97316 100%)',
      overlay: 'radial-gradient(ellipse at 50% 80%, rgba(254, 215, 170, 0.4) 0%, transparent 50%)',
    },
    particles: {
      count: 30,
      color: '#fed7aa',
      size: { min: 2, max: 5 },
      speed: { min: 0.15, max: 0.35 },
      opacity: { min: 0.2, max: 0.5 },
    },
    glow: {
      intensity: 0.6,
      color: '#fb923c',
      blur: 90,
    },
    colors: {
      text: '#7c2d12',
      textSecondary: '#9a3412',
      accent: '#f97316',
    },
    effects: {
      type: 'clouds',
      config: {
        count: 5,
        speed: 0.3,
        opacity: 0.2,
      },
    },
  },
};

export const defaultTheme = 'temple-courtyard';
