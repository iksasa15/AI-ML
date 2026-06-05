import type { SlideRecord } from "./slideMarkup";

type BookendContent = {
  bigPictureFocus: string;
  takeaways: [string, string, string];
  reflectionQuestion: string;
  speakerNoteBig: string;
  speakerNoteTakeaway: string;
};

const BOOKENDS: Record<number, BookendContent> = {
  1: {
    bigPictureFocus: "Build the end-to-end ML workflow: clean data → train → evaluate.",
    takeaways: [
      "Always split data before touching the model — test set simulates production.",
      "Feature scaling matters for distance- and gradient-based algorithms.",
      "Preprocessing choices persist through the entire pipeline.",
    ],
    reflectionQuestion: "Which preprocessing step would break your model if skipped?",
    speakerNoteBig: "Orient trainees: Week 1 starts here. Everything later assumes solid data hygiene.",
    speakerNoteTakeaway: "Ask one trainee to name a project where bad splits caused overfitting.",
  },
  2: {
    bigPictureFocus: "Learn how models quantify relationships and when linear assumptions hold.",
    takeaways: [
      "R² measures explained variance — not accuracy or causation.",
      "OLS minimizes squared errors; outliers can dominate the fit.",
      "Regularization (Ridge/Lasso) trades bias for stable coefficients.",
    ],
    reflectionQuestion: "When would a linear model be misleading even with high R²?",
    speakerNoteBig: "Connect regression to business KPIs — prediction vs explanation.",
    speakerNoteTakeaway: "Tie Ridge/Lasso to feature selection intuition.",
  },
  3: {
    bigPictureFocus: "Move from continuous targets to discrete decisions with calibrated probabilities.",
    takeaways: [
      "Logistic regression outputs probabilities — pick thresholds for the business cost.",
      "K-NN is lazy learning: performance depends on scale and dimensionality.",
      "Confusion matrix beats accuracy on imbalanced data.",
    ],
    reflectionQuestion: "What threshold minimizes cost for your use case?",
    speakerNoteBig: "Week 2 classification arc begins — link to fraud, churn, medical screening.",
    speakerNoteTakeaway: "Have trainees sketch a confusion matrix for a real scenario.",
  },
  4: {
    bigPictureFocus: "Combine probabilistic models with interpretable tree ensembles.",
    takeaways: [
      "Naive Bayes assumes feature independence — fast baseline for text.",
      "Decision trees overfit; Random Forests reduce variance via bagging.",
      "Precision/recall/F1 reflect different failure costs.",
    ],
    reflectionQuestion: "When is interpretability worth more than a few points of AUC?",
    speakerNoteBig: "Contrast generative vs discriminative views briefly.",
    speakerNoteTakeaway: "Preview how trees become building blocks for boosting later.",
  },
  5: {
    bigPictureFocus: "Find optimal margins and lift linear boundaries with kernels.",
    takeaways: [
      "SVM maximizes margin — support vectors define the boundary.",
      "Kernel trick maps features implicitly to higher dimensions.",
      "SVMs shine on medium data with clear margin structure.",
    ],
    reflectionQuestion: "Why might an RBF kernel overfit on tiny datasets?",
    speakerNoteBig: "Position SVM as the bridge between classical ML and kernel methods.",
    speakerNoteTakeaway: "Compare linear SVM vs logistic regression decision surfaces.",
  },
  6: {
    bigPictureFocus: "Discover structure without labels and compress high-dimensional views.",
    takeaways: [
      "Clustering needs domain sense — algorithms optimize geometry, not meaning.",
      "PCA finds variance directions; scale features before applying it.",
      "Elbow/silhouette guide k — always validate clusters qualitatively.",
    ],
    reflectionQuestion: "How would you validate clusters with no ground truth?",
    speakerNoteBig: "Unsupervised skills feed feature engineering for supervised models.",
    speakerNoteTakeaway: "Connect PCA to visualization and noise reduction.",
  },
  7: {
    bigPictureFocus: "Stack layers to learn hierarchical representations from data.",
    takeaways: [
      "Neural nets learn features — depth helps but needs regularization.",
      "Activations + initialization control gradient flow.",
      "CNNs for grids, RNNs for sequences — match architecture to structure.",
    ],
    reflectionQuestion: "What symptom tells you the network is underfitting vs overfitting?",
    speakerNoteBig: "Week 3 deep learning block — set expectation for labs and GPU optional.",
    speakerNoteTakeaway: "Emphasize train/val curves over single accuracy numbers.",
  },
  8: {
    bigPictureFocus: "Turn raw text into features models can consume reliably.",
    takeaways: [
      "Text is messy — normalization and tokenization choices stick.",
      "Bag-of-words is a baseline; context limits its power.",
      "Evaluation must match task: classification vs generation differ.",
    ],
    reflectionQuestion: "Which NLP preprocessing step is irreversible for your pipeline?",
    speakerNoteBig: "Open NLP arc — link to products trainees use (search, chatbots).",
    speakerNoteTakeaway: "Preview tokenization deep dive next session.",
  },
  9: {
    bigPictureFocus: "Master tokenization — the hidden interface between text and models.",
    takeaways: [
      "Subword tokenization balances OOV handling and vocabulary size.",
      "Sequence length affects memory — truncation has semantic cost.",
      "Tokenizer must match the pretrained model exactly.",
    ],
    reflectionQuestion: "How would a wrong tokenizer silently hurt retrieval quality?",
    speakerNoteBig: "Workshop tone — live demo if possible.",
    speakerNoteTakeaway: "Assign micro-task: compare BPE vs word-level on same sentence.",
  },
  10: {
    bigPictureFocus: "Model language as probability over sequences.",
    takeaways: [
      "N-grams are interpretable but sparse; smoothing is mandatory.",
      "Perplexity measures how surprised the model is by held-out text.",
      "Neural LMs scale better but need more data and compute.",
    ],
    reflectionQuestion: "Why does a trigram model fail on long-range dependencies?",
    speakerNoteBig: "Bridge classical LM to modern transformers mentally.",
    speakerNoteTakeaway: "Relate perplexity to product autocomplete quality.",
  },
  11: {
    bigPictureFocus: "Represent words in context and model sequences with memory.",
    takeaways: [
      "Static embeddings miss polysemy — contextual models fix this.",
      "RNNs compress history; vanishing gradients limit long context.",
      "Bidirectional context helps understanding, not generation.",
    ],
    reflectionQuestion: "When would you still pick an RNN over a Transformer?",
    speakerNoteBig: "Contextual embeddings unlock downstream gains — show one example.",
    speakerNoteTakeaway: "Set up attention as the next leap.",
  },
  12: {
    bigPictureFocus: "Translate and summarize with encoder–decoder sequence models.",
    takeaways: [
      "Seq2Seq maps variable input to variable output lengths.",
      "Teacher forcing trains faster but creates exposure bias.",
      "BLEU/ROUGE are proxies — human judgment still matters.",
    ],
    reflectionQuestion: "What failure mode does BLEU miss in fluent translations?",
    speakerNoteBig: "Connect MT to enterprise localization and chat summarization.",
    speakerNoteTakeaway: "Preview attention replacing fixed context vectors.",
  },
  13: {
    bigPictureFocus: "Pretrain at scale, fine-tune for tasks, generate with decoders.",
    takeaways: [
      "Encoder models understand; decoder models generate; seq2seq models both.",
      "Attention lets models focus on relevant context per token.",
      "Scaling laws trade compute for capability — plan responsibly.",
    ],
    reflectionQuestion: "Which GenAI risks matter most for your organization's data?",
    speakerNoteBig: "Capstone of Week 4 GenAI — tie BERT/T5/GPT to products.",
    speakerNoteTakeaway: "Point toward RAG as the production pattern next week.",
  },
  14: {
    bigPictureFocus: "Intensive Day 1 NLP workshop — from tokens to a mini pipeline.",
    takeaways: [
      "Reproducible notebooks beat one-off demos.",
      "Start with a baseline bag-of-words before transformers.",
      "Document data licenses and PII handling early.",
    ],
    reflectionQuestion: "What would you ship as a v0 NLP feature in one sprint?",
    speakerNoteBig: "Workshop pacing — labs over theory density.",
    speakerNoteTakeaway: "Collect blockers for office hours.",
  },
  15: {
    bigPictureFocus: "Ground LLM answers in your documents with retrieval-augmented generation.",
    takeaways: [
      "RAG = retrieve relevant chunks → augment prompt → generate answer.",
      "Chunking strategy and embeddings quality dominate retrieval recall.",
      "Evaluate faithfulness — models can still hallucinate with context.",
    ],
    reflectionQuestion: "What document boundary would cause harmful retrieval for your domain?",
    speakerNoteBig: "Week 5 opens — RAG is the default enterprise GenAI architecture.",
    speakerNoteTakeaway: "Demo: bad chunk vs good chunk on same question.",
  },
  16: {
    bigPictureFocus: "Ship models reliably: versioning, monitoring, and automated pipelines.",
    takeaways: [
      "MLOps connects code, data, and models with reproducible pipelines.",
      "Monitor drift — data and concept drift degrade silent production models.",
      "CI/CD for ML includes data validation, not just unit tests.",
    ],
    reflectionQuestion: "Which production incident would your current process miss?",
    speakerNoteBig: "Close the bootcamp arc — from notebook to owned service.",
    speakerNoteTakeaway: "Assign capstone: draw CI/CD for one model they trained.",
  },
};

export function getBigPictureSlide(sectionId: number): SlideRecord {
  const meta = BOOKENDS[sectionId];
  return {
    type: "big-picture",
    title: "Where Are We in the Bootcamp?",
    subtitle: meta?.bigPictureFocus ?? "Section overview",
    sectionId,
    speakerNote: meta?.speakerNoteBig ?? "Orient trainees on curriculum position.",
  };
}

export function getTakeawaySlide(sectionId: number): SlideRecord {
  const meta = BOOKENDS[sectionId];
  const texts = meta?.takeaways ?? ["Key idea 1", "Key idea 2", "Key idea 3"];
  return {
    type: "takeaway",
    title: "Section Takeaways",
    titleIcon: "idea",
    subtitle: `Section ${sectionId} — remember these`,
    bullets: [
      { text: texts[0], icon: "check" },
      { text: texts[1], icon: "idea" },
      { text: texts[2], icon: "target" },
    ],
    reflectionQuestion: meta?.reflectionQuestion ?? "What will you apply first?",
    speakerNote: meta?.speakerNoteTakeaway ?? "Pause for reflection before the quiz.",
  };
}

export function sectionDeckSpan(contentSlideCount: number): number {
  return 3 + contentSlideCount;
}
