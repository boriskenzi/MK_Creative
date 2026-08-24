from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-framer"
OUT.mkdir(exist_ok=True)

PAGES = [
    ("ours-home", "http://localhost:5174/"),
    ("ours-about", "http://localhost:5174/about"),
    ("ours-projects", "http://localhost:5174/projects"),
    ("ours-blogs", "http://localhost:5174/blogs"),
]

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        for name, url in PAGES:
            page.goto(url, wait_until="networkidle", timeout=60000)
            page.wait_for_timeout(1500)
            page.screenshot(path=str(OUT / f"{name}-top.png"), full_page=False)
            page.evaluate("window.scrollTo(0, 900)")
            page.wait_for_timeout(400)
            page.screenshot(path=str(OUT / f"{name}-s2.png"), full_page=False)
            print("ok", name)
        browser.close()

if __name__ == "__main__":
    main()
