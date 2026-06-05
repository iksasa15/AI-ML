import { quizQuestions } from "../data/quizData.js";
import type { SectionJump, SectionNavItem } from "./sectionNav";

export type QuizQuestion = {
  sectionId: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const QUESTIONS = quizQuestions as QuizQuestion[];

const bySection = new Map<number, QuizQuestion[]>();
for (const q of QUESTIONS) {
  const list = bySection.get(q.sectionId) ?? [];
  list.push(q);
  bySection.set(q.sectionId, list);
}

export function parseSectionId(tag: string): number | null {
  const match = tag.match(/Section\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function getQuizSectionIds(): number[] {
  return [...bySection.keys()].sort((a, b) => a - b);
}

export function getQuestionsForSection(sectionId: number): QuizQuestion[] {
  return bySection.get(sectionId) ?? [];
}

export function getSectionIdFromJump(jump: SectionJump | null): number | null {
  if (!jump) return null;
  return parseSectionId(jump.tag);
}

export function getActiveSectionNavItem(
  items: SectionNavItem[],
  activeJumpId: string | null
): SectionNavItem | null {
  if (!activeJumpId) return null;
  return items.find((item) => item.id === activeJumpId) ?? null;
}

export function isLastSlideInSection(
  currentIndex: number,
  activeItem: SectionNavItem | null
): boolean {
  if (!activeItem) return false;
  return currentIndex === activeItem.endIndex;
}

export function hasQuizForSection(sectionId: number | null): boolean {
  if (!sectionId) return false;
  return getQuestionsForSection(sectionId).length > 0;
}
