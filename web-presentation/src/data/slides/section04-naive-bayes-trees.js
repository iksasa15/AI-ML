/** Auto-split from presentationData — section04-naive-bayes-trees */
export const slides = [
  {
    "title": "Naive Bayes: Bayes' Theorem",
    "subtitle": "Core Probability Rule",
    "formula": "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}",
    "bullets": [
      {
        "text": "P(A|B): posterior probability after observing evidence B.",
        "icon": "probability"
      },
      {
        "text": "P(A): prior belief before seeing evidence.",
        "icon": "naive-bayes"
      },
      {
        "text": "P(B|A): likelihood of evidence if class A is true.",
        "icon": "naive-bayes"
      },
      {
        "text": "P(B): evidence probability (normalization term).",
        "icon": "scaling"
      }
    ],
    "note": "This theorem updates beliefs when new evidence appears.",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Bayes_theorem_tree_diagrams.svg"
    ],
    "speakerNote": "This theorem updates beliefs when new evidence appears.",
    "titleIcon": "naive-bayes"
  },
  {
    "title": "How Naive Bayes Classifies",
    "bullets": [
      {
        "text": "Compute class posterior for each class: P(Class | X).",
        "icon": "classification"
      },
      {
        "text": "Estimate prior and feature likelihoods from training data.",
        "icon": "train"
      },
      {
        "text": "Compare posterior scores across classes.",
        "icon": "classification"
      },
      {
        "text": "Assign the class with the highest posterior probability.",
        "icon": "probability"
      }
    ],
    "formula": "\\hat{y}=\\arg\\max_{c\\in\\mathcal{C}} P(c)\\prod_{j=1}^{m}P(x_j\\mid c)",
    "note": "For numerical stability, implementations often use log-probabilities.",
    "speakerNote": "For numerical stability, implementations often use log-probabilities.",
    "titleIcon": "classification"
  },
  {
    "title": "Why Is It Called 'Naive'?",
    "subtitle": "Conditional Independence Assumption",
    "body": "Naive Bayes assumes features are conditionally independent given the class label.",
    "bullets": [
      {
        "text": "Simplifies parameter estimation and speeds up training.",
        "icon": "train"
      },
      {
        "text": "Works well in text classification and high-dimensional sparse data.",
        "icon": "classification"
      },
      {
        "text": "Can still perform well even when independence is not fully true.",
        "icon": "naive-bayes"
      }
    ],
    "note": "When comparing classes for the same X, P(X) is constant and can be ignored.",
    "speakerNote": "When comparing classes for the same X, P(X) is constant and can be ignored.",
    "titleIcon": "naive-bayes"
  },
  {
    "title": "Naive Bayes: Practical Notes",
    "table": {
      "headers": [
        "Variant",
        "Typical Data Type",
        "Key Idea"
      ],
      "rows": [
        [
          "Gaussian NB",
          "Continuous",
          "Assumes each feature follows a Gaussian distribution."
        ],
        [
          "Multinomial NB",
          "Count-based",
          "Common for document word counts."
        ],
        [
          "Bernoulli NB",
          "Binary",
          "Uses binary presence/absence features."
        ]
      ]
    },
    "bullets": [
      {
        "text": "Handle zero-frequency with smoothing (e.g., Laplace smoothing).",
        "icon": "naive-bayes"
      },
      {
        "text": "Scale and preprocessing depend on feature type and variant.",
        "icon": "scaling"
      }
    ],
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Handle zero-frequency with smoothing (e.g., Laplace smoothing). · Scale and preprocessing depend on feature type and variant.. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "naive-bayes"
  },
  {
    "title": "Decision Tree Classification (CART)",
    "body": "Decision Tree Classification predicts class labels by recursively splitting feature space into purer class regions.",
    "bullets": [
      {
        "text": "Internal nodes represent feature-based decisions.",
        "icon": "feature"
      },
      {
        "text": "Branches represent decision outcomes.",
        "icon": "tree"
      },
      {
        "text": "Leaf nodes output final class prediction.",
        "icon": "tree"
      }
    ],
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Decision_tree_model.png"
    ],
    "speakerNote": "Summarize the body paragraph, then expand each bullet. Land: Internal nodes represent feature-based decisions. · Branches represent decision outcomes.. Budget ~2 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "classification",
    "conceptAnimation": "decision-tree-split"
  },
  {
    "title": "How Splits Are Chosen in Classification Trees",
    "bullets": [
      {
        "text": "Choose split that best separates classes at each node.",
        "icon": "tree"
      },
      {
        "text": "Stop splitting using rules like max depth or minimum samples.",
        "icon": "tree"
      },
      {
        "text": "Gini impurity and entropy measure node purity — lower is better.",
        "icon": "tree"
      },
      {
        "text": "Splits are chosen greedily to maximize information gain.",
        "icon": "idea"
      }
    ],
    "sections": [
      {
        "heading": "Gini Impurity (CART default)",
        "formula": "Gini(S)=1-\\sum_{k=1}^{K}p_k^2"
      },
      {
        "heading": "Entropy and Information Gain",
        "formula": "Entropy(S)=-\\sum_{k=1}^{K}p_k\\log_2 p_k"
      }
    ],
    "note": "Better splits reduce impurity and increase class purity in child nodes.",
    "speakerNote": "Better splits reduce impurity and increase class purity in child nodes.",
    "titleIcon": "classification"
  },
  {
    "title": "Decision Tree: Classification vs Regression",
    "table": {
      "headers": [
        "Aspect",
        "Classification Tree",
        "Regression Tree"
      ],
      "rows": [
        [
          "Target",
          "Categorical class",
          "Continuous value"
        ],
        [
          "Split criterion",
          "Gini / Entropy",
          "MSE / MAE"
        ],
        [
          "Leaf output",
          "Class label or class probability",
          "Numeric mean/median"
        ]
      ]
    },
    "note": "Both use recursive partitioning, but optimize different objectives.",
    "speakerNote": "Both use recursive partitioning, but optimize different objectives.",
    "titleIcon": "regression",
    "conceptAnimation": "decision-tree-split"
  },
  {
    "title": "Random Forest Classification",
    "subtitle": "Ensemble Learning by Bagging",
    "bullets": [
      {
        "text": "Sample bootstrap data and train many trees.",
        "icon": "train"
      },
      {
        "text": "Each tree predicts a class for the new sample.",
        "icon": "tree"
      },
      {
        "text": "Final class is selected by majority voting.",
        "icon": "classification"
      }
    ],
    "formula": "\\hat{y}_{RF}(x)=\\operatorname*{mode}\\{\\hat{y}_1(x),\\hat{y}_2(x),\\ldots,\\hat{y}_T(x)\\}",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Random_forest_explain.png"
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Sample bootstrap data and train many trees. · Each tree predicts a class for the new sample.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "classification"
  },
  {
    "title": "Why Random Forest Often Outperforms a Single Tree",
    "table": {
      "headers": [
        "Property",
        "Single Decision Tree",
        "Random Forest"
      ],
      "rows": [
        [
          "Variance",
          "High",
          "Lower (averaging effect)"
        ],
        [
          "Overfitting risk",
          "Higher",
          "Lower"
        ],
        [
          "Interpretability",
          "High",
          "Moderate"
        ],
        [
          "Predictive robustness",
          "Sensitive to data noise",
          "More stable"
        ]
      ]
    },
    "note": "Random Forest improves generalization by combining diverse weak learners.",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/d/d8/Decision_Tree_vs._Random_Forest.png"
    ],
    "speakerNote": "Random Forest improves generalization by combining diverse weak learners.",
    "titleIcon": "tree"
  },
  {
    "title": "Classification Errors: FP and FN",
    "bullets": [
      {
        "text": "False Positive (Type I): model predicts positive, but actual is negative.",
        "icon": "model"
      },
      {
        "text": "False Negative (Type II): model predicts negative, but actual is positive.",
        "icon": "model"
      },
      {
        "text": "Error impact depends on domain costs (e.g., healthcare vs spam filtering).",
        "icon": "classification"
      }
    ],
    "note": "Model evaluation should consider error trade-offs, not accuracy alone.",
    "speakerNote": "Model evaluation should consider error trade-offs, not accuracy alone.",
    "titleIcon": "classification"
  },
  {
    "title": "Confusion Matrix and Accuracy",
    "table": {
      "headers": [
        "Metric",
        "Meaning"
      ],
      "rows": [
        [
          "TP",
          "Correctly predicted positives"
        ],
        [
          "TN",
          "Correctly predicted negatives"
        ],
        [
          "FP",
          "Incorrectly predicted positives"
        ],
        [
          "FN",
          "Incorrectly predicted negatives"
        ]
      ]
    },
    "formula": "Accuracy=\\frac{TP+TN}{TP+TN+FP+FN}",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/ConfusionMatrix.png"
    ],
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "metric",
    "conceptAnimation": "confusion-matrix"
  },
  {
    "title": "Precision, Recall, and F1-Score",
    "bullets": [
      {
        "text": "Precision: of predicted positives, how many are truly positive.",
        "icon": "metric"
      },
      {
        "text": "Recall: of actual positives, how many were detected.",
        "icon": "metric"
      },
      {
        "text": "F1-score: harmonic mean balancing precision and recall.",
        "icon": "metric"
      }
    ],
    "sections": [
      {
        "heading": "Formulas",
        "formula": "Precision=\\frac{TP}{TP+FP},\\quad Recall=\\frac{TP}{TP+FN}"
      },
      {
        "heading": "F1",
        "formula": "F1=2\\cdot\\frac{Precision\\cdot Recall}{Precision+Recall}"
      }
    ],
    "note": "Use F1 especially when class distribution is imbalanced.",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Precisionrecall.svg"
    ],
    "speakerNote": "Use F1 especially when class distribution is imbalanced.",
    "titleIcon": "metric",
    "conceptAnimation": "confusion-matrix"
  }
];
