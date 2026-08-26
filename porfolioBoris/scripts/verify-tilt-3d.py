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

def tilt_state(page):
    return page.evaluate(
        """() => {
          const nodes = [...document.querySelectorAll('[data-tilt]')]
          const on = nodes.filter((n) => n.dataset.tilt === 'on')
          const face = document.querySelector('.card-tilt-face')
          return {
            total: nodes.length,
            on: on.length,
            transform: face ? getComputedStyle(face).transform : null,
          }
        }"""
    )

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect(page)
        page.goto(BASE + "projects", wait_until="load", timeout=60000)
        page.wait_for_timeout(1200)

        info = tilt_state(page)
        assert info["on"] > 0, info
        page.screenshot(path=str(OUT / "tilt-rest.png"))

        card = page.locator('[data-tilt="on"]').last
        card.scroll_into_view_if_needed()
        page.wait_for_timeout(200)
        box = card.bounding_box()
        page.mouse.move(box["x"] + box["width"] * 0.15, box["y"] + box["height"] * 0.2)
        page.wait_for_timeout(80)
        page.mouse.move(box["x"] + box["width"] * 0.85, box["y"] + box["height"] * 0.75, steps=8)
        page.wait_for_timeout(280)
        hovered = page.evaluate(
            """() => {
              const wraps = [...document.querySelectorAll('[data-tilt="on"]')]
              const last = wraps[wraps.length - 1]
              const face = last?.querySelector('.card-tilt-face')
              return face ? getComputedStyle(face).transform : null
            }"""
        )
        assert hovered and "matrix" in hovered and hovered != "none", hovered
        assert hovered != "matrix(1, 0, 0, 1, 0, 0)", hovered
        page.screenshot(path=str(OUT / "tilt-hover.png"))

        page.goto(BASE + "projects?reduced", wait_until="load", timeout=60000)
        page.wait_for_timeout(700)
        reduced = tilt_state(page)
        assert reduced["on"] == 0, reduced

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        collect(mobile)
        mobile.goto(BASE + "projects", wait_until="load", timeout=60000)
        mobile.wait_for_timeout(700)
        mob = tilt_state(mobile)
        assert mob["on"] == 0, mob
        mobile.close()
        browser.close()

        fatal = [e for e in errors if "Failed to load resource" not in e and "THREE.Clock" not in e]
        print("desktop", info)
        print("hover transform", hovered[:90])
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        print("TILT 3D OK")

if __name__ == "__main__":
    main()
