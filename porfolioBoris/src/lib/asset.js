/** Public asset URL that respects Vite `base` (needed on GitHub Pages). */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, "")}`
}

export const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, "") || "/"
