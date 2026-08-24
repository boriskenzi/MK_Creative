from pathlib import Path
import json
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-framer"
OUT.mkdir(exist_ok=True)

PAGES = [
    ("about", "https://stale-premise-814522.framer.app/about"),
    ("projects", "https://stale-premise-814522.framer.app/projects"),
    ("blogs", "https://stale-premise-814522.framer.app/blogs"),
    ("contact", "https://stale-premise-814522.framer.app/#contact"),
]

JS = """
() => {
  const images = [...document.querySelectorAll('img')].map((img) => ({
    src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight
  }));
  const texts = [...document.querySelectorAll('h1,h2,h3,p,button,a')]
    .map((el) => (el.innerText || '').trim())
    .filter(Boolean)
    .slice(0, 80);
  return { images, texts };
}
"""

def shots(page, name):
    page.screenshot(path=str(OUT / f"{name}-top.png"), full_page=False)
    for i, y in enumerate([900, 1800, 2700, 3600, 4500]):
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / f"{name}-s{i+2}.png"), full_page=False)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        for name, url in PAGES:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(3500)
            data = page.evaluate(JS)
            (OUT / f"{name}.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
            shots(page, name)
            print(f"ok {name} images={len(data['images'])}")
        # remaining home sections
        page.goto("https://stale-premise-814522.framer.app/", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(3000)
        for i, y in enumerate([6300, 7200, 8100, 9000, 9900]):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(600)
            page.screenshot(path=str(OUT / f"home-s{i+8}.png"), full_page=False)
        print("home rest ok")
        browser.close()

if __name__ == "__main__":
    main()
