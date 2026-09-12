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
from matplotlib.patches import Circle, FancyArrowPatch, FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "workshop-ai-tools-diagrams"
FONT_REG = ROOT / "public" / "font" / "IBMPlexSansArabic-Regular.ttf"
FONT_BOLD = ROOT / "public" / "font" / "IBMPlexSansArabic-Bold.ttf"

PRIMARY = "#5234B7"
SECONDARY = "#9E59CD"
SOFT = "#EEE8FA"
SOFT_2 = "#F5F1FC"
SURFACE = "#FAF8FF"
INK = "#121018"
MUTED = "#5A5470"
WHITE = "#FFFFFF"
LINE = "#E4DCF4"

_TASHKEEL = dict.fromkeys(
    map(ord, "ًٌٍَُِّْٰٕٖٜٟۣٓٔٗ٘ٙٚٛٝٞۖۗۘۙۚۛۜ۟۠ۡۢۤۥۦۧۨ۩۪ۭ۫۬"),
    None,
)


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


def ar(text: str) -> str:
    if not text:
        return text
    lines = []
    for line in text.split("\n"):
        clean = line.translate(_TASHKEEL)
        lines.append(get_display(arabic_reshaper.reshape(clean)))
    return "\n".join(lines)


def _fig(w=12.0, h=6.6):
    fig, ax = plt.subplots(figsize=(w, h), dpi=160)
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 6.6)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.patch.set_facecolor(SURFACE)
    ax.set_facecolor(SURFACE)
    return fig, ax


def _title(ax, text: str, *, size=20):
    """Fixed title band — keeps clear gap above content (content top <= 5.2)."""
    _text(ax, 6, 6.15, text, size=size, bold=True, color=PRIMARY)


def _footer(ax, text: str):
    _text(ax, 6, 0.55, text, size=12, color=MUTED)


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
        linespacing=1.55,
    )


def save(fig, name: str) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    ax = fig.axes[0]
    # Invisible padding anchors so tight crop never clips borders
    ax.plot([-0.35, 12.35], [0.25, 0.25], color=SURFACE, linewidth=3, zorder=0)
    ax.plot([-0.35, 12.35], [6.5, 6.5], color=SURFACE, linewidth=3, zorder=0)
    ax.plot([-0.35, -0.35], [0.25, 6.5], color=SURFACE, linewidth=3, zorder=0)
    ax.plot([12.35, 12.35], [0.25, 6.5], color=SURFACE, linewidth=3, zorder=0)
    fig.savefig(path, dpi=160, facecolor=SURFACE, bbox_inches="tight", pad_inches=0.45)
    plt.close(fig)
    print(f"  {path.name}")
    return path


def diagram_three_days() -> None:
    fig, ax = _fig()
    _title(ax, "خريطة الورشة · 3 أيام", size=22)
    days = [
        (0.5, "اليوم 1", ["هندسة الأوامر", "والمحتوى والبحث"], "#5234B7"),
        (4.25, "اليوم 2", ["الوسائط المتعددة", "صور · عروض · فيديو"], "#7A45C2"),
        (8.0, "اليوم 3", ["البيانات والأتمتة", "ومساعد شخصي"], "#9E59CD"),
    ]
    for x, title, body_lines, color in days:
        _rounded(ax, x, 1.2, 3.5, 3.5, fc=WHITE, ec=color, lw=2.2)
        ax.add_patch(Circle((x + 1.75, 4.05), 0.42, facecolor=color, edgecolor="none", zorder=3))
        _text(ax, x + 1.75, 4.05, title.split()[-1], size=16, bold=True, color=WHITE)
        _text(ax, x + 1.75, 3.25, title, size=16, bold=True, color=color)
        _text(ax, x + 1.75, 2.55, body_lines[0], size=13, color=MUTED)
        _text(ax, x + 1.75, 2.1, body_lines[1], size=13, color=MUTED)
    save(fig, "three-days-map.png")


def diagram_prompt_flow() -> None:
    fig, ax = _fig()
    _title(ax, "هيكل الأمر الاحترافي")
    steps = [
        (0.4, "السياق", "Context"),
        (2.7, "الدور", "Persona"),
        (5.0, "الجمهور", "Audience"),
        (7.3, "الشكل", "Format"),
        (9.6, "المخرج", "Output"),
    ]
    for i, (x, ar_label, en) in enumerate(steps):
        _rounded(ax, x, 2.2, 2.0, 2.2, fc=SOFT if i % 2 == 0 else SOFT_2, ec=PRIMARY)
        _text(ax, x + 1.0, 3.5, ar_label, size=15, bold=True, color=PRIMARY)
        _text(ax, x + 1.0, 2.9, en, size=12, color=MUTED)
        if i < len(steps) - 1:
            _arrow(ax, x + 2.05, 3.3, x + 2.65, 3.3)
    _footer(ax, "ثم أضف: أمثلة (Few-Shot) · خطوات التفكير (CoT) · قيود الدقة")
    save(fig, "prompt-structure.png")


def diagram_admin_exercise() -> None:
    fig, ax = _fig()
    _title(ax, "تمرين المساعد الإداري الذكي")
    boxes = [
        (0.5, 2.6, "ملف PDF", "تقرير عمل"),
        (3.5, 2.6, "تلخيص", "5 نقاط رئيسية"),
        (6.5, 2.6, "إيميل رسمي", "للمدير التنفيذي"),
        (9.5, 2.6, "3 تغريدات", "محتوى تسويقي"),
    ]
    for i, (x, y, t, s) in enumerate(boxes):
        _rounded(ax, x, y, 2.2, 2.0, fc=WHITE, ec=SECONDARY if i else PRIMARY, lw=2)
        _text(ax, x + 1.1, y + 1.25, t, size=14, bold=True, color=PRIMARY)
        _text(ax, x + 1.1, y + 0.7, s, size=12, color=MUTED)
        if i < 3:
            _arrow(ax, x + 2.25, y + 1.0, x + 3.4, y + 1.0)
    _footer(ax, "المدة المقترحة: 30 دقيقة · الأدوات: Claude / ChatPDF + نموذج لغوي")
    save(fig, "admin-assistant-flow.png")


def diagram_media_stack() -> None:
    fig, ax = _fig()
    _title(ax, "مسار الوسائط المتعددة")
    # Keep clear gap under title (title ~6.15) — top of first box <= 5.2
    layers = [
        (4.05, "صورة منتج", "Midjourney · DALL·E · Leonardo"),
        (2.75, "عرض تقديمي", "Gamma · Beautiful.ai"),
        (1.45, "فيديو وصوت", "HeyGen · ElevenLabs · Runway"),
    ]
    colors = [PRIMARY, "#7A45C2", SECONDARY]
    for (y, title, tools), c in zip(layers, colors):
        _rounded(ax, 1.5, y, 9.0, 1.1, fc=WHITE, ec=c, lw=2)
        # Arabic on the right (RTL), tools toward the left
        _text(ax, 9.2, y + 0.55, title, size=16, bold=True, color=c, ha="center")
        _text(ax, 4.2, y + 0.55, tools, size=13, color=MUTED, ha="center")
    save(fig, "media-stack.png")


def diagram_designer_exercise() -> None:
    fig, ax = _fig()
    _title(ax, "تمرين المصمم الشامل")
    items = [
        (0.8, "1", "توليد صورة منتج"),
        (4.5, "2", "عرض 4 شرائح"),
        (8.2, "3", "فيديو 30 ثانية"),
    ]
    for x, n, label in items:
        ax.add_patch(Circle((x + 1.5, 3.9), 0.55, facecolor=PRIMARY, edgecolor="none", zorder=3))
        _text(ax, x + 1.5, 3.9, n, size=20, bold=True, color=WHITE)
        _rounded(ax, x, 2.1, 3.0, 1.2, fc=SOFT, ec=LINE)
        _text(ax, x + 1.5, 2.7, label, size=14, bold=True, color=INK)
    _footer(ax, "هوية إعلان متكاملة في جلسة واحدة · 30 دقيقة")
    save(fig, "designer-exercise.png")


def diagram_automation() -> None:
    fig, ax = _fig()
    _title(ax, "مسار أتمتة يومي")
    nodes = [
        (0.4, ["إيميل عميل", "Gmail"]),
        (3.3, ["تلخيص", "بالذكاء الاصطناعي"]),
        (6.2, ["تخزين", "جدول بيانات"]),
        (9.1, ["مسودة رد", "جاهزة"]),
    ]
    for i, (x, lines) in enumerate(nodes):
        _rounded(ax, x, 2.3, 2.5, 2.0, fc=SOFT_2 if i % 2 else SOFT, ec=PRIMARY)
        _text(ax, x + 1.25, 3.45, lines[0], size=13, bold=True, color=PRIMARY)
        _text(ax, x + 1.25, 2.9, lines[1], size=12, color=MUTED)
        if i < 3:
            _arrow(ax, x + 2.55, 3.3, x + 3.2, 3.3)
    _footer(ax, "Zapier AI · Make — ربط الأدوات دون برمجة")
    save(fig, "automation-flow.png")


def diagram_capstone() -> None:
    fig, ax = _fig()
    _title(ax, "مشروع التخرج النهائي")
    cards = [
        (0.6, "بحث ذكي", "أداة بحث موثق"),
        (4.5, "تصميم", "صورة / عرض / فيديو"),
        (8.4, "أتمتة أو بوت", "مسار عمل أو Custom GPT"),
    ]
    for x, t, s in cards:
        _rounded(ax, x, 2.1, 3.0, 2.4, fc=WHITE, ec=SECONDARY, lw=2)
        _text(ax, x + 1.5, 3.7, t, size=15, bold=True, color=PRIMARY)
        _text(ax, x + 1.5, 2.9, s, size=12, color=MUTED)
    _footer(ax, "فرق مصغرة · 45 دقيقة · عرض سريع وتقييم")
    save(fig, "capstone-project.png")


def diagram_cover_hero() -> None:
    fig, ax = _fig(12, 6.6)
    _title(ax, "مسارات الورشة")
    pillars = [
        (0.7, "أوامر", "هندسة المحتوى"),
        (3.55, "وسائط", "صورة وعرض وفيديو"),
        (6.4, "بيانات", "تحليل وقرار"),
        (9.25, "أتمتة", "مسارات ومساعد"),
    ]
    for i, (x, t, s) in enumerate(pillars):
        c = [PRIMARY, "#6B3FBF", "#8550C8", SECONDARY][i]
        _rounded(ax, x, 1.45, 2.4, 3.0, fc=WHITE, ec=c, lw=2.2)
        ax.add_patch(Circle((x + 1.2, 3.7), 0.42, facecolor=c, edgecolor="none", zorder=3))
        _text(ax, x + 1.2, 3.7, str(i + 1), size=18, bold=True, color=WHITE)
        _text(ax, x + 1.2, 2.85, t, size=16, bold=True, color=c)
        _text(ax, x + 1.2, 2.15, s, size=12, color=MUTED)
    save(fig, "cover-hero.png")


def diagram_weak_vs_strong() -> None:
    fig, ax = _fig()
    _title(ax, "امر ضعيف مقابل امر قوي")
    _rounded(ax, 0.5, 1.35, 5.2, 3.5, fc=WHITE, ec="#C45C26", lw=2)
    _rounded(ax, 6.3, 1.35, 5.2, 3.5, fc=WHITE, ec="#3D8B6E", lw=2)
    _text(ax, 3.1, 4.4, "ضعيف", size=16, bold=True, color="#C45C26")
    _text(ax, 8.9, 4.4, "قوي", size=16, bold=True, color="#3D8B6E")
    # Separate lines to avoid Arabic multiline overlap
    _text(ax, 3.1, 3.5, "اكتب لي عن التقرير", size=14, color=INK)
    _text(ax, 3.1, 2.7, "نتيجة عامة", size=12, color=MUTED)
    _text(ax, 3.1, 2.2, "بلا جمهور او شكل", size=12, color=MUTED)
    _text(ax, 8.9, 3.6, "انت محلل اداري", size=13, color=INK)
    _text(ax, 8.9, 3.05, "لخص لمدير تنفيذي", size=13, color=INK)
    _text(ax, 8.9, 2.5, "5 نقاط + توصية", size=13, color=INK)
    _text(ax, 8.9, 1.9, "لا تخترع ارقاما", size=12, color=MUTED)
    ax.plot([0.2, 11.8], [0.7, 0.7], color=SURFACE, linewidth=1, zorder=0)
    save(fig, "weak-vs-strong.png")


def diagram_image_prompt() -> None:
    fig, ax = _fig()
    _title(ax, "تشريح امر الصورة")
    parts = [(0.4, "موضوع"), (2.5, "اسلوب"), (4.6, "اضاءة"), (6.7, "زاوية"), (8.8, "نسبة")]
    for i, (x, label) in enumerate(parts):
        _rounded(ax, x, 2.5, 1.9, 1.8, fc=SOFT if i % 2 == 0 else SOFT_2, ec=PRIMARY)
        _text(ax, x + 0.95, 3.4, label, size=14, bold=True, color=PRIMARY)
        if i < len(parts) - 1:
            _arrow(ax, x + 1.95, 3.4, x + 2.4, 3.4)
    _footer(ax, "ثم اضف: ما يتجنب + هوية العلامة + جودة الاخراج")
    save(fig, "image-prompt-anatomy.png")


def diagram_data_decision() -> None:
    fig, ax = _fig()
    _title(ax, "من الجدول الى القرار")
    nodes = [
        (0.5, "رفع Excel/CSV"),
        (3.5, "اسئلة بلغة بشرية"),
        (6.5, "رسوم واحصاءات"),
        (9.5, "توصيات عملية"),
    ]
    for i, (x, label) in enumerate(nodes):
        _rounded(ax, x, 2.3, 2.4, 2.0, fc=WHITE, ec=PRIMARY, lw=2)
        _text(ax, x + 1.2, 3.3, label, size=13, bold=True, color=PRIMARY)
        if i < 3:
            _arrow(ax, x + 2.45, 3.3, x + 3.4, 3.4)
    _footer(ax, "Advanced Data Analysis داخل ChatGPT")
    save(fig, "data-to-decision.png")


def diagram_research_check() -> None:
    fig, ax = _fig()
    _title(ax, "تحقق جودة البحث")
    checks = [
        (0.6, "1", ["مصادر قابلة", "للمراجعة"]),
        (3.5, "2", ["مقارنة", "ادعاءات"]),
        (6.4, "3", ["مراجعة", "الارقام"]),
        (9.3, "4", ["فصل الحقائق", "عن التوصيات"]),
    ]
    for x, n, lines in checks:
        ax.add_patch(Circle((x + 1.1, 4.35), 0.38, facecolor=PRIMARY, edgecolor="none", zorder=3))
        _text(ax, x + 1.1, 4.35, n, size=16, bold=True, color=WHITE)
        _rounded(ax, x, 1.9, 2.2, 1.8, fc=SOFT, ec=LINE)
        _text(ax, x + 1.1, 2.95, lines[0], size=12, bold=True, color=INK)
        _text(ax, x + 1.1, 2.4, lines[1], size=12, bold=True, color=INK)
    save(fig, "research-checklist.png")


def diagram_video_script() -> None:
    fig, ax = _fig()
    _title(ax, "سكربت فيديو 30 ثانية")
    parts = [(0.8, "0-5ث", "Hook"), (4.5, "5-20ث", "قيمة"), (8.2, "20-30ث", "CTA")]
    for x, t, s in parts:
        _rounded(ax, x, 2.0, 3.0, 2.5, fc=WHITE, ec=SECONDARY, lw=2)
        _text(ax, x + 1.5, 3.8, t, size=14, bold=True, color=SECONDARY)
        _text(ax, x + 1.5, 3.0, s, size=18, bold=True, color=PRIMARY)
    save(fig, "video-script-flow.png")


def diagram_gpt_steps() -> None:
    fig, ax = _fig()
    _title(ax, "بناء Custom GPT")
    steps = [(0.5, "1", "الهدف"), (3.5, "2", "الملفات"), (6.5, "3", "التعليمات"), (9.5, "4", "الاختبار")]
    for i, (x, n, label) in enumerate(steps):
        ax.add_patch(Circle((x + 1.2, 3.95), 0.42, facecolor=PRIMARY, edgecolor="none", zorder=3))
        _text(ax, x + 1.2, 3.95, n, size=16, bold=True, color=WHITE)
        _rounded(ax, x, 2.1, 2.4, 1.2, fc=SOFT, ec=LINE)
        _text(ax, x + 1.2, 2.7, label, size=14, bold=True, color=INK)
        if i < 3:
            _arrow(ax, x + 2.5, 3.95, x + 3.4, 3.95)
    save(fig, "gpt-builder-steps.png")


def diagram_ethics() -> None:
    fig, ax = _fig()
    _title(ax, "اخلاقيات وامن البيانات")
    cards = [(0.6, "ملكية المحتوى"), (4.5, "لا ترفع اسرارا"), (8.4, "مراجعة بشرية")]
    for x, t in cards:
        _rounded(ax, x, 2.1, 3.0, 2.4, fc=WHITE, ec=PRIMARY, lw=2)
        _text(ax, x + 1.5, 3.3, t, size=15, bold=True, color=PRIMARY)
    _footer(ax, "الشفافية مع العملاء عند استخدام الذكاء الاصطناعي")
    save(fig, "ethics-security.png")


def main() -> None:
    print("Generating workshop diagrams…")
    diagram_three_days()
    diagram_prompt_flow()
    diagram_admin_exercise()
    diagram_media_stack()
    diagram_designer_exercise()
    diagram_automation()
    diagram_capstone()
    diagram_cover_hero()
    diagram_weak_vs_strong()
    diagram_image_prompt()
    diagram_data_decision()
    diagram_research_check()
    diagram_video_script()
    diagram_gpt_steps()
    diagram_ethics()
    print(f"Done → {OUT}")


if __name__ == "__main__":
    main()
