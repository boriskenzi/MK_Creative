from playwright.sync_api import sync_playwright

BASE = "http://localhost:5173/MK_Creative/"


def photo_box(page):
    photo = page.locator(".contact-board-photo").bounding_box()
    form = page.locator(".contact-board-form").bounding_box()
    if not photo or not form:
        raise SystemExit("missing photo or form")
    return photo, form


def assert_print(photo, name):
    ratio = photo["height"] / photo["width"]
    if abs(ratio - 1.25) > 0.08:
        raise SystemExit(f"{name}: expected 4/5 print, ratio={ratio:.2f}")


def shot(page, name):
    page.locator("#contact").scroll_into_view_if_needed()
    page.wait_for_timeout(200)
    page.locator("#contact").screenshot(path=f"tmp-realisations/contact-{name}.png")


def check_mobile(page):
    photo, form = photo_box(page)
    assert_print(photo, "mobile")
    if form["y"] < photo["y"] + photo["height"] - 12:
        raise SystemExit(
            f"mobile: form should sit under photo photo_bottom={photo['y'] + photo['height']} form_y={form['y']}"
        )
    if form["width"] < 300:
        raise SystemExit(f"mobile: form too narrow {form['width']}")
    if photo["width"] > 280:
        raise SystemExit(f"mobile: print should match other portraits, width={photo['width']}")
    shot(page, "mobile")


def check_desktop(page):
    photo, form = photo_box(page)
    assert_print(photo, "desktop")
    if abs(photo["y"] - form["y"]) > 80:
        raise SystemExit(f"desktop: not aligned photo={photo['y']} form={form['y']}")
    if form["x"] < photo["x"] + photo["width"] - 24:
        raise SystemExit(
            f"desktop: form should sit right of photo photo_right={photo['x'] + photo['width']} form_x={form['x']}"
        )
    if photo["width"] < 240:
        raise SystemExit(f"desktop: photo too narrow {photo['width']}")
    shot(page, "desktop")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel="msedge")

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.add_init_script("localStorage.setItem('mk-theme','light')")
    mobile.goto(BASE, wait_until="load")
    mobile.wait_for_selector("#contact")
    check_mobile(mobile)

    tablet = browser.new_page(viewport={"width": 768, "height": 1024})
    tablet.add_init_script("localStorage.setItem('mk-theme','light')")
    tablet.goto(BASE, wait_until="load")
    tablet.wait_for_selector("#contact")
    photo, form = photo_box(tablet)
    assert_print(photo, "tablet")
    if form["x"] < photo["x"] + photo["width"] - 24:
        raise SystemExit("tablet: expected side-by-side from 768")
    shot(tablet, "tablet")

    desktop = browser.new_page(viewport={"width": 1440, "height": 900})
    desktop.add_init_script("localStorage.setItem('mk-theme','light')")
    desktop.goto(BASE, wait_until="load")
    desktop.wait_for_selector("#contact")
    check_desktop(desktop)

    dark = browser.new_page(viewport={"width": 1440, "height": 900})
    dark.add_init_script("localStorage.setItem('mk-theme','dark')")
    dark.goto(BASE, wait_until="load")
    dark.wait_for_selector("#contact")
    shot(dark, "desktop-dark")

    mobile_dark = browser.new_page(viewport={"width": 390, "height": 844})
    mobile_dark.add_init_script("localStorage.setItem('mk-theme','dark')")
    mobile_dark.goto(BASE, wait_until="load")
    mobile_dark.wait_for_selector("#contact")
    shot(mobile_dark, "mobile-dark")

    form_page = browser.new_page(viewport={"width": 1440, "height": 900})
    form_page.add_init_script("localStorage.setItem('mk-theme','light')")
    form_page.goto(BASE, wait_until="load")
    form_page.wait_for_selector("#contact")
    submit = form_page.locator("#contact button[type=submit]")
    if submit.is_enabled():
        raise SystemExit("submit should start disabled")
    form_page.locator("#contact input[name=name]").fill("Awa")
    form_page.locator("#contact input[name=email]").fill("awa@studio.test")
    form_page.locator("#contact textarea[name=message]").fill("Bonjour, shooting studio.")
    if not submit.is_enabled():
        raise SystemExit("submit stayed disabled after required fields")

    about = browser.new_page(viewport={"width": 390, "height": 844})
    about.add_init_script("localStorage.setItem('mk-theme','light')")
    about.goto(BASE + "about", wait_until="load")
    about.wait_for_selector("#contact")
    photo, form = photo_box(about)
    if form["y"] < photo["y"] + photo["height"] - 12:
        raise SystemExit("about mobile: form not under photo")
    shot(about, "about-mobile")

    print("OK")
    browser.close()
