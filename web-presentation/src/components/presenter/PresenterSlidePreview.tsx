import { useLayoutEffect, useRef } from "react";
import { renderSlideMath } from "../../lib/renderMath";
import { SlideContent } from "../slides/SlideContent";
import { SlideFrame } from "../slides/SlideFrame";
import { isDeckDivider } from "../../lib/slideDividers";
import type { SlideRecord } from "../../lib/slideMarkup";
import type { UiLang } from "../../lib/uiStrings";

type PresenterSlidePreviewProps = {
  slide: SlideRecord | undefined;
  slides: SlideRecord[];
  slideIndex: number;
  sectionTag: string;
  sectionLabel: string;
  totalSlides: number;
  label: string;
  uiLang: UiLang;
};

export function PresenterSlidePreview({
  slide,
  slides,
  slideIndex,
  sectionTag,
  sectionLabel,
  totalSlides,
  label,
  uiLang,
}: PresenterSlidePreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !slide) return;
    renderSlideMath(root);
  }, [slide, slideIndex]);

  if (!slide) {
    return (
      <div className="presenter-preview presenter-preview--empty">
        <p className="presenter-preview-label">{label}</p>
        <p className="presenter-preview-empty">—</p>
      </div>
    );
  }

  const progressPercent = totalSlides ? Math.round(((slideIndex + 1) / totalSlides) * 100) : 0;

  return (
    <div className="presenter-preview">
      <p className="presenter-preview-label">{label}</p>
      <div className="presenter-preview-scaler" ref={rootRef}>
        <section className="slide presenter-preview-slide" dir="ltr" lang="en">
          <SlideFrame
            sectionTag={sectionTag}
            sectionLabel={sectionLabel}
            slideNumber={slideIndex + 1}
            totalSlides={totalSlides}
            progressPercent={progressPercent}
            variant={isDeckDivider(slide) ? "divider" : "default"}
          >
            <SlideContent
              slide={slide}
              slides={slides}
              slideIndex={slideIndex}
              uiLang={uiLang}
              isActive
            />
          </SlideFrame>
        </section>
      </div>
    </div>
  );
}
