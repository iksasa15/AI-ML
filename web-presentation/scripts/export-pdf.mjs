/**
 * Build print-ready PDF from the full slide deck.
 * Run: npm run export:pdf
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const pdfPath = path.join(distDir, "AI-ML-Bootcamp-Slides.pdf");
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}/?pdfExport=1`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args, cwd = root) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", shell: true });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await sleep(750);
  }
  throw new Error(`Preview server did not respond at ${url}`);
}

async function waitForPrintReady(page, timeoutMs = 900_000) {
  await page.waitForSelector('#print-container[data-print-ready="true"]', {
    timeout: timeoutMs,
  });
  const pageCount = await page.getAttribute("#print-container", "data-page-count");
  return Number(pageCount || 0);
}

async function main() {
  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    console.log("Building presentation…");
    await run("npm", ["run", "build"]);
  }

  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error("Playwright is required. Install with: npm install -D playwright");
    process.exit(1);
  }

  console.log("Starting preview server…");
  const server = spawn(
    "npm",
    ["run", "preview", "--", "--port", String(PORT), "--host", "127.0.0.1"],
    { cwd: root, stdio: "pipe", shell: true }
  );

  try {
    await waitForServer(`http://127.0.0.1:${PORT}/`);
    console.log("Loading full deck for PDF (may take several minutes)…");

    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 120_000 });

    const pages = await waitForPrintReady(page);
    console.log(`Print deck ready — ${pages} page(s). Generating PDF…`);

    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    const sizeMb = (fs.statSync(pdfPath).size / (1024 * 1024)).toFixed(1);
    console.log(`\nSaved: ${pdfPath} (${sizeMb} MB)`);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
