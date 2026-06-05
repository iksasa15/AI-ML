import { useMemo, useRef } from "react";
import { useLiveSlidePagination } from "../../hooks/useLiveSlidePagination";
import { useSlideFitScale } from "../../hooks/useSlideFitScale";
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
  uiLang: UiLang;
  isFullscreen?: boolean;
  fullscreenNavHidden?: boolean;
  contentPageIndex?: number;
  onContentPageCount?: (count: number) => void;
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
  uiLang,
  isFullscreen = false,
  fullscreenNavHidden = false,
  contentPageIndex = 0,
  onContentPageCount,
  onActiveSlideRef,
  footer,
}: VirtualSlideStageProps) {
  const windowIndices = useMemo(
    () => getVirtualWindowIndices(currentIndex, totalSlides),
    [currentIndex, totalSlides]
  );
  const activeRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const fitInnerRef = useRef<HTMLDivElement | null>(null);
  const fitSlideRef = useRef<HTMLElement | null>(null);

  useSlideFitScale(
    viewportRef,
    fitInnerRef,
    fitSlideRef,
    isFullscreen,
    currentIndex,
    fullscreenNavHidden
  );
  useLiveSlidePagination(
    fitSlideRef,
    currentIndex,
    contentPageIndex,
    isFullscreen,
    onContentPageCount ?? (() => {})
  );

  return (
    <main
      className={`stage virtual-slide-stage${isFullscreen ? " virtual-slide-stage--fullscreen" : ""}`}
    >
      <div className="slide-fit-viewport" ref={viewportRef}>
      {windowIndices.map((index) => {
        const slide = slides[index];
        const isActive = index === currentIndex;
        const progressPercent = totalSlides
          ? Math.round(((index + 1) / totalSlides) * 100)
          : 0;
        const sectionTag = getActiveSectionTag(slides, index);
        const sectionLabel = getActiveSectionLabel(slides, index);
        const dividerSectionId =
          slide?.type === "section-divider" ? parseSectionIdFromDivider(slide) : null;
        const dividerTheme =
          dividerSectionId !== null ? getSectionTheme(dividerSectionId) : null;

        const slideBody =
          slide && slide.type !== LOADING_SLIDE_TYPE ? (
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
                revealedBullets={undefined}
                uiLang={uiLang}
                isActive={isActive}
              />
            </SlideFrame>
          ) : (
            <div className="slide-loading-placeholder" role="status" aria-live="polite">
              <p>Loading section…</p>
            </div>
          );

        return (
          <div
            key={index}
            className={`slide-fit-inner${isActive ? " is-active" : ""}`}
            ref={isActive ? fitInnerRef : undefined}
          >
            <section
              ref={(node) => {
                if (isActive) {
                  activeRef.current = node;
                  fitSlideRef.current = node;
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
              {slideBody}
            </section>
          </div>
        );
      })}
      </div>
      {footer}
    </main>
  );
}
