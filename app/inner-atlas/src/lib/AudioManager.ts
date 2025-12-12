/**
 * Inner Atlas Audio Manager
 * Handles WebAudio context, buffering, and crossfading.
 */

class AudioManagerClass {
    private ctx: AudioContext | null = null;
    private buffers: Map<string, AudioBuffer> = new Map();
    private sources: Map<string, AudioBufferSourceNode> = new Map();
    private gainNodes: Map<string, GainNode> = new Map();
    private masterGain: GainNode | null = null;
    private isMuted: boolean = false;

    init() {
        if (this.ctx) {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            return;
        }

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        console.log('[Atlas Audio] Context Initialized');
    }

    async load(id: string, url: string) {
        if (!this.ctx) this.init();
        if (this.buffers.has(id)) return;

        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.ctx!.decodeAudioData(arrayBuffer);
            this.buffers.set(id, audioBuffer);
            console.log(`[Atlas Audio] Loaded: ${id}`);
        } catch (e) {
            console.error(`[Atlas Audio] Failed to load ${id}`, e);
        }
    }

    playOneShot(id: string, volume = 1.0) {
        if (!this.ctx || !this.buffers.has(id)) return;

        const source = this.ctx.createBufferSource();
        source.buffer = this.buffers.get(id)!;

        const gain = this.ctx.createGain();
        gain.gain.value = this.isMuted ? 0 : volume;

        source.connect(gain);
        gain.connect(this.masterGain!);
        source.start(0);
    }

    playLoop(id: string, volume = 1.0, fadeDuration = 2.0) {
        if (!this.ctx || !this.buffers.has(id)) return;
        if (this.sources.has(id)) return; // Already playing

        const source = this.ctx.createBufferSource();
        source.buffer = this.buffers.get(id)!;
        source.loop = true;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : volume, this.ctx.currentTime + fadeDuration);

        source.connect(gain);
        gain.connect(this.masterGain!);
        source.start(0);

        this.sources.set(id, source);
        this.gainNodes.set(id, gain);
    }

    stopLoop(id: string, fadeDuration = 2.0) {
        if (!this.sources.has(id)) return;

        const source = this.sources.get(id)!;
        const gain = this.gainNodes.get(id)!;

        if (this.ctx) {
            gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + fadeDuration);
            setTimeout(() => {
                source.stop();
                source.disconnect();
                this.sources.delete(id);
                this.gainNodes.delete(id);
            }, fadeDuration * 1000);
        }
    }

    setMute(mute: boolean) {
        this.isMuted = mute;
        if (this.masterGain && this.ctx) {
            // Smooth mute
            const target = mute ? 0 : 1;
            this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
        }
    }
}

export const AudioManager = new AudioManagerClass();
