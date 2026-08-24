import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import ThemeToggle from "./ThemeToggle"
import { useGsapRefresh } from "../hooks/useGsapRefresh"

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      })
      return
    }
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname, location.hash])

  useGsapRefresh([location.pathname])

  return (
    <div className="min-h-svh" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  )
}
