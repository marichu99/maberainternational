import * as THREE from "three";
import type { Project } from "@/data/projects";

const cache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedurally draws a gradient placeholder standing in for a real project
 * screenshot, and caches the resulting texture per project slug. Swap this
 * out for `useTexture(project.image)` once real thumbnails exist.
 */
export function getPlaceholderTexture(project: Project): THREE.CanvasTexture {
  const cached = cache.get(project.slug);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, project.colorFrom);
  gradient.addColorStop(1, project.colorTo);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(244, 241, 236, 0.85)";
  ctx.font = "600 56px Georgia, serif";
  ctx.textBaseline = "middle";
  ctx.fillText(project.name, 48, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(project.slug, texture);
  return texture;
}
