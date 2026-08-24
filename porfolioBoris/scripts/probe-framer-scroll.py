from playwright.sync_api import sync_playwright

URL = "https://stale-premise-814522.framer.app/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(3000)

    for y in [0, 1200, 2400, 3600]:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(900)
        rows = page.evaluate(
            """() => {
              const nodes = [...document.querySelectorAll('h1,h2,h3,img,section,div')]
                .filter(el => {
                  const r = el.getBoundingClientRect();
                  return r.top > -200 && r.top < 1100 && r.width > 200;
                })
                .slice(0, 20)
                .map(el => {
                  const s = getComputedStyle(el);
                  const t = s.transform;
                  if (t === 'none' && s.opacity === '1') return null;
                  return {
                    tag: el.tagName,
                    text: (el.innerText || el.alt || '').slice(0, 35),
                    transform: t,
                    opacity: s.opacity,
                    top: Math.round(el.getBoundingClientRect().top),
                  };
                })
                .filter(Boolean);
              return { scrollY: window.scrollY, nodes };
            }"""
        )
        print(f"\n=== scroll {rows['scrollY']} ===")
        for n in rows["nodes"][:12]:
            print(n)

    browser.close()
