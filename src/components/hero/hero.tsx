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
        <HeroHeadline reducedMotion={reducedMotion} />
      </section>
    </PointerProvider>
  );
}
