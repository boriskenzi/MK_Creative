import { Link } from "react-router-dom"
import TiltFrame from "../scene/TiltFrame"

export default function ProjectCard({ project, variant = "overlay" }) {
  if (variant === "stack") {
    return (
      <TiltFrame intensity={0.45} radius={32} className="h-full">
        <Link
          to={`/projects/${project.slug}`}
          className="relative block h-[min(440px,68vh)] overflow-hidden rounded-[28px] md:h-[min(620px,78vh)] md:rounded-[32px]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12, 12, 13, 0.08) 0%, rgba(12, 12, 13, 0.42) 48%, rgba(12, 12, 13, 0.9) 100%)",
            }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-10 text-center text-white md:px-8 md:pb-14">
            <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-[14px] font-light">
              {project.category}
            </span>
            <h2 className="mt-3 font-display text-[28px] font-bold uppercase leading-[1.15] md:mt-4 md:text-[56px] md:leading-[1.15]">
              {project.title}
            </h2>
            <p className="mt-2 max-w-[640px] text-[13px] font-light leading-[1.45] text-white/90 md:mt-3 md:text-[14px] md:leading-[1.5]">
              {project.description}
            </p>
          </div>
        </Link>
      </TiltFrame>
    )
  }

  return (
    <TiltFrame intensity={1} radius={24}>
      <Link to={`/projects/${project.slug}`} className="group block">
        <article className="overflow-hidden rounded-[24px]" style={{ background: "var(--card)" }}>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="space-y-2 p-5">
            <p className="text-[14px] font-light" style={{ color: "var(--color-accent)" }}>
              {project.category}
            </p>
            <h3 className="font-display text-[28px] uppercase leading-[1.2]">{project.title}</h3>
            <p className="text-[14px] font-light leading-[1.5]" style={{ color: "var(--fg-soft)" }}>
              {project.description}
            </p>
          </div>
        </article>
      </Link>
    </TiltFrame>
  )
}
