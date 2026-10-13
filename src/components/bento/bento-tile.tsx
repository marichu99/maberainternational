"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function BentoTile({
  children,
  className,
  onToggleExpand,
}: {
  children: ReactNode;
  className?: string;
  onToggleExpand?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 15 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 14);
    rawRotateX.set(-py * 14);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggleExpand?.();
  };

  return (
    <motion.div
      ref={ref}
      layout
      role={onToggleExpand ? "button" : undefined}
      tabIndex={onToggleExpand ? 0 : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onToggleExpand}
      onKeyDown={handleKeyDown}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative cursor-pointer rounded-sm border border-stone/20 bg-graphite p-6 transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper hover:shadow-[0_0_40px_-12px_var(--color-copper)] ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
