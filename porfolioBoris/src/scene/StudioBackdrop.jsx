import { lazy, Suspense, useEffect, useState } from "react"
import { useTheme } from "../hooks/useTheme"
import { useAllow3D } from "../hooks/useAllow3D"

const StudioField = lazy(() => import("./StudioField"))

export default function StudioBackdrop() {
  const allow = useAllow3D()
  const { theme } = useTheme()
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!allow) return
    const onVis = () => setPlaying(document.visibilityState === "visible")
    onVis()
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [allow])

  if (!allow) return null

  return (
    <div className="studio-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Suspense fallback={null}>
        <StudioField playing={playing} theme={theme} />
      </Suspense>
    </div>
  )
}
