import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { content } from "../data/content"
import StatsCounter from "./StatsCounter"

function Stars() {
  return (
    <div className="mb-4 flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-[12px] leading-none" style={{ color: "var(--color-accent)" }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsSlider() {
  const items = content.testimonials.items
  const highlights = content.testimonials.highlights
  const [index, setIndex] = useState(0)
  const pair = [items[index % items.length], items[(index + 1) % items.length]]
  const highlight = highlights[index % highlights.length]

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {pair.map((t) => (
          <article key={t.name} className="rounded-[28px] p-6" style={{ background: "var(--card)" }}>
            <Stars />
            <p className="text-[14px] font-light leading-[1.5]">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-[14px] font-semibold leading-none">{t.name}</p>
                <p className="mt-1 text-[14px] font-light">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
        <article className="rounded-[28px] p-6 text-white" style={{ background: "#111111" }}>
          <p className="text-[14px] font-light leading-[1.5]">{highlight.kicker}</p>
          <div className="mt-6">
            <StatsCounter value={highlight.value} suffix={highlight.suffix} label={highlight.label} inverse />
          </div>
        </article>
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="grid h-10 w-10 place-items-center rounded-full border"
          style={{ borderColor: "var(--line)" }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="grid h-10 w-10 place-items-center rounded-full border"
          style={{ borderColor: "var(--line)" }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
