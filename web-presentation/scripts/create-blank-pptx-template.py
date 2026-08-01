#!/usr/bin/env python3
"""
Soft minimal ETRA blank PowerPoint template (16:9).

Usage:
  python3 scripts/create-blank-pptx-template.py
"""

from __future__ import annotations

from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "assets" / "etra-logo.png"
OUT = ROOT / "pdf-exports" / "ETRA-Presentation-Blank-Template.pptx"

BG = RGBColor(0xFC, 0xFB, 0xFE)
WASH = RGBColor(0xF4, 0xF2, 0xF9)
ACCENT = RGBColor(0x5C, 0x45, 0xB0)
TEXT = RGBColor(0x22, 0x1E, 0x36)
MUTED = RGBColor(0x7A, 0x74, 0x96)
LINE = RGBColor(0xE8, 0xE4, 0xF2)
SOFT = RGBColor(0xC8, 0xC0, 0xDE)

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MX = Inches(0.9)


def _font(run, size, *, bold=False, color=TEXT):
    run.font.name = "Helvetica"
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = rPr.makeelement(qn(f"a:{tag}"), {})
            rPr.append(el)
        el.set("typeface", "Helvetica")


def text(slide, left, top, width, height, value, *, size=18, bold=False, color=TEXT, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = value
    _font(run, size, bold=bold, color=color)
    return box


def _no_shadow(shape):
    spPr = shape._element.spPr
    for child in list(spPr):
        if child.tag.endswith("effectLst"):
            spPr.remove(child)
    spPr.append(spPr.makeelement(qn("a:effectLst"), {}))


def rect(slide, left, top, width, height, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    _no_shadow(shape)
    return shape


def soft_card(slide, left, top, width, height):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = WASH
    shape.line.fill.background()
    try:
        shape.adjustments[0] = 0.12
    except Exception:
        pass
    _no_shadow(shape)
    return shape


def hairline(slide, left, top, width):
    return rect(slide, left, top, width, Inches(0.012), LINE)


def paint(slide):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = BG


def logo(slide, left=Inches(11.7), top=Inches(0.35), height=Inches(0.55)):
    if LOGO.is_file():
        slide.shapes.add_picture(str(LOGO), left, top, height=height)


def header(slide, label="Section  ·  Topic", num="01"):
    text(slide, MX, Inches(0.32), Inches(8), Inches(0.3), label, size=12, color=MUTED)
    text(slide, Inches(10.2), Inches(0.32), Inches(1.4), Inches(0.3), num, size=12, color=SOFT, align=PP_ALIGN.RIGHT)
    hairline(slide, MX, Inches(0.72), Inches(11.5))
    logo(slide)


def title_block(slide, title, subtitle=None):
    text(slide, MX, Inches(1.05), Inches(11), Inches(0.6), title, size=28, bold=True)
    if subtitle:
        text(slide, MX, Inches(1.6), Inches(11), Inches(0.35), subtitle, size=15, color=MUTED)


def main() -> None:
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    # Guide
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    header(s, "Template  ·  How to use", "00")
    title_block(s, "ETRA presentation template", "Soft · minimal · 16:9")
    tips = [
        "Duplicate a layout, then replace the placeholder text.",
        "Keep headers light — section label only.",
        "Use accent sparingly for current items and key words.",
        "Prefer short titles and calm spacing.",
    ]
    for i, tip in enumerate(tips):
        y = Inches(2.4) + Inches(i * 0.7)
        text(s, MX, y, Inches(0.35), Inches(0.4), "–", size=18, color=SOFT)
        text(s, MX + Inches(0.4), y, Inches(11), Inches(0.45), tip, size=17)

    # Title
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    logo(s, left=Inches(11.5), top=Inches(0.55), height=Inches(0.7))
    text(s, MX, Inches(2.15), Inches(10), Inches(0.35), "Week X  ·  Session Y", size=13, color=MUTED)
    text(s, MX, Inches(2.65), Inches(11), Inches(0.9), "Presentation title", size=44, bold=True)
    hairline(s, MX, Inches(3.7), Inches(1.2))
    text(s, MX, Inches(4.0), Inches(10), Inches(0.5), "Subtitle — one clear line", size=18, color=MUTED)
    text(s, MX, Inches(6.55), Inches(10), Inches(0.35), "Trainer  ·  Date  ·  Organization", size=13, color=SOFT)

    # Section
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    logo(s, left=Inches(11.5), top=Inches(0.55), height=Inches(0.65))
    text(s, MX, Inches(2.0), Inches(10), Inches(0.35), "Week X  ·  Session Y", size=13, color=MUTED)
    text(s, MX, Inches(2.5), Inches(11), Inches(0.85), "Section title", size=40, bold=True)
    hairline(s, MX, Inches(3.5), Inches(1.2))
    text(s, MX, Inches(3.8), Inches(10), Inches(0.4), "Short focus line for this section", size=16, color=MUTED)

    # Bullets
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    header(s)
    title_block(s, "Slide title", "Optional subtitle")
    for i, t in enumerate(["First point", "Second point", "Third point", "Fourth point"]):
        y = Inches(2.4) + Inches(i * 0.7)
        text(s, MX, y, Inches(0.35), Inches(0.4), "–", size=18, color=SOFT)
        text(s, MX + Inches(0.4), y, Inches(11), Inches(0.45), t, size=18)

    # Two columns
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    header(s)
    title_block(s, "Two ideas", "Side by side")
    soft_card(s, MX, Inches(2.35), Inches(5.5), Inches(4.0))
    soft_card(s, Inches(7.0), Inches(2.35), Inches(5.5), Inches(4.0))
    text(s, MX + Inches(0.4), Inches(2.7), Inches(4.7), Inches(0.4), "Left", size=16, bold=True)
    text(s, Inches(7.4), Inches(2.7), Inches(4.7), Inches(0.4), "Right", size=16, bold=True)
    text(s, MX + Inches(0.4), Inches(3.3), Inches(4.7), Inches(2), "Supporting copy", size=14, color=MUTED)
    text(s, Inches(7.4), Inches(3.3), Inches(4.7), Inches(2), "Supporting copy", size=14, color=MUTED)

    # Body
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    header(s)
    title_block(s, "Concept title", "Definition or explanation")
    soft_card(s, MX, Inches(2.35), Inches(11.5), Inches(4.0))
    text(s, MX + Inches(0.5), Inches(3.7), Inches(10.5), Inches(1), "Body paragraph goes here.", size=18, color=MUTED, align=PP_ALIGN.CENTER)

    # Blank
    s = prs.slides.add_slide(prs.slide_layouts[6])
    paint(s)
    header(s)
    soft_card(s, MX, Inches(1.2), Inches(11.5), Inches(5.4))
    text(s, MX, Inches(3.5), Inches(11.5), Inches(0.5), "Visual / diagram area", size=16, color=SOFT, align=PP_ALIGN.CENTER)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")


if __name__ == "__main__":
    main()
