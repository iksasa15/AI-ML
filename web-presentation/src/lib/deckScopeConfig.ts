import type { SlideRecord } from "./slideMarkup";
import { buildSectionJumps } from "./sectionNav";

export type DeckScope =
  | "all"
  | "day1"
  | "week1-ml"
  | "week2-dl"
  | "week3-nlp"
  | "week4-genai";

export const DECK_SCOPE_HASH: Record<DeckScope, string | null> = {
  all: null,
  day1: "#day1-nlp-slides",
  "week1-ml": "#week1-ml",
  "week2-dl": "#week2-dl",
  "week3-nlp": "#week3-nlp",
  "week4-genai": "#week4-genai",
};

const HASH_TO_SCOPE: Record<string, DeckScope> = Object.fromEntries(
  Object.entries(DECK_SCOPE_HASH)
    .filter(([, hash]) => hash)
    .map(([scope, hash]) => [hash as string, scope as DeckScope])
);

export const DECK_SCOPE_SECTION_IDS: Partial<Record<DeckScope, number[]>> = {
  "week1-ml": [1, 2, 3, 4, 5, 6],
  "week2-dl": [7],
  "week3-nlp": [8, 9, 10, 11, 12, 13],
  "week4-genai": [14, 15, 16],
};

export function deckScopeFromHash(hash: string): DeckScope {
  return HASH_TO_SCOPE[hash] ?? "all";
}

export function hashForDeckScope(scope: DeckScope): string | null {
  return DECK_SCOPE_HASH[scope];
}

function sliceSectionBlocks(
  allSlides: SlideRecord[],
  sectionIds: number[],
  includeIntro: boolean
): SlideRecord[] {
  const jumps = buildSectionJumps(allSlides);
  const out: SlideRecord[] = [];

  if (includeIntro && jumps.length > 0) {
    const firstSection = jumps.find((j) => j.tag.startsWith("Section"));
    const introEnd = firstSection ? firstSection.slideIndex - 1 : 2;
    if (introEnd >= 0) {
      out.push(...allSlides.slice(0, introEnd + 1));
    }
  }

  for (const sectionId of sectionIds) {
    const tag = `Section ${sectionId}`;
    const jumpIdx = jumps.findIndex((j) => j.tag === tag);
    if (jumpIdx < 0) continue;
    const start = jumps[jumpIdx].slideIndex;
    const end =
      jumpIdx + 1 < jumps.length
        ? jumps[jumpIdx + 1].slideIndex - 1
        : allSlides.length - 1;
    out.push(...allSlides.slice(start, end + 1));
  }

  return out;
}

export function filterSlidesForScope(
  allSlides: SlideRecord[],
  scope: DeckScope,
  day01Slides: SlideRecord[]
): SlideRecord[] {
  if (scope === "all") return allSlides;
  if (scope === "day1") return day01Slides;

  const sectionIds = DECK_SCOPE_SECTION_IDS[scope];
  if (!sectionIds?.length) return allSlides;

  const includeIntro = scope === "week1-ml";
  return sliceSectionBlocks(allSlides, sectionIds, includeIntro);
}

export function parseSectionIdFromJumpTag(tag: string): number | null {
  const match = tag.match(/Section\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}
