"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";

const CursorPreviewCanvas = dynamic(
  () => import("./cursor-preview-canvas").then((mod) => mod.CursorPreviewCanvas),
  { ssr: false },
);

const PREVIEW_WIDTH = 420;
const PREVIEW_HEIGHT = 300;

export function Projects() {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const showCursorPreview = !reducedMotion && isFinePointer;
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothedRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!showCursorPreview) return;

    const handleMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };
    window.addEventListener("pointermove", handleMove);

    let raf: number;
    const tick = () => {
      const prevX = smoothedRef.current.x;
      const prevY = smoothedRef.current.y;

      smoothedRef.current.x += (targetRef.current.x - prevX) * 0.15;
      smoothedRef.current.y += (targetRef.current.y - prevY) * 0.15;

      velocityRef.current.x = (smoothedRef.current.x - prevX) * 0.05;
      velocityRef.current.y = (smoothedRef.current.y - prevY) * 0.05;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${
          smoothedRef.current.x - PREVIEW_WIDTH / 2
        }px, ${smoothedRef.current.y - PREVIEW_HEIGHT / 2}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [showCursorPreview]);

  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col justify-center gap-2 bg-espresso px-[6vw] py-24"
    >
      <h2 className="font-display mb-12 text-sm uppercase tracking-[0.3em] text-stone">
        03 — Projects
      </h2>

      <ul className="divide-y divide-stone/20 border-y border-stone/20">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group flex items-center justify-between py-8"
              onMouseEnter={() => showCursorPreview && setActiveProject(project)}
              onMouseLeave={() => showCursorPreview && setActiveProject(null)}
            >
              <span className="font-display text-3xl text-bone transition-colors group-hover:text-copper md:text-5xl">
                {project.name}
              </span>
              <span className="hidden text-stone md:block">{project.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>

      {showCursorPreview && (
        <div
          ref={wrapperRef}
          className="pointer-events-none fixed top-0 left-0 z-50"
          style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
        >
          <CursorPreviewCanvas activeProject={activeProject} velocityRef={velocityRef} />
        </div>
      )}
    </section>
  );
}
