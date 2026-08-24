import { Link } from "react-router-dom"

export default function ProjectCard({ project, variant = "overlay" }) {
  if (variant === "stack") {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="relative block h-[min(620px,78vh)] overflow-hidden rounded-[32px]"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(12, 12, 13, 0.15) 0%, rgba(12, 12, 13, 0.78) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-8 pb-14 text-center text-white">
          <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-[14px] font-light">
            {project.category}
          </span>
          <h2 className="mt-4 font-display text-[32px] font-bold uppercase leading-[1.2] md:text-[56px] md:leading-[1.15]">
            {project.title}
          </h2>
          <p className="mt-3 max-w-[640px] text-[14px] font-light leading-[1.5] text-white/90">
            {project.description}
          </p>
        </div>
      </Link>
    )
  }

  return (
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
  )
}
