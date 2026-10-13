"use client";

import { Canvas } from "@react-three/fiber";
import { LiquidShaderPlane } from "./liquid-shader-plane";

export function HeroCanvas() {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      // react-three-fiber's wrapper div hard-codes `position: relative` as an
      // *inline* style, which always wins over a `className="absolute"`
      // utility class for the same property — so the canvas was rendering as
      // a normal in-flow flex item (sharing the hero row ~50/50 with the
      // text column) instead of covering it. Passing `style` here lands in
      // the same inline attribute R3F builds, so it actually overrides it.
      style={{ position: "absolute", inset: 0 }}
    >
      <LiquidShaderPlane />
    </Canvas>
  );
}
