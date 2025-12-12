import { RitualPath } from './Personalizer';

export interface MicroHabit {
    text: string;
    category: 'MINDFULNESS' | 'ACTION' | 'REFLECTION';
}

const HABITS: Record<RitualPath, MicroHabit[]> = {
    ANCHOR: [
        { text: "Place your hand on your heart for 3 breaths when you wake.", category: 'MINDFULNESS' },
        { text: "Sit still for 30 seconds before opening your phone.", category: 'MINDFULNESS' },
        { text: "Walk 20 steps slowly and consciously.", category: 'ACTION' },
        { text: "Notice the texture of an object you use every day.", category: 'MINDFULNESS' },
        { text: "Listen to a sound until it fades completely.", category: 'MINDFULNESS' },
        { text: "Drink your morning water without doing anything else.", category: 'ACTION' },
        { text: "Feel your feet on the ground whenever you stand up.", category: 'MINDFULNESS' },
    ],
    RELEASE: [
        { text: "Let one unnecessary thought go today.", category: 'REFLECTION' },
        { text: "Exhale longer than you inhale twice today.", category: 'MINDFULNESS' },
        { text: "Clear one small corner of your space.", category: 'ACTION' },
        { text: "Unsubscribe from one thing that drains you.", category: 'ACTION' },
        { text: "Forgive yourself for one small thing.", category: 'REFLECTION' },
        { text: "Watch a cloud move for one minute.", category: 'MINDFULNESS' },
        { text: "Write down a worry, then tear the paper.", category: 'ACTION' },
    ],
    IGNITE: [
        { text: "Do one thing boldly today.", category: 'ACTION' },
        { text: "Speak one truth gently.", category: 'ACTION' },
        { text: "Start a task you’ve been delaying — for 2 minutes.", category: 'ACTION' },
        { text: "Wear something that makes you feel powerful.", category: 'ACTION' },
        { text: "Light a candle and watch the flame for 1 minute.", category: 'MINDFULNESS' },
        { text: "Compliment someone sincerely.", category: 'ACTION' },
        { text: "Stand tall and take up space.", category: 'ACTION' },
    ]
};

export class MicroHabitEngine {
    static generate(path: RitualPath, seed: string): MicroHabit {
        const list = HABITS[path];
        const seedSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Use day of year to rotate habits daily for the same user
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

        // Combine seed + day to ensure rotation but consistency for the day
        const index = (seedSum + dayOfYear) % list.length;
        return list[index];
    }
}
