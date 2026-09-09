from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5173/MK_Creative/"
OUT = Path(__file__).resolve().parent.parent / "tmp-mobile"
OUT.mkdir(exist_ok=True)


def measure(page):
    return page.evaluate(
        """() => {
          const hero = document.querySelector('[data-print-hero]');
          const card = document.querySelector('.print-card, .hero-portrait');
          const wrap = document.querySelector('.site-wrap');
          const heroR = hero ? hero.getBoundingClientRect() : null;
          const cardR = card ? card.getBoundingClientRect() : null;
          const imgs = [...document.querySelectorAll('main img')].slice(0, 8).map((img) => {
            const r = img.getBoundingClientRect();
            return { alt: img.alt, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
          });
          return {
            vw: window.innerWidth,
            vh: window.innerHeight,
            docW: document.documentElement.scrollWidth,
            overflow: document.documentElement.scrollWidth - window.innerWidth,
            heroH: heroR ? Math.round(heroR.height) : null,
            photo: cardR ? { w: Math.round(cardR.width), h: Math.round(cardR.height), top: Math.round(cardR.top), bottom: Math.round(cardR.bottom) } : null,
            wrapW: wrap ? Math.round(wrap.getBoundingClientRect().width) : null,
            imgs,
          };
        }"""
    )


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        page.goto(BASE, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1600)

        info = measure(page)
        print("HOME TOP", info)
        page.screenshot(path=str(OUT / "ux-home-top.png"))

        page.locator("header button[aria-label='Ouvrir le menu']").click()
        page.wait_for_timeout(300)
        page.screenshot(path=str(OUT / "ux-home-menu.png"))
        page.locator("header button[aria-label='Fermer le menu']").click()

        page.evaluate("window.scrollTo(0, 80)")
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "ux-home-scrolled-nav.png"))
        menu = page.locator("header button[aria-label='Ouvrir le menu']")
        print("MENU AFTER SCROLL", menu.count())
        if menu.count():
            menu.click()
            page.wait_for_timeout(300)
            page.screenshot(path=str(OUT / "ux-home-menu-scrolled.png"))
            page.locator("header button[aria-label='Fermer le menu']").click()
            page.wait_for_timeout(200)

        for sel, name in [
            ("h2", "Qui suis-je"),
            ("h2", "Prêt pour un projet"),
            ("h2", "Portfolio"),
            ("h2", "Ce que disent"),
            ("h2", "Questions fréquentes"),
        ]:
            loc = page.locator("h2", has_text=name).first
            if loc.count():
                loc.scroll_into_view_if_needed()
                page.wait_for_timeout(450)
                page.screenshot(path=str(OUT / f"ux-{name[:12].replace(' ', '-').lower()}.png"))

        page.locator("#contact").scroll_into_view_if_needed()
        page.wait_for_timeout(450)
        page.screenshot(path=str(OUT / "ux-contact.png"))

        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "ux-footer.png"))

        page.goto(BASE + "about", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / "ux-about-top.png"))
        print("ABOUT", measure(page))

        page.goto(BASE + "projects", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / "ux-projects-top.png"))

        page.goto(BASE + "blogs", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / "ux-blogs-top.png"))

        browser.close()
        print("DONE", OUT)


if __name__ == "__main__":
    main()
