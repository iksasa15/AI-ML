/**
 * Reorganize Week 3 NLP slides per plan: S8→S9→S14→S10→S11→S12
 * Run: node scripts/reorganize-week3.mjs
 */
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const slidesDir = path.join(import.meta.dirname, "../src/data/slides");

async function loadSlides(file) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  return mod.slides;
}

function byTitle(slides, title) {
  const s = slides.find((x) => x.title === title);
  if (!s) throw new Error(`Missing slide: ${title}`);
  return s;
}

function pick(slides, titles) {
  return titles.map((t) => byTitle(slides, t));
}

function writeSection(file, header, slides) {
  const content = `${header}export const slides = ${JSON.stringify(slides, null, 2)};\n`;
  fs.writeFileSync(path.join(slidesDir, file), content, "utf8");
  console.log(`Wrote ${file}: ${slides.length} slides`);
}

const s8 = await loadSlides("section08-nlp-fundamentals.js");
const s9 = await loadSlides("section09-nlp-tokenization.js");
const s14 = await loadSlides("section14-day01-nlp-intro.js");
const s12 = await loadSlides("section12-nlp-seq2seq.js");

const s8Keep = pick(s8, [
  "NLP Fundamentals and Challenges",
  "Ambiguity in Language: Practical Examples",
  "NLP Grand Goal and Core Applications",
  "Regular Expressions (Regex): Core Idea",
  "Regex Quantifiers and Boundaries",
  "Regex Refinement Workflow",
  "Words and Corpora: Tokens vs Types",
  "Heaps' Law in NLP Corpora",
  "Text Normalization Pipeline",
  "Text Preprocessing Techniques (Operational View)",
]);

const s8FromS14 = pick(s14, [
  "The Full NLP Pipeline",
  "Text Cleaning — Why Raw Text Is Messy",
  "Text Cleaning — Step 1: Conceptual Pipeline",
  "Text Cleaning — Step 2: Raw Input Example",
  "Text Cleaning — Python Function (Core)",
  "Text Cleaning — Step 4: Transformation Trace",
  "Text Cleaning — Step 5: Final Before/After",
  "Lowercase Normalization",
  "Lowercase Normalization — Step-by-Step Examples",
]);

const s8TokenToS9 = pick(s8, [
  "Tokenization Strategies",
  "Subword Tokenization Algorithms",
  "Unigram LM Tokenization Example",
  "BPE Training Process",
  "Stemming vs Lemmatization",
  "Lemmatization and Morphology Examples",
]);

const transformerBridge = byTitle(s8, "Transformer Encoder-Decoder Overview");

const s9FromS14 = pick(s14, [
  "Day 1 Lab — Tokenization Fundamentals",
  "Day 1 Lab — Tokenization Views",
  "NLTK Tokenization Essentials",
  "NLTK Tokenization — Practical Python Example",
  "Day 1 Lab — Subword Tokenization for LLMs",
  "Subword Tokenization (LLMs) — Why It Wins",
  "Subword Tokenization — BPE vs WordPiece (Example)",
  "Why Token Counts Matter",
  "Why Token Counts Matter — Practical Example",
  "Stop Words — Removing Low-Information Tokens",
  "NLTK Stop Words in Practice",
  "Custom and Domain Stop Words",
  "Custom Stop Words — Before / After Example",
  "When Not to Remove Stop Words",
  "Day 1 Lab — Stemming vs Lemmatization",
  "NLTK Stemmer Families",
  "Lemmatization with SpaCy",
  "Choosing Stemming vs Lemmatization",
]);

const newS8 = [...s8Keep, ...s8FromS14];

const newS9 = [
  ...s8TokenToS9,
  ...s9,
  ...s9FromS14,
];

const newS14 = pick(s14, [
  "Part-of-Speech (POS) Tagging",
  "POS and Dependency Highlights in SpaCy",
  "POS/Dependency — Worked Example",
  "Named Entity Recognition (NER)",
  "NER with SpaCy — Basic Usage",
  "NER — Worked Example (News Snippet)",
  "Evaluating NER Quality",
  "Full SpaCy Pipeline Functionally",
  "Day Project — Product Review Analyzer",
  "End-to-End Flow (Conceptual)",
  "Practice Track — Exercises",
  "Curated Learning Resources",
  "Day 1 Readiness Checklist",
  "Day 1 Closing",
]);

const newS12 = [
  ...s12,
  {
    ...transformerBridge,
    subtitle: "Bridge to Week 4 GenAI — encoder-decoder intuition before BERT/GPT",
    speakerNote:
      "Preview Week 4: same encoder-decoder idea scales to Transformers and modern LLMs.",
  },
];

writeSection(
  "section08-nlp-fundamentals.js",
  "/** Week 3 Session 1 — NLP intro, pipeline, regex, text cleaning */\n",
  newS8
);
writeSection(
  "section09-nlp-tokenization.js",
  "/** Week 3 Session 2 — Tokenization theory + NLTK/SpaCy labs */\n",
  newS9
);
writeSection(
  "section14-day01-nlp-intro.js",
  "/** Week 3 Session 3 — Text analysis, POS/NER, mini project */\n",
  newS14
);
writeSection(
  "section12-nlp-seq2seq.js",
  "/** Week 3 Session 6 — Seq2Seq, NMT, attention, transformer bridge */\n",
  newS12
);

console.log("\nCounts:", {
  S8: newS8.length,
  S9: newS9.length,
  S14: newS14.length,
  S12: newS12.length,
});
