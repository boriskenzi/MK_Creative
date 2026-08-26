import { useLocation, useNavigate } from "react-router-dom"
import { content } from "../data/content"
import { scrollToTarget } from "../lib/scroll"

const SIZES = {
  md: "h-14 w-14 text-[22px] md:h-20 md:w-20 md:text-[32px]",
  lg: "h-16 w-16 text-[26px] md:h-24 md:w-24 md:text-[40px]",
}

/**
 * Badge « Hi » — salut visuel du designer, épinglé sur le portrait.
 * Sur le Hero, mène au contact. Sur la section contact, salut uniquement.
 */
export default function GreetingOrb({ className = "", size = "md", toContact = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const sizes = SIZES[size] || SIZES.md
  const classes = `wave-orb z-[2] grid place-items-center rounded-full bg-[var(--color-accent)] font-sans font-medium text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white ${sizes} ${className}`

  const goContact = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (location.pathname !== "/") {
      navigate("/#contact")
      return
    }
    const el = document.getElementById("contact")
    if (el) scrollToTarget(el)
  }

  const label = (
    <span className="wave-orb-hi" aria-hidden>
      {content.hero.greeting}
    </span>
  )

  if (!toContact) {
    return (
      <div className={`pointer-events-none ${classes}`} aria-hidden>
        {label}
      </div>
    )
  }

  return (
    <a
      href="#contact"
      onClick={goContact}
      onPointerDown={(event) => event.stopPropagation()}
      className={classes}
      aria-label="Dire bonjour — aller au contact"
    >
      {label}
    </a>
  )
}
