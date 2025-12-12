"use client";

import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Relic } from '../contexts/ShrineContext';
import { Analytics } from '../lib/Analytics';

interface SnapshotGeneratorProps {
    relic: Relic;
    quote: string;
    level: number;
    userName?: string;
}

export interface SnapshotHandle {
    generateImage: () => void;
}

const SnapshotGenerator = forwardRef<SnapshotHandle, SnapshotGeneratorProps>(({ relic, quote, level, userName = "Seeker" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
        generateImage: () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            Analytics.track('snapshot_started', { relicId: relic.id });

            // DRAWING LOGIC
            const w = canvas.width;
            const h = canvas.height;

            // 1. Background (Gradient based on path)
            const gradient = ctx.createLinearGradient(0, 0, 0, h);
            if (relic.path === 'IGNITE') {
                gradient.addColorStop(0, '#260505');
                gradient.addColorStop(1, '#000000');
            } else if (relic.path === 'RELEASE') {
                gradient.addColorStop(0, '#051525');
                gradient.addColorStop(1, '#000000');
            } else {
                gradient.addColorStop(0, '#1a100a');
                gradient.addColorStop(1, '#000000');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            // 2. Aura Glow
            const cx = w / 2;
            const cy = h / 2 - 50;
            const radius = 200;

            const radial = ctx.createRadialGradient(cx, cy, 50, cx, cy, radius);
            const glowColor = relic.rarity === 'MYTHIC' ? '255, 215, 0' : relic.rarity === 'RARE' ? '224, 247, 250' : '255, 255, 255';
            radial.addColorStop(0, `rgba(${glowColor}, 0.2)`);
            radial.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = radial;
            ctx.fillRect(0, 0, w, h);

            // 3. Relic Shape (Approximation)
            ctx.save();
            ctx.translate(cx, cy);

            ctx.strokeStyle = `rgba(${glowColor}, 0.8)`;
            ctx.lineWidth = 4;
            ctx.fillStyle = `rgba(${glowColor}, 0.1)`;

            ctx.beginPath();
            if (relic.path === 'ANCHOR') {
                ctx.rect(-60, -60, 120, 120);
            } else if (relic.path === 'RELEASE') {
                ctx.arc(0, 0, 70, 0, Math.PI * 2);
            } else {
                // Diamond (Ignite)
                ctx.rotate(Math.PI / 4);
                ctx.rect(-50, -50, 100, 100);
            }
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // 4. Text - Quote
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'italic 24px serif';
            wrapText(ctx, quote, cx, h - 200, w - 100, 32);

            // 5. Text - Relic Info
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.font = '12px sans-serif uppercase';
            ctx.letterSpacing = '2px';
            ctx.fillText(`${relic.rarity} ${relic.path} RELIC • LEVEL ${level}`, cx, h - 100);

            // 6. Watermark
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.font = '10px sans-serif';
            ctx.fillText("INNER ATLAS", cx, h - 50);

            // Convert to Image & Download
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `InnerAtlas-Refelction-${relic.seed}.png`;
            link.href = dataUrl;
            link.click();

            Analytics.track('snapshot_exported', { relicId: relic.id });
        }
    }));

    // Helper for text wrapping
    function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
    }

    return (
        <div style={{ display: 'none' }}>
            <canvas ref={canvasRef} width={1080} height={1920} />
        </div>
    );
});

SnapshotGenerator.displayName = "SnapshotGenerator";
export default SnapshotGenerator;
