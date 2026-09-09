import { useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { gsap, prefersReducedMotion, MOTION } from "../lib/gsap"
import { content } from "../data/content"
import { tarifFamilies, tarifPage } from "../data/tarifs"

function askWhatsApp(familyLabel, groupTitle, pack) {
  const text = [
    "Bonjour MK Creative,",
    "",
    `Je suis intéressé par : ${familyLabel} — ${groupTitle}.`,
    `Formule : ${pack.name} (${pack.price}).`,
    "",
    "Pouvez-vous me confirmer la disponibilité ?",
  ].join("\n")
  window.open(`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank")
}

function PackRow({ pack, familyLabel, groupTitle, open, onToggle }) {
  const featured = Boolean(pack.badge)
  return (
    <article
      className="tarif-row overflow-hidden border-b"
      style={{ borderColor: "var(--line)" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 py-5 text-left md:items-center md:gap-6 md:py-6"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[22px] uppercase leading-[1.15] md:text-[28px]">{pack.name}</h3>
            {pack.badge && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                {pack.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[14px] font-light leading-[1.45] md:text-[15px]" style={{ color: "var(--fg-soft)" }}>
            {pack.summary}
            {pack.hours ? ` • ${pack.hours}` : ""}
          </p>
        </div>
        <p
          className="shrink-0 text-right font-display text-[20px] uppercase leading-none md:text-[28px]"
          style={{ color: featured ? "var(--color-accent)" : "var(--fg)" }}
        >
          {pack.price}
        </p>
        <ChevronDown
          className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 md:mt-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "var(--fg-soft)" }}
          strokeWidth={1.5}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 pb-6 md:flex-row md:items-end md:justify-between">
            <ul className="space-y-2 text-[15px] font-light leading-[1.5] md:text-[16px]">
              {pack.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="service-bullet" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => askWhatsApp(familyLabel, groupTitle, pack)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full px-6 py-2.5 font-display text-[15px] uppercase tracking-wide"
              style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
            >
              {pack.price === "Sur devis" ? tarifPage.devis : tarifPage.cta}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TarifSheet() {
  const firstFeatured = tarifFamilies[0].groups[0].packs.findIndex((p) => p.badge)
  const [familyId, setFamilyId] = useState(tarifFamilies[0].id)
  const [groupId, setGroupId] = useState(tarifFamilies[0].groups[0].id)
  const [openPack, setOpenPack] = useState(firstFeatured >= 0 ? firstFeatured : 0)
  const sheetRef = useRef(null)

  const family = tarifFamilies.find((f) => f.id === familyId) || tarifFamilies[0]
  const group = family.groups.find((g) => g.id === groupId) || family.groups[0]

  const selectFamily = (id) => {
    const next = tarifFamilies.find((f) => f.id === id)
    if (!next) return
    setFamilyId(id)
    setGroupId(next.groups[0].id)
    const featured = next.groups[0].packs.findIndex((p) => p.badge)
    setOpenPack(featured >= 0 ? featured : 0)
  }

  const selectGroup = (id) => {
    setGroupId(id)
    const g = family.groups.find((item) => item.id === id)
    const featured = g?.packs.findIndex((p) => p.badge) ?? 0
    setOpenPack(featured >= 0 ? featured : 0)
  }

  useLayoutEffect(() => {
    const el = sheetRef.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: MOTION.ease, overwrite: "auto" },
      )
    }, el)
    return () => ctx.revert()
  }, [familyId, groupId])

  return (
    <div>
      <div className="sticky top-20 z-20 -mx-1 mb-8 bg-[color:color-mix(in_srgb,var(--bg)_88%,transparent)] px-1 py-3 backdrop-blur-xl md:top-24">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tarifFamilies.map((item) => {
            const active = item.id === familyId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectFamily(item.id)}
                className="shrink-0 rounded-full px-5 py-2.5 font-display text-[15px] uppercase tracking-wide transition-colors duration-300"
                style={
                  active
                    ? { background: "var(--inverse)", color: "var(--inverse-fg)" }
                    : { background: "var(--card)", color: "var(--fg)" }
                }
              >
                {item.label}
              </button>
            )
          })}
        </div>
        {family.groups.length > 1 && (
          <div className="mt-3 flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {family.groups.map((item) => {
              const active = item.id === groupId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectGroup(item.id)}
                  className="shrink-0 border-b-2 px-3 py-2 text-[14px] font-light transition-colors duration-300"
                  style={{
                    borderColor: active ? "var(--color-accent)" : "transparent",
                    color: active ? "var(--fg)" : "var(--fg-soft)",
                  }}
                >
                  {item.title}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div ref={sheetRef} className="tarif-sheet">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[32px] font-bold uppercase leading-[1.1] md:text-[48px]">{group.title}</h2>
          {group.note && (
            <p className="max-w-[420px] text-[14px] font-light leading-[1.45] md:text-right" style={{ color: "var(--fg-soft)" }}>
              {group.note}
            </p>
          )}
        </div>

        <div className="border-t" style={{ borderColor: "var(--line)" }}>
          {group.packs.map((pack, i) => (
            <PackRow
              key={pack.name}
              pack={pack}
              familyLabel={family.label}
              groupTitle={group.title}
              open={openPack === i}
              onToggle={() => setOpenPack((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </div>

        {group.extras?.length > 0 && (
          <div className="mt-10">
            <p className="font-display text-[18px] uppercase" style={{ color: "var(--fg-soft)" }}>
              Options à la carte
            </p>
            <ul className="mt-4 divide-y" style={{ borderColor: "var(--line)" }}>
              {group.extras.map((extra) => (
                <li
                  key={extra.name}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="text-[16px] font-light">{extra.name}</span>
                  <span className="font-display text-[18px] uppercase" style={{ color: "var(--color-accent)" }}>
                    {extra.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
