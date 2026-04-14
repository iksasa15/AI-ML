export type UiLang = "ar" | "en";

export const UI_LANG_STORAGE_KEY = "ml-presentation-ui-lang";

export type UiStrings = {
  direction: "rtl" | "ltr";
  docLang: "ar" | "en";
  settings: string;
  settingsTitle: string;
  settingsDescription: string;
  uiLanguageLabel: string;
  uiLangArabic: string;
  uiLangEnglish: string;
  close: string;
  themeAriaLight: string;
  themeAriaDark: string;
  themeLabelLight: string;
  themeLabelDark: string;
  outline: string;
  curriculum: string;
  downloadPdf: string;
  translateSlides: string;
  translateTooltip: string;
  slideJumpTitle: string;
  promptSlideNumber: (total: number, _current: number) => string;
  invalidSlide: (total: number) => string;
  sectionProgress: string;
  previous: string;
  next: string;
  dotAria: (n: number) => string;
  templateTitle: string;
  translateHint: string;
  translateFab: string;
  translateFabTitle: string;
  outlinePage: {
    title: string;
    back: string;
    colSlide: string;
    colSection: string;
    colTopic: string;
    colGo: string;
    go: string;
  };
};

export function getUiStrings(lang: UiLang): UiStrings {
  if (lang === "en") {
    return {
      direction: "ltr",
      docLang: "en",
      settings: "Settings",
      settingsTitle: "Display settings",
      settingsDescription:
        "Interface language sets reading direction: English uses left‑to‑right; Arabic uses right‑to‑left. Slide content stays English.",
      uiLanguageLabel: "Interface language & direction",
      uiLangArabic: "Arabic (right‑to‑left)",
      uiLangEnglish: "English (left‑to‑right)",
      close: "Close",
      themeAriaLight: "Switch to dark mode",
      themeAriaDark: "Switch to light mode",
      themeLabelLight: "Theme: light",
      themeLabelDark: "Theme: dark",
      outline: "Outline",
      curriculum: "Curriculum template",
      downloadPdf: "Download PDF",
      translateSlides: "Translate slides",
      translateTooltip:
        "Translate slide content with Google (math formulas excluded when possible)",
      slideJumpTitle: "Go to slide number",
      promptSlideNumber: (total, _current) => `Enter slide number (1 – ${total})`,
      invalidSlide: (total) => `Invalid number. Choose between 1 and ${total}.`,
      sectionProgress: "Presentation progress",
      previous: "Previous",
      next: "Next",
      dotAria: (n) => `Go to slide ${n}`,
      templateTitle: "Training curriculum template (filled)",
      translateHint:
        "Choose a language — the whole page will be translated. KaTeX formulas are excluded when possible; after changing slides you may need to pick the language again.",
      translateFab: "Translate",
      translateFabTitle: "Translate content",
      outlinePage: {
        title: "Section outline",
        back: "Back to slides",
        colSlide: "Slide #",
        colSection: "Section",
        colTopic: "Topic",
        colGo: "Go",
        go: "Go",
      },
    };
  }

  return {
    direction: "rtl",
    docLang: "ar",
    settings: "الإعدادات",
    settingsTitle: "إعدادات العرض",
    settingsDescription:
      "لغة الواجهة تحدد اتجاه القراءة: الإنجليزية من اليسار إلى اليمين، والعربية من اليمين إلى اليسار. محتوى الشرائح يبقى بالإنجليزية.",
    uiLanguageLabel: "لغة واتجاه الواجهة",
    uiLangArabic: "العربية (من اليمين إلى اليسار)",
    uiLangEnglish: "الإنجليزية (من اليسار إلى اليمين)",
    close: "إغلاق",
    themeAriaLight: "تفعيل الوضع الليلي",
    themeAriaDark: "تفعيل الوضع النهاري",
    themeLabelLight: "الوضع: نهاري",
    themeLabelDark: "الوضع: ليلي",
    outline: "جدول الأقسام",
    curriculum: "نموذج المنهج",
    downloadPdf: "تحميل PDF",
    translateSlides: "ترجمة الشرائح",
    translateTooltip:
      "ترجمة محتوى الشرائح عبر Google (الصيغ الرياضية مُستثناة قدر الإمكان)",
    slideJumpTitle: "الانتقال إلى رقم شريحة",
    promptSlideNumber: (total, _current) => `اكتب رقم الشريحة (1 - ${total})`,
    invalidSlide: (total) => `رقم غير صحيح. اختر رقم بين 1 و ${total}.`,
    sectionProgress: "تقدّم العرض",
    previous: "السابق",
    next: "التالي",
    dotAria: (n) => `اذهب للشريحة ${n}`,
    templateTitle: "نموذج المنهج التدريبي (معبأ)",
    translateHint:
      "اختر اللغة — تُترجم الصفحة بالكامل. الصيغ داخل KaTeX تُستثنى قدر الإمكان؛ بعد تغيير الشريحة قد تحتاج لإعادة اختيار اللغة.",
    translateFab: "ترجمة",
    translateFabTitle: "ترجمة المحتوى",
    outlinePage: {
      title: "جدول الأقسام",
      back: "العودة للعرض",
      colSlide: "رقم الشريحة",
      colSection: "القسم",
      colTopic: "الموضوع",
      colGo: "انتقال",
      go: "انتقال",
    },
  };
}

export function readStoredUiLang(): UiLang {
  try {
    const v = localStorage.getItem(UI_LANG_STORAGE_KEY);
    if (v === "en" || v === "ar") return v;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function applyDocumentUiLang(lang: UiLang) {
  const s = getUiStrings(lang);
  document.documentElement.lang = s.docLang;
  document.documentElement.dir = s.direction;
}
