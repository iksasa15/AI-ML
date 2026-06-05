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
  day01SlidesShortcut: string;
  day01SlidesShortcutTitle: string;
  nav: {
    openSections: string;
    closeSections: string;
    sectionsTitle: string;
    slidesCount: (n: number) => string;
    sectionComplete: (pct: number) => string;
    deckProgress: string;
    resetProgress: string;
    resetProgressConfirm: string;
    traineeProgressTitle: string;
    speakerNotes: string;
    speakerNotesEmpty: string;
    quiz: string;
    quizEmpty: string;
    quizReflect: string;
    fullscreen: string;
    exitFullscreen: string;
    tools: string;
    shortcutsHint: string;
    bulletsRevealHint: (shown: number, total: number) => string;
  };
  codeRunner: {
    run: string;
    reset: string;
    output: string;
    outputPlaceholder: string;
    outputEmpty: string;
    pyodideWarning: string;
    dismissWarning: string;
    statusLoadingRuntime: string;
    statusLoadingPackages: string;
    statusRunning: string;
  };
  quizModal: {
    title: string;
    questionOf: (current: number, total: number) => string;
    correct: string;
    incorrect: string;
    nextQuestion: string;
    seeResults: string;
    scoreSummary: (score: number, total: number) => string;
    completedMsg: string;
    closeQuiz: string;
    quizProgress: (completed: number, total: number, avg: number) => string;
  };
  a11y: {
    skipToSlides: string;
  };
  ai: {
    title: string;
    toolbar: string;
    toolbarTitle: string;
    explainTab: string;
    qaTab: string;
    codeTab: string;
    explainHint: string;
    qaHint: string;
    codeHint: string;
    questionLabel: string;
    questionPlaceholder: string;
    run: string;
    loading: string;
    noApiKey: string;
    questionRequired: string;
    errorGeneric: string;
    apiKeySettings: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    apiKeyHint: string;
  };
  presenter: {
    title: string;
    syncHint: string;
    currentSlide: string;
    nextSlide: string;
    notesTitle: string;
    notesPlaceholder: string;
    notesAutoSave: string;
    timerPause: string;
    timerResume: string;
    timerReset: string;
    slideCounter: (current: number, total: number) => string;
    openPresenter: string;
    openPresenterTitle: string;
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
      day01SlidesShortcut: "Day 1 — NLP slides",
      day01SlidesShortcutTitle: "Jump to Section 14 — Day 1 Introduction to NLP (same deck)",
      nav: {
        openSections: "Open sections",
        closeSections: "Close sections",
        sectionsTitle: "Sections",
        slidesCount: (n) => `${n} slides`,
        sectionComplete: (pct) => `${pct}% complete`,
        deckProgress: "Your progress",
        resetProgress: "Reset session",
        resetProgressConfirm: "Reset your saved progress for this deck?",
        traineeProgressTitle: "Trainee progress",
        speakerNotes: "Speaker notes",
        speakerNotesEmpty: "No trainer notes on this slide.",
        quiz: "Quick check",
        quizEmpty: "No quiz defined for this slide.",
        quizReflect: "Reflection: how would you explain this topic in one sentence?",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit fullscreen",
        tools: "Tools",
        shortcutsHint: "→ ← navigate · Space next · F fullscreen · N notes · P presenter · Q quiz · Esc close",
        bulletsRevealHint: (shown, total) => `Press → to reveal bullet ${shown + 1} of ${total}`,
      },
      codeRunner: {
        run: "Run",
        reset: "Reset",
        output: "Output",
        outputPlaceholder: "Run the code to see output here.",
        outputEmpty: "(no output)",
        pyodideWarning:
          "First run downloads the Python runtime (Pyodide, ~10 MB). Allow a moment on slow networks.",
        dismissWarning: "Got it",
        statusLoadingRuntime: "Loading Python runtime (Pyodide)…",
        statusLoadingPackages: "Loading NumPy…",
        statusRunning: "Running…",
      },
      quizModal: {
        title: "Section quiz",
        questionOf: (current, total) => `Question ${current} of ${total}`,
        correct: "Correct!",
        incorrect: "Not quite.",
        nextQuestion: "Next question",
        seeResults: "See results",
        scoreSummary: (score, total) => `You scored ${score} / ${total}`,
        completedMsg: "Results saved to your progress.",
        closeQuiz: "Close",
        quizProgress: (completed, total, avg) =>
          `Quizzes: ${completed}/${total} sections · avg ${avg}%`,
      },
      a11y: {
        skipToSlides: "Skip to slides",
      },
      ai: {
        title: "AI assistant",
        toolbar: "AI help",
        toolbarTitle: "Explain slides, ask questions, or generate code examples (Claude API)",
        explainTab: "Simplify",
        qaTab: "Q&A",
        codeTab: "Code",
        explainHint: "Sends this slide to Claude for a simpler explanation — great for mixed audiences.",
        qaHint: "Ask a question in context of the current slide.",
        codeHint: "Request another NumPy-only code example for this concept.",
        questionLabel: "Your question",
        questionPlaceholder: "e.g. Why do we scale features before K-NN?",
        run: "Ask Claude",
        loading: "Thinking…",
        noApiKey: "Add your Claude API key in Settings first.",
        questionRequired: "Type a question before sending.",
        errorGeneric: "Could not reach Claude API.",
        apiKeySettings: "API key",
        apiKeyLabel: "Claude API key",
        apiKeyPlaceholder: "sk-ant-…",
        apiKeyHint:
          "Stored only in this browser (localStorage). Never commit keys to git. Requires internet.",
      },
      presenter: {
        title: "Presenter view",
        syncHint: "Synced with the audience window — navigate there to change slides.",
        currentSlide: "Current slide",
        nextSlide: "Next slide",
        notesTitle: "Speaker notes",
        notesPlaceholder: "Trainer notes for this slide…",
        notesAutoSave: "Edits save automatically to this browser.",
        timerPause: "Pause",
        timerResume: "Resume",
        timerReset: "Reset",
        slideCounter: (current, total) => `Slide ${current}/${total}`,
        openPresenter: "Presenter",
        openPresenterTitle: "Open presenter view in a second window",
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
    day01SlidesShortcut: "اليوم 1 — شرائح NLP",
    day01SlidesShortcutTitle: "الانتقال للقسم 14 — مقدمة اليوم الأول لـ NLP (نفس العرض)",
    nav: {
      openSections: "فتح الأقسام",
      closeSections: "إغلاق الأقسام",
      sectionsTitle: "الأقسام",
      slidesCount: (n) => `${n} شريحة`,
      sectionComplete: (pct) => `${pct}% مكتمل`,
      deckProgress: "تقدّمك",
      resetProgress: "تصفير الجلسة",
      resetProgressConfirm: "هل تريد تصفير التقدّم المحفوظ لهذا العرض؟",
      traineeProgressTitle: "تقدّم المتدرب",
      speakerNotes: "ملاحظات المدرّب",
      speakerNotesEmpty: "لا توجد ملاحظات لهذه الشريحة.",
      quiz: "سؤال سريع",
      quizEmpty: "لا يوجد اختبار لهذه الشريحة.",
      quizReflect: "تأمل: كيف تشرح هذا الموضوع في جملة واحدة؟",
      fullscreen: "ملء الشاشة",
      exitFullscreen: "الخروج من ملء الشاشة",
      tools: "أدوات",
      shortcutsHint: "← التالي · → السابق · Space التالي · F ملء الشاشة · N ملاحظات · P المقدّم · Q سؤال · Esc إغلاق",
      bulletsRevealHint: (shown, total) => `اضغط ← لإظهار النقطة ${shown + 1} من ${total}`,
    },
    codeRunner: {
      run: "تشغيل",
      reset: "إعادة ضبط",
      output: "المخرجات",
      outputPlaceholder: "شغّل الكود لعرض المخرجات هنا.",
      outputEmpty: "(لا مخرجات)",
      pyodideWarning:
        "أول تشغيل يحمّل بيئة Python (Pyodide) بحجم ~10 ميغابايت — قد يستغرق وقتاً على الشبكات البطيئة.",
      dismissWarning: "فهمت",
      statusLoadingRuntime: "جاري تحميل Python (Pyodide)…",
      statusLoadingPackages: "جاري تحميل NumPy…",
      statusRunning: "جاري التشغيل…",
    },
    quizModal: {
      title: "اختبار القسم",
      questionOf: (current, total) => `السؤال ${current} من ${total}`,
      correct: "إجابة صحيحة!",
      incorrect: "ليست الإجابة الصحيحة.",
      nextQuestion: "السؤال التالي",
      seeResults: "عرض النتيجة",
      scoreSummary: (score, total) => `نتيجتك ${score} / ${total}`,
      completedMsg: "تم حفظ النتيجة في تقدّمك.",
      closeQuiz: "إغلاق",
      quizProgress: (completed, total, avg) =>
        `الاختبارات: ${completed}/${total} أقسام · متوسط ${avg}%`,
    },
    a11y: {
      skipToSlides: "انتقل إلى الشرائح",
    },
    ai: {
      title: "مساعد الذكاء الاصطناعي",
      toolbar: "مساعد AI",
      toolbarTitle: "اشرح الشريحة، اسأل سؤالاً، أو ولّد مثال كود (Claude API)",
      explainTab: "تبسيط",
      qaTab: "سؤال وجواب",
      codeTab: "كود",
      explainHint: "يرسل محتوى الشريحة لـ Claude لشرح أبسط — مناسب للجمهور المختلط.",
      qaHint: "اكتب سؤالاً وسيجيب في سياق الشريحة الحالية.",
      codeHint: "اطلب مثال كود NumPy آخر لهذا المفهوم.",
      questionLabel: "سؤالك",
      questionPlaceholder: "مثال: لماذا نُحجّم الميزات قبل K-NN؟",
      run: "اسأل Claude",
      loading: "جاري التفكير…",
      noApiKey: "أضف مفتاح Claude API من الإعدادات أولاً.",
      questionRequired: "اكتب سؤالاً قبل الإرسال.",
      errorGeneric: "تعذّر الاتصال بـ Claude API.",
      apiKeySettings: "مفتاح API",
      apiKeyLabel: "مفتاح Claude API",
      apiKeyPlaceholder: "sk-ant-…",
      apiKeyHint:
        "يُحفظ في هذا المتصفح فقط (localStorage). لا ترفع المفتاح إلى git. يتطلب إنترنت.",
    },
    presenter: {
      title: "وضع المقدّم",
      syncHint: "متزامن مع نافذة الجمهور — تنقّل هناك لتغيير الشرائح.",
      currentSlide: "الشريحة الحالية",
      nextSlide: "الشريحة التالية",
      notesTitle: "ملاحظات المدرّب",
      notesPlaceholder: "ملاحظاتك لهذه الشريحة…",
      notesAutoSave: "التعديلات تُحفظ تلقائياً في هذا المتصفح.",
      timerPause: "إيقاف",
      timerResume: "استئناف",
      timerReset: "تصفير",
      slideCounter: (current, total) => `شريحة ${current}/${total}`,
      openPresenter: "المقدّم",
      openPresenterTitle: "فتح وضع المقدّم في نافذة ثانية",
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
