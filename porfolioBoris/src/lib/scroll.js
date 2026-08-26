/** Instance Lenis + signal de scroll (vitesse / direction) pour la scène 3D. */

export const scrollSignal = {
  velocity: 0,
  direction: 0,
  progress: 0,
}

let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
    return
  }
  window.scrollTo({ top: 0, behavior: "auto" })
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
