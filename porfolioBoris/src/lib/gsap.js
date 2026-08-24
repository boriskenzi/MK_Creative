import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)

CustomEase.create("framerEase", "0.16, 1, 0.3, 1")

/** `?debug` affiche les markers ScrollTrigger */
export const SCROLL_DEBUG =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debug")

export const MOTION = {
  ease: "framerEase",
  duration: 0.75,
  stagger: 0.1,
  y: 48,
  scale: 0.96,
  start: "top 85%",
  toggleActions: "play none none none",
}

gsap.defaults({ ease: MOTION.ease })

export { gsap, ScrollTrigger }

/**
 * Kill-switch GSAP volontaire uniquement :
 * - `?reduced` force l’arrêt
 * - `?motion` force le jeu
 *
 * On n’utilise PAS `prefers-reduced-motion` OS comme coupe-circuit GSAP.
 * Sur Windows, « Effets d’animation » OFF déclenche ce media query et fige
 * tout le portfolio — ce n’est en général pas un choix d’accessibilité web.
 * Les boucles CSS (marquee, orbe) restent coupées dans index.css.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  const params = new URLSearchParams(window.location.search)
  if (params.has("reduced")) return true
  if (params.has("motion")) return false
  return false
}

export function osPrefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function logMotionStatus() {
  if (typeof window === "undefined") return
  const osReduced = osPrefersReducedMotion()
  const reduced = prefersReducedMotion()
  const count = ScrollTrigger.getAll().length
  const reveals = document.querySelectorAll("[data-reveal]").length

  console.info(
    `%c[MK Portfolio] GSAP ${reduced ? "OFF (?reduced)" : "ON"}%c · triggers=${count} · [data-reveal]=${reveals}` +
      (osReduced ? " · OS prefers-reduced-motion (CSS loops paused, GSAP plays)" : ""),
    reduced ? "color:#c45;font-weight:bold" : "color:#5e67e6;font-weight:bold",
    "color:inherit",
  )

  if (osReduced && !reduced) {
    console.info(
      "[MK Portfolio] Windows a « Réduire les animations » : les boucles CSS sont en pause. " +
        "Les reveals GSAP jouent quand même. Ajoute ?reduced pour tout couper, ?debug pour les markers.",
    )
  }
}

export function scheduleScrollRefresh() {
  const refresh = () => ScrollTrigger.refresh()
  refresh()
  requestAnimationFrame(refresh)
  window.setTimeout(refresh, 80)
  window.setTimeout(refresh, 320)
  window.setTimeout(refresh, 900)
}

if (typeof window !== "undefined") {
  const onLoad = () => ScrollTrigger.refresh()
  if (document.readyState === "complete") {
    requestAnimationFrame(onLoad)
  } else {
    window.addEventListener("load", onLoad, { once: true })
  }
}
