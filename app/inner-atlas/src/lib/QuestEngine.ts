export interface Quest {
    text: string;
    theme: 'AWE' | 'COURAGE' | 'CONNECTION' | 'STILLNESS';
}

const QUESTS: Quest[] = [
    { text: "Find one moment of awe tomorrow.", theme: 'AWE' },
    { text: "Notice one thing you usually ignore.", theme: 'AWE' },
    { text: "Pause before reacting once tomorrow.", theme: 'STILLNESS' },
    { text: "Protect one spark of courage tomorrow.", theme: 'COURAGE' },
    { text: "Whisper thank you to your day.", theme: 'CONNECTION' },
    { text: "Look at the sky before you look at a screen.", theme: 'AWE' },
    { text: "Listen to someone without planning your response.", theme: 'CONNECTION' },
    { text: "Do one thing slowly.", theme: 'STILLNESS' },
    { text: "Share a genuine smile with a stranger.", theme: 'CONNECTION' },
    { text: "Creating something small instead of consuming.", theme: 'COURAGE' }
];

export class QuestEngine {
    static generate(seed: string): Quest {
        const seedSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

        // Rotate quests daily
        // We add 1 to dayOfYear for "Tomorrow's" quest
        const index = (seedSum + dayOfYear + 1) % QUESTS.length;
        return QUESTS[index];
    }
}
