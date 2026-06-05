import type { SlideRecord } from "./slideMarkup";

export const CONCEPT_ANIMATION_IDS = [
  "gradient-descent",
  "neural-network",
  "attention-heatmap",
  "train-test-split",
  "feature-scaling",
  "encoding-comparison",
  "sigmoid-threshold",
  "kmeans-clustering",
  "decision-tree-split",
  "svm-margin",
  "pca-projection",
  "confusion-matrix",
  "tokenization-flow",
  "seq2seq-attention",
  "rag-pipeline",
  "mlops-lifecycle",
] as const;

export type ConceptAnimationId = (typeof CONCEPT_ANIMATION_IDS)[number];

const VALID = new Set<string>(CONCEPT_ANIMATION_IDS);

const TITLE_MAP: Record<string, ConceptAnimationId> = {
  "Ordinary Least Squares (OLS)": "gradient-descent",
  "Forward Propagation: The Engine of Inference": "neural-network",
  "Self-Attention, Q/K/V, and Multi-Head": "attention-heatmap",
  "Training Set & Test Set": "train-test-split",
  "Feature Scaling": "feature-scaling",
  "Categorical Data & Encoding": "encoding-comparison",
  "Logistic Regression": "sigmoid-threshold",
  "K-Means Clustering": "kmeans-clustering",
  "Decision Trees (CART)": "decision-tree-split",
  "Support Vector Machines": "svm-margin",
  "Principal Component Analysis (PCA)": "pca-projection",
  "Confusion Matrix & Metrics": "confusion-matrix",
  "Tokenization (BPE & WordPiece)": "tokenization-flow",
  "Sequence-to-Sequence & Attention": "seq2seq-attention",
  "Retrieval-Augmented Generation": "rag-pipeline",
  "MLOps Lifecycle": "mlops-lifecycle",
};

export function isConceptAnimationId(value: string): value is ConceptAnimationId {
  return VALID.has(value);
}

export function getConceptAnimationId(slide: SlideRecord | undefined): ConceptAnimationId | null {
  if (!slide) return null;
  if (typeof slide.conceptAnimation === "string" && isConceptAnimationId(slide.conceptAnimation)) {
    return slide.conceptAnimation;
  }
  const title = String(slide.title || "");
  return TITLE_MAP[title] ?? null;
}
