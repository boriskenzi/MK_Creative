from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5173/MK_Creative/"
OUT = Path(__file__).resolve().parent.parent / "tmp-realisations"
OUT.mkdir(exist_ok=True)


def collect(page):
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(f"{m.type}: {m.text}") if m.type == "error" else None)
    return errors


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect(page)
        page.goto(BASE, wait_until="load", timeout=60000)
        page.wait_for_selector(".studio-backdrop canvas", timeout=15000)
        page.wait_for_timeout(2200)
        page.screenshot(path=str(OUT / "saturn-light.png"))

        page.locator(".theme-dock").click()
        page.wait_for_timeout(1600)
        page.screenshot(path=str(OUT / "saturn-dark.png"))

        page.mouse.wheel(0, 1400)
        page.wait_for_timeout(900)
        page.screenshot(path=str(OUT / "saturn-dark-scroll.png"))

        page.mouse.wheel(0, 2200)
        page.wait_for_timeout(900)
        page.screenshot(path=str(OUT / "saturn-dark-scroll-deep.png"))

        canvases = page.evaluate("() => document.querySelectorAll('canvas').length")
        backdrop = page.evaluate("() => Boolean(document.querySelector('.studio-backdrop canvas'))")

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_errors = collect(mobile)
        errors.extend(mobile_errors)
        mobile.goto(BASE, wait_until="load", timeout=60000)
        mobile.wait_for_selector(".studio-backdrop canvas", timeout=15000)
        mobile.wait_for_timeout(1800)
        mobile.screenshot(path=str(OUT / "saturn-mobile.png"))
        mobile.mouse.wheel(0, 900)
        mobile.wait_for_timeout(800)
        mobile.screenshot(path=str(OUT / "saturn-mobile-scroll.png"))
        mobile_backdrop = mobile.evaluate("() => Boolean(document.querySelector('.studio-backdrop canvas'))")
        browser.close()

        fatal = [e for e in errors if "Failed to load resource" not in e and "THREE.Clock" not in e]
        print("canvases", canvases, "backdrop", backdrop)
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        if not backdrop or canvases < 2 or not mobile_backdrop:
            raise SystemExit(
                f"missing saturn canvas: canvases={canvases} backdrop={backdrop} mobile={mobile_backdrop}"
            )
        print("SATURN OK")


if __name__ == "__main__":
    main()
