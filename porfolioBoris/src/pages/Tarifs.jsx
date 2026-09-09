import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion, MOTION, scheduleScrollRefresh } from "../lib/gsap"
import { tarifPage, tarifConditions } from "../data/tarifs"
import TarifSheet from "../components/TarifSheet"
import ContactSection from "../components/ContactSection"
import { useScrollReveal } from "../hooks/useScrollReveal"

export default function Tarifs() {
  const heroRef = useRef(null)
  const sheetRef = useScrollReveal()
  const termsRef = useScrollReveal()

  useLayoutEffect(() => {
    const root = heroRef.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-hero]"),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: MOTION.stagger,
          delay: 0.08,
          ease: MOTION.ease,
          overwrite: "auto",
          immediateRender: true,
        },
      )
    }, root)
    scheduleScrollRefresh()
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={heroRef} className="pb-10 pt-28 md:pb-16 md:pt-44">
        <div className="site-wrap">
          <p data-hero className="font-display text-[16px] uppercase tracking-[0.08em]" style={{ color: "var(--fg-soft)" }}>
            {tarifPage.kicker}
          </p>
          <h1
            data-hero
            className="mt-3 font-display text-[clamp(52px,14vw,120px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            {tarifPage.title}
          </h1>
          <p data-hero className="mt-6 max-w-[540px] text-[17px] font-light leading-[1.55] md:text-[18px]">
            {tarifPage.lead}
          </p>
        </div>
      </section>

      <section ref={sheetRef} className="pb-16 md:pb-24">
        <div className="site-wrap" data-reveal>
          <TarifSheet />
        </div>
      </section>

      <section ref={termsRef} className="pb-8 md:pb-16">
        <div className="site-wrap">
          <h2 data-reveal className="font-display text-[32px] font-bold uppercase leading-[1.15] md:text-[48px]">
            Conditions
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {tarifConditions.map((item) => (
              <article key={item.title} data-reveal className="border-t pt-5" style={{ borderColor: "var(--line)" }}>
                <h3 className="font-display text-[22px] uppercase">{item.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-[1.55] md:text-[16px]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
