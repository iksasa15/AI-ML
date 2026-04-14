/** Auto-split from presentationData — section03-classification-intro */
export const slides = [
    {
      title: "Classification Overview",
      body: "Classification is a supervised learning task used to assign a new observation to a predefined category based on learned patterns from labeled data.",
      bullets: [
        "Output is a class label (e.g., 0/1, Yes/No).",
        "Used in spam detection, medical diagnosis, fraud detection, and customer churn prediction.",
      ],
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Machine_learning_workflow_diagram.png",
      ],
    },
    {
      title: "Logistic Regression: Definition",
      body: "Logistic Regression is a supervised algorithm for binary classification that estimates the probability of class membership.",
      bullets: [
        "Produces probabilities in the range [0, 1].",
        "Final class is determined using a threshold (commonly 0.5).",
        "Models the relationship between features and log-odds of the target.",
      ],
    },
    {
      title: "Why Not Linear Regression for Classification?",
      bullets: [
        "Linear regression predicts continuous values rather than discrete classes.",
        "Predicted values can be less than 0 or greater than 1, which is invalid for probabilities.",
        "It does not naturally provide a robust classification boundary.",
      ],
      note: "Logistic Regression solves this by mapping the linear score to probability through a sigmoid function.",
    },
    {
      title: "Sigmoid Mapping and Decision Threshold",
      formula: "P(y=1|x)=\\sigma(z)=\\frac{1}{1+e^{-z}}, \\; z=\\beta_0+\\beta^Tx",
      bullets: [
        "Sigmoid converts any real-valued score into a valid probability.",
        "If probability >= 0.5, predict class 1; otherwise class 0.",
        "Threshold can be adjusted based on business/clinical needs.",
      ],
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Logistic-curve.svg",
      ],
    },
    {
      title: "Key Assumptions for Logistic Regression",
      bullets: [
        "Observations should be independent.",
        "Predictors should not have severe multicollinearity.",
        "Relationship should be approximately linear in the log-odds space.",
      ],
      formula: "\\text{Odds}=\\frac{p}{1-p},\\quad \\text{Logit}(p)=\\log\\left(\\frac{p}{1-p}\\right)",
    },
    {
      title: "Maximum Likelihood Estimation (MLE)",
      body: "Logistic Regression parameters are estimated by maximizing the likelihood of observing the true class labels.",
      bullets: [
        "Different curves correspond to different parameter values.",
        "The optimal model is the one with the highest likelihood (or lowest log-loss).",
      ],
    },
    {
      title: "Logistic Regression: Strengths and Limits",
      sections: [
        {
          heading: "Strengths",
          bullets: [
            "High interpretability of coefficients and odds ratios.",
            "Fast training and strong baseline for binary tasks.",
          ],
        },
        {
          heading: "Limitations",
          bullets: [
            "May underperform on complex non-linear boundaries.",
            "Sensitive when classes strongly overlap.",
          ],
        },
      ],
    },
    {
      title: "Multiclass Extension of Logistic Regression",
      bullets: [
        "Multinomial (Softmax) Logistic Regression directly handles multiple classes.",
        "One-vs-All (OvA) trains one binary classifier per class.",
        "Final class is selected by highest predicted probability.",
      ],
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/7/71/Multiclass_classification.png",
      ],
    },
    {
      title: "K-Nearest Neighbors (K-NN): Core Idea",
      body: "K-NN is an instance-based, non-parametric algorithm that classifies a sample using the majority class among its nearest neighbors.",
      bullets: [
        "Choose K.",
        "Compute distance to all training points.",
        "Select K nearest points and apply majority voting.",
      ],
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/e/e7/KnnClassification.svg",
      ],
    },
    {
      title: "K-NN: Choosing K and Distance Metric",
      bullets: [
        "Small K: lower bias, higher variance (sensitive to noise).",
        "Large K: smoother boundary, may miss local structure.",
        "Common metrics: Euclidean, Manhattan, Hamming.",
      ],
      note: "Use cross-validation to choose K and scale numeric features before distance-based modeling.",
    },
    {
      title: "K-NN: Strengths and Limitations",
      sections: [
        {
          heading: "Strengths",
          bullets: [
            "Simple and intuitive.",
            "Effective on smaller, well-separated datasets.",
            "Naturally supports multiclass classification.",
          ],
        },
        {
          heading: "Limitations",
          bullets: [
            "Prediction can be slow on large datasets.",
            "Sensitive to irrelevant features and class imbalance.",
            "Performance drops in high-dimensional spaces.",
          ],
        },
      ],
    },

];
