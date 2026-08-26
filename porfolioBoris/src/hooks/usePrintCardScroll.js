import { useEffect, useLayoutEffect, useState } from "react"
import { gsap, prefersReducedMotion, SCROLL_DEBUG, scheduleScrollRefresh } from "../lib/gsap"
import { DESKTOP_3D_MIN } from "../scene/capabilities"
import {
  PRINT_ORIGIN,
  printLeaveFrom,
  printLeaveTo,
  printObliqueFrom,
  printObliqueTo,
  printVersoFrom,
  printVersoTo,
} from "../scene/printMotion"

function isLightViewport() {
  return typeof window !== "undefined" && window.innerWidth < DESKTOP_3D_MIN
}

/**
 * Carte Hero qui se recule, portraits suivants qui arrivent en verso.
 * Scrub ScrollTrigger — pas de Canvas supplémentaire.
 */
export function usePrintCardScroll(rootRef) {
  const [light, setLight] = useState(isLightViewport)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_3D_MIN}px)`)
    const update = () => setLight(!mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const hero = root.querySelector("[data-print-hero]")
    const leave = root.querySelector('[data-print="leave"]')
    const verso = root.querySelector('[data-print="verso"]')
    const oblique = root.querySelector('[data-print="oblique"]')

    const reduced = prefersReducedMotion()
    const base = {
      force3D: !light,
      transformOrigin: PRINT_ORIGIN,
      transformPerspective: 1280,
    }

    if (reduced) {
      if (leave) gsap.set(leave, { ...printLeaveFrom(), ...base })
      if (verso) gsap.set(verso, { ...printVersoTo(), ...base })
      if (oblique) gsap.set(oblique, { ...printObliqueTo(), ...base })
      return
    }

    const ctx = gsap.context(() => {
      if (leave && hero) {
        gsap.set(leave, { ...printLeaveFrom(), ...base })
        gsap.to(leave, {
          ...printLeaveTo(light),
          ...base,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.45,
            markers: SCROLL_DEBUG,
            invalidateOnRefresh: true,
          },
        })
      }

      const arrive = (el, from, to) => {
        if (!el) return
        gsap.set(el, { ...from, ...base })
        gsap.to(el, {
          ...to,
          ...base,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 46%",
            scrub: 0.55,
            markers: SCROLL_DEBUG,
            invalidateOnRefresh: true,
          },
        })
      }

      arrive(verso, printVersoFrom(light), printVersoTo())
      arrive(oblique, printObliqueFrom(light), printObliqueTo())
    }, root)

    scheduleScrollRefresh()
    return () => ctx.revert()
  }, [rootRef, light])
}
