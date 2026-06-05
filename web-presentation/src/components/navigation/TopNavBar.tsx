import type { UiStrings } from "../../lib/uiStrings";

type TopNavBarProps = {
  ui: UiStrings;
  direction?: "rtl" | "ltr";
  contextLabel: string;
  currentSlide: number;
  totalSlides: number;
  progressPercent: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLight: boolean;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJumpToSlide: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  children?: React.ReactNode;
};

export function TopNavBar({
  ui,
  direction = "ltr",
  contextLabel,
  currentSlide,
  totalSlides,
  progressPercent,
  canGoPrev,
  canGoNext,
  isLight,
  sidebarOpen,
  onOpenSidebar,
  onPrev,
  onNext,
  onJumpToSlide,
  onToggleTheme,
  onOpenSettings,
  onToggleFullscreen,
  isFullscreen,
  children,
}: TopNavBarProps) {
  const isRtl = direction === "rtl";
  const prevArrow = isRtl ? "▶" : "◀";
  const nextArrow = isRtl ? "◀" : "▶";

  return (
    <header className="top-nav" aria-label={ui.sectionProgress} dir={direction}>
      <div className="top-nav-row">
        <div className="top-nav-group top-nav-group--start">
          <button
            type="button"
            className="top-nav-icon-btn"
            onClick={onOpenSidebar}
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? ui.nav.closeSections : ui.nav.openSections}
            title={ui.nav.openSections}
          >
            ☰
          </button>
          <button
            type="button"
            className="top-nav-pill-btn top-nav-pill-btn--prev"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label={ui.previous}
          >
            <span className="nav-arrow" aria-hidden="true">
              {prevArrow}
            </span>{" "}
            {ui.previous}
          </button>
        </div>

        <div className="top-nav-center">
          <span className="top-nav-context" dir="ltr" lang="en">
            {contextLabel}
          </span>
          <button
            type="button"
            className="top-nav-counter"
            onClick={onJumpToSlide}
            title={ui.slideJumpTitle}
            aria-label={ui.slideJumpTitle}
          >
            {currentSlide}
            <span className="top-nav-counter-sep">/</span>
            {totalSlides}
          </button>
        </div>

        <div className="top-nav-group top-nav-group--end">
          <button
            type="button"
            className="top-nav-pill-btn top-nav-pill-btn--primary top-nav-pill-btn--next"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label={ui.next}
          >
            {ui.next}{" "}
            <span className="nav-arrow" aria-hidden="true">
              {nextArrow}
            </span>
          </button>
          <button
            type="button"
            className="top-nav-icon-btn"
            onClick={onToggleFullscreen}
            title={isFullscreen ? ui.nav.exitFullscreen : ui.nav.fullscreen}
            aria-label={isFullscreen ? ui.nav.exitFullscreen : ui.nav.fullscreen}
          >
            {isFullscreen ? "⤢" : "⛶"}
          </button>
          <button
            type="button"
            className="top-nav-icon-btn"
            onClick={onToggleTheme}
            aria-label={isLight ? ui.themeAriaLight : ui.themeAriaDark}
            title={isLight ? ui.themeLabelLight : ui.themeLabelDark}
          >
            {isLight ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            className="top-nav-icon-btn"
            onClick={onOpenSettings}
            aria-label={ui.settings}
            title={ui.settings}
          >
            ⚙
          </button>
        </div>
      </div>

      <div className="top-nav-progress-row">
        <div
          className="top-nav-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          dir="ltr"
        >
          <div className="top-nav-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="top-nav-progress-pct">{progressPercent}%</span>
      </div>

      {children ? <div className="top-nav-tools">{children}</div> : null}
    </header>
  );
}
