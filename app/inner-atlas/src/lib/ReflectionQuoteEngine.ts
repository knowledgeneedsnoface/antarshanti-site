import { RitualPath } from './Personalizer';
import { RelicRarity } from '../contexts/ShrineContext';

type Quote = string;

const QUOTES: Record<RitualPath, Quote[]> = {
    ANCHOR: [
        "You softened the world inside you.",
        "Stillness found you.",
        "Your center became real.",
        "You stood as the mountain, and the storm passed.",
        "In the silence, you found your roots."
    ],
    RELEASE: [
        "You let go, and something let go of you.",
        "You returned to your breath.",
        "The river flows because it does not hold on.",
        "Weightless is the heart that forgives.",
        "You are the sky, not the clouds."
    ],
    IGNITE: [
        "Your spark stood up today.",
        "The flame you tend is the life you lead.",
        "You burned away the doubt.",
        "Power is not force, it is presence.",
        "You are the light you have been waiting for."
    ]
};

const RARE_QUOTES = [
    "A rare clarity has dawned upon you.",
    "The deep current moves beneath the surface.",
    "You have touched the golden thread."
];

const MYTHIC_QUOTES = [
    "The universe breathes with you.",
    "You have touched the infinite.",
    "A legend is written in your silence."
];

export class ReflectionQuoteEngine {
    static generate(path: RitualPath, rarity: RelicRarity, seed: string): string {
        // Deterministic but feels magical
        // Use seed char code sum to pick index
        const seedSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // 10% chance to override with Rarity quote if Rare/Mythic
        const isSpecialMoment = (seedSum % 10) === 0;

        if (rarity === 'MYTHIC' && isSpecialMoment) {
            return MYTHIC_QUOTES[seedSum % MYTHIC_QUOTES.length];
        }

        if (rarity === 'RARE' && isSpecialMoment) {
            return RARE_QUOTES[seedSum % RARE_QUOTES.length];
        }

        const pathQuotes = QUOTES[path];
        return pathQuotes[seedSum % pathQuotes.length];
    }
}
