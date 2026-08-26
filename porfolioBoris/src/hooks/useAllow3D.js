import { useEffect, useState } from "react"
import { canUse3D, DESKTOP_3D_MIN } from "../scene/capabilities"

export function useAllow3D() {
  const [allow, setAllow] = useState(canUse3D)

  useEffect(() => {
    const widthMq = window.matchMedia(`(min-width: ${DESKTOP_3D_MIN}px)`)
    const update = () => setAllow(canUse3D())
    update()
    widthMq.addEventListener("change", update)
    window.addEventListener("resize", update)
    return () => {
      widthMq.removeEventListener("change", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return allow
}
