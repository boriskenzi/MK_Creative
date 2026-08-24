export default function ServicesMarquee({ services }) {
  const doubled = [...services, ...services]

  return (
    <div className="overflow-hidden py-4">
      <div className="marquee-track gap-5 pr-5">
        {doubled.map((s, i) => (
          <article
            key={`${s.title}-${i}`}
            className="w-[min(340px,80vw)] shrink-0 rounded-[28px] border p-7"
            style={{ borderColor: "var(--line)", background: "var(--card)" }}
          >
            <p className="font-display text-[32px] uppercase leading-[1.3]">
              {s.n}. {s.title}
            </p>
            <ul className="mt-5 space-y-2 text-[16px] font-light leading-[1.5]">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
