import { useTheme } from "../hooks/useTheme"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="fixed bottom-6 left-1/2 z-40 flex h-8 w-[52px] -translate-x-1/2 items-center rounded-full border px-1 shadow-sm"
      style={{ background: "var(--nav)", borderColor: "var(--line)" }}
    >
      <span
        className="h-5 w-5 rounded-full transition-transform duration-300"
        style={{
          background: "var(--inverse)",
          transform: dark ? "translateX(20px)" : "translateX(0)",
        }}
      />
    </button>
  )
}
