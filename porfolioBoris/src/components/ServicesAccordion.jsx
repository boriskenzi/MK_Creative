import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { gsap } from "../lib/gsap"

function itemLabel(item) {
  return typeof item === "string" ? item : item.label
}

export default function ServicesAccordion({ services }) {
  const [open, setOpen] = useState(0)
  const panels = useRef([])

  const toggle = (i) => {
    const next = open === i ? -1 : i
    panels.current.forEach((panel, idx) => {
      if (!panel) return
      gsap.to(panel, {
        height: idx === next ? panel.scrollHeight : 0,
        duration: 0.55,
        ease: "framerEase",
        overwrite: "auto",
      })
    })
    setOpen(next)
  }

  return (
    <ul className="divide-y" style={{ borderColor: "var(--line)" }}>
      {services.map((s, i) => {
        const active = open === i
        return (
          <li key={s.title} className="border-b" style={{ borderColor: "var(--line)" }}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className={`service-trigger flex min-h-12 w-full items-center justify-between gap-4 py-4 text-left md:py-5 ${active ? "is-open" : ""}`}
            >
              <span className="font-display text-[22px] uppercase tracking-wide md:text-[28px] md:leading-[1.25] lg:text-[32px]">
                {s.n}. {s.title}
              </span>
              <ChevronDown
                className="h-5 w-5 shrink-0 transition-transform duration-300"
                style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
                strokeWidth={1.5}
              />
            </button>
            <div
              ref={(el) => {
                panels.current[i] = el
                if (el && i === 0 && el.style.height === "") el.style.height = `${el.scrollHeight}px`
                if (el && i !== 0 && !el.style.height) el.style.height = "0px"
              }}
              className="overflow-hidden"
              style={{ height: i === 0 ? "auto" : 0 }}
            >
              <ul className="space-y-3 pb-5">
                {s.items.map((item) => (
                  <li
                    key={itemLabel(item)}
                    className="service-item flex items-start gap-3 text-[17px] font-light leading-[1.55] md:text-[18px]"
                  >
                    <span className="service-bullet" aria-hidden />
                    <span>{itemLabel(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
