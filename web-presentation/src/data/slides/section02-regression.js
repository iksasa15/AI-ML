/** Auto-split from presentationData — section02-regression */
export const slides = [
    {
      title: "Regression - Simple Linear Regression",
      subtitle: "What is Simple Linear Regression?",
      body: "Simple Linear Regression models the relationship between one independent variable x and one dependent variable y using a straight line.",
      imageUrls: ["/assets/plots/slide-19-1.png"],
      formula: "y = b_0 + b_1 x",
      table: {
        title: "Meaning of Each Symbol",
        headers: ["Symbol", "Meaning"],
        rows: [
          ["y", "Predicted output (dependent variable)."],
          ["x", "Input feature (independent variable)."],
          ["b_0", "Intercept: predicted value of y when x = 0."],
          ["b_1", "Slope: expected change in y when x increases by 1 unit."],
        ],
      },
      sections: [
        {
          heading: "Practical Example",
          body: "Suppose x = Hours of Study and y = Exam Score.",
          formula: "y = 40 + 5x",
          bullets: [
            "Slope (b_1 = 5): each extra study hour increases predicted score by 5 points.",
            "Intercept (b_0 = 40): if study hours are 0, predicted score is 40.",
          ],
        },
      ],
      note: "The regression line is the best-fit line that minimizes prediction errors.",
    },
    {
      title: "Ordinary Least Squares (OLS)",
      subtitle: "What is OLS?",
      body: "Ordinary Least Squares is the most common method to fit a linear regression line by minimizing prediction errors.",
      bullets: [
        "Actual value: y_i",
        "Predicted value: \\(\\hat{y}_i\\)",
        "Residual error: \\(e_i = y_i - \\hat{y}_i\\)",
      ],
      formula: "\\min \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2",
      note: "Squared errors make all errors positive, penalize large errors, and provide a clear optimization objective.",
    },
    {
      title: "Multiple Linear Regression",
      subtitle: "Definition",
      body: "Multiple Linear Regression describes the relationship between one dependent variable y and two or more independent variables.",
      formula: "y = b_0 + b_1x_1 + b_2x_2 + \\cdots + b_nx_n",
      bullets: [
        "Purpose: predict the target variable y using multiple input factors.",
        "Compared with simple regression, it models more realistic multi-factor scenarios.",
      ],
      sections: [
        {
          heading: "Example",
          body: "Suppose we want to predict house price using house size and number of bedrooms.",
          formula: "y = 50 + 2.5x_1 + 15x_2",
          bullets: [
            "For each additional 1 m^2, price increases by 2.5 (holding other variables constant).",
            "For each additional bedroom, price increases by 15 (holding other variables constant).",
          ],
        },
      ],
      table: {
        title: "Table for Clarification",
        headers: [
          "House",
          "Size (x_1) m^2",
          "Bedrooms (x_2)",
          "Predicted Price (y in $1000)",
        ],
        rows: [
          ["A", "100", "2", "50 + 2.5(100) + 15(2) = 330"],
          ["B", "120", "3", "50 + 2.5(120) + 15(3) = 395"],
          ["C", "80", "1", "50 + 2.5(80) + 15(1) = 265"],
        ],
      },
    },
    {
      title: "R-Squared (R^2)",
      subtitle: "Definition",
      body: "R^2 is a goodness-of-fit metric in regression. It measures how much variation in y is explained by model inputs.",
      imageUrls: ["/assets/plots/slide-22-1.png", "/assets/plots/slide-22-2.png"],
      formula: "R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}",
      sections: [
        {
          heading: "Formulas",
          formula: "SS_{res} = \\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2",
        },
        {
          heading: "Formulas (continued)",
          formula: "SS_{tot} = \\sum_{i=1}^{n}(y_i - \\bar{y})^2",
        },
      ],
      table: {
        title: "What Do These Terms Mean?",
        headers: ["Term", "Description"],
        rows: [
          [
            "SS_res",
            "Residual Sum of Squares: squared distance between actual values and predictions.",
          ],
          [
            "SS_tot",
            "Total Sum of Squares: squared distance between actual values and the mean of y.",
          ],
        ],
      },
      bullets: [
        "Larger R^2 means better explanatory power.",
        "R^2 = 1 means perfect fit; R^2 = 0 means mean-level prediction performance.",
      ],
    },
    {
      title: "Adjusted R-Squared",
      subtitle: "Why R^2 Alone Is Not Enough",
      body: "In multiple regression, adding predictors often increases R^2 even when new variables are not useful.",
      formula: "\\bar{R}^2 = 1 - (1 - R^2)\\frac{n-1}{n-p-1}",
      bullets: [
        "Adjusted R^2 penalizes unnecessary predictors.",
        "It is usually a better metric for comparing models with different numbers of predictors.",
      ],
      table: {
        title: "Quick Example",
        headers: ["Model", "Predictors", "R^2", "Adjusted R^2", "Interpretation"],
        rows: [
          ["A", "x_1, x_2", "0.82", "0.81", "Strong and efficient model"],
          [
            "B",
            "x_1, x_2, x_3, x_4",
            "0.83",
            "0.79",
            "Higher R^2, but worse after penalty",
          ],
        ],
      },
      note: "Model B looks better by R^2, but Adjusted R^2 shows extra variables are likely not helpful.",
    },
    {
      title: "Assumptions of Linear Regression (Overview)",
      body: "Linear regression is most reliable when core assumptions are approximately satisfied.",
      table: {
        headers: ["Assumption", "Meaning", "If Violated"],
        rows: [
          ["Linearity", "Relationship between y and each x is roughly linear.", "Biased predictions"],
          [
            "Homoscedasticity",
            "Error variance is roughly constant across fitted values.",
            "Unstable standard errors",
          ],
          [
            "Normality of Errors",
            "Residuals are approximately normal.",
            "Inference becomes less reliable",
          ],
          ["Independence", "Observations/errors are independent.", "Biased significance tests"],
          [
            "No Severe Multicollinearity",
            "Predictors are not highly redundant.",
            "Coefficients become unstable",
          ],
          [
            "Limited Outlier Influence",
            "Extreme points do not dominate the fit.",
            "Distorted regression line",
          ],
        ],
      },
    },
    {
      title: "Assumptions with Practical Examples",
      imageUrls: ["/assets/plots/slide-25-1.png"],
      table: {
        headers: ["Assumption", "Simple Example", "Practical Check"],
        rows: [
          [
            "Linearity",
            "Sales increase approximately linearly with ad spend.",
            "Scatter plot / residual plot",
          ],
          [
            "Homoscedasticity",
            "Prediction errors are similar for low and high sales values.",
            "Residuals vs fitted values",
          ],
          [
            "Normal Errors",
            "Most residuals are near zero, few at extremes.",
            "Histogram / Q-Q plot of residuals",
          ],
          [
            "Independence",
            "Customer records are independent.",
            "Study design / Durbin-Watson for time data",
          ],
          [
            "Low Multicollinearity",
            "TV_ads and radio_ads are not near-duplicates.",
            "Correlation matrix / VIF",
          ],
          [
            "Outlier Control",
            "One extreme house price should not define the whole model.",
            "Cook's distance / leverage diagnostics",
          ],
        ],
      },
      note: "If one assumption is violated, use transformations, robust methods, feature engineering, or a different model.",
    },
    {
      title: "Dummy Variables and Dummy Variable Trap",
      subtitle: "Dummy Variables",
      body: "Categorical variables are converted into binary columns (0/1).",
      table: {
        title: "Example: State",
        headers: ["State", "D_1 (New York)", "D_2 (California)"],
        rows: [
          ["New York", "1", "0"],
          ["California", "0", "1"],
        ],
      },
      sections: [
        {
          heading: "Dummy Variable Trap",
          body: "If all dummy columns are included with an intercept, perfect multicollinearity appears.",
          formula: "D_2 = 1 - D_1",
          bullets: [
            "Coefficients become unstable.",
            "Interpretation becomes unreliable.",
            "Statistical tests may be misleading.",
          ],
        },
      ],
    },
    {
      title: "Solving Dummy Variable Trap",
      subtitle: "Solution",
      body: "Drop one dummy column and keep it as the baseline category.",
      formula: "\\text{Profit} = b_0 + b_1x_1 + b_2x_2 + b_3x_3 + b_4D_1",
      bullets: [
        "If we drop California, then D_1 = 1 means New York and D_1 = 0 means California baseline.",
        "This keeps category information while avoiding multicollinearity.",
      ],
      table: {
        title: "Interpretation Example",
        headers: ["Case", "D_1", "State Meaning"],
        rows: [
          ["A", "1", "New York"],
          ["B", "0", "California (reference)"],
        ],
      },
    },
    {
      title: "Building a Regression Model",
      subtitle: "Goal",
      body: "Model-building methods select the most relevant predictors to balance simplicity, interpretability, and predictive accuracy.",
      table: {
        headers: ["Method", "Core Idea", "Best Use Case"],
        rows: [
          [
            "All-in",
            "Use all predictors directly.",
            "Strong prior knowledge that all variables matter",
          ],
          [
            "Backward Elimination",
            "Start full and remove least significant variables.",
            "Many candidate predictors",
          ],
          [
            "Forward Selection",
            "Start empty and add most significant variables.",
            "Need a compact model from scratch",
          ],
          [
            "Bidirectional (Stepwise)",
            "Add and remove dynamically.",
            "Flexible search for balanced model",
          ],
        ],
      },
    },
    {
      title: "Model-Building Methods (Steps + Example)",
      sections: [
        {
          heading: "1) Backward Elimination",
          bullets: [
            "Set significance level (e.g., SL = 0.05).",
            "Fit model with all predictors.",
            "Remove highest p-value if p > SL.",
            "Refit and repeat.",
          ],
        },
        {
          heading: "2) Forward Selection",
          bullets: [
            "Start with no predictors.",
            "Add variable with lowest p-value below SL.",
            "Continue one-by-one.",
            "Stop when no variable qualifies.",
          ],
        },
        {
          heading: "3) Bidirectional (Stepwise)",
          bullets: ["Add significant variables and remove non-significant ones each iteration."],
        },
      ],
      table: {
        title: "Mini Example",
        headers: ["Iteration", "Candidate Predictors", "Selected Action"],
        rows: [
          ["Start", "x_1, x_2, x_3, x_4", "Full model"],
          ["1", "highest p-value: x_4 = 0.42", "Remove x_4"],
          ["2", "highest p-value: x_3 = 0.11", "Remove x_3"],
          ["Final", "x_1, x_2 with p < 0.05", "Keep final model"],
        ],
      },
    },
    {
      title: "Significance Level and p-value",
      table: {
        headers: ["Concept", "Meaning"],
        rows: [
          ["Null Hypothesis (H_0)", "No effect / no relationship"],
          [
            "p-value",
            "Probability of observing current result (or more extreme) if H_0 is true",
          ],
          ["Significance Level (alpha)", "Maximum tolerated Type I error probability"],
        ],
      },
      bullets: [
        "If p < alpha: reject H_0 (statistically significant).",
        "If p >= alpha: fail to reject H_0.",
      ],
      formula: "0.03 < 0.05 \\Rightarrow \\text{Reject } H_0",
      note: "So the predictor is considered significant at the 5% level.",
    },
    {
      title: "Why Is SL = 0.05 Common?",
      subtitle: "Standard Choice",
      body: "SL = 0.05 is widely used because it balances sensitivity and false-positive risk.",
      formula: "SL = 1 - \\text{Confidence Level}",
      tables: [
        {
          headers: ["SL", "Confidence Level", "Strictness"],
          rows: [
            ["0.10", "90%", "Less strict"],
            ["0.05", "95%", "Standard"],
            ["0.01", "99%", "More strict"],
          ],
        },
        {
          title: "How to Choose in Practice",
          headers: ["Scenario", "Suggested SL"],
          rows: [
            ["High-stakes decisions (medicine, safety, finance)", "0.01"],
            ["General modeling and reporting", "0.05"],
            ["Exploratory analysis", "0.10"],
          ],
        },
      ],
      note: "Start with SL = 0.05, then adjust based on domain risk, dataset size, and model purpose.",
    },
    {
      title: "Polynomial Regression",
      subtitle: "Definition",
      body: "Polynomial Regression extends linear regression to model non-linear relationships by adding polynomial terms.",
      bullets: [
        "Linear regression: y = b_0 + b_1x",
        "Polynomial regression: y = b_0 + b_1x + b_2x^2 + b_3x^3 + ...",
        "It is still linear in parameters because coefficients remain linear.",
      ],
    },
    {
      title: "Why Polynomial Regression?",
      body: "Simple linear regression fits only straight lines, but many real-world relationships are curved.",
      bullets: [
        "Population growth over time",
        "Disease progression",
        "Sales and economic trends",
        "Rainfall vs crop yield relationships",
        "Curved or U-shaped data is often underfit by a straight line.",
      ],
    },
    {
      title: "How Polynomial Regression Works",
      table: {
        headers: ["Step", "Description"],
        rows: [
          ["1", "Start with input feature x"],
          ["2", "Create transformed terms: x^2, x^3, ..."],
          ["3", "Fit linear regression on transformed features"],
          ["4", "Estimate coefficients (b_0, b_1, b_2, ...)"],
          ["5", "Use the fitted equation to predict y"],
        ],
      },
      formula: "y = b_0 + b_1x + b_2x^2 + \\cdots + b_dx^d",
      note: "d is the polynomial degree.",
    },
    {
      title: "Choosing the Polynomial Degree",
      body: "The polynomial degree controls model complexity.",
      table: {
        headers: ["Degree Choice", "Effect"],
        rows: [
          ["Too low", "Underfitting (model too simple)"],
          ["Too high", "Overfitting (fits noise, weak generalization)"],
          ["Balanced degree", "Better bias-variance trade-off"],
        ],
      },
      bullets: ["Use cross-validation.", "Compare adjusted R^2.", "Compare validation/test error."],
    },
    {
      title: "When to Use Polynomial Regression",
      subtitle: "Good Use Cases",
      bullets: [
        "Data shows clear curved trends.",
        "You need more flexibility than a straight line.",
        "You still want interpretable behavior.",
      ],
      sections: [
        {
          heading: "Applications",
          bullets: [
            "Forecasting demand and sales trends",
            "Environmental modeling (rainfall vs yield)",
            "Medical progression patterns",
            "Engineering curves (stress-strain relationships)",
          ],
        },
      ],
    },
    {
      title: "Limitations of Polynomial Regression",
      table: {
        headers: ["Limitation", "Explanation"],
        rows: [
          ["Overfitting risk", "High-degree models may memorize noise"],
          ["Outlier sensitivity", "Extreme points can shift the curve strongly"],
          ["Extrapolation weakness", "Predictions outside training range can be unreliable"],
          [
            "Limited flexibility for very complex patterns",
            "Some tasks are better handled by tree-based or neural models",
          ],
        ],
      },
      note: "Use polynomial regression as a baseline, then compare with alternatives as complexity grows.",
    },
    {
      title: "Polynomial Regression Visual Explanation",
      body: "This section compares linear and polynomial fits, and shows how model behavior changes with polynomial degree.",
      imageUrls: ["/assets/plots/slide-39-1.png", "/assets/plots/slide-39-2.png"],
      note: "Comparison plots are shown below.",
    },
    {
      title: "Support Vector Machine (SVM) and SVR",
      subtitle: "What is SVR?",
      body: "Support Vector Regression (SVR) is the regression version of SVM. It predicts a continuous target with a flat function and a tolerance margin.",
      bullets: [
        "Used in disease progression prediction",
        "Used in engineering curves (e.g., stress-strain)",
        "Used in demand and trend forecasting",
        "SVR uses an epsilon-insensitive zone where small errors are ignored.",
      ],
    },
    {
      title: "SVR Formulation and Equations",
      formula: "f(x)=w^T\\phi(x)+b",
      bullets: [
        "\\(\\phi(x)\\) maps input to a (possibly) higher-dimensional space.",
        "With kernels, we avoid computing \\(\\phi(x)\\) explicitly.",
      ],
      sections: [
        {
          heading: "Optimization Objective (Soft-Margin SVR)",
          formula:
            "\\min_{w,b,\\xi_i,\\xi_i^*} \\; \\frac{1}{2}\\|w\\|^2 + C\\sum_{i=1}^{n}(\\xi_i+\\xi_i^*)",
        },
        {
          heading: "Constraints",
          formula: "y_i - (w^T\\phi(x_i)+b) \\le \\varepsilon + \\xi_i",
        },
        {
          heading: "Constraints (continued)",
          formula: "(w^T\\phi(x_i)+b) - y_i \\le \\varepsilon + \\xi_i^*",
          bullets: ["\\(\\xi_i, \\xi_i^* \\ge 0\\)"],
        },
      ],
      table: {
        title: "Hyperparameters",
        headers: ["Hyperparameter", "Role"],
        rows: [
          ["epsilon", "Width of the no-penalty tube around prediction"],
          ["C", "Penalty strength for points outside the tube"],
          ["Kernel", "Controls curve shape (linear, RBF, polynomial)"],
        ],
      },
    },
    {
      title: "Why SVR?",
      imageUrls: ["/assets/plots/slide-42-1.png", "/assets/plots/slide-42-2.png"],
      table: {
        headers: ["Aspect", "Traditional Regression", "SVR"],
        rows: [
          [
            "Error handling",
            "Minimizes all residuals",
            "Ignores errors inside epsilon-tube",
          ],
          ["Outlier sensitivity", "Can be sensitive", "More robust when tube and C are tuned"],
          [
            "Non-linear handling",
            "Needs explicit feature engineering",
            "Uses kernels directly",
          ],
          [
            "Large datasets",
            "Usually faster for very large data",
            "Can become expensive for very large sample sizes",
          ],
        ],
      },
      bullets: [
        "Use feature scaling before SVR.",
        "Start with RBF kernel, then tune C, epsilon, and kernel parameters.",
      ],
    },
    {
      title: "Decision Tree Regression (CART)",
      subtitle: "What is Decision Tree Regressor?",
      body: "Decision Tree Regressor predicts continuous values by splitting feature space into rule-based regions and assigning a constant value in each region.",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Decision_tree_model.png",
      ],
      bullets: [
        "Captures non-linear relationships.",
        "Easy to interpret if tree depth is controlled.",
        "Handles complex feature interactions.",
      ],
    },
    {
      title: "Core Concept of Regression Trees",
      bullets: [
        "Internal node: decision rule (e.g., x <= 4.5).",
        "Branch: outcome of the rule.",
        "Leaf node: predicted value (usually region mean).",
      ],
      table: {
        title: "CART Perspective",
        headers: ["Tree Type", "Target Type", "Typical Criterion"],
        rows: [
          ["Classification Tree", "Categorical target", "Gini / Entropy"],
          ["Regression Tree", "Continuous target", "MSE (or MAE)"],
        ],
      },
      note: "This section focuses on the Regression Tree part of CART.",
    },
    {
      title: "How Splitting Happens (MSE Criterion)",
      sections: [
        {
          heading: "Node MSE",
          formula: "\\text{MSE}(S)=\\frac{1}{|S|}\\sum_{i \\in S}(y_i-\\bar{y}_S)^2",
        },
        {
          heading: "Split Score",
          formula:
            "\\text{MSE}_{\\text{split}}=\\frac{|S_L|}{|S|}\\text{MSE}(S_L)+\\frac{|S_R|}{|S|}\\text{MSE}(S_R)",
        },
        {
          heading: "Prediction at Leaf",
          formula: "\\hat{y}_{\\text{leaf}} = \\frac{1}{|S_{leaf}|}\\sum_{i\\in S_{leaf}} y_i",
        },
      ],
      note: "Choose the split with the minimum weighted MSE.",
    },
    {
      title: "Decision Tree Regression Algorithm (Simple Steps)",
      imageUrls: [
        "/assets/plots/slide-46-1.png",
        "/assets/plots/slide-46-2.png",
        "/assets/plots/slide-46-3.png",
      ],
      bullets: [
        "Start with all data at the root node.",
        "Evaluate candidate splits across features.",
        "Compute weighted MSE for each split.",
        "Select the split with minimum error.",
        "Repeat recursively on child nodes.",
        "Stop based on rules (max depth, min samples).",
        "Predict using leaf mean value.",
      ],
      table: {
        title: "Important Hyperparameters",
        headers: ["Hyperparameter", "Effect"],
        rows: [
          ["max_depth", "Controls model complexity"],
          ["min_samples_split", "Minimum samples required to split a node"],
          ["min_samples_leaf", "Minimum samples in each leaf"],
          ["max_leaf_nodes", "Limits number of terminal regions"],
        ],
      },
      note: "These settings reduce overfitting and improve generalization.",
    },
    {
      title: "Random Forest Regression",
      subtitle: "What is Random Forest Regressor?",
      body: "Random Forest Regression is an ensemble method that combines many decision trees and averages their predictions.",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Random_forest_explain.png",
      ],
      bullets: [
        "Sample training data with bootstrap.",
        "Build many trees on different samples.",
        "Predict with all trees and average outputs.",
      ],
      formula: "\\hat{y}_{RF}(x)=\\frac{1}{N_{trees}}\\sum_{t=1}^{N_{trees}}\\hat{y}_t(x)",
      note: "Averaging reduces variance and usually improves generalization.",
    },
    {
      title: "Decision Tree vs Random Forest (Regression)",
      imageUrls: ["/assets/plots/slide-48-1.png"],
      table: {
        headers: ["Aspect", "Decision Tree Regressor", "Random Forest Regressor"],
        rows: [
          ["Model type", "Single tree", "Ensemble of many trees"],
          ["Split criterion", "MSE per split", "Trees split by MSE, then averaged"],
          ["Overfitting risk", "Higher", "Lower (variance reduction)"],
          ["Stability", "Sensitive to data changes", "More stable"],
          ["Final prediction", "Output of one tree", "Mean of all tree outputs"],
          ["Interpretability", "High", "Medium"],
        ],
      },
      note: "Use a single tree for interpretability; use random forest for stronger performance.",
    },
    {
      title: "Evaluating Regression Models",
      table: {
        title: "Key Performance Metrics",
        headers: ["Metric", "Formula", "What It Tells Us"],
        rows: [
          ["MAE", "\\(\\frac{1}{n}\\sum |y_i-\\hat{y}_i|\\)", "Average prediction error magnitude"],
          ["MSE", "\\(\\frac{1}{n}\\sum (y_i-\\hat{y}_i)^2\\)", "Penalizes large errors more"],
          ["RMSE", "\\(\\sqrt{\\frac{1}{n}\\sum (y_i-\\hat{y}_i)^2}\\)", "Error in original target scale"],
          ["R^2", "\\(1-\\frac{SS_{res}}{SS_{tot}}\\)", "Fraction of variance explained"],
        ],
      },
      note: "Evaluate using more than one metric (e.g., RMSE with R^2) for balanced judgment.",
    },
    {
      title: "Regularization Methods (Why Needed?)",
      subtitle: "Overfitting Problem",
      body: "When a model is too flexible, it may fit noise instead of true patterns.",
      bullets: [
        "Very low training error",
        "Weak test performance",
        "High variance and unstable predictions",
      ],
      formula:
        "\\min_{\\beta} \\; \\underbrace{\\sum_{i=1}^{n}(y_i-\\hat{y}_i)^2}_{\\text{data loss}} + \\lambda \\cdot \\underbrace{\\Omega(\\beta)}_{\\text{penalty}}",
      note: "Regularization controls complexity by penalizing large coefficients.",
    },
    {
      title: "Ridge, Lasso, and Elastic Net",
      sections: [
        {
          heading: "Without Regularization",
          formula: "\\min_{\\beta} \\sum_{i=1}^{n}(y_i-\\hat{y}_i)^2",
        },
        {
          heading: "Ridge Regression (L2)",
          formula:
            "\\min_{\\beta} \\sum_{i=1}^{n}(y_i-\\hat{y}_i)^2 + \\lambda\\sum_{j=1}^{m}\\beta_j^2",
        },
        {
          heading: "Lasso Regression (L1)",
          formula:
            "\\min_{\\beta} \\sum_{i=1}^{n}(y_i-\\hat{y}_i)^2 + \\lambda\\sum_{j=1}^{m}|\\beta_j|",
        },
        {
          heading: "Elastic Net (L1 + L2)",
          formula:
            "\\min_{\\beta} \\sum_{i=1}^{n}(y_i-\\hat{y}_i)^2 + \\lambda_1\\sum_{j=1}^{m}|\\beta_j| + \\lambda_2\\sum_{j=1}^{m}\\beta_j^2",
        },
      ],
    },
    {
      title: "Regularization Comparison Table",
      imageUrls: [
        "/assets/plots/slide-52-1.png",
        "/assets/plots/slide-52-2.png",
        "/assets/plots/slide-52-3.png",
      ],
      table: {
        headers: ["Method", "Penalty Type", "Main Behavior", "Feature Selection"],
        rows: [
          ["Ridge", "L2 (sum beta_j^2)", "Shrinks coefficients smoothly", "No"],
          [
            "Lasso",
            "L1 (sum |beta_j|)",
            "Shrinks and can set some coefficients to zero",
            "Yes",
          ],
          ["Elastic Net", "L1 + L2", "Combines shrinkage + selection", "Yes"],
        ],
      },
      bullets: [
        "Ridge: many small/medium useful features.",
        "Lasso: only few important features expected.",
        "Elastic Net: correlated features and need both stability and sparsity.",
      ],
    },
    {
      title: "Regression Models - Advantages and Disadvantages",
      table: {
        headers: ["Model", "Advantages", "Disadvantages"],
        rows: [
          [
            "Linear Regression",
            "Simple, fast, easy to interpret, works well for linear patterns.",
            "Assumes linear relationship and is sensitive to outliers.",
          ],
          [
            "Polynomial Regression",
            "Captures curved/non-linear relationships better than linear regression.",
            "Choosing degree is sensitive; high degrees may overfit.",
          ],
          [
            "SVR",
            "Handles non-linear patterns with kernels and can be robust to noise with proper tuning.",
            "Requires feature scaling and careful hyperparameter tuning; slower on large datasets.",
          ],
          [
            "Decision Tree Regression",
            "Interpretable rules, captures non-linear interactions, no feature scaling required.",
            "Can overfit easily and may be unstable with small data changes.",
          ],
          [
            "Random Forest Regression",
            "Higher accuracy and stability, reduces overfitting by averaging many trees.",
            "Less interpretable and can be computationally heavier.",
          ],
        ],
      },
      tables: [
        {
          title: "Model Summary (Name + Equation)",
          headers: ["Model", "Core Equation"],
          rows: [
            ["Linear Regression", "\\(\\hat{y} = b_0 + b_1x\\)"],
            [
              "Polynomial Regression",
              "\\(\\hat{y} = b_0 + b_1x + b_2x^2 + \\cdots + b_dx^d\\)",
            ],
            ["SVR", "\\(f(x)=w^T\\phi(x)+b\\)"],
            [
              "Decision Tree Regression",
              "\\(\\hat{y}_{leaf}=\\frac{1}{|S_{leaf}|}\\sum_{i\\in S_{leaf}} y_i\\)",
            ],
            [
              "Random Forest Regression",
              "\\(\\hat{y}_{RF}(x)=\\frac{1}{N_{trees}}\\sum_{t=1}^{N_{trees}}\\hat{y}_t(x)\\)",
            ],
          ],
        },
      ],
      note: "If interpretability is priority: Linear Regression or Decision Tree. If predictive performance is priority: Random Forest.",
    },
    {
      title: "Visual Comparison of Regression Models",
      body: "This slide compares model behavior on the same dataset: Linear Regression, Polynomial Regression, SVR, Decision Tree Regression, and Random Forest Regression.",
      imageUrls: ["/assets/plots/slide-54-1.png"],
      note: "Visual output from Python code is shown below.",
    },

];
