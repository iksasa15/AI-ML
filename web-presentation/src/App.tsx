import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { MentorshipTemplate } from "./components/MentorshipTemplate";
import { AiAssistantPanel } from "./components/ai/AiAssistantPanel";
import { QuizModal } from "./components/quiz/QuizModal";
import { SectionSidebar } from "./components/navigation/SectionSidebar";
import { SpeakerNotesPanel } from "./components/navigation/SpeakerNotesPanel";
import { TopNavBar } from "./components/navigation/TopNavBar";
import { TraineeProgressRing } from "./components/navigation/TraineeProgressRing";
import { SectionOutlinePage } from "./components/SectionOutlinePage";
import { usePresentationDeck } from "./hooks/usePresentationDeck";
import { VirtualSlideStage } from "./components/slides/VirtualSlideStage";
import { DAY01_FIRST_SLIDE_TITLE } from "./lib/day01Anchor";
import { renderSlideMath } from "./lib/renderMath";
import { usePresentationShortcuts } from "./hooks/usePresentationShortcuts";
import {
  getSlideTransitionKind,
  type SlideTransitionKind,
} from "./lib/slideTransitions";
import {
  getActiveSectionNavItem,
  getSectionIdFromJump,
  getQuizSectionIds,
  hasQuizForSection,
  isLastSlideInSection,
} from "./lib/quiz";
import {
  getQuizSummary,
  isQuizCompleted,
  resetQuizResults,
  saveQuizResult,
  type QuizSectionResult,
} from "./lib/quizResults";
import { buildSectionJumps, buildSectionNavItems, getActiveSectionJumpId } from "./lib/sectionNav";
import { getNavContextLabel } from "./lib/slideMeta";
import {
  bumpTraineeProgress,
  readTraineeProgress,
  resetTraineeProgress,
  traineeDeckPercent,
} from "./lib/traineeProgress";
import { initGoogleTranslateElement, loadGoogleTranslateScript } from "./lib/googleTranslate";
import { openPresenterWindow, persistPresenterState } from "./lib/presenterSync";
import { getActiveSectionTag } from "./lib/slideMeta";
import { buildSlideMarkup, getActiveSectionLabel, type SlideRecord } from "./lib/slideMarkup";
import { readClaudeApiKey, writeClaudeApiKey } from "./lib/claudeApi";
import {
  applyDocumentUiLang,
  getUiStrings,
  readStoredUiLang,
  UI_LANG_STORAGE_KEY,
  type UiLang,
} from "./lib/uiStrings";

const THEME_STORAGE_KEY = "ml-presentation-theme";
const DAY01_HASH = "#day1-nlp-slides";
const CONCLUSION_TITLE = "Conclusion";

function applyThemeToDocument(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [templateOpen, setTemplateOpen] = useState(false);
  const [slideEntering, setSlideEntering] = useState(false);
  const [view, setView] = useState<"slides" | "outline">("slides");
  const [deckScope, setDeckScope] = useState<"all" | "day1">("all");
  const [translateMounted, setTranslateMounted] = useState(false);
  const [translatePanelOpen, setTranslatePanelOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizSectionId, setQuizSectionId] = useState(1);
  const [quizResultsVersion, setQuizResultsVersion] = useState(0);
  const [progressRingOpen, setProgressRingOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [claudeApiKey, setClaudeApiKey] = useState(() => readClaudeApiKey());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [traineeMaxIndex, setTraineeMaxIndex] = useState(0);
  const [uiLang, setUiLang] = useState<UiLang>(() => readStoredUiLang());

  const slideRef = useRef<HTMLElement | null>(null);
  const { slides: deckSlides, ready: deckReady, title: deckTitle, ensureForIndex, ensureAllForPrint } =
    usePresentationDeck();
  const printRef = useRef<HTMLDivElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);
  const lastAutoQuizKeyRef = useRef<string | null>(null);
  const [transitionKind, setTransitionKind] = useState<SlideTransitionKind>("slide");

  const allSlides = deckSlides;
  const day01StartIndex = useMemo(() => {
    if (!booted || !deckReady) return -1;
    return allSlides.findIndex((s) => String(s.title || "") === DAY01_FIRST_SLIDE_TITLE);
  }, [allSlides, booted, deckReady]);
  const day01EndExclusive = useMemo(() => {
    if (!booted || day01StartIndex < 0) return -1;
    const conclusionIdx = allSlides.findIndex(
      (s, i) => i > day01StartIndex && String(s.title || "") === CONCLUSION_TITLE
    );
    return conclusionIdx >= 0 ? conclusionIdx : allSlides.length;
  }, [allSlides, day01StartIndex, booted]);
  const day01Slides = useMemo(() => {
    if (day01StartIndex < 0 || day01EndExclusive <= day01StartIndex) return [] as SlideRecord[];
    return allSlides.slice(day01StartIndex, day01EndExclusive);
  }, [allSlides, day01StartIndex, day01EndExclusive]);
  const slides = deckScope === "day1" ? day01Slides : allSlides;
  const total = slides.length;
  const slide = slides[currentIndex];
  const sectionLabel = useMemo(
    () => getActiveSectionLabel(slides, currentIndex),
    [slides, currentIndex, booted]
  );
  /** `booted` في التبعيات: بعد تحميل الهيكل تتغير محتويات المصفوفة، فيجب إعادة بناء الفهرس حتى يظهر زر «جدول الأقسام». */
  const sectionJumps = useMemo(() => buildSectionJumps(slides), [slides, booted]);
  const activeSectionJumpId = useMemo(
    () => getActiveSectionJumpId(sectionJumps, currentIndex),
    [sectionJumps, currentIndex]
  );
  const sectionNavItems = useMemo(
    () => buildSectionNavItems(slides, sectionJumps, traineeMaxIndex),
    [slides, sectionJumps, traineeMaxIndex, booted]
  );
  const navContextLabel = useMemo(
    () => getNavContextLabel(slides, currentIndex),
    [slides, currentIndex, booted]
  );
  const traineePercent = useMemo(
    () => traineeDeckPercent(traineeMaxIndex, total),
    [traineeMaxIndex, total]
  );
  const day01SlidesLink = useMemo(() => `${window.location.pathname}${window.location.search}${DAY01_HASH}`, []);
  const progressPercent = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const ui = useMemo(() => getUiStrings(uiLang), [uiLang]);
  const activeSectionNavItem = useMemo(
    () => getActiveSectionNavItem(sectionNavItems, activeSectionJumpId),
    [sectionNavItems, activeSectionJumpId]
  );
  const activeQuizSectionId = useMemo(
    () => getSectionIdFromJump(activeSectionNavItem),
    [activeSectionNavItem]
  );
  const quizSectionIds = useMemo(() => getQuizSectionIds(), []);
  const quizSummary = useMemo(
    () => getQuizSummary(deckScope, quizSectionIds),
    [deckScope, quizSectionIds, quizResultsVersion]
  );
  const quizSectionLabel = useMemo(() => {
    const item = sectionNavItems.find((s) => getSectionIdFromJump(s) === quizSectionId);
    return item?.label ?? sectionLabel;
  }, [sectionNavItems, quizSectionId, sectionLabel]);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const initial = saved === "light" || saved === "dark" ? saved : "light";
    setTheme(initial);
    applyThemeToDocument(initial);
  }, []);

  useEffect(() => {
    if (deckReady) setBooted(true);
  }, [deckReady]);

  useEffect(() => {
    if (!booted) return;
    ensureForIndex(currentIndex);
  }, [booted, currentIndex, ensureForIndex]);

  useEffect(() => {
    if (!booted) return;
    setTraineeMaxIndex(readTraineeProgress(deckScope).maxReachedIndex);
  }, [booted, deckScope]);

  useEffect(() => {
    if (!booted) return;
    const record = bumpTraineeProgress(deckScope, currentIndex);
    setTraineeMaxIndex(record.maxReachedIndex);
  }, [booted, deckScope, currentIndex]);

  useEffect(() => {
    applyDocumentUiLang(uiLang);
    try {
      localStorage.setItem(UI_LANG_STORAGE_KEY, uiLang);
    } catch {
      /* ignore */
    }
  }, [uiLang]);

  useEffect(() => {
    if (!isLastSlideInSection(currentIndex, activeSectionNavItem)) {
      lastAutoQuizKeyRef.current = null;
    }
  }, [currentIndex, activeSectionNavItem]);

  useEffect(() => {
    if (!booted) return;
    persistPresenterState({
      currentIndex,
      deckScope,
      uiLang,
      totalSlides: total,
    });
  }, [booted, currentIndex, deckScope, uiLang, total]);

  useEffect(() => {
    if (!booted || view !== "slides" || quizOpen) return;
    if (!isLastSlideInSection(currentIndex, activeSectionNavItem)) return;
    const sectionId = activeQuizSectionId;
    if (!hasQuizForSection(sectionId) || sectionId === null) return;
    if (isQuizCompleted(deckScope, sectionId)) return;

    const key = `${sectionId}-${currentIndex}`;
    if (lastAutoQuizKeyRef.current === key) return;
    lastAutoQuizKeyRef.current = key;
    setQuizSectionId(sectionId);
    setQuizOpen(true);
  }, [
    booted,
    view,
    quizOpen,
    currentIndex,
    activeSectionNavItem,
    activeQuizSectionId,
    deckScope,
  ]);

  useLayoutEffect(() => {
    if (!booted) return;
    const kind = getSlideTransitionKind(slides, prevIndexRef.current, currentIndex);
    setTransitionKind(kind);
    setSlideEntering(true);
    prevIndexRef.current = currentIndex;
    const id = requestAnimationFrame(() => setSlideEntering(false));
    return () => cancelAnimationFrame(id);
  }, [currentIndex, booted, slides]);

  useLayoutEffect(() => {
    if (!booted || view !== "slides") return;
    const root = slideRef.current;
    if (!root) return;
    if (!slide?._mathPrerendered) {
      renderSlideMath(root);
    }
    root.querySelectorAll(".katex, .katex-display").forEach((node) => {
      node.classList.add("notranslate");
      node.setAttribute("translate", "no");
    });
  }, [currentIndex, slide, booted, view]);

  useEffect(() => {
    if (currentIndex >= total) {
      setCurrentIndex(Math.max(0, total - 1));
    }
  }, [currentIndex, total]);

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

  const advanceSlide = goNext;
  const retreatSlide = goPrev;

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

  const renderPrintDeck = useCallback(async () => {
    const el = printRef.current;
    if (!el) return;
    const printSlides = deckScope === "day1" ? slides : await ensureAllForPrint();
    el.innerHTML = printSlides
      .map((s, index) => {
        const frameSlides = deckScope === "day1" ? slides : printSlides;
        const frame = {
          sectionTag: getActiveSectionTag(frameSlides, index),
          sectionLabel: getActiveSectionLabel(frameSlides, index),
          slideNumber: index + 1,
          totalSlides: printSlides.length,
          progressPercent: Math.round(((index + 1) / printSlides.length) * 100),
        };
        return `<section class="slide print-slide" dir="ltr" lang="en">${buildSlideMarkup(s, {
          slides: frameSlides,
          slideIndex: index,
          frame,
        })}</section>`;
      })
      .join("");
    renderSlideMath(el);
  }, [slides, deckScope, ensureAllForPrint]);

  const handleDownloadPdf = useCallback(() => {
    void renderPrintDeck().then(() => window.print());
  }, [renderPrintDeck]);

  useEffect(() => {
    const onBeforePrint = () => {
      void renderPrintDeck();
    };
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

  const toggleFullscreen = useCallback(() => {
    const root = presentationRef.current;
    if (!root) return;
    if (!document.fullscreenElement) {
      void root.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const closeOverlays = useCallback(() => {
    setTemplateOpen(false);
    setSettingsOpen(false);
    setTranslatePanelOpen(false);
    setSidebarOpen(false);
    setNotesOpen(false);
    setQuizOpen(false);
    setProgressRingOpen(false);
    setAiOpen(false);
    if (view === "outline") setView("slides");
  }, [view]);

  const openSectionQuiz = useCallback(() => {
    if (!hasQuizForSection(activeQuizSectionId) || activeQuizSectionId === null) return;
    setNotesOpen(false);
    setQuizSectionId(activeQuizSectionId);
    setQuizOpen(true);
  }, [activeQuizSectionId]);

  const handleQuizComplete = useCallback(
    (result: QuizSectionResult) => {
      saveQuizResult(deckScope, result);
      setQuizResultsVersion((v) => v + 1);
    },
    [deckScope]
  );

  const openPresenterMode = useCallback(() => {
    persistPresenterState({
      currentIndex,
      deckScope,
      uiLang,
      totalSlides: total,
    });
    openPresenterWindow();
  }, [currentIndex, deckScope, uiLang, total]);

  usePresentationShortcuts({
    enabled: booted && view === "slides" && !templateOpen && !settingsOpen && !quizOpen && !aiOpen,
    rtlNav: uiLang === "ar",
    onPrev: retreatSlide,
    onNext: advanceSlide,
    onToggleFullscreen: toggleFullscreen,
    onToggleNotes: () => {
      setQuizOpen(false);
      setNotesOpen((o) => !o);
    },
    onOpenPresenter: openPresenterMode,
    onToggleQuiz: () => {
      if (quizOpen) {
        setQuizOpen(false);
        return;
      }
      openSectionQuiz();
    },
    onEscape: closeOverlays,
  });

  const handleResetTraineeProgress = useCallback(() => {
    if (!window.confirm(ui.nav.resetProgressConfirm)) return;
    resetTraineeProgress(deckScope);
    resetQuizResults(deckScope);
    setTraineeMaxIndex(0);
    setQuizResultsVersion((v) => v + 1);
    setProgressRingOpen(false);
  }, [deckScope, ui.nav.resetProgressConfirm]);

  const jumpToDay01Slides = useCallback(() => {
    if (day01Slides.length === 0) return;
    setDeckScope("day1");
    setCurrentIndex(0);
    if (window.location.hash !== DAY01_HASH) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${DAY01_HASH}`);
    }
    setSettingsOpen(false);
    setTranslatePanelOpen(false);
  }, [day01Slides.length]);

  useEffect(() => {
    if (!booted) return;
    const syncFromHash = () => {
      const isDay01 = window.location.hash === DAY01_HASH;
      setDeckScope(isDay01 ? "day1" : "all");
      if (!isDay01) return;
      if (day01Slides.length === 0) return;
      setCurrentIndex(0);
      setView("slides");
      setSettingsOpen(false);
      setTranslatePanelOpen(false);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [booted, day01Slides.length]);

  const goToSectionFromOutline = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setView("slides");
  }, []);

  const goToSectionFromSidebar = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex);
    setSidebarOpen(false);
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
          deckTitle={deckTitle}
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
        <div
          ref={presentationRef}
          className={`presentation${isFullscreen ? " is-fullscreen" : ""}`}
          dir={ui.direction}
          lang={ui.docLang}
        >
          <a className="skip-to-slides" href="#slide-container">
            {ui.a11y.skipToSlides}
          </a>
          <TopNavBar
            ui={ui}
            direction={ui.direction}
            contextLabel={navContextLabel}
            currentSlide={currentIndex + 1}
            totalSlides={total}
            progressPercent={progressPercent}
            canGoPrev={currentIndex > 0}
            canGoNext={currentIndex < total - 1}
            isLight={isLight}
            sidebarOpen={sidebarOpen}
            onOpenSidebar={() => setSidebarOpen((o) => !o)}
            onPrev={retreatSlide}
            onNext={advanceSlide}
            onJumpToSlide={goToSlideByNumber}
            onToggleTheme={toggleTheme}
            onOpenSettings={() => {
              setSettingsOpen(true);
              setTranslatePanelOpen(false);
            }}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          >
            {day01Slides.length > 0 ? (
              <a
                href={day01SlidesLink}
                className="top-nav-tool-link"
                onClick={(event) => {
                  event.preventDefault();
                  jumpToDay01Slides();
                }}
                title={ui.day01SlidesShortcutTitle}
              >
                {ui.day01SlidesShortcut}
              </a>
            ) : null}
            <button type="button" className="top-nav-tool-btn" onClick={() => setView("outline")}>
              {ui.outline}
            </button>
            <button
              type="button"
              className="top-nav-tool-btn"
              onClick={() => {
                setTemplateOpen(true);
                setSettingsOpen(false);
              }}
            >
              {ui.curriculum}
            </button>
            <button type="button" className="top-nav-tool-btn" onClick={handleDownloadPdf}>
              {ui.downloadPdf}
            </button>
            <button
              type="button"
              className="top-nav-tool-btn"
              onClick={openPresenterMode}
              title={ui.presenter.openPresenterTitle}
            >
              {ui.presenter.openPresenter}
            </button>
            <button
              type="button"
              className="top-nav-tool-btn"
              onClick={toggleTranslatePanel}
              aria-expanded={translatePanelOpen}
            >
              {ui.translateSlides}
            </button>
            <button
              type="button"
              className="top-nav-tool-btn"
              onClick={() => {
                setNotesOpen(false);
                setQuizOpen(false);
                setAiOpen((o) => !o);
              }}
              aria-expanded={aiOpen}
              title={ui.ai.toolbarTitle}
            >
              {ui.ai.toolbar}
            </button>
          </TopNavBar>

          <p className="top-nav-shortcuts-hint" aria-hidden="true">
            {ui.nav.shortcutsHint}
          </p>

          <SectionSidebar
            open={sidebarOpen}
            ui={ui}
            deckTitle={deckTitle}
            items={sectionNavItems}
            activeId={activeSectionJumpId}
            onClose={() => setSidebarOpen(false)}
            onJump={goToSectionFromSidebar}
          />

          <VirtualSlideStage
            slides={slides}
            currentIndex={currentIndex}
            totalSlides={total}
            transitionKind={transitionKind}
            slideEntering={slideEntering}
            uiLang={uiLang}
            onActiveSlideRef={(node) => {
              slideRef.current = node;
            }}
          />

          <SpeakerNotesPanel
            open={notesOpen}
            ui={ui}
            slide={slide}
            slideIndex={currentIndex}
            deckScope={deckScope}
            onClose={() => setNotesOpen(false)}
          />

          <AiAssistantPanel
            open={aiOpen}
            ui={ui}
            slide={slide}
            slideIndex={currentIndex}
            uiLang={uiLang}
            onClose={() => setAiOpen(false)}
            onOpenSettings={() => {
              setAiOpen(false);
              setSettingsOpen(true);
            }}
          />

          <QuizModal
            open={quizOpen}
            sectionId={quizSectionId}
            sectionLabel={quizSectionLabel}
            ui={ui}
            onClose={() => setQuizOpen(false)}
            onComplete={handleQuizComplete}
          />

          <TraineeProgressRing
            ui={ui}
            percent={traineePercent}
            quizSummary={quizSummary}
            open={progressRingOpen}
            onToggle={() => setProgressRingOpen((o) => !o)}
            onReset={handleResetTraineeProgress}
          />
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
            <div className="settings-api-key-field">
              <label htmlFor="claude-api-key">{ui.ai.apiKeyLabel}</label>
              <input
                id="claude-api-key"
                type="password"
                autoComplete="off"
                value={claudeApiKey}
                placeholder={ui.ai.apiKeyPlaceholder}
                onChange={(e) => {
                  setClaudeApiKey(e.target.value);
                  writeClaudeApiKey(e.target.value);
                }}
              />
              <p className="settings-api-key-hint">{ui.ai.apiKeyHint}</p>
            </div>
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
