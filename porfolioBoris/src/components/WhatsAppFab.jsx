import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { useLocation } from "react-router-dom"
import { content } from "../data/content"

export default function WhatsAppFab() {
  const location = useLocation()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const nodes = [document.getElementById("contact"), document.querySelector("footer")].filter(Boolean)
    if (!nodes.length) {
      setVisible(true)
      return
    }
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => seen.set(entry.target, entry.isIntersecting))
        setVisible(![...seen.values()].some(Boolean))
      },
      { threshold: 0.12 },
    )
    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [location.pathname])

  if (!visible) return null

  return (
    <a
      href={`https://wa.me/${content.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab fixed right-4 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14px] font-medium text-white shadow-lg md:hidden"
      style={{
        background: "var(--color-accent)",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
      aria-label="Écrire sur WhatsApp"
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} />
      WhatsApp
    </a>
  )
}
