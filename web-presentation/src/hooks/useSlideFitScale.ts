import { type RefObject, useLayoutEffect } from "react";
import { PPT_HEIGHT_PX, PPT_WIDTH_PX } from "../lib/slideCanvas";

function clearFitStyles(inner: HTMLElement | null, slide: HTMLElement | null) {
  if (inner) {
    inner.style.removeProperty("width");
    inner.style.removeProperty("height");
  }
  if (slide) {
    slide.style.removeProperty("transform");
    slide.style.removeProperty("transform-origin");
  }
}

export function useSlideFitScale(
  viewportRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
  slideRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  slideIndex: number,
  navHidden = false
) {
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const inner = innerRef.current;
    const slide = slideRef.current;

    if (!enabled || !viewport || !inner || !slide) {
      clearFitStyles(inner, slide);
      return;
    }

    const fit = () => {
      slide.style.transform = "none";
      inner.style.removeProperty("width");
      inner.style.removeProperty("height");

      const viewportWidth = viewport.clientWidth;
      const navEl = document.querySelector<HTMLElement>(".presentation.is-fullscreen .top-nav");
      const navHeight = navHidden ? 0 : (navEl?.getBoundingClientRect().height ?? 0);
      const viewportHeight = Math.max(viewport.clientHeight - navHeight, 0);
      const slideWidth = PPT_WIDTH_PX;
      const slideHeight = PPT_HEIGHT_PX;

      if (viewportWidth <= 0 || viewportHeight <= 0) {
        return;
      }

      const scale = Math.min(viewportWidth / slideWidth, viewportHeight / slideHeight);

      inner.style.width = `${viewportWidth}px`;
      inner.style.height = `${viewportHeight}px`;
      inner.style.display = "flex";
      inner.style.alignItems = "center";
      inner.style.justifyContent = "center";
      slide.style.width = `${slideWidth}px`;
      slide.style.height = `${slideHeight}px`;
      slide.style.flexShrink = "0";
      slide.style.transform = `scale(${scale})`;
      slide.style.transformOrigin = "center center";
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    observer.observe(slide);
    const navEl = document.querySelector<HTMLElement>(".presentation.is-fullscreen .top-nav");
    if (navEl) observer.observe(navEl);
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);

    const raf = window.requestAnimationFrame(fit);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", fit);
      document.removeEventListener("fullscreenchange", fit);
      clearFitStyles(inner, slide);
      inner.style.removeProperty("display");
      inner.style.removeProperty("align-items");
      inner.style.removeProperty("justify-content");
      slide.style.removeProperty("width");
      slide.style.removeProperty("height");
      slide.style.removeProperty("flex-shrink");
    };
  }, [enabled, slideIndex, navHidden, viewportRef, innerRef, slideRef]);
}
