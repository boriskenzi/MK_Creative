import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { gsap, prefersReducedMotion, MOTION, scheduleScrollRefresh } from "../lib/gsap"
import { content } from "../data/content"
import { galleryCountLabel, galleryImages } from "../data/galleries"
import ContactSection from "../components/ContactSection"
import Lightbox from "../components/Lightbox"

export default function Gallery() {
  const { slug } = useParams()
  const item = content.realisations.items.find((entry) => entry.id === slug)
  const heroRef = useRef(null)
  const [active, setActive] = useState(null)
  const closeLightbox = useCallback(() => setActive(null), [])

  useEffect(() => {
    setActive(null)
  }, [slug])

  useLayoutEffect(() => {
    const root = heroRef.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-hero]"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: MOTION.stagger,
          delay: 0.06,
          ease: MOTION.ease,
          overwrite: "auto",
          immediateRender: true,
        },
      )
    }, root)
    scheduleScrollRefresh()
    return () => ctx.revert()
  }, [slug])

  if (!item) return <Navigate to="/realisations" replace />

  const images = galleryImages(item)
  const posters = item.fit === "contain"
  const page = content.realisations

  return (
    <>
      <section ref={heroRef} className="pb-8 pt-28 md:pb-12 md:pt-40">
        <div className="gallery-wrap">
          <p data-hero>
            <Link
              to="/realisations"
              className="inline-flex min-h-11 items-center gap-2 font-display text-[15px] uppercase tracking-[0.08em] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              style={{ color: "var(--fg-soft)" }}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.7} />
              {page.title}
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1
                data-hero
                className="font-display text-[clamp(40px,10vw,84px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]"
              >
                {item.title}
              </h1>
              <p data-hero className="mt-4 max-w-[46ch] text-[17px] font-light leading-[1.6] md:text-[18px]">
                {item.body}
              </p>
            </div>
            <p data-hero className="font-display text-[16px] uppercase tracking-[0.06em]" style={{ color: "var(--fg-soft)" }}>
              {galleryCountLabel(item, images.length)}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className={`gallery-wrap ${posters ? "gallery-prints" : images.length < 3 ? "gallery-mosaic gallery-mosaic-few" : "gallery-mosaic"}`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="gallery-cell"
              onClick={() => setActive(index)}
              aria-label={`Agrandir ${image.alt}`}
            >
              <span className={`gallery-frame ${posters ? "gallery-frame-poster" : "gallery-frame-photo"}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 16 ? "eager" : "lazy"}
                  decoding="async"
                />
              </span>
              <span className="gallery-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </section>

      {active != null && (
        <Lightbox items={images} index={active} onClose={closeLightbox} onIndex={setActive} />
      )}

      <ContactSection />
    </>
  )
}
