import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap"
import { clampScrollVelocity, resetScrollVelocity, scrollSignal, setLenis } from "../lib/scroll"
import { DESKTOP_3D_MIN } from "../scene/capabilities"

/**
 * Smooth scroll Lenis, synchronisé avec ScrollTrigger (ne le remplace pas).
 * Désactivé sous 768px : le touch iOS/Android reste natif, le signal 3D suit window.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia(`(min-width: ${DESKTOP_3D_MIN}px)`).matches) {
      let lastY = window.scrollY
      const onNativeScroll = () => {
        const y = window.scrollY
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const dy = y - lastY
        lastY = y
        scrollSignal.progress = Math.min(1, Math.max(0, y / max))
        scrollSignal.velocity = clampScrollVelocity(dy)
        scrollSignal.direction = dy > 0.4 ? 1 : dy < -0.4 ? -1 : 0
      }
      onNativeScroll()
      window.addEventListener("scroll", onNativeScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", onNativeScroll)
        resetScrollVelocity()
        scrollSignal.direction = 0
        scrollSignal.progress = 0
      }
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      respectReducedMotion: false,
    })

    const onScroll = (instance) => {
      scrollSignal.velocity = clampScrollVelocity(instance.velocity)
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
      resetScrollVelocity()
      scrollSignal.direction = 0
      scrollSignal.progress = 0
    }
  }, [])
}
