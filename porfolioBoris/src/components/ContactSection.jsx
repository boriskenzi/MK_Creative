import { useState } from "react"
import { content } from "../data/content"

const empty = { name: "", email: "", service: "", message: "" }

export default function ContactSection() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState("")
  const valid = form.name.trim() && form.email.trim() && form.message.trim()

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!valid) return
    const text = [
      "Nouveau contact via le site",
      "",
      `Nom: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service || "Non précisé"}`,
      `Message: ${form.message}`,
    ].join("\n")
    const url = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    setForm(empty)
    setStatus("Ouverture de WhatsApp...")
    setTimeout(() => setStatus(""), 4000)
  }

  const field =
    "w-full rounded-2xl border-0 px-4 py-3.5 text-[16px] font-light outline-none"
  const label = "mb-1.5 block text-[13px] font-light"

  return (
    <section id="contact" className="py-16 md:py-32" style={{ background: "var(--card)" }}>
      <div className="site-wrap grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="relative mx-auto order-2 w-[min(64vw,220px)] lg:order-1 lg:w-full lg:max-w-[420px]">
          <img
            src={content.images.about}
            alt="Portrait"
            className="aspect-[4/5] w-full rounded-[28px] object-cover md:rounded-[36px]"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-[32px] font-bold uppercase leading-[1.15] md:text-[60px]">
            {content.contact.title}
          </h2>
          <p className="mt-4 max-w-[520px] text-[16px] font-light leading-[1.55] md:text-[18px]">{content.contact.intro}</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={label} style={{ color: "var(--color-accent)" }}>
                  Nom
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Votre nom"
                  autoComplete="name"
                  className={field}
                  style={{ background: "var(--bg)", color: "var(--fg)" }}
                />
              </label>
              <label>
                <span className={label} style={{ color: "var(--color-accent)" }}>
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="vous@email.com"
                  autoComplete="email"
                  className={field}
                  style={{ background: "var(--bg)", color: "var(--fg)" }}
                />
              </label>
            </div>
            <label>
              <span className={label} style={{ color: "var(--color-accent)" }}>
                Service souhaité
              </span>
              <select
                name="service"
                value={form.service}
                onChange={onChange}
                className={field}
                style={{
                  background: "var(--bg)",
                  color: form.service ? "var(--fg)" : "var(--fg-soft)",
                }}
              >
                <option value="">Choisir...</option>
                {content.contact.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={label} style={{ color: "var(--color-accent)" }}>
                Comment puis-je vous aider ?
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Bonjour, je voudrais échanger à propos de..."
                rows={4}
                className={`${field} resize-none`}
                style={{ background: "var(--bg)", color: "var(--fg)" }}
              />
            </label>
            <button
              type="submit"
              disabled={!valid}
              className="mt-2 min-h-12 w-full rounded-full px-6 py-3.5 font-display text-[16px] uppercase tracking-wide disabled:opacity-40"
              style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
            >
              {content.contact.submit}
            </button>
            {status && (
              <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                {status}
              </p>
            )}
          </form>
          <div className="mt-8 space-y-2 text-[15px] font-light">
            <p>
              <span className="font-semibold">{content.about.phoneLabel}</span>{" "}
              <a href={content.phoneHref} style={{ color: "var(--color-accent)" }}>
                {content.phone}
              </a>
              <span className="block sm:inline">
                {" / "}
                <a href={content.phoneAltHref}>{content.phoneAlt}</a>
              </span>
            </p>
            <p className="break-all">
              <span className="font-semibold">{content.about.emailLabel}</span>{" "}
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
