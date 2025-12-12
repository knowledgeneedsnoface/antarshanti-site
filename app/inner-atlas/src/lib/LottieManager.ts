/**
 * Inner Atlas Lottie Manager
 * Handles efficient loading and playback of Lottie animations.
 */

// Define a minimal interface for Lottie Player instance (lottie-web)
interface LottieAnimationItem {
    play: () => void;
    stop: () => void;
    pause: () => void;
    destroy: () => void;
    playSegments: (segments: [number, number], forceFlag: boolean) => void;
    setSpeed: (speed: number) => void;
    animType: string;
}

class LottieManagerClass {
    private animations: Map<string, LottieAnimationItem> = new Map();
    private lottieLib: any = null; // Dynamically imported lottie-web

    async init() {
        if (!this.lottieLib) {
            // In a real build, we would likely import lottie-web here
            // For scaffold, we assume global or module availability
            try {
                // this.lottieLib = (await import('lottie-web')).default;
                console.log('[Atlas Lottie] Initialized (Lazy)');
            } catch (e) {
                console.error('[Atlas Lottie] Failed to load lottie-web', e);
            }
        }
    }

    async loadAnimation(id: string, container: HTMLElement, path: string, loop = true): Promise<LottieAnimationItem | null> {
        // Mock implementation for scaffold
        console.log(`[Atlas Lottie] Loading ${id} from ${path}`);

        // Simulating an animation object
        const mockAnim: LottieAnimationItem = {
            play: () => console.log(`Playing ${id}`),
            stop: () => console.log(`Stopping ${id}`),
            pause: () => console.log(`Pausing ${id}`),
            destroy: () => console.log(`Destroying ${id}`),
            playSegments: (seg) => console.log(`Segment ${id}: ${seg}`),
            setSpeed: (s) => console.log(`Speed ${id}: ${s}`),
            animType: 'svg'
        };

        this.animations.set(id, mockAnim);
        return mockAnim;
    }

    get(id: string) {
        return this.animations.get(id);
    }

    destroy(id: string) {
        const anim = this.animations.get(id);
        if (anim) {
            anim.destroy();
            this.animations.delete(id);
        }
    }
}

export const LottieManager = new LottieManagerClass();
