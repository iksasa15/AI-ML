export type BootcampMapSection = {
  id: number;
  week: number;
  weekLabel: string;
  title: string;
  shortLabel: string;
};

/** Week groupings align with `getDividerEyebrow` / `getNavContextLabel` in slideMeta. */
export const BOOTCAMP_MAP_SECTIONS: BootcampMapSection[] = [
  { id: 1, week: 1, weekLabel: "Week 1", title: "Foundations & Preprocessing", shortLabel: "S1" },
  { id: 2, week: 1, weekLabel: "Week 1", title: "Regression Models", shortLabel: "S2" },
  { id: 3, week: 1, weekLabel: "Week 1", title: "Classification Basics", shortLabel: "S3" },
  { id: 4, week: 1, weekLabel: "Week 1", title: "Naive Bayes & Trees", shortLabel: "S4" },
  { id: 5, week: 1, weekLabel: "Week 1", title: "SVM & Kernels", shortLabel: "S5" },
  { id: 6, week: 1, weekLabel: "Week 1", title: "Clustering & PCA", shortLabel: "S6" },
  { id: 7, week: 2, weekLabel: "Week 2", title: "Deep Learning", shortLabel: "S7" },
  { id: 8, week: 3, weekLabel: "Week 3", title: "NLP Fundamentals", shortLabel: "S8" },
  { id: 9, week: 3, weekLabel: "Week 3", title: "Tokenization", shortLabel: "S9" },
  { id: 10, week: 3, weekLabel: "Week 3", title: "Language Modeling", shortLabel: "S10" },
  { id: 11, week: 3, weekLabel: "Week 3", title: "Embeddings & RNNs", shortLabel: "S11" },
  { id: 12, week: 3, weekLabel: "Week 3", title: "Seq2Seq & NMT", shortLabel: "S12" },
  { id: 13, week: 4, weekLabel: "Week 4", title: "Generative AI", shortLabel: "S13" },
  { id: 14, week: 4, weekLabel: "Week 4", title: "Day 1 NLP Workshop", shortLabel: "S14" },
  { id: 15, week: 5, weekLabel: "Week 5", title: "RAG Systems", shortLabel: "S15" },
  { id: 16, week: 5, weekLabel: "Week 5", title: "MLOps", shortLabel: "S16" },
];

export function getBootcampWeeks(): number[] {
  return [...new Set(BOOTCAMP_MAP_SECTIONS.map((s) => s.week))];
}
