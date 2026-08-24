import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { blogs } from "../data/blogs"
import { content } from "../data/content"
import BlogCard from "../components/BlogCard"

export default function BlogDetail() {
  const { slug } = useParams()
  const blog = blogs.find((b) => b.slug === slug)
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  if (!blog) return <Navigate to="/blogs" replace />

  const related = blogs.filter((b) => b.slug !== slug).slice(0, 2)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail("")
  }

  return (
    <article className="pb-24 pt-36 md:pt-44">
      <div className="site-wrap max-w-[860px]">
        <p className="flex gap-3 text-[14px] font-light">
          <span style={{ color: "var(--color-accent)" }}>{blog.category}</span>
          <span>{blog.date}</span>
        </p>
        <h1 className="mt-3 font-display text-[42px] font-bold uppercase leading-[1.1] md:text-[64px]">
          {blog.title}
        </h1>
        <p className="mt-4 text-[18px] font-light leading-[1.55]">{blog.excerpt}</p>
        <img src={blog.image} alt={blog.title} className="mt-10 aspect-[16/9] w-full rounded-[28px] object-cover" />

        <div className="mt-12 space-y-8">
          {blog.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-[28px] uppercase md:text-[32px]">{s.heading}</h2>
              <p className="mt-3 text-[17px] font-light leading-[1.7]">{s.body}</p>
            </section>
          ))}
        </div>

        <div
          className="mt-16 rounded-[28px] border p-8"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        >
          <h3 className="font-display text-[32px] uppercase">{content.newsletter.title}</h3>
          <p className="mt-2 text-[16px] font-light">{content.newsletter.body}</p>
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 rounded-full border bg-transparent px-4 py-3 text-[15px] outline-none"
              style={{ borderColor: "var(--line)" }}
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 font-display uppercase"
              style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
            >
              {content.newsletter.cta}
            </button>
          </form>
          {done && <p className="mt-3 text-sm" style={{ color: "var(--color-accent)" }}>Merci — à bientôt.</p>}
        </div>

        <h2 className="mt-16 font-display text-[32px] uppercase">À découvrir aussi</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {related.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>
        <Link to="/blogs" className="mt-8 inline-block text-[15px]" style={{ color: "var(--color-accent)" }}>
          ← Tous les articles
        </Link>
      </div>
    </article>
  )
}
