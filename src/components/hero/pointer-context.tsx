"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

type PointerPosition = { x: number; y: number };
type PointerRef = { current: PointerPosition };

const PointerContext = createContext<PointerRef | null>(null);

/**
 * Tracks raw normalized pointer position [0,1] in a mutable ref, not state,
 * so mouse-reactive shaders/fonts can read it every frame without triggering
 * React re-renders. Consumers do their own smoothing/lerp per frame.
 */
export function PointerProvider({ children }: { children: ReactNode }) {
  const pointer = useRef<PointerPosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth;
      pointer.current.y = event.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return <PointerContext.Provider value={pointer}>{children}</PointerContext.Provider>;
}

export function usePointer() {
  const ctx = useContext(PointerContext);
  if (!ctx) throw new Error("usePointer must be used within PointerProvider");
  return ctx;
}
