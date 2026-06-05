/**
 * Sample QA matrix: one slide per section × content channels (text / math / visual).
 * Run: node scripts/prepublish-qa.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

const SECTION_FILES = [
  ["Section 1", "section01-foundations.js"],
  ["Section 2", "section02-regression.js"],
  ["Section 3", "section03-classification-intro.js"],
  ["Section 4", "section04-naive-bayes-trees.js"],
  ["Section 5", "section05-svm.js"],
  ["Section 6", "section06-clustering-pca.js"],
  ["Section 7", "section07-deep-learning.js"],
  ["Section 8", "section08-nlp-fundamentals.js"],
  ["Section 9", "section09-nlp-tokenization.js"],
  ["Section 10", "section10-nlp-language-modeling.js"],
  ["Section 11", "section11-nlp-contextual-rnn.js"],
  ["Section 12", "section12-nlp-seq2seq.js"],
  ["Section 13", "section13-generative-ai.js"],
  ["Section 14", "section14-day01-nlp-intro.js"],
  ["Section 15", "section15-rag.js"],
  ["Section 16", "section16-mlops.js"],
];

const MATH_RE =
  /\\[\(\[]|\\begin\{|\\frac|\\sum|\\hat|_\{?[a-zA-Z0-9]|\\^|[a-zA-Z]_[a-zA-Z0-9]/;

function isTemplateNote(note) {
  if (!note || typeof note !== "string") return true;
  return (
    note.startsWith('Cover "') ||
    note.startsWith('Present "') ||
    note.startsWith("Open ") ||
    note.includes("Invite one trainee question or a 30-second think-pair-share") ||
    (note.includes("Emphasize:") && note.includes("then advance"))
  );
}

function slideHasMath(slide) {
  const json = JSON.stringify(slide);
  return MATH_RE.test(json);
}

function slideHasVisual(slide) {
  return Boolean(
    slide.titleIcon ||
      slide.illustration ||
      slide.conceptAnimation ||
      slide.imageUrl ||
      slide.imageUrls?.length
  );
}

function pickSample(slides, predicate, fallbackIndex = 0) {
  return slides.find(predicate) ?? slides[fallbackIndex];
}

let failures = 0;
const rows = [];

for (const [label, file] of SECTION_FILES) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  const slides = mod.slides;
  const opener = slides[0];
  const mathSlide = pickSample(slides, slideHasMath, 0);
  const visualSlide = pickSample(slides, slideHasVisual, 0);

  const checks = [
    ["opener", opener, Boolean(opener?.title), !isTemplateNote(opener?.speakerNote)],
    ["math", mathSlide, slideHasMath(mathSlide), !isTemplateNote(mathSlide?.speakerNote)],
    ["visual", visualSlide, slideHasVisual(visualSlide), !isTemplateNote(visualSlide?.speakerNote)],
  ];

  for (const [kind, slide, okContent, okNote] of checks) {
    if (!okContent || !okNote) failures += 1;
    rows.push({
      section: label,
      kind,
      title: String(slide?.title || "—").slice(0, 48),
      content: okContent ? "ok" : "FAIL",
      speakerNote: okNote ? "custom" : "FAIL",
    });
  }
}

const out = [
  "# Pre-Publish QA Matrix",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "Sample: first slide + first math-heavy + first visual per section (16 × 3 = 48 checks).",
  "",
  "| Section | Channel | Slide | Content | Notes |",
  "|---------|---------|-------|---------|-------|",
];

for (const r of rows) {
  out.push(`| ${r.section} | ${r.kind} | ${r.title.replace(/\|/g, "/")} | ${r.content} | ${r.speakerNote} |`);
}

out.push("");
out.push(failures ? `**${failures} checks failed.**` : "**All 48 sample checks passed.**");

const outPath = path.join(__dirname, "../PREPUBLISH_QA.md");
fs.writeFileSync(outPath, out.join("\n"), "utf8");
console.log(`Wrote ${outPath}`);
console.log(failures ? `FAILED: ${failures} checks` : "All 48 sample checks passed");
process.exit(failures ? 1 : 0);
