"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Project } from "@/data/projects";
import { getPlaceholderTexture } from "./texture-cache";
import { fragmentShader, vertexShader } from "./distortion-shader";

type VelocityRef = { current: { x: number; y: number } };

function PreviewPlane({
  activeProject,
  velocityRef,
}: {
  activeProject: Project | null;
  velocityRef: VelocityRef;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const opacityRef = useRef(0);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: null as THREE.Texture | null },
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    if (!activeProject || !materialRef.current) return;
    materialRef.current.uniforms.uTexture.value = getPlaceholderTexture(activeProject);
  }, [activeProject]);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;

    const target = activeProject ? 1 : 0;
    opacityRef.current += (target - opacityRef.current) * 0.15;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uVelocity.value.set(velocityRef.current.x, velocityRef.current.y);
    material.uniforms.uOpacity.value = opacityRef.current;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function CursorPreviewCanvas({
  activeProject,
  velocityRef,
}: {
  activeProject: Project | null;
  velocityRef: VelocityRef;
}) {
  return (
    <Canvas orthographic dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
      <PreviewPlane activeProject={activeProject} velocityRef={velocityRef} />
    </Canvas>
  );
}
