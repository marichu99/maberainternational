"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { PointerProvider } from "./pointer-context";
import { HeroHeadline } from "./hero-headline";

const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false },
);

export function Hero() {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  // The shader is mouse-reactive; on touch (no persistent pointer) fall back
  // to the same static gradient used for reduced motion, per the mobile rule
  // of simplifying 3D rather than running it unused.
  const useStaticFallback = reducedMotion || !isFinePointer;

  return (
    <PointerProvider>
      <section
        id="hero"
        className="relative flex h-screen w-full items-center overflow-hidden bg-charcoal px-[6vw]"
      >
        {useStaticFallback ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, var(--color-espresso), var(--color-charcoal) 70%)",
            }}
          />
        ) : (
          <HeroCanvas />
        )}
        <div className="relative z-10 flex w-full flex-col gap-6">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-copper">
            Wyoming — Automation Systems for U.S. Businesses
          </span>
          <HeroHeadline reducedMotion={reducedMotion} />
          <p className="max-w-xl text-lg text-stone md:text-xl">
            We design and ship the automation that handles the operational work slowing your
            business down — workflows, reporting, payments, and the glue between your tools.
          </p>
          <a
            href="#contact"
            data-magnetic
            className="font-display mt-2 inline-block w-fit rounded-full border border-bone/30 px-7 py-3 text-base text-bone transition-colors hover:border-copper hover:text-copper"
          >
            Start automating →
          </a>
        </div>
      </section>
    </PointerProvider>
  );
}
