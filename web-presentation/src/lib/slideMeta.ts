import { getActiveSectionLabel, type SlideRecord } from "./slideMarkup";

export function countSlidesInSection(slides: SlideRecord[], dividerIndex: number): number {
  let count = 0;
  for (let i = dividerIndex + 1; i < slides.length; i += 1) {
    if (slides[i].type === "section-divider") break;
    count += 1;
  }
  return count;
}

export function estimateSectionMinutes(slideCount: number): number {
  return Math.max(15, Math.round(slideCount * 1.6));
}

function parseSectionNumber(tag: string): number | null {
  const match = tag.match(/Section\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

/** Eyebrow label for section dividers — e.g. WEEK 2 · SESSION 1 */
export function getDividerEyebrow(slide: SlideRecord): string {
  const title = String(slide.title || "");
  if (/^Phase\s+\d+/i.test(title)) {
    return title.toUpperCase();
  }

  const sectionNum = parseSectionNumber(title);
  if (!sectionNum) return "OVERVIEW";

  if (sectionNum <= 6) return `WEEK 1 · SESSION ${sectionNum}`;
  if (sectionNum === 7) return "WEEK 2 · SESSION 1";
  if (sectionNum <= 12) return `WEEK 3 · SESSION ${sectionNum - 7}`;
  if (sectionNum <= 14) return `WEEK 4 · SESSION ${sectionNum - 12}`;
  return `WEEK 5 · SESSION ${sectionNum - 14}`;
}

/** Split subtitle into display lines for the divider hero */
export function getDividerTitleLines(slide: SlideRecord): string[] {
  const subtitle = String(slide.subtitle || slide.title || "");
  if (!subtitle) return ["Untitled Section"];

  const parts = subtitle
    .split(/\s+(?:and|&)\s+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2 && parts.every((p) => p.length < 48)) {
    return parts;
  }

  const emDash = subtitle.split(/\s*—\s*/);
  if (emDash.length >= 2 && emDash.every((p) => p.length < 48)) {
    return emDash.map((p) => p.trim());
  }

  return [subtitle];
}

export function getActiveSectionTag(slides: SlideRecord[], slideIndex: number): string {
  for (let i = slideIndex; i >= 0; i -= 1) {
    const slide = slides[i];
    if (slide?.type === "section-divider") {
      return String(slide.title || "Section");
    }
  }
  return "Overview";
}

function weekLabelFromTag(tag: string): string | null {
  const sectionNum = parseSectionNumber(tag);
  if (!sectionNum) return null;
  if (sectionNum <= 6) return "Week 1";
  if (sectionNum === 7) return "Week 2";
  if (sectionNum <= 12) return "Week 3";
  if (sectionNum <= 14) return "Week 4";
  return "Week 5";
}

function shortenSectionLabel(label: string): string {
  const first = label.split(/\s+(?:and|&)\s+/i)[0]?.trim() || label;
  const em = first.split(/\s*—\s*/)[0]?.trim() || first;
  if (em.length > 42) return `${em.slice(0, 39)}…`;
  return em;
}

/** Top nav context — e.g. "Week 2 · Deep Learning" */
export function getNavContextLabel(slides: SlideRecord[], slideIndex: number): string {
  const tag = getActiveSectionTag(slides, slideIndex);
  const label = shortenSectionLabel(getActiveSectionLabel(slides, slideIndex));

  if (/^Phase\s+\d+/i.test(tag)) {
    return `${tag} · ${label}`;
  }

  const week = weekLabelFromTag(tag);
  if (!week) return label;
  return `${week} · ${label}`;
}
