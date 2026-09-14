from playwright.sync_api import sync_playwright

BASE = "http://localhost:5173/MK_Creative/"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, channel="msedge")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(BASE, wait_until="load", timeout=60000)
        page.wait_for_selector("header")
        if page.locator(".back-to-top").count():
            raise SystemExit("back-to-top visible at top")
        page.evaluate("() => window.scrollTo(0, 1400)")
        page.wait_for_timeout(600)
        btn = page.locator(".back-to-top")
        if not btn.is_visible():
            raise SystemExit("back-to-top missing after scroll")
        page.screenshot(path="tmp-realisations/back-to-top-desktop.png")
        btn.click()
        page.wait_for_timeout(900)
        y = page.evaluate("() => window.scrollY")
        if y > 40:
            raise SystemExit(f"did not return to top: {y}")
        page.wait_for_timeout(400)
        if page.locator(".back-to-top").count():
            raise SystemExit("back-to-top still visible at top")

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile.goto(BASE, wait_until="load", timeout=60000)
        mobile.wait_for_selector("header")
        mobile.evaluate("() => window.scrollTo(0, 900)")
        mobile.wait_for_timeout(700)
        if not mobile.locator(".back-to-top").is_visible():
            raise SystemExit("mobile back-to-top missing")
        mobile.screenshot(path="tmp-realisations/back-to-top-mobile.png")
        mobile.locator(".back-to-top").click()
        mobile.wait_for_timeout(900)
        my = mobile.evaluate("() => window.scrollY")
        if my > 40:
            raise SystemExit(f"mobile did not return to top: {my}")
        print("BACK TO TOP OK")
        browser.close()


if __name__ == "__main__":
    main()
