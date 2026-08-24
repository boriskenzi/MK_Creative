import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { content } from "../data/content"

function NavItem({ to, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className="nav-link px-1">
      {({ isActive }) => (
        <>
          <span style={{ color: isActive ? "var(--color-accent)" : "var(--fg)" }}>{label}</span>
          <span className="nav-link-hover">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const goContact = (e) => {
    e.preventDefault()
    if (location.pathname !== "/") {
      navigate("/#contact")
      return
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="pointer-events-none fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className="pointer-events-auto flex items-center gap-3 rounded-full border px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500"
        style={{
          background: "var(--nav)",
          borderColor: "var(--line)",
        }}
      >
        <Link to="/" aria-label="Home" className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
          <img
            src={content.images.avatar}
            alt="MK Creative"
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        <nav className={`hidden items-center gap-5 px-3 text-[16px] font-light md:flex ${scrolled ? "max-lg:hidden" : ""}`}>
          {content.nav.map((item) => (
            <NavItem key={item.to} to={item.to} label={item.label} />
          ))}
        </nav>
        {scrolled ? (
          <a href="/#contact" onClick={goContact} className="flex items-center gap-2 pr-3 pl-1">
            <span className="text-[15px] font-light" style={{ color: "var(--fg)" }}>
              Disponible
            </span>
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          </a>
        ) : (
          <a
            href="/#contact"
            onClick={goContact}
            className="hidden rounded-full px-5 py-2 text-[15px] font-light md:inline-flex"
            style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
          >
            Contact
          </a>
        )}
        <button
          type="button"
          className="mr-1 grid h-9 w-9 place-items-center rounded-full md:hidden"
          style={{ color: "var(--fg)" }}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-4" style={{ background: "var(--fg)" }} />
            <span className="block h-px w-4" style={{ background: "var(--fg)" }} />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="pointer-events-auto absolute top-16 w-[min(320px,calc(100%-32px))] rounded-3xl border p-5 shadow-xl md:hidden"
          style={{ background: "var(--nav)", borderColor: "var(--line)" }}
        >
          <nav className="flex flex-col gap-4 text-[16px]">
            {content.nav.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onClick={() => setOpen(false)} />
            ))}
            <a
              href="/#contact"
              onClick={goContact}
              className="mt-2 inline-flex justify-center rounded-full px-5 py-2"
              style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
