import type { SlideRecord } from "./slideMarkup";

export type SectionThemeGroup = "foundations" | "classical" | "deep" | "nlp" | "genai";

export type SectionTheme = {
  group: SectionThemeGroup;
  color: string;
  colorDark: string;
  colorGlow: string;
  label: string;
  meaning: string;
};

const THEMES: Record<SectionThemeGroup, SectionTheme> = {
  foundations: {
    group: "foundations",
    color: "#0D9488",
    colorDark: "#0F766E",
    colorGlow: "rgba(13, 148, 136, 0.35)",
    label: "Foundations",
    meaning: "Core",
  },
  classical: {
    group: "classical",
    color: "#2563EB",
    colorDark: "#1D4ED8",
    colorGlow: "rgba(37, 99, 235, 0.35)",
    label: "Classical ML",
    meaning: "Classic",
  },
  deep: {
    group: "deep",
    color: "#7C3AED",
    colorDark: "#6D28D9",
    colorGlow: "rgba(124, 58, 237, 0.35)",
    label: "Deep Learning",
    meaning: "Depth",
  },
  nlp: {
    group: "nlp",
    color: "#EA580C",
    colorDark: "#C2410C",
    colorGlow: "rgba(234, 88, 12, 0.35)",
    label: "NLP",
    meaning: "Language",
  },
  genai: {
    group: "genai",
    color: "#D97706",
    colorDark: "#B45309",
    colorGlow: "rgba(217, 119, 6, 0.35)",
    label: "GenAI",
    meaning: "Future",
  },
};

export function getSectionThemeGroup(sectionId: number): SectionThemeGroup {
  if (sectionId <= 2) return "foundations";
  if (sectionId <= 6) return "classical";
  if (sectionId === 7) return "deep";
  if (sectionId <= 12) return "nlp";
  return "genai";
}

export function getSectionTheme(sectionId: number): SectionTheme {
  return THEMES[getSectionThemeGroup(sectionId)];
}

/** Intro chapter cover themes (Pre-Week 1, before Section 1). */
export function getChapterTheme(chapterId: number): SectionTheme {
  const sectionByChapter: Record<number, number> = {
    1: 1,
    2: 1,
    3: 7,
    4: 14,
    5: 16,
  };
  return getSectionTheme(sectionByChapter[chapterId] ?? 1);
}

export function parseSectionIdFromDivider(slide: SlideRecord): number | null {
  if (typeof slide.sectionId === "number" && slide.sectionId > 0) {
    return slide.sectionId;
  }

  const title = String(slide.title || "");
  const sectionMatch = title.match(/Section\s+(\d+)/i);
  if (sectionMatch) return Number.parseInt(sectionMatch[1], 10);

  // Deep Learning in-deck phase dividers (Section 7)
  if (/^Phase\s+\d+/i.test(title)) return 7;

  return null;
}

export const SECTION_KEY_TOPICS: Record<number, string[]> = {
  1: ["Train/test splits", "Feature scaling", "Encoding & imputation", "Data leakage"],
  2: ["Linear regression", "OLS & R²", "Residual diagnostics", "Ridge / Lasso"],
  3: ["Logistic regression", "K-NN", "Decision boundaries", "Threshold tuning"],
  4: ["Naive Bayes", "Decision trees", "Random Forest", "Precision / recall / F1"],
  5: ["Margin maximization", "Kernel trick", "Support vectors", "Linear vs RBF"],
  6: ["K-Means", "Hierarchical clustering", "PCA", "Silhouette & elbow"],
  7: ["Perceptron & MLP", "Backpropagation", "CNNs", "RNNs & regularization"],
  8: ["NLP pipeline", "Text preprocessing", "Bag-of-words", "SpaCy & NLTK"],
  9: ["BPE", "WordPiece", "Subword tokenization", "Vocabulary trade-offs"],
  10: ["NER & POS", "SpaCy pipeline", "Dependency parsing", "Text analytics mini-project"],
  11: ["N-gram LMs", "Perplexity", "Smoothing", "Neural LMs intro"],
  12: ["Word embeddings", "Contextual vectors", "RNNs", "Attention preview"],
  13: ["Seq2Seq", "Machine translation", "BLEU / ROUGE", "Beam search"],
  14: ["Transformers", "BERT & GPT", "Fine-tuning", "LLM scaling"],
  15: ["Vector stores", "Chunking & retrieval", "Augmented prompts", "RAG evaluation"],
  16: ["CI/CD for ML", "Model registry", "Monitoring & drift", "Production serving"],
};

export function getSectionKeyTopics(sectionId: number): string[] {
  return SECTION_KEY_TOPICS[sectionId] ?? [];
}
