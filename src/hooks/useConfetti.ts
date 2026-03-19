import { useEffect, useCallback } from "react";

// Simple confetti particles
const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
};

const COLORS = [
  "hsl(185, 100%, 55%)",   // cyan
  "hsl(265, 80%, 65%)",    // purple
  "hsl(45, 100%, 60%)",    // gold
  "hsl(140, 70%, 55%)",    // green
  "hsl(340, 80%, 60%)",    // pink
  "hsl(200, 90%, 60%)",    // blue
];

export const useConfetti = (trigger: boolean) => {
  const fire = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + randomBetween(-100, 100),
        y: canvas.height / 2 - 100,
        vx: randomBetween(-8, 8),
        vy: randomBetween(-14, -4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: randomBetween(4, 8),
        rotation: randomBetween(0, 360),
        rotationSpeed: randomBetween(-10, 10),
        opacity: 1,
      });
    }

    let frame = 0;
    const maxFrames = 120;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - frame / maxFrames);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (trigger) {
      // Fire twice for extra effect
      fire();
      setTimeout(fire, 400);
    }
  }, [trigger, fire]);
};
