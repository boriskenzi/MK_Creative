import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion, MOTION, SCROLL_DEBUG, scheduleScrollRefresh } from "../lib/gsap"

/**
 * Reveal au scroll — un tween + ScrollTrigger par `[data-reveal]`.
 * useLayoutEffect + gsap.context : pas de tween orphelin après un unmount (HMR / navigation).
 */
export function useScrollReveal() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = gsap.utils.toArray("[data-reveal]", root)
    const els = targets.length ? targets : [root]

    if (SCROLL_DEBUG) {
      console.info("[reveal] éléments trouvés:", els.length, root)
    }

    if (prefersReducedMotion()) {
      gsap.set(els, { clearProps: "transform,opacity,visibility" })
      return
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: MOTION.y, autoAlpha: 0, scale: MOTION.scale },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: MOTION.duration,
            ease: MOTION.ease,
            overwrite: "auto",
            immediateRender: true,
            scrollTrigger: {
              trigger: el,
              start: MOTION.start,
              toggleActions: MOTION.toggleActions,
              once: true,
              markers: SCROLL_DEBUG,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, root)

    scheduleScrollRefresh()
    return () => ctx.revert()
  }, [])

  return ref
}
