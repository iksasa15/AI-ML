/**
 * Content audit — classifies slides per section.
 * Run: node scripts/audit-content.mjs
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

function classifySlide(slide, titleCounts) {
  const title = String(slide.title || "Untitled");
  const bullets = Array.isArray(slide.bullets) ? slide.bullets : [];
  const hasRich =
    Boolean(slide.body) ||
    Boolean(slide.table) ||
    Boolean(slide.formula) ||
    Boolean(slide.code) ||
    Boolean(slide.imageUrl) ||
    Boolean(slide.imageUrls?.length) ||
    Boolean(slide.columns?.length) ||
    Boolean(slide.sections?.length);

  if ((titleCounts.get(title) ?? 0) > 1) {
    return { rating: "red", reason: "Duplicate title in section" };
  }
  if (bullets.length === 0 && !hasRich && slide.type !== "code") {
    return { rating: "red", reason: "Thin content — no bullets or rich blocks" };
  }
  const speaker = String(slide.speakerNote || "");
  if (speaker.startsWith('Present "') && bullets.length <= 1 && !hasRich) {
    return { rating: "red", reason: "Auto-generated placeholder note + weak body" };
  }
  if (bullets.length <= 1 && !slide.table && !slide.code && !slide.formula) {
    return { rating: "yellow", reason: "Light content — consider richer layout" };
  }
  if (String(slide.note || "").length > 0 && bullets.length < 3 && !slide.table) {
    return { rating: "yellow", reason: "Trainer note present but slide visually thin" };
  }
  return { rating: "green", reason: "Adequate depth for delivery" };
}

const emoji = { red: "🔴", yellow: "🟡", green: "🟢" };
let md = `# Content Audit — AI & ML Bootcamp\n\n`;
md += `Generated: ${new Date().toISOString().slice(0, 10)}\n\n`;
md += `| Rating | Meaning |\n|--------|--------|\n`;
md += `| 🔴 | Needs rewrite (weak/duplicate) |\n`;
md += `| 🟡 | Design/layout improvement |\n`;
md += `| 🟢 | Good — no change required |\n\n`;

const totals = { red: 0, yellow: 0, green: 0 };

for (const [sectionLabel, file] of SECTION_FILES) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  const slides = mod.slides;
  const titleCounts = new Map();
  for (const s of slides) {
    const t = String(s.title || "");
    titleCounts.set(t, (titleCounts.get(t) ?? 0) + 1);
  }

  const rows = slides.map((slide) => {
    const { rating, reason } = classifySlide(slide, titleCounts);
    totals[rating] += 1;
    return { title: String(slide.title || "Untitled"), rating, reason };
  });

  const sectionTotals = { red: 0, yellow: 0, green: 0 };
  for (const r of rows) sectionTotals[r.rating] += 1;

  md += `## ${sectionLabel} (${file})\n\n`;
  md += `Summary: 🟢 ${sectionTotals.green} · 🟡 ${sectionTotals.yellow} · 🔴 ${sectionTotals.red} · **${slides.length} slides**\n\n`;
  md += `| Slide | Rating | Note |\n|-------|--------|------|\n`;
  for (const r of rows) {
    md += `| ${r.title.replace(/\|/g, "/")} | ${emoji[r.rating]} | ${r.reason} |\n`;
  }
  md += `\n`;
}

md += `## Deck Totals\n\n`;
md += `- 🟢 Good: **${totals.green}**\n`;
md += `- 🟡 Improve: **${totals.yellow}**\n`;
md += `- 🔴 Rewrite: **${totals.red}**\n`;
md += `- **${totals.red + totals.yellow + totals.green}** content slides audited\n\n`;
md += `### Recommended next passes\n\n`;
md += `1. Rewrite 🔴 slides in Sections 7 (phase dividers), 13 (intro density), and any duplicate titles.\n`;
md += `2. Apply 🟡 design pass: add tables/diagrams to single-bullet slides.\n`;
md += `3. Big Picture + Takeaway bookends are injected automatically for all 16 sections.\n`;

const outPath = path.join(__dirname, "../CONTENT_AUDIT.md");
fs.writeFileSync(outPath, md, "utf8");
console.log(`Wrote ${outPath}`);
console.log(`Totals: green=${totals.green} yellow=${totals.yellow} red=${totals.red}`);
