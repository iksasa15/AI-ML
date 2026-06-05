import type { SlideIconId } from "./slideIconKeys";

export type BulletEntry = string | { text: string; icon?: SlideIconId | string };

export type NormalizedBullet = {
  text: string;
  icon?: SlideIconId | string;
};

export function normalizeBullet(entry: BulletEntry): NormalizedBullet {
  if (typeof entry === "string") return { text: entry };
  return {
    text: String(entry.text ?? ""),
    icon: entry.icon,
  };
}

export function normalizeBullets(entries: unknown[] | undefined): NormalizedBullet[] {
  if (!Array.isArray(entries)) return [];
  return entries.map((entry) => normalizeBullet(entry as BulletEntry));
}

export function bulletTexts(entries: unknown[] | undefined): string[] {
  return normalizeBullets(entries).map((b) => b.text);
}

export function bulletIcons(entries: unknown[] | undefined): (string | undefined)[] {
  return normalizeBullets(entries).map((b) => b.icon);
}
