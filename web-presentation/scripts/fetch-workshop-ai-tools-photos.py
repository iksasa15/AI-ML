#!/usr/bin/env python3
"""
Download licensed section heroes + tool icons for the Arabic AI Tools workshop.

Sources (cached under public/assets/workshop-ai-tools-photos/):
  - Unsplash photos via images.unsplash.com
  - Simple Icons CDN (https://simpleicons.org) when available
  - Branded letter placeholders for icons not on Simple Icons

Uses curl for reliable downloads (urllib can hang on some networks).
"""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "workshop-ai-tools-photos"
UA = "ETRA-WorkshopAssetFetcher/1.0"

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

# (filename, simpleicons slug, hex color, fallback letter)
ICONS: list[tuple[str, str, str, str]] = [
    ("icon-openai.png", "openai", "412991", "O"),
    ("icon-anthropic.png", "anthropic", "191919", "A"),
    ("icon-google.png", "google", "4285F4", "G"),
    ("icon-perplexity.png", "perplexity", "1FB8CD", "P"),
    ("icon-midjourney.png", "midjourney", "000000", "M"),
    ("icon-canva.png", "canva", "00C4CC", "C"),
    ("icon-zapier.png", "zapier", "FF4A00", "Z"),
    ("icon-notion.png", "notion", "000000", "N"),
]


def curl_download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.is_file() and dest.stat().st_size > 500:
        print(f"  skip {dest.name}")
        return True
    cmd = [
        "curl", "-fsSL", "--max-time", "45",
        "-A", UA, "-o", str(dest), url,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError) as exc:
        print(f"  FAIL {dest.name}: {exc}")
        if dest.exists():
            dest.unlink()
        return False
    if not dest.is_file() or dest.stat().st_size < 200:
        print(f"  FAIL {dest.name}: empty")
        if dest.exists():
            dest.unlink()
        return False
    print(f"  ok {dest.name} ({dest.stat().st_size // 1024} KB)")
    return True


def placeholder_icon(dest: Path, color: str, letter: str) -> None:
    from PIL import Image, ImageDraw, ImageFont

    im = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((8, 8, 248, 248), 48, fill=f"#{color}")
    d.rounded_rectangle((48, 48, 208, 208), 36, fill="#FFFFFF")
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 96)
    except Exception:
        font = ImageFont.load_default()
    bbox = d.textbbox((0, 0), letter, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((256 - tw) / 2, (256 - th) / 2 - 8), letter, fill=f"#{color}", font=font)
    im.save(dest)


def rasterize_svg(svg_bytes: bytes, dest: Path, color: str, letter: str) -> None:
    try:
        import cairosvg
        from io import BytesIO
        from PIL import Image

        png = cairosvg.svg2png(bytestring=svg_bytes, output_width=256, output_height=256)
        Image.open(BytesIO(png)).save(dest)
    except Exception:
        placeholder_icon(dest, color, letter)


def fetch_icon(name: str, slug: str, color: str, letter: str) -> bool:
    dest = OUT / name
    if dest.is_file() and dest.stat().st_size > 500:
        print(f"  skip {name}")
        return True
    svg_path = OUT / f"{Path(name).stem}.svg"
    url = f"https://cdn.simpleicons.org/{slug}/{color}"
    if curl_download(url, svg_path):
        data = svg_path.read_bytes()
        if data.lstrip().startswith(b"<svg") or data[:5] == b"<?xml":
            rasterize_svg(data, dest, color, letter)
            print(f"  ok {name} (from SVG)")
            return True
    placeholder_icon(dest, color, letter)
    print(f"  ok {name} (placeholder)")
    return True


def main() -> None:
    print(f"Fetching workshop photos → {OUT}")
    ok = 0
    for name, url in PHOTOS.items():
        if curl_download(url, OUT / name):
            ok += 1
    for name, slug, color, letter in ICONS:
        if fetch_icon(name, slug, color, letter):
            ok += 1
    total = len(PHOTOS) + len(ICONS)
    print(f"Done: {ok}/{total} assets")


if __name__ == "__main__":
    main()
