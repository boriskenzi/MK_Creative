from pathlib import Path
import json
import re
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-framer"
OUT.mkdir(exist_ok=True)

PAGES = [
    ("home", "https://stale-premise-814522.framer.app/"),
    ("about", "https://stale-premise-814522.framer.app/about"),
    ("projects", "https://stale-premise-814522.framer.app/projects"),
    ("blogs", "https://stale-premise-814522.framer.app/blogs"),
    ("contact", "https://stale-premise-814522.framer.app/#contact"),
    ("project-detail", "https://stale-premise-814522.framer.app/projects/summer-vibes-festival-campaign"),
    ("blog-detail", "https://stale-premise-814522.framer.app/blogs/5-design-trends-that-will-define-2024"),
]

EXTRACT_JS = """
() => {
  const body = getComputedStyle(document.body);
  const html = getComputedStyle(document.documentElement);
  const fonts = new Set();
  const colors = new Set();
  const images = [];
  document.querySelectorAll('*').forEach((el) => {
    const s = getComputedStyle(el);
    if (s.fontFamily) fonts.add(s.fontFamily.split(',')[0].replace(/['"]/g, '').trim());
    if (s.color) colors.add(s.color);
    if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
  });
  document.querySelectorAll('img').forEach((img) => {
    if (img.src) images.push({ src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight });
  });
  const bgImgs = [];
  document.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') bgImgs.push(bg);
  });
  const headings = [...document.querySelectorAll('h1,h2,h3,p,a,button,span')]
    .slice(0, 120)
    .map((el) => {
      const s = getComputedStyle(el);
      return {
        tag: el.tagName,
        text: (el.innerText || '').slice(0, 80),
        font: s.fontFamily,
        size: s.fontSize,
        weight: s.fontWeight,
        color: s.color,
        letterSpacing: s.letterSpacing,
        lineHeight: s.lineHeight,
      };
    })
    .filter((x) => x.text.trim());
  return {
    title: document.title,
    bodyBg: body.backgroundColor,
    bodyColor: body.color,
    htmlBg: html.backgroundColor,
    fonts: [...fonts],
    colors: [...colors].slice(0, 40),
    images,
    bgImgs: bgImgs.slice(0, 30),
    headings,
    viewport: { w: window.innerWidth, h: window.innerHeight },
  };
}
"""


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        for name, url in PAGES:
            page.goto(url, wait_until="networkidle", timeout=90000)
            page.wait_for_timeout(2500)
            page.screenshot(path=str(OUT / f"{name}-top.png"), full_page=False)
            page.screenshot(path=str(OUT / f"{name}-full.png"), full_page=True)
            data = page.evaluate(EXTRACT_JS)
            (OUT / f"{name}.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
            print(f"captured {name}: fonts={data.get('fonts')} bg={data.get('bodyBg')}")
        browser.close()


if __name__ == "__main__":
    main()
