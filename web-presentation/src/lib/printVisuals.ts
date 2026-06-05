import type { ConceptAnimationId } from "./conceptAnimations";
import { getConceptAnimationId } from "./conceptAnimations";
import { ILLUSTRATION_CAPTIONS, isSlideIllustrationId } from "./slideIllustrations";
import type { SlideRecord } from "./slideMarkup";

const CONCEPT_PRINT_SVG: Partial<Record<ConceptAnimationId, string>> = {
  "gradient-descent": `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg"><path d="M20 150 Q200 30 380 150" fill="none" stroke="var(--accent)" stroke-width="2.5"/><circle cx="300" cy="75" r="7" fill="var(--color-gold)"/><text x="200" y="170" text-anchor="middle" font-size="10" fill="currentColor">parameter w</text></svg>`,
  "neural-network": `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="80" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="60" cy="140" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="210" cy="60" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="210" cy="110" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="210" cy="160" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="360" cy="95" r="12" fill="var(--card)" stroke="var(--accent)"/><circle cx="360" cy="145" r="12" fill="var(--card)" stroke="var(--accent)"/><line x1="72" y1="80" x2="198" y2="60" stroke="var(--accent)" opacity="0.5"/><line x1="72" y1="140" x2="198" y2="160" stroke="var(--accent)" opacity="0.5"/><line x1="222" y1="110" x2="348" y2="95" stroke="var(--accent)" opacity="0.7"/></svg>`,
  "attention-heatmap": `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="30" width="40" height="30" fill="var(--accent)" opacity="0.2"/><rect x="80" y="30" width="40" height="30" fill="var(--accent)" opacity="0.55"/><rect x="120" y="30" width="40" height="30" fill="var(--accent)" opacity="0.35"/><rect x="160" y="30" width="40" height="30" fill="var(--accent)" opacity="0.75"/><rect x="60" y="70" width="40" height="30" fill="var(--accent)" opacity="0.4"/><rect x="100" y="70" width="40" height="30" fill="var(--accent)" opacity="0.85"/><rect x="140" y="70" width="40" height="30" fill="var(--accent)" opacity="0.25"/></svg>`,
  "train-test-split": `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="30" width="220" height="40" rx="6" fill="var(--accent)" opacity="0.35" stroke="var(--accent)"/><rect x="270" y="30" width="90" height="40" rx="6" fill="var(--color-gold)" opacity="0.35" stroke="var(--color-gold)"/><text x="150" y="55" text-anchor="middle" font-size="11">Train 80%</text><text x="315" y="55" text-anchor="middle" font-size="11">Test 20%</text></svg>`,
  "feature-scaling": `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg"><rect x="80" y="30" width="40" height="60" fill="var(--accent)" opacity="0.7"/><rect x="160" y="55" width="40" height="35" fill="var(--accent)"/><rect x="240" y="43" width="40" height="47" fill="var(--color-gold)" opacity="0.8"/><line x1="60" y1="90" x2="320" y2="90" stroke="var(--border)"/></svg>`,
  "encoding-comparison": `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="25" width="90" height="50" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)"/><rect x="155" y="25" width="90" height="50" rx="4" fill="var(--accent)" opacity="0.35" stroke="var(--accent)"/><rect x="280" y="25" width="90" height="50" rx="4" fill="var(--color-gold)" opacity="0.3" stroke="var(--color-gold)"/><text x="75" y="55" text-anchor="middle" font-size="10">Ordinal</text><text x="200" y="55" text-anchor="middle" font-size="10">One-hot</text><text x="325" y="55" text-anchor="middle" font-size="10">Dummy</text></svg>`,
  "sigmoid-threshold": `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg"><path d="M40 100 C120 100 180 20 360 20" fill="none" stroke="var(--accent)" stroke-width="2.5"/><line x1="200" y1="10" x2="200" y2="110" stroke="var(--border)" stroke-dasharray="4"/><circle cx="200" cy="60" r="5" fill="var(--color-gold)"/></svg>`,
  "kmeans-clustering": `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="60" r="5" fill="var(--accent)"/><circle cx="95" cy="75" r="5" fill="var(--accent)"/><circle cx="70" cy="80" r="5" fill="var(--accent)"/><circle cx="200" cy="55" r="5" fill="var(--color-gold)"/><circle cx="215" cy="70" r="5" fill="var(--color-gold)"/><circle cx="120" cy="120" r="5" fill="var(--accent)" opacity="0.5"/><circle cx="80" cy="68" r="22" fill="none" stroke="var(--accent)"/><circle cx="208" cy="62" r="22" fill="none" stroke="var(--color-gold)"/></svg>`,
  "decision-tree-split": `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="20" r="8" fill="var(--accent)"/><circle cx="100" cy="65" r="6" fill="var(--accent)" opacity="0.7"/><circle cx="200" cy="65" r="6" fill="var(--accent)" opacity="0.7"/><line x1="150" y1="28" x2="100" y2="59" stroke="var(--accent)"/><line x1="150" y1="28" x2="200" y2="59" stroke="var(--accent)"/><text x="150" y="105" text-anchor="middle" font-size="9">MSE / Gini split</text></svg>`,
  "svm-margin": `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg"><line x1="200" y1="10" x2="200" y2="110" stroke="var(--accent)" stroke-width="2"/><line x1="170" y1="10" x2="170" y2="110" stroke="var(--accent)" opacity="0.35" stroke-dasharray="4"/><line x1="230" y1="10" x2="230" y2="110" stroke="var(--accent)" opacity="0.35" stroke-dasharray="4"/><circle cx="120" cy="70" r="5" fill="var(--accent)"/><circle cx="280" cy="50" r="5" fill="var(--color-gold)"/></svg>`,
  "pca-projection": `<svg viewBox="0 0 300 140" xmlns="http://www.w3.org/2000/svg"><ellipse cx="150" cy="70" rx="100" ry="35" fill="var(--accent)" opacity="0.12" stroke="var(--accent)"/><line x1="80" y1="110" x2="220" y2="30" stroke="var(--color-gold)" stroke-width="2"/><circle cx="130" cy="75" r="4" fill="var(--accent)"/><circle cx="160" cy="68" r="4" fill="var(--accent)"/><circle cx="175" cy="62" r="4" fill="var(--accent)"/></svg>`,
  "confusion-matrix": `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="30" width="50" height="50" fill="var(--accent)" opacity="0.45"/><rect x="100" y="30" width="50" height="50" fill="var(--accent)" opacity="0.15"/><rect x="50" y="80" width="50" height="50" fill="var(--accent)" opacity="0.15"/><rect x="100" y="80" width="50" height="50" fill="var(--accent)" opacity="0.45"/></svg>`,
  "tokenization-flow": `<svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="22" width="80" height="36" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)"/><text x="60" y="44" text-anchor="middle" font-size="9">text</text><path d="M110 40 H140" stroke="var(--accent)"/><rect x="150" y="22" width="100" height="36" rx="4" fill="var(--accent)" opacity="0.35" stroke="var(--accent)"/><text x="200" y="44" text-anchor="middle" font-size="9">subwords</text><path d="M260 40 H290" stroke="var(--accent)"/><rect x="300" y="22" width="80" height="36" rx="4" fill="var(--color-gold)" opacity="0.3" stroke="var(--color-gold)"/><text x="340" y="44" text-anchor="middle" font-size="9">ids</text></svg>`,
  "seq2seq-attention": `<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="70" height="40" rx="4" fill="var(--accent)" opacity="0.25" stroke="var(--accent)"/><text x="65" y="55" text-anchor="middle" font-size="9">Encoder</text><path d="M110 50 H170" stroke="var(--accent)" marker-end="url(#arr)"/><rect x="180" y="30" width="70" height="40" rx="4" fill="var(--accent)" opacity="0.35" stroke="var(--accent)"/><text x="215" y="55" text-anchor="middle" font-size="9">Attention</text><path d="M260 50 H300" stroke="var(--accent)"/><rect x="310" y="30" width="60" height="40" rx="4" fill="var(--color-gold)" opacity="0.3" stroke="var(--color-gold)"/><text x="340" y="55" text-anchor="middle" font-size="9">Decoder</text></svg>`,
  "rag-pipeline": `<svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="20" width="70" height="35" rx="4" fill="var(--accent)" opacity="0.25" stroke="var(--accent)"/><rect x="110" y="20" width="70" height="35" rx="4" fill="var(--accent)" opacity="0.35" stroke="var(--accent)"/><rect x="200" y="20" width="70" height="35" rx="4" fill="var(--accent)" opacity="0.45" stroke="var(--accent)"/><rect x="290" y="20" width="70" height="35" rx="4" fill="var(--accent)" opacity="0.55" stroke="var(--accent)"/></svg>`,
  "mlops-lifecycle": `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="60" r="40" fill="none" stroke="var(--border)"/><circle cx="100" cy="20" r="8" fill="var(--accent)" opacity="0.6"/><circle cx="138" cy="60" r="8" fill="var(--accent)" opacity="0.6"/><circle cx="100" cy="100" r="8" fill="var(--accent)" opacity="0.6"/><circle cx="62" cy="60" r="8" fill="var(--accent)" opacity="0.6"/></svg>`,
};

const ILLUSTRATION_PRINT_SVG: Partial<Record<string, string>> = {
  "ml-workflow": `<svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="25" width="60" height="30" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)"/><rect x="100" y="25" width="60" height="30" rx="4" fill="var(--accent)" opacity="0.3" stroke="var(--accent)"/><rect x="180" y="25" width="60" height="30" rx="4" fill="var(--accent)" opacity="0.4" stroke="var(--accent)"/><rect x="260" y="25" width="60" height="30" rx="4" fill="var(--accent)" opacity="0.5" stroke="var(--accent)"/></svg>`,
  "train-test-split": CONCEPT_PRINT_SVG["train-test-split"]!,
  "transformer-block": `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="15" width="100" height="28" rx="4" fill="var(--accent)" opacity="0.25" stroke="var(--accent)"/><rect x="100" y="55" width="100" height="28" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)"/></svg>`,
  "decision-tree": `<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg"><circle cx="150" cy="20" r="8" fill="var(--accent)"/><circle cx="100" cy="60" r="6" fill="var(--accent)" opacity="0.7"/><circle cx="200" cy="60" r="6" fill="var(--accent)" opacity="0.7"/><line x1="150" y1="28" x2="100" y2="54" stroke="var(--accent)"/><line x1="150" y1="28" x2="200" y2="54" stroke="var(--accent)"/></svg>`,
};

export function buildConceptPrintMarkup(slide: SlideRecord): string {
  const id = getConceptAnimationId(slide);
  if (!id) return "";
  const svg = CONCEPT_PRINT_SVG[id];
  if (!svg) {
    return `<figure class="concept-card concept-card--print"><p class="concept-caption">Diagram: ${id.replace(/-/g, " ")}</p></figure>`;
  }
  return `
    <figure class="concept-card concept-card--print">
      <div class="concept-svg-wrap concept-svg-wrap--gd">${svg}</div>
    </figure>
  `;
}

export function buildIllustrationPrintMarkup(illustrationId?: string): string {
  if (!illustrationId || !isSlideIllustrationId(illustrationId)) return "";
  const caption = ILLUSTRATION_CAPTIONS[illustrationId];
  const svg =
    ILLUSTRATION_PRINT_SVG[illustrationId] ||
    `<svg viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="10" width="320" height="40" rx="6" fill="var(--accent)" opacity="0.12" stroke="var(--accent)"/></svg>`;
  return `
    <figure class="illustration-slot illustration-slot--print" aria-label="${caption}">
      <div class="illustration-slot-graphic">${svg}</div>
      <figcaption class="illustration-slot-caption">${caption}</figcaption>
    </figure>
  `;
}
