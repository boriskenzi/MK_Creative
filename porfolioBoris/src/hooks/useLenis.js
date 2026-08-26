import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap"
import { scrollSignal, setLenis } from "../lib/scroll"
import { DESKTOP_3D_MIN } from "../scene/capabilities"

/**
 * Smooth scroll Lenis, synchronisé avec ScrollTrigger (ne le remplace pas).
 * Désactivé sous 768px : le touch iOS/Android reste natif.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia(`(min-width: ${DESKTOP_3D_MIN}px)`).matches) return

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      respectReducedMotion: false,
    })

    const onScroll = (instance) => {
      scrollSignal.velocity = instance.velocity
      scrollSignal.direction = instance.direction
      scrollSignal.progress = instance.progress
      ScrollTrigger.update()
    }

    lenis.on("scroll", onScroll)
    setLenis(lenis)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500)
      lenis.off("scroll", onScroll)
      lenis.destroy()
      setLenis(null)
      scrollSignal.velocity = 0
      scrollSignal.direction = 0
      scrollSignal.progress = 0
    }
  }, [])
}
