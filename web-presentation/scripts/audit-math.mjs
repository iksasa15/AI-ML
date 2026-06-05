/**
 * Audit slides for LaTeX/math text that should be prerendered.
 * Run in browser console after loading app, or use counts from data scan.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

const MATH_PATTERN =
  /\\[\(\[]|\\begin\{|\\frac|\\sum|\\hat|\\beta|\\alpha|\\mathcal|_\{?[a-zA-Z0-9]|\\^|\$\$|[a-zA-Z]_[a-zA-Z0-9]/;

function collectStrings(value, pathParts, hits) {
  if (typeof value === "string" && MATH_PATTERN.test(value)) {
    hits.push({ path: pathParts.join("."), sample: value.slice(0, 100) });
    return;
  }
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStrings(item, [...pathParts, `[${index}]`], hits));
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith("_")) continue;
    collectStrings(child, [...pathParts, key], hits);
  }
}

let totalHits = 0;
for (const file of fs.readdirSync(slidesDir).filter((f) => f.endsWith(".js"))) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  const hits = [];
  mod.slides.forEach((slide, index) => collectStrings(slide, [`${file}#${index}`], hits));
  totalHits += hits.length;
  if (hits.length) {
    console.log(`\n${file}: ${hits.length} math fields`);
    hits.slice(0, 5).forEach((h) => console.log(`  ${h.path}: ${h.sample}`));
    if (hits.length > 5) console.log(`  ... +${hits.length - 5} more`);
  }
}
console.log(`\nTotal math-bearing fields in data: ${totalHits}`);
