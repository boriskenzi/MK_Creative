import { useMarquee } from "../hooks/useMarquee"

function itemLabel(item) {
  return typeof item === "string" ? item : item.label
}

function ServiceCard({ service }) {
  return (
    <article className="service-card flex h-full w-[min(380px,80vw)] shrink-0 flex-col rounded-[28px] border p-7">
      <p className="service-card-title font-display text-[26px] uppercase leading-[1.25] md:text-[32px]">
        {service.n}. {service.title}
      </p>
      <ul className="mt-5 space-y-2 text-[16px] font-light leading-[1.5]">
        {service.items.map((item) => (
          <li key={itemLabel(item)} className="service-item flex items-start gap-2.5">
            <span className="service-bullet" aria-hidden />
            <span>{itemLabel(item)}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function ServicesMarquee({ services }) {
  const trackRef = useMarquee(36)

  return (
    <div className="services-marquee overflow-hidden py-4">
      <div ref={trackRef} className="marquee-track">
        <div className="marquee-group">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden>
          {services.map((s) => (
            <ServiceCard key={`${s.title}-dup`} service={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
