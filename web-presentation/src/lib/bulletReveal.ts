import { bulletTexts, normalizeBullets } from "./bulletItems";
import { isDeckDivider } from "./slideDividers";
import type { SlideRecord } from "./slideMarkup";
import type { DeckScope } from "./traineeProgress";

const STORAGE_PREFIX = "ml-presentation-bullet-reveal";

export type BulletGroup = {
  id: string;
  items: string[];
  icons?: (string | undefined)[];
  className?: string;
};

function storageKey(scope: DeckScope): string {
  return `${STORAGE_PREFIX}:${scope}`;
}

function slideKey(slide: SlideRecord, slideIndex: number): string {
  const title = String(slide.title || `slide-${slideIndex}`);
  return `${slideIndex}:${title}`;
}

function groupFromBullets(
  id: string,
  bullets: unknown[] | undefined,
  className?: string
): BulletGroup | null {
  const normalized = normalizeBullets(bullets);
  if (!normalized.length) return null;
  return {
    id,
    items: normalized.map((b) => b.text),
    icons: normalized.map((b) => b.icon),
    className,
  };
}

export function getSlideBulletGroups(slide: SlideRecord): BulletGroup[] {
  if (!slide || isDeckDivider(slide)) return [];

  const groups: BulletGroup[] = [];

  const main = groupFromBullets("main", slide.bullets as unknown[] | undefined);
  if (main) groups.push(main);

  if (slide.type === "three-columns") {
    const columns = (slide.columns || []) as Array<{ heading?: string; bullets?: unknown[] }>;
    columns.forEach((col, index) => {
      const group = groupFromBullets(
        `col-${index}`,
        col.bullets,
        "slide-bullet-list slide-bullet-list--compact"
      );
      if (group) groups.push(group);
    });
    return groups;
  }

  const sections = (slide.sections || []) as Array<{ heading?: string; bullets?: unknown[] }>;
  sections.forEach((section, index) => {
    const group = groupFromBullets(
      `sec-${index}`,
      section.bullets,
      "slide-bullet-list slide-bullet-list--compact"
    );
    if (group) groups.push(group);
  });

  return groups;
}

export function countSlideBullets(slide: SlideRecord | undefined): number {
  if (!slide) return 0;
  return getSlideBulletGroups(slide).reduce((sum, group) => sum + group.items.length, 0);
}

/** Legacy helper — flat string list for callers that only need text */
export function getSlideBulletTexts(slide: SlideRecord): string[] {
  return bulletTexts(slide.bullets as unknown[] | undefined);
}

function readAll(scope: DeckScope): Record<string, number> {
  try {
    const raw = localStorage.getItem(storageKey(scope));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function readBulletReveal(
  scope: DeckScope,
  slide: SlideRecord,
  slideIndex: number
): number {
  const map = readAll(scope);
  const key = slideKey(slide, slideIndex);
  const value = map[key];
  return typeof value === "number" ? Math.max(0, value) : 0;
}

export function writeBulletReveal(
  scope: DeckScope,
  slide: SlideRecord,
  slideIndex: number,
  revealed: number
) {
  try {
    const map = readAll(scope);
    map[slideKey(slide, slideIndex)] = Math.max(0, revealed);
    localStorage.setItem(storageKey(scope), JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function clearBulletReveal(scope: DeckScope, slide: SlideRecord, slideIndex: number) {
  try {
    const map = readAll(scope);
    delete map[slideKey(slide, slideIndex)];
    localStorage.setItem(storageKey(scope), JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

/** Map flat reveal index to per-group visible counts */
export function getVisibleCounts(groups: BulletGroup[], revealedTotal: number): number[] {
  let remaining = revealedTotal;
  return groups.map((group) => {
    const visible = Math.min(group.items.length, remaining);
    remaining -= visible;
    return visible;
  });
}
