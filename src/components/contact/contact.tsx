"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

// TODO: replace with the business's real public email once registered.
const CONTACT_EMAIL = "hello@maberainternational.com";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !headlineRef.current) return;

      gsap.fromTo(
        headlineRef.current,
        { scaleX: 0.75, letterSpacing: "-0.02em" },
        {
          scaleX: 1,
          letterSpacing: "0em",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-bone px-[6vw] text-center text-charcoal"
    >
      <h2
        ref={headlineRef}
        className="font-display origin-center text-[14vw] leading-[0.9]"
      >
        Let&apos;s automate
      </h2>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        data-magnetic
        className="font-display inline-block rounded-full border border-charcoal px-8 py-4 text-xl transition-colors hover:bg-charcoal hover:text-bone"
      >
        {CONTACT_EMAIL}
      </a>
    </section>
  );
}
