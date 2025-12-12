export type PathType = 'ANCHOR' | 'RELEASE' | 'IGNITE';

export interface AtlasConfig {
    seed: string;
    palette: {
        primary: string;
        secondary: string;
    };
    particles: {
        count: number;
        speed: number;
    };
    recommendedPath: PathType;
}

export const usePersonalizer = () => {

    const generateConfig = (seed: string): AtlasConfig => {
        // Simple hashing of seed string to deterministic params
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pathIndex = hash % 3;
        const paths: PathType[] = ['ANCHOR', 'RELEASE', 'IGNITE'];

        // Map path index to CSS variables (names) or hex codes
        // We use the CSS variable names defined in inner-atlas.css
        const colors = [
            'var(--mood-anchor)',
            'var(--mood-release)',
            'var(--mood-ignite)'
        ];

        return {
            seed,
            palette: {
                primary: colors[pathIndex],
                secondary: '#ffffff'
            },
            particles: {
                count: 20 + (hash % 30),
                speed: 0.5 + (hash % 100) / 200
            },
            recommendedPath: paths[pathIndex]
        };
    };

    return { generateConfig };
};
