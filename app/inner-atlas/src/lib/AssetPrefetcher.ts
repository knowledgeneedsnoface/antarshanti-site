/**
 * Asset Prefetcher
 * Handles intelligent preloading of Lottie animations and audio files
 */

type AssetType = 'lottie' | 'audio' | 'image';

interface PrefetchOptions {
    priority?: 'high' | 'low';
    onProgress?: (loaded: number, total: number) => void;
    onComplete?: () => void;
}

class AssetPrefetcherClass {
    private cache = new Map<string, any>();
    private loading = new Set<string>();
    private audioContext: AudioContext | null = null;

    /**
     * Initialize audio context (call after user interaction)
     */
    initAudioContext() {
        if (!this.audioContext && typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    /**
     * Prefetch Lottie JSON files
     */
    async prefetchLotties(urls: string[], options: PrefetchOptions = {}): Promise<void> {
        const { onProgress, onComplete } = options;
        let loaded = 0;
        const total = urls.length;

        const promises = urls.map(async (url) => {
            if (this.cache.has(url) || this.loading.has(url)) {
                loaded++;
                onProgress?.(loaded, total);
                return this.cache.get(url);
            }

            this.loading.add(url);

            try {
                const response = await fetch(url);
                const data = await response.json();
                this.cache.set(url, data);
                this.loading.delete(url);

                loaded++;
                onProgress?.(loaded, total);

                return data;
            } catch (error) {
                console.error(`Failed to prefetch Lottie: ${url}`, error);
                this.loading.delete(url);
                loaded++;
                onProgress?.(loaded, total);
                return null;
            }
        });

        await Promise.all(promises);
        onComplete?.();
    }

    /**
     * Prefetch audio files and decode them
     */
    async prefetchAudio(urls: string[], options: PrefetchOptions = {}): Promise<void> {
        if (!this.audioContext) {
            console.warn('AudioContext not initialized. Call initAudioContext() first.');
            return;
        }

        const { onProgress, onComplete } = options;
        let loaded = 0;
        const total = urls.length;

        const promises = urls.map(async (url) => {
            if (this.cache.has(url) || this.loading.has(url)) {
                loaded++;
                onProgress?.(loaded, total);
                return this.cache.get(url);
            }

            this.loading.add(url);

            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

                this.cache.set(url, audioBuffer);
                this.loading.delete(url);

                loaded++;
                onProgress?.(loaded, total);

                return audioBuffer;
            } catch (error) {
                console.error(`Failed to prefetch audio: ${url}`, error);
                this.loading.delete(url);
                loaded++;
                onProgress?.(loaded, total);
                return null;
            }
        });

        await Promise.all(promises);
        onComplete?.();
    }

    /**
     * Prefetch images
     */
    async prefetchImages(urls: string[], options: PrefetchOptions = {}): Promise<void> {
        const { onProgress, onComplete } = options;
        let loaded = 0;
        const total = urls.length;

        const promises = urls.map(async (url) => {
            if (this.cache.has(url)) {
                loaded++;
                onProgress?.(loaded, total);
                return;
            }

            return new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.cache.set(url, img);
                    loaded++;
                    onProgress?.(loaded, total);
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to prefetch image: ${url}`);
                    loaded++;
                    onProgress?.(loaded, total);
                    resolve();
                };
                img.src = url;
            });
        });

        await Promise.all(promises);
        onComplete?.();
    }

    /**
     * Preconnect to external domains
     */
    preconnectResources(domains: string[]) {
        if (typeof document === 'undefined') return;

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    /**
     * Get cached asset
     */
    getCached(url: string) {
        return this.cache.get(url);
    }

    /**
     * Check if asset is cached
     */
    isCached(url: string): boolean {
        return this.cache.has(url);
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        this.loading.clear();
    }
}

export const AssetPrefetcher = new AssetPrefetcherClass();

/**
 * Asset manifest for the Inner Atlas
 */
export const ASSET_MANIFEST = {
    portal: {
        lotties: ['/lottie/portal_pulse.json'],
        audio: ['/audio/bell_intro.mp3']
    },
    map: {
        lotties: [
            '/lottie/map_tiles.json',
            '/lottie/path_anchor.json',
            '/lottie/path_release.json',
            '/lottie/path_ignite.json'
        ],
        audio: ['/audio/map_whoosh.mp3']
    },
    chamber: {
        lotties: [
            '/lottie/flame_core.json',
            '/lottie/breath_orb.json',
            '/lottie/mantra_ripple.json'
        ],
        audio: [
            '/audio/flame_crackle.mp3',
            '/audio/breath_ambient.mp3',
            '/audio/mantra_hum.mp3'
        ]
    },
    mirror: {
        lotties: ['/lottie/mirror_ripple.json'],
        audio: ['/audio/mirror_drone.mp3', '/audio/mirror_chime.mp3']
    },
    shrine: {
        lotties: ['/lottie/shrine_glow.json', '/lottie/relic_common.json'],
        audio: ['/audio/shrine_ambient.mp3']
    },
    journey: {
        audio: [
            '/audio/soft_end_bell.mp3',
            '/audio/micro_habit_chime.mp3',
            '/audio/quest_reveal_soft.mp3'
        ]
    }
};
