import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { gsap, prefersReducedMotion, MOTION, scheduleScrollRefresh } from "../lib/gsap"
import { content } from "../data/content"
import { galleryCountLabel, galleryImages } from "../data/galleries"
import ContactSection from "../components/ContactSection"

function ProofCard({ item }) {
  const contain = item.fit === "contain"
  const count = galleryImages(item).length
  return (
    <Link
      to={`/realisations/${item.id}`}
      className={`proof-card rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] ${
        item.featured ? "md:col-span-2" : ""
      }`}
      aria-label={`${item.title} — ${content.realisations.cta}`}
    >
      <div
        className={`proof-frame ${contain ? "proof-frame-poster" : "proof-frame-photo"}`}
        style={{ background: "var(--card)" }}
      >
        <img
          src={item.image}
          alt=""
          className={`proof-img ${contain ? "object-contain p-5 md:p-8" : "h-full w-full object-cover"}`}
        />
      </div>
      <div className={`mt-5 flex items-start justify-between gap-4 ${item.featured ? "md:max-w-[560px]" : ""}`}>
        <div>
          <h2 className="proof-title font-display text-[28px] uppercase leading-[1.1] md:text-[36px]">{item.title}</h2>
          <p className="mt-2 max-w-[36ch] text-[16px] font-light leading-[1.55] md:text-[17px]">{item.body}</p>
          <p className="mt-3 font-display text-[14px] uppercase tracking-[0.08em]" style={{ color: "var(--fg-soft)" }}>
            {galleryCountLabel(item, count)}
          </p>
        </div>
        <span
          className="proof-cta mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--line)" }}
          aria-hidden
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
        </span>
      </div>
    </Link>
  )
}

export default function Realisations() {
  const heroRef = useRef(null)

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

  const page = content.realisations

  return (
    <>
      <section ref={heroRef} className="pb-10 pt-28 md:pb-16 md:pt-44">
        <div className="site-wrap">
          <p data-hero className="font-display text-[16px] uppercase tracking-[0.08em]" style={{ color: "var(--fg-soft)" }}>
            {page.kicker}
          </p>
          <h1
            data-hero
            className="mt-3 font-display text-[clamp(52px,14vw,120px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
          >
            {page.title}
          </h1>
          <p data-hero className="mt-6 max-w-[540px] text-[17px] font-light leading-[1.6] md:text-[18px]">
            {page.lead}
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="site-wrap grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
          {page.items.map((item) => (
            <ProofCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  )
}
