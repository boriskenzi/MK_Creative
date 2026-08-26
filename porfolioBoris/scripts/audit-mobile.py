from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5188/MK_Creative/"
OUT = Path(__file__).resolve().parent.parent / "tmp-mobile"
OUT.mkdir(exist_ok=True)

PAGES = [
    ("home", ""),
    ("about", "about"),
    ("projects", "projects"),
    ("blogs", "blogs"),
]

def overflow(page):
    return page.evaluate(
        """() => ({
          doc: document.documentElement.scrollWidth,
          vw: window.innerWidth,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          canvases: document.querySelectorAll('canvas').length,
          tiltOn: document.querySelectorAll('[data-tilt="on"]').length,
        })"""
    )

def shots(page, prefix):
    page.screenshot(path=str(OUT / f"{prefix}-top.png"))
    page.evaluate("window.scrollTo(0, Math.min(900, document.body.scrollHeight * 0.25))")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT / f"{prefix}-mid.png"))
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT / f"{prefix}-end.png"))
    page.evaluate("window.scrollTo(0, 0)")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        page.set_extra_http_headers({"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        issues = []
        for name, path in PAGES:
            page.goto(BASE + path, wait_until="load", timeout=60000)
            page.wait_for_timeout(1800)
            info = overflow(page)
            print(name, info)
            if info["overflow"] > 2:
                issues.append(f"{name} overflow {info['overflow']}px")
            if info["canvases"] > 0:
                issues.append(f"{name} unexpected canvas {info['canvases']}")
            if info["tiltOn"] > 0:
                issues.append(f"{name} tilt on mobile")
            shots(page, name)

        page.goto(BASE, wait_until="load", timeout=60000)
        page.wait_for_timeout(800)
        page.get_by_role("button", name="Ouvrir le menu").click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(OUT / "home-menu.png"))
        page.get_by_role("button", name="Fermer le menu").click()

        page.locator("h2", has_text="Portfolio").first.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "home-stack.png"))

        page.locator("#contact").scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "home-contact.png"))

        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "home-footer.png"))

        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)
        page.get_by_role("button", name="Passer en mode sombre").click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(OUT / "home-dark.png"))

        browser.close()
        if errors:
            print("PAGE ERRORS", errors)
        if issues:
            print("ISSUES")
            for i in issues:
                print(" -", i)
            raise SystemExit(1)
        print("MOBILE AUDIT OK")

if __name__ == "__main__":
    main()
