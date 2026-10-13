"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shaders";
import { usePointer } from "./pointer-context";

export function LiquidShaderPlane() {
  const pointer = usePointer();
  const smoothed = useRef({ x: 0.5, y: 0.5 });
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * 0.06;
    smoothed.current.y += (1 - pointer.current.y - smoothed.current.y) * 0.06;

    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.set(smoothed.current.x, smoothed.current.y);
    material.uniforms.uResolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
