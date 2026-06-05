/**
 * Enrich slide data with titleIcon, bullet icons, illustration, conceptAnimation.
 * Run: node scripts/enrich-slide-visuals.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, "../src/data/slides");

const SECTION_FILES = [
  "section01-foundations.js",
  "section02-regression.js",
  "section03-classification-intro.js",
  "section04-naive-bayes-trees.js",
  "section05-svm.js",
  "section06-clustering-pca.js",
  "section07-deep-learning.js",
  "section08-nlp-fundamentals.js",
  "section09-nlp-tokenization.js",
  "section10-nlp-language-modeling.js",
  "section11-nlp-contextual-rnn.js",
  "section12-nlp-seq2seq.js",
  "section13-generative-ai.js",
  "section14-day01-nlp-intro.js",
  "section15-rag.js",
  "section16-mlops.js",
];

const SKIP_TYPES = new Set([
  "section-divider",
  "intro-hero",
  "course-map",
  "bootcamp-timeline",
  "big-picture",
  "takeaway",
  "loading",
]);

const TITLE_ICON_RULES = [
  [/machine learning process|ml workflow|end.to.end/i, "workflow"],
  [/train(ing)?\s+set|test\s+set|hold.out|data\s+split/i, "train"],
  [/feature\s+scal|normaliz|standardiz/i, "scaling"],
  [/encod|one.hot|dummy\s+var|ordinal/i, "encoding"],
  [/miss(ing)?\s+data|imput|missforest/i, "missing-data"],
  [/leakage/i, "leakage"],
  [/preprocess|clean(ing)?\s+data/i, "pipeline"],
  [/regression|ols|ridge|lasso|linear\s+model/i, "regression"],
  [/classif|logistic|k-?nn|knn|discriminant/i, "classification"],
  [/decision\s+tree|cart|random\s+forest|bagging|boost|xgboost|adaboost/i, "tree"],
  [/naive\s+bayes|bayes/i, "naive-bayes"],
  [/svm|support\s+vector|kernel/i, "svm"],
  [/cluster|k-?means|kmeans|dbscan|hierarch/i, "clustering"],
  [/pca|principal\s+component|dimension(ality)?/i, "pca"],
  [/neural|deep\s+learn|forward\s+prop|backprop|activation/i, "neural-net"],
  [/cnn|convolution|pooling/i, "cnn"],
  [/rnn|lstm|gru|recurrent/i, "rnn"],
  [/token|bpe|wordpiece|subword/i, "token"],
  [/embed/i, "embedding"],
  [/seq2seq|encoder.decoder|machine\s+translation|nmt/i, "seq2seq"],
  [/attention|transformer|self.attention|multi.head/i, "attention"],
  [/bert|gpt|llm|generative|foundation\s+model/i, "llm"],
  [/rag|retrieval.augment/i, "rag"],
  [/vector\s*(db|store)|faiss|pinecone/i, "vector-db"],
  [/mlops|monitor|ci\/?cd|deploy/i, "monitoring"],
  [/nlp|natural\s+language|text\s+process/i, "nlp"],
  [/precision|recall|f1|confusion|metric|auc|roc/i, "metric"],
  [/regulariz|dropout|weight\s+decay/i, "regularization"],
  [/probability|sigmoid|softmax|odds/i, "probability"],
  [/threshold/i, "threshold"],
  [/cross.valid|k-fold|validation/i, "evaluate"],
  [/formula|equation|loss\s+function|gradient/i, "formula"],
  [/table|comparison|vs\.|versus/i, "compare"],
  [/overfit|underfit|bias.variance/i, "warning"],
  [/ensemble/i, "forest"],
  [/pipeline/i, "pipeline"],
  [/model/i, "model"],
  [/data/i, "data"],
];

const ILLUSTRATION_RULES = [
  [/machine learning process|ml workflow/i, "ml-workflow"],
  [/train(ing)?\s+set|test\s+set/i, "train-test-split"],
  [/feature\s+scal|preprocess|clean(ing)?\s+data/i, "preprocessing-pipeline"],
  [/bias.variance|overfit.*underfit/i, "bias-variance"],
  [/ridge|lasso|regulariz/i, "regularization-path"],
  [/nlp\s+pipeline|text\s+pipeline/i, "nlp-pipeline"],
  [/transformer|self.attention/i, "transformer-block"],
  [/rag|retrieval.augment/i, "rag-architecture"],
  [/mlops|ci\/?cd/i, "mlops-loop"],
  [/confusion\s+matrix/i, "confusion-matrix"],
  [/one.hot|dummy|ordinal|encod/i, "encoding-types"],
  [/cluster|k-?means/i, "clustering-plot"],
  [/svm|margin/i, "svm-margin-diagram"],
  [/pca|principal/i, "pca-axes"],
  [/decision\s+tree|cart/i, "decision-tree"],
  [/sigmoid|logistic/i, "sigmoid-curve"],
  [/embed/i, "embedding-space"],
  [/token|bpe|wordpiece/i, "token-flow"],
  [/random\s+forest|bagging|ensemble/i, "ensemble-bagging"],
  [/cross.valid|k-fold/i, "cross-validation"],
];

const ANIMATION_RULES = [
  [/ordinary\s+least\s+squares|\bols\b/i, "gradient-descent"],
  [/forward\s+propagation/i, "neural-network"],
  [/self.attention.*q/i, "attention-heatmap"],
  [/train(ing)?\s+set|test\s+set|data\s+leakage/i, "train-test-split"],
  [/feature\s+scal|normaliz|standardiz/i, "feature-scaling"],
  [/one.hot|dummy|ordinal|encod/i, "encoding-comparison"],
  [/logistic|sigmoid|threshold/i, "sigmoid-threshold"],
  [/k-?means|kmeans/i, "kmeans-clustering"],
  [/decision\s+tree|cart/i, "decision-tree-split"],
  [/svm|support\s+vector/i, "svm-margin"],
  [/pca|principal\s+component/i, "pca-projection"],
  [/confusion\s+matrix|precision.*recall/i, "confusion-matrix"],
  [/token|bpe|wordpiece/i, "tokenization-flow"],
  [/seq2seq|beam\s+search|machine\s+translation/i, "seq2seq-attention"],
  [/rag|retrieval.augment/i, "rag-pipeline"],
  [/mlops|monitor.*drift/i, "mlops-lifecycle"],
];

const BULLET_ICON_RULES = [
  [/train/i, "train"],
  [/test|valid|evaluat/i, "test"],
  [/scal|normaliz|standardiz/i, "scaling"],
  [/encod|one.hot|dummy|ordinal/i, "encoding"],
  [/miss(ing)?|imput/i, "missing-data"],
  [/leak/i, "leakage"],
  [/regress|linear|ols|ridge|lasso/i, "regression"],
  [/classif|logistic/i, "classification"],
  [/tree|split|leaf|branch/i, "tree"],
  [/forest|bagging|boost|ensemble/i, "forest"],
  [/svm|margin|kernel/i, "svm"],
  [/cluster|centroid/i, "clustering"],
  [/pca|component|dimension/i, "pca"],
  [/neural|layer|hidden|activation/i, "neural-net"],
  [/cnn|convolution/i, "cnn"],
  [/rnn|lstm|recurrent/i, "rnn"],
  [/token|subword|bpe/i, "token"],
  [/embed|vector/i, "embedding"],
  [/attention|transformer/i, "attention"],
  [/bert|gpt|llm|generative/i, "llm"],
  [/rag|retriev/i, "rag"],
  [/deploy|monitor|pipeline|mlops/i, "monitoring"],
  [/precision|recall|f1|metric|accuracy/i, "metric"],
  [/probability|sigmoid|bayes/i, "probability"],
  [/formula|equation|loss/i, "formula"],
  [/feature/i, "feature"],
  [/model/i, "model"],
  [/predict/i, "target"],
  [/data|dataset/i, "data"],
  [/important|always|never|must|key/i, "check"],
  [/warn|caution|avoid|risk/i, "warning"],
];

function matchRule(text, rules) {
  const hay = String(text || "");
  for (const [re, value] of rules) {
    if (re.test(hay)) return value;
  }
  return null;
}

function hasImage(slide) {
  return Boolean(slide.imageUrl || slide.imageUrls?.length);
}

function inferTitleIcon(slide) {
  const text = `${slide.title || ""} ${slide.subtitle || ""} ${slide.body || ""}`;
  return matchRule(text, TITLE_ICON_RULES) || "idea";
}

function inferIllustration(slide) {
  if (hasImage(slide)) return undefined;
  if (slide.conceptAnimation) return undefined;
  const text = `${slide.title || ""} ${slide.subtitle || ""}`;
  return matchRule(text, ILLUSTRATION_RULES) || undefined;
}

function inferAnimation(slide) {
  const text = `${slide.title || ""} ${slide.subtitle || ""}`;
  return matchRule(text, ANIMATION_RULES) || undefined;
}

function inferBulletIcon(text, fallbackIcon) {
  return matchRule(text, BULLET_ICON_RULES) || fallbackIcon || "check";
}

function enrichBullet(entry, fallbackIcon) {
  if (typeof entry === "object" && entry !== null && "text" in entry) {
    const text = String(entry.text ?? "");
    const icon = entry.icon || inferBulletIcon(text, fallbackIcon);
    return icon ? { text, icon } : text;
  }
  const text = String(entry ?? "");
  const icon = inferBulletIcon(text, fallbackIcon);
  return icon ? { text, icon } : text;
}

function enrichBullets(bullets, fallbackIcon) {
  if (!Array.isArray(bullets) || !bullets.length) return bullets;
  return bullets.map((b) => enrichBullet(b, fallbackIcon));
}

const PHASE_ICONS = ["neural-net", "train", "cnn", "deploy"];

function enrichSlide(slide) {
  if (SKIP_TYPES.has(slide.type)) {
    const phaseMatch = String(slide.title || "").match(/^Phase\s+(\d)/i);
    if (phaseMatch) {
      const phase = Number(phaseMatch[1]) - 1;
      return {
        ...slide,
        titleIcon: PHASE_ICONS[phase] || "neural-net",
        illustration: "ml-workflow",
      };
    }
    return slide;
  }

  const next = { ...slide };
  const titleIcon = inferTitleIcon(next);
  next.titleIcon = titleIcon;

  const anim = inferAnimation(next);
  if (anim) next.conceptAnimation = anim;

  const illust = inferIllustration(next);
  if (illust) next.illustration = illust;

  if (Array.isArray(next.bullets)) {
    next.bullets = enrichBullets(next.bullets, titleIcon);
  }

  if (Array.isArray(next.columns)) {
    next.columns = next.columns.map((col) => ({
      ...col,
      bullets: enrichBullets(col.bullets, titleIcon),
    }));
  }

  if (Array.isArray(next.sections)) {
    next.sections = next.sections.map((sec) => ({
      ...sec,
      bullets: enrichBullets(sec.bullets, titleIcon),
    }));
  }

  return next;
}

function writeSectionFile(file, slides, headerComment) {
  const content = `${headerComment}export const slides = ${JSON.stringify(slides, null, 2)};\n`;
  fs.writeFileSync(path.join(slidesDir, file), content, "utf8");
}

let total = 0;

for (const file of SECTION_FILES) {
  const filePath = path.join(slidesDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const headerMatch = raw.match(/^(\/\*\*[\s\S]*?\*\/\s*)/);
  const headerComment = headerMatch ? headerMatch[1] : `/** ${file} */\n`;

  const mod = await import(pathToFileURL(filePath).href);
  const enriched = mod.slides.map(enrichSlide);
  writeSectionFile(file, enriched, headerComment);
  total += enriched.length;
  console.log(`Enriched ${file}: ${enriched.length} slides`);
}

console.log(`Done — ${total} slides enriched across ${SECTION_FILES.length} files`);
