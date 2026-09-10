import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap, prefersReducedMotion, MOTION, SCROLL_DEBUG, scheduleScrollRefresh } from "../lib/gsap"
import { content } from "../data/content"
import ServicesAccordion from "../components/ServicesAccordion"
import StatsCounter from "../components/StatsCounter"
import TestimonialsSlider from "../components/TestimonialsSlider"
import FaqAccordion from "../components/FaqAccordion"
import ContactSection from "../components/ContactSection"
import SocialIcons from "../components/SocialIcons"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useGsapRefresh } from "../hooks/useGsapRefresh"
import { usePrintCardScroll } from "../hooks/usePrintCardScroll"
import HeroMedia from "../scene/HeroMedia"

export default function Home() {
  const heroRef = useRef(null)
  const printsRef = useRef(null)
  const whoRef = useScrollReveal()
  const aboutRef = useScrollReveal()
  const restRef = useScrollReveal()
  const faqRef = useScrollReveal()

  useGsapRefresh([])
  usePrintCardScroll(printsRef)

  useLayoutEffect(() => {
    const root = heroRef.current
    if (!root) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-hero]")
      if (SCROLL_DEBUG) {
        console.info("[hero] [data-hero]:", lines.length, "| [data-parallax]:", root.querySelectorAll("[data-parallax]").length)
      }

      const light = window.matchMedia("(max-width: 767px)").matches
      gsap.fromTo(
        lines,
        { y: light ? 28 : 64, autoAlpha: 0, scale: light ? 1 : 0.92 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          stagger: MOTION.stagger,
          delay: 0.12,
          ease: MOTION.ease,
          overwrite: "auto",
          immediateRender: true,
        },
      )

      gsap.utils.toArray("[data-parallax]", root).forEach((el) => {
        const depth = Number(el.dataset.parallax) || 40
        gsap.to(el, {
          y: depth,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
            markers: SCROLL_DEBUG,
            invalidateOnRefresh: true,
          },
        })
      })
    }, root)

    scheduleScrollRefresh()
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={printsRef}>
      <section ref={heroRef} data-print-hero className="relative overflow-x-clip pb-10 pt-24 md:pb-24 md:pt-40">
        <div className="site-wrap grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.25fr)_minmax(0,0.9fr)] lg:gap-6 xl:gap-10">
          <div className="flex justify-center lg:justify-start" data-parallax="-36">
            <div className="w-fit text-left">
              <p data-hero className="font-display text-[20px] uppercase leading-none tracking-[-0.03em] md:text-[32px]" style={{ color: "var(--fg-soft)" }}>
                {content.hero.name}
              </p>
              <h1 data-hero className="mt-1 font-display text-[48px] font-bold uppercase leading-[0.92] tracking-[-0.03em] md:mt-2 md:text-[120px] md:leading-[0.95]">
                {content.hero.wordLeft}
              </h1>
            </div>
          </div>

          <div data-hero className="print-card relative mx-auto w-[min(72vw,248px)] md:w-full md:max-w-[520px] lg:max-w-none lg:w-full">
            <div data-print="leave" className="print-card-face relative">
              <HeroMedia src={content.images.heroFront} alt="Portrait of Mr Kenzi" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end" data-parallax="-24">
            <div className="w-fit text-left">
              <h2 data-hero className="font-display text-[32px] font-bold uppercase leading-[0.92] tracking-[-0.03em] md:text-[72px] lg:text-[80px]">
                {content.hero.wordRight}
              </h2>
              <p data-hero className="mt-2 font-display text-[17px] uppercase leading-[1.3] tracking-[0.04em] md:mt-3 md:text-[20px]" style={{ color: "var(--fg-soft)" }}>
                {content.hero.wordRightSub}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={whoRef} className="py-12 md:py-28">
        <div className="site-wrap grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="contents lg:block">
            <div data-reveal className="order-1">
              <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
                {content.who.title}
              </h2>
              <p className="mt-4 max-w-[540px] text-[17px] font-light leading-[1.6] md:mt-5 md:text-[18px]">{content.who.body}</p>
            </div>
            <div data-reveal className="order-3 mt-8">
              <ServicesAccordion services={content.services} />
            </div>
          </div>
          <div className="print-card portrait-print order-2 mx-auto">
            <div data-print="verso" className="print-card-face">
              <img
                src={content.images.about}
                alt="Portrait de Mr Kenzi"
                className="aspect-[4/5] w-full rounded-[28px] object-cover object-[center_12%] md:rounded-[36px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="py-12 md:py-28">
        <div className="site-wrap grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="contents lg:block">
            <div data-reveal className="order-1">
              <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
                {content.about.title}
              </h2>
              <p className="mt-4 max-w-[560px] text-[17px] font-light leading-[1.6] md:mt-5 md:text-[18px]">{content.about.body}</p>
            </div>
            <div data-reveal className="order-3 mt-8">
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {content.stats.map((s) => (
                  <StatsCounter key={s.label} {...s} accent />
                ))}
              </div>
              <div className="mt-8 space-y-2 text-[16px] md:mt-10 md:space-y-3">
                <p>
                  <span className="font-semibold">{content.about.phoneLabel}</span>{" "}
                  <a href={content.phoneHref} style={{ color: "var(--color-accent)" }}>
                    {content.phone}
                  </a>
                  <span className="block sm:inline">
                    {" / "}
                    <a href={content.phoneAltHref}>{content.phoneAlt}</a>
                  </span>
                </p>
                <p className="break-all">
                  <span className="font-semibold">{content.about.emailLabel}</span>{" "}
                  <a href={`mailto:${content.email}`}>{content.email}</a>
                </p>
              </div>
              <SocialIcons items={content.socials} />
              <Link
                to="/about"
                className="mt-8 inline-flex min-h-11 items-center rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
                style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
              >
                {content.about.cta}
              </Link>
            </div>
          </div>
          <div className="print-card portrait-print order-2 mx-auto">
            <div data-print="oblique" className="print-card-face">
              <img
                src={content.images.heroBack}
                alt="Portrait, vue de dos"
                className="aspect-[4/5] w-full rounded-[28px] object-cover md:rounded-[36px]"
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      <section ref={restRef} className="py-12 md:py-28">
        <div className="site-wrap">
          <div data-reveal className="mb-8 max-w-[640px] md:mb-10">
            <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.testimonials.title}
            </h2>
            <p className="mt-4 text-[17px] font-light leading-[1.6] md:text-[18px]">{content.testimonials.intro}</p>
          </div>
          <div data-reveal>
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      <section ref={faqRef} className="py-12 md:py-28">
        <div className="site-wrap grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div data-reveal>
            <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.faq.title}
            </h2>
            <p className="mt-4 max-w-[420px] text-[17px] font-light leading-[1.6] md:text-[18px]">{content.faq.intro}</p>
          </div>
          <div data-reveal>
            <FaqAccordion items={content.faq.items} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
