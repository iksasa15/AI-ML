import { presentationData } from "../data/presentationData.js";

function insertSlideBeforeTitle(targetTitle: string, newSlide: Record<string, unknown>) {
  const index = presentationData.slides.findIndex((slide) => slide.title === targetTitle);
  if (index !== -1) {
    presentationData.slides.splice(index, 0, newSlide);
  }
}

export function addPresentationStructure() {
  if (presentationData._structureAdded) return;

  presentationData.slides.unshift({
    title: "Course Agenda",
    subtitle: "Main Sections",
    bullets: [
      "Foundations and Data Pre-Processing",
      "Regression Models and Evaluation",
      "Classification Basics (Logistic Regression and K-NN)",
      "Naive Bayes, Decision Trees, and Random Forest",
      "SVM and Kernel Methods",
      "Clustering and PCA",
      "Deep Learning and Neural Networks",
      "Natural Language Processing (NLP)",
      "NLP Advanced Topics",
      "Generative AI Foundations",
    ],
    note: "Use the slide dots below to quickly jump across sections.",
  });

  presentationData.slides.splice(1, 0, {
    title: "Bootcamp Timeline (4 Weeks)",
    subtitle: "Month Plan Overview",
    table: {
      headers: ["Week", "Main Topics", "Output / Milestone"],
      rows: [
        [
          "Week 1",
          "ML foundations, data preprocessing, feature engineering, regression basics",
          "Clean data workflow + baseline regression models",
        ],
        [
          "Week 2",
          "Classification methods, evaluation metrics, Naive Bayes, Trees, Random Forest, SVM",
          "End-to-end classification pipeline and model comparison",
        ],
        [
          "Week 3",
          "Clustering, PCA, deep learning fundamentals, perceptron, activations, CNN/RNN intro",
          "Dimensionality reduction + first neural network experiments",
        ],
        [
          "Week 4",
          "NLP core and advanced topics, Seq2Seq, attention, BERT/T5/GPT/LLMs, transfer learning in GenAI",
          "Mini GenAI project + final presentation readiness",
        ],
      ],
    },
    note: "Suggested pacing: concept session + guided lab + practice task each day.",
  });

  insertSlideBeforeTitle("The Machine Learning Process", {
    type: "section-divider",
    title: "Section 1",
    subtitle: "Foundations and Data Pre-Processing",
  });

  insertSlideBeforeTitle("Regression - Simple Linear Regression", {
    type: "section-divider",
    title: "Section 2",
    subtitle: "Regression Models",
  });

  insertSlideBeforeTitle("Classification Overview", {
    type: "section-divider",
    title: "Section 3",
    subtitle: "Classification Basics",
  });

  insertSlideBeforeTitle("Naive Bayes: Bayes' Theorem", {
    type: "section-divider",
    title: "Section 4",
    subtitle: "Naive Bayes, Trees, and Evaluation",
  });

  insertSlideBeforeTitle("Support Vector Machine (SVM): Core Idea", {
    type: "section-divider",
    title: "Section 5",
    subtitle: "SVM and Kernel Methods",
  });

  insertSlideBeforeTitle("Clustering Overview", {
    type: "section-divider",
    title: "Section 6",
    subtitle: "Clustering and PCA",
  });

  insertSlideBeforeTitle("Deep Learning: Introduction", {
    type: "section-divider",
    title: "Section 7",
    subtitle: "Deep Learning and Neural Networks",
  });

  insertSlideBeforeTitle("NLP Fundamentals and Challenges", {
    type: "section-divider",
    title: "Section 8",
    subtitle: "Natural Language Processing (NLP)",
  });

  insertSlideBeforeTitle("NLP Tokenization Masterclass", {
    type: "section-divider",
    title: "Section 9",
    subtitle: "NLP Tokenization Workshop",
  });

  insertSlideBeforeTitle("NLP Language Modeling with N-grams", {
    type: "section-divider",
    title: "Section 10",
    subtitle: "NLP Language Modeling",
  });

  insertSlideBeforeTitle("NLP Contextualized Embeddings and RNNs", {
    type: "section-divider",
    title: "Section 11",
    subtitle: "NLP Contextual Embeddings and RNNs",
  });

  insertSlideBeforeTitle("NLP Seq2Seq for Neural Machine Translation", {
    type: "section-divider",
    title: "Section 12",
    subtitle: "NLP Seq2Seq and NMT Evaluation",
  });

  insertSlideBeforeTitle("Generative AI: Core Concepts", {
    type: "section-divider",
    title: "Section 13",
    subtitle: "GenAI: BERT, T5, GPT, Attention",
  });

  presentationData.slides.push({
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
      "Use cross-validation and hyperparameter tuning for robust generalization.",
    ],
    note: "Thank you. Questions and discussion are welcome.",
  });

  presentationData._structureAdded = true;
}
