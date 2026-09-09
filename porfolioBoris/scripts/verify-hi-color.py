from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "tmp-hero-3d"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="msedge")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.add_init_script("localStorage.setItem('mk-theme', 'light')")
    page.goto("http://localhost:5173/MK_Creative/", wait_until="networkidle", timeout=20000)
    page.wait_for_timeout(800)
    data = page.evaluate(
        """() => {
      const el = document.querySelector('.wave-orb')
      if (!el) return { found: false }
      const cs = getComputedStyle(el)
      const hi = el.querySelector('.wave-orb-hi')
      const hiCs = hi ? getComputedStyle(hi) : null
      return {
        found: true,
        tag: el.tagName,
        color: cs.color,
        hiColor: hiCs ? hiCs.color : null,
        text: el.innerText,
        htmlDark: document.documentElement.classList.contains('dark'),
      }
    }"""
    )
    print(data)
    page.screenshot(path=str(OUT / "hi-light.png"), clip={"x": 480, "y": 180, "width": 480, "height": 620})
    browser.close()
