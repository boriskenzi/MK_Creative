from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="msedge")
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto("http://localhost:5173/MK_Creative/", wait_until="networkidle")
    page.wait_for_timeout(2000)
    print("title", page.title())
    print("url", page.url)
    print("errors", errors[:5])
    print("body_len", len(page.inner_text("body")))
    print("sample", page.inner_text("body")[:500])
    browser.close()
