/** Instance Lenis + signal de scroll (vitesse / direction) pour la scène 3D. */

export const scrollSignal = {
  velocity: 0,
  direction: 0,
  progress: 0,
}

/** Plafond en px/tick : assez pour un vrai scroll, trop peu pour un emballement. */
const MAX_VELOCITY = 24
/** ~0.35 s pour retomber à l’idle après le dernier tick de scroll. */
const VELOCITY_DECAY = 10
const VELOCITY_REST = 0.04
const MAX_DELTA = 1 / 30

let motionStamp = -1
let motionDt = 1 / 60
let motionBoost = 0
let motionDir = 0
let motionProgress = 0

export function clampScrollVelocity(value) {
  if (!Number.isFinite(value)) return 0
  return Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, value))
}

export function resetScrollVelocity() {
  scrollSignal.velocity = 0
  motionBoost = 0
  motionStamp = -1
}

function captureScrollMotion(delta) {
  const now = typeof performance !== "undefined" ? performance.now() : 0
  if (motionStamp >= 0 && now - motionStamp < 2) return

  motionStamp = now
  motionDt = Math.min(Math.max(delta, 0), MAX_DELTA)
  const v = clampScrollVelocity(scrollSignal.velocity)
  // Même amplitude qu’avant à 60 fps (`v * coeff` par frame), plus de 2× à 120 Hz.
  motionBoost = v * motionDt * 60
  motionDir = scrollSignal.direction
  motionProgress = scrollSignal.progress

  scrollSignal.velocity *= Math.exp(-VELOCITY_DECAY * motionDt)
  if (Math.abs(scrollSignal.velocity) < VELOCITY_REST) {
    scrollSignal.velocity = 0
  }
}

/** Vitesse de scroll lue une fois par frame, puis amortie vers 0. */
export function readScrollMotion(delta) {
  captureScrollMotion(delta)
  return {
    dt: motionDt,
    boost: motionBoost,
    dir: motionDir,
    progress: motionProgress,
  }
}

let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToTop({ immediate = true } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate })
    return
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" })
}

export function scrollToTarget(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, options)
    return
  }
  const el =
    typeof target === "string"
      ? document.querySelector(target) || document.getElementById(target.replace(/^#/, ""))
      : target
  el?.scrollIntoView({ behavior: options.immediate ? "auto" : "smooth" })
}
