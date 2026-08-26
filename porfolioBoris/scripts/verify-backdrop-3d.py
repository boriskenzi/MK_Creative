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

def scene_state(page):
    return page.evaluate(
        """() => ({
          backdrop: Boolean(document.querySelector('.studio-backdrop')),
          canvases: document.querySelectorAll('canvas').length,
          hero: Boolean(document.querySelector('.hero-portrait canvas')),
          stack: document.querySelectorAll('[data-stack-card]').length,
          stack3d: (() => {
            const c = document.querySelectorAll('[data-stack-card]')[1]
            return c ? getComputedStyle(c).transform.includes('matrix3d') : false
          })(),
        })"""
    )

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect(page)
        page.goto(BASE, wait_until="load", timeout=60000)
        page.wait_for_timeout(2200)

        info = scene_state(page)
        assert info["backdrop"], info
        assert info["hero"], info
        assert info["canvases"] >= 2, info
        assert info["stack"] == 4 and info["stack3d"], info
        page.screenshot(path=str(OUT / "backdrop-top.png"))

        page.mouse.wheel(0, 900)
        page.wait_for_timeout(600)
        page.screenshot(path=str(OUT / "backdrop-scroll.png"))

        page.goto(BASE + "?reduced", wait_until="load", timeout=60000)
        page.wait_for_timeout(800)
        reduced = scene_state(page)
        assert reduced["canvases"] == 0, reduced
        assert not reduced["backdrop"], reduced

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        collect(mobile)
        mobile.goto(BASE, wait_until="load", timeout=60000)
        mobile.wait_for_timeout(900)
        mob = scene_state(mobile)
        assert mob["canvases"] == 0, mob
        assert not mob["backdrop"], mob
        mobile.close()
        browser.close()

        fatal = [e for e in errors if "Failed to load resource" not in e and "THREE.Clock" not in e]
        print("desktop", info)
        print("reduced canvases", reduced["canvases"])
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        print("BACKDROP 3D OK")

if __name__ == "__main__":
    main()
