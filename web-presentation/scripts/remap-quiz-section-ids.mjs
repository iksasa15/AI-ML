import fs from "fs";
import path from "path";

const file = path.join(import.meta.dirname, "../src/data/quizData.js");
let content = fs.readFileSync(file, "utf8");

const remap = { 10: 11, 11: 12, 12: 13, 13: 14, 14: 10 };
for (const oldId of [14, 13, 12, 11, 10]) {
  const newId = remap[oldId];
  content = content.replaceAll(`sectionId: ${oldId}`, `sectionId: __TMP_${newId}__`);
}
content = content.replaceAll(/sectionId: __TMP_(\d+)__/g, "sectionId: $1");

content = content.replace(
  "// ── Section 10: Language Modeling ──",
  "// ── Section 11: Language Modeling ──"
);
content = content.replace(
  "// ── Section 11: Embeddings & RNNs ──",
  "// ── Section 12: Embeddings & RNNs ──"
);
content = content.replace(
  "// ── Section 12: Seq2Seq ──",
  "// ── Section 13: Seq2Seq ──"
);
content = content.replace(
  "// ── Section 13: Generative AI ──",
  "// ── Section 14: Generative AI ──"
);
content = content.replace(
  "// ── Section 14: Day 1 NLP ──",
  "// ── Section 10: Text Analysis & NER ──"
);

fs.writeFileSync(file, content, "utf8");
console.log("Remapped quiz section IDs 10–14");
