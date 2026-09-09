from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-hero-3d"
URL = "http://localhost:5173/MK_Creative/"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1200)
        page.evaluate("window.scrollTo(0, 980)")
        page.wait_for_timeout(900)
        data = page.evaluate(
            """() => {
              const sections = [...document.querySelectorAll('main section')]
              const who = sections[1]
              const titles = [...who.querySelectorAll('.service-trigger span')].map((el) => el.innerText.trim())
              const items = [...who.querySelectorAll('.service-item')].map((el) => el.innerText.trim())
              const icons = who.querySelectorAll('.service-item svg').length
              const body = who.querySelector('p')?.innerText
              const imgs = [...document.querySelectorAll('.print-card img')].map((img) => img.getAttribute('src'))
              return { body, titles, items, icons, imgs }
            }"""
        )
        page.screenshot(path=str(OUT / "section2-who.png"), full_page=False)
        page.get_by_role("button", name="Photographie").click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "section2-photo.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 1750)")
        page.wait_for_timeout(600)
        page.screenshot(path=str(OUT / "section3-about.png"), full_page=False)
        print(data)
        browser.close()


if __name__ == "__main__":
    main()
