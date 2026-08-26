import { useEffect, useRef } from "react"
import { useAllowTilt } from "../hooks/useAllowTilt"

/**
 * Cadre perspective CSS — tilt souris + ombre en transform uniquement.
 */
export default function TiltFrame({ children, className = "", intensity = 1, radius = 24 }) {
  const allow = useAllowTilt()
  const wrapRef = useRef(null)
  const faceRef = useRef(null)
  const shadeRef = useRef(null)
  const target = useRef({ rx: 0, ry: 0, sx: 0, sy: 8, lift: 0, active: false })
  const current = useRef({ rx: 0, ry: 0, sx: 0, sy: 8, lift: 0 })
  const raf = useRef(0)
  const tickRef = useRef(() => {})

  useEffect(() => {
    if (!allow) return

    tickRef.current = () => {
      const t = target.current
      const c = current.current
      c.rx += (t.rx - c.rx) * 0.14
      c.ry += (t.ry - c.ry) * 0.14
      c.sx += (t.sx - c.sx) * 0.14
      c.sy += (t.sy - c.sy) * 0.14
      c.lift += (t.lift - c.lift) * 0.14

      if (faceRef.current) {
        faceRef.current.style.transform = `rotateX(${c.rx}deg) rotateY(${c.ry}deg) translateZ(${c.lift}px)`
      }
      if (shadeRef.current) {
        shadeRef.current.style.transform = `translate3d(${c.sx}px, ${c.sy}px, -24px)`
        shadeRef.current.style.opacity = String(0.12 + Math.hypot(c.rx, c.ry) * 0.01)
      }

      const settling = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry) + Math.abs(c.lift - t.lift) > 0.04
      if (t.active || settling) {
        raf.current = requestAnimationFrame(tickRef.current)
      } else {
        raf.current = 0
      }
    }

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = 0
    }
  }, [allow])

  const kick = () => {
    if (raf.current) return
    raf.current = requestAnimationFrame(() => {
      raf.current = 0
      tickRef.current()
    })
  }

  const onPointerMove = (event) => {
    if (!allow || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
    target.current.ry = x * 11 * intensity
    target.current.rx = -y * 8 * intensity
    target.current.sx = x * 16 * intensity
    target.current.sy = 12 + y * 10 * intensity
    target.current.lift = 14 * intensity
    target.current.active = true
    kick()
  }

  const onPointerLeave = () => {
    target.current.rx = 0
    target.current.ry = 0
    target.current.sx = 0
    target.current.sy = 10
    target.current.lift = 0
    target.current.active = false
    kick()
  }

  return (
    <div
      ref={wrapRef}
      data-tilt={allow ? "on" : "off"}
      className={`card-tilt ${className}`.trim()}
      onPointerMove={allow ? onPointerMove : undefined}
      onPointerLeave={allow ? onPointerLeave : undefined}
    >
      {allow ? (
        <div ref={shadeRef} className="card-tilt-shade" aria-hidden style={{ borderRadius: radius }} />
      ) : null}
      <div ref={faceRef} className="card-tilt-face">
        {children}
      </div>
    </div>
  )
}
