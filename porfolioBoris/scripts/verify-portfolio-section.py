from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="msedge")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5173/MK_Creative/?reduced", wait_until="networkidle")
    page.wait_for_timeout(1500)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(800)
    text = page.inner_text("body")
    checks = {
        "intro": "Ce projet illustre l'alliance" in text,
        "portfolio": "PORTFOLIO" in text.upper(),
        "kabre": "Kabré Alidou" in text,
        "gombre": "Gombré Abdoul Kader" in text,
        "adele": "Nougtara Adèle" in text,
        "aicha": "Traoré Aïcha" in text,
        "quote1": "Que Dieu vous bénisse" in text,
        "quote4": "booster ma boutique" in text,
    }
    print(checks)
    print("len", len(text))
    browser.close()
