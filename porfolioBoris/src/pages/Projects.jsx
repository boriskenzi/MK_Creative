import { useState } from "react"
import { content } from "../data/content"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"
import ProjectStack from "../components/ProjectStack"
import { useScrollReveal } from "../hooks/useScrollReveal"

const FEATURED = projects.slice(0, 4)

export default function Projects() {
  const [visible, setVisible] = useState(8)
  const heroRef = useScrollReveal()
  const more = projects.slice(4, visible)

  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="site-wrap">
        <div ref={heroRef}>
          <h1 data-reveal className="font-display text-[52px] font-bold uppercase leading-[1.1] md:text-[72px]">
            {content.projectsPage.title}
          </h1>
          <p data-reveal className="mt-4 max-w-[640px] text-[18px] font-light leading-[1.5]">
            {content.projectsPage.intro}
          </p>
        </div>

        <div className="mt-12">
          <ProjectStack projects={FEATURED} showCta={false} />
        </div>

        {more.length > 0 && (
          <>
            <h2 className="mt-20 font-display text-[42px] font-bold uppercase md:text-[60px]">
              {content.projectsPage.more}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </>
        )}

        {visible < projects.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + 4)}
              className="rounded-full border px-6 py-3 font-display text-[16px] uppercase tracking-wide"
              style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            >
              Charger plus
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
