import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useTheme } from "../hooks/useTheme"
import { useAllow3D } from "../hooks/useAllow3D"
import GreetingOrb from "../components/GreetingOrb"

const HeroPortrait = lazy(() => import("./HeroPortrait"))

function StaticPortrait({ src, alt }) {
  return <img src={src} alt={alt} className="aspect-[4/5] w-full rounded-[32px] object-cover" />
}

export default function HeroMedia({ src, alt }) {
  const allow = useAllow3D()
  const { theme } = useTheme()
  const wrapRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0, active: false })
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !allow) return
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), {
      rootMargin: "80px",
      threshold: 0.05,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [allow])

  const onPointerMove = (event) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
    pointer.current.active = true
  }

  const onPointerLeave = () => {
    pointer.current.active = false
  }

  return (
    <div
      ref={wrapRef}
      className="hero-portrait relative aspect-[4/5] w-full"
      onPointerMove={allow ? onPointerMove : undefined}
      onPointerLeave={allow ? onPointerLeave : undefined}
    >
      {allow ? (
        <Suspense fallback={<StaticPortrait src={src} alt={alt} />}>
          <HeroPortrait src={src} playing={playing} theme={theme} pointer={pointer} />
        </Suspense>
      ) : (
        <StaticPortrait src={src} alt={alt} />
      )}
      <GreetingOrb toContact className="absolute -left-2 bottom-6 md:-left-6 md:bottom-8" />
    </div>
  )
}
