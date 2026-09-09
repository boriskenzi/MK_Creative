from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-hero-3d"
OUT.mkdir(exist_ok=True)
URL = "http://localhost:5173/MK_Creative/"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1800)

        nav = page.locator("header nav.hidden a, header nav .nav-link").all_inner_texts()
        labels = [t.strip() for t in nav if t.strip()]
        contact = page.locator("header").get_by_text("Contact", exact=True).count()
        designer = page.get_by_text("DESIGNER", exact=True).count()
        brand = page.get_by_role("heading", name="Brand Design").count()
        photo_sub = page.get_by_text("Photographie et Vidéographie").count()
        tagline = page.get_by_text("Je suis Mr Kenzi, brand designer senior").count()
        accent = page.evaluate(
            "getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()"
        )
        avatar = page.locator("header img").first.get_attribute("src")

        left = page.evaluate(
            """() => {
              const col = document.querySelector('[data-print-hero] .w-fit')
              const name = col.querySelector('p')
              const studio = col.querySelector('h1')
              const nr = name.getBoundingClientRect()
              const sr = studio.getBoundingClientRect()
              return {
                nameLeft: Math.round(nr.left),
                studioLeft: Math.round(sr.left),
                diff: Math.round(nr.left - sr.left)
              }
            }"""
        )
        card = page.evaluate(
            """() => {
              const el = document.querySelector('.print-card')
              const r = el.getBoundingClientRect()
              return { w: Math.round(r.width), h: Math.round(r.height) }
            }"""
        )

        page.screenshot(path=str(OUT / "hero-review-desktop.png"), full_page=False)

        page.evaluate("window.scrollTo(0, 520)")
        page.wait_for_timeout(500)
        dispo = page.locator("header").get_by_text("Disponible", exact=True).count()
        pulse = page.locator("header .status-dot").count()
        page.screenshot(path=str(OUT / "hero-review-scrolled.png"), full_page=False)

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(URL, wait_until="networkidle")
        mobile.wait_for_timeout(1200)
        mobile.locator("header button[aria-label='Ouvrir le menu']").click()
        mobile.wait_for_timeout(400)
        mobile_nav = mobile.locator("header nav a").all_inner_texts()
        mobile.screenshot(path=str(OUT / "hero-review-mobile.png"), full_page=False)
        browser.close()

        print("NAV", labels)
        print("CONTACT_BTN", contact)
        print("DESIGNER", designer, "BRAND", brand, "SUB", photo_sub, "OLD_TAGLINE", tagline)
        print("ACCENT", accent)
        print("AVATAR", avatar)
        print("ALIGN", left)
        print("CARD", card)
        print("SCROLLED Disponible", dispo, "dot", pulse)
        print("MOBILE_NAV", [t.strip() for t in mobile_nav if t.strip()])


if __name__ == "__main__":
    main()
