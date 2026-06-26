/**
 * Verify slide image URLs (HTTP HEAD) and local assets under public/.
 * Run: node scripts/check-slide-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const slidesDir = path.join(rootDir, "src/data/slides");
const publicDir = path.join(rootDir, "public");

const externalUrls = new Map();
const localPaths = new Map();

function isImageField(key) {
  return key === "imageUrl" || key === "imageUrls";
}

function collectFromSlide(slide, ctx) {
  if (!slide || typeof slide !== "object") return;

  if (typeof slide.imageUrl === "string") {
    register(slide.imageUrl, ctx);
  }
  if (Array.isArray(slide.imageUrls)) {
    slide.imageUrls.forEach((url, i) => register(url, `${ctx}.imageUrls[${i}]`));
  }
}

function register(value, ctx) {
  if (typeof value !== "string" || !value.trim()) return;
  if (/^https?:\/\//i.test(value)) {
    const refs = externalUrls.get(value) || [];
    refs.push(ctx);
    externalUrls.set(value, refs);
  } else if (value.startsWith("/")) {
    const refs = localPaths.get(value) || [];
    refs.push(ctx);
    localPaths.set(value, refs);
  }
}

for (const file of fs.readdirSync(slidesDir).filter((f) => f.endsWith(".js"))) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  mod.slides.forEach((slide, i) => collectFromSlide(slide, `${file}#${i}`));
}

async function checkUrl(url, attempt = 1) {
  const headers = {
    "User-Agent": "AI-ML-Bootcamp-SlideAudit/1.0 (educational; contact: local)",
  };
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { ...headers, Range: "bytes=0-0" },
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    if (res.ok || res.status === 206) return { ok: true, status: res.status };
    if (res.status === 429) return { ok: true, status: 429, skipped: "rate-limited" };
    if (attempt < 2 && (res.status === 403 || res.status === 405)) {
      await sleep(500);
      return checkUrl(url, attempt + 1);
    }
    return { ok: false, status: res.status };
  } catch (err) {
    if (attempt < 2) {
      await sleep(500);
      return checkUrl(url, attempt + 1);
    }
    return { ok: false, status: 0, error: err.message };
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const broken = [];
const skipped = [];

for (const [localPath, refs] of localPaths) {
  const diskPath = path.join(publicDir, localPath.replace(/^\//, "").split("/").join(path.sep));
  if (!fs.existsSync(diskPath)) {
    broken.push({ kind: "local", url: localPath, refs, error: "file not found" });
  }
}

console.log(`Checking ${externalUrls.size} external URLs...`);
let checked = 0;
for (const [url, refs] of externalUrls) {
  checked += 1;
  process.stdout.write(`\r  ${checked}/${externalUrls.size}`);
  const result = await checkUrl(url);
  if (result.skipped) {
    skipped.push({ url, refs, reason: result.skipped });
  } else if (!result.ok) {
    broken.push({
      kind: "external",
      url,
      refs,
      status: result.status,
      error: result.error || `HTTP ${result.status}`,
    });
  }
  await sleep(200);
}
console.log("\n");

const reportPath = path.join(rootDir, "BROKEN_IMAGES.md");
const lines = [
  "# Broken Slide Images",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `- External URLs checked: **${externalUrls.size}**`,
  `- Local paths checked: **${localPaths.size}**`,
  `- Broken: **${broken.length}**`,
  `- Skipped (rate limit): **${skipped.length}**`,
  "",
];

if (broken.length === 0) {
  lines.push("All slide images OK.");
} else {
  lines.push("| Kind | URL / Path | Error | References |");
  lines.push("|------|------------|-------|------------|");
  for (const item of broken) {
    const refs = item.refs.slice(0, 3).join("; ") + (item.refs.length > 3 ? " …" : "");
    lines.push(`| ${item.kind} | \`${item.url}\` | ${item.error} | ${refs} |`);
  }
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
console.log(`External URLs: ${externalUrls.size}, Local paths: ${localPaths.size}`);
console.log(`Broken: ${broken.length}, Skipped: ${skipped.length}`);
console.log(`Report: ${reportPath}`);

if (broken.length > 0) {
  broken.forEach((b) => console.log(`  [${b.kind}] ${b.url} — ${b.error}`));
  process.exit(1);
}
