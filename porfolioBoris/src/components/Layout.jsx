import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import ThemeToggle from "./ThemeToggle"
import { useGsapRefresh } from "../hooks/useGsapRefresh"
import { useLenis } from "../hooks/useLenis"
import { scrollToTarget, scrollToTop } from "../lib/scroll"
import StudioBackdrop from "../scene/StudioBackdrop"

export default function Layout() {
  const location = useLocation()

  useLenis()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) scrollToTarget(el)
      })
      return
    }
    scrollToTop()
  }, [location.pathname, location.hash])

  useGsapRefresh([location.pathname])

  return (
    <div className="relative min-h-svh" style={{ color: "var(--fg)" }}>
      <StudioBackdrop />
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ThemeToggle />
    </div>
  )
}
