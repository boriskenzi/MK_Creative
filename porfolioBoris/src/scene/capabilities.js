import { prefersReducedMotion } from "../lib/gsap"

/** Aligné sur le carousel de ProjectStack. */
export const DESKTOP_3D_MIN = 768

let webglMemo = null

export function hasWebGL() {
  if (webglMemo !== null) return webglMemo
  if (typeof document === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    webglMemo = Boolean(gl)
    gl?.getExtension?.("WEBGL_lose_context")?.loseContext()
    return webglMemo
  } catch {
    webglMemo = false
    return false
  }
}

/** 3D WebGL : desktop, GPU dispo, et pas `?reduced`. */
export function canUse3D() {
  if (typeof window === "undefined") return false
  if (prefersReducedMotion()) return false
  if (window.innerWidth < DESKTOP_3D_MIN) return false
  return hasWebGL()
}

/** Tilt CSS : souris fine, desktop, pas `?reduced`. */
export function canUseTilt() {
  if (typeof window === "undefined") return false
  if (prefersReducedMotion()) return false
  if (window.innerWidth < DESKTOP_3D_MIN) return false
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}
