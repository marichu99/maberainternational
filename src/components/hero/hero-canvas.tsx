"use client";

import { Canvas } from "@react-three/fiber";
import { LiquidShaderPlane } from "./liquid-shader-plane";

export function HeroCanvas() {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      gl={{ antialias: false }}
      className="absolute inset-0"
    >
      <LiquidShaderPlane />
    </Canvas>
  );
}
