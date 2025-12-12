import { RitualPath } from './Personalizer';

const GRATITUDE_LINES = [
    "Thank you for showing up today.",
    "Your breath returned home.",
    "A small shift reshaped the whole day.",
    "You honored your inner space.",
    "Today had meaning because you paused.",
    "Quietly, something inside grew.",
    "You chose presence over distraction.",
    "The world needed your stillness.",
    "You remembered yourself today.",
    "A seed was planted in silence.",
    "You gave yourself permission to be.",
    "The ritual held you gently."
];

export class GratitudeEngine {
    static generate(seed: string): string {
        const seedSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const index = seedSum % GRATITUDE_LINES.length;
        return GRATITUDE_LINES[index];
    }
}
