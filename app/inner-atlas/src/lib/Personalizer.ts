/**
 * Inner Atlas Personalizer Engine
 * Deterministically generates ritual themes themes based on a user seed.
 */

import { hashString } from '../utils/math';

export type RitualPath = 'ANCHOR' | 'RELEASE' | 'IGNITE';

export interface RitualTheme {
    seed: string;
    path: RitualPath;
    palette: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    particles: {
        count: number;
        speed: number;
        size: number;
        flow: 'calm' | 'upward' | 'chaotic';
    };
    audioMood: 'grounding' | 'ethereal' | 'energetic';
}

class PersonalizerEngine {

    generate(seed: string): RitualTheme {
        const hash = hashString(seed.toLowerCase().trim());
        const pathIndex = hash % 3;

        const paths: RitualPath[] = ['ANCHOR', 'RELEASE', 'IGNITE'];
        const chosenPath = paths[pathIndex];

        return {
            seed,
            path: chosenPath,
            palette: this.getPalette(chosenPath),
            particles: this.getParticles(hash, chosenPath),
            audioMood: this.getAudioMood(chosenPath)
        };
    }

    private getPalette(path: RitualPath) {
        switch (path) {
            case 'ANCHOR':
                return {
                    primary: 'var(--mood-anchor)',
                    secondary: '#D7CCC8',
                    accent: '#795548',
                    background: 'var(--gradient-dawn)'
                };
            case 'RELEASE':
                return {
                    primary: 'var(--mood-release)',
                    secondary: '#E1F5FE',
                    accent: '#0288D1',
                    background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)'
                };
            case 'IGNITE':
                return {
                    primary: 'var(--mood-ignite)',
                    secondary: '#FFEBEE',
                    accent: '#D32F2F',
                    background: 'linear-gradient(180deg, #263238 0%, #000000 100%)'
                };
        }
    }

    private getParticles(hash: number, path: RitualPath): { count: number; speed: number; size: number; flow: 'calm' | 'upward' | 'chaotic' } {
        const baseCount = 20 + (hash % 30);
        return {
            count: baseCount,
            speed: 0.5 + (hash % 100) / 200,
            size: 2 + (hash % 5),
            flow: path === 'IGNITE' ? 'upward' : path === 'RELEASE' ? 'chaotic' : 'calm'
        };
    }

    private getAudioMood(path: RitualPath): 'grounding' | 'ethereal' | 'energetic' {
        switch (path) {
            case 'ANCHOR': return 'grounding';
            case 'RELEASE': return 'ethereal';
            case 'IGNITE': return 'energetic';
        }
    }
}

export const Personalizer = new PersonalizerEngine();
