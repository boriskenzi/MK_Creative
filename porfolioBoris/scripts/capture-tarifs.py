from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:5174/MK_Creative/tarifs"
OUT = Path(__file__).resolve().parent.parent / "tmp-mobile"
OUT.mkdir(exist_ok=True)


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(BASE, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / "tarifs-desktop.png"))
        page.get_by_role("button", name="Événements").click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "tarifs-wedding.png"))
        page.get_by_role("button", name="Graphisme").click()
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT / "tarifs-design.png"))

        mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
        mobile.goto(BASE, wait_until="networkidle", timeout=60000)
        mobile.wait_for_timeout(1200)
        mobile.screenshot(path=str(OUT / "tarifs-mobile.png"))
        mobile.get_by_role("button", name="Pack Essentiel").first.click()
        mobile.wait_for_timeout(400)
        mobile.screenshot(path=str(OUT / "tarifs-mobile-open.png"))
        mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        mobile.wait_for_timeout(400)
        mobile.screenshot(path=str(OUT / "tarifs-mobile-end.png"))
        browser.close()
        print("OK")


if __name__ == "__main__":
    main()
