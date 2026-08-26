from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5188/MK_Creative/"
OUT = Path(__file__).resolve().parent.parent / "tmp-hero-3d"
OUT.mkdir(exist_ok=True)

def collect_errors(page):
    errors = []
    page.on("pageerror", lambda e: errors.append(f"page: {e}"))
    page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
    return errors

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect_errors(page)

        page.goto(BASE, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1800)

        canvas = page.locator(".hero-portrait canvas")
        orb = page.locator(".hero-portrait .wave-orb")
        canvas.wait_for(state="visible", timeout=15000)
        assert canvas.count() == 1, f"expected 1 canvas, got {canvas.count()}"
        assert orb.count() == 1, "wave orb missing"
        assert page.locator("[data-hero]").count() >= 3, "GSAP hero markers missing"

        box = page.locator(".hero-portrait").bounding_box()
        page.mouse.move(box["x"] + box["width"] * 0.2, box["y"] + box["height"] * 0.3)
        page.wait_for_timeout(250)
        page.mouse.move(box["x"] + box["width"] * 0.8, box["y"] + box["height"] * 0.7)
        page.wait_for_timeout(250)
        page.screenshot(path=str(OUT / "hero-desktop.png"))

        page.goto(BASE + "?reduced", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(800)
        assert page.locator(".hero-portrait canvas").count() == 0, "3D should be off with ?reduced"
        assert page.locator(".hero-portrait img").count() >= 1, "static portrait missing with ?reduced"
        page.screenshot(path=str(OUT / "hero-reduced.png"))

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_errors = collect_errors(mobile)
        mobile.goto(BASE, wait_until="networkidle", timeout=60000)
        mobile.wait_for_timeout(800)
        assert mobile.locator(".hero-portrait canvas").count() == 0, "3D should be off under 768px"
        assert mobile.locator(".hero-portrait img").count() >= 1
        mobile.screenshot(path=str(OUT / "hero-mobile.png"))
        mobile.close()

        browser.close()

        fatal = [e for e in errors + mobile_errors if "Failed to load resource" not in e]
        print(f"canvas desktop=1  reduced=0  mobile=0")
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        print("HERO 3D OK")

if __name__ == "__main__":
    main()
