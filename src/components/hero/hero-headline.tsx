"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { usePointer } from "./pointer-context";
import { useFinePointer } from "@/hooks/use-fine-pointer";

gsap.registerPlugin(SplitText);

const MIN_WEIGHT = 350;
const MAX_WEIGHT = 750;
const PROXIMITY_RADIUS_PX = 220;

export function HeroHeadline({ reducedMotion }: { reducedMotion: boolean }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pointer = usePointer();
  const isFinePointer = useFinePointer();

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      // smartWrap wraps each word in a `white-space: nowrap` span so the line
      // can only break between words — plain "words, chars" grouping isn't
      // enough, since the word wrapper itself has no nowrap and still lets
      // the browser break between the nested char spans inside a long word.
      const split = SplitText.create(headlineRef.current, { type: "chars", smartWrap: true });
      const chars = split.chars as HTMLElement[];

      if (reducedMotion) {
        gsap.set(chars, { opacity: 1, y: 0 });
        return () => split.revert();
      }

      gsap.set(chars, { opacity: 0, y: 40 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.025,
        ease: "power3.out",
      });

      // No persistent pointer on touch — skip the weight-follow loop entirely.
      if (!isFinePointer) return () => split.revert();

      let raf: number;
      const tick = () => {
        const pointerX = pointer.current.x * window.innerWidth;
        const pointerY = pointer.current.y * window.innerHeight;

        for (const char of chars) {
          const rect = char.getBoundingClientRect();
          const dx = pointerX - (rect.left + rect.width / 2);
          const dy = pointerY - (rect.top + rect.height / 2);
          const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / PROXIMITY_RADIUS_PX);
          const weight = Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * proximity);
          char.style.fontVariationSettings = `"wght" ${weight}`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        split.revert();
      };
    },
    { scope: headlineRef, dependencies: [reducedMotion, isFinePointer] },
  );

  return (
    <h1
      ref={headlineRef}
      className="font-display relative z-10 text-[clamp(3rem,12vw,9rem)] leading-[0.95] text-bone"
      style={{ fontVariationSettings: '"wght" 350' }}
    >
      Mabera International
    </h1>
  );
}
