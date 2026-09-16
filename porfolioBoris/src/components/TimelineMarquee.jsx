export default function TimelineMarquee({ items }) {
  return (
    <ol className="journey-art" aria-label="Parcours chronologique, des débuts à aujourd'hui">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <li key={`${item.dates}-${item.role}`} className={`journey-step${last ? " is-now" : ""}`}>
            <p className="journey-year">{item.dates}</p>
            <span className="journey-node" aria-hidden />
            <h3 className="journey-role">{item.role}</h3>
            {item.company ? <p className="journey-place">{item.company}</p> : null}
          </li>
        )
      })}
    </ol>
  )
}
