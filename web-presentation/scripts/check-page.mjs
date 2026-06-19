import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

await page.goto("http://localhost:5173/", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(5000);

const info = await page.evaluate(() => ({
  rootLen: document.getElementById("root")?.innerHTML?.length ?? 0,
  hasPresentation: !!document.querySelector(".presentation"),
  hasSkipLink: !!document.querySelector(".skip-to-slides"),
  bodyBg: getComputedStyle(document.body).backgroundColor,
}));

console.log(JSON.stringify({ info, errors }, null, 2));
await browser.close();
