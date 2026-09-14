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
    add_text,
    content_footer,
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
AR_FONT = "IBM Plex Sans Arabic"
AR_LANG = "ar-SA"

_SLIDES: list[dict] = []

_TASHKEEL = dict.fromkeys(
    map(ord, "ًٌٍَُِّْٰٕٖٜٟۣٓٔٗ٘ٙٚٛٝٞۖۗۘۙۚۛۜ۟۠ۡۢۤۥۦۧۨ۩۪ۭ۫۬"),
    None,
)


def strip_tashkeel(value: str) -> str:
    if not value:
        return value
    return value.translate(_TASHKEEL)


def set_paragraph_rtl(paragraph) -> None:
    pPr = paragraph._p.get_or_add_pPr()
    pPr.set("rtl", "1")
    pPr.set("algn", "r")


def _set_run_ar(run, size, *, bold=False, color=INK, font=None):
    face = font or AR_FONT
    set_run(run, size, bold=bold, color=color, font=face)
    rPr = run._r.get_or_add_rPr()
    rPr.set("rtl", "1")
    rPr.set("lang", AR_LANG)
    rPr.set("altLang", "en-US")
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
    for i, chunk in enumerate(chunks):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        set_paragraph_rtl(p)
        p.space_after = Pt(6 if size >= 18 else 4)
        run = p.add_run()
        run.text = chunk
        _set_run_ar(run, size, bold=bold, color=color, font=font)
    return box


def rtl_bullets(slide, items: list[str], *, top=Inches(2.2), size=15, pitch=0.72, left=None, width=None):
    left = MARGIN if left is None else left
    width = Inches(12.1) if width is None else width
    row_h = Inches(0.62)
    for i, item in enumerate(items):
        y = top + Inches(i * pitch)
        soft_card(slide, left, y, width, row_h, fill=SOFT if i % 2 == 0 else SOFT_2)
        soft_card(
            slide,
            left + width - Inches(0.48),
            y + Inches(0.12),
            Inches(0.36),
            Inches(0.36),
            fill=PRIMARY,
        )
        add_text(
            slide,
            left + width - Inches(0.48),
            y + Inches(0.14),
            Inches(0.36),
            Inches(0.34),
            str(i + 1) if len(items) <= 7 else "•",
            size=12,
            bold=True,
            color=WHITE,
            align=PP_ALIGN.CENTER,
        )
        add_rtl_text(
            slide,
            left + Inches(0.22),
            y + Inches(0.1),
            width - Inches(0.82),
            Inches(0.45),
            item,
            size=size,
            color=INK,
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
    )


def embed_diagram(slide, name: str, left, top, width, max_height):
    path = DIAGRAMS / name
    if not path.is_file():
        return None
    from PIL import Image

    with Image.open(path) as im:
        px_w, px_h = im.size
    if px_w <= 0 or px_h <= 0:
        return None
    aspect = px_w / px_h
    max_w = width.inches if hasattr(width, "inches") else float(width)
    max_h = max_height.inches if hasattr(max_height, "inches") else float(max_height)
    left_in = left.inches if hasattr(left, "inches") else float(left)
    top_in = top.inches if hasattr(top, "inches") else float(top)
    fit_w = min(max_w, max_h * aspect)
    fit_h = fit_w / aspect
    if fit_h > max_h:
        fit_h = max_h
        fit_w = fit_h * aspect
    x = left_in + (max_w - fit_w) / 2
    return slide.shapes.add_picture(
        str(path), Inches(x), Inches(top_in), width=Inches(fit_w), height=Inches(fit_h)
    )


def new_slide(prs) -> object:
    return prs.slides.add_slide(prs.slide_layouts[6])


def ar_header(slide, kicker: str) -> None:
    logo(slide)
    add_rtl_text(
        slide,
        MARGIN,
        Inches(0.42),
        Inches(10.7),
        Inches(0.34),
        kicker,
        size=13,
        bold=True,
        color=MUTED,
    )
    rect(slide, MARGIN, Inches(0.9), Inches(12.1), Inches(0.012), LINE)


def chrome(slide, kicker: str, page: int, total: int):
    paint_light(slide)
    right_rail(slide)
    ar_header(slide, kicker)
    content_footer(slide, page, total)


def rtl_title(slide, title: str, subtitle: str | None = None, *, top=Inches(1.12)):
    add_rtl_text(
        slide,
        MARGIN,
        top,
        Inches(12.0),
        Inches(0.7),
        title,
        size=28 if len(title) > 42 else 32,
        bold=True,
        color=PRIMARY,
    )
    if subtitle:
        add_rtl_text(
            slide,
            MARGIN,
            top + Inches(0.62),
            Inches(12.0),
            Inches(0.4),
            subtitle,
            size=14,
            color=MUTED,
        )
        return top + Inches(1.05)
    return top + Inches(0.78)


# ─── Slide constructors (append meta then paint later with totals) ───────────

def register(kind: str, **kwargs):
    _SLIDES.append({"kind": kind, **kwargs})


def build_registry() -> None:
    _SLIDES.clear()

    # Cover + agenda
    register("cover")
    register("agenda_diagram")
    register(
        "bullets",
        kicker="الورشة  ·  نظرة عامة",
        title="أهداف الورشة",
        subtitle="ماذا ستتعلم في ثلاثة أيام؟",
        items=[
            "صياغة أوامر احترافية تقلل الهلوسة وترفع جودة المخرجات",
            "إنتاج محتوى عمل يومي: تقارير، مراسلات، ومنشورات",
            "توظيف أدوات الصور والعروض والفيديو دون خبرة تصميمية مسبقة",
            "تحليل بيانات جداول بلغة بشرية وبناء مسارات أتمتة بسيطة",
            "بناء مساعد شخصي مخصص وفهم أخلاقيات وأمن البيانات",
        ],
    )

    # ═══════════ DAY 1 ═══════════
    register(
        "day_divider",
        day="اليوم الأول",
        title="هندسة الأوامر وصناعة المحتوى والبحث الذكي",
        sessions=[
            ("الجلسة 1", "مدخل GenAI وهندسة الأوامر", "ساعة ونصف"),
            ("الجلسة 2", "المحتوى الاحترافي والعمل اليومي", "ساعة"),
            ("الجلسة 3", "البحث الموثّق والملفات الضخمة", "ساعة ونصف"),
        ],
    )

    # Session 1
    register(
        "session_open",
        kicker="اليوم 1  ·  الجلسة 1",
        title="مدخل إلى الذكاء الاصطناعي التوليدي وهندسة الأوامر",
        duration="ساعة ونصف",
        goal="فهم كيف تعمل النماذج اللغوية وصياغة أوامر دقيقة قابلة للتكرار",
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الجلسة 1",
        title="المفاهيم التأسيسية",
        subtitle="الفرق بين الذكاء التقليدي والتوليدي",
        cards=[
            ("الذكاء التقليدي", "قواعد وتصنيف وتنبؤ على بيانات محددة — مخرجات محدودة النطاق."),
            ("الذكاء التوليدي", "نماذج لغوية تولّد نصًا وصورًا وشفرة جديدة من سياق الأمر."),
            ("كيف «تفكر» LLMs؟", "تتنبأ بالكلمة التالية اعتمادًا على الاحتمال والسياق — وليست قاعدة معرفة مضمونة."),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الجلسة 1",
        title="قواعد هندسة الأوامر",
        subtitle="السياق · الدور · الجمهور · الشكل",
        image="prompt-structure.png",
    )
    # visual already covered; keep structure
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 1",
        title="عناصر الأمر الاحترافي",
        subtitle="صياغة تقلّل الغموض وترفع جودة الإجابة",
        items=[
            "السياق: ماذا حدث؟ ما الملف؟ ما القيود؟",
            "الدور (Persona): من هو النموذج؟ خبير قانوني، محرر، محلل…",
            "الجمهور المستهدف: مدير تنفيذي، عملاء، فريق داخلي",
            "شكل المخرجات (Format): جدول، نقاط، إيميل، JSON، تقرير",
            "قيود الجودة: الطول، اللهجة، المصادر، ما يجب تجنّبه",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الجلسة 1",
        title="تقنيات متقدمة",
        subtitle="من أمر بسيط إلى سير تفكير مضبوط",
        cards=[
            ("Chain-of-Thought", "اطلب التفكير خطوة بخطوة قبل الإجابة النهائية — مفيد للمهام المعقدة."),
            ("Few-Shot Prompting", "قدّم مثالين أو ثلاثة داخل الأمر ليقلّد النموذج النمط المطلوب."),
            ("تجنّب الهلوسة", "اطلب مصادر، قل «لا أعرف إن لم تكن متأكدًا»، وراجع الحقائق الحساسة."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 1  ·  الجلسة 1",
        title="الأدوات المستخدمة",
        subtitle="نماذج لغوية للحوار والصياغة",
        tools=[
            ("ChatGPT", "صياغة عامة وتحليل ومساعد يومي"),
            ("Claude", "تحليل ملفات طويلة وصياغة دقيقة"),
            ("Google Gemini", "بحث متكامل وتعدد الوسائط"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 1",
        title="قالب أمر جاهز (Cheat Sheet)",
        subtitle="انسخ وعدّل — هيكل احترافي كامل",
        items=[
            "السياق: [صف الموقف / الملف / القيود]",
            "الدور: أنت [خبير / محرر / محلل] بخبرة في [المجال]",
            "الجمهور: اكتب لـ [مدير تنفيذي / عملاء / فريق]",
            "الشكل: أخرج النتيجة كـ [نقاط / جدول / إيميل / تقرير]",
            "القيود: الطول [X]، اللهجة [رسمية]، قل لا اعرف إن لم تكن متاكدا",
            "المهمة: [اكتب المطلوب النهائي بجملة واضحة]",
        ],
        image="prompt-structure.png",
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الجلسة 1",
        title="مثال امر جاهز للنسخ",
        subtitle="انسخه وعدّل الحقول فقط",
        image="filled-prompt-example.png",
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الجلسة 1",
        title="مسار التمرين العملي",
        subtitle="افتح → الصق → راجع → سلّم",
        image="practice-flow.png",
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الجلسة 1",
        title="قبل وبعد: امر ضعيف مقابل قوي",
        subtitle="فرق الجودة يبدأ من صياغة الطلب",
        image="weak-vs-strong.png",
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الجلسة 1",
        title="Few-Shot و Chain-of-Thought",
        subtitle="امثلة داخل الأمر + تفكير خطوة بخطوة",
        cards=[
            ("Few-Shot", "اعط مثالين او ثلاثة للنبرة والشكل المطلوبين داخل الأمر."),
            ("Chain-of-Thought", "اطلب التفكير خطوة بخطوة قبل الإجابة النهائية للمهام المعقدة."),
            ("قيد الدقة", "قل: لا تخترع ارقاما، وقل لا اعرف إن لم تكن متأكدا."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 1",
        title="اخطاء شائعة في هندسة الاوامر",
        items=[
            "طلب غامض بلا سياق ولا هدف واضح",
            "عدم تحديد الجمهور او مستوى الرسمية",
            "عدم تحديد شكل المخرجات (جدول / إيميل / نقاط)",
            "قبول الإجابة بلا تحقق من الارقام والمصادر",
            "اوامر طويلة بلا اولوية: ضع المهمة الاهم اولا",
        ],
    )

    # Session 2
    register(
        "session_open",
        kicker="اليوم 1  ·  الجلسة 2",
        title="إنتاج المحتوى الاحترافي وتطبيقات العمل اليومي",
        duration="ساعة",
        goal="تحويل الأفكار الخام إلى مراسلات وتقارير ومحتوى تسويقي جاهز",
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 2",
        title="المراسلات والتقارير الإدارية",
        subtitle="لهجات ومستويات رسمية متعددة",
        items=[
            "صياغة إيميلات رسمية بلهجة مؤسسية أو ودّية حسب الجمهور",
            "كتابة تقارير إدارية مختصرة مع ملخص تنفيذي في الأعلى",
            "إعادة صياغة مسودة ضعيفة إلى نص احترافي مع الحفاظ على المعنى",
            "توحيد نبرة العلامة التجارية عبر قوالب أوامر ثابتة",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الجلسة 2",
        title="من فكرة إلى محتوى منشور",
        subtitle="استراتيجيات وجدولة وتحويل سريع",
        cards=[
            ("استراتيجية محتوى", "أعمدة محتوى، أهداف، وجمهور لكل منصة."),
            ("جدولة المنصات", "تحويل الفكرة إلى سلسلة منشورات أسبوعية."),
            ("مسودات سريعة", "مقالات، ملخصات تنفيذية، ونصوص إعلانية مقنعة."),
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  الجلسة 2",
        title="قوالب عمل يومي جاهزة",
        subtitle="انسخ القالب واملأ الحقول فقط",
        cards=[
            ("إيميل رسمي", "الموضوع + التحية + الغرض في سطر + 3 نقاط + طلب إجراء + خاتمة."),
            ("تقرير إداري", "ملخص تنفيذي + ما حدث + الارقام + المخاطر + التوصية."),
            ("منشور LinkedIn / X", "خطاف + قيمة واحدة + دليل قصير + دعوة للتفاعل."),
        ],
    )

    # Session 3
    register(
        "session_open",
        kicker="اليوم 1  ·  الجلسة 3",
        title="البحث الموثّق والتعامل مع الملفات الضخمة",
        duration="ساعة ونصف",
        goal="البحث بمصادر حية وتلخيص PDF المعقّدة ثم تحويلها لمخرجات عمل",
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 3",
        title="بحث موثّق وتحليل ملفات",
        items=[
            "البحث المعزّز بالمصادر الحية ومقارنة الادعاءات بدقة",
            "قراءة وتلخيص ملفات PDF واستخراج البيانات من تقارير معقّدة",
            "طلب جداول مقارنة واستشهادات بدل فقرات عامة",
            "التحقق اليدوي من الأرقام والأسماء والتواريخ الحساسة",
        ],
    )
    register(
        "tools",
        kicker="اليوم 1  ·  الجلسة 3",
        title="أدوات البحث والملفات",
        tools=[
            ("Perplexity AI", "بحث حي مع مصادر قابلة للمراجعة"),
            ("ChatPDF / Claude", "رفع ملفات وتحليل تقارير طويلة"),
            ("نماذج الدردشة", "تحويل الملخص إلى إيميل ومنشورات"),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  الجلسة 3",
        title="قائمة تحقق جودة البحث",
        subtitle="قبل ارسال اي ملخص او تقرير",
        image="research-checklist.png",
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  الجلسة 3",
        title="اسئلة التحقق السريعة",
        subtitle="طبقها على كل ملخص",
        items=[
            "هل توجد مصادر قابلة للفتح والمراجعة؟",
            "هل قارنت بين مصدرين على الاقل للادعاءات المهمة؟",
            "هل راجعت الارقام والاسماء والتواريخ يدويا؟",
            "هل فصلت بين الحقائق وبين توصيات النموذج؟",
            "هل حددت ما هو غير مؤكد بدل اختراعه؟",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 1  ·  تطبيق عملي",
        title="تمرين: المساعد الإداري الذكي",
        subtitle="من PDF إلى إيميل وتغريدات",
        image="admin-assistant-flow.png",
    )
    register(
        "steps",
        kicker="اليوم 1  ·  تطبيق عملي",
        title="خطوات التمرين",
        subtitle="افتح ملف التقرير PDF أمامك",
        steps=[
            "لخّص التقرير في 5 نقاط رئيسية واضحة للإدارة",
            "حوّل الملخص إلى إيميل رسمي موجّه للمدير التنفيذي",
            "صغّ 3 تغريدات تسويقية مستخرجة من نفس الملف",
            "راجع الدقة والأرقام قبل التسليم",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  ختام اليوم",
        title="اكبر فائدة اليوم 1",
        subtitle="ثلاث نقاط قابلة للتنفيذ فورا",
        cards=[
            ("قالب ثابت", "احفظ هيكل السياق + الدور + الجمهور + الشكل كامر افتراضي."),
            ("تحقق دائما", "لا ترسل ارقاما او اسماء دون مراجعة بشرية سريعة."),
            ("تمرين منزلي اختياري", "صغ امرا واحدا قويا لمهمة حقيقية من عملك."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 1  ·  ختام اليوم",
        title="مخرجات نهاية اليوم 1",
        subtitle="مخرجاتك في نهاية اليوم",
        items=[
            "ملف Cheat Sheet شخصي لامر احترافي",
            "ملخص PDF + إيميل رسمي + 3 تغريدات من التمرين",
            "قائمة اخطاء شائعة لتجنبها غدا في المحتوى والوسائط",
            "امر واحد جاهز لمهمة عمل حقيقية",
        ],
    )
    register(
        "cards",
        kicker="اليوم 1  ·  للتطبيق",
        title="3 اوامر جاهزة — انسخ الآن",
        subtitle="يوم 1: صياغة وتلخيص ومحتوى",
        cards=[
            ("تلخيص تقرير", "انت محلل اداري. لخص الملف في 5 نقاط + توصية. لا تخترع ارقاما."),
            ("إيميل رسمي", "حوّل النقاط التالية إلى إيميل رسمي للمدير التنفيذي بلهجة مهنية قصيرة."),
            ("منشور سريع", "اكتب 3 منشورات قصيرة من نفس الملخص لجمهور مهني على LinkedIn."),
        ],
    )

    # ═══════════ DAY 2 ═══════════
    register(
        "day_divider",
        day="اليوم الثاني",
        title="الوسائط المتعددة: الصور والعروض والفيديو",
        sessions=[
            ("الجلسة 1", "توليد الصور والرسومات", "ساعة ونصف"),
            ("الجلسة 2", "تصميم العروض التقديمية", "ساعة"),
            ("الجلسة 3", "الفيديو والأصوات بالذكاء الاصطناعي", "ساعة ونصف"),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  نظرة عامة",
        title="مسار إنتاج الوسائط",
        subtitle="صورة → عرض → فيديو في سلسلة واحدة",
        image="media-stack.png",
    )

    # Day 2 Session 1
    register(
        "session_open",
        kicker="اليوم 2  ·  الجلسة 1",
        title="توليد الصور والرسومات الاحترافية",
        duration="ساعة ونصف",
        goal="صياغة أوامر صور قوية وتعديل العناصر للاستخدام التسويقي",
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الجلسة 1",
        title="أساسيات أوامر الصور",
        items=[
            "الإضاءة: طبيعية، استوديو، ذهبية، ناعمة…",
            "زوايا الكاميرا: علوية، عين المستوى، قريبة للمنتج",
            "الأنماط الفنية (Styling): واقعي، مسطح، ثلاثي الأبعاد، هوية بصرية",
            "دقة الإخراج والنِسب: مربع للمنصات، عريض للعروض، عمودي للقصص",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الجلسة 1",
        title="تقنيات التعديل والتوظيف",
        cards=[
            ("Inpainting", "استبدال عنصر محدد داخل الصورة دون إعادة توليدها كاملة."),
            ("Outpainting", "توسيع إطار الصورة لملاءمة بانر أو خلفية أوسع."),
            ("توظيف عملي", "هويات بصرية، إعلانات، وتصاميم مواقع بلا خبرة تصميم سابقة."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الجلسة 1",
        title="أدوات توليد الصور",
        tools=[
            ("Midjourney", "جودة فنية عالية للأفكار البصرية"),
            ("DALL·E 3", "تكامل سهل مع ChatGPT"),
            ("Leonardo.ai", "تحكم بالأنماط والتكرار السريع"),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الجلسة 1",
        title="هيكل امر صورة احترافي",
        subtitle="موضوع + اسلوب + اضاءة + زاوية + نسبة",
        image="image-prompt-anatomy.png",
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الجلسة 1",
        title="تفاصيل امر الصورة",
        subtitle="انسخ العناصر وعدّل حسب المنتج",
        items=[
            "الموضوع: ماذا يظهر؟ منتج، شخص، مشهد، خلفية",
            "الاسلوب: واقعي / مسطح / ثلاثي ابعاد / هوية العلامة",
            "الاضاءة والزاوية: استوديو ناعمة، عين المستوى، قريبة للمنتج",
            "النسبة: 1:1 للمنصات، 16:9 للعروض، 9:16 للقصص",
            "ما يتجنب: نصوص مشوهة، شعارات محمية، وجوه عشوائية ان لم تطلب",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الجلسة 1",
        title="متى تستخدم كل اداة صور؟",
        subtitle="اختر بسرعة حسب الهدف",
        cards=[
            ("Midjourney", "افكار بصرية فنية وحملات تحتاج لمسة جمالية قوية."),
            ("DALL·E 3", "تعديل سريع داخل ChatGPT ووصف طويل بالعربية/الانجليزية."),
            ("Leonardo.ai", "تكرار نمط ثابت للمنتجات والتجارب المتعددة بسرعة."),
        ],
    )

    # Day 2 Session 2
    register(
        "session_open",
        kicker="اليوم 2  ·  الجلسة 2",
        title="تصميم العروض التقديمية التفاعلية بالكامل",
        duration="ساعة",
        goal="تحويل فكرة أو مستند إلى شرائح متكاملة في دقائق",
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الجلسة 2",
        title="من نص إلى عرض جاهز",
        items=[
            "تحويل فكرة مجردة أو مستند نصي إلى شرائح (محتوى + تصميم) في أقل من 3 دقائق",
            "تخصيص القوالب وإعادة صياغة البطاقات الذكية",
            "تضمين الرسوم البيانية والحفاظ على هوية بصرية موحّدة",
            "تصدير للعرض الحي أو للمشاركة كرابط",
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الجلسة 2",
        title="أدوات العروض الذكية",
        tools=[
            ("Gamma App", "عروض سريعة من أمر أو مستند"),
            ("Beautiful.ai", "قوالب ذكية وإعادة ترتيب تلقائي"),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الجلسة 2",
        title="قائمة تحقق عرض Gamma",
        subtitle="قبل مشاركة الرابط او التصدير",
        items=[
            "عنوان كل شريحة واضح في 6 كلمات او اقل",
            "شريحة واحدة = فكرة واحدة فقط",
            "اقل نص ممكن: نقاط قصيرة لا فقرات",
            "تباين بصري جيد بين النص والخلفية",
            "ازالة الشرائح المكررة او الزائدة بعد التوليد",
        ],
    )

    # Day 2 Session 3
    register(
        "session_open",
        kicker="اليوم 2  ·  الجلسة 3",
        title="إنتاج وتعديل الفيديو والأصوات بالذكاء الاصطناعي",
        duration="ساعة ونصف",
        goal="أفاتار ناطق، فيديوهات توضيحية، وصوت واقعي من النص",
    )
    register(
        "cards",
        kicker="اليوم 2  ·  الجلسة 3",
        title="قدرات الفيديو والصوت",
        cards=[
            ("أفاتار ناطق", "Digital Human بلغات ولهجات متعددة للشروحات والإعلانات."),
            ("نص → فيديو", "مقاطع توضيحية كاملة بالصوت والمؤثرات من سكربت مكتوب."),
            ("استنساخ الصوت", "Text-to-Speech واقعي ومحافظة على نبرة العلامة."),
        ],
    )
    register(
        "tools",
        kicker="اليوم 2  ·  الجلسة 3",
        title="أدوات الفيديو والصوت",
        tools=[
            ("HeyGen", "أفاتار ناطق وإعلانات قصيرة"),
            ("ElevenLabs", "صوت طبيعي وتحويل نص إلى كلام"),
            ("Runway / Pika", "توليد وتعديل مقاطع فيديو"),
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  الجلسة 3",
        title="سكربت فيديو 30 ثانية",
        subtitle="Hook ثم قيمة ثم CTA",
        image="video-script-flow.png",
    )
    register(
        "steps",
        kicker="اليوم 2  ·  الجلسة 3",
        title="تفاصيل السكربت للنسخ",
        subtitle="Hook ثم قيمة ثم CTA — جاهز للنسخ",
        steps=[
            "Hook (0-5 ث): سؤال او مشكلة تمس الجمهور فورا",
            "قيمة (5-20 ث): ميزتان واضحتان للمنتج او الحل",
            "اثبات قصير: رقم او نتيجة او وعد قابل للتصديق",
            "CTA (20-30 ث): اطلب اجراء واحد فقط (جرب / تواصل / زر الرابط)",
        ],
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  الجلسة 3",
        title="اخطاء شائعة في الوسائط",
        items=[
            "استخدام صور/اصوات دون مراعاة حقوق الاستخدام",
            "لهجة صوت لا تناسب الجمهور او العلامة",
            "فيديو اطول من اللازم يفقد الانتباه",
            "اسلوب بصري عشوائي بين الصورة والعرض والفيديو",
            "نصوص طويلة على الشاشة بدل جملة واحدة قوية",
        ],
    )
    register(
        "diagram",
        kicker="اليوم 2  ·  تطبيق عملي",
        title="تمرين: المصمم الشامل",
        subtitle="هوية إعلان متكاملة",
        image="designer-exercise.png",
    )
    register(
        "steps",
        kicker="اليوم 2  ·  تطبيق عملي",
        title="مخرجات التمرين المطلوبة",
        steps=[
            "توليد صورة منتج مناسبة للهوية الإعلانية",
            "إنشاء عرض تقديمي من 4 شرائح يشرح فكرة المنتج",
            "إنتاج فيديو قصير (30 ثانية) بمتحدث رقمي عن المميزات",
            "تجميع المخرجات في مجلد واحد للعرض السريع",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  ختام اليوم",
        title="اكبر فائدة اليوم 2",
        subtitle="ثلاث نقاط قابلة للتنفيذ فورا",
        cards=[
            ("امر صورة ثابت", "ثبّت اسلوبا واضاءة ونسبة لكل حملة."),
            ("سكربت قصير", "اكتب الفيديو قبل توليده: Hook → قيمة → CTA."),
            ("حزمة متسقة", "صورة + عرض + فيديو بنفس الالوان والنبرة."),
        ],
    )
    register(
        "bullets",
        kicker="اليوم 2  ·  ختام اليوم",
        title="مخرجات نهاية اليوم 2",
        subtitle="حزمة اعلان جاهزة للمشاركة",
        items=[
            "صورة منتج باسلوب وهوية محددة",
            "عرض من 4 شرائح يشرح الفكرة",
            "فيديو 30 ثانية بمتحدث رقمي او صوت طبيعي",
            "مجلد واحد يجمع الملفات الثلاثة للمراجعة",
        ],
    )
    register(
        "cards",
        kicker="اليوم 2  ·  للتطبيق",
        title="3 اوامر جاهزة — انسخ الآن",
        subtitle="يوم 2: صورة وعرض وفيديو",
        cards=[
            ("امر صورة", "منتج على خلفية بيضاء، اضاءة استوديو ناعمة، زاوية عين المستوى، نسبة 1:1."),
            ("امر عرض", "حوّل هذا النص إلى عرض 4 شرائح: مشكلة، حل، مميزات، دعوة لاجراء."),
            ("سكربت فيديو", "اكتب سكربت 30 ثانية: Hook ثم ميزتان ثم CTA واحد واضح."),
        ],
    )

    # ═══════════ DAY 3 ═══════════
    register(
        "day_divider",
        day="اليوم الثالث",
        title="تحليل البيانات والأتمتة وبناء مساعد شخصي",
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
    add_rtl_text(
        s, MARGIN, Inches(2.05), Inches(12), Inches(0.4),
        "ورشة عملية  ·  ثلاثة أيام", size=16, bold=True, color=SECONDARY,
    )
    add_rtl_text(
        s, MARGIN, Inches(2.55), Inches(12), Inches(1.1),
        "الذكاء الاصطناعي التوليدي\nللأعمال والمحتوى والأتمتة",
        size=36, bold=True, color=PRIMARY,
    )
    bar = rect(s, Inches(10.3), Inches(4.85), Inches(1.5), Inches(0.07), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_rtl_text(
        s, MARGIN, Inches(5.1), Inches(12), Inches(0.5),
        "هندسة الأوامر · الوسائط · البيانات · المساعد الشخصي",
        size=16, color=MUTED,
    )
    add_rtl_text(
        s, MARGIN, Inches(6.55), Inches(4), Inches(0.3),
        "ETRA", size=13, bold=True, color=PRIMARY,
    )


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
    add_rtl_text(
        s, MARGIN, Inches(1.6), Inches(12), Inches(0.4),
        spec["day"], size=18, bold=True, color=SECONDARY,
    )
    add_rtl_text(
        s, MARGIN, Inches(2.15), Inches(12), Inches(1.0),
        spec["title"], size=28 if len(spec["title"]) > 40 else 30, bold=True, color=PRIMARY,
    )
    bar = rect(s, Inches(10.5), Inches(3.25), Inches(1.3), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    for i, session in enumerate(spec["sessions"]):
        label, name = session[0], session[1]
        x = MARGIN + Inches(i * 4.05)
        rtl_card(
            s, x, Inches(3.7), Inches(3.85), Inches(2.2),
            label, name, fill=SOFT if i % 2 == 0 else SOFT_2,
        )
    content_footer(s, page, total)


def paint_session_open(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"])
    soft_card(s, MARGIN, Inches(2.5), Inches(12.1), Inches(3.5), fill=SOFT)
    add_rtl_text(
        s, MARGIN + Inches(0.4), Inches(2.8), Inches(11.3), Inches(0.4),
        "هدف الجلسة", size=15, bold=True, color=PRIMARY,
    )
    add_rtl_text(
        s, MARGIN + Inches(0.4), Inches(3.4), Inches(11.3), Inches(2.0),
        spec["goal"], size=20, color=INK,
    )


def paint_bullets(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    top = rtl_title(s, spec["title"], spec.get("subtitle"))
    image = spec.get("image")
    items = spec["items"]
    if image:
        # text on the right, diagram on the left (RTL visual balance)
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
        )
        embed_diagram(s, image, MARGIN, top + Inches(0.05), Inches(5.7), Inches(4.4))
    else:
        n = len(items)
        pitch = 0.72 if n <= 5 else 0.62
        size = 15 if n <= 5 else 14
        rtl_bullets(s, items, top=top + Inches(0.12), size=size, pitch=pitch)


def paint_cards(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    cards = spec["cards"]
    n = len(cards)
    if n == 1:
        widths = [12.1]
        xs = [MARGIN]
    elif n == 2:
        widths = [5.9, 5.9]
        xs = [MARGIN, Inches(7.0)]
    else:
        widths = [3.9, 3.9, 3.9]
        xs = [MARGIN, Inches(4.75), Inches(8.85)]
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
    if n == 1:
        card_w = 12.1
    else:
        card_w = (12.1 - gap * (n - 1)) / n
    for i, (name, desc) in enumerate(tools):
        x = MARGIN + Inches(i * (card_w + gap))
        soft_card(s, x, Inches(2.4), Inches(card_w), Inches(3.8), fill=SOFT if i % 2 == 0 else SOFT_2)
        rect(s, x, Inches(2.4), Inches(card_w), Inches(0.08), PRIMARY if i % 2 == 0 else SECONDARY)
        add_rtl_text(
            s, x + Inches(0.3), Inches(2.8), Inches(card_w - 0.6), Inches(0.7),
            name, size=20, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER,
        )
        add_rtl_text(
            s, x + Inches(0.3), Inches(3.7), Inches(card_w - 0.6), Inches(2.0),
            desc, size=15, color=INK, align=PP_ALIGN.CENTER,
        )


def paint_diagram(prs, spec: dict, page: int, total: int):
    s = new_slide(prs)
    chrome(s, spec["kicker"], page, total)
    rtl_title(s, spec["title"], spec.get("subtitle"))
    # More vertical room so diagram titles don't collide with slide chrome
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
        add_text(
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
            anchor=MSO_ANCHOR.MIDDLE,
        )


def paint_closing(prs, page: int, total: int):
    s = new_slide(prs)
    paint_light(s)
    right_rail(s)
    logo(s, height=Inches(0.42))
    add_rtl_text(
        s, MARGIN, Inches(2.6), Inches(12), Inches(0.9),
        "شكرا لكم", size=40, bold=True, color=PRIMARY, align=PP_ALIGN.CENTER,
    )
    add_rtl_text(
        s, MARGIN, Inches(3.6), Inches(12), Inches(0.5),
        "ابدأوا بالتمرين الصغير… ثم ابنوا حلكم المتكامل",
        size=18, color=MUTED, align=PP_ALIGN.CENTER,
    )
    add_rtl_text(
        s, MARGIN, Inches(4.4), Inches(12), Inches(0.4),
        "ETRA  ·  ورشة أدوات الذكاء الاصطناعي",
        size=15, bold=True, color=SECONDARY, align=PP_ALIGN.CENTER,
    )
    content_footer(s, page, total)


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
