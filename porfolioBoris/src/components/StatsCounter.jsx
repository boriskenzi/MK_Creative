import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion, MOTION, SCROLL_DEBUG } from "../lib/gsap"

export default function StatsCounter({ value, suffix = "", label, accent = false, inverse = false }) {
  const numRef = useRef(null)
  const wrapRef = useRef(null)

  useLayoutEffect(() => {
    const el = numRef.current
    const trigger = wrapRef.current
    if (!el || !trigger) return

    const obj = { n: 0 }
    const reduce = prefersReducedMotion()

    if (reduce) {
      el.textContent = `${value}${suffix}`
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 0.8,
        ease: MOTION.ease,
        overwrite: "auto",
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`
        },
        scrollTrigger: {
          trigger,
          start: MOTION.start,
          toggleActions: MOTION.toggleActions,
          once: true,
          markers: SCROLL_DEBUG,
        },
      })
    }, trigger)

    return () => ctx.revert()
  }, [value, suffix])

  return (
    <div ref={wrapRef}>
      <p
        ref={numRef}
        className="font-display text-[48px] font-bold leading-none md:text-[60px]"
        style={{ color: inverse ? "#fff" : accent ? "var(--stat)" : "var(--fg)" }}
      >
        0{suffix}
      </p>
      <p className="mt-2 text-[16px] font-semibold leading-[1.3]" style={{ color: inverse ? "#fff" : undefined }}>
        {label}
      </p>
    </div>
  )
}
