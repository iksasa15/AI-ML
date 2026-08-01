#!/usr/bin/env python3
"""
Convert presentation PDF pages to images and merge into one image-based PDF.

Uses the already-exported light deck in pdf-exports/, starting at a given page
(default 35), preserving topic/section order.

Usage:
  python scripts/export-slides-as-images.py
  python scripts/export-slides-as-images.py --start 35 --dpi 140
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import fitz  # PyMuPDF


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "pdf-exports" / "AI-ML-Bootcamp-Slides.pdf"
DEFAULT_OUT = ROOT / "pdf-exports" / "AI-ML-Bootcamp-Slides-From-Page-35-Images.pdf"


def export_image_pdf(
    source: Path,
    output: Path,
    start_page: int = 35,
    dpi: int = 140,
) -> dict:
    if not source.is_file():
        raise FileNotFoundError(
            f"Source PDF not found: {source}\n"
            "Run `npm run export:pdf` first to generate the deck."
        )
    if start_page < 1:
        raise ValueError("start_page must be >= 1")

    src = fitz.open(source)
    total = src.page_count
    if start_page > total:
        src.close()
        raise ValueError(f"start_page {start_page} exceeds PDF length ({total})")

    # 1-based inclusive start → 0-based slice
    first_idx = start_page - 1
    page_indices = range(first_idx, total)
    zoom = dpi / 72.0
    matrix = fitz.Matrix(zoom, zoom)

    out = fitz.open()
    try:
        for n, idx in enumerate(page_indices, start=1):
            page = src.load_page(idx)
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            # Insert one image page sized to the rendered pixmap (points @ 72 dpi)
            width_pt = pix.width * 72 / dpi
            height_pt = pix.height * 72 / dpi
            new_page = out.new_page(width=width_pt, height=height_pt)
            new_page.insert_image(new_page.rect, pixmap=pix)
            if n == 1 or n % 25 == 0 or n == len(page_indices):
                print(f"  rendered {n}/{len(page_indices)} (source page {idx + 1})", flush=True)

        output.parent.mkdir(parents=True, exist_ok=True)
        out.save(output, deflate=True, garbage=3)
    finally:
        out.close()
        src.close()

    size_mb = output.stat().st_size / (1024 * 1024)
    return {
        "source": str(source),
        "output": str(output),
        "start_page": start_page,
        "pages": len(page_indices),
        "dpi": dpi,
        "size_mb": round(size_mb, 1),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--start", type=int, default=35, help="1-based start page (default 35)")
    parser.add_argument("--dpi", type=int, default=140, help="Render DPI (default 140)")
    args = parser.parse_args()

    print(f"Source: {args.source}")
    print(f"Start page: {args.start}  |  DPI: {args.dpi}")
    print(f"Output: {args.output}")
    info = export_image_pdf(args.source, args.output, args.start, args.dpi)
    print(
        f"\nDone: {info['pages']} image pages → {info['output']} ({info['size_mb']} MB)"
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
