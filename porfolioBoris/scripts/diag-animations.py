"""Diagnostic rapide des animations GSAP (Playwright)."""
from playwright.sync_api import sync_playwright


def snapshot(page, label, scroll=0):
    page.evaluate(f"window.scrollTo(0, {scroll})")
    page.wait_for_timeout(900)
    data = page.evaluate(
        """() => {
          const reveals = [...document.querySelectorAll('[data-reveal]')];
          const heroes = [...document.querySelectorAll('[data-hero]')];
          const stack = [...document.querySelectorAll('[data-stack-card]')];
          return {
            scrollY: window.scrollY,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            hero: heroes.map(e => ({
              op: getComputedStyle(e).opacity,
              vis: getComputedStyle(e).visibility,
            })),
            revealVis: reveals.filter(e => getComputedStyle(e).opacity === '1').length,
            revealHid: reveals.filter(e => getComputedStyle(e).opacity === '0').length,
            stackCards: stack.length,
            stackOps: stack.map(e => getComputedStyle(e).opacity),
            pinSpacer: document.querySelectorAll('.pin-spacer').length,
          };
        }"""
    )
    print(label, data)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5173/", wait_until="domcontentloaded")
    page.wait_for_timeout(80)
    snapshot(page, "hero ~80ms", 0)

    page.goto("http://localhost:5173/", wait_until="networkidle")
    page.wait_for_timeout(500)
    snapshot(page, "desktop t=0", 0)
    snapshot(page, "desktop scroll 800", 800)
    snapshot(page, "desktop scroll 3500", 3500)

    ctx = browser.new_context(
        viewport={"width": 1440, "height": 900},
        reduced_motion="reduce",
    )
    page_rm = ctx.new_page()
    page_rm.goto("http://localhost:5173/", wait_until="networkidle")
    page_rm.wait_for_timeout(800)
    snapshot(page_rm, "reduced-motion", 0)

    page_m = browser.new_page(viewport={"width": 375, "height": 812})
    page_m.goto("http://localhost:5173/", wait_until="networkidle")
    page_m.wait_for_timeout(800)
    data_m = page_m.evaluate(
        """() => ({
          pin: document.querySelectorAll('.pin-spacer').length,
          stack: document.querySelectorAll('[data-stack-card]').length,
          dots: document.querySelectorAll('button[aria-label^="Projet"]').length,
        })"""
    )
    print("mobile", data_m)

    browser.close()
