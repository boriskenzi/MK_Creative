import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "../lib/gsap"

/** Défilement infini vers la gauche, indépendant des boucles CSS (coupées sous Windows). */
export function useMarquee(pixelsPerSecond = 80) {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    let tween
    const play = () => {
      tween?.kill()
      gsap.set(track, { x: 0 })
      const first = track.children[0]
      const distance = first?.offsetWidth || 0
      if (distance < 8) return
      tween = gsap.to(track, {
        x: -distance,
        duration: Math.max(distance / pixelsPerSecond, 10),
        ease: "none",
        repeat: -1,
      })
    }

    play()

    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)")
    const pause = () => tween?.pause()
    const resume = () => tween?.resume()
    const onResize = () => play()

    if (fineHover.matches) {
      track.addEventListener("pointerenter", pause)
      track.addEventListener("pointerleave", resume)
    }
    window.addEventListener("resize", onResize)

    return () => {
      tween?.kill()
      track.removeEventListener("pointerenter", pause)
      track.removeEventListener("pointerleave", resume)
      window.removeEventListener("resize", onResize)
    }
  }, [pixelsPerSecond])

  return trackRef
}
