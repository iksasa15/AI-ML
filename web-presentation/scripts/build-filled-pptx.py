#!/usr/bin/env python3
"""
Build a soft, minimal ETRA presentation from session content.

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

# Soft minimal palette
BG = RGBColor(0xFC, 0xFB, 0xFE)
SURFACE = RGBColor(0xFF, 0xFF, 0xFF)
WASH = RGBColor(0xF4, 0xF2, 0xF9)
ACCENT = RGBColor(0x5C, 0x45, 0xB0)
TEXT = RGBColor(0x22, 0x1E, 0x36)
MUTED = RGBColor(0x7A, 0x74, 0x96)
LINE = RGBColor(0xE8, 0xE4, 0xF2)
SOFT = RGBColor(0xC8, 0xC0, 0xDE)

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MX = Inches(0.9)

SESSION = {
    "eyebrow": "Week 1  ·  Session 1",
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
    "subtitle": "The 3 main steps",
    "steps": [
        {
            "number": "1",
            "title": "Data Pre-Processing",
            "bullets": [
                "Import the data",
                "Clean the data",
                "Split into training and test sets",
                "Feature scaling",
            ],
        },
        {
            "number": "2",
            "title": "Modelling",
            "bullets": [
                "Build the model",
                "Train the model",
                "Make predictions",
            ],
        },
        {
            "number": "3",
            "title": "Evaluation",
            "bullets": [
                "Calculate performance metrics",
                "Make a final prediction",
            ],
        },
    ],
}

BIG_PICTURE = {
    "eyebrow": "Big picture",
    "title": "Where Are We in the Bootcamp?",
    "focus": "Build the end-to-end ML workflow: clean data → train → evaluate.",
    "current": "S1",
    "weeks": [
        {
            "label": "Week 1",
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
            "label": "Week 2",
            "sessions": [("S7", "Deep Learning")],
        },
        {
            "label": "Week 3",
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
            "label": "Week 4",
            "sessions": [
                ("S14", "Generative AI"),
                ("S15", "RAG Systems"),
                ("S16", "MLOps"),
            ],
        },
    ],
}


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


def text(
    slide,
    left,
    top,
    width,
    height,
    value,
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
    run.text = value
    _font(run, size, bold=bold, color=color)
    return box


def rect(slide, left, top, width, height, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
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
    return shape


def hairline(slide, left, top, width):
    return rect(slide, left, top, width, Inches(0.012), LINE)


def paint(slide):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = BG


def logo(slide, left=Inches(11.7), top=Inches(0.35), height=Inches(0.55)):
    if LOGO.is_file():
        slide.shapes.add_picture(str(LOGO), left, top, height=height)


def header(slide, label, num, total):
    text(slide, MX, Inches(0.32), Inches(8), Inches(0.3), label, size=12, color=MUTED)
    text(
        slide,
        Inches(10.2),
        Inches(0.32),
        Inches(1.4),
        Inches(0.3),
        f"{num}",
        size=12,
        color=SOFT,
        align=PP_ALIGN.RIGHT,
    )
    hairline(slide, MX, Inches(0.72), Inches(11.5))
    logo(slide)


def title_block(slide, title, subtitle=None, *, top=Inches(1.05)):
    text(slide, MX, top, Inches(11), Inches(0.6), title, size=28, bold=True)
    if subtitle:
        text(slide, MX, top + Inches(0.55), Inches(11), Inches(0.35), subtitle, size=15, color=MUTED)


def bullet_list(slide, items, *, top=Inches(2.2), size=18):
    for i, item in enumerate(items):
        y = top + Inches(i * 0.7)
        text(slide, MX, y, Inches(0.35), Inches(0.45), "–", size=size, color=SOFT)
        text(slide, MX + Inches(0.4), y, Inches(11), Inches(0.5), item, size=size, color=TEXT)


# ── Slides ──────────────────────────────────────────────────────────────────


def slide_title(prs, total):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    logo(slide, left=Inches(11.5), top=Inches(0.55), height=Inches(0.7))

    text(slide, MX, Inches(2.15), Inches(10), Inches(0.35), s["eyebrow"], size=13, color=MUTED)
    text(slide, MX, Inches(2.65), Inches(11), Inches(0.9), s["section_title"], size=44, bold=True)
    hairline(slide, MX, Inches(3.7), Inches(1.2))
    text(slide, MX, Inches(4.0), Inches(10), Inches(0.5), s["subtitle"], size=18, color=MUTED)
    text(slide, MX, Inches(6.55), Inches(10), Inches(0.35), s["trainer_line"], size=13, color=SOFT)


def slide_big_picture(prs, total, index):
    bp = BIG_PICTURE
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    header(slide, f"{s['section_tag']}  ·  Bootcamp map", f"{index:02d}", total)
    title_block(slide, bp["title"], bp["focus"], top=Inches(0.95))

    weeks = bp["weeks"]
    col_w = Inches(2.85)
    gap = Inches(0.2)
    top = Inches(2.35)

    for wi, week in enumerate(weeks):
        x = MX + wi * (col_w + gap)
        text(slide, x, top, col_w, Inches(0.3), week["label"], size=12, bold=True, color=MUTED)
        hairline(slide, x, top + Inches(0.32), col_w - Inches(0.15))

        for si, (sid, title) in enumerate(week["sessions"]):
            y = top + Inches(0.5) + Inches(si * 0.58)
            current = sid == bp["current"]
            if current:
                soft_card(slide, x, y - Inches(0.05), col_w - Inches(0.1), Inches(0.5))
            text(
                slide,
                x + Inches(0.12),
                y,
                Inches(0.4),
                Inches(0.4),
                sid,
                size=11,
                bold=current,
                color=ACCENT if current else SOFT,
                anchor=MSO_ANCHOR.MIDDLE,
            )
            short = title.replace(" & ", " & ")
            text(
                slide,
                x + Inches(0.55),
                y,
                col_w - Inches(0.75),
                Inches(0.4),
                short,
                size=11,
                bold=current,
                color=TEXT if current else MUTED,
                anchor=MSO_ANCHOR.MIDDLE,
            )


def slide_section_divider(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    logo(slide, left=Inches(11.5), top=Inches(0.55), height=Inches(0.65))

    text(slide, MX, Inches(2.0), Inches(10), Inches(0.35), s["eyebrow"], size=13, color=MUTED)
    text(slide, MX, Inches(2.5), Inches(11), Inches(0.85), s["section_title"], size=40, bold=True)
    hairline(slide, MX, Inches(3.5), Inches(1.2))
    text(slide, MX, Inches(3.8), Inches(10), Inches(0.4), s["focus"], size=16, color=MUTED)

    # soft topic row
    x = MX
    for topic in s["topics"]:
        w = Inches(min(2.4, 0.11 * len(topic) + 1.05))
        if x + w > Inches(12.4):
            break
        soft_card(slide, x, Inches(5.1), w, Inches(0.42))
        text(
            slide,
            x,
            Inches(5.14),
            w,
            Inches(0.35),
            topic,
            size=11,
            color=MUTED,
            align=PP_ALIGN.CENTER,
        )
        x += w + Inches(0.15)


def slide_agenda(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}", total)
    title_block(slide, s["focus"], "What we will cover in this session")
    bullet_list(slide, s["topics"], top=Inches(2.35), size=18)


def slide_ml_process_overview(prs, total, index):
    s = SESSION
    mp = ML_PROCESS
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}", total)
    title_block(slide, mp["title"], mp["subtitle"])

    col_w = Inches(3.7)
    gap = Inches(0.25)
    top = Inches(2.4)

    for i, step in enumerate(mp["steps"]):
        x = MX + i * (col_w + gap)
        soft_card(slide, x, top, col_w, Inches(4.1))
        text(
            slide,
            x + Inches(0.35),
            top + Inches(0.35),
            Inches(3),
            Inches(0.3),
            f"Step {step['number']}",
            size=12,
            color=MUTED,
        )
        text(
            slide,
            x + Inches(0.35),
            top + Inches(0.75),
            Inches(3),
            Inches(0.55),
            step["title"],
            size=17,
            bold=True,
        )
        for bi, bullet in enumerate(step["bullets"]):
            by = top + Inches(1.55) + Inches(bi * 0.5)
            text(slide, x + Inches(0.35), by, Inches(0.25), Inches(0.35), "–", size=14, color=SOFT)
            text(slide, x + Inches(0.6), by, Inches(2.8), Inches(0.4), bullet, size=13, color=MUTED)


def slide_ml_process_step(prs, total, index, step):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}", total)
    title_block(
        slide,
        f"Step {step['number']}: {step['title']}",
        "The Machine Learning Process",
    )
    bullet_list(slide, step["bullets"], top=Inches(2.4), size=20)


def slide_topic(prs, total, index, topic_index, topic):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint(slide)
    header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}", total)
    title_block(slide, topic, f"Topic {topic_index} of {len(s['topics'])}")

    soft_card(slide, MX, Inches(2.5), Inches(11.5), Inches(3.6))
    text(
        slide,
        MX + Inches(0.5),
        Inches(3.7),
        Inches(10.5),
        Inches(0.6),
        topic,
        size=26,
        bold=True,
        align=PP_ALIGN.CENTER,
    )
    text(
        slide,
        MX + Inches(0.5),
        Inches(4.4),
        Inches(10.5),
        Inches(0.4),
        s["focus"],
        size=14,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )


def main() -> None:
    s = SESSION
    mp = ML_PROCESS
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
