import type { SlideRecord } from "./slideMarkup";
import { buildSectionJumps } from "./sectionNav";

export type PhaseJump = {
  id: string;
  tag: string;
  label: string;
  slideIndex: number;
};

/** Phase overview slides inside Section 7 (content slides, not section dividers). */
export function buildDeepLearningPhaseJumps(slides: SlideRecord[]): PhaseJump[] {
  const jumps = buildSectionJumps(slides);
  const section7 = jumps.find((j) => j.tag === "Section 7");
  const section8 = jumps.find((j) => j.tag === "Section 8");
  if (!section7 || !section8) return [];

  const phases: PhaseJump[] = [];
  for (let i = section7.slideIndex; i < section8.slideIndex; i += 1) {
    const title = String(slides[i]?.title || "");
    const phaseMatch = title.match(/^Phase\s+(\d+):\s*(.+)$/i);
    if (!phaseMatch) continue;
    phases.push({
      id: `dl-phase-${phaseMatch[1]}`,
      tag: `Phase ${phaseMatch[1]}`,
      label: phaseMatch[2].trim(),
      slideIndex: i,
    });
  }
  return phases;
}
