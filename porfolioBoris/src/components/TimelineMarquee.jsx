export default function TimelineMarquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div className="marquee-track gap-5 pr-5">
        {doubled.map((item, i) => (
          <article
            key={`${item.role}-${i}`}
            className="w-[min(280px,75vw)] shrink-0 rounded-[28px] border p-6"
            style={{ borderColor: "var(--line)", background: "var(--card)" }}
          >
            <p className="text-[13px] font-light" style={{ color: "var(--fg-soft)" }}>
              {item.dates}
            </p>
            <h3 className="mt-3 font-display text-[26px] uppercase leading-[1.2]">{item.role}</h3>
            <p className="mt-2 text-[16px] font-light">{item.company}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
