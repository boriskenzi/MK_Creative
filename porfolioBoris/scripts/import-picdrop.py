"""Sync public Picdrop galleries onto the site when they change."""

from __future__ import annotations

from pathlib import Path
import argparse
import json
import os
import re
import shutil
import sys
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "galleries"
SNAPSHOT = ROOT / "src" / "data" / "picdrop-sync.json"

GALLERIES = [
    {"id": "visuels", "url": "https://www.picdrop.com/mrkenzi/mrkenzi"},
    {"id": "studio", "url": "https://www.picdrop.com/mrkenzi/9qW3ohvLzg"},
    {"id": "event", "url": "https://www.picdrop.com/mrkenzi/MXRbEtDwzD"},
]


def http_text(url: str) -> str:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; MKCreativeBot/1.0)"})
    with urlopen(req, timeout=60) as res:
        return res.read().decode("utf-8", "replace")


def asset_key(url: str) -> str:
    path = urlparse(url).path
    return path.rsplit("/", 1)[-1].lower()


def fetch_meta(url: str) -> dict:
    html = http_text(url)
    marker = "window.pdPageContext = "
    start = html.find(marker)
    if start < 0:
        raise RuntimeError(f"picdrop context missing: {url}")
    ctx, _ = json.JSONDecoder().raw_decode(html[start + len(marker) :])
    gallery = ctx["gallery"]
    teaser = ""
    thumbs = ((gallery.get("teaserImage") or {}).get("thumbnails") or [])
    if thumbs:
        teaser = asset_key(str(thumbs[0].get("url") or ""))
    return {
        "numFiles": int(gallery["numFiles"]),
        "timeLastModified": int(gallery["timeLastModified"]),
        "name": gallery.get("name") or "",
        "teaser": teaser,
    }


def load_snapshot() -> dict:
    if not SNAPSHOT.exists():
        return {}
    return json.loads(SNAPSHOT.read_text(encoding="utf-8"))


def save_snapshot(data: dict) -> None:
    SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def remote_meta() -> dict:
    return {gallery["id"]: fetch_meta(gallery["url"]) for gallery in GALLERIES}


def meta_changed(current: dict, previous: dict) -> bool:
    for gallery_id, meta in current.items():
        old = previous.get(gallery_id) or {}
        for key in ("numFiles", "timeLastModified", "teaser"):
            if old.get(key) != meta.get(key):
                return True
    return False


def inventory_changed(current: dict, previous: dict) -> bool:
    old_inv = previous.get("inventory") or {}
    new_inv = current.get("inventory") or {}
    return old_inv != new_inv


def pick_thumb(file_obj):
    thumbs = file_obj.get("thumbnails") or file_obj.get("preview") or []
    if isinstance(thumbs, dict):
        thumbs = thumbs.get("items") or thumbs.get("sizes") or []
    best = None
    best_w = 0
    for thumb in thumbs:
        if not isinstance(thumb, dict):
            continue
        url = thumb.get("url") or thumb.get("src")
        width = int(thumb.get("width") or 0)
        if not url:
            continue
        if 700 <= width <= 1400 and width >= best_w:
            best, best_w = url, width
        elif best is None:
            best, best_w = url, width
    return best or file_obj.get("url") or file_obj.get("src")


def collect_from_json(payload, found):
    if isinstance(payload, dict):
        looks_file = "thumbnails" in payload or "filename" in payload or "originalFilename" in payload
        if looks_file:
            url = pick_thumb(payload)
            if url and "public.picdrop.com" in str(url):
                name = payload.get("filename") or payload.get("originalFilename") or payload.get("name") or ""
                found.append({"url": url, "name": str(name), "key": asset_key(str(url))})
        for value in payload.values():
            collect_from_json(value, found)
    elif isinstance(payload, list):
        for value in payload:
            collect_from_json(value, found)


def download(url, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=60) as res, open(dest, "wb") as out:
        out.write(res.read())


def unique(items):
    seen = set()
    result = []
    for item in items:
        key = item.get("key") or item["url"]
        if key in seen:
            continue
        seen.add(key)
        result.append(item)
    return result


def slug_name(index, name):
    stem = Path(name).stem if name else ""
    stem = re.sub(r"[^a-zA-Z0-9_-]+", "-", stem).strip("-").lower()
    if not stem:
        stem = "frame"
    return f"{index:03d}-{stem[:48]}.jpg"


def launch_browser(playwright):
    return playwright.chromium.launch(headless=True)


def probe_gallery(page, gallery: dict) -> list[dict]:
    json_hits = []

    def on_response(response):
        ctype = (response.headers.get("content-type") or "").lower()
        url = response.url
        if "json" not in ctype and "application" not in ctype:
            return
        if any(skip in url for skip in ("i18n", "tracking", "gtm", "facebook", "google")):
            return
        try:
            data = response.json()
        except Exception:
            return
        json_hits.append(data)

    page.on("response", on_response)
    page.goto(gallery["url"], wait_until="load", timeout=90000)
    page.wait_for_timeout(2500)
    for _ in range(24):
        page.mouse.wheel(0, 1800)
        page.wait_for_timeout(350)

    found = []
    for payload in json_hits:
        collect_from_json(payload, found)
    found = [item for item in unique(found) if item["name"]]
    if not found:
        raise RuntimeError(f"no files found for {gallery['id']}")
    return found


def inventory_for(found: list[dict]) -> list[dict]:
    return [{"name": item["name"], "key": item["key"]} for item in found]


def import_galleries(previous: dict | None = None) -> tuple[dict, dict, bool]:
    from playwright.sync_api import sync_playwright

    previous = previous or {}
    old_inventory = previous.get("inventory") or {}
    summary = {}
    inventory = {}
    downloaded = False

    with sync_playwright() as p:
        browser = launch_browser(p)
        for gallery in GALLERIES:
            page = browser.new_page()
            found = probe_gallery(page, gallery)
            inv = inventory_for(found)
            inventory[gallery["id"]] = inv

            folder = OUT / gallery["id"]
            existing = [p for p in folder.glob("*") if p.is_file()] if folder.exists() else []
            if existing and len(found) < max(1, int(len(existing) * 0.7)):
                raise RuntimeError(
                    f"{gallery['id']} dropped too many files: {len(existing)} -> {len(found)}"
                )

            same_list = old_inventory.get(gallery["id"]) == inv
            if same_list and existing and len(existing) == len(found):
                summary[gallery["id"]] = {
                    "found": len(found),
                    "saved": 0,
                    "skipped": True,
                    "files": [p.name for p in sorted(existing)],
                }
                page.close()
                continue

            tmp = folder.parent / f".tmp-{gallery['id']}-{os.getpid()}"
            if tmp.exists():
                shutil.rmtree(tmp, ignore_errors=True)
            tmp.mkdir(parents=True, exist_ok=True)

            saved = 0
            for i, item in enumerate(found, start=1):
                dest = tmp / slug_name(i, item["name"])
                try:
                    download(item["url"], dest)
                    saved += 1
                except Exception as exc:
                    print("FAIL", gallery["id"], item["url"][:80], exc, file=sys.stderr)

            if saved < max(1, int(len(found) * 0.7)):
                shutil.rmtree(tmp, ignore_errors=True)
                raise RuntimeError(f"{gallery['id']} saved too few files: {saved}/{len(found)}")

            if folder.exists():
                for old in folder.glob("*"):
                    if old.is_file():
                        old.unlink()
            else:
                folder.mkdir(parents=True, exist_ok=True)
            for item in tmp.glob("*"):
                item.replace(folder / item.name)
            shutil.rmtree(tmp, ignore_errors=True)
            downloaded = True

            summary[gallery["id"]] = {
                "found": len(found),
                "saved": saved,
                "skipped": False,
                "files": [p.name for p in sorted(folder.glob("*"))],
            }
            page.close()
        browser.close()

    return summary, inventory, downloaded


def write_github_output(changed_flag: bool) -> None:
    path = os.environ.get("GITHUB_OUTPUT")
    if not path:
        return
    with open(path, "a", encoding="utf-8") as handle:
        handle.write(f"changed={'true' if changed_flag else 'false'}\n")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Compare Picdrop metadata only")
    parser.add_argument("--force", action="store_true", help="Probe + import when inventory differs")
    parser.add_argument("--if-changed", action="store_true", help="Import only when Picdrop changed")
    args = parser.parse_args()

    previous = load_snapshot()
    # Snapshot may be flat (legacy) or nested under "meta"
    previous_meta = previous.get("meta") if isinstance(previous.get("meta"), dict) else {
        key: value for key, value in previous.items() if key in {"visuels", "studio", "event"}
    }

    current_meta = remote_meta()
    soft_changed = meta_changed(current_meta, previous_meta)
    print(json.dumps({"meta": current_meta, "metaChanged": soft_changed}, indent=2))

    if args.check:
        write_github_output(soft_changed)
        return 0

    if args.if_changed and not soft_changed and not args.force:
        write_github_output(False)
        print("Picdrop metadata unchanged")
        return 0

    # Always probe inventory on scheduled/auto runs so replacements are detected
    # even when numFiles / timeLastModified stay the same.
    summary, inventory, downloaded = import_galleries(previous)
    snapshot = {"meta": current_meta, "inventory": inventory}
    hard_changed = inventory_changed(snapshot, previous) or downloaded or soft_changed
    save_snapshot(snapshot)
    write_github_output(hard_changed)
    print(json.dumps({"summary": summary, "changed": hard_changed}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
