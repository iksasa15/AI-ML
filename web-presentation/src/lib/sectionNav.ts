import type { SlideRecord } from "./slideMarkup";

export type SectionJump = {
  id: string;
  label: string;
  /** تسمية قصيرة للجدول (مثل Section 1) */
  tag: string;
  slideIndex: number;
};

export type SectionNavItem = SectionJump & {
  slideCount: number;
  endIndex: number;
  completionPercent: number;
};

/** فواصل فرعية داخل قسم Deep Learning — تُعرض كشرائح لكن لا تُدرَج في جدول الأقسام */
const OUTLINE_EXCLUDED_DIVIDER_TITLES = new Set(["Phase 1", "Phase 2", "Phase 3", "Phase 4"]);

/** فهرس الأقسام: مقدمة (قبل أول فاصل) + كل شريحة section-divider (ما عدا الفواصل المستبعدة) */
export function buildSectionJumps(slides: SlideRecord[]): SectionJump[] {
  const jumps: SectionJump[] = [];
  const firstDividerIdx = slides.findIndex((s) => {
    if (s.type !== "section-divider") return false;
    const t = String(s.title || "");
    return !OUTLINE_EXCLUDED_DIVIDER_TITLES.has(t);
  });

  if (firstDividerIdx > 0) {
    jumps.push({
      id: "intro",
      label: "مقدمة وأساسيات الذكاء الاصطناعي",
      tag: "مقدمة",
      slideIndex: 0,
    });
  }

  slides.forEach((s, i) => {
    if (s.type !== "section-divider") return;
    const t = String(s.title || "");
    if (OUTLINE_EXCLUDED_DIVIDER_TITLES.has(t)) return;
    jumps.push({
      id: `section-${i}`,
      label: String(s.subtitle || s.title || `قسم ${jumps.length + 1}`),
      tag: String(s.title || ""),
      slideIndex: i,
    });
  });

  return jumps;
}

export function getActiveSectionJumpId(jumps: SectionJump[], currentIndex: number): string | null {
  if (jumps.length === 0) return null;
  let active = jumps[0].id;
  for (const j of jumps) {
    if (j.slideIndex <= currentIndex) active = j.id;
    else break;
  }
  return active;
}

export function buildSectionNavItems(
  slides: SlideRecord[],
  jumps: SectionJump[],
  maxReachedIndex: number
): SectionNavItem[] {
  return jumps.map((jump, index) => {
    const nextJump = jumps[index + 1];
    const endIndex = nextJump ? nextJump.slideIndex - 1 : slides.length - 1;
    const slideCount = Math.max(0, endIndex - jump.slideIndex + 1);

    let completed = 0;
    if (maxReachedIndex >= endIndex) {
      completed = slideCount;
    } else if (maxReachedIndex >= jump.slideIndex) {
      completed = maxReachedIndex - jump.slideIndex + 1;
    }

    const completionPercent = slideCount
      ? Math.min(100, Math.round((completed / slideCount) * 100))
      : 0;

    return {
      ...jump,
      slideCount,
      endIndex,
      completionPercent,
    };
  });
}
