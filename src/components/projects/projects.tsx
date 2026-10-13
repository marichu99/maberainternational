"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import { useFinePointer } from "@/hooks/use-fine-pointer";

// Fan the spines symmetrically around the shelf's center, like books leaning
// against each other — outer spines tilt and recede further than inner ones.
const ROTATE_STEP_DEG = 7;
const DEPTH_STEP_PX = 14;
const HEIGHT_TWEAK_PX = [0, -10, 6, -6, 10, 0];

export function Projects() {
  const isFinePointer = useFinePointer();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  // Touch devices have no hover — show every tag so the info isn't hidden.
  const alwaysShowTags = !isFinePointer;

  const center = (projects.length - 1) / 2;

  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col justify-center gap-16 bg-espresso px-[6vw] py-24"
    >
      <h2 className="font-display text-sm uppercase tracking-[0.3em] text-stone">
        03 — Case studies
      </h2>

      <div
        className="relative mx-auto flex h-[50vh] w-full max-w-5xl items-end justify-center gap-1 md:h-[60vh]"
        style={{ perspective: "1800px" }}
      >
        {projects.map((project, index) => {
          const offset = index - center;
          const rotation = offset * ROTATE_STEP_DEG;
          const depth = -Math.abs(offset) * DEPTH_STEP_PX;
          const isActive = activeSlug === project.slug;
          const tagVisible = alwaysShowTags || isActive;

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative block h-full w-16 shrink-0 focus:outline-none md:w-24"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => setActiveSlug(project.slug)}
              onMouseLeave={() => setActiveSlug((current) => (current === project.slug ? null : current))}
              onFocus={() => setActiveSlug(project.slug)}
              onBlur={() => setActiveSlug((current) => (current === project.slug ? null : current))}
            >
              <span
                className="absolute bottom-0 left-0 w-full origin-bottom rounded-t-sm shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper"
                style={{
                  height: `calc(100% + ${HEIGHT_TWEAK_PX[index % HEIGHT_TWEAK_PX.length]}px)`,
                  background: `linear-gradient(135deg, ${project.colorFrom}, ${project.colorTo})`,
                  transform: isActive
                    ? "rotateY(0deg) translateZ(48px) scale(1.08)"
                    : `rotateY(${rotation}deg) translateZ(${depth}px)`,
                }}
              >
                <span
                  className="font-display absolute inset-0 flex items-center justify-center text-base tracking-wide text-bone/90 md:text-lg"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {project.name}
                </span>
              </span>

              <span
                className={`font-display pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2 rounded-full border border-copper/60 bg-charcoal px-4 py-1.5 text-sm whitespace-nowrap text-bone transition-all duration-300 ${
                  tagVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {project.blurb}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
