#!/usr/bin/env python3
"""
Build Week 1 · Session 2 presentation using official ETRA Design System.
Content is filled incrementally as teaching blocks are pasted in.
"""

from __future__ import annotations

import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches

sys.path.insert(0, str(Path(__file__).resolve().parent))
from etra_brand import (  # noqa: E402
    INK,
    MARGIN,
    MUTED,
    PRIMARY,
    SECONDARY,
    SLIDE_H,
    SLIDE_W,
    SOFT,
    SOFT_2,
    WHITE,
    add_formula,
    add_text,
    bullets,
    content_footer,
    content_header,
    gradient_fill,
    logo,
    paint_light,
    rect,
    right_rail,
    soft_card,
    title_block,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pdf-exports" / "Week1-Session2-Regression-Models.pptx"
PLOTS = ROOT / "public" / "assets" / "plots"
DIAGRAMS = ROOT / "public" / "assets" / "session2-diagrams"

SESSION = {
    "eyebrow": "Week 1  ·  Session 2",
    "section_number": "02",
    "section_tag": "S02",
    "section_title": "Regression Models",
    "subtitle": "From linear fits to regularized models",
    "trainer_line": "AI & Machine Learning Bootcamp",
    "focus": "Regression Models",
    "topics": [
        "Linear regression",
        "OLS & R²",
        "Residual diagnostics",
        "Polynomial regression",
        "SVR",
        "Decision Tree",
        "Random Forest",
        "Ridge / Lasso",
    ],
}

TOPIC_CONTENT: dict = {
    "Linear regression": {
        "title": "What is Simple Linear Regression?",
        "kicker": "Regression · Simple Linear Regression",
        "body": "Simple Linear Regression models the relationship between one independent variable x and one dependent variable y using a straight line.",
        "formula": "y = b_{0} + b_{1}x",
        "formula_note": "b₀ = intercept (value of y when x = 0)  ·  b₁ = slope (change in y per unit change in x)",
        "bullets": [
            "x = independent variable (input / feature)",
            "y = dependent variable (target we want to predict)",
            "The model finds the straight line that best fits the observed data points.",
        ],
        "plot": "slide-19-1.png",
        "note": "One feature → one straight-line relationship. Multiple features come later (multiple linear regression).",
        "extra_slides": [
            {
                "title": "Practical Example",
                "kicker": "Simple Linear Regression",
                "body": "Suppose x = Hours of Study and y = Exam Score.",
                "formula": "y = 40 + 5x",
                "layout": "formula_example",
                "bullets": [
                    "Slope (b₁ = 5): each extra study hour increases predicted score by 5 points.",
                    "Intercept (b₀ = 40): if study hours are 0, predicted score is 40.",
                    "Example: study 3 hours → ŷ = 40 + 5(3) = 55.",
                ],
                "note": "The regression line is the best-fit line that minimizes prediction errors.",
            },
            {
                "title": "Meaning of Each Symbol",
                "kicker": "Simple Linear Regression",
                "layout": "table",
                "table": {
                    "headers": ["Symbol", "Meaning"],
                    "rows": [
                        ["y", "Predicted output (dependent variable)."],
                        ["x", "Input feature (independent variable)."],
                        ["b₀", "Intercept: predicted value of y when x = 0."],
                        ["b₁", "Slope: expected change in y when x increases by 1 unit."],
                    ],
                },
                "note": "The regression line is the best-fit line that minimizes prediction errors.",
            },
            {
                "title": "Multiple Linear Regression",
                "kicker": "Linear Regression · Multiple Features",
                "body": "Multiple Linear Regression describes the relationship between one dependent variable y and two or more independent variables.",
                "formula": "y = b_{0} + b_{1}x_{1} + b_{2}x_{2} + ⋯ + b_{n}x_{n}",
                "formula_note": "Each bⱼ is the effect of feature xⱼ holding other features fixed.",
                "layout": "formula_example",
                "bullets": [
                    "Purpose: predict the target y using multiple input factors.",
                    "Compared with simple regression, it models more realistic multi-factor scenarios.",
                    "Still a linear model — linear in the coefficients b₀, b₁, …, bₙ.",
                ],
                "note": "OLS still applies: choose coefficients that minimize the sum of squared residuals.",
            },
            {
                "title": "House Price Example",
                "kicker": "Multiple Linear Regression",
                "body": "Suppose we want to predict house price using house size and number of bedrooms.",
                "formula": "y = 50 + 2.5 x_{1} + 15 x_{2}",
                "formula_note": "y = price  ·  x₁ = size (m²)  ·  x₂ = number of bedrooms",
                "layout": "formula_example",
                "bullets": [
                    "For each additional 1 m², price increases by 2.5 (holding other variables constant).",
                    "For each additional bedroom, price increases by 15 (holding other variables constant).",
                    "Intercept 50: baseline predicted price when size and bedrooms are both 0 (often not realistic alone — focus on slopes).",
                ],
                "note": "“Holding other variables constant” is the key idea when interpreting each coefficient.",
            },
            {
                "title": "House Price Calculations",
                "kicker": "Multiple Linear Regression · Example",
                "layout": "table",
                "table": {
                    "headers": [
                        "House",
                        "Size x₁ (m²)",
                        "Bedrooms x₂",
                        "Predicted price y ($1000)",
                    ],
                    "rows": [
                        ["A", "100", "2", "50 + 2.5(100) + 15(2) = 330"],
                        ["B", "120", "3", "50 + 2.5(120) + 15(3) = 395"],
                        ["C", "80", "1", "50 + 2.5(80) + 15(1) = 265"],
                    ],
                },
                "note": "Same formula, different inputs → different predicted prices.",
            },
        ],
    },
    "OLS & R²": {
        "title": "What is OLS?",
        "kicker": "Ordinary Least Squares (OLS)",
        "body": "Ordinary Least Squares is the most common method to fit a linear regression line by minimizing prediction errors.",
        "bullets": [
            "OLS chooses the line that makes the total squared error as small as possible.",
            "Error for one point: residual = actual y − predicted ŷ.",
            "Goal: minimize the sum of squared residuals across all training points.",
            "For simple linear regression, OLS has a closed-form solution for b₀ and b₁.",
        ],
        "note": "Smaller squared errors → a better-fitting line on the training data.",
        "extra_slides": [
            {
                "title": "Sum of Squared Errors",
                "kicker": "Ordinary Least Squares (OLS)",
                "body": "OLS chooses parameters by minimizing the total squared difference between actual and predicted values.",
                "formula": "min Σ_{i = 1 … n} (y_{i} − ŷ_{i})²",
                "formula_note": "Sum of squared residuals over all n training points",
                "layout": "formula_example",
                "bullets": [
                    "Actual value: yᵢ",
                    "Predicted value: ŷᵢ",
                    "Residual error: eᵢ = yᵢ − ŷᵢ",
                ],
                "note": "Squared errors make all errors positive, penalize large errors, and provide a clear optimization objective.",
            },
            {
                "title": "Gradient Descent",
                "kicker": "OLS · Optimization",
                "body": "Loss curve L(w) — minimum at the bottom of the bowl.",
                "formula": "min_{w} L(w)",
                "formula_note": "We search for the parameter w that makes the loss as small as possible.",
                "bullets": [
                    "Start with an initial guess for w.",
                    "Move downhill on the loss surface (opposite the gradient).",
                    "Stop when the updates become tiny — the algorithm has converged.",
                ],
                "plot_path": "ols-loss-curve.png",
                "note": "Converged: w = 2.00 · L(w) = 0.40",
            },
            {
                "title": "R-Squared (R²)",
                "kicker": "Goodness of Fit",
                "body": "R² is a goodness-of-fit metric in regression. It measures how much variation in y is explained by model inputs.",
                "formula": "R² = 1 − (SS_{res}) / (SS_{tot})",
                "formula_note": "SS_res = residual sum of squares  ·  SS_tot = total sum of squares",
                "bullets": [
                    "R² close to 1 → the model explains most of the variation in y.",
                    "R² close to 0 → the inputs explain little beyond predicting the mean of y.",
                    "Higher R² means a better fit on the data used to compute it — not automatically better predictions on new data.",
                ],
                "plot": "slide-22-1.png",
                "note": "R² = 1 means perfect fit on that sample; R² = 0 means no improvement over the mean baseline.",
            },
            {
                "title": "Interpreting R²",
                "kicker": "Goodness of Fit",
                "body": "Larger R² means better explanatory power — more of the variation in y is captured by the model.",
                "bullets": [
                    "R² = 1 → perfect fit (predictions match all observed y values).",
                    "R² = 0 → mean-level prediction performance (no better than always predicting ȳ).",
                    "Compare fits visually: points tightly around the line → higher R².",
                ],
                "plot": "r2-comparison.png",
                "note": "Use R² to judge explanatory power on the fitted sample; validate generalization with hold-out metrics.",
            },
            {
                "title": "Residual Sum of Squares",
                "kicker": "R² · Building Blocks",
                "body": "SS_res measures the unexplained error — how far predictions are from the actual values.",
                "formula": "SS_{res} = Σ_{i = 1 … n} (y_{i} − ŷ_{i})²",
                "formula_note": "Sum of squared residuals (prediction errors)",
                "layout": "formula_example",
                "bullets": [
                    "Smaller SS_res → predictions closer to the data.",
                    "Appears in the numerator of the R² formula.",
                ],
            },
            {
                "title": "Total Sum of Squares",
                "kicker": "R² · Building Blocks",
                "body": "SS_tot measures the total variation in y around its mean — the baseline scatter to explain.",
                "formula": "SS_{tot} = Σ_{i = 1 … n} (y_{i} − ȳ)²",
                "formula_note": "Sum of squared deviations from the mean ȳ",
                "layout": "formula_example",
                "bullets": [
                    "This is the variance (up to a constant factor) of the observed y values.",
                    "R² asks: what fraction of SS_tot is left unexplained by SS_res?",
                ],
                "note": "R² = 1 − SS_res / SS_tot  ·  explained variation = SS_tot − SS_res",
            },
            {
                "title": "What Do These Terms Mean?",
                "kicker": "R² · Building Blocks",
                "layout": "table",
                "table": {
                    "headers": ["Term", "Description"],
                    "rows": [
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
                "note": "R² compares unexplained error (SS_res) with total variation (SS_tot).",
            },
            {
                "title": "Why R² Alone Is Not Enough",
                "kicker": "Adjusted R-Squared",
                "body": "In multiple regression, adding predictors often increases R² even when the new variables are not useful.",
                "bullets": [
                    "Ordinary R² never decreases when you add a predictor (it stays the same or goes up).",
                    "That can reward bloated models that fit noise instead of signal.",
                    "We need a metric that balances fit against model complexity.",
                ],
                "note": "Next: Adjusted R² applies a penalty for extra predictors.",
            },
            {
                "title": "Adjusted R-Squared",
                "kicker": "Goodness of Fit · Model Comparison",
                "body": "Adjusted R² modifies R² so unnecessary predictors are penalized.",
                "formula": "R²_{adj} = 1 − (1 − R²)(n − 1)/(n − p − 1)",
                "formula_note": "n = number of samples  ·  p = number of predictors",
                "layout": "formula_example",
                "bullets": [
                    "Adjusted R² penalizes unnecessary predictors.",
                    "It is usually a better metric for comparing models with different numbers of predictors.",
                    "If adding a variable does not help enough, Adjusted R² can fall even when R² rises.",
                ],
            },
            {
                "title": "Adjusted R² — Quick Example",
                "kicker": "Adjusted R-Squared",
                "layout": "table",
                "table": {
                    "headers": [
                        "Model",
                        "Predictors",
                        "R²",
                        "Adjusted R²",
                        "Interpretation",
                    ],
                    "rows": [
                        ["A", "x₁, x₂", "0.82", "0.81", "Strong and efficient model"],
                        [
                            "B",
                            "x₁, x₂, x₃, x₄",
                            "0.83",
                            "0.79",
                            "Higher R², but worse after penalty",
                        ],
                    ],
                },
                "note": "Model B looks better by R², but Adjusted R² shows the extra variables are likely not helpful.",
            },
        ],
    },
    "Residual diagnostics": {
        "title": "Assumptions of Linear Regression",
        "kicker": "Overview",
        "body": "Linear regression is most reliable when core assumptions are approximately satisfied.",
        "layout": "table",
        "table": {
            "headers": ["Assumption", "Meaning", "If Violated"],
            "rows": [
                [
                    "Linearity",
                    "Relationship between y and each x is roughly linear.",
                    "Biased predictions",
                ],
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
                [
                    "Independence",
                    "Observations/errors are independent.",
                    "Biased significance tests",
                ],
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
        "note": "Diagnostics in the next slides help check these assumptions in practice.",
        "extra_slides": [
            {
                "title": "Assumptions with Practical Examples",
                "kicker": "Residual Diagnostics",
                "layout": "table",
                "table": {
                    "headers": ["Assumption", "Simple Example", "Practical Check"],
                    "rows": [
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
                "note": "If one assumption is violated, use transformations, robust methods, feature engineering, or a different model.",
            },
            {
                "title": "Residuals vs Fitted Values",
                "kicker": "Practical Check · Homoscedasticity",
                "body": "A residuals-vs-fitted plot is a common practical check: look for random scatter around zero with roughly constant spread.",
                "bullets": [
                    "No clear curve → linearity looks reasonable.",
                    "Fan shape (spread grows with fitted value) → possible heteroscedasticity.",
                    "Large isolated points → check for influential outliers.",
                ],
                "plot": "slide-25-1.png",
                "note": "Static diagnostic plot from the course materials (slide image 1).",
            },
            {
                "title": "Building a Regression Model",
                "kicker": "Goal",
                "body": "Model-building methods select the most relevant predictors to balance simplicity, interpretability, and predictive accuracy.",
                "layout": "table",
                "table": {
                    "headers": ["Method", "Core Idea", "Best Use Case"],
                    "rows": [
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
                "note": "Choose a method that matches how many candidates you have and how strong your prior knowledge is.",
            },
            {
                "title": "Backward Elimination",
                "kicker": "Model-Building Methods · Steps",
                "body": "Start with the full model, then drop the least useful predictors one at a time.",
                "bullets": [
                    "Set significance level (e.g., SL = 0.05).",
                    "Fit model with all predictors.",
                    "Remove highest p-value if p > SL.",
                    "Refit and repeat until every remaining predictor has p ≤ SL.",
                ],
                "note": "Best when you begin with many candidate predictors and want to prune the model.",
            },
            {
                "title": "Forward Selection",
                "kicker": "Model-Building Methods · Steps",
                "body": "Build the model from scratch by adding the strongest predictors one at a time.",
                "bullets": [
                    "Start with no predictors.",
                    "Add the variable with the lowest p-value below SL.",
                    "Continue one-by-one.",
                    "Stop when no remaining variable qualifies (all p > SL).",
                ],
                "note": "Best when you want a compact model and prefer to grow it carefully from an empty start.",
            },
            {
                "title": "Bidirectional (Stepwise)",
                "kicker": "Model-Building Methods · Steps",
                "body": "Combine forward and backward moves: add and remove predictors dynamically each iteration.",
                "bullets": [
                    "Add significant variables (forward step).",
                    "Remove non-significant ones (backward step).",
                    "Repeat until adding or removing no longer improves the model under SL.",
                    "Flexible search for a balanced model — often more adaptive than pure forward or backward alone.",
                ],
                "note": "Useful when you want a flexible path that can correct earlier include/exclude decisions.",
            },
            {
                "title": "Mini Example — Backward Elimination",
                "kicker": "Model-Building Methods",
                "layout": "table",
                "table": {
                    "headers": ["Iteration", "Candidate Predictors", "Selected Action"],
                    "rows": [
                        ["Start", "x₁, x₂, x₃, x₄", "Full model"],
                        ["1", "highest p-value: x₄ = 0.42", "Remove x₄"],
                        ["2", "highest p-value: x₃ = 0.11", "Remove x₃"],
                        ["Final", "x₁, x₂ with p < 0.05", "Keep final model"],
                    ],
                },
                "note": "With SL = 0.05, variables with p > SL are removed until only significant predictors remain.",
            },
            {
                "title": "Significance Level and p-value",
                "kicker": "Model Selection · Decision Rule",
                "body": "Compare the p-value to alpha (significance level) to decide whether a predictor is statistically significant.",
                "formula": "0.03 < 0.05  ⇒  Reject H_{0}",
                "formula_note": "Example: p = 0.03 and alpha = 0.05",
                "layout": "formula_example",
                "bullets": [
                    "If p < alpha: reject H₀ (statistically significant).",
                    "If p ≥ alpha: fail to reject H₀.",
                ],
                "note": "So the predictor is considered significant at the 5% level.",
            },
            {
                "title": "Key Concepts: H₀, p-value, Alpha",
                "kicker": "Significance Level and p-value",
                "layout": "table",
                "table": {
                    "headers": ["Concept", "Meaning"],
                    "rows": [
                        ["Null Hypothesis (H₀)", "No effect / no relationship"],
                        [
                            "p-value",
                            "Probability of observing current result (or more extreme) if H₀ is true",
                        ],
                        [
                            "Significance Level (alpha)",
                            "Maximum tolerated Type I error probability",
                        ],
                    ],
                },
                "note": "In model building, predictors with p < alpha are kept as statistically significant.",
            },
            {
                "title": "Why Is SL = 0.05 Common?",
                "kicker": "Standard Choice",
                "body": "SL = 0.05 is widely used because it balances sensitivity and false-positive risk.",
                "formula": "SL = 1 − Confidence Level",
                "formula_note": "Example: 95% confidence  →  SL = 0.05",
                "layout": "formula_example",
                "bullets": [
                    "α = 0.05 implies a 5% false-positive rate under the null hypothesis.",
                    "It is a convention, not a law — adjust for domain risk (medical vs A/B tests).",
                    "Report effect size and confidence intervals alongside p-values.",
                ],
            },
            {
                "title": "SL vs Confidence Level",
                "kicker": "Why Is SL = 0.05 Common?",
                "layout": "table",
                "table": {
                    "headers": ["SL", "Confidence Level", "Strictness"],
                    "rows": [
                        ["0.10", "90%", "Less strict"],
                        ["0.05", "95%", "Standard"],
                        ["0.01", "99%", "More strict"],
                    ],
                },
                "note": "Lower SL → higher confidence requirement → stricter evidence to keep a predictor.",
            },
            {
                "title": "How to Choose in Practice",
                "kicker": "Significance Level",
                "layout": "table",
                "table": {
                    "headers": ["Scenario", "Suggested SL"],
                    "rows": [
                        [
                            "High-stakes decisions (medicine, safety, finance)",
                            "0.01",
                        ],
                        ["General modeling and reporting", "0.05"],
                        ["Exploratory analysis", "0.10"],
                    ],
                },
                "note": "Start with SL = 0.05, then adjust based on domain risk, dataset size, and model purpose.",
            },
        ],
    },
    "Polynomial regression": {
        "title": "Polynomial Regression",
        "kicker": "Definition",
        "body": "Polynomial Regression extends linear regression to model non-linear relationships by adding polynomial terms.",
        "formula": "y = b_{0} + b_{1}x + b_{2}x² + b_{3}x³ + ⋯",
        "formula_note": "Linear form: y = b_{0} + b_{1}x",
        "layout": "formula_example",
        "bullets": [
            "Linear regression: y = b₀ + b₁x",
            "Polynomial regression: y = b₀ + b₁x + b₂x² + b₃x³ + …",
            "It is still linear in parameters because coefficients remain linear.",
        ],
        "note": "We transform features (x², x³, …), then fit ordinary linear regression on those features.",
        "extra_slides": [
            {
                "title": "Why Polynomial Regression?",
                "kicker": "Motivation",
                "body": "Simple linear regression fits only straight lines, but many real-world relationships are curved.",
                "bullets": [
                    "Population growth over time",
                    "Disease progression",
                    "Sales and economic trends",
                    "Rainfall vs crop yield relationships",
                    "Curved or U-shaped data is often underfit by a straight line.",
                ],
            },
            {
                "title": "How Polynomial Regression Works",
                "kicker": "Polynomial Regression",
                "body": "y = b₀ + b₁x + b₂x² + ⋯ + b_d x^d",
                "layout": "table",
                "table": {
                    "headers": ["Step", "Description"],
                    "rows": [
                        ["1", "Start with input feature x"],
                        ["2", "Create transformed terms: x², x³, …"],
                        ["3", "Fit linear regression on transformed features"],
                        ["4", "Estimate coefficients (b₀, b₁, b₂, …)"],
                        ["5", "Use the fitted equation to predict y"],
                    ],
                },
                "note": "d is the polynomial degree.",
            },
            {
                "title": "Choosing the Polynomial Degree",
                "kicker": "Model Complexity",
                "body": "The polynomial degree controls model complexity.",
                "layout": "table",
                "table": {
                    "headers": ["Degree Choice", "Effect"],
                    "rows": [
                        ["Too low", "Underfitting (model too simple)"],
                        ["Too high", "Overfitting (fits noise, weak generalization)"],
                        ["Balanced degree", "Better bias-variance trade-off"],
                    ],
                },
                "note": "Use cross-validation · Compare adjusted R² · Compare validation/test error.",
            },
            {
                "title": "When to Use Polynomial Regression",
                "kicker": "Good Use Cases",
                "body": "Data shows clear curved trends · more flexibility than a straight line · you still want interpretable behavior.",
                "layout": "table",
                "table": {
                    "headers": ["Application", "Example"],
                    "rows": [
                        ["Forecasting", "Demand and sales trends"],
                        ["Environment", "Rainfall vs crop yield"],
                        ["Medicine", "Disease / progression patterns"],
                        ["Engineering", "Stress-strain and similar curves"],
                    ],
                },
                "note": "Choose polynomial regression when curves matter, but full black-box models are not required yet.",
            },
            {
                "title": "Limitations of Polynomial Regression",
                "kicker": "Trade-offs",
                "layout": "table",
                "table": {
                    "headers": ["Limitation", "Explanation"],
                    "rows": [
                        [
                            "Overfitting risk",
                            "High-degree models may memorize noise",
                        ],
                        [
                            "Outlier sensitivity",
                            "Extreme points can shift the curve strongly",
                        ],
                        [
                            "Extrapolation weakness",
                            "Predictions outside training range can be unreliable",
                        ],
                        [
                            "Limited flexibility for very complex patterns",
                            "Some tasks are better handled by tree-based or neural models",
                        ],
                    ],
                },
                "note": "Use polynomial regression as a baseline, then compare with alternatives as complexity grows.",
            },
            {
                "title": "Polynomial Regression Visual Explanation",
                "kicker": "Linear vs Polynomial Fits",
                "body": "This section compares linear and polynomial fits, and shows how model behavior changes with polynomial degree.",
                "bullets": [
                    "Underfitting: degree too low — high bias.",
                    "Overfitting: degree too high — high variance.",
                    "Use validation curves to pick degree — not training error alone.",
                ],
                "plot": "slide-39-1.png",
                "note": "Comparison plots are shown below.",
            },
            {
                "title": "Effect of Polynomial Degree",
                "kicker": "Visual Explanation",
                "body": "As degree increases, the curve becomes more flexible — useful at first, then prone to fitting noise.",
                "bullets": [
                    "Underfitting: degree too low — high bias.",
                    "Overfitting: degree too high — high variance.",
                    "Use validation curves to pick degree — not training error alone.",
                ],
                "plot": "slide-39-2.png",
                "note": "Comparison plots are shown below.",
            },
        ],
    },
    "SVR": {
        "title": "Support Vector Machine (SVM) and SVR",
        "kicker": "What is SVR?",
        "body": "Support Vector Regression (SVR) is the regression version of SVM. It predicts a continuous target with a flat function and a tolerance margin.",
        "bullets": [
            "SVM maximum margin: widest gap between classes; support vectors define the margin.",
            "Used in disease progression prediction",
            "Used in engineering curves (e.g., stress-strain)",
            "Used in demand and trend forecasting",
            "SVR uses an epsilon-insensitive zone where small errors are ignored.",
        ],
        "note": "Classification SVM maximizes the margin between classes; SVR adapts that idea to continuous targets with an ε-tube.",
        "extra_slides": [
            {
                "title": "SVR Formulation and Equations",
                "kicker": "Model Form",
                "body": "SVR predicts with a (possibly kernelized) linear function in a feature space.",
                "formula": "f(x) = wᵀ φ(x) + b",
                "formula_note": "φ(x) maps input to a (possibly) higher-dimensional space",
                "layout": "formula_example",
                "bullets": [
                    "φ(x) maps input to a (possibly) higher-dimensional space.",
                    "With kernels, we avoid computing φ(x) explicitly.",
                ],
            },
            {
                "title": "Soft-Margin SVR Objective",
                "kicker": "Optimization Objective",
                "body": "Minimize model complexity while penalizing points that fall outside the epsilon tube.",
                "formula": "min ½∥w∥² + C Σ (ξᵢ + ξᵢ*)",
                "formula_note": "Over w, b, ξᵢ, ξᵢ*  ·  C trades flatness vs errors outside the tube",
                "layout": "formula_example",
                "bullets": [
                    "½∥w∥² keeps the function flat (prefer smaller weights).",
                    "C Σ(ξᵢ + ξᵢ*) penalizes residuals beyond the ε-insensitive zone.",
                    "Larger C → fit training points more tightly; smaller C → smoother model.",
                ],
            },
            {
                "title": "SVR Constraints",
                "kicker": "Soft-Margin SVR",
                "body": "Predictions may deviate from yᵢ by at most ε, unless a slack variable absorbs the excess error.",
                "formula": "yᵢ − (wᵀφ(xᵢ) + b) ≤ ε + ξᵢ",
                "formula_note": "Upper side of the ε-tube (actual above prediction)",
                "layout": "formula_example",
                "bullets": [
                    "(wᵀφ(xᵢ) + b) − yᵢ ≤ ε + ξᵢ*",
                    "ξᵢ, ξᵢ* ≥ 0",
                    "Inside the tube → no penalty; outside → pay via the matching slack.",
                ],
            },
            {
                "title": "SVR Hyperparameters",
                "kicker": "Tuning Knobs",
                "layout": "table",
                "table": {
                    "headers": ["Hyperparameter", "Role"],
                    "rows": [
                        [
                            "epsilon (ε)",
                            "Width of the no-penalty tube around prediction",
                        ],
                        [
                            "C",
                            "Penalty strength for points outside the tube",
                        ],
                        [
                            "Kernel",
                            "Controls curve shape (linear, RBF, polynomial)",
                        ],
                    ],
                },
                "note": "Tune ε, C, and the kernel together — changing one often changes how the others behave.",
            },
            {
                "title": "Why SVR?",
                "kicker": "Compared with Traditional Regression",
                "layout": "table",
                "table": {
                    "headers": ["Aspect", "Traditional Regression", "SVR"],
                    "rows": [
                        [
                            "Error handling",
                            "Minimizes all residuals",
                            "Ignores errors inside epsilon-tube",
                        ],
                        [
                            "Outlier sensitivity",
                            "Can be sensitive",
                            "More robust when tube and C are tuned",
                        ],
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
                "note": "Use feature scaling before SVR. Start with RBF kernel, then tune C, epsilon, and kernel parameters.",
            },
            {
                "title": "SVR Visual Intuition",
                "kicker": "Why SVR?",
                "body": "The epsilon-tube ignores small residuals; only larger deviations pull the model.",
                "bullets": [
                    "Points inside the tube do not contribute to the loss.",
                    "Kernels let SVR bend to non-linear patterns without hand-built features.",
                ],
                "plot": "slide-42-1.png",
                "note": "Comparison plots from the course materials.",
            },
            {
                "title": "SVR Fit Example",
                "kicker": "Why SVR?",
                "body": "With a tuned tube and kernel, SVR can follow curved trends while staying robust to small noise.",
                "bullets": [
                    "Scale features before fitting.",
                    "Validate C, ε, and kernel width on hold-out or CV folds.",
                ],
                "plot": "slide-42-2.png",
            },
        ],
    },
    "Decision Tree": {
        "title": "Decision Tree Regression (CART)",
        "kicker": "What is Decision Tree Regressor?",
        "body": "Decision Tree Regressor predicts continuous values by splitting feature space into rule-based regions and assigning a constant value in each region.",
        "bullets": [
            "Captures non-linear relationships.",
            "Easy to interpret if tree depth is controlled.",
            "Handles complex feature interactions.",
        ],
        "plot_path": "decision-tree-split.png",
        "note": "Decision Tree Split: recursive partitioning by feature threshold · Root → branches → leaf nodes.",
        "extra_slides": [
            {
                "title": "Core Concept of Regression Trees",
                "kicker": "Tree Structure",
                "body": "A regression tree is built from decision rules that partition the input space into regions with constant predictions.",
                "bullets": [
                    "Internal node: decision rule (e.g., x ≤ 4.5).",
                    "Branch: outcome of the rule.",
                    "Leaf node: predicted value (usually region mean).",
                ],
            },
            {
                "title": "CART Perspective",
                "kicker": "Classification and Regression Trees",
                "layout": "table",
                "table": {
                    "headers": ["Tree Type", "Target Type", "Typical Criterion"],
                    "rows": [
                        [
                            "Classification Tree",
                            "Categorical target",
                            "Gini / Entropy",
                        ],
                        [
                            "Regression Tree",
                            "Continuous target",
                            "MSE (or MAE)",
                        ],
                    ],
                },
                "note": "This section focuses on the Regression Tree part of CART.",
            },
            {
                "title": "How Splitting Happens (MSE Criterion)",
                "kicker": "Node MSE",
                "body": "CART picks the split that maximally reduces MSE (regression) or Gini/entropy (classification).",
                "formula": "MSE(S) = (1 / |S|) Σ_{i ∈ S} (y_{i} − ȳ_S)²",
                "formula_note": "Average squared distance from the node mean ȳ_S",
                "layout": "formula_example",
                "bullets": [
                    "Greedy splits are fast but not globally optimal.",
                    "Depth and min-samples-leaf control overfitting on small datasets.",
                ],
            },
            {
                "title": "Split Score",
                "kicker": "MSE Criterion",
                "body": "A candidate split is scored by the size-weighted average MSE of the left and right child nodes.",
                "formula": "MSE_split = (|S_L|/|S|) MSE(S_L) + (|S_R|/|S|) MSE(S_R)",
                "formula_note": "S_L / S_R = left and right subsets after the candidate split",
                "layout": "formula_example",
                "bullets": [
                    "Choose the split with the minimum weighted MSE.",
                    "Larger child nodes influence the score more (weighted by |S_L| and |S_R|).",
                ],
            },
            {
                "title": "Prediction at Leaf",
                "kicker": "Regression Tree",
                "body": "Once a region is pure enough to stop splitting, the leaf predicts a constant value for every point that lands there.",
                "formula": "ŷ_leaf = (1 / |S_leaf|) Σ_{i ∈ S_leaf} y_{i}",
                "formula_note": "Usually the mean of the training targets in that leaf region",
                "layout": "formula_example",
                "bullets": [
                    "Same prediction for all samples that reach the same leaf.",
                    "Deeper trees create smaller regions and more varied leaf values.",
                ],
            },
            {
                "title": "Decision Tree Regression Algorithm",
                "kicker": "Simple Steps",
                "body": "Recursive partitioning by feature threshold · Root → branches → leaf nodes.",
                "layout": "table",
                "table": {
                    "headers": ["Step", "Action"],
                    "rows": [
                        ["1", "Start with all data at the root node."],
                        ["2", "Evaluate candidate splits across features."],
                        ["3", "Compute weighted MSE for each split."],
                        ["4", "Select the split with minimum error."],
                        ["5", "Repeat recursively on child nodes."],
                        ["6", "Stop based on rules (max depth, min samples)."],
                        ["7", "Predict using leaf mean value."],
                    ],
                },
                "note": "Decision Tree Split: greedy recursive partitioning until a stopping rule fires.",
            },
            {
                "title": "Decision Tree Fit (Visual)",
                "kicker": "Algorithm · Static Plot",
                "body": "A fitted regression tree partitions x into intervals and predicts a constant in each leaf region.",
                "bullets": [
                    "Piecewise-constant prediction surface.",
                    "More depth → more steps and finer partitions.",
                ],
                "plot": "slide-46-2.png",
            },
            {
                "title": "Important Hyperparameters",
                "kicker": "Decision Tree Regression",
                "layout": "table",
                "table": {
                    "headers": ["Hyperparameter", "Effect"],
                    "rows": [
                        ["max_depth", "Controls model complexity"],
                        [
                            "min_samples_split",
                            "Minimum samples required to split a node",
                        ],
                        [
                            "min_samples_leaf",
                            "Minimum samples in each leaf",
                        ],
                        [
                            "max_leaf_nodes",
                            "Limits number of terminal regions",
                        ],
                    ],
                },
                "note": "These settings reduce overfitting and improve generalization.",
            },
        ],
    },
    "Random Forest": {
        "title": "Random Forest Regression",
        "kicker": "What is Random Forest Regressor?",
        "body": "Random Forest Regression is an ensemble method that combines many decision trees and averages their predictions.",
        "formula": "ŷ_RF(x) = (1 / N_trees) Σ ŷ_t(x)",
        "formula_note": "Final prediction = average of the individual tree predictions",
        "bullets": [
            "Sample training data with bootstrap.",
            "Build many trees on different samples.",
            "Predict with all trees and average outputs.",
            "Averaging reduces variance and usually improves generalization.",
        ],
        "plot_path": "random-forest-ensemble.png",
        "note": "Static ensemble diagram · also see the fitted RF curve in course plots (slide-46-3).",
        "extra_slides": [
            {
                "title": "Decision Tree vs Random Forest",
                "kicker": "Regression Comparison",
                "body": "Decision Tree Split: recursive partitioning by feature threshold · Root → branches → leaf nodes.",
                "layout": "table",
                "table": {
                    "headers": [
                        "Aspect",
                        "Decision Tree Regressor",
                        "Random Forest Regressor",
                    ],
                    "rows": [
                        ["Model type", "Single tree", "Ensemble of many trees"],
                        [
                            "Split criterion",
                            "MSE per split",
                            "Trees split by MSE, then averaged",
                        ],
                        [
                            "Overfitting risk",
                            "Higher",
                            "Lower (variance reduction)",
                        ],
                        [
                            "Stability",
                            "Sensitive to data changes",
                            "More stable",
                        ],
                        [
                            "Final prediction",
                            "Output of one tree",
                            "Mean of all tree outputs",
                        ],
                        ["Interpretability", "High", "Medium"],
                    ],
                },
                "note": "Use a single tree for interpretability; use random forest for stronger performance.",
            },
            {
                "title": "Feature Importance (Random Forest)",
                "kicker": "Decision Tree vs Random Forest",
                "body": "Random forests also provide useful feature-importance scores from how often/how strongly features are used across trees.",
                "bullets": [
                    "Higher importance → feature contributed more to reducing error.",
                    "Use as a guide for insight — not as a causal proof.",
                ],
                "plot": "slide-48-1.png",
            },
            {
                "title": "Evaluating Regression Models",
                "kicker": "Key Performance Metrics",
                "layout": "table",
                "table": {
                    "headers": ["Metric", "Formula", "What It Tells Us"],
                    "rows": [
                        [
                            "MAE",
                            "(1/n) Σ |yᵢ − ŷᵢ|",
                            "Average prediction error magnitude",
                        ],
                        [
                            "MSE",
                            "(1/n) Σ (yᵢ − ŷᵢ)²",
                            "Penalizes large errors more",
                        ],
                        [
                            "RMSE",
                            "√[(1/n) Σ (yᵢ − ŷᵢ)²]",
                            "Error in original target scale",
                        ],
                        [
                            "R²",
                            "1 − SS_res / SS_tot",
                            "Fraction of variance explained",
                        ],
                    ],
                },
                "note": "Evaluate using more than one metric (e.g., RMSE with R²) for balanced judgment.",
            },
        ],
    },
    "Ridge / Lasso": {
        "title": "Regularization Methods (Why Needed?)",
        "kicker": "Overfitting Problem",
        "body": "When a model is too flexible, it may fit noise instead of true patterns.",
        "formula": "min_β  Σ (y_{i} − ŷ_{i})² + λ · Ω(β)",
        "formula_note": "data loss  +  λ × penalty on coefficients",
        "bullets": [
            "Very low training error",
            "Weak test performance",
            "High variance and unstable predictions",
        ],
        "plot_path": "regularization-path.png",
        "note": "Regularization controls complexity by penalizing large coefficients.",
        "extra_slides": [
            {
                "title": "Regularization Objective",
                "kicker": "Data Loss + Penalty",
                "body": "Trade off fitting the training data against keeping coefficients small.",
                "formula": "min_β  data loss + λ · penalty",
                "formula_note": "data loss = Σ(yᵢ − ŷᵢ)²   ·   penalty = Ω(β)",
                "layout": "formula_example",
                "bullets": [
                    "λ = 0 → ordinary least squares (no penalty).",
                    "Larger λ → stronger shrinkage of coefficients.",
                    "Choose λ with validation / cross-validation.",
                ],
            },
            {
                "title": "Ridge, Lasso, and Elastic Net",
                "kicker": "Regularization Families",
                "body": "Different penalties shrink coefficients differently as regularization strength increases.",
                "bullets": [
                    "Ridge (L2): shrinks all coefficients — good when many features correlate.",
                    "Lasso (L1): can zero out coefficients — embedded feature selection.",
                    "Elastic Net blends L1 + L2 for correlated sparse settings.",
                    "Regularization path: coefficients shrink with regularization strength.",
                ],
                "plot_path": "regularization-path.png",
                "note": "Pick the penalty that matches your goal: stability (Ridge), sparsity (Lasso), or both (Elastic Net).",
            },
            {
                "title": "Without Regularization",
                "kicker": "Ordinary Least Squares",
                "body": "Fit only by minimizing squared prediction error — no penalty on coefficient size.",
                "formula": "min_β  Σ (y_{i} − ŷ_{i})²",
                "formula_note": "Can overfit when many features or highly correlated predictors are present",
                "layout": "formula_example",
                "bullets": [
                    "No shrinkage of coefficients.",
                    "Equivalent to setting λ = 0 in the regularized objectives.",
                ],
            },
            {
                "title": "Ridge Regression (L2)",
                "kicker": "Penalty: sum of squared coefficients",
                "body": "Add an L2 penalty so large coefficients are discouraged, but usually none are forced exactly to zero.",
                "formula": "min_β  Σ (y_{i} − ŷ_{i})² + λ Σ βⱼ²",
                "formula_note": "λ ≥ 0 controls shrinkage strength",
                "layout": "formula_example",
                "bullets": [
                    "Shrinks all coefficients toward zero smoothly.",
                    "Good when many features are correlated.",
                    "Does not perform hard feature selection (coefficients stay non-zero).",
                ],
            },
            {
                "title": "Lasso Regression (L1)",
                "kicker": "Penalty: sum of absolute coefficients",
                "body": "Add an L1 penalty that can drive some coefficients exactly to zero — built-in feature selection.",
                "formula": "min_β  Σ (y_{i} − ŷ_{i})² + λ Σ |βⱼ|",
                "formula_note": "Larger λ → sparser models (more zeros)",
                "layout": "formula_example",
                "bullets": [
                    "Can zero out coefficients — embedded feature selection.",
                    "Useful when you expect only a few predictors truly matter.",
                    "With highly correlated features, Lasso may keep one and drop the others.",
                ],
            },
            {
                "title": "Elastic Net (L1 + L2)",
                "kicker": "Blend of Lasso and Ridge",
                "body": "Combine L1 and L2 penalties to get sparsity with more stable behavior under correlation.",
                "formula": "min_β  Σ (y_{i} − ŷ_{i})² + λ_{1} Σ |βⱼ| + λ_{2} Σ βⱼ²",
                "formula_note": "λ₁ controls sparsity  ·  λ₂ controls ridge-style shrinkage",
                "layout": "formula_example",
                "bullets": [
                    "Elastic Net blends L1 + L2 for correlated sparse settings.",
                    "Often preferred when groups of correlated features should be selected together.",
                    "Tune both λ₁ and λ₂ (or the mixing ratio) with cross-validation.",
                ],
            },
            {
                "title": "When to Use Each Method",
                "kicker": "Ridge · Lasso · Elastic Net",
                "body": "Match the penalty to the feature structure you expect.",
                "bullets": [
                    "Ridge: many small/medium useful features.",
                    "Lasso: only few important features expected.",
                    "Elastic Net: correlated features and need both stability and sparsity.",
                ],
            },
            {
                "title": "Regularization Comparison Table",
                "kicker": "Ridge vs Lasso vs Elastic Net",
                "layout": "table",
                "table": {
                    "headers": [
                        "Method",
                        "Penalty Type",
                        "Main Behavior",
                        "Feature Selection",
                    ],
                    "rows": [
                        [
                            "Ridge",
                            "L2 (sum βⱼ²)",
                            "Shrinks coefficients smoothly",
                            "No",
                        ],
                        [
                            "Lasso",
                            "L1 (sum |βⱼ|)",
                            "Shrinks and can set some coefficients to zero",
                            "Yes",
                        ],
                        [
                            "Elastic Net",
                            "L1 + L2",
                            "Combines shrinkage + selection",
                            "Yes",
                        ],
                    ],
                },
                "note": "Scale features before Ridge/Lasso/Elastic Net — penalties depend on coefficient magnitude.",
            },
            {
                "title": "Regression Models — Pros & Cons",
                "kicker": "Session Summary",
                "layout": "table",
                "table": {
                    "headers": ["Model", "Advantages", "Disadvantages"],
                    "rows": [
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
                            "Handles non-linear patterns with kernels; can be robust to noise with tuning.",
                            "Needs feature scaling and careful tuning; slower on large datasets.",
                        ],
                        [
                            "Decision Tree",
                            "Interpretable rules, captures interactions, no feature scaling required.",
                            "Can overfit easily and may be unstable with small data changes.",
                        ],
                        [
                            "Random Forest",
                            "Higher accuracy and stability; reduces overfitting by averaging trees.",
                            "Less interpretable and can be computationally heavier.",
                        ],
                    ],
                },
                "note": "If interpretability is priority: Linear Regression or Decision Tree. If predictive performance is priority: Random Forest.",
            },
            {
                "title": "Model Summary (Name + Equation)",
                "kicker": "Session Summary",
                "layout": "table",
                "table": {
                    "headers": ["Model", "Core Equation"],
                    "rows": [
                        ["Linear Regression", "ŷ = b₀ + b₁x"],
                        [
                            "Polynomial Regression",
                            "ŷ = b₀ + b₁x + b₂x² + ⋯ + b_d x^d",
                        ],
                        ["SVR", "f(x) = wᵀ φ(x) + b"],
                        [
                            "Decision Tree Regression",
                            "ŷ_leaf = mean(y in S_leaf)",
                        ],
                        [
                            "Random Forest Regression",
                            "ŷ_RF(x) = (1/N_trees) Σ ŷ_t(x)",
                        ],
                    ],
                },
                "note": "If interpretability is priority: Linear Regression or Decision Tree. If predictive performance is priority: Random Forest.",
            },
            {
                "title": "Visual Comparison of Regression Models",
                "kicker": "Same Dataset · Different Fits",
                "body": "This slide compares model behavior on the same dataset: Linear Regression, Polynomial Regression, SVR, Decision Tree Regression, and Random Forest Regression.",
                "bullets": [
                    "Linear / Ridge: interpretable, fast — watch nonlinear patterns.",
                    "SVR: margin-based with kernels — can be slow on huge data.",
                    "Tree / RF: nonlinear, little scaling — weak at extrapolation.",
                ],
                "plot": "slide-54-1.png",
                "note": "Visual output from Python code is shown below.",
            },
            {
                "title": "Model Families at a Glance",
                "kicker": "Session Closing",
                "layout": "table",
                "table": {
                    "headers": ["Model", "Strength", "Watch Out"],
                    "rows": [
                        [
                            "Linear / Ridge",
                            "Interpretable, fast",
                            "Nonlinear patterns",
                        ],
                        [
                            "SVR",
                            "Margin-based, kernels",
                            "Slow on huge data",
                        ],
                        [
                            "Tree / RF",
                            "Nonlinear, little scaling",
                            "Extrapolation",
                        ],
                    ],
                },
                "note": "Visual output from Python code is shown on the previous slide.",
            },
        ],
    },
}

BIG_PICTURE = {
    "title": "Where Are We in the Bootcamp?",
    "focus": "After preprocessing — learn models that predict continuous targets.",
    "current": "S2",
    "weeks": [
        {
            "label": "Week 1",
            "sessions": [
                ("S1", "Foundations & Preprocessing"),
                ("S2", "Regression Models"),
                ("S3", "Classification Basics"),
                ("S4", "Naive Bayes & Trees"),
                ("S5", "SVM & Kernels"),
                ("S6", "Clustering & PCA"),
            ],
        },
        {"label": "Week 2", "sessions": [("S7", "Deep Learning")]},
        {
            "label": "Week 3",
            "sessions": [
                ("S8", "NLP Fundamentals"),
                ("S9", "Tokenization"),
                ("S10", "Text Analysis & NER"),
                ("S11", "Language Modeling"),
                ("S12", "Embeddings & RNNs"),
                ("S13", "Seq2Seq & NMT"),
            ],
        },
        {
            "label": "Week 4",
            "sessions": [
                ("S14", "Generative AI"),
                ("S15", "RAG Systems"),
                ("S16", "MLOps"),
            ],
        },
    ],
}


def slide_title(prs, total):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.2), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(
        slide,
        MARGIN,
        Inches(2.7),
        Inches(11.5),
        Inches(0.95),
        s["section_title"],
        size=44,
        bold=True,
        color=PRIMARY,
    )
    bar = rect(slide, MARGIN, Inches(3.8), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(4.15), Inches(11), Inches(0.5), s["subtitle"], size=17, color=MUTED)
    add_text(slide, MARGIN, Inches(6.7), Inches(6), Inches(0.3), "ETRA", size=12, bold=True, color=PRIMARY)
    add_text(
        slide,
        Inches(8.5),
        Inches(6.7),
        Inches(4),
        Inches(0.3),
        s["trainer_line"],
        size=12,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
    )


def slide_big_picture(prs, total, index):
    bp = BIG_PICTURE
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  Big picture", f"{index:02d}")
    title_block(slide, bp["title"], bp["focus"])

    weeks = bp["weeks"]
    col_w = Inches(2.9)
    gap = Inches(0.18)
    top = Inches(2.35)

    for wi, week in enumerate(weeks):
        x = MARGIN + wi * (col_w + gap)
        add_text(slide, x, top, col_w, Inches(0.3), week["label"], size=12, bold=True, color=PRIMARY)
        rect(slide, x, top + Inches(0.32), col_w - Inches(0.2), Inches(0.012), SOFT)

        for si, (sid, title) in enumerate(week["sessions"]):
            y = top + Inches(0.5) + Inches(si * 0.58)
            current = sid == bp["current"]
            if current:
                rect(slide, x, y + Inches(0.08), Inches(0.05), Inches(0.28), PRIMARY)
            add_text(
                slide,
                x + Inches(0.16),
                y,
                Inches(0.45),
                Inches(0.4),
                sid,
                size=11,
                bold=current,
                color=PRIMARY if current else SECONDARY,
                anchor=MSO_ANCHOR.MIDDLE,
            )
            add_text(
                slide,
                x + Inches(0.6),
                y,
                col_w - Inches(0.75),
                Inches(0.4),
                title,
                size=11,
                bold=current,
                color=INK if current else MUTED,
                anchor=MSO_ANCHOR.MIDDLE,
            )

    content_footer(slide, index, total)


def slide_section_divider(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.15), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(
        slide,
        MARGIN,
        Inches(2.65),
        Inches(11.5),
        Inches(0.9),
        s["section_title"],
        size=42,
        bold=True,
        color=PRIMARY,
    )
    bar = rect(slide, MARGIN, Inches(3.7), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(4.05), Inches(11), Inches(0.4), s["focus"], size=16, color=MUTED)

    x = MARGIN
    for topic in s["topics"]:
        w = Inches(min(2.8, 0.12 * len(topic) + 1.1))
        if x + w > Inches(12.4):
            break
        soft_card(slide, x, Inches(5.25), w, Inches(0.42), fill=SOFT)
        add_text(slide, x, Inches(5.3), w, Inches(0.32), topic, size=11, color=PRIMARY, align=PP_ALIGN.CENTER)
        x += w + Inches(0.14)

    content_footer(slide, index, total)


def slide_agenda(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, s["focus"], "What we will cover in this session")
    bullets(slide, s["topics"], top=Inches(2.35), size=20)
    content_footer(slide, index, total)


def _add_plot(slide, name, left, top, width, max_height, *, folder=None):
    """Fit a plot PNG inside a box (same idea as add_diagram)."""
    from PIL import Image

    base = folder or PLOTS
    path = base / name
    if not path.is_file() and folder is None:
        path = DIAGRAMS / name
    if not path.is_file():
        return None
    with Image.open(path) as im:
        px_w, px_h = im.size
    if px_w <= 0 or px_h <= 0:
        return None
    aspect = px_w / px_h
    max_w_in = width.inches
    max_h_in = max_height.inches
    fit_w = min(max_w_in, max_h_in * aspect)
    fit_h = fit_w / aspect
    if fit_h > max_h_in:
        fit_h = max_h_in
        fit_w = fit_h * aspect
    x = left.inches + (max_w_in - fit_w) / 2
    return slide.shapes.add_picture(
        str(path),
        Inches(x),
        top,
        width=Inches(fit_w),
        height=Inches(fit_h),
    )


def slide_topic_rich(prs, total, index, content):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    if content.get("body"):
        soft_card(slide, MARGIN, Inches(2.25), Inches(12.0), Inches(1.35), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.5),
            Inches(11.3),
            Inches(0.95),
            content["body"],
            size=16,
            color=INK,
        )
        bullets(slide, content.get("bullets") or [], top=Inches(3.9), size=16)
    else:
        bullets(slide, content.get("bullets") or [], top=Inches(2.35), size=17)

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.35),
            Inches(12),
            Inches(0.3),
            content["note"],
            size=13,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_linear_intro(prs, total, index, content):
    """Definition + formula + optional scatter/line plot."""
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    # Left column: definition + optional formula + bullets
    soft_card(slide, MARGIN, Inches(2.2), Inches(6.3), Inches(1.35), fill=SOFT)
    add_text(
        slide,
        MARGIN + Inches(0.3),
        Inches(2.4),
        Inches(5.8),
        Inches(1.05),
        content.get("body") or "",
        size=14,
        color=INK,
    )

    if content.get("formula"):
        soft_card(slide, MARGIN, Inches(3.7), Inches(6.3), Inches(1.35), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.3),
            Inches(3.85),
            Inches(5.8),
            Inches(0.25),
            "Formula",
            size=11,
            bold=True,
            color=SECONDARY,
        )
        add_formula(
            slide,
            MARGIN + Inches(0.3),
            Inches(4.15),
            Inches(5.8),
            Inches(0.45),
            content["formula"],
            size=22,
            bold=True,
            color=PRIMARY,
        )
        if content.get("formula_note"):
            add_text(
                slide,
                MARGIN + Inches(0.3),
                Inches(4.6),
                Inches(5.8),
                Inches(0.35),
                content["formula_note"],
                size=11,
                color=MUTED,
            )
        bullets(slide, content.get("bullets") or [], top=Inches(5.25), size=13)
    else:
        bullets(slide, content.get("bullets") or [], top=Inches(3.75), size=14)

    # Right column: plot
    plot_name = content.get("plot") or content.get("plot_path")
    plot_folder = DIAGRAMS if content.get("plot_path") else PLOTS
    if plot_name:
        soft_card(slide, Inches(7.15), Inches(2.2), Inches(5.45), Inches(4.3), fill=SOFT)
        _add_plot(
            slide,
            plot_name,
            Inches(7.35),
            Inches(2.45),
            Inches(5.05),
            Inches(3.9),
            folder=plot_folder,
        )

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.55),
            Inches(12),
            Inches(0.25),
            content["note"],
            size=12,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_formula_example(prs, total, index, content):
    """Full-width practical example with formula and interpretation."""
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    if content.get("body"):
        soft_card(slide, MARGIN, Inches(2.2), Inches(12.0), Inches(0.85), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.4),
            Inches(11.3),
            Inches(0.5),
            content["body"],
            size=16,
            color=INK,
        )

    soft_card(slide, MARGIN, Inches(3.2), Inches(12.0), Inches(1.35), fill=SOFT)
    add_formula(
        slide,
        MARGIN + Inches(0.4),
        Inches(3.45),
        Inches(11.2),
        Inches(0.55),
        content["formula"],
        size=28,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    if content.get("formula_note"):
        add_text(
            slide,
            MARGIN + Inches(0.4),
            Inches(4.1),
            Inches(11.2),
            Inches(0.3),
            content["formula_note"],
            size=13,
            color=MUTED,
            align=PP_ALIGN.CENTER,
        )

    bullets(slide, content.get("bullets") or [], top=Inches(4.8), size=16)

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.5),
            Inches(12),
            Inches(0.25),
            content["note"],
            size=13,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_topic_table(prs, total, index, content):
    from pptx.util import Pt

    s = SESSION
    table = content["table"]
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    headers = table["headers"]
    rows = table["rows"]
    compact = len(rows) >= 5
    row_h = 0.42 if compact else 0.55
    body_size = 12 if compact else 14
    header_size = 11 if compact else 13

    table_top = Inches(2.3)
    if content.get("body"):
        soft_card(slide, MARGIN, Inches(2.15), Inches(12.0), Inches(0.7), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.28),
            Inches(11.3),
            Inches(0.45),
            content["body"],
            size=14,
            color=INK,
        )
        table_top = Inches(3.0)

    table_h = Inches(row_h * (1 + len(rows)))
    shape = slide.shapes.add_table(
        rows=1 + len(rows),
        cols=len(headers),
        left=MARGIN,
        top=table_top,
        width=Inches(12.0),
        height=table_h,
    )
    tbl = shape.table

    for c, header in enumerate(headers):
        cell = tbl.cell(0, c)
        cell.text = header
        for p in cell.text_frame.paragraphs:
            p.alignment = PP_ALIGN.CENTER
            for run in p.runs:
                run.font.size = Pt(header_size)
                run.font.bold = True
                run.font.color.rgb = WHITE
                run.font.name = "Helvetica"
        cell.fill.solid()
        cell.fill.fore_color.rgb = PRIMARY

    for r, row in enumerate(rows, start=1):
        for c, value in enumerate(row):
            cell = tbl.cell(r, c)
            cell.text = value
            for p in cell.text_frame.paragraphs:
                p.alignment = PP_ALIGN.LEFT
                for run in p.runs:
                    run.font.size = Pt(body_size)
                    run.font.bold = c == 0
                    run.font.color.rgb = PRIMARY if c == 0 else INK
                    run.font.name = "Helvetica"
            cell.fill.solid()
            cell.fill.fore_color.rgb = SOFT if r % 2 else SOFT_2

    if content.get("note"):
        note_top = table_top.inches + table_h.inches + 0.12
        if note_top > 6.45:
            note_top = 6.45
        soft_card(slide, MARGIN, Inches(note_top), Inches(12.0), Inches(0.55), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(note_top + 0.12),
            Inches(11.3),
            Inches(0.35),
            content["note"],
            size=13,
            color=MUTED,
        )

    content_footer(slide, index, total)


def _render_content_slide(prs, total, index, content):
    layout = content.get("layout")
    if layout == "table" or (content.get("table") and layout != "formula_example"):
        slide_topic_table(prs, total, index, content)
    elif layout == "formula_example":
        slide_formula_example(prs, total, index, content)
    elif content.get("formula") or content.get("plot") or content.get("plot_path"):
        slide_linear_intro(prs, total, index, content)
    else:
        slide_topic_rich(prs, total, index, content)


def slide_topic(prs, total, index, topic_index, topic):
    """Returns number of slides added."""
    content = TOPIC_CONTENT.get(topic)
    if content:
        _render_content_slide(prs, total, index, content)
        n = 1
        for extra in content.get("extra_slides") or []:
            _render_content_slide(prs, total, index + n, extra)
            n += 1
        return n

    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, topic, f"Topic {topic_index} of {len(s['topics'])}")
    soft_card(slide, MARGIN, Inches(2.45), Inches(12.0), Inches(3.7), fill=SOFT)
    add_text(
        slide,
        MARGIN + Inches(0.4),
        Inches(3.55),
        Inches(11.2),
        Inches(0.55),
        topic,
        size=26,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    add_text(
        slide,
        MARGIN + Inches(0.4),
        Inches(4.25),
        Inches(11.2),
        Inches(0.4),
        "Content coming next — paste the teaching block when ready.",
        size=14,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )
    content_footer(slide, index, total)
    return 1


def _topic_slide_count(topic: str) -> int:
    content = TOPIC_CONTENT.get(topic)
    if not content:
        return 1
    return 1 + len(content.get("extra_slides") or [])


def main() -> None:
    s = SESSION
    topic_pages = sum(_topic_slide_count(t) for t in s["topics"])
    total = 4 + topic_pages
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    slide_title(prs, total)
    n = 2
    slide_big_picture(prs, total, n)
    n = 3
    slide_section_divider(prs, total, n)
    n = 4
    slide_agenda(prs, total, n)
    for i, topic in enumerate(s["topics"], start=1):
        n += 1
        added = slide_topic(prs, total, n, i, topic)
        n += added - 1

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")
    print("Brand: ETRA Design System v1.0")
    print("Topics:", " · ".join(s["topics"]))


if __name__ == "__main__":
    main()
