import { useEffect, useState } from "react"
import { canUseTilt, DESKTOP_3D_MIN } from "../scene/capabilities"

export function useAllowTilt() {
  const [allow, setAllow] = useState(canUseTilt)

  useEffect(() => {
    const widthMq = window.matchMedia(`(min-width: ${DESKTOP_3D_MIN}px)`)
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setAllow(canUseTilt())
    update()
    widthMq.addEventListener("change", update)
    hoverMq.addEventListener("change", update)
    window.addEventListener("resize", update)
    return () => {
      widthMq.removeEventListener("change", update)
      hoverMq.removeEventListener("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return allow
}
