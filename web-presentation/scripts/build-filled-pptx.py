#!/usr/bin/env python3
"""
Build a filled ETRA presentation from structured session content.

Usage:
  python3 scripts/build-filled-pptx.py
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
OUT = ROOT / "pdf-exports" / "Week1-Session1-Foundations.pptx"

BG = RGBColor(0xF8, 0xF7, 0xFC)
BG_SUBTLE = RGBColor(0xF0, 0xEE, 0xF8)
SURFACE = RGBColor(0xFF, 0xFF, 0xFF)
ACCENT = RGBColor(0x52, 0x34, 0xB7)
ACCENT_2 = RGBColor(0x9E, 0x59, 0xCD)
TEXT = RGBColor(0x1A, 0x15, 0x33)
MUTED = RGBColor(0x6B, 0x64, 0x90)
DIVIDER_BG = RGBColor(0x0D, 0x0D, 0x1A)
DIVIDER_SURFACE = RGBColor(0x1A, 0x1A, 0x35)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
SOFT_PURPLE = RGBColor(0xED, 0xE8, 0xFA)
PLACEHOLDER = RGBColor(0xB0, 0xA8, 0xD4)
CARD_EDGE = RGBColor(0xE4, 0xDE, 0xF4)

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MARGIN_X = Inches(0.7)

# ── Content ────────────────────────────────────────────────────────────────

SESSION = {
    "eyebrow": "WEEK 1  ·  SESSION 1",
    "section_number": "01",
    "section_tag": "S01",
    "section_title": "Foundations",
    "subtitle": "Data pre-processing for reliable machine learning",
    "trainer_line": "AI & Machine Learning Bootcamp",
    "focus": "Data Pre-Processing",
    "topics": [
        "Data Pre-Processing",
        "Train/test splits",
        "Feature scaling",
        "Encoding & imputation",
        "Data leakage",
    ],
}

ML_PROCESS = {
    "title": "The Machine Learning Process",
    "subtitle": "The 3 Main Steps",
    "steps": [
        {
            "number": "01",
            "title": "Data Pre-Processing",
            "bullets": [
                "Import the data",
                "Clean the data",
                "Split into training and test sets",
                "Feature scaling",
            ],
        },
        {
            "number": "02",
            "title": "Modelling",
            "bullets": [
                "Build the model",
                "Train the model",
                "Make predictions",
            ],
        },
        {
            "number": "03",
            "title": "Evaluation",
            "bullets": [
                "Calculate performance metrics",
                "Make a final prediction",
            ],
        },
    ],
}

BIG_PICTURE = {
    "eyebrow": "BIG PICTURE",
    "title": "Where Are We in the Bootcamp?",
    "focus": "Build the end-to-end ML workflow: clean data → train → evaluate.",
    "current": "S1",
    "weeks": [
        {
            "label": "WEEK 1",
            "sessions": [
                ("S1", "Foundations & Preprocessing"),
                ("S2", "Regression Models"),
                ("S3", "Classification Basics"),
                ("S4", "Naive Bayes & Trees"),
                ("S5", "SVM & Kernels"),
                ("S6", "Clustering & PCA"),
            ],
        },
        {
            "label": "WEEK 2",
            "sessions": [
                ("S7", "Deep Learning"),
            ],
        },
        {
            "label": "WEEK 3",
            "sessions": [
                ("S8", "NLP Fundamentals"),
                ("S9", "Tokenization"),
                ("S10", "Text Analysis & NER"),
                ("S11", "Language Modeling"),
                ("S12", "Embeddings & RNNs"),
                ("S13", "Seq2Seq & NMT"),
            ],
        },
        {
            "label": "WEEK 4",
            "sessions": [
                ("S14", "Generative AI"),
                ("S15", "RAG Systems"),
                ("S16", "MLOps"),
            ],
        },
    ],
}


def _set_run(run, *, size_pt: float, bold: bool = False, color=TEXT, font="Helvetica"):
    run.font.name = font
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = rPr.makeelement(qn(f"a:{tag}"), {})
            rPr.append(el)
        el.set("typeface", font)


def _add_textbox(
    slide,
    left,
    top,
    width,
    height,
    text,
    *,
    size=18,
    bold=False,
    color=TEXT,
    align=PP_ALIGN.LEFT,
    anchor=MSO_ANCHOR.TOP,
):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    try:
        tf._txBody.bodyPr.set(
            "anchor",
            {MSO_ANCHOR.TOP: "t", MSO_ANCHOR.MIDDLE: "ctr", MSO_ANCHOR.BOTTOM: "b"}[anchor],
        )
    except Exception:
        pass
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    _set_run(run, size_pt=size, bold=bold, color=color)
    return box


def _round_rect(slide, left, top, width, height, fill, *, line=None, line_w=1.0, adj=0.08):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(line_w)
    try:
        shape.adjustments[0] = adj
    except Exception:
        pass
    return shape


def _rect(slide, left, top, width, height, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    return shape


def _ellipse(slide, left, top, width, height, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.OVAL, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    return shape


def _set_gradient(shape, c1: RGBColor, c2: RGBColor, angle: float = 135.0):
    fill = shape.fill
    fill.gradient()
    fill.gradient_angle = angle
    stops = fill.gradient_stops
    stops[0].color.rgb = c1
    stops[1].color.rgb = c2


def _paint_bg(slide, *, dark=False):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = DIVIDER_BG if dark else BG


def _atmosphere(slide):
    _ellipse(slide, Inches(10.2), Inches(-1.4), Inches(5.2), Inches(5.2), SOFT_PURPLE)
    _ellipse(slide, Inches(-1.8), Inches(4.8), Inches(4.5), Inches(4.5), BG_SUBTLE)


def _add_header(slide, section_tag, section_label, slide_num):
    _rect(slide, 0, 0, SLIDE_W, Inches(0.78), SURFACE)
    _rect(slide, 0, Inches(0.78), SLIDE_W, Inches(0.035), ACCENT)
    _round_rect(slide, MARGIN_X, Inches(0.2), Inches(1.35), Inches(0.38), SOFT_PURPLE, adj=0.5)
    _add_textbox(
        slide,
        MARGIN_X,
        Inches(0.22),
        Inches(1.35),
        Inches(0.35),
        section_tag,
        size=11,
        bold=True,
        color=ACCENT,
        align=PP_ALIGN.CENTER,
        anchor=MSO_ANCHOR.MIDDLE,
    )
    _add_textbox(
        slide,
        Inches(2.25),
        Inches(0.22),
        Inches(7.7),
        Inches(0.35),
        section_label,
        size=13,
        color=MUTED,
        anchor=MSO_ANCHOR.MIDDLE,
    )
    _add_textbox(
        slide,
        Inches(10.4),
        Inches(0.22),
        Inches(2.2),
        Inches(0.35),
        slide_num,
        size=12,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
        anchor=MSO_ANCHOR.MIDDLE,
    )


def _add_footer(slide, progress, *, dark=False, total=1, index=1):
    track = RGBColor(0x2A, 0x2A, 0x4A) if dark else CARD_EDGE
    fill_c = ACCENT_2 if dark else ACCENT
    _round_rect(slide, MARGIN_X, Inches(7.18), Inches(11.9), Inches(0.1), track, adj=0.5)
    fill_w = max(Inches(0.35), int(Inches(11.9) * min(max(progress, 0.02), 1.0)))
    _round_rect(slide, MARGIN_X, Inches(7.18), fill_w, Inches(0.1), fill_c, adj=0.5)


def _add_logo(slide, *, corner="content"):
    if not LOGO.is_file():
        return
    if corner == "hero":
        slide.shapes.add_picture(str(LOGO), Inches(11.05), Inches(0.4), height=Inches(1.05))
    elif corner == "divider":
        slide.shapes.add_picture(str(LOGO), Inches(11.15), Inches(0.4), height=Inches(0.95))
    else:
        slide.shapes.add_picture(str(LOGO), Inches(11.35), Inches(1.05), height=Inches(0.72))


def _title_block(slide, title, subtitle=None, *, top=Inches(1.05)):
    _add_textbox(slide, MARGIN_X, top, Inches(10.4), Inches(0.65), title, size=30, bold=True)
    _round_rect(slide, MARGIN_X, top + Inches(0.68), Inches(1.35), Inches(0.07), ACCENT, adj=0.5)
    if subtitle:
        _add_textbox(
            slide,
            MARGIN_X,
            top + Inches(0.88),
            Inches(10.4),
            Inches(0.4),
            subtitle,
            size=15,
            color=MUTED,
        )


def _bullet_row(slide, left, top, width, text, *, index=1):
    _round_rect(slide, left, top, width, Inches(0.78), SURFACE, line=CARD_EDGE, line_w=1.0, adj=0.12)
    _ellipse(slide, left + Inches(0.18), top + Inches(0.16), Inches(0.46), Inches(0.46), SOFT_PURPLE)
    _add_textbox(
        slide,
        left + Inches(0.18),
        top + Inches(0.2),
        Inches(0.46),
        Inches(0.4),
        f"{index:02d}",
        size=12,
        bold=True,
        color=ACCENT,
        align=PP_ALIGN.CENTER,
    )
    _add_textbox(
        slide,
        left + Inches(0.8),
        top + Inches(0.2),
        width - Inches(1.1),
        Inches(0.42),
        text,
        size=17,
        color=TEXT,
        anchor=MSO_ANCHOR.MIDDLE,
    )


def slide_title(prs, total):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    panel = _rect(slide, 0, 0, Inches(0.22), SLIDE_H, ACCENT)
    _set_gradient(panel, ACCENT, ACCENT_2, 90)
    _ellipse(slide, Inches(9.5), Inches(-2.0), Inches(6.5), Inches(6.5), SOFT_PURPLE)
    _ellipse(slide, Inches(11.2), Inches(4.2), Inches(3.8), Inches(3.8), BG_SUBTLE)
    _rect(slide, 0, Inches(6.55), SLIDE_W, Inches(0.95), SURFACE)
    _rect(slide, 0, Inches(6.55), SLIDE_W, Inches(0.04), ACCENT)
    _add_logo(slide, corner="hero")

    _round_rect(slide, Inches(0.9), Inches(1.85), Inches(3.4), Inches(0.38), SOFT_PURPLE, adj=0.5)
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(1.87),
        Inches(3.4),
        Inches(0.35),
        s["eyebrow"],
        size=11,
        bold=True,
        color=ACCENT,
        align=PP_ALIGN.CENTER,
    )
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(2.5),
        Inches(10.8),
        Inches(1.15),
        s["section_title"],
        size=46,
        bold=True,
    )
    _round_rect(slide, Inches(0.9), Inches(3.7), Inches(1.6), Inches(0.08), ACCENT, adj=0.5)
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(4.0),
        Inches(9.5),
        Inches(0.55),
        s["subtitle"],
        size=20,
        color=MUTED,
    )
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(6.78),
        Inches(8.5),
        Inches(0.4),
        s["trainer_line"],
        size=13,
        color=MUTED,
    )
    _add_footer(slide, 1 / total)


def slide_big_picture(prs, total, index):
    bp = BIG_PICTURE
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    _atmosphere(slide)
    _add_header(slide, s["section_tag"], "Bootcamp map", f"{index:02d} / {total:02d}")
    _add_logo(slide)

    _add_textbox(
        slide,
        MARGIN_X,
        Inches(1.0),
        Inches(10.5),
        Inches(0.3),
        bp["eyebrow"],
        size=11,
        bold=True,
        color=ACCENT,
    )
    _add_textbox(
        slide,
        MARGIN_X,
        Inches(1.28),
        Inches(10.5),
        Inches(0.5),
        bp["title"],
        size=26,
        bold=True,
    )
    _add_textbox(
        slide,
        MARGIN_X,
        Inches(1.78),
        Inches(11.5),
        Inches(0.35),
        bp["focus"],
        size=13,
        color=MUTED,
    )

    weeks = bp["weeks"]
    col_w = Inches(2.95)
    gap = Inches(0.18)
    start_x = MARGIN_X
    map_top = Inches(2.25)
    map_h = Inches(4.5)

    for wi, week in enumerate(weeks):
        x = start_x + wi * (col_w + gap)
        # week column shell
        _round_rect(
            slide,
            x,
            map_top,
            col_w,
            map_h,
            SURFACE,
            line=CARD_EDGE,
            line_w=1.0,
            adj=0.06,
        )
        # week header bar
        header = _rect(slide, x, map_top, col_w, Inches(0.42), ACCENT if wi == 0 else SOFT_PURPLE)
        if wi == 0:
            _set_gradient(header, ACCENT, ACCENT_2, 0)
        _add_textbox(
            slide,
            x,
            map_top + Inches(0.05),
            col_w,
            Inches(0.35),
            week["label"],
            size=12,
            bold=True,
            color=WHITE if wi == 0 else ACCENT,
            align=PP_ALIGN.CENTER,
        )

        sessions = week["sessions"]
        # Compact cards — Week 1/3 have 6 items
        n = max(len(sessions), 1)
        available = map_h - Inches(0.55)
        card_h = min(Inches(0.58), available / n - Inches(0.06))
        for si, (sid, title) in enumerate(sessions):
            cy = map_top + Inches(0.52) + si * (card_h + Inches(0.06))
            is_current = sid == bp["current"]
            fill = SOFT_PURPLE if is_current else BG_SUBTLE
            border = ACCENT if is_current else CARD_EDGE
            _round_rect(
                slide,
                x + Inches(0.1),
                cy,
                col_w - Inches(0.2),
                card_h,
                fill,
                line=border,
                line_w=1.25 if is_current else 0.9,
                adj=0.15,
            )
            _add_textbox(
                slide,
                x + Inches(0.18),
                cy + Inches(0.04),
                Inches(0.45),
                card_h - Inches(0.08),
                sid,
                size=10,
                bold=True,
                color=ACCENT,
                anchor=MSO_ANCHOR.MIDDLE,
            )
            # Shorten long titles slightly for fit
            display = title
            if len(display) > 22:
                display = display.replace(" & ", "/")
            _add_textbox(
                slide,
                x + Inches(0.6),
                cy + Inches(0.04),
                col_w - Inches(0.85),
                card_h - Inches(0.08),
                display,
                size=10 if n >= 6 else 11,
                bold=is_current,
                color=TEXT,
                anchor=MSO_ANCHOR.MIDDLE,
            )

    _add_footer(slide, index / total)


def slide_section_divider(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide, dark=True)
    _ellipse(slide, Inches(-1.2), Inches(-1.5), Inches(5.5), Inches(5.5), RGBColor(0x1E, 0x14, 0x45))
    _ellipse(slide, Inches(9.8), Inches(3.5), Inches(5.0), Inches(5.0), RGBColor(0x22, 0x16, 0x48))
    _add_textbox(
        slide,
        Inches(0.5),
        Inches(1.4),
        Inches(4),
        Inches(2.2),
        s["section_number"],
        size=120,
        bold=True,
        color=RGBColor(0x2A, 0x22, 0x55),
    )
    _add_logo(slide, corner="divider")

    _round_rect(slide, Inches(0.9), Inches(2.35), Inches(3.4), Inches(0.38), RGBColor(0x2A, 0x1F, 0x55), adj=0.5)
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(2.37),
        Inches(3.4),
        Inches(0.35),
        s["eyebrow"],
        size=11,
        bold=True,
        color=ACCENT_2,
        align=PP_ALIGN.CENTER,
    )
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(3.0),
        Inches(11),
        Inches(1.1),
        s["section_title"],
        size=42,
        bold=True,
        color=WHITE,
    )
    _round_rect(slide, Inches(0.9), Inches(4.2), Inches(1.5), Inches(0.07), ACCENT_2, adj=0.5)
    _add_textbox(
        slide,
        Inches(0.9),
        Inches(4.5),
        Inches(9.5),
        Inches(0.55),
        s["focus"],
        size=17,
        color=PLACEHOLDER,
    )

    # Topic chips on two rows so longer labels fit
    row_y = [Inches(5.35), Inches(5.9)]
    x = Inches(0.9)
    row = 0
    for topic in s["topics"]:
        w = Inches(max(1.85, min(2.7, 0.12 * len(topic) + 1.0)))
        if x + w > Inches(12.6):
            row = min(row + 1, 1)
            x = Inches(0.9)
        _round_rect(
            slide,
            x,
            row_y[row],
            w,
            Inches(0.4),
            DIVIDER_SURFACE,
            line=RGBColor(0x3A, 0x30, 0x68),
            adj=0.5,
        )
        _add_textbox(
            slide,
            x,
            row_y[row] + Inches(0.02),
            w,
            Inches(0.36),
            topic,
            size=11,
            color=PLACEHOLDER,
            align=PP_ALIGN.CENTER,
        )
        x += w + Inches(0.18)

    _add_footer(slide, index / total, dark=True)


def slide_agenda(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    _atmosphere(slide)
    _add_header(slide, s["section_tag"], s["section_title"], f"{index:02d} / {total:02d}")
    _add_logo(slide)
    _title_block(slide, s["focus"], "What we will cover in this session")

    for i, topic in enumerate(s["topics"]):
        _bullet_row(slide, MARGIN_X, Inches(2.55) + Inches(i * 0.82), Inches(11.9), topic, index=i + 1)
    _add_footer(slide, index / total)


def slide_ml_process_overview(prs, total, index):
    s = SESSION
    mp = ML_PROCESS
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    _atmosphere(slide)
    _add_header(slide, s["section_tag"], s["section_title"], f"{index:02d} / {total:02d}")
    _add_logo(slide)
    _title_block(slide, mp["title"], mp["subtitle"])

    steps = mp["steps"]
    col_w = Inches(3.75)
    gap = Inches(0.3)
    top = Inches(2.5)
    height = Inches(4.05)

    for i, step in enumerate(steps):
        x = MARGIN_X + i * (col_w + gap)
        _round_rect(slide, x + Inches(0.04), top + Inches(0.05), col_w, height, BG_SUBTLE, adj=0.08)
        _round_rect(slide, x, top, col_w, height, SURFACE, line=CARD_EDGE, adj=0.08)
        bar = _rect(slide, x, top, col_w, Inches(0.12), ACCENT)
        if i == 1:
            _set_gradient(bar, ACCENT, ACCENT_2, 0)
        elif i == 2:
            bar.fill.solid()
            bar.fill.fore_color.rgb = ACCENT_2

        _add_textbox(
            slide,
            x + Inches(0.3),
            top + Inches(0.4),
            Inches(3.1),
            Inches(0.4),
            f"Step {step['number']}",
            size=12,
            bold=True,
            color=ACCENT,
        )
        _add_textbox(
            slide,
            x + Inches(0.3),
            top + Inches(0.85),
            Inches(3.1),
            Inches(0.7),
            step["title"],
            size=18,
            bold=True,
            color=TEXT,
        )

        for bi, bullet in enumerate(step["bullets"]):
            by = top + Inches(1.75) + Inches(bi * 0.48)
            _ellipse(slide, x + Inches(0.35), by + Inches(0.1), Inches(0.14), Inches(0.14), ACCENT)
            _add_textbox(
                slide,
                x + Inches(0.6),
                by,
                Inches(2.9),
                Inches(0.42),
                bullet,
                size=13,
                color=MUTED,
            )

    _add_footer(slide, index / total)


def slide_ml_process_step(prs, total, index, step):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    _atmosphere(slide)
    _add_header(slide, s["section_tag"], s["section_title"], f"{index:02d} / {total:02d}")
    _add_logo(slide)
    _title_block(
        slide,
        f"Step {step['number']}: {step['title']}",
        "The Machine Learning Process",
    )

    for i, bullet in enumerate(step["bullets"]):
        _bullet_row(
            slide,
            MARGIN_X,
            Inches(2.55) + Inches(i * 0.95),
            Inches(11.9),
            bullet,
            index=i + 1,
        )
    _add_footer(slide, index / total)


def slide_topic(prs, total, index, topic_index, topic):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    _paint_bg(slide)
    _atmosphere(slide)
    _add_header(slide, s["section_tag"], s["section_title"], f"{index:02d} / {total:02d}")
    _add_logo(slide)
    _title_block(slide, topic, f"Topic {topic_index:02d} of {len(s['topics']):02d}")

    _round_rect(
        slide,
        MARGIN_X + Inches(0.04),
        Inches(2.55),
        Inches(11.9),
        Inches(3.95),
        BG_SUBTLE,
        adj=0.07,
    )
    _round_rect(
        slide,
        MARGIN_X,
        Inches(2.5),
        Inches(11.9),
        Inches(3.95),
        SURFACE,
        line=CARD_EDGE,
        line_w=1.1,
        adj=0.07,
    )
    _rect(slide, MARGIN_X, Inches(2.5), Inches(0.1), Inches(3.95), ACCENT)
    _add_textbox(
        slide,
        MARGIN_X + Inches(0.45),
        Inches(3.7),
        Inches(11.0),
        Inches(0.8),
        topic,
        size=28,
        bold=True,
        color=TEXT,
        align=PP_ALIGN.CENTER,
    )
    _add_textbox(
        slide,
        MARGIN_X + Inches(0.45),
        Inches(4.55),
        Inches(11.0),
        Inches(0.5),
        s["focus"],
        size=15,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )
    _add_footer(slide, index / total)


def main() -> None:
    s = SESSION
    mp = ML_PROCESS
    # title + big picture + divider + agenda + process overview + 3 steps + topics
    total = 5 + len(mp["steps"]) + len(s["topics"])
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    slide_title(prs, total)
    n = 2
    slide_big_picture(prs, total, n)
    n = 3
    slide_section_divider(prs, total, n)
    n = 4
    slide_agenda(prs, total, n)
    n = 5
    slide_ml_process_overview(prs, total, n)
    for step in mp["steps"]:
        n += 1
        slide_ml_process_step(prs, total, n, step)
    for i, topic in enumerate(s["topics"], start=1):
        n += 1
        slide_topic(prs, total, n, i, topic)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")


if __name__ == "__main__":
    main()
