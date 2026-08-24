import { useEffect } from "react"
import { logMotionStatus, scheduleScrollRefresh } from "../lib/gsap"

/** Recalcule ScrollTrigger après layout (images, fonts, pin, changement de route). */
export function useGsapRefresh(deps = []) {
  useEffect(() => {
    scheduleScrollRefresh()

    const onLoad = () => scheduleScrollRefresh()
    window.addEventListener("load", onLoad)

    document.fonts?.ready?.then(scheduleScrollRefresh)

    const images = [...document.images]
    const pending = images.filter((img) => !img.complete)
    const onImg = () => scheduleScrollRefresh()
    pending.forEach((img) => {
      img.addEventListener("load", onImg, { once: true })
      img.addEventListener("error", onImg, { once: true })
    })

    const t = window.setTimeout(logMotionStatus, 400)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener("load", onLoad)
      pending.forEach((img) => {
        img.removeEventListener("load", onImg)
        img.removeEventListener("error", onImg)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
