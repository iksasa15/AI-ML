import type { SlideRecord } from "./slideMarkup";

export type SectionJump = {
  id: string;
  label: string;
  /** تسمية قصيرة للجدول (مثل Section 1) */
  tag: string;
  slideIndex: number;
};

/** فهرس الأقسام: مقدمة (قبل أول فاصل) + كل شريحة section-divider */
export function buildSectionJumps(slides: SlideRecord[]): SectionJump[] {
  const jumps: SectionJump[] = [];
  const firstDividerIdx = slides.findIndex((s) => s.type === "section-divider");

  if (firstDividerIdx > 0) {
    jumps.push({
      id: "intro",
      label: "جدول المحتوى والخطة الزمنية",
      tag: "مقدمة",
      slideIndex: 0,
    });
  }

  slides.forEach((s, i) => {
    if (s.type === "section-divider") {
      jumps.push({
        id: `section-${i}`,
        label: String(s.subtitle || s.title || `قسم ${jumps.length + 1}`),
        tag: String(s.title || ""),
        slideIndex: i,
      });
    }
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
