import type { SlideRecord } from "./slideMarkup";

export const DECK_DIVIDER_TYPES = new Set(["section-divider", "chapter-divider"]);

export function isDeckDivider(slide: SlideRecord | undefined): boolean {
  if (!slide?.type) return false;
  return DECK_DIVIDER_TYPES.has(String(slide.type));
}

export function isChapterDivider(slide: SlideRecord | undefined): boolean {
  return slide?.type === "chapter-divider";
}

export function isSectionDividerSlide(slide: SlideRecord | undefined): boolean {
  return slide?.type === "section-divider";
}

export function parseChapterNumber(slide: SlideRecord): number | null {
  if (!isChapterDivider(slide)) return null;
  if (typeof slide.chapterId === "number" && slide.chapterId > 0) {
    return slide.chapterId;
  }
  const title = String(slide.title || "");
  const match = title.match(/Chapter\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function getDividerTopicsFromSlide(slide: SlideRecord): string[] {
  if (Array.isArray(slide.topics)) {
    return slide.topics.map((t) => String(t)).filter(Boolean);
  }
  return [];
}
