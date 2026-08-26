import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { gsap, prefersReducedMotion, SCROLL_DEBUG, scheduleScrollRefresh } from "../lib/gsap"
import ProjectCard from "./ProjectCard"
import { content } from "../data/content"
import { stackFront, stackInPile, stackPeel, STACK_TWEEN } from "../scene/stackMotion"

/** Carousel simple (mobile + page Projects) */
function ProjectCarousel({ projects, showCta }) {
  const [index, setIndex] = useState(0)
  const current = projects[index]
  if (!current) return null

  return (
    <div className="relative">
      <div className="relative mx-auto max-w-[980px]">
        <div
          className="absolute inset-x-3 -top-3 h-[72%] rounded-[28px] opacity-50 md:inset-x-6 md:rounded-[32px]"
          style={{ background: "var(--card)" }}
        />
        <ProjectCard project={current} variant="stack" />
      </div>
      <div className="mt-6 flex items-center justify-center gap-1">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Projet ${i + 1}`}
            onClick={() => setIndex(i)}
            className="grid h-11 w-11 place-items-center"
          >
            <span
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 8,
                display: "block",
                background: i === index ? "var(--fg)" : "var(--line)",
              }}
            />
          </button>
        ))}
      </div>
      {showCta && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
          >
            {content.portfolio.cta}
          </Link>
        </div>
      )}
    </div>
  )
}

/** Stack scroll-pinné type Framer (desktop Home) */
function ProjectScrollStack({ projects, showCta }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage || projects.length < 2) return

    const cards = gsap.utils.toArray(stage.querySelectorAll("[data-stack-card]"))
    if (!cards.length) return

    if (SCROLL_DEBUG) {
      console.info("[stack] [data-stack-card]:", cards.length)
    }

    if (prefersReducedMotion()) {
      gsap.set(cards, { clearProps: "all" })
      cards.forEach((card, i) => {
        card.style.zIndex = String(projects.length - i)
        card.style.display = i === 0 ? "block" : "none"
      })
      return
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: projects.length - i,
          force3D: true,
          transformOrigin: STACK_TWEEN.transformOrigin,
          ...(i === 0 ? stackFront() : stackInPile(i)),
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: `+=${Math.max(1, projects.length - 1) * 80}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: SCROLL_DEBUG,
          onUpdate: (self) => {
            const idx = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length + 0.001),
            )
            setActive(idx)
          },
        },
      })

      for (let i = 0; i < cards.length - 1; i++) {
        tl.to(cards[i], { ...stackPeel(i), ...STACK_TWEEN }, i).to(
          cards[i + 1],
          { ...stackFront(), ...STACK_TWEEN },
          i,
        )

        for (let k = i + 2; k < cards.length; k++) {
          tl.to(cards[k], { ...stackInPile(k - i - 1), ...STACK_TWEEN }, i)
        }
      }
    }, section)

    scheduleScrollRefresh()
    window.addEventListener("load", scheduleScrollRefresh, { once: true })

    return () => {
      window.removeEventListener("load", scheduleScrollRefresh)
      ctx.revert()
    }
  }, [projects])

  if (!projects.length) return null

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={stageRef}
        className="stack-stage relative mx-auto h-[min(620px,78vh)] w-full max-w-[980px]"
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            data-stack-card
            className="stack-card absolute inset-0 will-change-transform"
          >
            <ProjectCard project={project} variant="stack" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none mt-6 flex items-center justify-center gap-2">
        {projects.map((p, i) => (
          <span
            key={p.slug}
            aria-hidden
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 22 : 8,
              background: i === active ? "var(--fg)" : "var(--line)",
            }}
          />
        ))}
      </div>

      {showCta && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
          >
            {content.portfolio.cta}
          </Link>
        </div>
      )}
    </div>
  )
}

function readScrollEnabled(variant) {
  if (variant !== "scroll") return false
  if (typeof window === "undefined") return false
  return window.matchMedia("(min-width: 768px)").matches
}

export default function ProjectStack({ projects, showCta = true, variant = "carousel" }) {
  const [scrollEnabled, setScrollEnabled] = useState(() => readScrollEnabled(variant))

  useEffect(() => {
    if (variant !== "scroll") {
      setScrollEnabled(false)
      return
    }
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setScrollEnabled(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [variant])

  if (variant === "scroll" && scrollEnabled) {
    return <ProjectScrollStack projects={projects} showCta={showCta} />
  }

  return <ProjectCarousel projects={projects} showCta={showCta} />
}
