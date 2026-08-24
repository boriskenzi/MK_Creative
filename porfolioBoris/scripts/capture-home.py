from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-framer"
OUT.mkdir(exist_ok=True)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("https://stale-premise-814522.framer.app/", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(4000)
        page.screenshot(path=str(OUT / "home-top.png"), full_page=False)
        print("top ok")
        page.screenshot(path=str(OUT / "home-mid.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        page.evaluate("window.scrollTo(0, 900)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s2.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 1800)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s3.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 2700)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s4.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 3600)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s5.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 4500)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s6.png"), full_page=False)
        page.evaluate("window.scrollTo(0, 5400)")
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "home-s7.png"), full_page=False)
        print("done")
        browser.close()

if __name__ == "__main__":
    main()
