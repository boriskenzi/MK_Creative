"""Test détaillé: erreurs console, opacités au scroll, contenu bloqué invisible."""
from playwright.sync_api import sync_playwright


def run(url, label):
    print(f"\n=== {label} @ {url} ===")
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: errors.append(str(err)))

        page.goto(url, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(500)

        top = page.evaluate(
            """() => ({
              reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
              hero: [...document.querySelectorAll('[data-hero]')].map(e => getComputedStyle(e).opacity),
              hiddenReveals: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length,
              pin: document.querySelectorAll('.pin-spacer').length,
              stack: document.querySelectorAll('[data-stack-card]').length,
              stCount: window.__ST_COUNT ?? 'n/a',
            })"""
        )
        print("top:", top)

        # scroll lent par steps
        height = page.evaluate("() => document.body.scrollHeight")
        steps = 8
        for i in range(1, steps + 1):
            y = int(height * i / steps)
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(350)
            vis = page.evaluate(
                "() => [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity === '1').length"
            )
            print(f"  scroll {y}px -> reveals visibles: {vis}/12")

        stuck = page.evaluate(
            """() => [...document.querySelectorAll('[data-reveal]')].filter(e => {
              const r = e.getBoundingClientRect();
              const inView = r.top < innerHeight && r.bottom > 0;
              return inView && getComputedStyle(e).opacity === '0';
            }).length"""
        )
        print("reveals invisibles MAIS dans le viewport:", stuck)

        if errors:
            print("ERREURS:", *errors[:8], sep="\n  ")
        else:
            print("Aucune erreur console")

        browser.close()


if __name__ == "__main__":
    run("http://localhost:5173/", "dev")
    run("http://localhost:4173/", "preview")
