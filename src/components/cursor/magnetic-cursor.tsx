"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";

const MAGNETIC_RADIUS = 80;
const PULL_STRENGTH = 0.3;
const DEFAULT_RING_SIZE = 36;
const PARTICLE_INTERVAL_MS = 70;
const PARTICLE_LIFETIME_MS = 450;

type Particle = { x: number; y: number; bornAt: number };

function CursorOverlay() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("custom-cursor-active");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y, vx: 0, vy: 0 };
    const ringSize = { w: DEFAULT_RING_SIZE, h: DEFAULT_RING_SIZE, radius: DEFAULT_RING_SIZE / 2 };
    const particles: Particle[] = [];
    let lastParticleTime = 0;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener("pointermove", handleMove);

    let raf = 0;

    const tick = (time: number) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;
      }

      const magneticEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      );

      let closest: HTMLElement | null = null;
      let closestDist = Infinity;
      let closestRect: DOMRect | null = null;

      for (const el of magneticEls) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        if (dist < MAGNETIC_RADIUS && dist < closestDist) {
          closest = el;
          closestDist = dist;
          closestRect = rect;
        }
      }

      let ringTargetX = mouse.x;
      let ringTargetY = mouse.y;
      let targetW = DEFAULT_RING_SIZE;
      let targetH = DEFAULT_RING_SIZE;
      let targetRadius = DEFAULT_RING_SIZE / 2;

      for (const el of magneticEls) {
        if (el === closest) continue;
        el.classList.remove("magnetic-engaged");
        el.style.transform = "translate(0px, 0px)";
      }

      if (closest && closestRect) {
        const cx = closestRect.left + closestRect.width / 2;
        const cy = closestRect.top + closestRect.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;

        closest.classList.add("magnetic-engaged");
        closest.style.transform = `translate(${dx * PULL_STRENGTH}px, ${dy * PULL_STRENGTH}px)`;

        ringTargetX = cx + dx * PULL_STRENGTH;
        ringTargetY = cy + dy * PULL_STRENGTH;
        targetW = closestRect.width + 16;
        targetH = closestRect.height + 16;
        targetRadius = Math.min(targetW, targetH) / 2;
      }

      ring.vx += (ringTargetX - ring.x) * 0.18;
      ring.vy += (ringTargetY - ring.y) * 0.18;
      ring.vx *= 0.72;
      ring.vy *= 0.72;
      ring.x += ring.vx;
      ring.y += ring.vy;

      ringSize.w += (targetW - ringSize.w) * 0.2;
      ringSize.h += (targetH - ringSize.h) * 0.2;
      ringSize.radius += (targetRadius - ringSize.radius) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.width = `${ringSize.w}px`;
        ringRef.current.style.height = `${ringSize.h}px`;
        ringRef.current.style.borderRadius = `${ringSize.radius}px`;
        ringRef.current.style.transform = `translate3d(${ring.x - ringSize.w / 2}px, ${
          ring.y - ringSize.h / 2
        }px, 0)`;
      }

      if (ctx && canvas) {
        if (time - lastParticleTime > PARTICLE_INTERVAL_MS) {
          lastParticleTime = time;
          particles.push({ x: mouse.x, y: mouse.y, bornAt: time });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          const age = time - particle.bornAt;
          if (age > PARTICLE_LIFETIME_MS) {
            particles.splice(i, 1);
            continue;
          }
          const lifeFraction = 1 - age / PARTICLE_LIFETIME_MS;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2.5 * lifeFraction, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 115, 51, ${lifeFraction * 0.3})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-40" />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 border border-bone/60"
        style={{ width: DEFAULT_RING_SIZE, height: DEFAULT_RING_SIZE, borderRadius: "50%" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-bone"
      />
    </>
  );
}

export function MagneticCursor() {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();

  if (reducedMotion || !isFinePointer) return null;
  return <CursorOverlay />;
}
