export const SLIDE_ILLUSTRATION_IDS = [
  "ml-workflow",
  "train-test-split",
  "preprocessing-pipeline",
  "bias-variance",
  "regularization-path",
  "nlp-pipeline",
  "transformer-block",
  "rag-architecture",
  "mlops-loop",
  "confusion-matrix",
  "encoding-types",
  "clustering-plot",
  "svm-margin-diagram",
  "pca-axes",
  "decision-tree",
  "sigmoid-curve",
  "embedding-space",
  "token-flow",
  "ensemble-bagging",
  "cross-validation",
] as const;

export type SlideIllustrationId = (typeof SLIDE_ILLUSTRATION_IDS)[number];

export function isSlideIllustrationId(value: string): value is SlideIllustrationId {
  return (SLIDE_ILLUSTRATION_IDS as readonly string[]).includes(value);
}

export const ILLUSTRATION_CAPTIONS: Record<SlideIllustrationId, string> = {
  "ml-workflow": "End-to-end machine learning workflow",
  "train-test-split": "Hold-out train and test partitions",
  "preprocessing-pipeline": "Data preprocessing before modeling",
  "bias-variance": "Bias–variance trade-off",
  "regularization-path": "Coefficients shrink with regularization strength",
  "nlp-pipeline": "Typical NLP processing pipeline",
  "transformer-block": "Transformer encoder block (simplified)",
  "rag-architecture": "Retrieval-augmented generation flow",
  "mlops-loop": "MLOps continuous delivery loop",
  "confusion-matrix": "Confusion matrix layout",
  "encoding-types": "Categorical encoding strategies",
  "clustering-plot": "Cluster assignments in feature space",
  "svm-margin-diagram": "Maximum-margin classifier",
  "pca-axes": "Principal components in 2D projection",
  "decision-tree": "Hierarchical decision splits",
  "sigmoid-curve": "Sigmoid maps scores to probabilities",
  "embedding-space": "Words as vectors in embedding space",
  "token-flow": "Text to subword tokens",
  "ensemble-bagging": "Bootstrap samples feed ensemble trees",
  "cross-validation": "K-fold cross-validation folds",
};
