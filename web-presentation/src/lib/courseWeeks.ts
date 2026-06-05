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
    color: "#EFF6FF",
    colorDark: "#2563EB",
  },
  {
    id: 2,
    label: "Week 2",
    days: 5,
    theme: "Deep Learning",
    topic: "Neural networks, CNNs, RNNs, optimization",
    sections: "S7",
    color: "#DBEAFE",
    colorDark: "#1D4ED8",
  },
  {
    id: 3,
    label: "Week 3",
    days: 5,
    theme: "NLP",
    topic: "Tokenization, language models, embeddings, Seq2Seq",
    sections: "S8 – S12",
    color: "#BFDBFE",
    colorDark: "#1E40AF",
  },
  {
    id: 4,
    label: "Week 4",
    days: 5,
    theme: "GenAI",
    topic: "BERT, GPT, LLMs, RAG & MLOps",
    sections: "S13 – S16",
    color: "#93C5FD",
    colorDark: "#1E3A8A",
  },
];
