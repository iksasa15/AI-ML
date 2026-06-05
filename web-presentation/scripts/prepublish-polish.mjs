/**
 * Pre-publish polish: phase dividers, yellow slides, speaker notes, dedup titles.
 * Run: node scripts/prepublish-polish.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

const PHASE_CONTENT = {
  1: {
    title: "Phase 1: Foundations & Neural Core",
    subtitle: "Why depth, neurons, and forward pass",
    bullets: [
      { text: "Goal: understand what a neuron computes and why stacking layers enables hierarchical features.", icon: "neural-net" },
      { text: "Topics: perceptron, activations, MLP, forward propagation, and loss functions.", icon: "formula" },
      { text: "Exit check: explain z = w·x + b and why nonlinearity is required between layers.", icon: "check" },
    ],
    table: {
      title: "Phase 1 roadmap",
      headers: ["Block", "Question it answers"],
      rows: [
        ["Perceptron & MLP", "What does one layer compute?"],
        ["Forward pass", "How does inference flow through the graph?"],
        ["Loss & gradients", "What are we optimizing?"],
      ],
    },
    illustration: "neural-net",
    titleIcon: "neural-net",
    speakerNote:
      "Phase 1 (~45 min): Set expectations — we build intuition before scale. Start with the perceptron diagram, then one forward-pass walkthrough on the board. Ask: 'Why can't a single linear layer solve XOR?' Pause after the loss slide for a 1-minute pair discussion.",
  },
};

const YELLOW_ENRICHMENTS = {
  "The Machine Learning Process": {
    table: {
      title: "End-to-end ML checklist",
      headers: ["Stage", "Deliverable"],
      rows: [
        ["Preprocess", "Clean, scale, encode, split"],
        ["Model", "Train and validate"],
        ["Evaluate", "Metrics + deploy decision"],
      ],
    },
    note: "Use the three columns as your pacing guide — ~3 minutes per column.",
  },
  "Training Set & Test Set": {
    bullets: [
      { text: "Never tune hyperparameters on the test set — it becomes part of training indirectly.", icon: "warning" },
      { text: "Stratified splits preserve class balance in classification tasks.", icon: "classification" },
    ],
  },
  "Feature Scaling Methods": {
    bullets: [
      { text: "Normalization scales to [0, 1] using min–max — sensitive to outliers.", icon: "scaling" },
      { text: "Standardization uses mean 0 and std 1 — preferred when features are roughly Gaussian.", icon: "scaling" },
      { text: "Robust scaling uses median and IQR when outliers dominate.", icon: "missing-data" },
    ],
  },
  "Choosing the Right Scaling Method": {
    bullets: [
      { text: "Use standardization for SVM, logistic regression, PCA, and gradient-based training.", icon: "check" },
      { text: "Tree-based models are scale-invariant — scaling is optional.", icon: "tree" },
      { text: "When in doubt, fit the scaler on train only, then transform train and test.", icon: "train" },
    ],
  },
  "Why Is SL = 0.05 Common?": {
    bullets: [
      { text: "α = 0.05 implies a 5% false-positive rate under the null hypothesis.", icon: "probability" },
      { text: "It is a convention, not a law — adjust for domain risk (medical vs A/B tests).", icon: "warning" },
      { text: "Report effect size and confidence intervals alongside p-values.", icon: "metric" },
    ],
  },
  "Polynomial Regression Visual Explanation": {
    body: "Higher-degree polynomials can fit training noise — always validate with a hold-out set or cross-validation.",
    bullets: [
      { text: "Underfitting: degree too low — high bias.", icon: "regression" },
      { text: "Overfitting: degree too high — high variance.", icon: "warning" },
      { text: "Use validation curves to pick degree — not training error alone.", icon: "evaluate" },
    ],
  },
  "How Splitting Happens (MSE Criterion)": {
    bullets: [
      { text: "CART picks the split that maximally reduces MSE (regression) or Gini/entropy (classification).", icon: "tree" },
      { text: "Greedy splits are fast but not globally optimal.", icon: "idea" },
      { text: "Depth and min-samples-leaf control overfitting on small datasets.", icon: "regularization" },
    ],
  },
  "Ridge, Lasso, and Elastic Net": {
    bullets: [
      { text: "Ridge (L2): shrinks all coefficients — good when many features correlate.", icon: "regression" },
      { text: "Lasso (L1): can zero out coefficients — embedded feature selection.", icon: "feature" },
      { text: "Elastic Net blends L1 + L2 for correlated sparse settings.", icon: "compare" },
    ],
  },
  "Visual Comparison of Regression Models": {
    table: {
      title: "Model families at a glance",
      headers: ["Model", "Strength", "Watch out"],
      rows: [
        ["Linear / Ridge", "Interpretable, fast", "Nonlinear patterns"],
        ["SVR", "Margin-based, kernels", "Slow on huge data"],
        ["Tree / RF", "Nonlinear, little scaling", "Extrapolation"],
      ],
    },
  },
  "Logistic Regression: Strengths and Limits": {
    bullets: [
      { text: "Strength: calibrated probabilities and clear feature coefficients.", icon: "check" },
      { text: "Limit: linear decision boundary in feature space (use polynomials or other models for complex boundaries).", icon: "warning" },
    ],
  },
  "K-NN: Strengths and Limitations": {
    bullets: [
      { text: "Strength: no training phase — lazy learning, simple baseline.", icon: "check" },
      { text: "Limit: slow inference, curse of dimensionality, needs feature scaling.", icon: "warning" },
    ],
  },
  "How Splits Are Chosen in Classification Trees": {
    bullets: [
      { text: "Gini impurity and entropy measure node purity — lower is better.", icon: "tree" },
      { text: "Splits are chosen greedily to maximize information gain.", icon: "idea" },
    ],
  },
  "When to Use SVM / When Not": {
    bullets: [
      { text: "Use: medium-sized data, clear margin, high-dimensional text.", icon: "check" },
      { text: "Avoid: massive datasets, heavy noise without kernel tuning.", icon: "warning" },
    ],
  },
  "Deep Learning: Introduction": {
    bullets: [
      { text: "Four phases: foundations → optimization → architectures → deployment.", icon: "workflow" },
      { text: "Each phase has a lab-style checkpoint — pause at phase boundaries.", icon: "check" },
      { text: "Expect ~3 hours for Section 7 — phase breaks are intentional.", icon: "idea" },
    ],
  },
  "Xavier (Glorot) and He Initialization": {
    bullets: [
      { text: "Xavier: scale for tanh/sigmoid — variance stays stable across layers.", icon: "formula" },
      { text: "He: scale for ReLU — accounts for half the activations being zero.", icon: "formula" },
      { text: "Poor init can stall or explode training before the first epoch completes.", icon: "warning" },
    ],
  },
  "NLP Grand Goal and Core Applications": {
    bullets: [
      { text: "Goal: algorithms that understand, generate, and transform human language.", icon: "nlp" },
      { text: "Applications span search, assistants, translation, and analytics.", icon: "idea" },
    ],
  },
  "Text Normalization Pipeline": {
    bullets: [
      { text: "Typical order: lowercase → punctuation → tokenize → stopwords → stem/lemma.", icon: "pipeline" },
      { text: "Order matters — document the pipeline for reproducibility.", icon: "check" },
    ],
  },
  "Why Subword Tokenization Matters in Practice": {
    bullets: [
      { text: "Open vocabulary: rare words decompose into known subwords.", icon: "token" },
      { text: "Balances character-level flexibility with word-level efficiency.", icon: "compare" },
    ],
  },
  "Why Next-Word Prediction Matters": {
    bullets: [
      { text: "Language modeling is the foundation for autocomplete, speech, and generative AI.", icon: "llm" },
      { text: "Better perplexity usually means better downstream performance.", icon: "metric" },
    ],
  },
  "Evaluating Language Models": {
    bullets: [
      { text: "Perplexity: intrinsic metric on held-out text.", icon: "metric" },
      { text: "BLEU/ROUGE: extrinsic metrics for generation tasks.", icon: "evaluate" },
    ],
  },
  "How Contextualized Embeddings Work": {
    bullets: [
      { text: "Static embeddings: one vector per word type.", icon: "embedding" },
      { text: "Contextual: vector depends on surrounding tokens (ELMo, BERT-style).", icon: "attention" },
    ],
  },
  "Seq2Seq Core Architecture (NMT)": {
    bullets: [
      { text: "Encoder compresses source; decoder generates target token by token.", icon: "seq2seq" },
      { text: "Attention lets the decoder focus on relevant encoder states.", icon: "attention" },
      { text: "Teacher forcing during training; beam search often used at inference.", icon: "model" },
    ],
  },
  "Practice Track — Exercises": {
    bullets: [
      { text: "Work in pairs — one drives the notebook, one reviews outputs.", icon: "check" },
      { text: "Raise hand when blocked >3 minutes so we can unblock the room.", icon: "idea" },
    ],
  },
};

function isTemplateNote(note) {
  if (!note || typeof note !== "string") return false;
  return (
    note.startsWith('Cover "') ||
    note.startsWith('Present "') ||
    note.startsWith("Open ") ||
    note.includes("Pause for a quick check-in") ||
    note.includes("Tie back to the section objective") ||
    note.includes("Invite one trainee question or a 30-second think-pair-share") ||
    (note.includes("Emphasize:") && note.includes("then advance"))
  );
}

const TRAINER_CHECK_INS = [
  "Quick check: ask one volunteer to paraphrase the first bullet.",
  "30-second think-pair-share: which bullet would you apply first?",
  "Poll the room: who has used this in production? Invite one short story.",
  "Pause for questions — if silent, pose a concrete scenario from the bullets.",
  "Challenge: link this slide to the section opener in one sentence.",
];

function noteHash(title) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  return h;
}

function bulletTexts(slide) {
  const out = [];
  const push = (b) => {
    if (typeof b === "string") out.push(b);
    else if (b?.text) out.push(String(b.text));
  };
  (slide.bullets || []).forEach(push);
  (slide.columns || []).forEach((c) => (c.bullets || []).forEach(push));
  (slide.sections || []).forEach((s) => (s.bullets || []).forEach(push));
  return out;
}

function customSpeakerNote(slide) {
  const title = String(slide.title || "this slide");
  const points = bulletTexts(slide).slice(0, 2);
  const hasTable = Boolean(slide.table);
  const hasBody = Boolean(slide.body);
  const bulletCount = bulletTexts(slide).length;
  const timing = hasTable ? "~3 min" : bulletCount >= 3 ? "~2 min" : "~90 sec";

  if (slide.type === "section-divider") {
    return `Transition (${timing}): introduce ${title}, name two agenda items from the divider, then advance without re-reading the subtitle.`;
  }

  const opener = slide.subtitle
    ? `Start with the subtitle, then walk bullets in order.`
    : hasTable
      ? `Use the table as your agenda — roughly one row per minute.`
      : hasBody
        ? `Summarize the body paragraph, then expand each bullet.`
        : `Walk the on-screen bullets top to bottom.`;

  const emphasis = points.length
    ? `Land: ${points.map((p) => p.replace(/\s+/g, " ").slice(0, 80)).join(" · ")}.`
    : `Anchor on the diagram or table before moving on.`;

  const checkIn = TRAINER_CHECK_INS[noteHash(title) % TRAINER_CHECK_INS.length];
  return `${opener} ${emphasis} Budget ${timing}. ${checkIn}`;
}

function mergeBullets(existing, extra) {
  const normalized = (existing || []).map((b) =>
    typeof b === "string" ? { text: b } : { ...b }
  );
  const texts = new Set(normalized.map((b) => b.text));
  for (const item of extra || []) {
    const text = typeof item === "string" ? item : item.text;
    if (!texts.has(text)) {
      normalized.push(typeof item === "string" ? { text: item } : item);
      texts.add(text);
    }
  }
  return normalized;
}

function enrichYellow(slide) {
  const patch = YELLOW_ENRICHMENTS[slide.title];
  if (!patch) return slide;
  const next = { ...slide };
  if (patch.bullets) next.bullets = mergeBullets(next.bullets, patch.bullets);
  if (patch.body && !next.body) next.body = patch.body;
  if (patch.table && !next.table) next.table = patch.table;
  if (patch.note && !next.note) next.note = patch.note;
  return next;
}

function polishSlide(slide, file) {
  let next = { ...slide };

  if (isTemplateNote(next.speakerNote)) {
    next.speakerNote = customSpeakerNote(next);
  }

  next = enrichYellow(next);

  return next;
}

function polishSection07(slides) {
  const out = [];
  let i = 0;
  while (i < slides.length) {
    const slide = slides[i];
    const phaseMatch = String(slide.title || "").match(/^Phase\s+(\d)$/);

    if (slide.type === "section-divider" && phaseMatch) {
      const phase = Number(phaseMatch[1]);
      if (phase === 1 && PHASE_CONTENT[1]) {
        const p = PHASE_CONTENT[1];
        out.push({
          ...slide,
          type: undefined,
          title: p.title,
          subtitle: p.subtitle,
          bullets: p.bullets,
          table: p.table,
          illustration: p.illustration,
          titleIcon: p.titleIcon,
          speakerNote: p.speakerNote,
        });
        i += 1;
        continue;
      }
      // Phase 2–4: merge divider into next "Phase N Focus" slide
      const nextSlide = slides[i + 1];
      if (nextSlide && /^Phase\s+\d+\s+Focus:/i.test(String(nextSlide.title || ""))) {
        const subtitle = String(slide.subtitle || "");
        out.push({
          ...nextSlide,
          title: `Phase ${phase}: ${subtitle}`,
          speakerNote: isTemplateNote(nextSlide.speakerNote)
            ? `Phase ${phase} (~40 min): ${subtitle}. Use the table as your agenda. After the overview, dive into the first technical slide without a separate divider pause.`
            : nextSlide.speakerNote,
        });
        i += 2;
        continue;
      }
    }

    out.push(polishSlide(slide, "section07"));
    i += 1;
  }
  return out;
}

function writeSection(file, slides, header) {
  const content = `${header}export const slides = ${JSON.stringify(slides, null, 2)};\n`;
  fs.writeFileSync(path.join(slidesDir, file), content, "utf8");
}

// Dedup rename
const S14_DEDUP_TITLES = {
  "Stemming vs Lemmatization": {
    title: "Day 1 Lab — Stemming vs Lemmatization",
    subtitle: "Hands-on comparison in the Day 1 track",
  },
  "Tokenization Fundamentals": {
    title: "Day 1 Lab — Tokenization Fundamentals",
    subtitle: "Workshop view — complements Section 8 overview and Section 9 masterclass",
  },
  "Tokenization — One Sentence, Multiple Views": {
    title: "Day 1 Lab — Tokenization Views",
    subtitle: "Same sentence, word / char / subword splits side by side",
  },
  "Subword Tokenization for Modern LLMs": {
    title: "Day 1 Lab — Subword Tokenization for LLMs",
    subtitle: "BPE / WordPiece intuition for the Day 1 notebook",
  },
};

function applyDedup(slides, file) {
  return slides.map((slide) => {
    if (file !== "section14-day01-nlp-intro.js") return slide;
    const patch = S14_DEDUP_TITLES[slide.title];
    if (!patch) return slide;
    return { ...slide, title: patch.title, subtitle: patch.subtitle || slide.subtitle };
  });
}

const files = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".js"));
let templateFixed = 0;
let yellowFixed = 0;

for (const file of files) {
  const filePath = path.join(slidesDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const headerMatch = raw.match(/^(\/\*\*[\s\S]*?\*\/\s*)/);
  const header = headerMatch ? headerMatch[1] : `/** ${file} */\n`;

  const mod = await import(pathToFileURL(filePath).href);
  let slides = mod.slides;

  if (file === "section07-deep-learning.js") {
    slides = polishSection07(slides);
  } else {
    slides = slides.map((s) => polishSlide(s, file));
  }

  slides = applyDedup(slides, file);

  for (const s of slides) {
    if (YELLOW_ENRICHMENTS[s.title]) yellowFixed += 1;
  }

  writeSection(file, slides, header);
  console.log(`Polished ${file}: ${slides.length} slides`);
}

console.log(`Yellow enrichments applied: ${yellowFixed} titles`);
console.log("Done. Re-run: node scripts/audit-content.mjs");
