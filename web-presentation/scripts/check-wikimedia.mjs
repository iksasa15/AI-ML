/**
 * List external image URLs in slide data (Wikimedia etc.).
 * Run: node scripts/check-wikimedia.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

const urls = new Map();

function collect(value, ctx) {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    urls.set(value, (urls.get(value) || 0) + 1);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collect(v, `${ctx}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collect(v, `${ctx}.${k}`);
  }
}

for (const file of fs.readdirSync(slidesDir).filter((f) => f.endsWith(".js"))) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  mod.slides.forEach((slide, i) => collect(slide, `${file}#${i}`));
}

const wikimedia = [...urls.keys()].filter((u) => u.includes("wikimedia.org"));
console.log(`Total external URLs: ${urls.size}`);
console.log(`Wikimedia URLs: ${wikimedia.length}`);
console.log("\nNote: PDF/print requires network for these images unless cached locally.");
wikimedia.slice(0, 15).forEach((u) => console.log(`  ${u}`));
if (wikimedia.length > 15) console.log(`  ... +${wikimedia.length - 15} more`);

const reportPath = path.join(__dirname, "../WIKIMEDIA_IMAGES.md");
const lines = [
  "# Wikimedia / External Slide Images",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  `- Total external URLs: **${urls.size}**`,
  `- Wikimedia URLs: **${wikimedia.length}**`,
  "",
  "PDF and print need network access for these unless you mirror them under `public/assets/slides/`.",
  "",
  "| URL | References |",
  "|-----|------------|",
];
for (const u of wikimedia.sort()) {
  lines.push(`| ${u} | ${urls.get(u)} |`);
}
fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
console.log(`\nWrote ${reportPath}`);
