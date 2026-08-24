import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <ul>
      {items.map((item, i) => {
        const active = open === i
        return (
          <li key={item.question} className="border-b" style={{ borderColor: "var(--line)" }}>
            <button
              type="button"
              onClick={() => setOpen(active ? -1 : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="flex gap-4">
                <span className="font-display text-[28px] md:text-[32px]">{String(i + 1).padStart(1, "0")}.</span>
                <span className="font-display text-[22px] uppercase leading-[1.3] md:text-[32px]">
                  {item.question}
                </span>
              </span>
              {active ? <Minus className="mt-2 h-5 w-5 shrink-0" /> : <Plus className="mt-2 h-5 w-5 shrink-0" />}
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[720px] pb-6 pl-0 text-[16px] font-light leading-[1.6] md:pl-12">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
