import { content } from "../data/content"
import ServicesMarquee from "../components/ServicesMarquee"
import TimelineMarquee from "../components/TimelineMarquee"
import ProcessSteps from "../components/ProcessSteps"
import ContactSection from "../components/ContactSection"
import SocialIcons from "../components/SocialIcons"
import { useScrollReveal } from "../hooks/useScrollReveal"

export default function About() {
  const heroRef = useScrollReveal()
  const stackRef = useScrollReveal()

  return (
    <>
      <section ref={heroRef} className="pb-12 pt-28 md:pb-16 md:pt-44">
        <div className="site-wrap grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="contents lg:block">
            <div data-reveal className="order-1">
              <h1 className="font-display text-[clamp(32px,9vw,52px)] font-bold uppercase leading-[1.1] md:text-[72px]">
                {content.aboutPage.title}
              </h1>
              <p
                className="mt-2 font-display text-[22px] uppercase tracking-[0.02em] md:mt-3 md:text-[28px]"
                style={{ color: "var(--stat)" }}
              >
                {content.aboutPage.name}
              </p>
              <p className="mt-5 max-w-[560px] text-[17px] font-light leading-[1.6] md:mt-6 md:text-[18px]">{content.aboutPage.lead}</p>
            </div>
            <div data-reveal className="order-3 mt-6">
              <SocialIcons items={content.socials} />
            </div>
          </div>
          <div data-reveal className="portrait-print order-2 mx-auto">
            <img
              src={content.images.heroFront}
              alt={content.person}
              className="aspect-[4/5] w-full rounded-[28px] object-cover md:rounded-[36px]"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="site-wrap mb-8">
          <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.servicesIntro.title}
          </h2>
          <p className="mt-4 max-w-[560px] text-[17px] font-light leading-[1.6] md:text-[18px]">{content.servicesIntro.body}</p>
        </div>
        <ServicesMarquee services={content.services} />
      </section>

      <section className="py-12 md:py-24">
        <div className="site-wrap mb-8">
          <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.journey.title}
          </h2>
          <p className="mt-4 max-w-[640px] text-[17px] font-light leading-[1.6] md:text-[18px]">{content.journey.intro}</p>
        </div>
        <div className="site-wrap">
          <TimelineMarquee items={content.journey.items} />
        </div>
      </section>

      <section ref={stackRef} className="py-12 md:py-24">
        <div className="site-wrap">
          <div data-reveal>
            <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.stack.title}
            </h2>
            <p className="mt-4 max-w-[720px] text-[17px] font-light leading-[1.6] md:text-[18px]">{content.stack.intro}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.stack.items.map((item) => (
              <article
                key={item.name}
                data-reveal
                className="rounded-[28px] border p-6"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <h3 className="font-display text-[28px] uppercase">{item.name}</h3>
                <p className="mt-3 text-[17px] font-light leading-[1.6]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="site-wrap">
          <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.process.title}
          </h2>
          <p className="mt-4 mb-10 max-w-[640px] text-[17px] font-light leading-[1.6] md:mb-12 md:text-[18px]">{content.process.intro}</p>
          <ProcessSteps steps={content.process.steps} />
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="site-wrap">
          <h2 className="font-display text-[36px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.education.title}
          </h2>
          <ul className="mt-8 divide-y" style={{ borderColor: "var(--line)" }}>
            {content.education.items.map((item) => (
              <li key={item.title} className="flex flex-col gap-1 border-b py-5 md:flex-row md:items-baseline md:justify-between" style={{ borderColor: "var(--line)" }}>
                <p className="font-display text-[20px] uppercase md:text-[26px]">{item.title}</p>
                {item.place ? (
                  <p className="text-[16px] font-light" style={{ color: "var(--fg-soft)" }}>
                    {item.place}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
