import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MentorshipTemplate } from "./components/MentorshipTemplate";
import { SectionOutlinePage } from "./components/SectionOutlinePage";
import { presentationData } from "./data/presentationData.js";
import { addPresentationStructure } from "./lib/addPresentationStructure";
import { renderSlideMath } from "./lib/renderMath";
import { buildSectionJumps, getActiveSectionJumpId } from "./lib/sectionNav";
import { initGoogleTranslateElement, loadGoogleTranslateScript } from "./lib/googleTranslate";
import { buildSlideMarkup, getActiveSectionLabel, type SlideRecord } from "./lib/slideMarkup";

const THEME_STORAGE_KEY = "ml-presentation-theme";

function applyThemeToDocument(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [templateOpen, setTemplateOpen] = useState(false);
  const [slideEntering, setSlideEntering] = useState(false);
  const [view, setView] = useState<"slides" | "outline">("slides");
  const [translateMounted, setTranslateMounted] = useState(false);
  const [translatePanelOpen, setTranslatePanelOpen] = useState(false);

  const slideRef = useRef<HTMLElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const slides = presentationData.slides as SlideRecord[];
  const total = slides.length;
  const slide = slides[currentIndex];
  const slideHtml = useMemo(() => (slide ? buildSlideMarkup(slide) : ""), [slide]);
  const sectionLabel = useMemo(
    () => getActiveSectionLabel(slides, currentIndex),
    [slides, currentIndex, booted]
  );
  /** `booted` في التبعيات: بعد `addPresentationStructure()` تتغير محتويات المصفوفة بنفس المرجع، فيجب إعادة بناء الفهرس حتى يظهر زر «جدول الأقسام». */
  const sectionJumps = useMemo(() => buildSectionJumps(slides), [slides, booted]);
  const activeSectionJumpId = useMemo(
    () => getActiveSectionJumpId(sectionJumps, currentIndex),
    [sectionJumps, currentIndex]
  );
  const progressPercent = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;

  useEffect(() => {
    addPresentationStructure();
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);
    applyThemeToDocument(initial);
    setBooted(true);
  }, []);

  useLayoutEffect(() => {
    if (!booted) return;
    setSlideEntering(true);
    const id = requestAnimationFrame(() => setSlideEntering(false));
    return () => cancelAnimationFrame(id);
  }, [currentIndex, booted]);

  useLayoutEffect(() => {
    if (!booted || view !== "slides") return;
    const root = slideRef.current;
    if (!root) return;
    renderSlideMath(root);
    root.querySelectorAll(".katex, .katex-display").forEach((node) => {
      node.classList.add("notranslate");
      node.setAttribute("translate", "no");
    });
  }, [slideHtml, booted, view]);

  useEffect(() => {
    if (!translateMounted || !booted) return;
    let cancelled = false;
    loadGoogleTranslateScript()
      .then(() => {
        if (cancelled) return;
        requestAnimationFrame(() => initGoogleTranslateElement("google_translate_element_slot"));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [translateMounted, booted]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToSlideByNumber = useCallback(() => {
    const input = window.prompt(`اكتب رقم الشريحة (1 - ${total})`, String(currentIndex + 1));
    if (input === null) return;
    const target = Number.parseInt(input.trim(), 10);
    if (Number.isNaN(target) || target < 1 || target > total) {
      window.alert(`رقم غير صحيح. اختر رقم بين 1 و ${total}.`);
      return;
    }
    setCurrentIndex(target - 1);
  }, [currentIndex, total]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      applyThemeToDocument(next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const renderPrintDeck = useCallback(() => {
    const el = printRef.current;
    if (!el) return;
    el.innerHTML = slides
      .map((s) => `<section class="slide print-slide">${buildSlideMarkup(s)}</section>`)
      .join("");
    renderSlideMath(el);
  }, [slides]);

  const handleDownloadPdf = useCallback(() => {
    renderPrintDeck();
    window.print();
  }, [renderPrintDeck]);

  useEffect(() => {
    const onBeforePrint = () => renderPrintDeck();
    const onAfterPrint = () => {
      if (printRef.current) printRef.current.innerHTML = "";
    };
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
    };
  }, [renderPrintDeck]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (templateOpen) {
        if (event.key === "Escape") setTemplateOpen(false);
        return;
      }
      if (translatePanelOpen && event.key === "Escape") {
        setTranslatePanelOpen(false);
        return;
      }
      if (view === "outline") {
        if (event.key === "Escape") setView("slides");
        return;
      }
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, templateOpen, view, translatePanelOpen]);

  const goToSectionFromOutline = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setView("slides");
  }, []);

  const toggleTranslatePanel = useCallback(() => {
    setTranslateMounted(true);
    setTranslatePanelOpen((o) => !o);
  }, []);

  const isLight = theme === "light";

  if (!booted) {
    return null;
  }

  return (
    <>
      {view === "outline" && sectionJumps.length > 0 ? (
        <SectionOutlinePage
          deckTitle={presentationData.title}
          jumps={sectionJumps}
          activeJumpId={activeSectionJumpId}
          onJump={goToSectionFromOutline}
          onBack={() => setView("slides")}
        />
      ) : (
        <div className="presentation">
          <header className="topbar">
            <h1 id="deck-title">{presentationData.title}</h1>
            <div className="topbar-actions">
              <button
                id="slide-jump-btn"
                className="slide-count slide-jump-btn"
                type="button"
                title="الانتقال إلى رقم شريحة"
                onClick={goToSlideByNumber}
              >
                <span id="current-slide">{currentIndex + 1}</span>
                <span>/</span>
                <span id="total-slides">{total}</span>
              </button>
              <div className="topbar-theme-outline-group">
                <button
                  id="theme-toggle-btn"
                  className="nav-btn topbar-btn theme-btn"
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري"}
                >
                  <span id="theme-icon" aria-hidden="true">
                    {isLight ? "☀️" : "🌙"}
                  </span>
                  <span id="theme-label">{isLight ? "الوضع: نهاري" : "الوضع: ليلي"}</span>
                </button>
                {sectionJumps.length > 0 ? (
                  <button
                    type="button"
                    className="nav-btn topbar-btn"
                    onClick={() => setView("outline")}
                  >
                    جدول الأقسام
                  </button>
                ) : null}
              </div>
              <button
                id="show-template-btn"
                className="nav-btn topbar-btn"
                type="button"
                onClick={() => setTemplateOpen(true)}
              >
                نموذج المنهج
              </button>
              <button id="download-pdf-btn" className="nav-btn topbar-btn" type="button" onClick={handleDownloadPdf}>
                تحميل PDF
              </button>
              <button
                id="translate-slides-btn"
                className="nav-btn topbar-btn"
                type="button"
                onClick={toggleTranslatePanel}
                aria-expanded={translatePanelOpen}
                aria-controls="google_translate_element_slot"
                title="ترجمة محتوى الشرائح عبر Google (الصيغ الرياضية مُستثناة قدر الإمكان)"
              >
                ترجمة الشرائح
              </button>
            </div>
          </header>

          <section className="status-row" aria-label="presentation progress">
          <span id="section-label" className="section-chip">
            {sectionLabel}
          </span>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
          >
            <div id="progress-fill" className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </section>

        <main className="stage">
          <section
            ref={slideRef}
            id="slide-container"
            className={`slide${slideEntering ? " is-entering" : ""}`}
            dangerouslySetInnerHTML={{ __html: slideHtml }}
          />
        </main>

        <footer className="controls">
          <button id="prev-btn" className="nav-btn" type="button" disabled={currentIndex === 0} onClick={goPrev}>
            السابق
          </button>
          <div id="dots" className="dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot${index === currentIndex ? " active" : ""}`}
                aria-label={`اذهب للشريحة ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <button
            id="next-btn"
            className="nav-btn"
            type="button"
            disabled={currentIndex >= total - 1}
            onClick={goNext}
          >
            التالي
          </button>
        </footer>
        </div>
      )}

      <div
        id="template-modal"
        className={`template-modal${templateOpen ? " is-open" : ""}`}
        aria-hidden={!templateOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setTemplateOpen(false);
        }}
      >
        <div className="template-modal-card" role="dialog" aria-modal="true" aria-labelledby="template-modal-title">
          <div className="template-modal-head">
            <h2 id="template-modal-title">نموذج المنهج التدريبي (معبأ)</h2>
            <button
              id="close-template-btn"
              className="nav-btn topbar-btn"
              type="button"
              onClick={() => setTemplateOpen(false)}
            >
              إغلاق
            </button>
          </div>
          <div id="template-content" className="template-content">
            <MentorshipTemplate />
          </div>
        </div>
      </div>

      <div id="print-container" ref={printRef} className="print-deck" aria-hidden="true" />

      {booted && translateMounted ? (
        <div
          className={`translate-dropdown-panel${translatePanelOpen ? " is-open" : ""}`}
          dir="ltr"
          aria-hidden={!translatePanelOpen}
        >
          <div id="google_translate_element_slot" className="google-translate-slot" />
          <p className="translate-hint">
            اختر اللغة — تُترجم الصفحة بالكامل. الصيغ داخل KaTeX تُستثنى قدر الإمكان؛ بعد تغيير الشريحة قد تحتاج
            لإعادة اختيار اللغة.
          </p>
        </div>
      ) : null}

      {booted && view === "outline" ? (
        <button
          type="button"
          className="translate-fab nav-btn"
          onClick={toggleTranslatePanel}
          aria-expanded={translatePanelOpen}
          aria-controls="google_translate_element_slot"
          title="ترجمة المحتوى"
        >
          ترجمة
        </button>
      ) : null}
    </>
  );
}
