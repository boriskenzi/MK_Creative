import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { scrollToTop } from "../lib/scroll"

const SHOW_AFTER = 420

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > SHOW_AFTER)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => scrollToTop({ immediate: false })}
      aria-label="Remonter en haut de la page"
      className="back-to-top fixed left-4 z-40 grid h-12 w-12 place-items-center rounded-full border shadow-sm"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        background: "var(--nav)",
        borderColor: "var(--line)",
        color: "var(--fg)",
      }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.7} />
    </button>
  )
}
