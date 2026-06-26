/** 4-week course map for intro slides (Day 11). */
export type CourseWeek = {
  id: number;
  label: string;
  days: number;
  theme: string;
  topic: string;
  sections: string;
  color: string;
  colorDark: string;
};

export const COURSE_WEEKS: CourseWeek[] = [
  {
    id: 1,
    label: "Week 1",
    days: 5,
    theme: "ML Core",
    topic: "Foundations, regression, classification, trees & SVM",
    sections: "S1 – S6",
    color: "#f3effa",
    colorDark: "#5234b7",
  },
  {
    id: 2,
    label: "Week 2",
    days: 5,
    theme: "Deep Learning",
    topic: "Neural networks, CNNs, RNNs, optimization",
    sections: "S7",
    color: "#ede6f8",
    colorDark: "#6b46c1",
  },
  {
    id: 3,
    label: "Week 3",
    days: 5,
    theme: "NLP",
    topic: "NLP: fundamentals → tokenization → analysis → LM → embeddings → Seq2Seq (S8–S13)",
    sections: "S8 – S13",
    color: "#e8dff5",
    colorDark: "#7c3aed",
  },
  {
    id: 4,
    label: "Week 4",
    days: 5,
    theme: "GenAI",
    topic: "BERT, GPT, LLMs, RAG & MLOps",
    sections: "S14 – S16",
    color: "#e2d6f2",
    colorDark: "#9e59cd",
  },
];
