import type { DeckScope } from "./traineeProgress";

export type QuizSectionResult = {
  sectionId: number;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
};

export type QuizResultsStore = Record<string, QuizSectionResult>;

const STORAGE_PREFIX = "ml-presentation-quiz-results";

function storageKey(scope: DeckScope): string {
  return `${STORAGE_PREFIX}:${scope}`;
}

export function readQuizResults(scope: DeckScope): QuizResultsStore {
  try {
    const raw = localStorage.getItem(storageKey(scope));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as QuizResultsStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveQuizResult(scope: DeckScope, result: QuizSectionResult) {
  try {
    const store = readQuizResults(scope);
    store[String(result.sectionId)] = result;
    localStorage.setItem(storageKey(scope), JSON.stringify(store));
    return store;
  } catch {
    return null;
  }
}

export function getQuizResult(scope: DeckScope, sectionId: number): QuizSectionResult | null {
  const store = readQuizResults(scope);
  return store[String(sectionId)] ?? null;
}

export function isQuizCompleted(scope: DeckScope, sectionId: number): boolean {
  return getQuizResult(scope, sectionId) !== null;
}

export function resetQuizResults(scope: DeckScope) {
  try {
    localStorage.removeItem(storageKey(scope));
  } catch {
    /* ignore */
  }
}

export function getQuizSummary(scope: DeckScope, sectionIds: number[]) {
  const store = readQuizResults(scope);
  let completed = 0;
  let totalScore = 0;
  let totalQuestions = 0;

  for (const id of sectionIds) {
    const r = store[String(id)];
    if (!r) continue;
    completed += 1;
    totalScore += r.score;
    totalQuestions += r.total;
  }

  const averagePercent =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  return {
    completedSections: completed,
    totalSections: sectionIds.length,
    averagePercent,
    totalScore,
    totalQuestions,
  };
}
