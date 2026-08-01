"""
ETRA Design System tokens for PowerPoint builders.
Source: ETRA-Design-System.pdf (v1.0)
"""

from __future__ import annotations

import re
from pathlib import Path

from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

_FORMULA_SUB = re.compile(r"_\{([^}]+)\}")

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "assets" / "etra-wordmark.png"
LOGO_FALLBACK = ROOT / "public" / "assets" / "etra-logo.png"
DIAGRAMS = ROOT / "public" / "assets" / "session1-diagrams"
FONT_DIR = ROOT / "public" / "font" / "din-next"

# ── Colors (page 06 / 07) ──────────────────────────────────────────────────
PRIMARY = RGBColor(0x52, 0x34, 0xB7)       # --etra-primary
SECONDARY = RGBColor(0x9E, 0x59, 0xCD)     # --etra-secondary
SURFACE = RGBColor(0xFA, 0xF8, 0xFF)       # --etra-surface / light content bg
MUTED = RGBColor(0x5A, 0x54, 0x70)         # --etra-muted
INK = RGBColor(0x12, 0x10, 0x18)           # --etra-ink
BLACK = RGBColor(0x0A, 0x06, 0x14)         # --etra-black
SOFT = RGBColor(0xEE, 0xE8, 0xFA)          # --etra-soft
SOFT_2 = RGBColor(0xF5, 0xF1, 0xFC)        # --etra-soft-2
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LINE = RGBColor(0xE4, 0xDC, 0xF4)

# ── Layout (pages 09 / 13) ─────────────────────────────────────────────────
SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)
MARGIN = Inches(0.6)  # 0.6" all sides
RAIL_W = Inches(0.06)  # thin accent bar on right edge

# Font family: DIN Next LT W23 (ETRA Sans). Falls back to Helvetica name if needed.
FONT = "DIN Next LT W23"
FONT_FALLBACK = "Helvetica"


def _font_name() -> str:
    # PowerPoint resolves installed fonts by family name; DIN files are present on this machine.
    return FONT


def no_shadow(shape) -> None:
    spPr = shape._element.spPr
    for child in list(spPr):
        if child.tag.endswith("effectLst"):
            spPr.remove(child)
    spPr.append(spPr.makeelement(qn("a:effectLst"), {}))


# Formulas use a widely available face so subscripts/baselines render reliably.
FORMULA_FONT = "Helvetica Neue"


def set_run(run, size, *, bold=False, color=INK, font=None, subscript=False):
    fname = font or _font_name()
    run.font.name = fname
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = rPr.makeelement(qn(f"a:{tag}"), {})
            rPr.append(el)
        el.set("typeface", fname)
    # Remove incorrect child-element baselines from older builds
    for el in rPr.findall(qn("a:baseline")):
        rPr.remove(el)
    # OOXML: baseline is an attribute on a:rPr (−25000 = subscript)
    if subscript:
        rPr.set("baseline", "-25000")
    elif "baseline" in rPr.attrib:
        del rPr.attrib["baseline"]


def fill_formula_paragraph(paragraph, value, *, size=18, bold=True, color=PRIMARY, font=FORMULA_FONT):
    """Render formula markup. Use _{sub} for subscripts, e.g. x_{min}."""
    p_elem = paragraph._p
    for child in list(p_elem):
        if child.tag.endswith("}r"):
            p_elem.remove(child)

    pos = 0
    for match in _FORMULA_SUB.finditer(value):
        if match.start() > pos:
            run = paragraph.add_run()
            run.text = value[pos : match.start()]
            set_run(run, size, bold=bold, color=color, font=font)
        run = paragraph.add_run()
        run.text = match.group(1)
        set_run(run, max(size - 4, 12), bold=bold, color=color, font=font, subscript=True)
        pos = match.end()
    if pos < len(value):
        run = paragraph.add_run()
        run.text = value[pos:]
        set_run(run, size, bold=bold, color=color, font=font)


_FRAC_RE = re.compile(
    r"^(?P<lhs>.+?)\s*=\s*\((?P<num>.+?)\)\s*/\s*\((?P<den>.+?)\)$"
)


def add_formula(
    slide,
    left,
    top,
    width,
    height,
    value,
    *,
    size=18,
    bold=True,
    color=PRIMARY,
    align=PP_ALIGN.LEFT,
    anchor=MSO_ANCHOR.TOP,
):
    """
    Add a formula. Markup: x_{min}.
    Division forms like `x_{norm} = (x − x_{min}) / (x_{max} − x_{min})`
    render as a stacked fraction.
    """
    text = value if isinstance(value, str) else str(value)
    match = _FRAC_RE.match(text.strip())
    if match:
        return add_fraction_formula(
            slide,
            left,
            top,
            width,
            height,
            match.group("lhs"),
            match.group("num"),
            match.group("den"),
            size=size,
            bold=bold,
            color=color,
        )

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
    fill_formula_paragraph(p, text, size=size, bold=bold, color=color)
    return box


def add_fraction_formula(
    slide,
    left,
    top,
    width,
    height,
    lhs,
    numerator,
    denominator,
    *,
    size=18,
    bold=True,
    color=PRIMARY,
):
    """Visual stacked fraction: lhs = num / den."""
    # Left-hand side
    lhs_box = slide.shapes.add_textbox(left, top, width * 0.28, height)
    lhs_tf = lhs_box.text_frame
    lhs_tf.word_wrap = False
    try:
        lhs_tf._txBody.bodyPr.set("anchor", "ctr")
    except Exception:
        pass
    lhs_p = lhs_tf.paragraphs[0]
    lhs_p.alignment = PP_ALIGN.RIGHT
    fill_formula_paragraph(lhs_p, f"{lhs} =", size=size, bold=bold, color=color)

    frac_left = left + width * 0.30
    frac_w = width * 0.68
    num_h = height * 0.38
    den_h = height * 0.38
    gap = height * 0.12

    num_box = slide.shapes.add_textbox(frac_left, top, frac_w, num_h)
    num_tf = num_box.text_frame
    num_tf.word_wrap = False
    try:
        num_tf._txBody.bodyPr.set("anchor", "b")
    except Exception:
        pass
    num_p = num_tf.paragraphs[0]
    num_p.alignment = PP_ALIGN.CENTER
    fill_formula_paragraph(num_p, numerator, size=size, bold=bold, color=color)

    line_y = top + num_h + gap * 0.35
    line = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        frac_left + frac_w * 0.05,
        line_y,
        frac_w * 0.90,
        Inches(0.02),
    )
    line.fill.solid()
    line.fill.fore_color.rgb = color
    line.line.fill.background()
    no_shadow(line)

    den_box = slide.shapes.add_textbox(frac_left, top + num_h + gap, frac_w, den_h)
    den_tf = den_box.text_frame
    den_tf.word_wrap = False
    try:
        den_tf._txBody.bodyPr.set("anchor", "t")
    except Exception:
        pass
    den_p = den_tf.paragraphs[0]
    den_p.alignment = PP_ALIGN.CENTER
    fill_formula_paragraph(den_p, denominator, size=size, bold=bold, color=color)

    return lhs_box


def add_text(
    slide,
    left,
    top,
    width,
    height,
    value,
    *,
    size=18,
    bold=False,
    color=INK,
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
    set_run(run, size, bold=bold, color=color)
    return box


def rect(slide, left, top, width, height, fill):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    no_shadow(shape)
    return shape


def soft_card(slide, left, top, width, height, *, fill=SOFT):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    shape.line.fill.background()
    try:
        # ~18px radius feel on 1920 canvas
        shape.adjustments[0] = 0.1
    except Exception:
        pass
    no_shadow(shape)
    return shape


def gradient_fill(shape, c1: RGBColor, c2: RGBColor, angle: float = 135.0):
    fill = shape.fill
    fill.gradient()
    fill.gradient_angle = angle
    stops = fill.gradient_stops
    stops[0].color.rgb = c1
    stops[1].color.rgb = c2


def paint_light(slide):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = SURFACE


def paint_dark(slide):
    """Flat dark hero — no decorative circles/orbs over content."""
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = BLACK


def right_rail(slide, *, dark=False):
    """Brand accent strip on the right edge (content slides)."""
    color = SECONDARY if dark else PRIMARY
    return rect(slide, SLIDE_W - RAIL_W, 0, RAIL_W, SLIDE_H, color)


def logo(slide, *, dark=False, height=Inches(0.35)):
    path = LOGO if LOGO.is_file() else LOGO_FALLBACK
    if not path.is_file():
        return
    # Keep logo in top-right safe area (page 13)
    pic = slide.shapes.add_picture(str(path), Inches(11.55), Inches(0.45), height=height)
    return pic


def add_diagram(slide, name, left, top, width, height=None):
    """Embed a Session 1 classroom diagram PNG (aspect preserved if height is None)."""
    path = DIAGRAMS / name
    if not path.is_file() and not str(name).endswith(".png"):
        path = DIAGRAMS / f"{name}.png"
    if not path.is_file():
        return None
    if height is None:
        return slide.shapes.add_picture(str(path), left, top, width=width)
    return slide.shapes.add_picture(str(path), left, top, width=width, height=height)


def content_header(slide, kicker: str, slide_num: str):
    """Light content chrome: logo, kicker, hairline — no heavy bars."""
    logo(slide)
    add_text(slide, MARGIN, Inches(0.48), Inches(8.5), Inches(0.3), kicker, size=12, color=MUTED)
    rect(slide, MARGIN, Inches(0.9), Inches(12.1), Inches(0.012), LINE)


def content_footer(slide, page: int, total: int):
    """Footer: ETRA left · page right, thin primary line above."""
    y = Inches(7.05)
    rect(slide, MARGIN, y, Inches(12.1), Inches(0.012), PRIMARY)
    add_text(slide, MARGIN, Inches(7.12), Inches(3), Inches(0.28), "ETRA", size=11, bold=True, color=PRIMARY)
    add_text(
        slide,
        Inches(10.5),
        Inches(7.12),
        Inches(2.2),
        Inches(0.28),
        f"{page:02d}  /  {total:02d}",
        size=11,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
    )


def title_block(slide, title: str, subtitle: str | None = None, *, top=Inches(1.15)):
    add_text(slide, MARGIN, top, Inches(11.2), Inches(0.65), title, size=32, bold=True, color=PRIMARY)
    if subtitle:
        add_text(slide, MARGIN, top + Inches(0.6), Inches(11.2), Inches(0.4), subtitle, size=15, color=MUTED)


def bullets(slide, items: list[str], *, top=Inches(2.2), size=18):
    for i, item in enumerate(items):
        y = top + Inches(i * 0.68)
        add_text(slide, MARGIN, y, Inches(0.35), Inches(0.4), "–", size=size, color=SECONDARY)
        add_text(slide, MARGIN + Inches(0.4), y, Inches(11.2), Inches(0.45), item, size=size, color=INK)
