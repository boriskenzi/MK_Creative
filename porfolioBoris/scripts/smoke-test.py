from playwright.sync_api import sync_playwright

BASE = "http://localhost:5174"
pages = [
    ("Home", "/"),
    ("About", "/about"),
    ("Projects", "/projects"),
    ("Blogs", "/blogs"),
    ("Project detail", "/projects/summer-vibes-festival-campaign"),
    ("Blog detail", "/blogs/5-design-trends-that-will-define-2024"),
]

def main():
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("pageerror", lambda e: errors.append(str(e)))
        for name, path in pages:
            page.goto(BASE + path, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(800)
            title = page.locator("h1").first.inner_text()
            body = page.locator("body").inner_text()[:80].replace("\n", " ")
            print(f"OK {name:16} h1={title!r}")
        page.goto(BASE + "/", wait_until="networkidle")
        page.get_by_role("link", name="Projects").first.click()
        page.wait_for_url("**/projects")
        print("OK nav Home -> Projects")
        page.goto(BASE + "/#contact", wait_until="networkidle")
        page.wait_for_timeout(600)
        assert page.locator("#contact").count() == 1
        print("OK contact section #contact")
        browser.close()
    if errors:
        print("PAGE ERRORS:")
        for e in errors:
            print(" -", e)
        raise SystemExit(1)
    print("ALL TESTS PASSED")

if __name__ == "__main__":
    main()
