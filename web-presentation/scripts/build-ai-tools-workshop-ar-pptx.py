#!/usr/bin/env python3
"""
Build Arabic ETRA-branded PPTX for the 3-day Generative AI Tools workshop.
Output: pdf-exports/ETRA-AI-Tools-Workshop-3Days-AR.pptx
"""

from __future__ import annotations

import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

sys.path.insert(0, str(Path(__file__).resolve().parent))
from etra_brand import (  # noqa: E402
    INK,
    LINE,
    MARGIN,
    MUTED,
    PRIMARY,
    SECONDARY,
    SLIDE_H,
    SLIDE_W,
    SOFT,
    SOFT_2,
    WHITE,
    gradient_fill,
    logo,
    paint_light,
    rect,
    right_rail,
    set_run,
    soft_card,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pdf-exports" / "ETRA-AI-Tools-Workshop-3Days-AR.pptx"
DIAGRAMS = ROOT / "public" / "assets" / "workshop-ai-tools-diagrams"
PHOTOS = ROOT / "public" / "assets" / "workshop-ai-tools-photos"
LINKEDIN_URL = "https://www.linkedin.com/in/ahmed014x/"
LINKEDIN_QR = PHOTOS / "linkedin-qr-ahmed014x.png"
AR_FONT = "IBM Plex Sans Arabic"
AR_LANG = "ar-SA"

_SLIDES: list[dict] = []

_TASHKEEL = dict.fromkeys(
    map(ord, "ًٌٍَُِّْٰٕٖٜٟۣٓٔٗ٘ٙٚٛٝٞۖۗۘۙۚۛۜ۟۠ۡۢۤۥۦۧۨ۩۪ۭ۫۬"),
    None,
)

# Map tool display names → local real logo files (1:1, no shared wrong brands)
TOOL_ICONS = {
    "ChatGPT": "icon-openai.png",
    "Claude": "icon-anthropic.png",
    "Google Gemini": "icon-gemini.png",
    "Gemini": "icon-gemini.png",
    "Perplexity AI": "icon-perplexity.png",
    "Perplexity": "icon-perplexity.png",
    "ChatPDF / Claude": "icon-chatpdf.png",
    "ChatPDF": "icon-chatpdf.png",
    "نماذج الدردشة": "icon-openai.png",
    "Midjourney": "icon-midjourney.png",
    "DALL·E 3": "icon-openai.png",
    "Leonardo.ai": "icon-leonardo.png",
    "Gamma App": "icon-gamma.png",
    "Gamma": "icon-gamma.png",
    "Beautiful.ai": "icon-beautifulai.png",
    "HeyGen": "icon-heygen.png",
    "ElevenLabs": "icon-elevenlabs.png",
    "Runway / Pika": "icon-runway.png",
    "Runway": "icon-runway.png",
    "Zapier AI": "icon-zapier.png",
    "Zapier": "icon-zapier.png",
    "Make": "icon-make.png",
    "Notion": "icon-notion.png",
    "GPT Builder": "icon-openai.png",
    "Poe": "icon-poe.png",
    "Advanced Data Analysis": "icon-openai.png",
    "ChatGPT / Claude / Gemini": "icon-openai.png",
    "Perplexity · Midjourney · Gamma": "icon-perplexity.png",
    "HeyGen · Zapier / Make · GPT Builder": "icon-heygen.png",
}


def strip_tashkeel(value: str) -> str:
    if not value:
        return value
    return value.translate(_TASHKEEL)


def set_paragraph_rtl(paragraph, *, align_right=True) -> None:
    pPr = paragraph._p.get_or_add_pPr()
    pPr.set("rtl", "1")
    # Keep OOXML align in sync with python-pptx alignment
    pPr.set("algn", "r" if align_right else pPr.get("algn", "r"))


def _set_run_ar(run, size, *, bold=False, color=INK, font=None, rtl=True):
    face = font or AR_FONT
    set_run(run, size, bold=bold, color=color, font=face)
    rPr = run._r.get_or_add_rPr()
    rPr.set("rtl", "1" if rtl else "0")
    rPr.set("lang", AR_LANG if rtl else "en-US")
    rPr.set("altLang", "en-US" if rtl else AR_LANG)
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = rPr.makeelement(qn(f"a:{tag}"), {})
            rPr.append(el)
        el.set("typeface", face)


def add_rtl_text(
    slide,
    left,
    top,
    width,
    height,
    value,
    *,
    size=16,
    bold=False,
    color=INK,
    font=None,
    align=PP_ALIGN.RIGHT,
    anchor=MSO_ANCHOR.TOP,
):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    try:
        body_pr = tf._txBody.bodyPr
        body_pr.set(
            "anchor",
            {MSO_ANCHOR.TOP: "t", MSO_ANCHOR.MIDDLE: "ctr", MSO_ANCHOR.BOTTOM: "b"}[anchor],
        )
    except Exception:
        pass
    cleaned = strip_tashkeel(value or "")
    chunks = cleaned.split("\n") if cleaned is not None else [""]
    if not chunks:
        chunks = [""]
    align_map = {
        PP_ALIGN.RIGHT: "r",
        PP_ALIGN.LEFT: "l",
        PP_ALIGN.CENTER: "ctr",
        PP_ALIGN.JUSTIFY: "just",
    }
    for i, chunk in enumerate(chunks):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        pPr = p._p.get_or_add_pPr()
        # Force RTL reading order for Arabic; keep visual align as requested
        if align != PP_ALIGN.CENTER:
            pPr.set("rtl", "1")
        pPr.set("algn", align_map.get(align, "r"))
        p.space_after = Pt(6 if size >= 18 else 4)
        run = p.add_run()
        run.text = chunk
        _set_run_ar(run, size, bold=bold, color=color, font=font, rtl=(align != PP_ALIGN.LEFT))
    return box


def content_footer_ar(slide, page: int, total: int) -> None:
    """Arabic footer: page number left · ETRA right (mirrors LTR brand footer)."""
    y = Inches(7.05)
    rect(slide, MARGIN, y, Inches(12.1), Inches(0.012), PRIMARY)
    add_rtl_text(
        slide,
        Inches(10.0),
        Inches(7.12),
        Inches(2.7),
        Inches(0.28),
        "ETRA",
        size=11,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        slide,
        MARGIN,
        Inches(7.12),
        Inches(2.5),
        Inches(0.28),
        f"{page:02d}  /  {total:02d}",
        size=11,
        color=MUTED,
        align=PP_ALIGN.LEFT,
    )


def rtl_column_xs(n: int, *, left=None, total=12.1, gap=0.25) -> tuple[list, list[float]]:
    """Return (xs, widths) with item 0 placed on the right (RTL)."""
    left = MARGIN if left is None else left
    left_in = left.inches if hasattr(left, "inches") else float(left)
    if n <= 1:
        return [Inches(left_in)], [total]
    card_w = (total - gap * (n - 1)) / n
    xs = [Inches(left_in + (n - 1 - i) * (card_w + gap)) for i in range(n)]
    return xs, [card_w] * n


def rtl_bullets(
    slide,
    items: list[str],
    *,
    top=Inches(2.2),
    size=15,
    pitch=0.72,
    left=None,
    width=None,
    plain=False,
):
    left = MARGIN if left is None else left
    width = Inches(12.1) if width is None else width
    row_h = Inches(0.58 if plain else 0.62)
    for i, item in enumerate(items):
        y = top + Inches(i * pitch)
        if not plain:
            soft_card(slide, left, y, width, row_h, fill=SOFT if i % 2 == 0 else SOFT_2)
        else:
            # light hairline rows — less card density for checklists
            if i % 2 == 0:
                soft_card(slide, left, y, width, row_h, fill=SOFT_2)
        badge_x = left + width - Inches(0.48)
        soft_card(slide, badge_x, y + Inches(0.11), Inches(0.36), Inches(0.36), fill=PRIMARY)
        add_rtl_text(
            slide,
            badge_x,
            y + Inches(0.12),
            Inches(0.36),
            Inches(0.34),
            str(i + 1) if len(items) <= 7 else "•",
            size=12,
            bold=True,
            color=WHITE,
            align=PP_ALIGN.CENTER,
            anchor=MSO_ANCHOR.MIDDLE,
        )
        add_rtl_text(
            slide,
            left + Inches(0.22),
            y + Inches(0.08),
            width - Inches(0.82),
            Inches(0.45),
            item,
            size=size,
            color=INK,
            align=PP_ALIGN.RIGHT,
            anchor=MSO_ANCHOR.MIDDLE,
        )


def rtl_card(slide, left, top, width, height, title: str, body: str, *, fill=SOFT):
    soft_card(slide, left, top, width, height, fill=fill)
    pad = Inches(0.22)
    add_rtl_text(
        slide,
        left + pad,
        top + Inches(0.16),
        width - pad * 2,
        Inches(0.4),
        title,
        size=15,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        slide,
        left + pad,
        top + Inches(0.58),
        width - pad * 2,
        height - Inches(0.75),
        body,
        size=13,
        color=INK,
        align=PP_ALIGN.RIGHT,
    )


def _as_inches(val) -> float:
    """Convert pptx Length / EMU int / plain inches float to inches.

    NOTE: summing two Length values (e.g. MARGIN + Inches(0.18)) often yields a
    plain int in EMUs — which has no `.inches` and must NOT be passed to Inches().
    """
    if hasattr(val, "inches"):
        return float(val.inches)
    v = float(val)
    # Slide is ~13.3" wide; anything larger is almost certainly EMUs
    if isinstance(val, int) and abs(v) > 50:
        return v / 914400.0
    return v


def _fit_picture(path: Path, slide, left, top, width, max_height, *, cover: bool = True):
    """Embed image into a box. cover=True center-crops to fill; else letterbox."""
    if not path.is_file():
        return None
    from PIL import Image

    max_w = _as_inches(width)
    max_h = _as_inches(max_height)
    left_in = _as_inches(left)
    top_in = _as_inches(top)
    if max_w <= 0 or max_h <= 0:
        return None

    with Image.open(path) as src:
        im = src.convert("RGB")
        px_w, px_h = im.size
        if px_w <= 0 or px_h <= 0:
            return None
        aspect = px_w / px_h
        box_aspect = max_w / max_h

        if cover:
            if aspect > box_aspect:
                new_w = max(1, int(round(px_h * box_aspect)))
                x0 = max(0, (px_w - new_w) // 2)
                im = im.crop((x0, 0, x0 + new_w, px_h))
            elif aspect < box_aspect:
                new_h = max(1, int(round(px_w / box_aspect)))
                y0 = max(0, (px_h - new_h) // 2)
                im = im.crop((0, y0, px_w, y0 + new_h))
            tmp = path.parent / f".crop-{path.stem}.jpg"
            im.save(tmp, format="JPEG", quality=90, optimize=True, progressive=False)
            return slide.shapes.add_picture(
                str(tmp),
                Inches(left_in),
                Inches(top_in),
                width=Inches(max_w),
                height=Inches(max_h),
            )

        # contain / letterbox
        fit_w = min(max_w, max_h * aspect)
        fit_h = fit_w / aspect
        if fit_h > max_h:
            fit_h = max_h
            fit_w = fit_h * aspect
        x = left_in + (max_w - fit_w) / 2
        y = top_in + (max_h - fit_h) / 2
        return slide.shapes.add_picture(
            str(path), Inches(x), Inches(y), width=Inches(fit_w), height=Inches(fit_h)
        )


def embed_diagram(slide, name: str, left, top, width, max_height):
    return _fit_picture(DIAGRAMS / name, slide, left, top, width, max_height, cover=False)


def embed_photo(slide, name: str, left, top, width, max_height):
    return _fit_picture(PHOTOS / name, slide, left, top, width, max_height, cover=True)


def resolve_tool_icon(tool_name: str) -> str | None:
    """Return icon filename only if the real logo file exists on disk."""
    name = TOOL_ICONS.get(tool_name)
    if not name:
        for key, icon in TOOL_ICONS.items():
            if key.lower() in tool_name.lower() or tool_name.lower() in key.lower():
                name = icon
                break
    if not name:
        return None
    if not (PHOTOS / name).is_file():
        return None
    return name


def embed_icon(slide, name: str, left, top, size=Inches(0.55)):
    """Embed a real logo on a white rounded pad so transparent SVGs stay visible."""
    path = PHOTOS / name
    if not path.is_file():
        return None
    from PIL import Image, ImageDraw

    size_in = _as_inches(size)
    left_in = _as_inches(left)
    top_in = _as_inches(top)
    px = 256
    canvas = Image.new("RGBA", (px, px), (255, 255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, px - 1, px - 1), radius=48, fill=(255, 255, 255, 255))
    logo = Image.open(path).convert("RGBA")
    logo.thumbnail((200, 200), Image.Resampling.LANCZOS)
    ox = (px - logo.size[0]) // 2
    oy = (px - logo.size[1]) // 2
    canvas.paste(logo, (ox, oy), logo)
    tmp = PHOTOS / f".pad-{path.stem}.png"
    canvas.save(tmp)
    return slide.shapes.add_picture(
        str(tmp), Inches(left_in), Inches(top_in), width=Inches(size_in), height=Inches(size_in)
    )

def new_slide(prs) -> object:
    return prs.slides.add_slide(prs.slide_layouts[6])


def ar_header(slide, kicker: str) -> None:
    cluster_left = logo(slide)
    # Right-aligned kicker must stop before the MAIA + ETRA logos
    kicker_w = max(6.0, cluster_left - 0.28 - MARGIN.inches)
    add_rtl_text(
        slide,
        MARGIN,
        Inches(0.42),
        Inches(kicker_w),
        Inches(0.34),
        kicker,
        size=13,
        bold=True,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
    )
    rect(slide, MARGIN, Inches(0.9), Inches(12.1), Inches(0.012), LINE)


def chrome(slide, kicker: str, page: int, total: int):
    paint_light(slide)
    right_rail(slide)
    ar_header(slide, kicker)
    content_footer_ar(slide, page, total)


def rtl_title(
    slide,
    title: str,
    subtitle: str | None = None,
    *,
    top=Inches(1.12),
    left=None,
    width=Inches(12.0),
):
    """Place title (and optional subtitle) RTL-aligned within [left, left+width]."""
    left = MARGIN if left is None else left
    add_rtl_text(
        slide,
        left,
        top,
        width,
        Inches(0.7),
        title,
        size=26 if len(title) > 36 else (28 if len(title) > 28 else 32),
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.RIGHT,
    )
    if subtitle:
        add_rtl_text(
            slide,
            left,
            top + Inches(0.62),
            width,
            Inches(0.4),
            subtitle,
            size=14,
            color=MUTED,
            align=PP_ALIGN.RIGHT,
        )
        return top + Inches(1.05)
    return top + Inches(0.78)


# ─── Slide constructors (append meta then paint later with totals) ───────────

def register(kind: str, **kwargs):
    _SLIDES.append({"kind": kind, **kwargs})


def build_registry() -> None:
    _SLIDES.clear()

    # ─── 1–4 افتتاح الورشة ───
    register("cover")
    register("agenda_diagram")
    register(
        "bullets",
        kicker="الورشة  ·  نظرة عامة",
        title="نواتج التعلّم",
        subtitle="ما الذي يكتسبه المتدرب بنهاية الورشة؟",
        items=[
            "إتقان هندسة الأوامر: صياغة طلبات مكتملة العناصر تقلّل هلوسة المعلومات",
            "إنتاج وسائط متعددة (صور وعروض وفيديو) بصياغة منضبطة",
            "تحليل الجداول بلغة طبيعية وبناء مسارات أتمتة بسيطة",
            "بناء مساعد شخصي مخصص مع الالتزام بضوابط أمن البيانات",
            "تطبيق معايير مراجعة بشرية قبل اعتماد أي مخرج حسّاس",
        ],
    )
    register(
        "day_divider",
        day="اليوم الأول",
        title="هندسة الأوامر بتعمّق",
        photo="hero-day1.jpg",
        sessions=[
            ("الوحدة أ", "فهم النموذج وحدوده", "ساعة"),
            ("الوحدة ب", "مكوّنات الأمر الاحترافي", "ساعة ونصف"),
            ("الوحدة ج", "تقنيات متقدمة وضبط الجودة", "ساعة ونصف"),
        ],
    )

    # ─── 5–10 الوحدة أ: فهم النموذج وحدوده ───
    register(
        "session_open",
        kicker="اليوم 1  ·  الوحدة أ",
        title="فهم النموذج وحدوده",
        duration="ساعة",
        goal="تمييز قدرات النموذج اللغوي وحدود موثوقيته قبل صياغة أي أمر",
        photo="hero-laptop.jpg",
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة أ",
        title="الذكاء التقليدي مقابل التوليدي",
        subtitle="متى يُستخدم كل نوع في بيئة العمل؟",
        cards=[
            ("الذكاء التقليدي", "تصنيف وتنبؤ ضمن نطاق محدد؛ المخرج غالبًا فئة أو رقم أو احتمال."),
            ("الذكاء التوليدي", "توليد نص أو صورة أو شفرة جديدة انطلاقًا من سياق الأمر."),
            ("الخلاصة المهنية", "التوليدي مرن وغير مضمون؛ الأمر والمراجعة البشرية جزء أصيل من العمل."),
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة أ",
        title="آلية عمل النماذج اللغوية",
        subtitle="التنبؤ بالرمز التالي وفق الاحتمال والسياق",
        cards=[
            ("المبدأ", "يكمل النموذج التسلسل التالي اعتمادًا على التدريب وسياق الأمر."),
            ("النتيجة", "الأمر الغامض ينتج مخرجًا عامًا؛ الأمر الدقيق يرفع جودة الإجابة."),
            ("التحذير", "الإقناع اللغوي لا يساوي التحقق من صحة الحقائق."),
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة أ",
        title="هلوسة المعلومات",
        subtitle="تعريف · أمثلة · مخاطر مهنية",
        cards=[
            ("التعريف", "محتوى يبدو صحيحًا وهو مختلق أو غير مدعوم بمصدر موثوق."),
            ("أمثلة شائعة", "أرقام · أسماء · تواريخ · اقتباسات غير موجودة في المدخل."),
            ("المخاطر", "قرارات إدارية أو مراسلات خارجية مبنية على معلومات غير دقيقة."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة أ",
        title="حدود النموذج: ما يستطيع وما لا يضمن",
        subtitle="إطار توقّعات مهني واضح",
        items=[
            "يستطيع: إعادة الصياغة، التلخيص، اقتراح هياكل، توليد مسودات متعددة",
            "لا يضمن: دقة الأرقام أو الأسماء دون مصدر أو ملف أو مراجعة",
            "يعتمد على جودة الأمر: السياق والدور والجمهور والشكل والقيود",
            "المسؤولية النهائية لاعتماد المخرج تبقى بشرية",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة أ",
        title="لماذا تُعد هندسة الأوامر مهارة مؤسسية؟",
        subtitle="الجودة تتبع جودة التوجيه لا اسم الأداة",
        cards=[
            ("بدون توجيه كافٍ", "مخرج عام يصعب اعتماده أو إرساله لصانع القرار."),
            ("مع توجيه مكتمل", "مخرج قابل للاستخدام: أوضح، أقصر، وأكثر التزامًا بالمعطيات."),
            ("القاعدة", "يُراجع الأمر أولًا قبل الحكم على ضعف الأداة."),
        ],
    )

    # ─── 11–20 الوحدة ب: مكوّنات الأمر الاحترافي ───
    register(
        "session_open",
        kicker="اليوم 1  ·  الوحدة ب",
        title="مكوّنات الأمر الاحترافي",
        duration="ساعة ونصف",
        goal="بناء أمر مكتمل العناصر وتشخيص الأمر الضعيف خلال ثوانٍ",
        photo="hero-day1.jpg",
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الوحدة ب",
        title="المكوّنات الخمسة للأمر",
        subtitle="السياق · الدور · الجمهور · الشكل · قيود الجودة",
        image="prompt-structure.png",
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="السياق",
        subtitle="ماذا حدث؟ ما الملف؟ ما يجب التركيز عليه؟",
        items=[
            "ضعيف: «لخّص التقرير» — دون تحديد الملف أو الهدف أو القيود",
            "أفضل: تقرير مبيعات أغسطس لفرع الرياض؛ الهدف 1.2 مليون؛ المتحقق 980 ألف",
            "أضف: ركّز على أسباب الفجوة لا على الإنجازات العامة",
            "الأثر: يمنع التلخيص العشوائي ويرفع صلة المخرج بالقرار المطلوب",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="الدور (Persona)",
        subtitle="يضبط المفردات وعمق التحليل وزاوية النظر",
        items=[
            "بدون دور: نبرة غير مستقرة وقد لا تناسب السياق المؤسسي",
            "«أنت محلل إداري» يميل إلى توصية حذرة مدعومة بمعطيات",
            "«أنت كاتب محتوى تسويقي» يميل إلى نبرة إقناعية مختلفة تمامًا",
            "اختبر: غيّر الدور فقط على المدخل نفسه ولاحظ اختلاف الناتج",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="الجمهور",
        subtitle="نفس الحقيقة تُعرض بصيغ مختلفة حسب القارئ",
        items=[
            "صانع قرار تنفيذي: مختصر + قرار مطلوب + أثر رقمي واضح",
            "فريق تشغيلي: تفاصيل تنفيذ ومسؤوليات وخطوات تالية",
            "جمهور عام أو مهني خارجي: قيمة عامة دون بيانات داخلية حسّاسة",
            "عدم تحديد الجمهور يؤدي إلى تذبذب مستوى الرسمية والتفصيل",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="شكل المخرجات (Format)",
        subtitle="حوّل الإجابة من فقرة عامة إلى أداة عمل",
        items=[
            "حدد الشكل صراحة: نقاط مرقّمة · جدول · رسالة رسمية · ملخص تنفيذي",
            "مثال: «خمس نقاط ثم توصية واحدة في سطرين»",
            "مثال: «جدول عمودين: السبب | الإجراء المقترح»",
            "ترك الشكل مفتوحًا غالبًا ينتج نصًا طويلًا قليل الفائدة التشغيلية",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="قيود الجودة",
        subtitle="طبقة الأمان داخل الأمر",
        items=[
            "لا تخترع أرقامًا أو أسماء أو تواريخ غير موجودة في المدخل",
            "إن لم تتوفر المعلومة فاكتب: غير متوفر / لا أعرف",
            "حدد الطول الأقصى ومستوى الرسمية المطلوب",
            "افصل الحقائق الواردة في الملف عن التوصيات المقترحة",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الوحدة ب",
        title="أمر ضعيف مقابل أمر قوي",
        subtitle="نفس الأداة · جودة مختلفة · السبب في صياغة الطلب",
        image="weak-vs-strong.png",
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ب",
        title="نموذج أمر جاهز (Cheat Sheet)",
        subtitle="انسخ الهيكل وعدّل الحقول فقط",
        items=[
            "السياق: [الموقف / الملف / القيود / محور التركيز]",
            "الدور: أنت [محلل / محرر / مختص] بخبرة في [المجال]",
            "الجمهور: موجّه إلى [مدير تنفيذي / فريق / جمهور مهني]",
            "الشكل: أخرج النتيجة بصيغة [نقاط / جدول / رسالة / تقرير]",
            "القيود: الطول · الرسمية · لا تختلق · اذكر غير المتوفر صراحة",
            "المهمة: [الطلب النهائي بجملة واحدة واضحة]",
        ],
        image="prompt-structure.png",
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الوحدة ب",
        title="مثال تطبيقي مكتمل — فرع الرياض",
        subtitle="ابدأ من أمر ممتلئ ثم عدّل القيم حسب مهمتك",
        image="filled-prompt-example.png",
    )
    register(
        "steps",
        kicker="اليوم 1  ·  الوحدة ب",
        title="تطبيق الوحدة ب",
        subtitle="أعد بناء أمر ضعيف إلى أمر مكتمل العناصر",
        steps=[
            "خذ أمرًا ضعيفًا: «اكتب لي عن التقرير»",
            "أضف السياق والدور والجمهور والشكل والقيود",
            "نفّذ الأمرين على ملف مبيعات الرياض وقارن المخرجين",
            "احفظ النموذج الستة في ملفك الشخصي فورًا",
        ],
    )

    # ─── 21–31 الوحدة ج: تقنيات متقدمة وضبط الجودة ───
    register(
        "session_open",
        kicker="اليوم 1  ·  الوحدة ج",
        title="تقنيات متقدمة وضبط الجودة",
        duration="ساعة ونصف",
        goal="توظيف CoT وFew-Shot وإطار الحد من الهلوسة بمعايير قبول واضحة",
        photo="hero-research.jpg",
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة ج",
        title="التوجيه المتسلسل (Chain-of-Thought)",
        subtitle="متى يُستخدم ومتى يُتجنّب",
        cards=[
            ("يُستخدم", "مقارنة بدائل · توصية من عدة معطيات · تلخيص ثم استنتاج."),
            ("الصيغة", "اكتب خطوات التفكير في 3–5 أسطر ثم أعطِ النتيجة النهائية فقط."),
            ("يُتجنّب", "المراسلات القصيرة وإعادة الصياغة البسيطة؛ يطيل بلا فائدة."),
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة ج",
        title="التعلّم من الأمثلة (Few-Shot)",
        subtitle="تثبيت النبرة والشكل داخل الأمر",
        cards=[
            ("يُستخدم", "نمط ثابت لمراسلات الدعم أو المحاضر أو المحتوى الدوري."),
            ("الهيكل", "مثال 1: مدخل/مخرج · مثال 2 · ثم نفّذ على المدخل الجديد."),
            ("تجنّب", "لصق نص طويل دون تمييز الأمثلة بعناوين واضحة."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ج",
        title="الجمع بين التقنيات دون إطالة",
        subtitle="اختر الأداة المناسبة للمهمة لا تكديس الأساليب",
        items=[
            "ابدأ دائمًا بالمكوّنات الخمسة قبل أي تقنية متقدمة",
            "أضف Few-Shot عند الحاجة لنبرة أو شكل ثابت",
            "أضف Chain-of-Thought عند الحاجة لترتيب منطقي صريح",
            "لا تجمع التقنيتين مع أمر بسيط؛ راقب الطول والفائدة",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الوحدة ج",
        title="إطار الحد من هلوسة المعلومات",
        subtitle="ثلاث طبقات متكاملة",
        cards=[
            ("1) داخل الأمر", "قيود الدقة وعبارة: اذكر غير المتوفر بدل الاختلاق."),
            ("2) في الأداة", "الاعتماد على ملف مرفوع أو مصادر قابلة للمراجعة."),
            ("3) بعد الناتج", "مراجعة بشرية للأرقام والأسماء والتواريخ قبل الاعتماد."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 1  ·  الوحدة ج",
        title="اختيار الأداة وفق المهمة",
        subtitle="المعيار: طبيعة المهمة ونوع الملف والحاجة إلى الويب",
        tools=[
            ("ChatGPT", "صياغة عامة · تجارب سريعة · مساعد يومي"),
            ("Claude", "ملفات طويلة · صياغة منضبطة · تقارير كثيفة"),
            ("Google Gemini", "سياق ويب ووسائط متعددة في مسار واحد"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ج",
        title="سلامة البيانات عند الاستخدام",
        subtitle="ضوابط إلزامية قبل رفع أي ملف",
        items=[
            "استخدم ملفات تدريبية في التمارين؛ تجنب العقود السرية الحقيقية",
            "احذف الأسماء والأرقام الحساسة أو جهّل البيانات قبل الرفع",
            "لا تعتمد أداة شخصية غير معتمدة لبيانات جهة العمل",
            "ميّز بين مسودة داخلية ومحتوى قابل للنشر الخارجي",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الوحدة ج",
        title="أخطاء شائعة في هندسة الأوامر",
        subtitle="كل خطأ يقابله علاج مباشر",
        items=[
            "طلب غامض بلا هدف → حدّد المخرج المطلوب بجملة صريحة",
            "غياب الجمهور → حدد القارئ ومستوى الرسمية",
            "غياب الشكل → اطلب نقاطًا أو جدولًا أو هيكل رسالة",
            "اعتماد المخرج دون تحقق → دقيقة مراجعة للأرقام قبل الإرسال",
            "أمر طويل بلا أولوية → ضع المهمة أولًا ثم السياق ثم التفاصيل",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الوحدة ج",
        title="مسار العمل المهني",
        subtitle="إعداد → تنفيذ → مراجعة → اعتماد",
        image="practice-flow.png",
    )
    register(
        "steps",
        kicker="اليوم 1  ·  تطبيق ختامي",
        title="تطبيق ختامي لليوم الأول",
        subtitle="مهمة عمل كاملة بأمر واحد قوي ومعايير قبول",
        steps=[
            "اختر مهمة حقيقية من عملك أو استخدم ملف مبيعات الرياض",
            "ابنِ أمرًا مكتمل العناصر الستة ثم نفّذه في الأداة",
            "طبّق إطار الحد من الهلوسة وراجع الأرقام والأسماء",
            "قرر الاعتماد أو التعديل وفق معايير القبول قبل الإرسال",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  ختام",
        title="خلاصة اليوم الأول",
        subtitle="ثبّت العادة قبل الانتقال إلى وسائط اليوم الثاني",
        cards=[
            ("الأمر أولًا", "مكوّنات كاملة قبل اختيار الأداة أو التقنية."),
            ("المراجعة دومًا", "لا اعتماد لأرقام أو أسماء دون تحقق بشري."),
            ("غدًا", "الوسائط بنفس الانضباط: موضوع · أسلوب · جمهور · شكل · قيود."),
        ],
    )
    register(
        "linkedin_qr",
        kicker="اليوم 1  ·  ختام",
        title="تواصل معي على LinkedIn",
        subtitle="امسح الرمز",
    )

    # ═══════════ DAY 2 — وسائط بتعمّق وفصحى ═══════════
    register(
        "day_divider",
        day="اليوم الثاني",
        title="الوسائط المتعددة بتعمّق",
        photo="hero-day2.jpg",
        sessions=[
            ("الوحدة أ", "توليد الصور والرسومات", "ساعة ونصف"),
            ("الوحدة ب", "تصميم العروض التقديمية", "ساعة"),
            ("الوحدة ج", "الفيديو والصوت", "ساعة ونصف"),
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  إطار اليوم",
        title="من هندسة الأوامر إلى الوسائط",
        subtitle="نفس المكوّنات الخمسة · قناة إخراج مختلفة",
        cards=[
            ("جسر يوم 1", "السياق · الدور · الجمهور · الشكل · القيود تبقى أساس كل أمر."),
            ("إسقاط على الوسائط", "موضوع≈سياق · أسلوب≈هوية · جمهور · شكل/نسبة · قيود/حقوق."),
            ("وعد اليوم", "أمر صورة مكتمل · عرض بمعايير قبول · سكربت فيديو 30 ثانية."),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  نظرة عامة",
        title="مسار إنتاج الوسائط",
        subtitle="صورة → عرض → فيديو في سلسلة واحدة متسقة الهوية",
        image="media-stack.png",
    )

    # ─── الوحدة أ: توليد الصور ───
    register(
        "session_open",
        kicker="اليوم 2  ·  الوحدة أ",
        title="توليد الصور والرسومات الاحترافية",
        duration="ساعة ونصف",
        goal="صياغة أمر صورة مكتمل العناصر وتعديله للاستخدام التسويقي بمعايير قبول",
        photo="hero-media.jpg",
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الوحدة أ",
        title="أساسيات بصرية لأمر الصورة",
        subtitle="قبل اختيار الأداة: ثبّت القرارات البصرية",
        items=[
            "الإضاءة: طبيعية · استوديو ناعمة · ذهبية — اختر واحدة وثبتها للحملة",
            "زاوية الكاميرا: علوية · عين المستوى · قريبة للمنتج",
            "الأسلوب: واقعي · مسطح · ثلاثي الأبعاد · وفق هوية العلامة",
            "النسبة: 1:1 للمنصات · 16:9 للعروض · 9:16 للقصص",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الوحدة أ",
        title="المكوّنات الخمسة لأمر الصورة",
        subtitle="موضوع · أسلوب · إضاءة · زاوية · نسبة — ثم القيود",
        image="image-prompt-anatomy.png",
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الوحدة أ",
        title="أمر صورة ضعيف مقابل أمر قوي",
        subtitle="نفس الأداة · جودة مختلفة · السبب في صياغة الطلب",
        cards=[
            ("ضعيف", "«صوّر لي منتج حلو.» — بلا موضوع محدد ولا أسلوب ولا نسبة ولا قيود."),
            ("قوي", "منتج سماعة على خلفية بيضاء · أسلوب واقعي · إضاءة استوديو ناعمة · عين المستوى · نسبة 1:1 · بلا نص مشوّه."),
            ("القاعدة", "يُراجع أمر الصورة أولًا قبل الحكم على ضعف الأداة."),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الوحدة أ",
        title="مثال أمر صورة مكتمل",
        subtitle="ابدأ من أمر ممتلئ ثم عدّل القيم حسب منتجك",
        image="filled-image-prompt-example.png",
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الوحدة أ",
        title="تقنيات التعديل والتوظيف المهني",
        cards=[
            ("Inpainting", "استبدال عنصر محدد داخل الصورة دون إعادة توليدها كاملة."),
            ("Outpainting", "توسيع الإطار لملاءمة بانر أو خلفية أوسع."),
            ("التوظيف", "هويات بصرية وإعلانات وتصاميم مواقع بمعايير قبول واضحة."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الوحدة أ",
        title="اختيار أداة الصورة وفق المهمة",
        subtitle="المعيار: الجودة الفنية · سرعة التعديل · ثبات النمط",
        tools=[
            ("Midjourney", "جودة فنية عالية للحملات والأفكار البصرية"),
            ("DALL·E 3", "تعديل سريع داخل ChatGPT ووصف طويل"),
            ("Leonardo.ai", "تكرار نمط ثابت للمنتجات والتجارب المتعددة"),
        ],
    )
    register(
        "steps",
        kicker="اليوم 2  ·  الوحدة أ",
        title="تطبيق الوحدة أ",
        subtitle="ابنِ أمر صورة مكتملًا ونفّذه بمعايير قبول",
        steps=[
            "اختر منتجًا حقيقيًا أو استخدم مثال السماعة التدريبي",
            "اكتب أمرًا بالعناصر الخمسة ثم أضف قيود الجودة والحقوق",
            "نفّذ في الأداة وقارن مع أمر ضعيف قصير على نفس الموضوع",
            "معايير القبول: النسبة صحيحة · بلا نص مشوّه · الأسلوب ثابت · صالح للنشر الداخلي",
        ],
    )

    # ─── الوحدة ب: العروض التقديمية ───
    register(
        "session_open",
        kicker="اليوم 2  ·  الوحدة ب",
        title="تصميم العروض التقديمية",
        duration="ساعة",
        goal="تحويل فكرة أو مستند إلى عرض بمعايير قبول قبل المشاركة",
        photo="hero-day2.jpg",
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الوحدة ب",
        title="من نص إلى عرض جاهز",
        subtitle="مدخل واضح → هيكل شرائح → مراجعة هوية → تصدير",
        image="deck-prompt-anatomy.png",
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الوحدة ب",
        title="هيكل أمر العرض",
        subtitle="مشكلة · حل · مميزات · دعوة لإجراء",
        items=[
            "حدد الجمهور: مدير تنفيذي · فريق مبيعات · جمهور عام",
            "اطلب عدد الشرائح صراحة (مثال: أربع شرائح فقط)",
            "هيكل مقترح: مشكلة → حل → مميزات → دعوة لإجراء واحدة",
            "قيود: شريحة واحدة = فكرة واحدة · نقاط قصيرة · بلا فقرات طويلة",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الوحدة ب",
        title="أمر عرض ضعيف مقابل أمر قوي",
        subtitle="الفرق في تحديد الشكل والجمهور والقيود",
        cards=[
            ("ضعيف", "«سوّ لي عرض عن المنتج.» — بلا جمهور ولا عدد شرائح ولا هيكل."),
            ("قوي", "حوّل النص إلى عرض 4 شرائح لمدير تنفيذي: مشكلة، حل، مميزتان، دعوة لإجراء واحدة."),
            ("بعد التوليد", "احذف الشرائح المكررة واضبط الهوية قبل مشاركة الرابط."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الوحدة ب",
        title="أدوات العروض وفق المهمة",
        tools=[
            ("Gamma App", "عرض سريع من أمر أو مستند مع رابط مشاركة"),
            ("Beautiful.ai", "قوالب ذكية وإعادة ترتيب تلقائي للعناصر"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الوحدة ب",
        title="قائمة تحقق جودة العرض",
        subtitle="قبل مشاركة الرابط أو التصدير",
        plain=True,
        items=[
            "عنوان كل شريحة واضح في ست كلمات أو أقل",
            "شريحة واحدة = فكرة واحدة فقط",
            "أقل نص ممكن: نقاط قصيرة لا فقرات",
            "تباين بصري جيد بين النص والخلفية",
            "إزالة الشرائح المكررة أو الزائدة بعد التوليد",
            "اتساق الألوان والخطوط مع هوية الحملة",
        ],
    )
    register(
        "steps",
        kicker="اليوم 2  ·  الوحدة ب",
        title="تطبيق الوحدة ب",
        subtitle="أنتج عرضًا من أربع شرائح بمعايير القبول",
        steps=[
            "جهّز فقرة قصيرة عن منتج أو فكرة من عملك",
            "اكتب أمر عرض مكتمل العناصر ونفّذه في Gamma أو Beautiful.ai",
            "طبّق قائمة التحقق وعدّل الشرائح يدويًا عند الحاجة",
            "معايير القبول: 4 شرائح · فكرة واحدة لكل شريحة · دعوة إجراء واحدة · جاهز للمشاركة",
        ],
    )

    # ─── الوحدة ج: الفيديو والصوت ───
    register(
        "session_open",
        kicker="اليوم 2  ·  الوحدة ج",
        title="إنتاج الفيديو والصوت",
        duration="ساعة ونصف",
        goal="كتابة سكربت 30 ثانية ثم توليده بأفاتار أو صوت بمعايير قبول",
        photo="hero-media.jpg",
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الوحدة ج",
        title="قدرات الفيديو والصوت وحدودها",
        subtitle="مرونة عالية · مراجعة بشرية قبل النشر",
        cards=[
            ("أفاتار ناطق", "متحدث رقمي بلغات متعددة للشروحات والإعلانات القصيرة."),
            ("نص إلى فيديو", "مقطع توضيحي من سكربت مكتوب بالصوت والمشهد."),
            ("الحد المهني", "الجودة تتبع السكربت والهوية؛ لا تُنشر دون مراجعة بشرية."),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الوحدة ج",
        title="سكربت فيديو 30 ثانية",
        subtitle="جذب الانتباه → القيمة → دعوة لإجراء",
        image="video-script-flow.png",
    )
    register(
        "steps",
        kicker="اليوم 2  ·  الوحدة ج",
        title="تفاصيل السكربت للنسخ",
        subtitle="هيكل زمني جاهز للتعديل",
        steps=[
            "جذب الانتباه (0–5 ث): سؤال أو مشكلة تمس الجمهور فورًا",
            "القيمة (5–20 ث): ميزتان واضحتان للمنتج أو الحل",
            "إثبات قصير: رقم أو نتيجة أو وعد قابل للتصديق من مصدر موثوق",
            "دعوة لإجراء (20–30 ث): اطلب إجراءً واحدًا فقط (جرّب / تواصل / زر الرابط)",
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الوحدة ج",
        title="اختيار أداة الفيديو والصوت",
        subtitle="المعيار: أفاتار · صوت · توليد مقطع",
        tools=[
            ("HeyGen", "أفاتار ناطق وإعلانات قصيرة"),
            ("ElevenLabs", "صوت طبيعي وتحويل نص إلى كلام"),
            ("Runway / Pika", "توليد وتعديل مقاطع فيديو"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الوحدة ج",
        title="أخطاء شائعة وحقوق الاستخدام",
        subtitle="طبقة أمان قبل اعتماد المخرج",
        items=[
            "استخدام صور أو أصوات دون التحقق من حقوق الاستخدام",
            "نبرة صوت لا تناسب الجمهور أو هوية العلامة",
            "فيديو أطول من اللازم يفقد الانتباه",
            "أسلوب بصري عشوائي بين الصورة والعرض والفيديو",
            "نصوص طويلة على الشاشة بدل جملة واحدة قوية",
        ],
    )
    register(
        "steps",
        kicker="اليوم 2  ·  الوحدة ج",
        title="تطبيق الوحدة ج",
        subtitle="اكتب السكربت أولًا ثم ولّد المقطع",
        steps=[
            "اكتب سكربت 30 ثانية بالهيكل الأربعة على منتجك",
            "اختر أداة مناسبة (أفاتار أو صوت) ونفّذ المسودة",
            "راجع النبرة والطول ووضوح دعوة الإجراء",
            "معايير القبول: ≤30 ثانية · دعوة إجراء واحدة · نبرة متسقة · صالح للمراجعة الداخلية",
        ],
    )

    # ─── ختام اليوم 2 ───
    register(
        "diagram",
        kicker="اليوم 2  ·  تطبيق ختامي",
        title="تمرين: المصمم الشامل",
        subtitle="حزمة إعلان متسقة الهوية",
        image="designer-exercise.png",
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  تطبيق ختامي",
        title="بوابة جودة الحزمة",
        subtitle="صورة · عرض · فيديو — مراجعة قبل الاعتماد",
        image="media-quality-gate.png",
    )
    register(
        "steps",
        kicker="اليوم 2  ·  تطبيق ختامي",
        title="مخرجات التمرين ومعايير القبول",
        steps=[
            "توليد صورة منتج بأمر مكتمل العناصر ونسبة محددة",
            "إنشاء عرض من 4 شرائح يشرح الفكرة لدعوة إجراء واحدة",
            "إنتاج فيديو 30 ثانية بمتحدث رقمي أو صوت طبيعي من السكربت",
            "تجميع الملفات في مجلد واحد ومراجعة الاتساق البصري والنبرة",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  ختام",
        title="خلاصة اليوم الثاني",
        subtitle="ثبّت العادة قبل الانتقال إلى بيانات اليوم الثالث",
        cards=[
            ("أمر صورة ثابت", "ثبّت أسلوبًا وإضاءة ونسبة لكل حملة."),
            ("سكربت قبل التوليد", "جذب انتباه → قيمة → دعوة لإجراء."),
            ("غدًا", "الجداول والأتمتة بنفس الانضباط: سؤال واضح · مصدر · مراجعة."),
        ],
    )
    register(
        "linkedin_qr",
        kicker="اليوم 2  ·  ختام",
        title="تواصل معي على LinkedIn",
        subtitle="امسح الرمز",
    )

    # ═══════════ DAY 3 ═══════════
    register(
        "day_divider",
        day="اليوم الثالث",
        title="تحليل البيانات والأتمتة وبناء مساعد شخصي",
        photo="hero-day3.jpg",
        sessions=[
            ("الجلسة 1", "تحليل البيانات والقرارات", "ساعة ونصف"),
            ("الجلسة 2", "أتمتة المهام وربط الأدوات", "ساعة"),
            ("الجلسة 3", "مساعد مخصص ومستقبل العمل", "ساعة ونصف"),
        ],
    )

    # Day 3 Session 1
    register(
        "session_open",
        kicker="اليوم 3  ·  الجلسة 1",
        title="تحليل البيانات واتخاذ القرارات الذكية",
        duration="ساعة ونصف",
        goal="رفع Excel/CSV والسؤال بلغة بشرية دون معادلات يدوية",
        photo="hero-data.jpg",
    )
    register(
        "diagram",
        kicker="اليوم 3  ·  الجلسة 1",
        title="من الجدول إلى القرار",
        subtitle="رفع → سؤال → رسم → توصية",
        image="data-to-decision.png",
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  الجلسة 1",
        title="ممارسات تحليل البيانات",
        items=[
            "رفع ملفات Excel وCSV المعقدة وتحليلها بلغة بسيطة",
            "استخراج إحصاءات متقدمة وتوليد رسوم بيانية وخرائط حرارية فورا",
            "التنبؤ بالاتجاهات واستنتاج توصيات تشغيلية ومالية",
            "التحقق من الافتراضات: اطلب المنهجية وحدود التحليل",
        ],
    )
    register(
        "tools",
        kicker="اليوم 3  ·  الجلسة 1",
        title="أداة التحليل",
        tools=[
            ("Advanced Data Analysis", "داخل ChatGPT — تحليل جداول ورسوم فورية"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  الجلسة 1",
        title="اسئلة تحليل جاهزة لـ Excel / CSV",
        subtitle="انسخ بعد رفع الملف",
        items=[
            "لخص اعمدة البيانات وابرز 5 مؤشرات رئيسية",
            "اكتشف القيم الشاذة والصفوف الناقصة واشرح اثرها",
            "قارن الاداء حسب الشهر / المنتج / المنطقة في جدول",
            "اقترح 3 توصيات تشغيلية مبنية على البيانات فقط",
            "ارسم رسما بيانيا مناسبا واشرح ماذا يعني للإدارة",
        ],
    )

    # Day 3 Session 2
    register(
        "session_open",
        kicker="اليوم 3  ·  الجلسة 2",
        title="أتمتة المهام اليومية والربط بين الأدوات",
        duration="ساعة",
        goal="بناء Workflow يربط البريد والجداول والردود الذكية",
        photo="hero-automation.jpg",
    )
    register(
        "diagram",
        kicker="اليوم 3  ·  الجلسة 2",
        title="مفهوم سير العمل الآلي",
        subtitle="مثال عملي من الإيميل إلى مسودة الرد",
        image="automation-flow.png",
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  الجلسة 2",
        title="ماذا نربط؟",
        items=[
            "Gmail وNotion وSlack وDrive كتطبيقات يومية شائعة",
            "محفّز (Trigger) → خطوة ذكاء اصطناعي → إجراء (Action)",
            "مثال: إيميل عميل → تلخيص → صف في جدول → مسودة رد",
            "ابدأ بمسار واحد بسيط ثم وسّع الشروط والتنبيهات",
        ],
    )
    register(
        "tools",
        kicker="اليوم 3  ·  الجلسة 2",
        title="منصات الأتمتة",
        tools=[
            ("Zapier AI", "مسارات سريعة وموصّلات كثيرة"),
            ("Make", "سيناريوهات مرئية أكثر تفصيلًا"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  الجلسة 2",
        title="قائمة تحقق قبل تشغيل الأتمتة",
        subtitle="لا تفعّل المسار قبل هذه النقاط",
        plain=True,
        items=[
            "ما المحفز بالضبط؟ (إيميل جديد / نموذج / رسالة Slack)",
            "هل توجد بيانات حساسة يجب حجبها قبل ارسالها للنموذج؟",
            "ما مسار الفشل؟ تنبيه بشري عند خطأ او نقص بيانات",
            "هل الرد النهائي يحتاج موافقة بشرية قبل الارسال؟",
            "هل سجلت المسار في مستند بسيط للفريق؟",
        ],
    )

    # Day 3 Session 3
    register(
        "session_open",
        kicker="اليوم 3  ·  الجلسة 3",
        title="بناء مساعد شخصي مخصص بدون برمجة ومستقبل العمل",
        duration="ساعة ونصف",
        goal="Custom GPT/Bot على ملفات داخلية + أخلاقيات وأمن البيانات",
        photo="hero-team.jpg",
    )
    register(
        "cards",
        kicker="اليوم 3  ·  الجلسة 3",
        title="المساعد المخصص",
        cards=[
            ("Custom GPT / Bot", "درّب المساعد على ملفات الشركة ومجال العمل."),
            ("حدود المعرفة", "حدّد ما يُسمح بالإجابة عنه وما يُحال للإنسان."),
            ("مستقبل العمل", "المساعد يسرّع المهام الروتينية ويُبقي القرار للفريق."),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 3  ·  الجلسة 3",
        title="خطوات بناء Custom GPT",
        subtitle="من الهدف الى الاختبار",
        image="gpt-builder-steps.png",
    )
    register(
        "steps",
        kicker="اليوم 3  ·  الجلسة 3",
        title="تفاصيل بناء المساعد",
        subtitle="نفّذ بالترتيب",
        steps=[
            "حدد الهدف: لمن يخدم المساعد وما المهام المسموحة",
            "ارفع الملفات الداخلية المعتمدة فقط (سياسات / ادلة / اسعار عامة)",
            "اكتب تعليمات واضحة: النبرة، الشكل، ومتى يقول لا اعرف",
            "اختبر بـ 5 اسئلة حقيقية وعدّل التعليمات قبل النشر",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 3  ·  الجلسة 3",
        title="أخلاقيات وأمن البيانات",
        subtitle="قواعد لا تتجاوزها في العمل",
        image="ethics-security.png",
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  الجلسة 3",
        title="قواعد أمن البيانات عمليا",
        items=[
            "ملكية المحتوى المولد وسياسات الاستخدام المؤسسي",
            "عدم رفع بيانات سرية إلى أدوات غير معتمدة",
            "التحقق البشري قبل نشر أو إرسال مخرجات حساسة",
            "الشفافية مع العملاء عند استخدام الذكاء الاصطناعي",
        ],
    )
    register(
        "tools",
        kicker="اليوم 3  ·  الجلسة 3",
        title="أدوات بناء المساعد",
        tools=[
            ("GPT Builder", "مساعد مخصص داخل منظومة ChatGPT"),
            ("Poe", "تجربة بوتات متعددة ونشر سريع"),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 3  ·  مشروع التخرج",
        title="مشروع التخرج النهائي",
        subtitle="فرق مصغرة وحل متكامل",
        image="capstone-project.png",
    )
    register(
        "cards",
        kicker="اليوم 3  ·  مشروع التخرج",
        title="سيناريوهات جاهزة للاختيار",
        subtitle="اختر مشكلة عمل واحدة وابدأ بسرعة",
        cards=[
            ("مبيعات", "تلخيص استفسارات العملاء + مسودة رد + جدول متابعة."),
            ("موارد بشرية", "تلخيص سياسة داخلية + اسئلة شائعة عبر بوت مخصص."),
            ("تسويق", "صورة حملة + عرض 4 شرائح + فيديو 30 ثانية للمنتج."),
        ],
    )
    register(
        "steps",
        kicker="اليوم 3  ·  مشروع التخرج",
        title="متطلبات المشروع والعرض",
        steps=[
            "اختيار مشكلة عمل محددة للفريق",
            "دمج: بحث ذكي + تصميم (صورة/عرض/فيديو) + أتمتة أو بوت مخصص",
            "عرض سريع لكل فريق (دقائق معدودة)",
            "تقييم الحلول من حيث الفائدة، الجودة، وقابلية التطبيق",
        ],
    )
    register(
        "cards",
        kicker="اليوم 3  ·  مشروع التخرج",
        title="معايير تقييم العروض",
        subtitle="كيف نقيّم حلول الفرق",
        cards=[
            ("الفائدة (40%)", "هل يحل مشكلة عمل حقيقية ويوفر وقتا واضحا؟"),
            ("الجودة (30%)", "دقة المحتوى، وضوح المخرجات، واتساق الهوية."),
            ("قابلية التطبيق (30%)", "هل يمكن تشغيله غدا بحسابات وادوات متاحة؟"),
        ],
    )
    register(
        "cards",
        kicker="اليوم 3  ·  ختام الورشة",
        title="اكبر فائدة اليوم 3",
        subtitle="ثلاث نقاط قابلة للتنفيذ فورا",
        cards=[
            ("اسال البيانات", "ارفع جدولا واطلب ملخصا + شذوذا + توصيات."),
            ("اتمت بحذر", "مسار واحد بسيط مع موافقة بشرية على الرد."),
            ("بوت محدود", "مساعد بتعليمات واضحة وملفات معتمدة فقط."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 3  ·  ختام الورشة",
        title="خطة 7 ايام بعد الورشة",
        subtitle="ماذا تطبق عند الرجوع للعمل",
        items=[
            "اليوم 1-2: ثبّت قالب امر احترافي لمهامك المتكررة",
            "اليوم 3-4: انتج حزمة وسائط واحدة لحملة او منتج",
            "اليوم 5: حلل ملفا جدولا حقيقيا واكتب 3 توصيات",
            "اليوم 6: ابنِ مسارا اتوماتيا واحدا او Custom GPT بسيط",
            "اليوم 7: راجع النتائج مع زميلك وحدّث الـ Cheatsheet",
        ],
    )
    register(
        "cards",
        kicker="اليوم 3  ·  للتطبيق",
        title="3 اوامر جاهزة — انسخ الآن",
        subtitle="يوم 3: بيانات وأتتمتة ومساعد",
        cards=[
            ("تحليل جدول", "لخص الاعمدة، اكتشف الشذوذ، واقترح 3 توصيات تشغيلية من البيانات فقط."),
            ("مسار اتمتة", "صمم مسار: إيميل وارد → تلخيص → صف في جدول → مسودة رد للموافقة."),
            ("تعليمات بوت", "انت مساعد داخلي. اجب من الملفات فقط. ان لم تجد الجواب قل: لا اعرف."),
        ],
    )
    register(
        "linkedin_qr",
        kicker="اليوم 3  ·  ختام الورشة",
        title="تواصل معي على LinkedIn",
        subtitle="امسح الرمز",
    )
    register(
        "tools",
        kicker="الورشة  ·  ابدأ هنا",
        title="افتح حساباتك على الأدوات",
        subtitle="سجّل الدخول قبل التمارين",
        tools=[
            ("ChatGPT / Claude / Gemini", "الصياغة والتحليل والملفات"),
            ("Perplexity · Midjourney · Gamma", "بحث وصور وعروض"),
            ("HeyGen · Zapier / Make · GPT Builder", "فيديو وأتتمتة ومساعد مخصص"),
        ],
    )
    register("closing")


# ─── Painters ───────────────────────────────────────────────────────────────

def paint_cover(prs, page: int, total: int):
    s = new_slide(prs)
    paint_light(s)
    right_rail(s)
    logo(s, height=Inches(0.42))
    # Text on the right, hero photo on the left
    add_rtl_text(
        s, Inches(5.6), Inches(1.9), Inches(7.0), Inches(0.4),
        "ورشة عملية  ·  ثلاثة أيام", size=16, bold=True, color=SECONDARY, align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        s, Inches(5.6), Inches(2.4), Inches(7.0), Inches(1.3),
        "الذكاء الاصطناعي التوليدي\nللأعمال والمحتوى والأتمتة",
        size=32, bold=True, color=PRIMARY, align=PP_ALIGN.RIGHT,
    )
    bar = rect(s, Inches(11.0), Inches(4.0), Inches(1.5), Inches(0.07), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_rtl_text(
        s, Inches(5.6), Inches(4.25), Inches(7.0), Inches(0.6),
        "هندسة الأوامر · الوسائط · البيانات · المساعد الشخصي",
        size=14, color=MUTED, align=PP_ALIGN.RIGHT,
    )
    soft_card(s, MARGIN, Inches(1.7), Inches(4.7), Inches(4.5), fill=SOFT)
    if not embed_photo(s, "hero-cover.jpg", MARGIN + Inches(0.18), Inches(1.88), Inches(4.35), Inches(4.15)):
        embed_diagram(s, "cover-hero.png", MARGIN + Inches(0.18), Inches(1.88), Inches(4.35), Inches(4.15))
    content_footer_ar(s, page, total)


def paint_agenda(prs, page: int, total: int):
    s = new_slide(prs)
    chrome(s, "الورشة  ·  الأجندة", page, total)
    rtl_title(s, "توزيع الأيام الثلاثة", "من المفاهيم إلى التطبيق العملي")
    embed_diagram(s, "three-days-map.png", MARGIN, Inches(2.15), Inches(12.1), Inches(4.5))


def paint_day_divider(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    paint_light(s)
    right_rail(s)
    logo(s, height=Inches(0.4))
    photo = spec.get("photo")
    text_left = Inches(5.5) if photo else MARGIN
    text_w = Inches(7.1) if photo else Inches(12.0)
    add_rtl_text(
        s, text_left, Inches(1.35), text_w, Inches(0.4),
        spec["day"], size=18, bold=True, color=SECONDARY, align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        s, text_left, Inches(1.85), text_w, Inches(1.0),
        spec["title"], size=26 if len(spec["title"]) > 40 else 28, bold=True, color=PRIMARY,
        align=PP_ALIGN.RIGHT,
    )
    if photo:
        soft_card(s, MARGIN, Inches(1.35), Inches(4.6), Inches(2.35), fill=SOFT)
        embed_photo(s, photo, MARGIN + Inches(0.15), Inches(1.5), Inches(4.3), Inches(2.05))
    sessions = spec["sessions"]
    xs, widths = rtl_column_xs(len(sessions), gap=0.2)
    for i, (session, x, w) in enumerate(zip(sessions, xs, widths)):
        label, name = session[0], session[1]
        rtl_card(
            s, x, Inches(4.0), Inches(w), Inches(2.35),
            label, name, fill=SOFT if i % 2 == 0 else SOFT_2,
        )
    content_footer_ar(s, page, total)


def paint_session_open(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    photo = spec.get("photo")
    if photo:
        # Photo left · title + goal card right (RTL reading order)
        card_left = Inches(5.85)
        card_w = Inches(6.8)
        pad = Inches(0.35)
        rtl_title(s, spec["title"], left=card_left, width=card_w)
        soft_card(s, card_left, Inches(2.35), card_w, Inches(3.9), fill=SOFT)
        add_rtl_text(
            s,
            card_left + pad,
            Inches(2.6),
            card_w - pad * 2,
            Inches(0.4),
            "هدف الجلسة",
            size=15,
            bold=True,
            color=PRIMARY,
            align=PP_ALIGN.RIGHT,
        )
        add_rtl_text(
            s,
            card_left + pad,
            Inches(3.15),
            card_w - pad * 2,
            Inches(2.6),
            spec["goal"],
            size=18,
            color=INK,
            align=PP_ALIGN.RIGHT,
        )
        soft_card(s, MARGIN, Inches(2.35), Inches(4.9), Inches(3.9), fill=SOFT_2)
        embed_photo(s, photo, MARGIN + Inches(0.18), Inches(2.55), Inches(4.55), Inches(3.5))
    else:
        rtl_title(s, spec["title"])
        soft_card(s, MARGIN, Inches(2.5), Inches(12.1), Inches(3.5), fill=SOFT)
        add_rtl_text(
            s,
            MARGIN + Inches(0.4),
            Inches(2.8),
            Inches(11.3),
            Inches(0.4),
            "هدف الجلسة",
            size=15,
            bold=True,
            color=PRIMARY,
            align=PP_ALIGN.RIGHT,
        )
        add_rtl_text(
            s,
            MARGIN + Inches(0.4),
            Inches(3.4),
            Inches(11.3),
            Inches(2.0),
            spec["goal"],
            size=20,
            color=INK,
            align=PP_ALIGN.RIGHT,
        )


def paint_bullets(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    top = rtl_title(s, spec["title"], spec.get("subtitle"))
    image = spec.get("image")
    items = spec["items"]
    plain = bool(spec.get("plain"))
    if image:
        n = len(items)
        pitch = 0.58 if n <= 5 else 0.5
        rtl_bullets(
            s,
            items,
            top=top + Inches(0.1),
            size=14,
            pitch=pitch,
            left=Inches(6.55),
            width=Inches(6.15),
            plain=plain,
        )
        embed_diagram(s, image, MARGIN, top + Inches(0.05), Inches(5.7), Inches(4.4))
    else:
        n = len(items)
        pitch = 0.68 if n <= 5 else 0.58
        size = 15 if n <= 5 else 14
        rtl_bullets(s, items, top=top + Inches(0.12), size=size, pitch=pitch, plain=plain)


def paint_cards(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    cards = spec["cards"]
    n = len(cards)
    gap = 0.3 if n == 2 else 0.25
    xs, widths = rtl_column_xs(n, gap=gap)
    for i, ((title, body), w, x) in enumerate(zip(cards, widths, xs)):
        rtl_card(
            s, x, Inches(2.35), Inches(w), Inches(4.0),
            title, body, fill=SOFT if i % 2 == 0 else SOFT_2,
        )


def paint_tools(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    tools = spec["tools"]
    n = len(tools)
    gap = 0.25
    xs, widths = rtl_column_xs(n, gap=gap)
    for i, ((name, desc), x, card_w) in enumerate(zip(tools, xs, widths)):
        soft_card(s, x, Inches(2.4), Inches(card_w), Inches(3.8), fill=SOFT if i % 2 == 0 else SOFT_2)
        rect(s, x, Inches(2.4), Inches(card_w), Inches(0.08), PRIMARY if i % 2 == 0 else SECONDARY)
        icon = resolve_tool_icon(name)
        icon_y = Inches(2.7)
        if icon:
            icon_x = x + Inches(card_w / 2 - 0.28)
            embed_icon(s, icon, icon_x, icon_y, size=Inches(0.55))
            title_top = Inches(3.4)
        else:
            title_top = Inches(2.85)
        add_rtl_text(
            s, x + Inches(0.25), title_top, Inches(card_w - 0.5), Inches(0.7),
            name, size=18 if n > 2 else 20, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER,
        )
        add_rtl_text(
            s, x + Inches(0.25), Inches(4.2), Inches(card_w - 0.5), Inches(1.6),
            desc, size=14, color=INK, align=PP_ALIGN.CENTER,
        )


def paint_diagram(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    embed_diagram(s, spec["image"], MARGIN, Inches(2.05), Inches(12.1), Inches(4.65))


def paint_steps(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    steps = spec["steps"]
    card_w = Inches(12.1)
    badge = Inches(0.52)
    pad = Inches(0.22)
    gap = Inches(0.18)
    for i, text in enumerate(steps):
        y = Inches(2.25) + Inches(i * 1.05)
        soft_card(s, MARGIN, y, card_w, Inches(0.9), fill=SOFT if i % 2 == 0 else SOFT_2)
        badge_x = MARGIN + card_w - pad - badge
        soft_card(s, badge_x, y + Inches(0.19), badge, badge, fill=PRIMARY)
        add_rtl_text(
            s,
            badge_x,
            y + Inches(0.22),
            badge,
            Inches(0.48),
            str(i + 1),
            size=16,
            bold=True,
            color=WHITE,
            align=PP_ALIGN.CENTER,
            anchor=MSO_ANCHOR.MIDDLE,
        )
        text_left = MARGIN + pad
        text_w = badge_x - text_left - gap
        add_rtl_text(
            s,
            text_left,
            y + Inches(0.18),
            text_w,
            Inches(0.58),
            text,
            size=16,
            color=INK,
            align=PP_ALIGN.RIGHT,
            anchor=MSO_ANCHOR.MIDDLE,
        )


def paint_linkedin_qr(prs, spec: dict, page: int, total: int):
    """End-of-day LinkedIn QR — scan to connect."""
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))

    # QR card on the right (RTL primary), copy on the left
    soft_card(s, Inches(7.55), Inches(2.25), Inches(5.15), Inches(4.35), fill=SOFT)
    qr_box = Inches(3.35)
    qr_left = Inches(8.45)
    qr_top = Inches(2.55)
    if LINKEDIN_QR.is_file():
        s.shapes.add_picture(str(LINKEDIN_QR), qr_left, qr_top, width=qr_box, height=qr_box)
    else:
        add_rtl_text(
            s, qr_left, Inches(3.6), qr_box, Inches(0.8),
            "QR", size=28, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER,
        )

    soft_card(s, MARGIN, Inches(2.25), Inches(6.5), Inches(4.35), fill=SOFT_2)
    add_rtl_text(
        s, Inches(0.9), Inches(3.0), Inches(5.8), Inches(0.55),
        "امسح الرمز الآن",
        size=22, bold=True, color=PRIMARY, align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        s, Inches(0.9), Inches(4.0), Inches(5.8), Inches(0.4),
        "linkedin.com/in/ahmed014x",
        size=15, bold=True, color=SECONDARY, align=PP_ALIGN.RIGHT,
    )
    add_rtl_text(
        s, Inches(0.9), Inches(4.6), Inches(5.8), Inches(0.6),
        LINKEDIN_URL,
        size=12, color=MUTED, align=PP_ALIGN.RIGHT,
    )


def paint_closing(prs, page: int, total: int):
    s = new_slide(prs)
    paint_light(s)
    right_rail(s)
    logo(s, height=Inches(0.42))
    add_rtl_text(
        s, MARGIN, Inches(2.4), Inches(12), Inches(0.9),
        "شكرا لكم", size=40, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER,
    )
    add_rtl_text(
        s, MARGIN, Inches(3.4), Inches(12), Inches(0.5),
        "ابدأوا بالتمرين الصغير… ثم ابنوا حلكم المتكامل",
        size=18, color=MUTED, align=PP_ALIGN.CENTER,
    )
    add_rtl_text(
        s, MARGIN, Inches(4.2), Inches(12), Inches(0.4),
        "ETRA  ·  ورشة أدوات الذكاء الاصطناعي",
        size=15, bold=True, color=SECONDARY, align=PP_ALIGN.CENTER,
    )
    soft_card(s, Inches(4.4), Inches(5.0), Inches(4.5), Inches(1.5), fill=SOFT)
    embed_photo(s, "hero-team.jpg", Inches(4.55), Inches(5.1), Inches(4.2), Inches(1.3))
    content_footer_ar(s, page, total)


PAINTERS = {
    "cover": lambda prs, spec, page, total: paint_cover(prs, page, total),
    "agenda_diagram": lambda prs, spec, page, total: paint_agenda(prs, page, total),
    "day_divider": paint_day_divider,
    "session_open": paint_session_open,
    "bullets": paint_bullets,
    "cards": paint_cards,
    "tools": paint_tools,
    "diagram": paint_diagram,
    "steps": paint_steps,
    "linkedin_qr": paint_linkedin_qr,
    "closing": lambda prs, spec, page, total: paint_closing(prs, page, total),
}


def main() -> None:
    # Ensure diagrams exist
    if not (DIAGRAMS / "three-days-map.png").is_file():
        import generate_ai_tools_workshop_diagrams as gen  # type: ignore

        # fallback: run by path
        from importlib.util import module_from_spec, spec_from_file_location

        gen_path = Path(__file__).resolve().parent / "generate-ai-tools-workshop-diagrams.py"
        spec = spec_from_file_location("workshop_diagrams", gen_path)
        assert spec and spec.loader
        mod = module_from_spec(spec)
        spec.loader.exec_module(mod)
        mod.main()

    build_registry()
    total = len(_SLIDES)
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    for i, spec in enumerate(_SLIDES, start=1):
        kind = spec["kind"]
        painter = PAINTERS[kind]
        painter(prs, spec, i, total)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")


if __name__ == "__main__":
    main()
