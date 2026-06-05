import { type RefObject, useLayoutEffect, useRef } from "react";
import {
  applyLiveSlidePagination,
  resetLiveSlidePagination,
  setLiveSlidePage,
  shouldPaginateSlide,
} from "../lib/liveSlidePagination";

export function useLiveSlidePagination(
  slideRef: RefObject<HTMLElement | null>,
  slideIndex: number,
  contentPageIndex: number,
  enabled: boolean,
  onPageCount: (count: number) => void
) {
  const pageCountRef = useRef(1);

  useLayoutEffect(() => {
    const slide = slideRef.current;
    if (!slide) {
      pageCountRef.current = 1;
      onPageCount(1);
      return;
    }

    if (!enabled || !shouldPaginateSlide(slide)) {
      resetLiveSlidePagination(slide);
      pageCountRef.current = 1;
      onPageCount(1);
      return;
    }

    const run = () => {
      const count = applyLiveSlidePagination(slide, 0);
      pageCountRef.current = count;
      onPageCount(count);
    };

    run();

    const content = slide.querySelector(".slide-frame-content");
    const frame = slide.querySelector(".slide-frame");
    const observer = new ResizeObserver(run);
    if (content) observer.observe(content);
    if (frame) observer.observe(frame);

    return () => {
      observer.disconnect();
      resetLiveSlidePagination(slide);
    };
  }, [slideIndex, enabled, slideRef, onPageCount]);

  useLayoutEffect(() => {
    const slide = slideRef.current;
    if (!slide || !enabled) return;
    const content = slide.querySelector(".slide-frame-content");
    const overlay = slide.querySelector(".slide-content-overlay");
    if (!content?.classList.contains("slide-frame-content--live-paged") && !overlay) return;
    const safe = Math.min(Math.max(contentPageIndex, 0), pageCountRef.current - 1);
    setLiveSlidePage(slide, safe);
  }, [contentPageIndex, enabled, slideRef]);
}
