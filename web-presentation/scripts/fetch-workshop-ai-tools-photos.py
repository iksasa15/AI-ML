#!/usr/bin/env python3
"""
Download licensed section heroes + tool icons for the Arabic AI Tools workshop.

Sources (cached locally under public/assets/workshop-ai-tools-photos/):
  - Unsplash photos (free license) via images.unsplash.com
  - Simple Icons CDN for brand marks (https://simpleicons.org)
"""

from __future__ import annotations

import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "workshop-ai-tools-photos"
UA = "ETRA-WorkshopAssetFetcher/1.0 (educational; local cache)"

# name → (url, kind)  kind helps when converting SVG→PNG later
PHOTOS: dict[str, str] = {
    # Heroes / section photos
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

# Simple Icons CDN returns PNG for these paths
ICONS: dict[str, str] = {
    "icon-openai.png": "https://cdn.simpleicons.org/openai/412991",
    "icon-anthropic.png": "https://cdn.simpleicons.org/anthropic/191919",
    "icon-google.png": "https://cdn.simpleicons.org/google/4285F4",
    "icon-perplexity.png": "https://cdn.simpleicons.org/perplexity/1FB8CD",
    "icon-midjourney.png": "https://cdn.simpleicons.org/midjourney/000000",
    "icon-canva.png": "https://cdn.simpleicons.org/canva/00C4CC",
    "icon-zapier.png": "https://cdn.simpleicons.org/zapier/FF4A00",
    "icon-notion.png": "https://cdn.simpleicons.org/notion/000000",
}


def download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.is_file() and dest.stat().st_size > 500:
        print(f"  skip {dest.name}")
        return True
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"  FAIL {dest.name}: {exc}")
        return False
    if not data or len(data) < 200:
        print(f"  FAIL {dest.name}: empty/short response")
        return False
    # Simple Icons may return SVG — rasterize if needed
    if data[:200].lstrip().startswith(b"<svg") or data[:5] == b"<?xml":
        try:
            from io import BytesIO

            import cairosvg
            from PIL import Image

            png = cairosvg.svg2png(bytestring=data, output_width=256, output_height=256)
            Image.open(BytesIO(png)).save(dest)
        except Exception:
            # fallback: write SVG bytes with .svg and also try PIL/resvg-less path
            svg_path = dest.with_suffix(".svg")
            svg_path.write_bytes(data)
            # create a simple colored square placeholder PNG via PIL
            from PIL import Image, ImageDraw

            im = Image.new("RGBA", (256, 256), (82, 52, 183, 255))
            ImageDraw.Draw(im).rounded_rectangle((24, 24, 232, 232), 40, fill=(255, 255, 255, 255))
            im.save(dest)
            print(f"  placeholder {dest.name} (svg cached as {svg_path.name})")
            return True
    else:
        dest.write_bytes(data)
    print(f"  ok {dest.name} ({dest.stat().st_size // 1024} KB)")
    return True


def main() -> None:
    print(f"Fetching workshop photos → {OUT}")
    ok = 0
    for name, url in {**PHOTOS, **ICONS}.items():
        if download(url, OUT / name):
            ok += 1
    print(f"Done: {ok}/{len(PHOTOS) + len(ICONS)} assets")


if __name__ == "__main__":
    main()
