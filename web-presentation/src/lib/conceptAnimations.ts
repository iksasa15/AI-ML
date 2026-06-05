import type { SlideRecord } from "./slideMarkup";

export type ConceptAnimationId = "gradient-descent" | "neural-network" | "attention-heatmap";

const TITLE_MAP: Record<string, ConceptAnimationId> = {
  "Ordinary Least Squares (OLS)": "gradient-descent",
  "Forward Propagation: The Engine of Inference": "neural-network",
  "Self-Attention, Q/K/V, and Multi-Head": "attention-heatmap",
};

export function getConceptAnimationId(slide: SlideRecord | undefined): ConceptAnimationId | null {
  if (!slide) return null;
  if (typeof slide.conceptAnimation === "string") {
    const id = slide.conceptAnimation as ConceptAnimationId;
    if (id === "gradient-descent" || id === "neural-network" || id === "attention-heatmap") {
      return id;
    }
  }
  const title = String(slide.title || "");
  return TITLE_MAP[title] ?? null;
}
