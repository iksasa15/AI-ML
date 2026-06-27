import type { ReactNode } from "react";
import { ETRA_LOGO_URL } from "../../lib/brandAssets";

type SlideFrameVariant = "default" | "divider";

type SlideFrameProps = {
  sectionTag: string;
  sectionLabel: string;
  slideNumber: number;
  totalSlides: number;
  progressPercent: number;
  variant?: SlideFrameVariant;
  children: ReactNode;
};

export function SlideFrame({
  sectionTag,
  sectionLabel,
  slideNumber,
  totalSlides,
  progressPercent,
  variant = "default",
  children,
}: SlideFrameProps) {
  if (variant === "divider") {
    return (
      <div className="slide-frame slide-frame--divider">
        <div className="slide-frame-logo-wrap" aria-hidden="true">
          <img src={ETRA_LOGO_URL} alt="" className="slide-frame-logo slide-frame-logo--divider" />
        </div>
        <div className="slide-frame-divider-body">{children}</div>
        <footer className="slide-frame-footer slide-frame-footer--divider" aria-hidden="true">
          <div
            className="slide-frame-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
          >
            <div className="slide-frame-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="slide-frame">
      <header className="slide-frame-header">
        <div className="slide-frame-header-start">
          <span className="slide-frame-section-tag">{sectionTag}</span>
          <span className="slide-frame-section-sep" aria-hidden="true">
            ·
          </span>
          <span className="slide-frame-section-label">{sectionLabel}</span>
        </div>
        <div className="slide-frame-header-end">
          <span className="slide-frame-slide-num">
            {slideNumber}
            <span className="slide-frame-slide-total"> / {totalSlides}</span>
          </span>
        </div>
      </header>

      <div className="slide-frame-content">
        <div className="slide-content-logo" aria-hidden="true">
          <img src={ETRA_LOGO_URL} alt="" className="slide-content-logo-img" />
        </div>
        {children}
      </div>

      <footer className="slide-frame-footer">
        <div
          className="slide-frame-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label="Slide progress"
        >
          <div className="slide-frame-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </footer>
    </div>
  );
}
