import { Link } from "react-router-dom"

export default function BlogCard({ blog, large = false }) {
  return (
    <Link to={`/blogs/${blog.slug}`} className="group block">
      <article className="overflow-hidden rounded-[24px]" style={{ background: "var(--card)" }}>
        <div className={large ? "aspect-[16/9] overflow-hidden" : "aspect-[16/10] overflow-hidden"}>
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2 p-5">
          <p className="flex gap-3 text-[14px] font-light">
            <span style={{ color: "var(--color-accent)" }}>{blog.category}</span>
            <span>{blog.date}</span>
          </p>
          <h3 className={`font-display uppercase leading-[1.25] ${large ? "text-[32px]" : "text-[26px]"}`}>
            {blog.title}
          </h3>
          <p className="text-[14px] font-light leading-[1.5]" style={{ color: "var(--fg-soft)" }}>
            {blog.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}
