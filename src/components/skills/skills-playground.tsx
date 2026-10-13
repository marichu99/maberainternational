"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { skills, variants } from "./skill-list";

// Matter.js is a meaningful chunk for a section far below the fold — keep it
// out of the initial bundle and off the reduced-motion path entirely.
const SkillsPhysics = dynamic(
  () => import("./skills-physics").then((mod) => mod.SkillsPhysics),
  { ssr: false },
);

export function SkillsPlayground() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden bg-espresso px-[6vw] py-24"
    >
      <h2 className="font-display mb-12 text-sm uppercase tracking-[0.3em] text-stone">
        05 — Toolkit
      </h2>

      {reducedMotion ? (
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li
              key={skill}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                variants[index % variants.length]
              }`}
            >
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <SkillsPhysics />
      )}
    </section>
  );
}
