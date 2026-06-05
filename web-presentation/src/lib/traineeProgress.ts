export type DeckScope = "all" | "day1";

export type TraineeProgressRecord = {
  maxReachedIndex: number;
  updatedAt: string;
};

const STORAGE_PREFIX = "ml-presentation-trainee-progress";

function storageKey(scope: DeckScope): string {
  return `${STORAGE_PREFIX}:${scope}`;
}

export function readTraineeProgress(scope: DeckScope): TraineeProgressRecord {
  try {
    const raw = localStorage.getItem(storageKey(scope));
    if (!raw) return { maxReachedIndex: 0, updatedAt: new Date().toISOString() };
    const parsed = JSON.parse(raw) as TraineeProgressRecord;
    if (typeof parsed.maxReachedIndex !== "number") {
      return { maxReachedIndex: 0, updatedAt: new Date().toISOString() };
    }
    return parsed;
  } catch {
    return { maxReachedIndex: 0, updatedAt: new Date().toISOString() };
  }
}

export function writeTraineeProgress(scope: DeckScope, maxReachedIndex: number) {
  try {
    const record: TraineeProgressRecord = {
      maxReachedIndex: Math.max(0, maxReachedIndex),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(storageKey(scope), JSON.stringify(record));
    return record;
  } catch {
    return null;
  }
}

export function resetTraineeProgress(scope: DeckScope) {
  try {
    localStorage.removeItem(storageKey(scope));
  } catch {
    /* ignore */
  }
}

export function bumpTraineeProgress(scope: DeckScope, currentIndex: number): TraineeProgressRecord {
  const existing = readTraineeProgress(scope);
  if (currentIndex <= existing.maxReachedIndex) return existing;
  return writeTraineeProgress(scope, currentIndex) ?? existing;
}

export function traineeDeckPercent(maxReachedIndex: number, totalSlides: number): number {
  if (!totalSlides) return 0;
  return Math.round(((maxReachedIndex + 1) / totalSlides) * 100);
}
