import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { gsap, prefersReducedMotion, MOTION, SCROLL_DEBUG, scheduleScrollRefresh } from "../lib/gsap"
import { content } from "../data/content"
import { projects } from "../data/projects"
import { blogs } from "../data/blogs"
import ServicesAccordion from "../components/ServicesAccordion"
import StatsCounter from "../components/StatsCounter"
import ProjectStack from "../components/ProjectStack"
import TestimonialsSlider from "../components/TestimonialsSlider"
import FaqAccordion from "../components/FaqAccordion"
import BlogCard from "../components/BlogCard"
import ContactSection from "../components/ContactSection"
import SocialIcons from "../components/SocialIcons"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useGsapRefresh } from "../hooks/useGsapRefresh"
import { usePrintCardScroll } from "../hooks/usePrintCardScroll"
import HeroMedia from "../scene/HeroMedia"

const HOME_FEATURED = projects.slice(0, 4)

export default function Home() {
  const heroRef = useRef(null)
  const printsRef = useRef(null)
  const whoRef = useScrollReveal()
  const aboutRef = useScrollReveal()
  const portRef = useScrollReveal()
  const restRef = useScrollReveal()
  const faqRef = useScrollReveal()
  const blogsRef = useScrollReveal()

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
      <section ref={heroRef} data-print-hero className="relative overflow-x-clip pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="site-wrap grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="text-center lg:text-left" data-parallax="-36">
            <p data-hero className="font-display text-[22px] uppercase tracking-wide md:text-[32px]" style={{ color: "var(--fg-soft)" }}>
              {content.hero.name}
            </p>
            <h1 data-hero className="mt-2 font-display text-[clamp(56px,16vw,72px)] font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-[120px] md:leading-[0.95]">
              {content.hero.wordLeft}
            </h1>
          </div>

          <div data-hero className="print-card relative mx-auto w-full max-w-[380px] lg:w-[min(340px,70vw)]">
            <div data-print="leave" className="print-card-face relative">
              <HeroMedia src={content.images.heroFront} alt="Portrait of portfolio creator" />
            </div>
          </div>

          <div className="text-center lg:text-left" data-parallax="-24">
            <h2 data-hero className="font-display text-[clamp(56px,16vw,72px)] font-bold uppercase leading-[0.95] tracking-[-0.03em] md:text-[120px] md:leading-[0.95]">
              {content.hero.wordRight}
            </h2>
            <p data-hero className="mt-4 max-w-[340px] text-[18px] font-light leading-[1.5] lg:ml-auto">
              {content.hero.tagline}
            </p>
          </div>
        </div>
      </section>

      <section ref={whoRef} className="py-20 md:py-28">
        <div className="site-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.who.title}
            </h2>
            <p className="mt-5 max-w-[540px] text-[18px] font-light leading-[1.5]">{content.who.body}</p>
            <div className="mt-8">
              <ServicesAccordion services={content.services} />
            </div>
          </div>
          <div className="print-card mx-auto w-full max-w-[460px]">
            <div data-print="verso" className="print-card-face">
              <img
                src={content.images.heroBack}
                alt="Portrait — back view"
                className="aspect-[4/5] w-full rounded-[36px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="py-20 md:py-28">
        <div className="site-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.about.title}
            </h2>
            <p className="mt-5 max-w-[520px] text-[18px] font-light leading-[1.5]">{content.about.body}</p>
            <div className="mt-10 grid grid-cols-3 gap-2 md:gap-4">
              {content.stats.map((s) => (
                <StatsCounter key={s.label} {...s} accent />
              ))}
            </div>
            <div className="mt-10 space-y-3 text-[16px]">
              <p>
                <span className="font-semibold">{content.about.phoneLabel}</span>{" "}
                <a href={content.phoneHref} style={{ color: "var(--color-accent)" }}>
                  {content.phone}
                </a>
                {" / "}
                <a href={content.phoneAltHref}>{content.phoneAlt}</a>
              </p>
              <p>
                <span className="font-semibold">{content.about.emailLabel}</span>{" "}
                <a href={`mailto:${content.email}`}>{content.email}</a>
              </p>
            </div>
            <SocialIcons items={content.socials} />
            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
              style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            >
              {content.about.cta}
            </Link>
          </div>
          <div className="print-card mx-auto w-full max-w-[460px]">
            <div data-print="oblique" className="print-card-face">
              <img
                src={content.images.about}
                alt="Portrait"
                className="aspect-[4/5] w-full rounded-[36px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      </div>

      <section ref={portRef} className="py-20 md:py-28">
        <div className="site-wrap">
          <div data-reveal className="mb-10 max-w-[640px]">
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.portfolio.title}
            </h2>
            <p className="mt-4 text-[18px] font-light leading-[1.5]">{content.portfolio.intro}</p>
          </div>
          <ProjectStack projects={HOME_FEATURED} variant="scroll" />
        </div>
      </section>

      <section ref={restRef} className="py-20 md:py-28">
        <div className="site-wrap">
          <div data-reveal className="mb-10 max-w-[640px]">
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.testimonials.title}
            </h2>
            <p className="mt-4 text-[18px] font-light leading-[1.5]">{content.testimonials.intro}</p>
          </div>
          <div data-reveal>
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      <section ref={faqRef} className="py-20 md:py-28">
        <div className="site-wrap grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal>
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.faq.title}
            </h2>
            <p className="mt-4 max-w-[420px] text-[18px] font-light leading-[1.5]">{content.faq.intro}</p>
          </div>
          <div data-reveal>
            <FaqAccordion items={content.faq.items} />
          </div>
        </div>
      </section>

      <section ref={blogsRef} className="py-20 md:py-28">
        <div className="site-wrap">
          <h2 data-reveal className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.blogsPreview.title}
          </h2>
          <p data-reveal className="mt-4 max-w-[640px] text-[18px] font-light leading-[1.5]">{content.blogsPreview.intro}</p>
          <div data-reveal className="mt-10 grid gap-6 md:grid-cols-2">
            {blogs.slice(0, 2).map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/blogs"
              className="rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
              style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            >
              {content.blogsPreview.cta}
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
