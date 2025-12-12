"use client";

import React, { useEffect, useRef } from 'react';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { getPrefersReducedMotion } from '../utils/accessibility';

export default function ParticleLayer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = usePersonalization();

    useEffect(() => {
        if (getPrefersReducedMotion()) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Config based on Theme (or defaults)
        const particleCount = theme?.particles.count ?? 30;
        const particleSpeed = theme?.particles.speed ?? 0.5;
        const flowType = theme?.particles.flow ?? 'calm';

        // Resize properties
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Particle Class
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            fadeSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;

                // Behavior based on flow
                if (flowType === 'upward') {
                    this.vx = (Math.random() - 0.5) * 0.2;
                    this.vy = -Math.random() * particleSpeed - 0.2;
                } else if (flowType === 'chaotic') {
                    this.vx = (Math.random() - 0.5) * particleSpeed * 2;
                    this.vy = (Math.random() - 0.5) * particleSpeed * 2;
                } else { // 'calm'
                    this.vx = (Math.random() - 0.5) * 0.2;
                    this.vy = (Math.random() - 0.5) * 0.2;
                }

                this.size = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5;
                this.fadeSpeed = Math.random() * 0.005 + 0.002;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.fadeSpeed;

                // Reset specific particle when it fades or goes out of bounds
                if (this.alpha <= 0 || this.x < -50 || this.x > canvas!.width + 50 || this.y < -50 || this.y > canvas!.height + 50) {
                    this.reset();
                }
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                if (flowType === 'upward') {
                    this.y = canvas!.height + 10;
                } else {
                    this.y = Math.random() * canvas!.height;
                }
                this.alpha = 0.5;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                const color = theme?.palette.accent || '#D4AF37';
                // Simple hex to rgba conversion or just use generic gold for embers if no theme
                ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
                ctx.fill();
            }
        }

        // Init
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const render = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}
