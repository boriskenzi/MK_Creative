import { Link, Navigate, useParams } from "react-router-dom"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/projects" replace />

  const more = projects.filter((p) => p.slug !== slug).slice(0, 4)

  const blocks = [
    { title: "Problem", body: project.problem },
    { title: "Solution", body: project.solution },
    { title: "Challenge", body: project.challenge },
    { title: "Summary", body: project.summary },
  ]

  return (
    <article className="pb-24 pt-36 md:pt-44">
      <div className="site-wrap">
        <p className="text-[14px] font-light" style={{ color: "var(--color-accent)" }}>
          {project.category}
        </p>
        <h1 className="mt-3 font-display text-[clamp(32px,10vw,42px)] font-bold uppercase leading-[1.1] md:text-[72px]">
          {project.title}
        </h1>
        <p className="mt-4 max-w-[680px] text-[18px] font-light leading-[1.55]">{project.description}</p>

        <img
          src={project.image}
          alt={project.title}
          className="mt-10 aspect-[16/9] w-full rounded-[32px] object-cover"
        />

        <dl className="mt-10 grid gap-6 border-y py-8 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--line)" }}>
          {[
            ["Year", project.year],
            ["Industry", project.industry],
            ["Client", project.client],
            ["Project Duration", project.duration],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[14px] font-light" style={{ color: "var(--fg-soft)" }}>
                {k}
              </dt>
              <dd className="mt-1 text-[16px] font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 space-y-10">
          {blocks.map((b) => (
            <section key={b.title}>
              <h3 className="font-display text-[32px] uppercase">{b.title}</h3>
              {b.body.split("\n\n").map((p) => (
                <p key={p.slice(0, 24)} className="mt-3 max-w-[720px] text-[17px] font-light leading-[1.65]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <h2 className="mt-20 font-display text-[42px] font-bold uppercase md:text-[60px]">Plus de projets</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {more.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/projects" className="text-[15px]" style={{ color: "var(--color-accent)" }}>
            ← Tous les projets
          </Link>
        </div>
      </div>
    </article>
  )
}
