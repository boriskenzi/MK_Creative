from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:5174/", wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(700)
        reduce = page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
        print("prefers-reduced-motion:", reduce)

        hidden_before = page.evaluate(
            """() => [...document.querySelectorAll('[data-reveal]')].map((el) => Number(getComputedStyle(el).opacity))"""
        )
        print("opacity at top:", hidden_before[:6])

        page.evaluate("window.scrollTo(0, 1400)")
        page.wait_for_timeout(1300)
        after = page.evaluate(
            """() => [...document.querySelectorAll('[data-reveal]')].slice(0, 4).map((el) => Number(getComputedStyle(el).opacity))"""
        )
        print("opacity after scroll 1400:", after)

        page.evaluate("window.scrollTo(0, 2600)")
        page.wait_for_timeout(1600)
        stats = page.evaluate(
            """() => [...document.querySelectorAll('p.font-display')].map(el => el.textContent.trim()).slice(0, 6)"""
        )
        print("stat numbers:", stats)

        if after and max(after) < 0.5:
            raise SystemExit("FAIL: reveal still hidden after scroll")
        print("PASS")
        browser.close()

if __name__ == "__main__":
    main()
