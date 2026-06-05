/**
 * Content audit — classifies slides per section + visual + speaker notes.
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

function bulletHasIcon(bullets) {
  if (!Array.isArray(bullets)) return false;
  return bullets.some((b) => typeof b === "object" && b !== null && b.icon);
}

function countAllBullets(slide) {
  let n = Array.isArray(slide.bullets) ? slide.bullets.length : 0;
  for (const col of slide.columns || []) {
    n += Array.isArray(col.bullets) ? col.bullets.length : 0;
  }
  for (const sec of slide.sections || []) {
    n += Array.isArray(sec.bullets) ? sec.bullets.length : 0;
  }
  return n;
}

function isTemplateSpeakerNote(note) {
  if (!note || typeof note !== "string") return false;
  return (
    note.startsWith('Cover "') ||
    note.startsWith('Present "') ||
    note.startsWith("Open ") ||
    note.includes("Pause for a quick check-in before moving on") ||
    note.includes("Tie back to the section objective") ||
    note.includes("Invite one trainee question or a 30-second think-pair-share") ||
    (note.includes("Emphasize:") && note.includes("then advance"))
  );
}

function slideHasVisual(slide) {
  if (slide.type === "section-divider") return true;
  if (slide.titleIcon) return true;
  if (slide.illustration) return true;
  if (slide.conceptAnimation) return true;
  if (slide.imageUrl || slide.imageUrls?.length) return true;
  if (bulletHasIcon(slide.bullets)) return true;
  if (Array.isArray(slide.columns) && slide.columns.some((c) => bulletHasIcon(c.bullets))) return true;
  if (Array.isArray(slide.sections) && slide.sections.some((s) => bulletHasIcon(s.bullets))) return true;
  return false;
}

function classifySlide(slide, titleCounts) {
  const title = String(slide.title || "Untitled");
  const bullets = Array.isArray(slide.bullets) ? slide.bullets : [];
  const totalBullets = countAllBullets(slide);
  const hasRich =
    Boolean(slide.body) ||
    Boolean(slide.table) ||
    Boolean(slide.formula) ||
    Boolean(slide.code) ||
    Boolean(slide.imageUrl) ||
    Boolean(slide.imageUrls?.length) ||
    Boolean(slide.columns?.length) ||
    Boolean(slide.sections?.length) ||
    Boolean(slide.conceptAnimation) ||
    Boolean(slide.illustration);

  if ((titleCounts.get(title) ?? 0) > 1) {
    return { rating: "red", reason: "Duplicate title in section" };
  }
  if (bullets.length === 0 && !hasRich && slide.type !== "code") {
    return { rating: "red", reason: "Thin content — no bullets or rich blocks" };
  }
  const speaker = String(slide.speakerNote || "");
  if (speaker.startsWith('Present "') && totalBullets <= 1 && !hasRich) {
    return { rating: "red", reason: "Auto-generated placeholder note + weak body" };
  }
  if (totalBullets <= 1 && !slide.table && !slide.code && !slide.formula && !hasRich) {
    return { rating: "yellow", reason: "Light content — consider richer layout" };
  }
  if (String(slide.note || "").length > 0 && totalBullets < 3 && !slide.table && !hasRich) {
    return { rating: "yellow", reason: "Trainer note present but slide visually thin" };
  }
  return { rating: "green", reason: "Adequate depth for delivery" };
}

const emoji = { red: "🔴", yellow: "🟡", green: "🟢" };
const globalTitles = new Map();

for (const [, file] of SECTION_FILES) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  for (const s of mod.slides) {
    const t = String(s.title || "");
    globalTitles.set(t, (globalTitles.get(t) ?? 0) + 1);
  }
}

const crossDupes = [...globalTitles.entries()].filter(([, n]) => n > 1).map(([t]) => t);

let md = `# Content Audit — AI & ML Bootcamp\n\n`;
md += `Generated: ${new Date().toISOString().slice(0, 10)}\n\n`;
md += `| Rating | Meaning |\n|--------|--------|\n`;
md += `| 🔴 | Needs rewrite (weak/duplicate) |\n`;
md += `| 🟡 | Design/layout improvement |\n`;
md += `| 🟢 | Good — no change required |\n\n`;
md += `| Visual | Meaning |\n|--------|--------|\n`;
md += `| ✅ | hasVisual — titleIcon, illustration, animation, image, or bullet icons |\n`;
md += `| ⬜ | No visual enrichment detected |\n\n`;

const totals = { red: 0, yellow: 0, green: 0 };
const visualTotals = { yes: 0, no: 0 };
let templateNotes = 0;

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
    const hasVisual = slideHasVisual(slide);
    if (hasVisual) visualTotals.yes += 1;
    else visualTotals.no += 1;
    const noteQuality = isTemplateSpeakerNote(slide.speakerNote) ? "template" : "custom";
    if (noteQuality === "template") templateNotes += 1;
    return {
      title: String(slide.title || "Untitled"),
      rating,
      reason,
      hasVisual,
      titleIcon: slide.titleIcon || "—",
      noteQuality,
    };
  });

  const sectionTotals = { red: 0, yellow: 0, green: 0 };
  for (const r of rows) sectionTotals[r.rating] += 1;
  const visualCount = rows.filter((r) => r.hasVisual).length;
  const visualPct = Math.round((visualCount / slides.length) * 100);

  md += `## ${sectionLabel} (${file})\n\n`;
  md += `Summary: 🟢 ${sectionTotals.green} · 🟡 ${sectionTotals.yellow} · 🔴 ${sectionTotals.red} · **${slides.length} slides**\n\n`;
  md += `Visual coverage: **${visualPct}%** (${visualCount}/${slides.length} with hasVisual)\n\n`;
  md += `| Slide | Rating | Visual | Notes | titleIcon | Note |\n|-------|--------|--------|-------|-----------|------|\n`;
  for (const r of rows) {
    md += `| ${r.title.replace(/\|/g, "/")} | ${emoji[r.rating]} | ${r.hasVisual ? "✅" : "⬜"} | ${r.noteQuality} | ${r.titleIcon} | ${r.reason} |\n`;
  }
  md += `\n`;
}

const deckTotal = totals.red + totals.yellow + totals.green;
const deckVisualPct = Math.round((visualTotals.yes / deckTotal) * 100);

md += `## Deck Totals\n\n`;
md += `- 🟢 Good: **${totals.green}**\n`;
md += `- 🟡 Improve: **${totals.yellow}**\n`;
md += `- 🔴 Rewrite: **${totals.red}**\n`;
md += `- **${deckTotal}** content slides audited\n\n`;
md += `### Visual enrichment\n\n`;
md += `- ✅ hasVisual: **${visualTotals.yes}** (${deckVisualPct}%)\n`;
md += `- ⬜ Missing: **${visualTotals.no}**\n\n`;
md += `### Speaker notes\n\n`;
md += `- Template notes remaining: **${templateNotes}**\n`;
md += `- Custom notes: **${deckTotal - templateNotes}**\n\n`;
if (crossDupes.length) {
  md += `### Cross-section duplicate titles\n\n`;
  for (const t of crossDupes) {
    md += `- ${t} (${globalTitles.get(t)}×)\n`;
  }
  md += `\n`;
}
md += `### Recommended next passes\n\n`;
md += `1. Resolve any 🔴 slides and cross-section duplicate titles.\n`;
md += `2. Apply 🟡 design pass only where rating remains yellow after enrichments.\n`;
md += `3. Replace remaining template speaker notes with trainer-specific scripts.\n`;

const outPath = path.join(__dirname, "../CONTENT_AUDIT.md");
fs.writeFileSync(outPath, md, "utf8");
console.log(`Wrote ${outPath}`);
console.log(`Totals: green=${totals.green} yellow=${totals.yellow} red=${totals.red}`);
console.log(`Visual: ${visualTotals.yes}/${deckTotal} (${deckVisualPct}%)`);
console.log(`Template speaker notes: ${templateNotes}`);
