import { useMemo, useRef } from "react";
import { countSlideBullets } from "../../lib/bulletReveal";
import { LOADING_SLIDE_TYPE } from "../../lib/presentationLoader";
import { getActiveSectionLabel, type SlideRecord } from "../../lib/slideMarkup";
import { getSectionTheme, parseSectionIdFromDivider } from "../../lib/sectionTheme";
import { getActiveSectionTag } from "../../lib/slideMeta";
import { transitionClassName, type SlideTransitionKind } from "../../lib/slideTransitions";
import type { UiLang } from "../../lib/uiStrings";
import { SlideContent } from "./SlideContent";
import { SlideFrame } from "./SlideFrame";

const WINDOW_RADIUS = 2;

type VirtualSlideStageProps = {
  slides: SlideRecord[];
  currentIndex: number;
  totalSlides: number;
  transitionKind: SlideTransitionKind;
  slideEntering: boolean;
  revealedBullets: number;
  uiLang: UiLang;
  onActiveSlideRef?: (node: HTMLElement | null) => void;
  footer?: React.ReactNode;
};

export function getVirtualWindowIndices(currentIndex: number, total: number): number[] {
  const indices: number[] = [];
  for (let offset = -WINDOW_RADIUS; offset <= WINDOW_RADIUS; offset += 1) {
    const index = currentIndex + offset;
    if (index >= 0 && index < total) indices.push(index);
  }
  return indices;
}

export function VirtualSlideStage({
  slides,
  currentIndex,
  totalSlides,
  transitionKind,
  slideEntering,
  revealedBullets,
  uiLang,
  onActiveSlideRef,
  footer,
}: VirtualSlideStageProps) {
  const windowIndices = useMemo(
    () => getVirtualWindowIndices(currentIndex, totalSlides),
    [currentIndex, totalSlides]
  );
  const activeRef = useRef<HTMLElement | null>(null);

  return (
    <main className="stage virtual-slide-stage">
      {windowIndices.map((index) => {
        const slide = slides[index];
        const isActive = index === currentIndex;
        const progressPercent = totalSlides
          ? Math.round(((index + 1) / totalSlides) * 100)
          : 0;
        const sectionTag = getActiveSectionTag(slides, index);
        const sectionLabel = getActiveSectionLabel(slides, index);
        const bulletTotal = slide ? countSlideBullets(slide) : 0;
        const revealed =
          isActive && bulletTotal > 0 ? revealedBullets : undefined;
        const dividerSectionId =
          slide?.type === "section-divider" ? parseSectionIdFromDivider(slide) : null;
        const dividerTheme =
          dividerSectionId !== null ? getSectionTheme(dividerSectionId) : null;

        return (
          <section
            key={index}
            ref={(node) => {
              if (isActive) {
                activeRef.current = node;
                onActiveSlideRef?.(node);
              }
            }}
            id={isActive ? "slide-container" : undefined}
            className={`slide virtual-slide${isActive ? " is-active" : " is-cached"} ${transitionClassName(
              transitionKind,
              isActive && slideEntering
            )}${slide?.type === "section-divider" ? " slide--divider" : ""}`}
            dir="ltr"
            lang="en"
            aria-hidden={!isActive}
            data-slide-index={index}
            style={
              dividerTheme
                ? ({
                    "--section-accent": dividerTheme.color,
                    "--section-accent-dark": dividerTheme.colorDark,
                    "--section-accent-glow": dividerTheme.colorGlow,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {slide && slide.type !== LOADING_SLIDE_TYPE ? (
              <SlideFrame
                sectionTag={sectionTag}
                sectionLabel={sectionLabel}
                slideNumber={index + 1}
                totalSlides={totalSlides}
                progressPercent={progressPercent}
                variant={slide.type === "section-divider" ? "divider" : "default"}
              >
                <SlideContent
                  slide={slide}
                  slides={slides}
                  slideIndex={index}
                  revealedBullets={revealed}
                  uiLang={uiLang}
                  isActive={isActive}
                />
              </SlideFrame>
            ) : (
              <div className="slide-loading-placeholder" role="status" aria-live="polite">
                <p>Loading section…</p>
              </div>
            )}
          </section>
        );
      })}
      {footer}
    </main>
  );
}
