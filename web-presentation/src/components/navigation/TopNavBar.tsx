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
  onHideNav?: () => void;
  contentPage?: number;
  contentPageCount?: number;
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
  onHideNav,
  contentPage,
  contentPageCount,
  children,
}: TopNavBarProps) {
  const isRtl = direction === "rtl";
  const prevArrow = isRtl ? "▶" : "◀";
  const nextArrow = isRtl ? "◀" : "▶";

  return (
    <header className="top-nav" aria-label={ui.sectionProgress} dir={direction}>
      <div className="top-nav-row">
        <div className="top-nav-group top-nav-group--start">
          <a
            className="top-nav-brand"
            href="https://etra-creators-portal-zaqfav.cranl.net/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="إترا للتمكين التقني"
            title="إترا للتمكين التقني"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/etra-logo.png`}
              alt="إترا للتمكين التقني"
              className="top-nav-logo"
              height={48}
            />
          </a>
          <button
            type="button"
            className={`top-nav-icon-btn${sidebarOpen ? " is-active" : ""}`}
            onClick={onOpenSidebar}
            aria-expanded={sidebarOpen}
            aria-label={ui.nav.openSections}
            title={ui.nav.openSections}
            disabled={sidebarOpen}
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
            {contentPage && contentPageCount && contentPageCount > 1 ? (
              <span className="top-nav-content-page">
                <span className="top-nav-counter-sep"> · </span>
                {contentPage}/{contentPageCount}
              </span>
            ) : null}
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
          {isFullscreen && onHideNav ? (
            <button
              type="button"
              className="top-nav-icon-btn top-nav-hide-btn"
              onClick={onHideNav}
              aria-label={ui.nav.hideNavBar}
              title={ui.nav.hideNavBar}
            >
              <span aria-hidden="true">✕</span>
            </button>
          ) : null}
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
