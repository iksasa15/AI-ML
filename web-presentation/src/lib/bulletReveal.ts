import type { SlideRecord } from "./slideMarkup";
import type { DeckScope } from "./traineeProgress";

const STORAGE_PREFIX = "ml-presentation-bullet-reveal";

export type BulletGroup = {
  id: string;
  items: string[];
  className?: string;
};

function storageKey(scope: DeckScope): string {
  return `${STORAGE_PREFIX}:${scope}`;
}

function slideKey(slide: SlideRecord, slideIndex: number): string {
  const title = String(slide.title || `slide-${slideIndex}`);
  return `${slideIndex}:${title}`;
}

export function getSlideBulletGroups(slide: SlideRecord): BulletGroup[] {
  if (!slide || slide.type === "section-divider") return [];

  const groups: BulletGroup[] = [];

  const main = (slide.bullets || []) as string[];
  if (main.length) {
    groups.push({ id: "main", items: main });
  }

  if (slide.type === "three-columns") {
    const columns = (slide.columns || []) as Array<{ heading?: string; bullets?: string[] }>;
    columns.forEach((col, index) => {
      const items = col.bullets || [];
      if (items.length) {
        groups.push({
          id: `col-${index}`,
          items,
          className: "slide-bullet-list slide-bullet-list--compact",
        });
      }
    });
    return groups;
  }

  const sections = (slide.sections || []) as Array<{ heading?: string; bullets?: string[] }>;
  sections.forEach((section, index) => {
    const items = section.bullets || [];
    if (items.length) {
      groups.push({
        id: `sec-${index}`,
        items,
        className: "slide-bullet-list slide-bullet-list--compact",
      });
    }
  });

  return groups;
}

export function countSlideBullets(slide: SlideRecord | undefined): number {
  if (!slide) return 0;
  return getSlideBulletGroups(slide).reduce((sum, group) => sum + group.items.length, 0);
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
