/**
 * Adds speakerNote to every slide in section files (idempotent).
 * Run: node scripts/add-speaker-notes.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

function generateSpeakerNote(slide) {
  if (typeof slide.speakerNote === "string" && slide.speakerNote.trim()) {
    return slide.speakerNote.trim();
  }
  if (slide.type === "section-divider") {
    const topic = slide.subtitle || slide.title || "this section";
    return `Open ${topic}: state learning goals, timing, and how it connects to prior sessions. Preview the 2–3 ideas trainees must leave with.`;
  }
  const title = slide.title || "this slide";
  const bullets = Array.isArray(slide.bullets) ? slide.bullets.map(String) : [];
  const columns = Array.isArray(slide.columns) ? slide.columns : [];

  if (typeof slide.note === "string" && slide.note.trim()) {
    return slide.note.trim();
  }
  if (bullets.length >= 2) {
    return `Cover "${title}". Emphasize: ${bullets[0]}; then ${bullets[1]}. Pause for a quick check-in before moving on.`;
  }
  if (bullets.length === 1) {
    return `Cover "${title}". Key point: ${bullets[0]}. Ask one application question from the room.`;
  }
  if (columns.length > 0) {
    const heads = columns
      .map((c) => c.heading)
      .filter(Boolean)
      .slice(0, 2)
      .join(" and ");
    return `Walk through "${title}" column by column${heads ? ` (${heads})` : ""}. Keep pace — one minute per column unless discussion heats up.`;
  }
  if (typeof slide.body === "string" && slide.body.trim()) {
    const snippet = slide.body.trim().slice(0, 120);
    return `Explain "${title}": ${snippet}${slide.body.length > 120 ? "…" : ""}`;
  }
  return `Present "${title}". Tie back to the section objective and invite one question before advancing.`;
}

function serializeSlides(slides) {
  const lines = slides.map((slide) => {
    const withNote = { ...slide, speakerNote: generateSpeakerNote(slide) };
    const json = JSON.stringify(withNote, null, 2);
    return json
      .split("\n")
      .map((line, i) => (i === 0 ? `    ${line}` : `    ${line}`))
      .join("\n");
  });
  return `[\n${lines.join(",\n")}\n  ]`;
}

const sectionFiles = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".js"));

let totalSlides = 0;
let added = 0;

for (const file of sectionFiles) {
  const mod = await import(pathToFileURL(path.join(slidesDir, file)).href);
  const slides = mod.slides;
  if (!Array.isArray(slides)) continue;

  const before = slides.filter((s) => typeof s.speakerNote === "string" && s.speakerNote.trim()).length;
  const processed = slides.map((s) => ({ ...s, speakerNote: generateSpeakerNote(s) }));
  const after = processed.length;
  totalSlides += after;
  added += after - before;

  const sectionName = file.replace(".js", "");
  const header = `/** Auto-split from presentationData — ${sectionName} */\nexport const slides = `;
  const body = serializeSlides(processed);
  fs.writeFileSync(path.join(slidesDir, file), `${header}${body};\n`, "utf8");
  console.log(`${file}: ${after} slides, ${after - before} speakerNote fields added/updated`);
}

console.log(`\nDone: ${totalSlides} slides across ${sectionFiles.length} files (${added} new/updated notes).`);
