"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { skills, variants } from "./skill-list";

const NUDGE_RADIUS = 120;

export function SkillsPhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const engine = Matter.Engine.create();
    const world = engine.world;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const wallOptions: Matter.IChamferableBodyDefinition = { isStatic: true, restitution: 0.4 };
    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 2, 50, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 4, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 4, wallOptions);

    const bodies = pillRefs.current
      .map((pill, index) => {
        if (!pill) return null;
        const rect = pill.getBoundingClientRect();
        return Matter.Bodies.rectangle(
          width / 2 + (Math.random() - 0.5) * width * 0.6,
          -200 - index * 60,
          rect.width,
          rect.height,
          { restitution: 0.5, friction: 0.3, chamfer: { radius: rect.height / 2 } },
        );
      })
      .filter((body): body is Matter.Body => body !== null);

    Matter.World.add(world, [ground, ceiling, leftWall, rightWall, ...bodies]);

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2 },
    });
    Matter.World.add(world, mouseConstraint);

    // Nudge nearby pills on mouse move without grabbing them.
    const nudge = () => {
      const mousePos = mouse.position;
      for (const body of bodies) {
        if (body === mouseConstraint.body) continue;
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < NUDGE_RADIUS * NUDGE_RADIUS && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / NUDGE_RADIUS) * 0.0006;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      }
    };
    Matter.Events.on(engine, "beforeUpdate", nudge);

    let raf = 0;
    let lastTime = performance.now();
    let running = true;

    const syncPills = () => {
      bodies.forEach((body, index) => {
        const pill = pillRefs.current[index];
        if (!pill) return;
        pill.style.transform = `translate(${body.position.x - pill.offsetWidth / 2}px, ${
          body.position.y - pill.offsetHeight / 2
        }px) rotate(${body.angle}rad)`;
      });
    };

    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;
      Matter.Engine.update(engine, delta);
      syncPills();
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastTime = performance.now();
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    running = true;
    raf = requestAnimationFrame(tick);
    setReady(true);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      Matter.Events.off(engine, "beforeUpdate", nudge);
      Matter.Mouse.clearSourceEvents(mouse);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[70vh] w-full touch-none">
      {skills.map((skill, index) => (
        <span
          key={skill}
          ref={(el) => {
            pillRefs.current[index] = el;
          }}
          className={`absolute top-0 left-0 cursor-grab touch-none rounded-full px-4 py-2 text-sm font-medium select-none ${
            variants[index % variants.length]
          }`}
          style={{ opacity: ready ? 1 : 0, willChange: "transform" }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
