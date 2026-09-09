import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { content } from "../data/content"
import { asset } from "../lib/asset"
import { scrollToTarget } from "../lib/scroll"
import ThemeToggle from "./ThemeToggle"

function LiveDot() {
  return (
    <span className="status-live" aria-hidden>
      <span className="status-live-ping" />
      <span className="status-live-core" />
    </span>
  )
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className="nav-link px-1 py-1">
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
    const onScroll = () => {
      const next = window.scrollY > 48
      setScrolled(next)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    document.body.toggleAttribute("data-menu-open", open)
    return () => {
      document.body.style.overflow = ""
      document.body.removeAttribute("data-menu-open")
    }
  }, [open])

  const goContact = (e) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== "/") {
      navigate("/#contact")
      return
    }
    const el = document.getElementById("contact")
    if (el) scrollToTarget(el)
  }

  return (
    <header
      className="pointer-events-none fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      style={{ top: "max(1rem, env(safe-area-inset-top))" }}
    >
      {open && (
        <div
          className="pointer-events-auto fixed inset-0 bg-[#1e1d1b]/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <div
        className="pointer-events-auto relative flex items-center gap-2 rounded-full border px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 md:gap-3"
        style={{
          background: "var(--nav)",
          borderColor: "var(--line)",
        }}
      >
        <Link to="/" aria-label="Accueil" className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
          <img
            src={content.images.avatar}
            alt="MK Creative"
            className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
          />
        </Link>

        <nav
          className={`max-md:hidden overflow-hidden transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid ${
            scrolled ? "pointer-events-none grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100"
          }`}
          aria-hidden={scrolled}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-5 px-3 text-[16px] font-light whitespace-nowrap">
              {content.nav.map((item) => (
                <NavItem key={item.to} to={item.to} label={item.label} />
              ))}
            </div>
          </div>
        </nav>
        {scrolled ? (
          <a
            href={asset("#contact")}
            onClick={goContact}
            className="flex items-center gap-2 pr-1 pl-1 md:pr-3"
            aria-label="Disponible, aller au contact"
          >
            <span className="text-[16px] font-light" style={{ color: "var(--fg)" }}>
              Disponible
            </span>
            <LiveDot />
          </a>
        ) : (
          <a
            href={asset("#contact")}
            onClick={goContact}
            className="hidden rounded-full px-5 py-2 text-[15px] font-light md:inline-flex"
            style={{ background: "var(--inverse)", color: "var(--inverse-fg)" }}
          >
            Contact
          </a>
        )}
        {!scrolled && <ThemeToggle placement="header" />}
        <button
          type="button"
          className={`menu-btn mr-0.5 grid h-11 w-11 place-items-center rounded-full md:hidden ${open ? "is-open" : ""}`}
          style={{ color: "var(--fg)" }}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-[5px]">
            <span className="menu-line block h-[1.5px] w-5" style={{ background: "var(--fg)" }} />
            <span className="menu-line block h-[1.5px] w-5" style={{ background: "var(--fg)" }} />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="pointer-events-auto absolute top-16 w-[min(320px,calc(100%-32px))] rounded-3xl border p-5 shadow-xl md:hidden"
          style={{ background: "var(--bg)", borderColor: "var(--line)" }}
        >
          <nav className="flex flex-col gap-1 text-[18px]">
            {content.nav.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} onClick={() => setOpen(false)} />
            ))}
            <a
              href={asset("#contact")}
              onClick={goContact}
              className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2"
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
