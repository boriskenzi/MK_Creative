import { useTheme } from "../hooks/useTheme"

export default function ThemeToggle({ placement = "dock" }) {
  const { theme, toggle } = useTheme()
  const dark = theme === "dark"
  const header = placement === "header"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className={
        header
          ? "flex h-8 w-11 items-center rounded-full border px-1 md:hidden"
          : "fixed z-40 hidden h-8 w-[52px] items-center rounded-full border px-1 shadow-sm md:flex md:bottom-6 md:left-1/2 md:-translate-x-1/2"
      }
      style={{ background: "var(--nav)", borderColor: "var(--line)" }}
    >
      <span
        className="h-5 w-5 rounded-full transition-transform duration-300"
        style={{
          background: "var(--inverse)",
          transform: dark ? (header ? "translateX(12px)" : "translateX(20px)") : "translateX(0)",
        }}
      />
    </button>
  )
}
