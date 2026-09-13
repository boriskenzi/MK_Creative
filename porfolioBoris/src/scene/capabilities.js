import { prefersReducedMotion } from "../lib/gsap"

/** Seuil desktop : tilt, portrait 3D, Lenis. Le fond 3D joue aussi sur mobile. */
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

export function isDesktopWidth() {
  if (typeof window === "undefined") return false
  return window.innerWidth >= DESKTOP_3D_MIN
}

/** Fond 3D : GPU dispo, pas `?reduced`. Mobile inclus. */
export function canUse3D() {
  if (typeof window === "undefined") return false
  if (prefersReducedMotion()) return false
  return hasWebGL()
}

/** Second canvas (portrait héro) : desktop seulement. */
export function canUseHero3D() {
  return canUse3D() && isDesktopWidth()
}

/** Tilt CSS : souris fine, desktop, pas `?reduced`. */
export function canUseTilt() {
  if (typeof window === "undefined") return false
  if (prefersReducedMotion()) return false
  if (!isDesktopWidth()) return false
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}
