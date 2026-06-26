import { slides as AI_INTRO_SLIDES } from "../data/slides/intro-ai-fundamentals.js";
import { DAY01_FIRST_SLIDE_TITLE } from "./day01Anchor";
import type { SlideRecord } from "./slideMarkup";

export const DECK_TITLE = "AI & Machine Learning Bootcamp";

export const INTRO_SLIDES: SlideRecord[] = [
  {
    type: "intro-hero",
    title: DECK_TITLE,
    subtitle: "20 Sessions × 2 Hours · Foundations → GenAI",
    speakerNote:
      "Let the title animation finish, then welcome trainees and set expectations for the 4-week arc.",
  },
  {
    type: "course-map",
    title: "Course Agenda",
    subtitle: "Interactive Roadmap",
    speakerNote:
      "Walk the four week cards — highlight where we are today and which sections map to each week.",
  },
  {
    type: "bootcamp-timeline",
    title: "Bootcamp Timeline",
    subtitle: "4-Week Arc",
    speakerNote:
      "Anchor the timeline: each week has a deliverable. Ask trainees which milestone they are most excited about.",
  },
  ...AI_INTRO_SLIDES,
];

export const CONCLUSION_SLIDE: SlideRecord = {
  title: "Conclusion",
  subtitle: "Key Takeaways",
  bullets: [
    "Good ML pipelines start with strong preprocessing and proper validation.",
    "Model choice depends on data structure, interpretability needs, and scale.",
    "For classification, evaluate with confusion matrix, precision, recall, and F1.",
    "For unsupervised tasks, combine clustering diagnostics with PCA-based interpretation.",
    "For deep learning, balance architecture power with regularization and validation discipline.",
    "For NLP, robust preprocessing and tokenization choices strongly shape model outcomes.",
    "Tokenizer design directly impacts OOV handling, sequence length, and model quality in NLP.",
    "For language modeling, probability estimation quality and perplexity tracking are critical.",
    "For sequence tasks, contextual representations and attention mechanisms are key drivers of quality.",
    "For MT/NLG, combine BLEU and ROUGE with qualitative semantic validation.",
    "For modern GenAI, balance architecture choice, scaling strategy, and compute efficiency.",
    "RAG grounds LLMs in your documents; MLOps ships and monitors models reliably.",
    "Use cross-validation and hyperparameter tuning for robust generalization.",
  ],
  note: "Thank you. Questions and discussion are welcome.",
  speakerNote:
    "Recap 3 bullets aloud, then open Q&A. Point trainees to quiz results and lab follow-ups.",
};

export type SectionDefinition = {
  id: number;
  /** Content slides in the section module (excludes divider, big-picture, takeaway). */
  contentSlideCount: number;
  divider: SlideRecord;
  importSlides: () => Promise<{ slides: SlideRecord[] }>;
};

function sectionSpan(contentSlideCount: number): number {
  return 3 + contentSlideCount;
}

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    id: 1,
    contentSlideCount: 18,
    divider: {
      type: "section-divider",
      title: "Section 1",
      subtitle: "Foundations and Data Pre-Processing",
      speakerNote:
        "Open Section 1: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section01-foundations.js"),
  },
  {
    id: 2,
    contentSlideCount: 35,
    divider: {
      type: "section-divider",
      title: "Section 2",
      subtitle: "Regression Models",
      speakerNote:
        "Open Section 2: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section02-regression.js"),
  },
  {
    id: 3,
    contentSlideCount: 11,
    divider: {
      type: "section-divider",
      title: "Section 3",
      subtitle: "Classification Basics",
      speakerNote:
        "Open Section 3: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section03-classification-intro.js"),
  },
  {
    id: 4,
    contentSlideCount: 12,
    divider: {
      type: "section-divider",
      title: "Section 4",
      subtitle: "Naive Bayes, Trees, and Evaluation",
      speakerNote:
        "Open Section 4: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section04-naive-bayes-trees.js"),
  },
  {
    id: 5,
    contentSlideCount: 9,
    divider: {
      type: "section-divider",
      title: "Section 5",
      subtitle: "SVM and Kernel Methods",
      speakerNote:
        "Open Section 5: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section05-svm.js"),
  },
  {
    id: 6,
    contentSlideCount: 9,
    divider: {
      type: "section-divider",
      title: "Section 6",
      subtitle: "Clustering and PCA",
      speakerNote:
        "Open Section 6: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section06-clustering-pca.js"),
  },
  {
    id: 7,
    contentSlideCount: 51,
    divider: {
      type: "section-divider",
      title: "Section 7",
      subtitle: "Deep Learning and Neural Networks",
      speakerNote:
        "Open Section 7: state learning goals, timing, and how it connects to prior sessions.",
    },
    importSlides: () => import("../data/slides/section07-deep-learning.js"),
  },
  {
    id: 8,
    contentSlideCount: 19,
    divider: {
      type: "section-divider",
      title: "Section 8",
      subtitle: "NLP Fundamentals & Text Cleaning",
      speakerNote:
        "Week 3 Session 1: NLP goals, regex, normalization, then hands-on text cleaning labs.",
    },
    importSlides: () => import("../data/slides/section08-nlp-fundamentals.js"),
  },
  {
    id: 9,
    contentSlideCount: 32,
    divider: {
      type: "section-divider",
      title: "Section 9",
      subtitle: "Tokenization Workshop & Labs",
      speakerNote:
        "Week 3 Session 2: tokenization theory, BPE, stop words, stemming — with NLTK/SpaCy labs.",
    },
    importSlides: () => import("../data/slides/section09-nlp-tokenization.js"),
  },
  {
    id: 10,
    contentSlideCount: 14,
    divider: {
      type: "section-divider",
      title: "Section 10",
      subtitle: "Text Analysis & NER Workshop",
      speakerNote:
        "Week 3 Session 3: POS, dependency, NER with SpaCy, then the product-review mini project.",
    },
    importSlides: () => import("../data/slides/section14-day01-nlp-intro.js"),
  },
  {
    id: 11,
    contentSlideCount: 15,
    divider: {
      type: "section-divider",
      title: "Section 11",
      subtitle: "NLP Language Modeling",
      speakerNote:
        "Week 3 Session 4: n-gram language modeling and perplexity.",
    },
    importSlides: () => import("../data/slides/section10-nlp-language-modeling.js"),
  },
  {
    id: 12,
    contentSlideCount: 10,
    divider: {
      type: "section-divider",
      title: "Section 12",
      subtitle: "NLP Contextual Embeddings and RNNs",
      speakerNote:
        "Week 3 Session 5: contextual embeddings and recurrent sequence models.",
    },
    importSlides: () => import("../data/slides/section11-nlp-contextual-rnn.js"),
  },
  {
    id: 13,
    contentSlideCount: 12,
    divider: {
      type: "section-divider",
      title: "Section 13",
      subtitle: "NLP Seq2Seq and NMT Evaluation",
      speakerNote:
        "Week 3 Session 6: Seq2Seq, attention, BLEU/ROUGE, transformer bridge to GenAI.",
    },
    importSlides: () => import("../data/slides/section12-nlp-seq2seq.js"),
  },
  {
    id: 14,
    contentSlideCount: 20,
    divider: {
      type: "section-divider",
      title: "Section 14",
      subtitle: "GenAI: BERT, T5, GPT, Attention",
      speakerNote:
        "Week 4 Session 1: BERT, T5, GPT, and the transformer scaling story.",
    },
    importSlides: () => import("../data/slides/section13-generative-ai.js"),
  },
  {
    id: 15,
    contentSlideCount: 12,
    divider: {
      type: "section-divider",
      title: "Section 15",
      subtitle: "RAG — Retrieval-Augmented Generation",
      speakerNote:
        "Open Section 15: RAG is the default pattern for enterprise GenAI — connect docs to LLMs safely.",
    },
    importSlides: () => import("../data/slides/section15-rag.js"),
  },
  {
    id: 16,
    contentSlideCount: 12,
    divider: {
      type: "section-divider",
      title: "Section 16",
      subtitle: "MLOps — Production ML Systems",
      speakerNote:
        "Open Section 16: close the loop from notebook experiments to owned, monitored services.",
    },
    importSlides: () => import("../data/slides/section16-mlops.js"),
  },
];

export const DAY01_ANCHOR_TITLE = DAY01_FIRST_SLIDE_TITLE;

export function computeTotalSlideCount(): number {
  const sectionSlides = SECTION_DEFINITIONS.reduce(
    (sum, s) => sum + sectionSpan(s.contentSlideCount),
    0
  );
  return INTRO_SLIDES.length + sectionSlides + 1;
}

export function computeSectionStartIndices(): Record<number, number> {
  const starts: Record<number, number> = {};
  let index = INTRO_SLIDES.length;
  for (const section of SECTION_DEFINITIONS) {
    starts[section.id] = index;
    index += sectionSpan(section.contentSlideCount);
  }
  return starts;
}

export function sectionIdForSlideIndex(index: number): number | null {
  if (index < INTRO_SLIDES.length) return null;
  const starts = computeSectionStartIndices();
  for (const section of SECTION_DEFINITIONS) {
    const start = starts[section.id];
    const end = start + sectionSpan(section.contentSlideCount) - 1;
    if (index >= start && index <= end) return section.id;
  }
  if (index === computeTotalSlideCount() - 1) return null;
  return null;
}
