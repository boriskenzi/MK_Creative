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
      <section ref={heroRef} className="pb-16 pt-36 md:pt-44">
        <div className="site-wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal>
            <h1 className="font-display text-[52px] font-bold uppercase leading-[1.1] md:text-[72px]">
              {content.aboutPage.title}
            </h1>
            <p className="mt-4 font-display text-[28px] uppercase">{content.aboutPage.name}</p>
            <p className="mt-6 max-w-[560px] text-[18px] font-light leading-[1.55]">{content.aboutPage.lead}</p>
            <p className="mt-4 max-w-[560px] text-[18px] font-light leading-[1.55]">{content.aboutPage.body}</p>
            <SocialIcons items={content.socials} />
          </div>
          <div data-reveal>
            <img
              src={content.images.heroFront}
              alt={content.person}
              className="mx-auto aspect-[4/5] w-full max-w-[420px] rounded-[36px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-wrap mb-8">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.servicesIntro.title}
          </h2>
          <p className="mt-4 max-w-[560px] text-[18px] font-light leading-[1.5]">{content.servicesIntro.body}</p>
        </div>
        <ServicesMarquee services={content.services} />
      </section>

      <section className="py-16 md:py-24">
        <div className="site-wrap mb-8">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.journey.title}
          </h2>
          <p className="mt-4 max-w-[640px] text-[18px] font-light leading-[1.5]">{content.journey.intro}</p>
        </div>
        <TimelineMarquee items={content.journey.items} />
      </section>

      <section ref={stackRef} className="py-16 md:py-24">
        <div className="site-wrap">
          <div data-reveal>
            <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
              {content.stack.title}
            </h2>
            <p className="mt-4 max-w-[640px] text-[18px] font-light leading-[1.5]">{content.stack.intro}</p>
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
                <p className="mt-3 text-[16px] font-light leading-[1.5]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-wrap">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.process.title}
          </h2>
          <p className="mt-4 mb-12 max-w-[640px] text-[18px] font-light leading-[1.5]">{content.process.intro}</p>
          <ProcessSteps steps={content.process.steps} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-wrap">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.education.title}
          </h2>
          <ul className="mt-8 divide-y" style={{ borderColor: "var(--line)" }}>
            {content.education.items.map((item) => (
              <li key={item.title} className="flex flex-col gap-1 border-b py-5 md:flex-row md:items-baseline md:justify-between" style={{ borderColor: "var(--line)" }}>
                <p className="font-display text-[22px] uppercase md:text-[26px]">{item.title}</p>
                <p className="text-[16px] font-light" style={{ color: "var(--fg-soft)" }}>
                  {item.place}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
