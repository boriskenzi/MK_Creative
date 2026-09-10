import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { getLenis } from "../lib/scroll"

export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null)
  const startX = useRef(null)
  const item = items[index]
  const total = items.length

  useEffect(() => {
    const previous = document.activeElement
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = "hidden"
    document.body.setAttribute("data-lightbox-open", "")
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") onIndex((current) => (current - 1 + total) % total)
      if (event.key === "ArrowRight") onIndex((current) => (current + 1) % total)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      document.body.removeAttribute("data-lightbox-open")
      lenis?.start()
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [onClose, onIndex, total])

  if (!item) return null

  const go = (direction) => {
    onIndex((current) => (current + direction + total) % total)
  }

  const onPointerDown = (event) => {
    startX.current = event.clientX
  }
  const onPointerUp = (event) => {
    if (startX.current == null) return
    const delta = event.clientX - startX.current
    startX.current = null
    if (delta > 56) go(-1)
    if (delta < -56) go(1)
  }

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.alt}. ${index + 1} sur ${total}`}
      onClick={onClose}
    >
      <div className="lightbox-bar">
        <p className="font-display text-[15px] uppercase tracking-[0.06em]" style={{ color: "var(--fg-soft)" }}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-btn"
          onClick={onClose}
          aria-label="Fermer la visionneuse"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>

      <div
        className="lightbox-stage"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {total > 1 && (
          <button type="button" className="lightbox-nav lightbox-nav-prev" onClick={() => go(-1)} aria-label="Visuel précédent">
            <ChevronLeft className="h-6 w-6" strokeWidth={1.6} />
          </button>
        )}
        <img src={item.src} alt={item.alt} />
        {total > 1 && (
          <button type="button" className="lightbox-nav lightbox-nav-next" onClick={() => go(1)} aria-label="Visuel suivant">
            <ChevronRight className="h-6 w-6" strokeWidth={1.6} />
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
