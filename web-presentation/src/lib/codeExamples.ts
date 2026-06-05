import { codeExamples } from "../data/codeExamples.js";
import type { SlideRecord } from "./slideMarkup";

export type CodeExample = {
  id: string;
  sectionTag: string;
  anchorTitle: string;
  title: string;
  language: string;
  code: string;
};

const EXAMPLES = codeExamples as CodeExample[];

const byId = new Map(EXAMPLES.map((e) => [e.id, e]));
const byAnchor = new Map(EXAMPLES.map((e) => [e.anchorTitle, e]));

export function getAllCodeExamples(): CodeExample[] {
  return EXAMPLES;
}

export function getCodeExampleById(id: string): CodeExample | null {
  return byId.get(id) ?? null;
}

/** Resolve live-code lab for the current slide */
export function getCodeExampleForSlide(slide: SlideRecord | undefined): CodeExample | null {
  if (!slide) return null;

  if (typeof slide.codeExampleId === "string") {
    const match = byId.get(slide.codeExampleId);
    if (match) return match;
  }

  const title = String(slide.title || "");
  const anchorMatch = byAnchor.get(title);
  if (anchorMatch) return anchorMatch;

  if (slide.type === "live-code" && typeof slide.code === "string") {
    return {
      id: "inline",
      sectionTag: "",
      anchorTitle: title,
      title: String(slide.subtitle || "Live Code"),
      language: typeof slide.language === "string" ? slide.language : "python",
      code: slide.code,
    };
  }

  return null;
}
