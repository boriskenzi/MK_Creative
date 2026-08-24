import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { gsap } from "../lib/gsap"

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
      {services.map((s, i) => (
        <li key={s.title} className="border-b" style={{ borderColor: "var(--line)" }}>
          <button
            type="button"
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-display text-[22px] uppercase tracking-wide md:text-[32px] md:leading-[1.3]">
              {s.n}. {s.title}
            </span>
            <ChevronDown
              className="h-5 w-5 shrink-0 transition-transform duration-300"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
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
            <ul className="space-y-2 pb-5 text-[18px] font-light leading-[1.5]">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}
