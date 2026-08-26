from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5188/MK_Creative/"
OUT = Path(__file__).resolve().parent.parent / "tmp-hero-3d"
OUT.mkdir(exist_ok=True)

def collect(page):
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(f"{m.type}: {m.text}") if m.type == "error" else None)
    return errors

def prints(page):
    return page.evaluate(
        """() => {
          const grab = (sel) => {
            const el = document.querySelector(sel)
            if (!el) return null
            const s = getComputedStyle(el)
            return { t: s.transform, op: s.opacity }
          }
          return {
            leave: grab('[data-print="leave"]'),
            verso: grab('[data-print="verso"]'),
            oblique: grab('[data-print="oblique"]'),
          }
        }"""
    )

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect(page)
        page.goto(BASE, wait_until="load", timeout=60000)
        page.wait_for_timeout(1600)

        start = prints(page)
        assert start["leave"] and start["verso"] and start["oblique"], start
        page.screenshot(path=str(OUT / "print-hero.png"))

        page.locator('[data-print="verso"]').scroll_into_view_if_needed()
        page.wait_for_timeout(700)
        mid = prints(page)
        assert "matrix" in (mid["verso"]["t"] or ""), mid
        assert float(mid["verso"]["op"]) > 0.5, mid
        page.screenshot(path=str(OUT / "print-verso.png"))

        page.locator('[data-print="oblique"]').scroll_into_view_if_needed()
        page.wait_for_timeout(700)
        end = prints(page)
        assert float(end["oblique"]["op"]) > 0.5, end
        page.screenshot(path=str(OUT / "print-oblique.png"))

        page.goto(BASE + "?reduced", wait_until="load", timeout=60000)
        page.wait_for_timeout(800)
        page.locator('[data-print="verso"]').scroll_into_view_if_needed()
        red = prints(page)
        assert float(red["verso"]["op"]) > 0.9, red

        browser.close()
        fatal = [e for e in errors if "Failed to load resource" not in e and "THREE.Clock" not in e]
        print("start verso op", start["verso"]["op"])
        print("mid verso", mid["verso"])
        print("end oblique", end["oblique"]["t"][:70] if end["oblique"]["t"] else None)
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        print("PRINT CARDS OK")

if __name__ == "__main__":
    main()
