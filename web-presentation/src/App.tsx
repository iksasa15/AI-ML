import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MentorshipTemplate } from "./components/MentorshipTemplate";
import { SectionOutlinePage } from "./components/SectionOutlinePage";
import { presentationData } from "./data/presentationData.js";
import { addPresentationStructure } from "./lib/addPresentationStructure";
import { DAY01_FIRST_SLIDE_TITLE } from "./lib/day01Anchor";
import { renderSlideMath } from "./lib/renderMath";
import { buildSectionJumps, getActiveSectionJumpId } from "./lib/sectionNav";
import { initGoogleTranslateElement, loadGoogleTranslateScript } from "./lib/googleTranslate";
import { buildSlideMarkup, getActiveSectionLabel, type SlideRecord } from "./lib/slideMarkup";
import {
  applyDocumentUiLang,
  getUiStrings,
  readStoredUiLang,
  UI_LANG_STORAGE_KEY,
  type UiLang,
} from "./lib/uiStrings";

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [uiLang, setUiLang] = useState<UiLang>(() => readStoredUiLang());

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
  const day01SlideIndex = useMemo(() => {
    if (!booted) return -1;
    return slides.findIndex((s) => String(s.title || "") === DAY01_FIRST_SLIDE_TITLE);
  }, [slides, booted]);
  const progressPercent = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const ui = useMemo(() => getUiStrings(uiLang), [uiLang]);

  useEffect(() => {
    addPresentationStructure();
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);
    applyThemeToDocument(initial);
    setBooted(true);
  }, []);

  useEffect(() => {
    applyDocumentUiLang(uiLang);
    try {
      localStorage.setItem(UI_LANG_STORAGE_KEY, uiLang);
    } catch {
      /* ignore */
    }
  }, [uiLang]);

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
    const input = window.prompt(ui.promptSlideNumber(total, currentIndex + 1), String(currentIndex + 1));
    if (input === null) return;
    const target = Number.parseInt(input.trim(), 10);
    if (Number.isNaN(target) || target < 1 || target > total) {
      window.alert(ui.invalidSlide(total));
      return;
    }
    setCurrentIndex(target - 1);
  }, [currentIndex, total, ui]);

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
      .map(
        (s) =>
          `<section class="slide print-slide" dir="ltr" lang="en">${buildSlideMarkup(s)}</section>`
      )
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
        if (event.key === "Escape") {
          setTemplateOpen(false);
        }
        return;
      }
      if (settingsOpen) {
        if (event.key === "Escape") setSettingsOpen(false);
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
      const rtlNav = uiLang === "ar";
      if (event.key === "ArrowRight") {
        rtlNav ? goPrev() : goNext();
      }
      if (event.key === "ArrowLeft") {
        rtlNav ? goNext() : goPrev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, templateOpen, settingsOpen, view, translatePanelOpen, uiLang]);

  const jumpToDay01Slides = useCallback(() => {
    const idx = slides.findIndex((s) => String(s.title || "") === DAY01_FIRST_SLIDE_TITLE);
    if (idx < 0) return;
    setCurrentIndex(idx);
    setSettingsOpen(false);
    setTranslatePanelOpen(false);
  }, [slides]);

  const goToSectionFromOutline = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setView("slides");
  }, []);

  const toggleTranslatePanel = useCallback(() => {
    setTranslateMounted(true);
    setSettingsOpen(false);
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
          uiLang={uiLang}
          onOpenSettings={() => {
            setSettingsOpen(true);
            setTranslatePanelOpen(false);
          }}
        />
      ) : (
        <div className="presentation" dir={ui.direction} lang={ui.docLang}>
          <header className="topbar">
            <h1 id="deck-title" dir="ltr" lang="en">
              {presentationData.title}
            </h1>
            <div className="topbar-actions">
              {day01SlideIndex >= 0 ? (
                <button
                  type="button"
                  className="nav-btn topbar-btn day01-deck-btn"
                  onClick={jumpToDay01Slides}
                  title={ui.day01SlidesShortcutTitle}
                >
                  {ui.day01SlidesShortcut}
                </button>
              ) : null}
              <button
                id="slide-jump-btn"
                className="slide-count slide-jump-btn"
                type="button"
                title={ui.slideJumpTitle}
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
                  aria-label={isLight ? ui.themeAriaLight : ui.themeAriaDark}
                >
                  <span id="theme-icon" aria-hidden="true">
                    {isLight ? "☀️" : "🌙"}
                  </span>
                  <span id="theme-label">{isLight ? ui.themeLabelLight : ui.themeLabelDark}</span>
                </button>
                {sectionJumps.length > 0 ? (
                  <button
                    type="button"
                    className="nav-btn topbar-btn"
                    onClick={() => setView("outline")}
                  >
                    {ui.outline}
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                className="nav-btn topbar-btn"
                onClick={() => {
                  setSettingsOpen(true);
                  setTranslatePanelOpen(false);
                }}
                aria-haspopup="dialog"
                aria-expanded={settingsOpen}
                aria-controls="settings-modal-card"
              >
                {ui.settings}
              </button>
              <button
                id="show-template-btn"
                className="nav-btn topbar-btn"
                type="button"
                onClick={() => {
                  setTemplateOpen(true);
                  setSettingsOpen(false);
                }}
              >
                {ui.curriculum}
              </button>
              <button id="download-pdf-btn" className="nav-btn topbar-btn" type="button" onClick={handleDownloadPdf}>
                {ui.downloadPdf}
              </button>
              <button
                id="translate-slides-btn"
                className="nav-btn topbar-btn"
                type="button"
                onClick={toggleTranslatePanel}
                aria-expanded={translatePanelOpen}
                aria-controls="google_translate_element_slot"
                title={ui.translateTooltip}
              >
                {ui.translateSlides}
              </button>
            </div>
          </header>

          <section className="status-row" aria-label={ui.sectionProgress}>
          <span id="section-label" className="section-chip" dir="auto">
            {sectionLabel}
          </span>
          <div
            className="progress-track"
            dir="ltr"
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
            dir="ltr"
            lang="en"
            dangerouslySetInnerHTML={{ __html: slideHtml }}
          />
        </main>

        <footer className="controls">
          <button id="prev-btn" className="nav-btn" type="button" disabled={currentIndex === 0} onClick={goPrev}>
            {ui.previous}
          </button>
          <div id="dots" className="dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot${index === currentIndex ? " active" : ""}`}
                aria-label={ui.dotAria(index + 1)}
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
            {ui.next}
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
        <div
          className="template-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-modal-title"
          dir={ui.direction}
          lang={ui.docLang}
        >
          <div className="template-modal-head">
            <h2 id="template-modal-title">{ui.templateTitle}</h2>
            <button
              id="close-template-btn"
              className="nav-btn topbar-btn"
              type="button"
              onClick={() => setTemplateOpen(false)}
            >
              {ui.close}
            </button>
          </div>
          <div id="template-content" className="template-content" dir="ltr" lang="en">
            <MentorshipTemplate />
          </div>
        </div>
      </div>

      <div
        id="settings-modal"
        className={`template-modal${settingsOpen ? " is-open" : ""}`}
        aria-hidden={!settingsOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSettingsOpen(false);
        }}
      >
        <div
          id="settings-modal-card"
          className="template-modal-card settings-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-modal-title"
          dir={ui.direction}
          lang={ui.docLang}
        >
          <div className="template-modal-head">
            <h2 id="settings-modal-title">{ui.settingsTitle}</h2>
            <button
              type="button"
              className="nav-btn topbar-btn"
              onClick={() => setSettingsOpen(false)}
            >
              {ui.close}
            </button>
          </div>
          <div className="settings-modal-body">
            <p className="settings-modal-desc">{ui.settingsDescription}</p>
            <fieldset className="settings-fieldset">
              <legend>{ui.uiLanguageLabel}</legend>
              <label className="settings-radio">
                <input
                  type="radio"
                  name="ml-ui-lang"
                  checked={uiLang === "ar"}
                  onChange={() => setUiLang("ar")}
                />
                <span>{ui.uiLangArabic}</span>
              </label>
              <label className="settings-radio">
                <input
                  type="radio"
                  name="ml-ui-lang"
                  checked={uiLang === "en"}
                  onChange={() => setUiLang("en")}
                />
                <span>{ui.uiLangEnglish}</span>
              </label>
            </fieldset>
          </div>
        </div>
      </div>

      <div id="print-container" ref={printRef} className="print-deck" aria-hidden="true" />

      {booted && translateMounted ? (
        <div
          className={`translate-dropdown-panel${translatePanelOpen ? " is-open" : ""}`}
          dir={ui.direction}
          lang={ui.docLang}
          aria-hidden={!translatePanelOpen}
        >
          <div className="google-translate-slot-wrap" dir="ltr">
            <div id="google_translate_element_slot" className="google-translate-slot" />
          </div>
          <p className="translate-hint">{ui.translateHint}</p>
        </div>
      ) : null}

      {booted && view === "outline" ? (
        <button
          type="button"
          className="translate-fab nav-btn"
          onClick={toggleTranslatePanel}
          aria-expanded={translatePanelOpen}
          aria-controls="google_translate_element_slot"
          title={ui.translateFabTitle}
        >
          {ui.translateFab}
        </button>
      ) : null}
    </>
  );
}
