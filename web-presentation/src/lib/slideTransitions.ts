import { getActiveSectionTag } from "./slideMeta";
import type { SlideRecord } from "./slideMarkup";

export type SlideTransitionKind = "slide" | "section" | "divider-wipe";

export function getSlideTransitionKind(
  slides: SlideRecord[],
  fromIndex: number,
  toIndex: number
): SlideTransitionKind {
  if (toIndex < 0 || toIndex >= slides.length) return "slide";

  const target = slides[toIndex];
  if (target?.type === "section-divider" || target?.type === "chapter-divider") return "divider-wipe";

  if (fromIndex < 0 || fromIndex >= slides.length) return "slide";

  const fromSection = getActiveSectionTag(slides, fromIndex);
  const toSection = getActiveSectionTag(slides, toIndex);
  if (fromSection !== toSection) return "section";

  return "slide";
}

export function transitionClassName(kind: SlideTransitionKind, entering: boolean): string {
  const base = `slide-transition-${kind === "divider-wipe" ? "divider" : kind}`;
  return entering ? `${base} is-entering` : base;
}
