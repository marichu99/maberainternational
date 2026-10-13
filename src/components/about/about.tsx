"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

// TODO: set this to the actual number of years — drives the background counter.
const YEARS_EXPERIENCE = 8;

const statements = [
  "I build systems that move money safely.",
  "Pension platforms. AI agents. Trading bots. SaaS.",
  `${YEARS_EXPERIENCE} years turning complexity into shipped product.`,
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<HTMLParagraphElement[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current || !stageRef.current) return;

      const statementEls = statementRefs.current;
      gsap.set(statementEls, { opacity: 0 });
      gsap.set(statementEls[0], { opacity: 1 });

      const segment = 1 / statements.length;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: stageRef.current,
          onUpdate: (self) => {
            if (!counterRef.current) return;
            counterRef.current.textContent = Math.round(
              self.progress * YEARS_EXPERIENCE,
            ).toString();
          },
        },
      });

      timeline.to(stageRef.current, {
        backgroundColor: "#3B2418",
        ease: "none",
      });

      statementEls.forEach((el, index) => {
        const start = index * segment;

        if (index > 0) {
          timeline.fromTo(
            el,
            { opacity: 0, filter: "blur(14px)", letterSpacing: "-0.03em", scaleX: 0.9 },
            {
              opacity: 1,
              filter: "blur(0px)",
              letterSpacing: "0em",
              scaleX: 1,
              duration: segment * 0.4,
              ease: "power2.out",
            },
            start - segment * 0.15,
          );
        }

        if (index < statements.length - 1) {
          timeline.to(
            el,
            {
              opacity: 0,
              filter: "blur(14px)",
              letterSpacing: "0.1em",
              scaleX: 1.1,
              duration: segment * 0.4,
              ease: "power2.in",
            },
            start + segment * 0.6,
          );
        }
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div
      id="about"
      ref={containerRef}
      className={reducedMotion ? "" : "relative h-[300vh]"}
    >
      <div
        ref={stageRef}
        className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-charcoal px-[8vw]"
        style={reducedMotion ? { background: "var(--color-espresso)" } : undefined}
      >
        <span
          ref={counterRef}
          className="font-display pointer-events-none absolute text-[40vw] leading-none text-stone/10 select-none"
          aria-hidden
        >
          {reducedMotion ? YEARS_EXPERIENCE : 0}
        </span>

        <div
          className={
            reducedMotion
              ? "relative z-10 max-w-4xl text-center"
              : "relative z-10 h-64 w-full max-w-4xl text-center md:h-48"
          }
        >
          {statements.map((statement, index) => (
            <p
              key={statement}
              ref={(el) => {
                if (el) statementRefs.current[index] = el;
              }}
              className={
                reducedMotion
                  ? "font-display mb-6 text-3xl text-bone md:text-5xl"
                  : "font-display absolute inset-0 flex items-center justify-center text-3xl text-bone md:text-5xl"
              }
            >
              {statement}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
