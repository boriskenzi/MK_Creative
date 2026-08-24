import { content } from "../data/content"
import { blogs } from "../data/blogs"
import BlogCard from "../components/BlogCard"

export default function Blogs() {
  const mostViewed = blogs.filter((b) => b.featured)
  const rest = blogs.filter((b) => !b.featured)

  return (
    <section className="pb-24 pt-36 md:pt-44">
      <div className="site-wrap">
        <h1 className="font-display text-[52px] font-bold uppercase leading-[1.1] md:text-[72px]">
          {content.blogsPreview.title}
        </h1>
        <p className="mt-4 max-w-[640px] text-[18px] font-light leading-[1.5]">{content.blogsPreview.intro}</p>

        <h2 className="mt-16 font-display text-[28px] uppercase" style={{ color: "var(--fg-soft)" }}>
          Les plus lus
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {mostViewed.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} large />
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
