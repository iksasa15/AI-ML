#!/usr/bin/env python3
"""
Download real tool logos + hero photos for the Arabic AI Tools workshop.

Rules:
  - NEVER invent letter placeholders
  - Prefer official site favicons + Simple Icons / Wikimedia SVGs
  - On failure: print FAIL and skip (do not fabricate a mark)

Cached under: public/assets/workshop-ai-tools-photos/
"""

from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "workshop-ai-tools-photos"
UA = "ETRA-WorkshopAssetFetcher/1.1"

PHOTOS: dict[str, str] = {
    "hero-cover.jpg": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    "hero-day1.jpg": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    "hero-day2.jpg": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
    "hero-day3.jpg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    "hero-research.jpg": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=80",
    "hero-media.jpg": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80",
    "hero-data.jpg": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    "hero-automation.jpg": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80",
    "hero-team.jpg": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    "hero-laptop.jpg": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
}

# filename → ordered list of real sources (SVG or PNG)
# First successful fetch wins.
ICON_SOURCES: dict[str, list[str]] = {
    "icon-openai.png": [
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
        "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
        "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
    ],
    "icon-anthropic.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
        "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
        "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
    ],
    "icon-gemini.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg",
        "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",
    ],
    "icon-perplexity.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/perplexity.svg",
        "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
    ],
    "icon-midjourney.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/midjourney.svg",
        "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
    ],
    "icon-leonardo.png": [
        "https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128",
        "https://www.google.com/s2/favicons?domain=app.leonardo.ai&sz=128",
    ],
    "icon-gamma.png": [
        "https://www.google.com/s2/favicons?domain=gamma.app&sz=128",
    ],
    "icon-beautifulai.png": [
        "https://www.google.com/s2/favicons?domain=www.beautiful.ai&sz=128",
        "https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128",
    ],
    "icon-heygen.png": [
        "https://www.google.com/s2/favicons?domain=heygen.com&sz=128",
    ],
    "icon-elevenlabs.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elevenlabs.svg",
        "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
    ],
    "icon-runway.png": [
        "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
        "https://www.google.com/s2/favicons?domain=runway.com&sz=128",
    ],
    "icon-zapier.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zapier.svg",
        "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
    ],
    "icon-make.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/make.svg",
        "https://www.google.com/s2/favicons?domain=www.make.com&sz=128",
        "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    ],
    "icon-notion.png": [
        "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg",
        "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    ],
    "icon-poe.png": [
        "https://www.google.com/s2/favicons?domain=poe.com&sz=128",
    ],
    "icon-chatpdf.png": [
        "https://www.google.com/s2/favicons?domain=www.chatpdf.com&sz=128",
        "https://www.google.com/s2/favicons?domain=chatpdf.com&sz=128",
    ],
}


def curl_bytes(url: str) -> bytes | None:
    cmd = [
        "curl", "-fsSL", "--max-time", "45",
        "-A", UA, url,
    ]
    try:
        proc = subprocess.run(cmd, check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    data = proc.stdout or b""
    if len(data) < 80:
        return None
    return data


def to_png_256(data: bytes, dest: Path) -> bool:
    """Rasterize SVG or normalize raster to 256×256 PNG on transparent/white pad."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    head = data.lstrip()[:200]
    is_svg = head.startswith(b"<svg") or head.startswith(b"<?xml") or b"<svg" in head[:500]

    if is_svg:
        try:
            import cairosvg

            png = cairosvg.svg2png(bytestring=data, output_width=256, output_height=256)
            Image.open(io.BytesIO(png)).convert("RGBA").save(dest, format="PNG")
            return True
        except Exception as exc:
            print(f"    SVG raster fail: {exc}")
            return False

    try:
        im = Image.open(io.BytesIO(data)).convert("RGBA")
    except Exception as exc:
        print(f"    image open fail: {exc}")
        return False

    # Reject tiny / empty / near-blank images
    if im.size[0] < 16 or im.size[1] < 16:
        return False
    # Upscale small favicons with nearest/bilinear to 256 canvas
    im.thumbnail((220, 220), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (256, 256), (255, 255, 255, 0))
    x = (256 - im.size[0]) // 2
    y = (256 - im.size[1]) // 2
    canvas.paste(im, (x, y), im)
    canvas.save(dest, format="PNG")
    return True


def fetch_icon(name: str, urls: list[str], *, force: bool = False) -> bool:
    dest = OUT / name
    if dest.is_file() and dest.stat().st_size > 500 and not force:
        # Still refresh if it looks like an old letter-placeholder (tiny unique palette
        # is OK for real SVGs; we force-refresh known fakes by deleting them in main)
        print(f"  skip {name}")
        return True

    for url in urls:
        print(f"  try {name} ← {url[:70]}…")
        data = curl_bytes(url)
        if not data:
            continue
        if to_png_256(data, dest):
            print(f"  ok {name} ({dest.stat().st_size} B)")
            return True
    print(f"  FAIL {name}: no real logo source succeeded")
    if dest.exists():
        dest.unlink()
    return False


def fetch_photo(name: str, url: str, *, force: bool = False) -> bool:
    dest = OUT / name
    if dest.is_file() and dest.stat().st_size > 1000 and not force:
        print(f"  skip {name}")
        return True
    data = curl_bytes(url)
    if not data:
        print(f"  FAIL {name}")
        return False
    try:
        im = Image.open(io.BytesIO(data)).convert("RGB")
        # Baseline JPEG — avoids progressive JPEG issues in some PowerPoint builds
        im.save(dest, format="JPEG", quality=88, optimize=True, progressive=False)
        print(f"  ok {name} ({dest.stat().st_size // 1024} KB baseline)")
        return True
    except Exception as exc:
        print(f"  FAIL {name}: {exc}")
        return False


def recompress_heroes_baseline() -> int:
    """Re-save existing hero-*.jpg as baseline JPEG in place."""
    n = 0
    for path in sorted(OUT.glob("hero-*.jpg")):
        try:
            im = Image.open(path).convert("RGB")
            im.save(path, format="JPEG", quality=88, optimize=True, progressive=False)
            print(f"  baseline {path.name}")
            n += 1
        except Exception as exc:
            print(f"  FAIL baseline {path.name}: {exc}")
    return n


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    # Remove known invented letter placeholders so they are never reused
    fake_markers = ("icon-openai.png", "icon-midjourney.png", "icon-canva.png", "icon-google.png")
    for name in fake_markers:
        p = OUT / name
        if p.exists():
            p.unlink()
            print(f"  removed fake {name}")

    print(f"Fetching heroes → {OUT}")
    ok_photo = sum(1 for n, u in PHOTOS.items() if fetch_photo(n, u))
    # Always baseline-recompress whatever is on disk
    recompress_heroes_baseline()

    print("Fetching real tool logos…")
    ok_icon = sum(1 for n, urls in ICON_SOURCES.items() if fetch_icon(n, urls, force=True))

    print(f"Done photos {ok_photo}/{len(PHOTOS)} · icons {ok_icon}/{len(ICON_SOURCES)}")


if __name__ == "__main__":
    main()
