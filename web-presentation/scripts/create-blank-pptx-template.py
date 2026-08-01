#!/usr/bin/env python3
"""
Blank PowerPoint template following ETRA Design System (pages 13–14).
"""

from __future__ import annotations

import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches

sys.path.insert(0, str(Path(__file__).resolve().parent))
from etra_brand import (  # noqa: E402
    MARGIN,
    MUTED,
    PRIMARY,
    SECONDARY,
    SLIDE_H,
    SLIDE_W,
    SOFT,
    WHITE,
    add_text,
    content_footer,
    content_header,
    gradient_fill,
    logo,
    paint_dark,
    paint_light,
    rect,
    right_rail,
    soft_card,
    title_block,
)

OUT = Path(__file__).resolve().parents[1] / "pdf-exports" / "ETRA-Presentation-Blank-Template.pptx"


def main() -> None:
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    # 01 Dark cover
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_dark(s)
    logo(s, height=Inches(0.4))
    add_text(s, MARGIN, Inches(2.3), Inches(11), Inches(0.35), "Week X  ·  Session Y", size=14, color=SECONDARY)
    add_text(s, MARGIN, Inches(2.8), Inches(11.5), Inches(0.9), "Presentation title", size=44, bold=True, color=WHITE)
    bar = rect(s, MARGIN, Inches(3.9), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(s, MARGIN, Inches(4.25), Inches(10), Inches(0.45), "Subtitle — one clear line", size=17, color=SOFT)
    add_text(s, MARGIN, Inches(6.7), Inches(4), Inches(0.3), "ETRA", size=12, bold=True, color=SECONDARY)

    # 02 Bullets
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(s)
    right_rail(s)
    content_header(s, "S01  ·  Section", "02")
    title_block(s, "Slide title", "Optional subtitle")
    for i, t in enumerate(["First point", "Second point", "Third point", "Fourth point"]):
        y = Inches(2.35) + Inches(i * 0.68)
        add_text(s, MARGIN, y, Inches(0.35), Inches(0.4), "–", size=18, color=SECONDARY)
        add_text(s, MARGIN + Inches(0.4), y, Inches(11), Inches(0.45), t, size=18)
    content_footer(s, 2, 6)

    # 03 Two columns
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(s)
    right_rail(s)
    content_header(s, "S01  ·  Section", "03")
    title_block(s, "Compare / two columns")
    soft_card(s, MARGIN, Inches(2.3), Inches(5.7), Inches(4.0))
    soft_card(s, Inches(7.0), Inches(2.3), Inches(5.7), Inches(4.0))
    add_text(s, MARGIN + Inches(0.35), Inches(2.6), Inches(5), Inches(0.4), "Left", size=16, bold=True, color=PRIMARY)
    add_text(s, Inches(7.35), Inches(2.6), Inches(5), Inches(0.4), "Right", size=16, bold=True, color=PRIMARY)
    content_footer(s, 3, 6)

    # 04 Card grid
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(s)
    right_rail(s)
    content_header(s, "S01  ·  Section", "04")
    title_block(s, "Title + cards")
    positions = [
        (MARGIN, Inches(2.3)),
        (Inches(7.0), Inches(2.3)),
        (MARGIN, Inches(4.45)),
        (Inches(7.0), Inches(4.45)),
    ]
    for i, (x, y) in enumerate(positions, 1):
        soft_card(s, x, y, Inches(5.7), Inches(1.9))
        add_text(s, x + Inches(0.35), y + Inches(0.35), Inches(5), Inches(0.35), f"Card {i}", size=15, bold=True, color=PRIMARY)
        add_text(s, x + Inches(0.35), y + Inches(0.85), Inches(5), Inches(0.6), "Supporting copy", size=13, color=MUTED)
    content_footer(s, 4, 6)

    # 05 Quote
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(s)
    right_rail(s)
    content_header(s, "S01  ·  Section", "05")
    add_text(
        s,
        MARGIN,
        Inches(3.2),
        Inches(12),
        Inches(1.2),
        "“A short centered message or quote.”",
        size=28,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    content_footer(s, 5, 6)

    # 06 Dark closing
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint_dark(s)
    logo(s, height=Inches(0.4))
    add_text(s, MARGIN, Inches(3.0), Inches(12), Inches(0.8), "Thank you", size=40, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_text(s, MARGIN, Inches(3.9), Inches(12), Inches(0.4), "@etrahub", size=16, color=SECONDARY, align=PP_ALIGN.CENTER)
    add_text(s, MARGIN, Inches(6.7), Inches(4), Inches(0.3), "ETRA", size=12, bold=True, color=SECONDARY)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")


if __name__ == "__main__":
    main()
