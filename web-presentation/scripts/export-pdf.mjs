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
const printHtmlPath = path.join(distDir, "export-print.html");
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function run(command, args, cwd = root, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...env },
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function normalizeAssetHref(href) {
  if (!href || href.startsWith("http")) return href;
  const cleaned = href.replace(/^\/AI-ML\/web-presentation\//, "/");
  return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
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
  await page.waitForFunction(
    () => document.getElementById("print-container")?.dataset.printReady === "true",
    undefined,
    { timeout: timeoutMs }
  );
  return page.evaluate(() => {
    const pc = document.getElementById("print-container");
    const styles = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .map((link) => link.getAttribute("href"))
      .filter(Boolean);
    return {
      html: pc?.innerHTML ?? "",
      pageCount: Number(pc?.dataset.pageCount || 0),
      styles,
    };
  });
}

function writePrintHtml({ html, styles }) {
  const stylesheetTags = styles
    .map((href) => `<link rel="stylesheet" href="${normalizeAssetHref(href)}">`)
    .join("\n    ");
  const doc = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${stylesheetTags}
    <style>
      @page { size: landscape; margin: 0; }
      html, body {
        margin: 0;
        padding: 0;
        background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      #print-container {
        display: block !important;
        visibility: visible !important;
        position: static !important;
        width: 100% !important;
      }
    </style>
  </head>
  <body>
    <div id="print-container" class="print-deck">${html}</div>
  </body>
</html>`;
  fs.writeFileSync(printHtmlPath, doc, "utf8");
}

async function main() {
  console.log("Building presentation (VITE_BASE=/ for PDF paths)…");
  await run("npm", ["run", "build"], root, { VITE_BASE: "/" });

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
    { cwd: root, stdio: "pipe", shell: true, env: { ...process.env, VITE_BASE: "/" } }
  );

  try {
    await waitForServer(`${BASE_URL}/`);
    console.log("Loading full deck for PDF (may take several minutes)…");

    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/?pdfExport=1`, {
      waitUntil: "domcontentloaded",
      timeout: 120_000,
    });

    const payload = await waitForPrintReady(page);
    console.log(`Print deck ready — ${payload.pageCount} page(s). Building print HTML…`);
    writePrintHtml(payload);

    await page.goto(`${BASE_URL}/export-print.html`, {
      waitUntil: "networkidle",
      timeout: 300_000,
    });
    await page.emulateMedia({ media: "print" });
    await sleep(3000);

    console.log("Generating PDF…");
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    const sizeMb = (fs.statSync(pdfPath).size / (1024 * 1024)).toFixed(1);
    console.log(`\nSaved: ${pdfPath} (${sizeMb} MB)`);
    console.log(`Print HTML: ${printHtmlPath}`);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
