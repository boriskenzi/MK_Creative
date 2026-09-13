import { useState } from "react"
import { Mail, Phone } from "lucide-react"
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
    "w-full rounded-2xl border-0 px-4 py-3.5 text-[16px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
  const label = "mb-1.5 block text-[15px] font-medium"

  return (
    <section id="contact" className="py-16 md:py-32" style={{ background: "var(--card)" }}>
      <div className="site-wrap contact-board">
        <figure className="contact-board-photo-wrap">
          <img
            src={content.images.about}
            alt={content.person}
            className="contact-board-photo"
          />
        </figure>
        <div className="contact-board-title">
          <h2 className="font-display text-[32px] font-bold uppercase leading-[0.95] md:text-[48px] lg:text-[60px]">
            {content.contact.title}
          </h2>
        </div>
        <p className="contact-board-intro max-w-[520px] text-[16px] font-light leading-[1.55] md:text-[18px] md:leading-[1.6]">
          {content.contact.intro}
        </p>

        <div className="contact-board-form">
          <form onSubmit={onSubmit} className="grid gap-4">
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
              className="mt-1 min-h-12 w-full rounded-full px-6 py-3.5 font-display text-[16px] uppercase tracking-wide disabled:opacity-40 md:w-auto"
              style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
            >
              {content.contact.submit}
            </button>
            {status && (
              <p className="text-[15px]" style={{ color: "var(--color-accent)" }}>
                {status}
              </p>
            )}
          </form>
        </div>

        <div className="contact-board-direct contact-direct mt-1 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
          <a href={content.phoneHref} className="contact-direct-link">
            <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} />
            <span>{content.phone}</span>
          </a>
          <a href={content.phoneAltHref} className="contact-direct-link">
            <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} />
            <span>{content.phoneAlt}</span>
          </a>
          <a href={`mailto:${content.email}`} className="contact-direct-link">
            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.7} />
            <span>{content.email}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
