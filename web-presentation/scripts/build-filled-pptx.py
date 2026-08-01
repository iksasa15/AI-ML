#!/usr/bin/env python3
"""
Build Week 1 · Session 1 presentation using official ETRA Design System.
"""

from __future__ import annotations

import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches

sys.path.insert(0, str(Path(__file__).resolve().parent))
from etra_brand import (  # noqa: E402
    BLACK,
    INK,
    MARGIN,
    MUTED,
    PRIMARY,
    SECONDARY,
    SLIDE_H,
    SLIDE_W,
    SOFT,
    SOFT_2,
    SURFACE,
    WHITE,
    add_text,
    bullets,
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

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pdf-exports" / "Week1-Session1-Foundations.pptx"

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
        {"label": "Week 2", "sessions": [("S7", "Deep Learning")]},
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


def slide_title(prs, total):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_dark(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.2), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(slide, MARGIN, Inches(2.7), Inches(11.5), Inches(0.95), s["section_title"], size=44, bold=True, color=WHITE)
    bar = rect(slide, MARGIN, Inches(3.8), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(4.15), Inches(11), Inches(0.5), s["subtitle"], size=17, color=SOFT)
    add_text(slide, MARGIN, Inches(6.7), Inches(6), Inches(0.3), "ETRA", size=12, bold=True, color=SECONDARY)
    add_text(
        slide,
        Inches(8.5),
        Inches(6.7),
        Inches(4),
        Inches(0.3),
        s["trainer_line"],
        size=12,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
    )


def slide_big_picture(prs, total, index):
    bp = BIG_PICTURE
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  Big picture", f"{index:02d}")
    title_block(slide, bp["title"], bp["focus"])

    weeks = bp["weeks"]
    col_w = Inches(2.9)
    gap = Inches(0.18)
    top = Inches(2.35)

    for wi, week in enumerate(weeks):
        x = MARGIN + wi * (col_w + gap)
        add_text(slide, x, top, col_w, Inches(0.3), week["label"], size=12, bold=True, color=PRIMARY)
        rect(slide, x, top + Inches(0.32), col_w - Inches(0.2), Inches(0.012), SOFT)

        for si, (sid, title) in enumerate(week["sessions"]):
            y = top + Inches(0.5) + Inches(si * 0.58)
            current = sid == bp["current"]
            if current:
                rect(slide, x, y + Inches(0.08), Inches(0.05), Inches(0.28), PRIMARY)
            add_text(
                slide,
                x + Inches(0.16),
                y,
                Inches(0.45),
                Inches(0.4),
                sid,
                size=11,
                bold=current,
                color=PRIMARY if current else SECONDARY,
                anchor=MSO_ANCHOR.MIDDLE,
            )
            add_text(
                slide,
                x + Inches(0.6),
                y,
                col_w - Inches(0.75),
                Inches(0.4),
                title,
                size=11,
                bold=current,
                color=INK if current else MUTED,
                anchor=MSO_ANCHOR.MIDDLE,
            )

    content_footer(slide, index, total)


def slide_section_divider(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_dark(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.15), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(slide, MARGIN, Inches(2.65), Inches(11.5), Inches(0.9), s["section_title"], size=42, bold=True, color=WHITE)
    bar = rect(slide, MARGIN, Inches(3.7), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(4.05), Inches(11), Inches(0.4), s["focus"], size=16, color=SOFT)

    x = MARGIN
    for topic in s["topics"]:
        w = Inches(min(2.35, 0.11 * len(topic) + 1.0))
        if x + w > Inches(12.4):
            break
        soft_card(slide, x, Inches(5.25), w, Inches(0.42), fill=SOFT)
        # soft cards on dark look odd with light fill — intentional chips
        add_text(slide, x, Inches(5.3), w, Inches(0.32), topic, size=11, color=PRIMARY, align=PP_ALIGN.CENTER)
        x += w + Inches(0.14)

    add_text(slide, MARGIN, Inches(6.7), Inches(3), Inches(0.3), "ETRA", size=12, bold=True, color=SECONDARY)


def slide_agenda(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, s["focus"], "What we will cover in this session")
    bullets(slide, s["topics"], top=Inches(2.35), size=18)
    content_footer(slide, index, total)


def slide_ml_process_overview(prs, total, index):
    s = SESSION
    mp = ML_PROCESS
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, mp["title"], mp["subtitle"])

    col_w = Inches(3.75)
    gap = Inches(0.22)
    top = Inches(2.35)

    for i, step in enumerate(mp["steps"]):
        x = MARGIN + i * (col_w + gap)
        soft_card(slide, x, top, col_w, Inches(4.15), fill=SOFT_2 if i % 2 else SOFT)
        add_text(
            slide,
            x + Inches(0.35),
            top + Inches(0.35),
            Inches(3),
            Inches(0.3),
            f"Step {step['number']}",
            size=12,
            color=SECONDARY,
        )
        add_text(
            slide,
            x + Inches(0.35),
            top + Inches(0.75),
            Inches(3.1),
            Inches(0.55),
            step["title"],
            size=17,
            bold=True,
            color=PRIMARY,
        )
        for bi, bullet in enumerate(step["bullets"]):
            by = top + Inches(1.55) + Inches(bi * 0.5)
            add_text(slide, x + Inches(0.35), by, Inches(0.25), Inches(0.35), "–", size=14, color=SECONDARY)
            add_text(slide, x + Inches(0.6), by, Inches(2.9), Inches(0.4), bullet, size=13, color=MUTED)

    content_footer(slide, index, total)


def slide_ml_process_step(prs, total, index, step):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, f"Step {step['number']}: {step['title']}", "The Machine Learning Process")
    bullets(slide, step["bullets"], top=Inches(2.4), size=20)
    content_footer(slide, index, total)


def slide_topic(prs, total, index, topic_index, topic):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, topic, f"Topic {topic_index} of {len(s['topics'])}")
    soft_card(slide, MARGIN, Inches(2.45), Inches(12.0), Inches(3.7), fill=SOFT)
    add_text(
        slide,
        MARGIN + Inches(0.4),
        Inches(3.7),
        Inches(11.2),
        Inches(0.55),
        topic,
        size=26,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    add_text(
        slide,
        MARGIN + Inches(0.4),
        Inches(4.35),
        Inches(11.2),
        Inches(0.4),
        s["focus"],
        size=14,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )
    content_footer(slide, index, total)


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
    print("Brand: ETRA Design System v1.0")


if __name__ == "__main__":
    main()
