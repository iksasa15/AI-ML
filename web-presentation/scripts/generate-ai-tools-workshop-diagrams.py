#!/usr/bin/env python3
"""Generate ETRA-branded diagrams for the Arabic AI Tools 3-day workshop."""

from __future__ import annotations

from pathlib import Path

import arabic_reshaper
import matplotlib
from bidi.algorithm import get_display

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Circle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "workshop-ai-tools-diagrams"
FONT_REG = ROOT / "public" / "font" / "IBMPlexSansArabic-Regular.ttf"
FONT_BOLD = ROOT / "public" / "font" / "IBMPlexSansArabic-Bold.ttf"


def ar(text: str) -> str:
    """Shape Arabic + apply BiDi so matplotlib renders connected RTL glyphs."""
    if not text:
        return text
    lines = []
    for line in text.split("\n"):
        reshaped = arabic_reshaper.reshape(line)
        lines.append(get_display(reshaped))
    return "\n".join(lines)

PRIMARY = "#5234B7"
SECONDARY = "#9E59CD"
SOFT = "#EEE8FA"
SOFT_2 = "#F5F1FC"
SURFACE = "#FAF8FF"
INK = "#121018"
MUTED = "#5A5470"
WHITE = "#FFFFFF"
LINE = "#E4DCF4"


def _register_fonts() -> tuple[str, str]:
    for path in (FONT_REG, FONT_BOLD):
        if path.is_file():
            font_manager.fontManager.addfont(str(path))
    reg = font_manager.FontProperties(fname=str(FONT_REG)) if FONT_REG.is_file() else None
    bold = font_manager.FontProperties(fname=str(FONT_BOLD)) if FONT_BOLD.is_file() else None
    return (
        reg.get_name() if reg else "DejaVu Sans",
        bold.get_name() if bold else "DejaVu Sans",
    )


FONT_NAME, FONT_BOLD_NAME = _register_fonts()
plt.rcParams["font.family"] = FONT_NAME
plt.rcParams["axes.unicode_minus"] = False


def _fig(w=12.0, h=6.2):
    fig, ax = plt.subplots(figsize=(w, h), dpi=160)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6.2)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.patch.set_facecolor(SURFACE)
    ax.set_facecolor(SURFACE)
    return fig, ax


def _rounded(ax, x, y, w, h, *, fc=SOFT, ec=LINE, lw=1.2, z=2):
    box = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.02,rounding_size=0.18",
        facecolor=fc,
        edgecolor=ec,
        linewidth=lw,
        zorder=z,
    )
    ax.add_patch(box)
    return box


def _arrow(ax, x1, y1, x2, y2):
    ax.add_patch(
        FancyArrowPatch(
            (x1, y1),
            (x2, y2),
            arrowstyle="-|>",
            mutation_scale=16,
            linewidth=2.0,
            color=PRIMARY,
            zorder=3,
        )
    )


def _text(ax, x, y, s, *, size=14, bold=False, color=INK, ha="center", va="center"):
    face = FONT_BOLD if bold and FONT_BOLD.is_file() else FONT_REG
    props = font_manager.FontProperties(fname=str(face)) if face.is_file() else None
    ax.text(
        x,
        y,
        ar(s),
        fontsize=size,
        color=color,
        ha=ha,
        va=va,
        fontproperties=props,
        fontfamily=None if props else (FONT_BOLD_NAME if bold else FONT_NAME),
        zorder=4,
        linespacing=1.35,
    )


def save(fig, name: str) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    fig.savefig(path, bbox_inches="tight", facecolor=SURFACE, pad_inches=0.15)
    plt.close(fig)
    print(f"  {path.name}")
    return path


def diagram_three_days() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.7, "خريطة الورشة · 3 أيام", size=22, bold=True, color=PRIMARY)
    days = [
        (0.5, "اليوم 1", "هندسة الأوامر\nوالمحتوى والبحث", "#5234B7"),
        (4.25, "اليوم 2", "الوسائط المتعددة\nصور · عروض · فيديو", "#7A45C2"),
        (8.0, "اليوم 3", "البيانات والأتمتة\nومساعد شخصي", "#9E59CD"),
    ]
    for x, title, body, color in days:
        _rounded(ax, x, 1.4, 3.5, 3.6, fc=WHITE, ec=color, lw=2.2)
        ax.add_patch(Circle((x + 1.75, 4.35), 0.42, facecolor=color, edgecolor="none", zorder=3))
        _text(ax, x + 1.75, 4.35, title.split()[-1], size=16, bold=True, color=WHITE)
        _text(ax, x + 1.75, 3.55, title, size=16, bold=True, color=color)
        _text(ax, x + 1.75, 2.55, body, size=13, color=MUTED)
    save(fig, "three-days-map.png")


def diagram_prompt_flow() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "هيكل الأمر الاحترافي", size=20, bold=True, color=PRIMARY)
    steps = [
        (0.4, "السياق", "Context"),
        (2.7, "الدور", "Persona"),
        (5.0, "الجمهور", "Audience"),
        (7.3, "الشكل", "Format"),
        (9.6, "المخرج", "Output"),
    ]
    for i, (x, ar, en) in enumerate(steps):
        _rounded(ax, x, 2.4, 2.0, 2.2, fc=SOFT if i % 2 == 0 else SOFT_2, ec=PRIMARY)
        _text(ax, x + 1.0, 3.7, ar, size=15, bold=True, color=PRIMARY)
        _text(ax, x + 1.0, 3.1, en, size=12, color=MUTED)
        if i < len(steps) - 1:
            _arrow(ax, x + 2.05, 3.5, x + 2.65, 3.5)
    _text(ax, 6, 1.5, "ثم أضف: أمثلة (Few-Shot) · خطوات التفكير (CoT) · قيود الدقة", size=13, color=MUTED)
    save(fig, "prompt-structure.png")


def diagram_admin_exercise() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "تمرين المساعد الإداري الذكي", size=20, bold=True, color=PRIMARY)
    boxes = [
        (0.5, 2.8, "ملف PDF", "تقرير عمل"),
        (3.5, 2.8, "تلخيص", "5 نقاط رئيسية"),
        (6.5, 2.8, "إيميل رسمي", "للمدير التنفيذي"),
        (9.5, 2.8, "3 تغريدات", "محتوى تسويقي"),
    ]
    for i, (x, y, t, s) in enumerate(boxes):
        _rounded(ax, x, y, 2.2, 2.0, fc=WHITE, ec=SECONDARY if i else PRIMARY, lw=2)
        _text(ax, x + 1.1, y + 1.25, t, size=14, bold=True, color=PRIMARY)
        _text(ax, x + 1.1, y + 0.7, s, size=12, color=MUTED)
        if i < 3:
            _arrow(ax, x + 2.25, y + 1.0, x + 3.4, y + 1.0)
    _text(ax, 6, 1.6, "المدة المقترحة: 30 دقيقة · الأدوات: Claude / ChatPDF + نموذج لغوي", size=13, color=MUTED)
    save(fig, "admin-assistant-flow.png")


def diagram_media_stack() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "مسار الوسائط المتعددة", size=20, bold=True, color=PRIMARY)
    layers = [
        (4.6, "صورة منتج", "Midjourney · DALL·E · Leonardo"),
        (3.1, "عرض تقديمي", "Gamma · Beautiful.ai"),
        (1.6, "فيديو وصوت", "HeyGen · ElevenLabs · Runway"),
    ]
    colors = [PRIMARY, "#7A45C2", SECONDARY]
    for (y, title, tools), c in zip(layers, colors):
        _rounded(ax, 1.5, y, 9.0, 1.2, fc=WHITE, ec=c, lw=2)
        _text(ax, 3.2, y + 0.6, title, size=16, bold=True, color=c, ha="center")
        _text(ax, 7.5, y + 0.6, tools, size=13, color=MUTED, ha="center")
    save(fig, "media-stack.png")


def diagram_designer_exercise() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "تمرين المصمم الشامل", size=20, bold=True, color=PRIMARY)
    items = [
        (0.8, "1", "توليد صورة منتج"),
        (4.5, "2", "عرض 4 شرائح"),
        (8.2, "3", "فيديو 30 ثانية"),
    ]
    for x, n, label in items:
        ax.add_patch(Circle((x + 1.5, 3.8), 0.55, facecolor=PRIMARY, edgecolor="none", zorder=3))
        _text(ax, x + 1.5, 3.8, n, size=20, bold=True, color=WHITE)
        _rounded(ax, x, 2.0, 3.0, 1.2, fc=SOFT, ec=LINE)
        _text(ax, x + 1.5, 2.6, label, size=14, bold=True, color=INK)
    _text(ax, 6, 1.3, "هوية إعلان متكاملة في جلسة واحدة واحدة · 30 دقيقة", size=13, color=MUTED)
    save(fig, "designer-exercise.png")


def diagram_automation() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "مسار أتمتة يومي", size=20, bold=True, color=PRIMARY)
    nodes = [
        (0.4, "إيميل عميل\nGmail"),
        (3.3, "تلخيص\nبالذكاء الاصطناعي"),
        (6.2, "تخزين\nجدول بيانات"),
        (9.1, "مسودة رد\nجاهزة"),
    ]
    for i, (x, label) in enumerate(nodes):
        _rounded(ax, x, 2.5, 2.5, 2.0, fc=SOFT_2 if i % 2 else SOFT, ec=PRIMARY)
        _text(ax, x + 1.25, 3.5, label, size=13, bold=True, color=PRIMARY)
        if i < 3:
            _arrow(ax, x + 2.55, 3.5, x + 3.2, 3.5)
    _text(ax, 6, 1.5, "Zapier AI · Make — ربط الأدوات دون برمجة", size=13, color=MUTED)
    save(fig, "automation-flow.png")


def diagram_capstone() -> None:
    fig, ax = _fig()
    _text(ax, 6, 5.75, "مشروع التخرج النهائي", size=20, bold=True, color=PRIMARY)
    cards = [
        (0.6, "بحث ذكي", "أداة بحث موثّق"),
        (4.5, "تصميم", "صورة / عرض / فيديو"),
        (8.4, "أتمتة أو بوت", "مسار عمل أو Custom GPT"),
    ]
    for x, t, s in cards:
        _rounded(ax, x, 2.3, 3.0, 2.4, fc=WHITE, ec=SECONDARY, lw=2)
        _text(ax, x + 1.5, 3.9, t, size=15, bold=True, color=PRIMARY)
        _text(ax, x + 1.5, 3.1, s, size=12, color=MUTED)
    _text(ax, 6, 1.4, "فرق مصغّرة · 45 دقيقة · عرض سريع وتقييم", size=13, color=MUTED)
    save(fig, "capstone-project.png")


def main() -> None:
    print("Generating workshop diagrams…")
    diagram_three_days()
    diagram_prompt_flow()
    diagram_admin_exercise()
    diagram_media_stack()
    diagram_designer_exercise()
    diagram_automation()
    diagram_capstone()
    print(f"Done → {OUT}")


if __name__ == "__main__":
    main()
