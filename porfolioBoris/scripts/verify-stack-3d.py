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

def stack_info(page):
    return page.evaluate(
        """() => {
          const cards = [...document.querySelectorAll('[data-stack-card]')]
          const stage = document.querySelector('.stack-stage')
          const t = cards[0] ? getComputedStyle(cards[0]).transform : null
          const t1 = cards[1] ? getComputedStyle(cards[1]).transform : null
          return {
            cards: cards.length,
            stage: Boolean(stage),
            perspective: stage ? getComputedStyle(stage).perspective : null,
            front3d: Boolean(t && t.includes('matrix3d')),
            buried3d: Boolean(t1 && t1.includes('matrix3d')),
            front: t,
          }
        }"""
    )

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        errors = collect(page)
        page.goto(BASE, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1500)

        page.locator(".stack-stage").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        info0 = stack_info(page)
        assert info0["cards"] == 4, info0
        assert info0["buried3d"], info0
        assert info0["perspective"] and info0["perspective"] != "none", info0
        page.screenshot(path=str(OUT / "stack-start.png"))

        page.mouse.wheel(0, 700)
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "stack-mid.png"))
        info1 = stack_info(page)
        assert info1["front3d"] or info1["buried3d"], info1

        page.mouse.wheel(0, 700)
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "stack-later.png"))

        page.goto(BASE + "?reduced", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(800)
        page.locator(".stack-stage").scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        reduced = page.evaluate(
            """() => {
              const cards = [...document.querySelectorAll('[data-stack-card]')]
              return cards.map((c) => c.style.display)
            }"""
        )
        assert reduced[0] in ("block", ""), reduced
        assert all(d == "none" for d in reduced[1:]), reduced

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        collect(mobile)
        mobile.goto(BASE, wait_until="networkidle", timeout=60000)
        mobile.wait_for_timeout(800)
        assert mobile.locator(".stack-stage").count() == 0, "mobile should keep carousel"
        assert mobile.locator("[data-stack-card]").count() == 0
        mobile.close()
        browser.close()

        fatal = [e for e in errors if "Failed to load resource" not in e]
        print("stack start", info0)
        print("stack mid 3d", info1["front3d"])
        if fatal:
            print("ERRORS:")
            for e in fatal:
                print(" -", e)
            raise SystemExit(1)
        print("STACK 3D OK")

if __name__ == "__main__":
    main()
