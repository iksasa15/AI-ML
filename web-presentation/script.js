const presentationData = {
  title: "AI & Machine Learning Bootcamp",
  slides: [
    {
      title: "The Machine Learning Process",
      subtitle: "The 3 Main Steps",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Machine_learning_workflow_diagram.png",
      ],
      type: "three-columns",
      columns: [
        {
          heading: "Step 1: Data Pre-Processing",
          bullets: [
            "Import the data",
            "Clean the data",
            "Split into training and test sets",
            "Feature scaling",
          ],
        },
        {
          heading: "Step 2: Modelling",
          bullets: [
            "Build the model",
            "Train the model",
            "Make predictions",
          ],
        },
        {
          heading: "Step 3: Evaluation",
          bullets: [
            "Calculate performance metrics",
            "Make a final prediction",
          ],
        },
      ],
    },
    {
      title: "Training Set & Test Set",
      subtitle: "Key Idea",
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:1160/format:webp/1*OECM6SWmlhVzebmSuvMtBg.png",
      imageAlt: "Training Set and Test Set",
      bullets: [
        "Training Set: Data used by the model to learn patterns.",
        "Test Set: New, unseen data used to check model performance.",
      ],
      note: "We train on one part of the data, then test on another part to make sure the model generalizes well.",
    },
    {
      title: "Feature Scaling",
      subtitle: "What is Feature Scaling?",
      body: "Feature scaling means adjusting feature values to a similar range using methods like standardization and normalization.",
      bullets: [
        "It prevents large-value features from dominating smaller-value features.",
        "It improves performance for distance-based and gradient-based algorithms (e.g., KNN, SVM, Gradient Descent).",
        "It helps training converge faster.",
      ],
      table: {
        title: "Example (Before vs After Scaling)",
        headers: [
          "Student",
          "Height (cm) - Before",
          "Weight (kg) - Before",
          "Height (Scaled)",
          "Weight (Scaled)",
        ],
        rows: [
          ["A", "150", "50", "0.25", "0.22"],
          ["B", "170", "70", "0.58", "0.67"],
          ["C", "185", "85", "0.83", "1.00"],
        ],
      },
      note: "Before scaling, height and weight have different numeric ranges. After scaling, both features are on a comparable scale and contribute more fairly.",
    },
    {
      title: "Feature Scaling Methods",
      sections: [
        {
          heading: "1) Normalization (Min-Max Scaling)",
          body: "Normalization transforms each value to a range between 0 and 1.",
          formula: "x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
          bullets: [
            "Useful for models that depend on distances or absolute magnitudes.",
            "Common choice for algorithms such as KNN and K-Means.",
          ],
        },
        {
          heading: "2) Standardization (Z-score Scaling)",
          body: "Standardization centers data around 0 with a standard deviation of 1.",
          formula: "z = \\frac{x - \\mu}{\\sigma}",
          bullets: [
            "mu = mean of the feature, sigma = standard deviation of the feature.",
            "Preferred when features are close to a Gaussian distribution.",
            "Works well with Logistic Regression, SVM, and Linear Regression.",
          ],
        },
      ],
    },
    {
      title: "Choosing the Right Scaling Method",
      sections: [
        {
          heading: "Normalization",
          body: "Use Normalization when feature values have very different ranges and you want all values mapped to [0, 1].",
          bullets: [
            "Typical method: Min-Max Scaling.",
            "Good for distance-based models where magnitude differences strongly affect results.",
          ],
        },
        {
          heading: "Standardization",
          body: "Use Standardization when features are expected to follow (or be close to) a Gaussian distribution, or when the dataset contains outliers.",
          bullets: [
            "It keeps the data centered around 0 and scales variability to 1.",
            "Often preferred for linear models and optimization-based algorithms.",
          ],
        },
      ],
    },
    {
      title: "Feature Scaling Example (Normalization)",
      body: "Given feature values: [20, 40, 60, 80, 100]",
      formula: "x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
      bullets: [
        "x_min = 20",
        "x_max = 100",
      ],
      table: {
        title: "Before vs After Normalization",
        headers: ["Original Value (x)", "Normalized Value (x_norm)"],
        rows: [
          ["20", "0.00"],
          ["40", "0.25"],
          ["60", "0.50"],
          ["80", "0.75"],
          ["100", "1.00"],
        ],
      },
      note: "This table shows how all values are scaled to the range [0, 1].",
    },
    {
      title: "Feature Scaling Example (Standardization)",
      body: "Given feature values: [20, 40, 60, 80, 100]",
      formula: "z = \\frac{x - \\mu}{\\sigma}",
      bullets: [
        "Mean: \\(\\mu = 60\\)",
        "Standard deviation: \\(\\sigma = 28.28\\)",
      ],
      table: {
        title: "Before vs After Standardization",
        headers: ["Original Value (x)", "Standardized Value (z)"],
        rows: [
          ["20", "-1.41"],
          ["40", "-0.71"],
          ["60", "0.00"],
          ["80", "0.71"],
          ["100", "1.41"],
        ],
      },
      note: "This table shows that standardized values are centered around 0 and measured in units of standard deviation.",
    },
    {
      title: "Categorical Data",
      subtitle: "What is Categorical Data?",
      body: "Categorical data describes values that belong to named groups rather than continuous numbers.",
      table: {
        title: "Category Types",
        headers: ["Type", "Description", "Example"],
        rows: [
          [
            "Ordinal",
            "Categories have a meaningful order.",
            "Education Level: High School < Bachelor's < Master's < PhD",
          ],
          [
            "Nominal",
            "Categories have no natural order.",
            "Payment Method: Cash, Card, Bank Transfer",
          ],
        ],
      },
      note: "Most machine learning algorithms work with numerical inputs only, so categorical values must be converted into numbers.",
      tables: [
        {
          title: "Example 1: Label Encoding",
          headers: ["Raw Category", "Encoded Value"],
          rows: [
            ["Cash", "0"],
            ["Card", "1"],
            ["Bank Transfer", "2"],
          ],
        },
        {
          title: "Example 2: One-Hot Encoding",
          headers: ["Raw Category", "Cash", "Card", "Bank Transfer"],
          rows: [
            ["Cash", "1", "0", "0"],
            ["Card", "0", "1", "0"],
            ["Bank Transfer", "0", "0", "1"],
          ],
        },
      ],
    },
    {
      title: "How to Deal with Categorical Data (Ordinal Encoding)",
      subtitle: "What is Ordinal Encoding?",
      body: "Ordinal Encoding converts ordered categories into integers that preserve their ranking.",
      bullets: [
        "Use Ordinal Encoding only when categories have a true order.",
        "Step 1: Identify the correct category order.",
        "Step 2: Assign an integer to each level based on that order.",
        "Step 3: Replace the original text values with encoded numbers.",
      ],
      table: {
        title: "Example",
        headers: ["Satisfaction Level", "Encoded Value"],
        rows: [
          ["Low", "1"],
          ["Medium", "2"],
          ["High", "3"],
        ],
      },
      note: "This method keeps the order information, which is important for many machine learning models.",
    },
    {
      title: "How to Deal with Categorical Data (One-Hot Encoding)",
      subtitle: "What is One-Hot Encoding?",
      body: "One-Hot Encoding converts each category into a separate binary column (0 or 1).",
      bullets: [
        "Use One-Hot Encoding for nominal categories (no natural order).",
        "Step 1: List all unique categories.",
        "Step 2: Create one column for each category.",
        "Step 3: Put 1 in the matching category column and 0 in all others.",
      ],
      table: {
        title: "Example",
        headers: ["Payment Method", "Cash", "Card", "Bank Transfer"],
        rows: [
          ["Cash", "1", "0", "0"],
          ["Card", "0", "1", "0"],
          ["Bank Transfer", "0", "0", "1"],
        ],
      },
      note: "This method avoids creating a false ranking between categories.",
    },
    {
      title: "How to Deal with Categorical Data (Dummy Encoding)",
      subtitle: "What is Dummy Encoding?",
      body: "Dummy Encoding is similar to One-Hot Encoding, but it removes one category column to avoid redundancy.",
      bullets: [
        "It helps prevent the dummy variable trap (perfect multicollinearity), especially in linear models.",
        "Step 1: Start with One-Hot encoded columns.",
        "Step 2: Drop one category as a reference (baseline).",
        "Step 3: Keep the remaining binary columns.",
        "Original categories: Payment Method = [Cash, Card, Bank Transfer].",
        "Reference category (dropped): Cash.",
      ],
      table: {
        title: "Example",
        headers: ["Payment Method", "Card", "Bank Transfer"],
        rows: [
          ["Cash", "0", "0"],
          ["Card", "1", "0"],
          ["Bank Transfer", "0", "1"],
        ],
      },
      note: "In this setup, Cash is represented when all remaining columns are 0.",
    },
    {
      title: "How to Deal with Categorical Data (Other Encoding Types)",
      body: "Besides Ordinal, One-Hot, and Dummy Encoding, there are other useful methods.",
      table: {
        title: "Encoding Methods Overview",
        headers: ["Encoding Type", "Idea", "Best Use Case"],
        rows: [
          [
            "Frequency Encoding",
            "Replace each category with how often it appears.",
            "Large datasets with many categories",
          ],
          [
            "Count Encoding",
            "Similar to frequency, but uses raw counts directly.",
            "Tree-based models with high-cardinality features",
          ],
          [
            "Target Encoding",
            "Replace category with target mean for that category.",
            "Supervised tasks (use with care to avoid leakage)",
          ],
          [
            "Binary Encoding",
            "Convert category index to binary digits across columns.",
            "High-cardinality data with fewer columns than one-hot",
          ],
          [
            "Hash Encoding",
            "Use a hash function to map categories into fixed columns.",
            "Very large and dynamic category sets",
          ],
        ],
      },
      tables: [
        {
          title: "1) Frequency Encoding (City)",
          headers: ["City", "Frequency"],
          rows: [
            ["Riyadh", "0.50"],
            ["Jeddah", "0.33"],
            ["Dammam", "0.17"],
          ],
        },
        {
          title: "2) Count Encoding (City)",
          headers: ["City", "Count"],
          rows: [
            ["Riyadh", "3"],
            ["Jeddah", "2"],
            ["Dammam", "1"],
          ],
        },
        {
          title: "3) Target Encoding (City)",
          headers: ["City", "Mean Target"],
          rows: [
            ["Riyadh", "0.80"],
            ["Jeddah", "0.40"],
            ["Dammam", "0.20"],
          ],
        },
        {
          title: "4) Binary Encoding (City)",
          headers: ["City", "Category ID", "Binary Code"],
          rows: [
            ["Riyadh", "1", "01"],
            ["Jeddah", "2", "10"],
            ["Dammam", "3", "11"],
          ],
        },
        {
          title: "5) Hash Encoding (4 Buckets)",
          headers: ["City", "Hash Bucket"],
          rows: [
            ["Riyadh", "2"],
            ["Jeddah", "0"],
            ["Dammam", "3"],
          ],
        },
      ],
      note: "Choose the encoding method based on category order, cardinality, model type, and risk of data leakage.",
    },
    {
      title: "Handling Missing Data",
      subtitle: "What is Missing Data?",
      body: "Missing data refers to values that are absent or incomplete in one or more features of a dataset.",
      table: {
        title: "Types of Missing Data",
        headers: ["Type", "Meaning"],
        rows: [
          [
            "MCAR (Missing Completely at Random)",
            "Missingness happens randomly and is unrelated to any variable in the dataset.",
          ],
          [
            "MAR (Missing at Random)",
            "Missingness depends on other observed variables, but not on the missing value itself.",
          ],
          [
            "NMAR (Not Missing at Random)",
            "Missingness depends on the missing value itself or unobserved factors.",
          ],
        ],
      },
      bullets: [
        "It can introduce bias into model training.",
        "It may reduce prediction accuracy.",
        "It can cause errors in analysis if not handled properly.",
      ],
    },
    {
      title: "Handling Missing Data - Why Do We Have Missing Data?",
      body: "Missing values can appear for many practical reasons during data collection and processing.",
      table: {
        title: "Common Causes",
        headers: ["Cause", "Description", "Example"],
        rows: [
          [
            "Human Error",
            "Data is skipped, entered incorrectly, or forgotten.",
            "A user leaves the Age field empty in a form.",
          ],
          [
            "Device/Sensor Failure",
            "Measurement tools fail or disconnect.",
            "A medical sensor stops recording heart rate temporarily.",
          ],
          [
            "Data Integration Issues",
            "Missing fields appear when combining data from multiple sources.",
            "One database has salary, another does not.",
          ],
          [
            "Privacy or Refusal",
            "Participants choose not to share sensitive information.",
            "A customer does not provide income details.",
          ],
          [
            "System/Transmission Errors",
            "Data is lost during storage, transfer, or export.",
            "Network interruption causes missing rows in logs.",
          ],
          [
            "Conditional Missingness",
            "Some fields are only relevant for specific groups.",
            "Pregnancy_Status is empty for male patients.",
          ],
        ],
      },
      note: "Understanding why data is missing helps us choose the right treatment method (deletion, imputation, or advanced modeling).",
    },
    {
      title: "Handling Missing Data - MCAR",
      subtitle: "Missing Completely at Random (MCAR)",
      body: "MCAR means missing values occur randomly and are independent of both observed and unobserved variables.",
      bullets: [
        "MCAR has no systematic pattern.",
        "In practice, MCAR is often an unrealistic assumption in real-world datasets.",
        "Before assuming MCAR, review data collection workflow and consult domain experts.",
        "If MCAR is reasonable, simple imputation (mean/median/mode) can work.",
      ],
      table: {
        title: "Illustrative Data Example",
        headers: ["Student ID", "Age", "Score"],
        rows: [
          ["101", "20", "85"],
          ["102", "Missing", "88"],
          ["103", "21", "Missing"],
          ["104", "23", "91"],
          ["105", "Missing", "76"],
          ["106", "22", "Missing"],
        ],
      },
      note: "Missing values appear across different rows and columns with no clear pattern, which is consistent with MCAR.",
    },
    {
      title: "Handling Missing Data - MAR",
      subtitle: "Missing at Random (MAR)",
      body: "MAR means missingness is related to observed features in the dataset, but not to the missing feature itself.",
      table: {
        title: "Example (Table)",
        headers: ["Student", "Grade (Observed)", "Study Hours"],
        rows: [
          ["1", "95", "Missing"],
          ["2", "92", "Missing"],
          ["3", "88", "4"],
          ["4", "75", "6"],
          ["5", "70", "7"],
        ],
      },
      sections: [
        {
          heading: "Imputation Techniques for MAR",
          table: {
            headers: ["Method", "Idea", "Why It Works for MAR"],
            rows: [
              [
                "kNN Imputation",
                "Fills missing values using the nearest similar records.",
                "Uses observed features to find similar patterns.",
              ],
              [
                "MissForest",
                "Uses random-forest models iteratively to predict missing values.",
                "Captures non-linear relationships from observed data effectively.",
              ],
            ],
          },
        },
        {
          heading: "Example: kNN Imputation (k = 2)",
          body: "For student C, the two nearest students based on Grade and Attendance are A and B.",
          formula: "\\text{Study Hours}_C = \\frac{8 + 7}{2} = 7.5",
          table: {
            headers: ["Student", "Grade", "Attendance (%)", "Study Hours"],
            rows: [
              ["A", "90", "95", "8"],
              ["B", "88", "92", "7"],
              ["C", "91", "96", "Missing"],
              ["D", "70", "75", "3"],
            ],
          },
        },
        {
          heading: "Example: MissForest",
          body: "MissForest trains a Random Forest model using known rows to predict the missing value for student C.",
          formula: "\\text{Study Hours}_C \\approx 7.6",
        },
      ],
      note: "MAR is common in practice because missingness can often be explained by available variables.",
    },
    {
      title: "Handling Missing Data - MNAR",
      subtitle: "Missing Not at Random (MNAR)",
      body: "MNAR is usually the most complex type because missingness depends on the missing value itself or unobserved variables.",
      bullets: [
        "Standard imputation can be unreliable without additional data or strong domain assumptions.",
        "MNAR has a systematic pattern tied to hidden information.",
      ],
      table: {
        title: "Example (Table)",
        headers: ["Participant", "Reported Stress Level"],
        rows: [
          ["1", "2"],
          ["2", "Missing"],
          ["3", "3"],
          ["4", "Missing"],
          ["5", "1"],
        ],
      },
      tables: [
        {
          title: "Practical Tip: Preserve Missingness Pattern",
          headers: ["Participant", "Stress (Imputed)", "Stress_Was_Missing"],
          rows: [
            ["1", "2.0", "0"],
            ["2", "4.1", "1"],
            ["3", "3.0", "0"],
            ["4", "4.3", "1"],
            ["5", "1.0", "0"],
          ],
        },
      ],
    },
    {
      title: "Data Preprocessing Template",
      subtitle: "Standard Workflow",
      bullets: [
        "Load the dataset.",
        "Detect and handle missing values.",
        "Encode categorical features into numerical form.",
        "Split the dataset into training and test sets.",
        "Scale numerical features when needed.",
      ],
      note: "Pipeline: Raw Data -> Missing Data Treatment -> Categorical Encoding -> Train/Test Split -> Feature Scaling -> ML Model.",
    },
    {
      title: "Regression - Simple Linear Regression",
      subtitle: "What is Simple Linear Regression?",
      body: "Simple Linear Regression models the relationship between one independent variable x and one dependent variable y using a straight line.",
      imageUrls: ["./assets/plots/slide-19-1.png"],
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
      imageUrls: ["./assets/plots/slide-22-1.png", "./assets/plots/slide-22-2.png"],
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
      imageUrls: ["./assets/plots/slide-25-1.png"],
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
      imageUrls: ["./assets/plots/slide-39-1.png", "./assets/plots/slide-39-2.png"],
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
      imageUrls: ["./assets/plots/slide-42-1.png", "./assets/plots/slide-42-2.png"],
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
        "./assets/plots/slide-46-1.png",
        "./assets/plots/slide-46-2.png",
        "./assets/plots/slide-46-3.png",
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
      imageUrls: ["./assets/plots/slide-48-1.png"],
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
        "./assets/plots/slide-52-1.png",
        "./assets/plots/slide-52-2.png",
        "./assets/plots/slide-52-3.png",
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
      imageUrls: ["./assets/plots/slide-54-1.png"],
      note: "Visual output from Python code is shown below.",
    },
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
    {
      title: "Naive Bayes: Bayes' Theorem",
      subtitle: "Core Probability Rule",
      formula: "P(A\\mid B)=\\frac{P(B\\mid A)P(A)}{P(B)}",
      bullets: [
        "P(A|B): posterior probability after observing evidence B.",
        "P(A): prior belief before seeing evidence.",
        "P(B|A): likelihood of evidence if class A is true.",
        "P(B): evidence probability (normalization term).",
      ],
      note: "This theorem updates beliefs when new evidence appears.",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/6/61/Bayes_theorem_tree_diagrams.svg",
      ],
    },
    {
      title: "How Naive Bayes Classifies",
      bullets: [
        "Compute class posterior for each class: P(Class | X).",
        "Estimate prior and feature likelihoods from training data.",
        "Compare posterior scores across classes.",
        "Assign the class with the highest posterior probability.",
      ],
      formula:
        "\\hat{y}=\\arg\\max_{c\\in\\mathcal{C}} P(c)\\prod_{j=1}^{m}P(x_j\\mid c)",
      note: "For numerical stability, implementations often use log-probabilities.",
    },
    {
      title: "Why Is It Called 'Naive'?",
      subtitle: "Conditional Independence Assumption",
      body: "Naive Bayes assumes features are conditionally independent given the class label.",
      bullets: [
        "Simplifies parameter estimation and speeds up training.",
        "Works well in text classification and high-dimensional sparse data.",
        "Can still perform well even when independence is not fully true.",
      ],
      note: "When comparing classes for the same X, P(X) is constant and can be ignored.",
    },
    {
      title: "Naive Bayes: Practical Notes",
      table: {
        headers: ["Variant", "Typical Data Type", "Key Idea"],
        rows: [
          ["Gaussian NB", "Continuous", "Assumes each feature follows a Gaussian distribution."],
          ["Multinomial NB", "Count-based", "Common for document word counts."],
          ["Bernoulli NB", "Binary", "Uses binary presence/absence features."],
        ],
      },
      bullets: [
        "Handle zero-frequency with smoothing (e.g., Laplace smoothing).",
        "Scale and preprocessing depend on feature type and variant.",
      ],
    },
    {
      title: "Decision Tree Classification (CART)",
      body: "Decision Tree Classification predicts class labels by recursively splitting feature space into purer class regions.",
      bullets: [
        "Internal nodes represent feature-based decisions.",
        "Branches represent decision outcomes.",
        "Leaf nodes output final class prediction.",
      ],
      imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/f/ff/Decision_tree_model.png"],
    },
    {
      title: "How Splits Are Chosen in Classification Trees",
      bullets: [
        "Choose split that best separates classes at each node.",
        "Stop splitting using rules like max depth or minimum samples.",
      ],
      sections: [
        {
          heading: "Gini Impurity (CART default)",
          formula: "Gini(S)=1-\\sum_{k=1}^{K}p_k^2",
        },
        {
          heading: "Entropy and Information Gain",
          formula: "Entropy(S)=-\\sum_{k=1}^{K}p_k\\log_2 p_k",
        },
      ],
      note: "Better splits reduce impurity and increase class purity in child nodes.",
    },
    {
      title: "Decision Tree: Classification vs Regression",
      table: {
        headers: ["Aspect", "Classification Tree", "Regression Tree"],
        rows: [
          ["Target", "Categorical class", "Continuous value"],
          ["Split criterion", "Gini / Entropy", "MSE / MAE"],
          ["Leaf output", "Class label or class probability", "Numeric mean/median"],
        ],
      },
      note: "Both use recursive partitioning, but optimize different objectives.",
    },
    {
      title: "Random Forest Classification",
      subtitle: "Ensemble Learning by Bagging",
      bullets: [
        "Sample bootstrap data and train many trees.",
        "Each tree predicts a class for the new sample.",
        "Final class is selected by majority voting.",
      ],
      formula:
        "\\hat{y}_{RF}(x)=\\operatorname*{mode}\\{\\hat{y}_1(x),\\hat{y}_2(x),\\ldots,\\hat{y}_T(x)\\}",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Random_forest_explain.png",
      ],
    },
    {
      title: "Why Random Forest Often Outperforms a Single Tree",
      table: {
        headers: ["Property", "Single Decision Tree", "Random Forest"],
        rows: [
          ["Variance", "High", "Lower (averaging effect)"],
          ["Overfitting risk", "Higher", "Lower"],
          ["Interpretability", "High", "Moderate"],
          ["Predictive robustness", "Sensitive to data noise", "More stable"],
        ],
      },
      note: "Random Forest improves generalization by combining diverse weak learners.",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d8/Decision_Tree_vs._Random_Forest.png",
      ],
    },
    {
      title: "Classification Errors: FP and FN",
      bullets: [
        "False Positive (Type I): model predicts positive, but actual is negative.",
        "False Negative (Type II): model predicts negative, but actual is positive.",
        "Error impact depends on domain costs (e.g., healthcare vs spam filtering).",
      ],
      note: "Model evaluation should consider error trade-offs, not accuracy alone.",
    },
    {
      title: "Confusion Matrix and Accuracy",
      table: {
        headers: ["Metric", "Meaning"],
        rows: [
          ["TP", "Correctly predicted positives"],
          ["TN", "Correctly predicted negatives"],
          ["FP", "Incorrectly predicted positives"],
          ["FN", "Incorrectly predicted negatives"],
        ],
      },
      formula: "Accuracy=\\frac{TP+TN}{TP+TN+FP+FN}",
      imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/6/6f/ConfusionMatrix.png"],
    },
    {
      title: "Precision, Recall, and F1-Score",
      bullets: [
        "Precision: of predicted positives, how many are truly positive.",
        "Recall: of actual positives, how many were detected.",
        "F1-score: harmonic mean balancing precision and recall.",
      ],
      sections: [
        {
          heading: "Formulas",
          formula: "Precision=\\frac{TP}{TP+FP},\\quad Recall=\\frac{TP}{TP+FN}",
        },
        {
          heading: "F1",
          formula: "F1=2\\cdot\\frac{Precision\\cdot Recall}{Precision+Recall}",
        },
      ],
      note: "Use F1 especially when class distribution is imbalanced.",
      imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/2/26/Precisionrecall.svg"],
    },
    {
      title: "Support Vector Machine (SVM): Core Idea",
      body: "SVM is a supervised method that finds the best separating boundary (hyperplane) between classes.",
      bullets: [
        "It maximizes the margin between classes.",
        "Only support vectors (closest points) determine the boundary.",
        "A larger margin usually improves generalization.",
      ],
      imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/f/fd/SVM_margins.png"],
    },
    {
      title: "How SVM Classification Works",
      bullets: [
        "New points are classified by the side of the hyperplane they fall on.",
        "Hard margin: no misclassification allowed (strict separation).",
        "Soft margin: allows violations for better robustness with overlap/noise.",
      ],
      formula: "f(x)=w^Tx+b,\\quad \\hat{y}=\\operatorname{sign}(f(x))",
      note: "Soft-margin SVM adds penalty C to control margin-violation tradeoff.",
    },
    {
      title: "Why SVM Is Powerful",
      table: {
        headers: ["Capability", "Why It Matters"],
        rows: [
          ["Maximum-margin principle", "Better robustness to small perturbations."],
          ["Kernel support", "Handles non-linear class boundaries."],
          ["High-dimensional performance", "Works well in text and sparse feature spaces."],
        ],
      },
      bullets: [
        "Common in text classification and image-related features.",
        "Often effective on small-to-medium datasets.",
      ],
    },
    {
      title: "Kernel Trick: From Non-Linear to Linear Separation",
      body: "When data is not linearly separable in original space, SVM uses kernel functions to separate it in a transformed feature space.",
      bullets: [
        "Avoids explicit high-dimensional mapping in many cases.",
        "Computes similarity using kernel function K(x_i, x_j).",
      ],
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/f/fe/Kernel_Machine.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/57/Nonlinear_SVM_example_illustration.svg",
      ],
    },
    {
      title: "RBF Kernel in SVM",
      formula: "K(x,l_i)=\\exp\\left(-\\frac{\\|x-l_i\\|^2}{2\\sigma^2}\\right)",
      bullets: [
        "If x is close to landmark l_i, similarity is near 1.",
        "If x is far, similarity approaches 0.",
        "RBF is a common default for non-linear SVM.",
      ],
      sections: [
        {
          heading: "Effect of sigma",
          bullets: [
            "Large sigma: smoother, wider decision boundary (higher bias).",
            "Small sigma: tighter, complex boundary (higher variance/overfitting risk).",
          ],
        },
      ],
    },
    {
      title: "Common SVM Kernels",
      table: {
        headers: ["Kernel", "Typical Use", "Notes"],
        rows: [
          ["Linear", "High-dimensional sparse data", "Fast and interpretable margin."],
          ["RBF (Gaussian)", "General non-linear patterns", "Strong baseline in many tasks."],
          ["Polynomial", "Polynomial-like interactions", "Degree controls complexity."],
          ["Sigmoid", "Neural-style boundary behavior", "Less common in practice."],
        ],
      },
    },
    {
      title: "When to Use SVM / When Not",
      sections: [
        {
          heading: "Use SVM When",
          bullets: [
            "Data is high-dimensional or moderately sized.",
            "Classes are reasonably separable.",
            "You need non-linear boundaries via kernels.",
          ],
        },
        {
          heading: "Avoid SVM When",
          bullets: [
            "Dataset is very large (training can be expensive).",
            "Data is extremely noisy with weak class structure.",
            "Feature count and sample size make kernel matrix too costly.",
          ],
        },
      ],
    },
    {
      title: "SVM vs Logistic Regression vs K-NN",
      table: {
        headers: ["Aspect", "SVM", "Logistic Regression", "K-NN"],
        rows: [
          ["Primary task", "Classification (and SVR)", "Classification", "Classification"],
          ["Non-linearity", "Yes, with kernels", "Limited in linear form", "Yes (distance-based)"],
          ["Compute profile", "Can be heavy on large data", "Usually efficient", "Heavy at prediction"],
          ["Best for", "Complex margins, high-dimensional spaces", "Fast interpretable baseline", "Local neighborhood patterns"],
        ],
      },
      note: "Model choice should be validated with cross-validation and error tradeoff metrics.",
    },
    {
      title: "SVM Practical Hyperparameters",
      table: {
        headers: ["Parameter", "Role", "Typical Tuning Direction"],
        rows: [
          ["C", "Penalty for margin violations", "Higher C -> stricter fit, lower C -> smoother margin"],
          ["Kernel", "Similarity function", "Start with RBF, compare with linear/polynomial"],
          ["gamma (RBF)", "Locality of influence", "Higher gamma -> tighter boundary"],
          ["degree (poly)", "Polynomial complexity", "Increase only when needed"],
        ],
      },
      note: "Scale features before SVM, especially for RBF/polynomial kernels.",
    },
    {
      title: "Clustering Overview",
      subtitle: "Unsupervised Learning for Structure Discovery",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/KMeans-density-data.svg",
      ],
      bullets: [
        "Clustering groups similar observations without target labels.",
        "It is used for customer segmentation, anomaly discovery, and data exploration.",
        "Cluster quality depends on feature scaling, distance metric, and algorithm assumptions.",
      ],
      note: "In unsupervised settings, evaluation combines metrics with domain interpretation.",
    },
    {
      title: "K-Means Clustering: Core Idea",
      subtitle: "Partition Data into K Compact Groups",
      formula:
        "J = \\sum_{i=1}^{K} \\sum_{x \\in C_i} \\lVert x - \\mu_i \\rVert^2",
      bullets: [
        "Initialize K centroids, assign each point to the nearest centroid, then update centroids.",
        "Repeat assignment and update until cluster memberships stabilize.",
        "K-Means favors spherical, similarly sized clusters in Euclidean space.",
      ],
      note: "The objective minimizes within-cluster variance (WCSS/inertia).",
    },
    {
      title: "Selecting K: Elbow and Silhouette",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/DataClustering_ElbowCriterion.JPG",
      imageAlt: "Elbow method chart",
      table: {
        headers: ["Method", "What to inspect", "Interpretation"],
        rows: [
          [
            "Elbow",
            "WCSS vs number of clusters",
            "Choose the knee where improvement starts diminishing",
          ],
          [
            "Silhouette",
            "Mean silhouette score in [-1, 1]",
            "Higher values indicate better separation and compactness",
          ],
        ],
      },
      note: "Use both metrics and business context; the mathematically best K is not always operationally best.",
    },
    {
      title: "K-Means++ Initialization",
      subtitle: "A Better Start than Pure Random Seeds",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/K-means_convergence.gif",
      ],
      bullets: [
        "Pick the first centroid randomly from data points.",
        "Choose subsequent centroids with probability proportional to squared distance (D^2).",
        "Then run standard K-Means iterations.",
      ],
      note: "K-Means++ reduces poor initialization risk and often converges to lower inertia.",
    },
    {
      title: "Hierarchical Clustering",
      subtitle: "Agglomerative vs Divisive Perspectives",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/a/ad/Hierarchical_clustering_simple_diagram.svg",
      ],
      bullets: [
        "Agglomerative clustering starts with one point per cluster and merges progressively.",
        "Divisive clustering starts with one global cluster and splits recursively.",
        "The dendrogram stores merge history and supports multi-resolution analysis.",
      ],
      note: "Unlike K-Means, hierarchical methods can reveal nested structure in data.",
    },
    {
      title: "Linkage Choices and Dendrogram Cuts",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/f/f2/SLINK-density-data.svg",
      ],
      table: {
        headers: ["Linkage", "Distance between clusters", "Typical behavior"],
        rows: [
          ["Single", "Minimum pairwise distance", "Can chain elongated clusters"],
          ["Complete", "Maximum pairwise distance", "Produces compact, tighter clusters"],
          ["Average", "Mean pairwise distance", "Balanced tradeoff between single/complete"],
          ["Ward", "Increase in within-cluster variance", "Often forms homogeneous clusters"],
        ],
      },
      note: "Choose a dendrogram cut threshold where vertical gaps are most pronounced.",
    },
    {
      title: "PCA: Dimensionality Reduction Intuition",
      subtitle: "Project Data onto High-Variance Directions",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/PCA_plot_of_European_individuals.png",
      ],
      formula:
        "\\Sigma = \\frac{1}{n-1}X^\\top X,\\quad \\Sigma v_j = \\lambda_j v_j",
      bullets: [
        "PCA transforms correlated features into orthogonal principal components.",
        "Components are ordered by explained variance (largest eigenvalues first).",
        "Keeping top components reduces noise and computational cost.",
      ],
      note: "Standardize features before PCA when original scales differ substantially.",
    },
    {
      title: "PCA Workflow and Explained Variance",
      formula:
        "\\text{Explained Variance Ratio}_j = \\frac{\\lambda_j}{\\sum_{m=1}^{p} \\lambda_m}",
      table: {
        headers: ["Step", "Action", "Outcome"],
        rows: [
          ["1", "Standardize features", "Comparable feature scales"],
          ["2", "Compute covariance matrix and eigenpairs", "Ranked principal directions"],
          ["3", "Select top-k components", "Compressed feature representation"],
          ["4", "Project data onto selected components", "Lower-dimensional inputs"],
        ],
      },
      note: "Select k using cumulative explained variance (e.g., 90-95%) and downstream model performance.",
    },
    {
      title: "Clustering + PCA in Practice",
      subtitle: "A Robust Pipeline for Unsupervised Analysis",
      bullets: [
        "Scale features, run PCA, then cluster in reduced space.",
        "Use 2D/3D PCA projections to visually inspect cluster separability.",
        "Compare multiple algorithms (K-Means, Hierarchical, DBSCAN) before finalizing.",
        "Validate with silhouette score, stability checks, and domain plausibility.",
      ],
      note: "Combining PCA with clustering often improves interpretability and runtime on high-dimensional data.",
    },
    {
      title: "Deep Learning: Motivation",
      subtitle: "From Classical ML to Hierarchical Representation Learning",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg",
      ],
      bullets: [
        "Classical ML often struggles with raw, high-dimensional, and unstructured inputs.",
        "Deep learning reduces manual feature engineering by learning features directly from data.",
        "Layered models learn abstraction levels: edges -> parts -> objects -> semantics.",
      ],
      note: "This shift enables practical learning on images, speech, text, and multimodal data.",
    },
    {
      title: "Why Classical ML Can Fail on Complex Data",
      table: {
        headers: ["Challenge", "Impact", "Why DL Helps"],
        rows: [
          ["Scalability", "Training becomes inefficient on very large datasets", "GPU-friendly optimization and mini-batch learning"],
          ["Manual feature design", "Domain expertise bottleneck", "Automated feature extraction in hidden layers"],
          ["Unstructured modalities", "Hard to handcraft robust descriptors", "Architectures specialized for images/text/audio"],
          ["Hierarchical patterns", "Shallow models miss compositional structure", "Depth builds rich compositional representations"],
        ],
      },
      note: "Deep learning is not always superior for small tabular datasets with limited samples.",
    },
    {
      title: "Deep Learning as a Subset of ML",
      bullets: [
        "AI is the broad field; ML is a subset focused on learning from data.",
        "Deep learning is a subset of ML using deep neural network architectures.",
        "Neural networks existed for decades, but modern compute and data unlocked their full potential.",
      ],
      note: "Historical progress accelerated when ReLU, better optimization, and GPUs became mainstream.",
    },
    {
      title: "Use-Case Fit for Deep Learning",
      table: {
        headers: ["Data Context", "Recommended Direction", "Rationale"],
        rows: [
          ["Images, speech, text", "Deep learning first", "High-dimensional, local and hierarchical patterns"],
          ["Huge datasets", "Deep learning scales well", "Capacity increases with data and compute"],
          ["Small/medium tabular data", "Try tree ensembles first", "Strong baselines with lower tuning cost"],
          ["Categoricals with many levels", "DL embeddings can help", "Dense learned representations of sparse categories"],
        ],
      },
    },
    {
      title: "Image Data Intuition",
      subtitle: "From Pixels to Semantics",
      bullets: [
        "A color image of size 100x100 contains 30,000 values (RGB channels).",
        "Individual pixels are weak signals; neighborhoods encode edges and textures.",
        "Deep layers combine local patterns into object-level understanding.",
      ],
      note: "CNNs are designed to exploit local spatial structure in image tensors.",
    },
    {
      title: "How CNNs Process Images",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png",
      ],
      sections: [
        {
          heading: "Feature Hierarchy",
          bullets: [
            "Early layers detect simple patterns (edges, corners).",
            "Middle layers capture parts and motifs (textures, components).",
            "Late layers encode semantic object concepts for classification.",
          ],
        },
        {
          heading: "Pipeline",
          bullets: [
            "Input -> convolution -> activation -> pooling -> repeated blocks -> classifier head.",
            "Softmax output yields class probabilities for final prediction.",
          ],
        },
      ],
    },
    {
      title: "Computer Vision Tasks with Deep Learning",
      table: {
        headers: ["Task", "Output Type", "Typical Models"],
        rows: [
          ["Image classification", "Single label per image", "ResNet, EfficientNet, ViT"],
          ["Object detection", "Bounding boxes + class labels", "Faster R-CNN, YOLO family"],
          ["Semantic segmentation", "Class label per pixel", "U-Net, DeepLab"],
          ["Instance segmentation", "Per-object masks", "Mask R-CNN"],
        ],
      },
      note: "Task definition determines architecture and loss function design.",
    },
    {
      title: "Single Neuron (Perceptron): Math and Components",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Perceptron_example.svg",
      ],
      formula: "z = w^\\top x + b,\\quad \\hat{y}=f(z)",
      bullets: [
        "The affine part scores inputs via weighted sum and bias shift.",
        "Activation maps score to decision output.",
        "A single perceptron can represent only linear decision boundaries.",
      ],
      table: {
        headers: ["Component", "Meaning"],
        rows: [
          ["x", "Input feature vector"],
          ["w", "Learned importance weights"],
          ["b", "Bias (threshold shift)"],
          ["f(.)", "Activation function"],
        ],
      },
    },
    {
      title: "Activation Functions: Practical Comparison",
      table: {
        headers: ["Activation", "Formula", "Strengths", "Limitations"],
        rows: [
          ["Sigmoid", "\\(\\sigma(z)=\\frac{1}{1+e^{-z}}\\)", "Probabilistic output in (0,1)", "Vanishing gradients in deep stacks"],
          ["Tanh", "\\(\\tanh(z)\\)", "Zero-centered activations", "Still vulnerable to vanishing gradients"],
          ["ReLU", "\\(\\max(0, z)\\)", "Fast, sparse activations, stable in depth", "Dying ReLU for persistently negative inputs"],
          ["Softmax", "\\(\\mathrm{softmax}(z_k)=\\frac{e^{z_k}}{\\sum_j e^{z_j}}\\)", "Normalized multi-class probabilities", "Can be overconfident without calibration"],
        ],
      },
    },
    {
      title: "XOR Problem: Why One Neuron Is Not Enough",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Perceptron_XOR_task.svg",
      ],
      bullets: [
        "XOR is not linearly separable in the original input space.",
        "Linear models (single neuron / logistic regression) cannot fit XOR perfectly.",
        "A hidden layer with non-linear activation transforms data into separable space.",
      ],
      table: {
        headers: ["x1", "x2", "XOR(x1,x2)"],
        rows: [
          ["0", "0", "0"],
          ["0", "1", "1"],
          ["1", "0", "1"],
          ["1", "1", "0"],
        ],
      },
    },
    {
      title: "From Perceptron to Single Hidden Layer Networks",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Multilayer_Perceptron_with_one_hidden_layer.svg",
      ],
      formula: "h = \\phi(W_1x+b_1),\\quad \\hat{y}=\\tau(W_2h+b_2)",
      bullets: [
        "Each hidden neuron performs affine transform + activation.",
        "Combining hidden neurons creates richer hypothesis spaces.",
        "This architecture solves tasks that linear boundaries cannot.",
      ],
      note: "Feature transformation is learned jointly with the final decision rule.",
    },
    {
      title: "Multi-Class Neural Classification",
      subtitle: "Output Layer Design",
      formula: "p_k = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}",
      bullets: [
        "Set number of output neurons equal to number of classes.",
        "Use softmax to convert logits into class probabilities.",
        "Prediction is the class with maximum posterior probability.",
      ],
      table: {
        headers: ["Stage", "Operation"],
        rows: [
          ["Hidden layer", "Extract discriminative latent features"],
          ["Output logits", "Produce one raw score per class"],
          ["Softmax", "Normalize scores into a probability simplex"],
        ],
      },
    },
    {
      title: "Cross-Entropy vs Squared Error for Classification",
      formula: "\\mathcal{L}_{CE}=-\\sum_{k=1}^{K}y_k\\log(p_k)",
      bullets: [
        "Squared error can be suboptimal for probability-based class learning.",
        "Cross-entropy directly rewards high probability on the true class.",
        "It produces stronger gradients for misclassified examples.",
      ],
      table: {
        headers: ["Loss", "Typical Use", "Behavior"],
        rows: [
          ["MSE", "Regression", "Penalizes magnitude error in continuous outputs"],
          ["Cross-Entropy", "Classification", "Penalizes confident wrong probabilities"],
        ],
      },
    },
    {
      title: "Deep Feedforward Networks",
      subtitle: "Why Add More Layers?",
      bullets: [
        "Deeper stacks create increasingly abstract and reusable representations.",
        "Each extra non-linear layer increases expressive power substantially.",
        "Depth can improve performance when data, regularization, and optimization are adequate.",
      ],
      note: "Without non-linear activations, multiple layers reduce to one linear map.",
    },
    {
      title: "Practical Enablers of Modern Deep Learning",
      table: {
        headers: ["Enabler", "Why It Matters"],
        rows: [
          ["ReLU and improved activations", "Reduced vanishing gradients and faster convergence"],
          ["GPU/TPU acceleration", "Order-of-magnitude speedups in training"],
          ["Large labeled datasets", "Allow high-capacity models to generalize"],
          ["Regularization and better optimizers", "Improve stability and robustness of training"],
        ],
      },
      note: "Depth alone is not enough; training recipe quality is critical.",
    },
    {
      title: "Convolution Operation and Edge Filters",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/SobelImageY.png",
      ],
      formula: "G_x = S_x * A",
      bullets: [
        "Convolution applies a kernel over local image patches.",
        "Sobel filters approximate intensity gradients and highlight edges.",
        "Feature maps from early filters are foundational for deeper representations.",
      ],
      note: "In CNNs, filters are learned from data rather than manually fixed.",
    },
    {
      title: "CNN Architecture Blocks",
      table: {
        headers: ["Block", "Function", "Effect"],
        rows: [
          ["Convolution + ReLU", "Pattern extraction", "Creates local feature maps"],
          ["Pooling", "Spatial downsampling", "Reduces computation and noise sensitivity"],
          ["Stacked feature blocks", "Hierarchical abstraction", "Captures complex visual concepts"],
          ["Classification head", "Decision mapping", "Outputs class scores/probabilities"],
        ],
      },
    },
    {
      title: "CNN Application Examples",
      sections: [
        {
          heading: "Vision Use Cases",
          bullets: [
            "Autonomous driving perception (detection, lane understanding).",
            "Medical imaging support (screening and localization).",
            "Image enhancement tasks (denoising, colorization, super-resolution).",
          ],
        },
        {
          heading: "Beyond Vision",
          bullets: [
            "1D convolutions for audio and time-series pattern extraction.",
            "Text CNN variants for sentence-level classification tasks.",
          ],
        },
      ],
    },
    {
      title: "Sequential Modeling with RNNs",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg",
      ],
      bullets: [
        "RNNs process tokens/steps sequentially while carrying hidden state.",
        "Output at time t depends on current input and prior context.",
        "Suitable for language, speech, and temporal forecasting tasks.",
      ],
      note: "Long sequence learning is difficult with vanilla RNNs due to gradient decay.",
    },
    {
      title: "Vanishing Gradients and Memory Limits",
      bullets: [
        "Backpropagation through long chains can shrink gradients toward zero.",
        "Earlier timesteps receive weak updates, harming long-range dependency learning.",
        "This motivates gated recurrent architectures such as LSTM and GRU.",
      ],
      note: "Gradient clipping and careful initialization help but do not fully solve the issue.",
    },
    {
      title: "LSTM Architecture",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Long_Short-Term_Memory.svg",
      ],
      bullets: [
        "Forget gate controls retained past information.",
        "Input gate controls how new information updates cell state.",
        "Output gate controls what part of memory is exposed to next layers.",
      ],
      note: "LSTMs improve long-term dependency handling via explicit memory cell dynamics.",
    },
    {
      title: "GRU Architecture",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg",
      ],
      bullets: [
        "GRU merges some LSTM gates to reduce parameter count.",
        "Update and reset gates provide efficient memory control.",
        "Often competitive with LSTM while being computationally lighter.",
      ],
      note: "GRU is a strong default when latency and model size matter.",
    },
    {
      title: "Encoder-Decoder Pattern",
      subtitle: "Compress, Transform, Reconstruct",
      bullets: [
        "Encoder maps input to a compact latent representation.",
        "Decoder reconstructs or generates target output from latent state.",
        "Used in translation, summarization, denoising, and image-to-image tasks.",
      ],
      table: {
        headers: ["Component", "Role", "Typical Layers"],
        rows: [
          ["Encoder", "Representation extraction", "CNN/RNN/Transformer blocks"],
          ["Latent state", "Information bottleneck", "Dense or sequence memory"],
          ["Decoder", "Target generation", "Transposed conv / autoregressive blocks"],
        ],
      },
    },
    {
      title: "Training Diagnostics: Overfitting, Underfitting, Optimal Fit",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Overfitting_svg.svg",
      ],
      table: {
        headers: ["Regime", "Training Behavior", "Validation Behavior"],
        rows: [
          ["Underfitting", "High error", "High error"],
          ["Good fit", "Low and stable error", "Low and stable error"],
          ["Overfitting", "Error keeps decreasing", "Error starts increasing"],
        ],
      },
      note: "Validation curves are essential for stopping decisions and architecture tuning.",
    },
    {
      title: "Overtraining and Early Stopping",
      bullets: [
        "Overtraining appears when performance on validation data degrades across epochs.",
        "Early stopping halts training after no validation improvement for a patience window.",
        "This reduces overfitting risk and saves compute time.",
      ],
      table: {
        headers: ["Signal", "Action"],
        rows: [
          ["Validation loss plateaus", "Lower learning rate or apply scheduler"],
          ["Validation loss increases", "Stop training and restore best checkpoint"],
          ["Large train-val gap", "Increase regularization or data augmentation"],
        ],
      },
    },
    {
      title: "Regularization and Generalization Toolkit",
      sections: [
        {
          heading: "Core Techniques",
          bullets: [
            "Dropout to reduce neuron co-adaptation.",
            "L2 weight decay to discourage overly large parameters.",
            "Data augmentation to improve invariance and robustness.",
          ],
        },
        {
          heading: "Model/Training Controls",
          bullets: [
            "Reduce unnecessary depth/width when data is limited.",
            "Tune learning rate, batch size, epochs, and optimizer settings.",
            "Use robust validation splits and repeated evaluation.",
          ],
        },
      ],
    },
    {
      title: "Hyperparameter Tuning in Deep Learning",
      table: {
        headers: ["Hyperparameter", "Effect", "Search Guidance"],
        rows: [
          ["Learning rate", "Convergence speed and stability", "Log-scale sweep, then refine"],
          ["Batch size", "Gradient noise vs throughput", "Balance memory and generalization"],
          ["Depth/width", "Model capacity", "Increase progressively with regularization"],
          ["Dropout / weight decay", "Generalization control", "Tune with validation curves"],
        ],
      },
      note: "Random search and Bayesian optimization are usually more efficient than full grid search.",
    },
    {
      title: "Deep Learning Practical Checklist",
      bullets: [
        "Start with a strong baseline architecture and reproducible preprocessing.",
        "Track train/validation metrics, confusion matrix, and failure cases.",
        "Use checkpoints, early stopping, and learning-rate schedules.",
        "Document model version, hyperparameters, and data split strategy.",
      ],
      note: "Reliable experimentation workflow is as important as architecture choice.",
    },
    {
      title: "NLP Fundamentals and Challenges",
      subtitle: "Why Natural Language Is Difficult for Machines",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Major_levels_of_linguistic_structure.svg",
      ],
      bullets: [
        "Natural language is ambiguous, context-dependent, and full of idioms.",
        "Meaning often depends on pragmatics, domain, and cultural background.",
        "The same sentence can map to multiple valid interpretations.",
      ],
      note: "NLP systems must model form, meaning, and context simultaneously.",
    },
    {
      title: "Ambiguity in Language: Practical Examples",
      table: {
        headers: ["Expression", "Possible Interpretation A", "Possible Interpretation B"],
        rows: [
          ["The bank is closed", "Financial institution is closed", "River bank area is inaccessible"],
          ["It's cold", "Low temperature", "Emotionally distant behavior"],
          ["The chicken is ready to eat", "Food is ready to be eaten", "Animal is ready to eat food"],
        ],
      },
      note: "Robust NLP requires disambiguation using surrounding textual and situational context.",
    },
    {
      title: "NLP Grand Goal and Core Applications",
      sections: [
        {
          heading: "Grand Goal",
          bullets: [
            "Human-level language understanding with nuance, intent, and context.",
            "Natural human-machine interaction over text and speech.",
          ],
        },
        {
          heading: "Applications",
          bullets: [
            "Machine translation, sentiment analysis, question answering, search.",
            "Conversational assistants, customer support automation, social analytics.",
          ],
        },
      ],
    },
    {
      title: "Regular Expressions (Regex): Core Idea",
      bullets: [
        "Regex is a compact pattern language for matching and transforming text.",
        "Typical uses include validation, extraction, and rule-based cleanup.",
        "Useful for emails, phone numbers, logs, and normalization pipelines.",
      ],
      table: {
        headers: ["Pattern", "Meaning", "Example Match"],
        rows: [
          ["\\d+", "one or more digits", "2026"],
          ["\\w+", "one or more word chars", "nlp_model1"],
          ["^[A-Z]", "starts with uppercase letter", "Hello"],
          ["\\S+", "one or more non-space chars", "token123"],
        ],
      },
    },
    {
      title: "Regex Quantifiers and Boundaries",
      table: {
        headers: ["Regex Element", "Role", "Example"],
        rows: [
          ["*", "zero or more occurrences", "ba* -> b, ba, baaa"],
          ["+", "one or more occurrences", "\\d+ -> 4, 2024"],
          ["|", "OR between alternatives", "cat|dog"],
          ["\\b", "word boundary", "\\bing\\b matches standalone 'ing'"],
          ["^ / $", "start / end anchors", "^The, end$"],
        ],
      },
      note: "Boundary-aware regex prevents false matches inside larger words.",
    },
    {
      title: "Regex Refinement Workflow",
      bullets: [
        "Initial pattern may under-match or over-match.",
        "Iteratively refine with case handling and boundaries.",
        "Use raw strings in Python regex (e.g., r\"\\d+\") to avoid escaping pitfalls.",
      ],
      table: {
        headers: ["Iteration", "Pattern", "Issue / Improvement"],
        rows: [
          ["1", "the", "Misses uppercase forms like 'The'"],
          ["2", "[tT]he", "Matches both cases but may hit substrings (e.g., other)"],
          ["3", "\\W[tT]he\\W", "Targets standalone word occurrences"],
        ],
      },
    },
    {
      title: "Words and Corpora: Tokens vs Types",
      bullets: [
        "Tokens are total observed word instances (with repetition).",
        "Types are unique vocabulary items in the corpus.",
        "Corpus statistics vary by language, genre, time, and author demographics.",
      ],
      table: {
        headers: ["Text", "Tokens (N)", "Types (|V|)"],
        rows: [
          ["the cat sat on the mat", "6", "5"],
          ["NLP models learn from repeated contexts", "6", "6"],
        ],
      },
    },
    {
      title: "Heaps' Law in NLP Corpora",
      formula: "|V| = kN^b,\\quad 0 < b < 1",
      bullets: [
        "Vocabulary size grows with corpus size, but sublinearly.",
        "Early in corpus growth, many new words appear quickly.",
        "Later growth adds fewer unseen types per additional token.",
      ],
      note: "This behavior motivates subword methods and scalable vocabulary design.",
    },
    {
      title: "Text Normalization Pipeline",
      subtitle: "Prepare Raw Text for Modeling",
      sections: [
        {
          heading: "Core Steps",
          bullets: [
            "Tokenize text (word/subword/sentence segmentation).",
            "Lowercase (task-dependent), remove noisy symbols, clean markup.",
            "Normalize word forms via stemming or lemmatization.",
          ],
        },
        {
          heading: "Why It Matters",
          bullets: [
            "Reduces noise and redundancy in unstructured text.",
            "Improves downstream feature quality and model robustness.",
          ],
        },
      ],
    },
    {
      title: "Text Preprocessing Techniques (Operational View)",
      table: {
        headers: ["Technique", "Purpose", "Example"],
        rows: [
          ["Remove HTML tags", "Drop markup noise", "<p>Hello</p> -> Hello"],
          ["Remove URLs", "Keep linguistic content only", "visit https://... -> visit"],
          ["Remove punctuation", "Standardize lexical forms", "hello, world! -> hello world"],
          ["Handle chat words/emojis", "Preserve semantic sentiment cues", "gr8 -> great, :) -> positive_emoji"],
          ["Stopword handling", "Reduce weakly informative tokens", "the, is, and"],
        ],
      },
    },
    {
      title: "Tokenization Strategies",
      bullets: [
        "Whitespace tokenization is simple and effective for many scripts.",
        "Character-level tokenization avoids OOV but can lengthen sequences.",
        "Subword tokenization balances vocabulary size and semantic coverage.",
      ],
      table: {
        headers: ["Strategy", "Strength", "Tradeoff"],
        rows: [
          ["Word/space-based", "Human-readable tokens", "Weak on rare/compound words"],
          ["Character-based", "No unknown words", "Very long sequences"],
          ["Subword-based", "Handles rare words and morphology", "Tokenizer training complexity"],
        ],
      },
    },
    {
      title: "Subword Tokenization Algorithms",
      table: {
        headers: ["Algorithm", "Base Idea", "Common Usage"],
        rows: [
          ["BPE", "Merge most frequent adjacent units iteratively", "GPT-family style tokenizers"],
          ["WordPiece", "Likelihood-driven merges", "BERT-family models"],
          ["Unigram LM", "Probabilistic token inventory pruning", "T5/XLNet-style pipelines"],
          ["SentencePiece", "Train on raw text without pre-tokenization", "Multilingual pipelines"],
        ],
      },
      note: "Subword methods control vocabulary growth while preserving useful semantics.",
    },
    {
      title: "Unigram LM Tokenization Example",
      bullets: [
        "Model evaluates multiple candidate segmentations with token probabilities.",
        "Chooses segmentation with highest likelihood for each word context.",
        "EM training updates token probabilities and prunes weak tokens.",
      ],
      table: {
        headers: ["Candidate Tokenization", "Score"],
        rows: [
          ["basket + ball", "0.30"],
          ["basketball", "0.40"],
          ["bask + etball", "0.06"],
        ],
      },
      note: "Highest-probability segmentation is selected in decoding.",
    },
    {
      title: "BPE Training Process",
      bullets: [
        "Start from character-level symbols.",
        "Count adjacent symbol-pair frequencies.",
        "Merge most frequent pair into a new token.",
        "Repeat until target vocabulary size is reached.",
      ],
      table: {
        headers: ["Step", "Operation"],
        rows: [
          ["1", "Initialize symbol inventory"],
          ["2", "Compute pair frequencies"],
          ["3", "Merge best pair"],
          ["4", "Rebuild sequence with merged token and iterate"],
        ],
      },
    },
    {
      title: "Stemming vs Lemmatization",
      table: {
        headers: ["Aspect", "Stemming", "Lemmatization"],
        rows: [
          ["Method", "Rule-based suffix stripping", "Vocabulary + morphology aware normalization"],
          ["Output quality", "May produce non-words (studi)", "Canonical dictionary forms (study)"],
          ["Context sensitivity", "Low", "Higher (POS-aware)"],
          ["Use case", "Fast retrieval/indexing", "Semantically cleaner linguistic analysis"],
        ],
      },
      note: "Choose based on task priority: speed and recall vs linguistic precision.",
    },
    {
      title: "Lemmatization and Morphology Examples",
      bullets: [
        "Verb forms: am/are/is/was/were -> be.",
        "Irregular nouns: mice -> mouse, children -> child.",
        "POS-aware cases: better (adj) -> good, better (verb) -> better.",
      ],
      note: "Lemmatization preserves semantics better than aggressive stemming.",
    },
    {
      title: "Modern NLP Models: From Embeddings to Transformers",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/d/dd/Continuous_Bag_of_Words_model_%28CBOW%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png",
      ],
      bullets: [
        "Distributed embeddings (e.g., CBOW) map words into dense semantic vectors.",
        "Transformers model long-range dependencies via self-attention.",
        "Current NLP systems combine strong preprocessing with large pretrained models.",
      ],
    },
    {
      title: "Transformer Encoder-Decoder Overview",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png",
      ],
      bullets: [
        "Encoder builds contextual token representations from source text.",
        "Decoder generates target tokens autoregressively with attention to encoder states.",
        "Foundation architecture for translation, summarization, and many LLM pipelines.",
      ],
      note: "Attention mechanisms reduce reliance on recurrence for sequence modeling.",
    },
    {
      title: "NLP Tokenization Masterclass",
      subtitle: "From Word Splits to Subword Modeling",
      bullets: [
        "This module focuses on practical tokenization design choices in NLP pipelines.",
        "We compare space-based, character-based, and subword tokenization strategies.",
        "Goal: handle rare words while controlling vocabulary growth.",
      ],
      note: "Tokenization quality strongly affects downstream embedding and model performance.",
    },
    {
      title: "Space-Based vs Subword Tokenization",
      table: {
        headers: ["Method", "How It Splits", "Best Use", "Limitation"],
        rows: [
          ["Whitespace", "Split by spaces", "Simple corpora and fast baselines", "Weak handling of rare/morphologically rich words"],
          ["Character", "Each char is a token", "No OOV failures", "Very long token sequences"],
          ["Subword", "Word pieces learned from corpus", "Modern NLP/LLMs", "Requires tokenizer training and tuning"],
        ],
      },
      note: "Subword tokenization is usually the best compromise for modern production NLP.",
    },
    {
      title: "Subword Algorithms Comparison",
      table: {
        headers: ["Algorithm", "Core Idea", "Needs Pre-tokenization?", "Common Models"],
        rows: [
          ["Unigram LM", "Probabilistic token inventory", "No", "XLNet, T5"],
          ["WordPiece", "Likelihood-based merge scoring", "Yes", "BERT family"],
          ["BPE", "Frequent-pair iterative merges", "Yes", "GPT, RoBERTa style pipelines"],
          ["SentencePiece", "Raw text tokenization framework", "No", "mBART, multilingual setups"],
        ],
      },
    },
    {
      title: "Unigram LM Example: Choosing Best Segmentation",
      body: "Input word: basketball",
      table: {
        headers: ["Candidate Tokenization", "Probability", "Decision"],
        rows: [
          ["basket + ball", "0.30", "Possible"],
          ["basketball", "0.40", "Selected (highest likelihood)"],
          ["bask + etball", "0.06", "Rejected"],
        ],
      },
      bullets: [
        "Unigram LM keeps multiple candidates and scores them probabilistically.",
        "EM training refines token probabilities and prunes weak tokens over time.",
      ],
    },
    {
      title: "BPE Walkthrough: low, lowest, lower",
      table: {
        headers: ["Step", "Action", "Result"],
        rows: [
          ["1", "Start with characters", "l, o, w, e, s, t, r"],
          ["2", "Merge most frequent pair l+o", "lo"],
          ["3", "Merge lo+w", "low"],
          ["4", "Continue frequent merges", "lower, lowest become compact tokens"],
        ],
      },
      note: "BPE repeatedly merges frequent adjacent units until target vocabulary size is reached.",
    },
    {
      title: "BPE Tokenization Inference Example",
      body: "Given sentence: lowered the lowest curtain",
      table: {
        headers: ["Word", "Subword Output"],
        rows: [
          ["lowered", "low + er + ed"],
          ["the", "the"],
          ["lowest", "low + est"],
          ["curtain", "curtain (or further split if unseen)"],
        ],
      },
      bullets: [
        "Subword decomposition reduces out-of-vocabulary failures.",
        "Frequent morphemes become reusable building blocks across words.",
      ],
    },
    {
      title: "Why Subword Tokenization Matters in Practice",
      sections: [
        {
          heading: "Operational Benefits",
          bullets: [
            "Handles rare and unseen words gracefully.",
            "Keeps vocabulary compact without losing compositional meaning.",
            "Improves transfer across domains and noisy user text.",
          ],
        },
        {
          heading: "Bootcamp Takeaway",
          bullets: [
            "Tokenizer choice is a model-design decision, not just preprocessing.",
            "Always validate tokenization behavior on your real domain samples.",
          ],
        },
      ],
    },
    {
      title: "Tokenization Practice Exercise",
      subtitle: "Manual Tokenization Drill",
      body: 'Corpus: "go going gone goals"',
      bullets: [
        'Task: tokenize sentence "the goat is going to the goal" using a subword strategy.',
        "Compare outputs under whitespace, BPE-style merges, and Unigram-style choices.",
        "Discuss which strategy gives better reuse and fewer unknown tokens.",
      ],
      note: "Practice builds intuition for tokenizer behavior before model training.",
    },
    {
      title: "NLP Language Modeling with N-grams",
      subtitle: "From Count-Based Prediction to Evaluation",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Google_Ngram.png",
      ],
      bullets: [
        "Language models estimate probabilities over word sequences.",
        "N-gram models predict the next token from a limited context window.",
        "This module connects N-gram intuition to modern LLM generation.",
      ],
    },
    {
      title: "What Is an N-gram?",
      table: {
        headers: ["Model", "Context Used", "Example Prediction"],
        rows: [
          ["Unigram", "No context", "Predict based on global word frequency"],
          ["Bigram", "Previous 1 word", "P(w_t | w_{t-1})"],
          ["Trigram", "Previous 2 words", "P(w_t | w_{t-2}, w_{t-1})"],
          ["5-gram", "Previous 4 words", "P(w_t | w_{t-4}, ..., w_{t-1})"],
        ],
      },
      note: "Higher n gives richer local context but increases sparsity and data requirements.",
    },
    {
      title: "Why Next-Word Prediction Matters",
      sections: [
        {
          heading: "Classic NLP Uses",
          bullets: [
            "Grammar/spell checking via low-probability sequence detection.",
            "Search auto-complete and query continuation.",
            "Speech recognition disambiguation for phonetically similar outputs.",
          ],
        },
        {
          heading: "Modern Connection",
          bullets: [
            "Autoregressive LLMs generate text by repeated next-token prediction.",
            "The core objective extends N-gram intuition with neural representations.",
          ],
        },
      ],
    },
    {
      title: "Formal Language Modeling Objective",
      formula:
        "P(w_1,\\ldots,w_T)=\\prod_{t=1}^{T} P(w_t \\mid w_1,\\ldots,w_{t-1})",
      bullets: [
        "A language model can score full sentences or predict the next word.",
        "Exact estimation over full histories is intractable for real corpora.",
        "Approximation strategies include N-grams, smoothing, and neural LMs.",
      ],
    },
    {
      title: "Chain Rule and Markov Assumption",
      table: {
        headers: ["Approach", "Assumption", "Tradeoff"],
        rows: [
          ["Full chain rule", "Condition on full history", "Accurate but data/computation heavy"],
          ["1st-order Markov (bigram)", "Condition on previous word only", "Practical but ignores long dependencies"],
          ["(n-1)-order Markov", "Condition on last n-1 words", "Better local context with higher sparsity"],
        ],
      },
      note: "Markov assumptions make count-based language modeling operationally feasible.",
    },
    {
      title: "Unigram vs Bigram Intuition",
      bullets: [
        "Unigram models often generate incoherent sentences due to independence assumptions.",
        "Bigrams and trigrams recover local fluency but still miss distant structure.",
        "Long-distance syntax/semantics motivates neural context modeling.",
      ],
      table: {
        headers: ["Model", "Fluency", "Long-Range Handling"],
        rows: [
          ["Unigram", "Low", "None"],
          ["Bigram", "Moderate local fluency", "Weak"],
          ["Trigram+", "Better local coherence", "Still limited"],
        ],
      },
    },
    {
      title: "Key Weaknesses of N-gram Models",
      table: {
        headers: ["Limitation", "Example", "Impact"],
        rows: [
          ["Long-distance dependency failure", "Subject-verb agreement far apart", "Grammar inconsistencies"],
          ["Sparse exact matching", "Seen 'delicious meal' but not 'tasty dish'", "Poor synonym generalization"],
          ["Data sparsity", "Rare sequences unseen", "Zero probabilities without smoothing"],
        ],
      },
    },
    {
      title: "Why LLMs Outperform N-grams",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg",
      ],
      table: {
        headers: ["Capability", "N-gram", "LLM"],
        rows: [
          ["Context length", "Short fixed window", "Long contextual modeling"],
          ["Semantic understanding", "Exact surface co-occurrence", "Embedding-based representations"],
          ["Synonym/generalization", "Weak", "Strong"],
          ["Novel generation quality", "Limited", "Substantially better"],
        ],
      },
      note: "LLMs replace count tables with learned distributed representations and deep context integration.",
    },
    {
      title: "Estimating N-gram Probabilities (MLE)",
      formula:
        "P(w_t\\mid w_{t-n+1}^{t-1})=\\frac{C(w_{t-n+1}^{t})}{C(w_{t-n+1}^{t-1})}",
      bullets: [
        "Maximum Likelihood Estimation uses corpus frequency counts.",
        "For bigrams: divide count of word pair by count of prefix word.",
        "Simple and interpretable, but brittle for unseen combinations.",
      ],
    },
    {
      title: "Worked Bigram Example",
      body: 'Given counts: C("want to") = 608, C("want") = 927',
      formula: 'P("to"\\mid"want")=\\frac{608}{927}\\approx0.656',
      bullets: [
        'Interpretation: in this corpus, "to" follows "want" about 65.6% of the time.',
        "Count quality depends strongly on corpus domain and size.",
      ],
    },
    {
      title: "Why Use Log Probabilities",
      bullets: [
        "Multiplying many small probabilities causes numerical underflow.",
        "Log transform converts multiplication into stable addition.",
        "Sequence scoring becomes computationally robust and efficient.",
      ],
      table: {
        headers: ["Original Space", "Log Space"],
        rows: [
          ["P = p1 * p2 * ... * pk", "log P = log p1 + log p2 + ... + log pk"],
          ["Very small numbers", "Numerically stable sums"],
        ],
      },
    },
    {
      title: "Evaluating Language Models",
      sections: [
        {
          heading: "Extrinsic Evaluation",
          bullets: [
            "Measure downstream task impact (ASR, MT, etc.).",
            "Most realistic but expensive and slow.",
          ],
        },
        {
          heading: "Intrinsic Evaluation",
          bullets: [
            "Use perplexity on held-out text as a proxy for predictive quality.",
            "Fast model comparison during iteration.",
          ],
        },
      ],
    },
    {
      title: "Perplexity (PP): Interpretation",
      formula:
        "\\mathrm{PP}(W)=P(w_1,\\ldots,w_T)^{-\\frac{1}{T}}=\\exp\\left(-\\frac{1}{T}\\sum_{t=1}^{T}\\log P(w_t\\mid h_t)\\right)",
      bullets: [
        "Perplexity is the average branching uncertainty of the model.",
        "Lower PP means better predictive confidence on unseen text.",
        "Use identical test sets when comparing models.",
      ],
      note: "Raw sentence probabilities are length-sensitive; perplexity normalizes by token count.",
    },
    {
      title: "Perplexity Across N-gram Orders",
      table: {
        headers: ["N-gram Order", "Example PP (WSJ-style)", "Takeaway"],
        rows: [
          ["Unigram", "962", "Very weak due to no context"],
          ["Bigram", "170", "Large improvement with local context"],
          ["Trigram", "109", "Further gain from longer local history"],
        ],
      },
      note: "Increasing n generally lowers PP until sparsity and data limits dominate.",
    },
    {
      title: "Language Modeling Summary and Practice",
      subtitle: "N-gram LM Core Checklist",
      bullets: [
        "Understand chain rule factorization and Markov approximations.",
        "Compute MLE-based N-gram probabilities from counts.",
        "Use log probabilities for stable sequence scoring.",
        "Evaluate with perplexity and compare models on the same test set.",
      ],
      note: "Next step in practice: add smoothing (Laplace/Kneser-Ney) to handle unseen n-grams.",
    },
    {
      title: "NLP Contextualized Embeddings and RNNs",
      subtitle: "From Static Vectors to Context-Aware Sequence Models",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png",
      ],
      bullets: [
        "Contextual embeddings assign different vectors to the same word in different contexts.",
        "This shift improved disambiguation, semantics, and downstream NLP performance.",
        "This module links contextual representation learning with recurrent sequence modeling.",
      ],
    },
    {
      title: "Static vs Contextualized Word Representations",
      table: {
        headers: ["Property", "Static Embeddings (Word2Vec/GloVe)", "Contextualized Embeddings (ELMo/BERT/GPT)"],
        rows: [
          ["Vector per word", "One fixed vector", "Different vectors per context"],
          ["Polysemy handling", "Weak", "Strong"],
          ["Context direction", "Usually local/global corpus only", "Bidirectional or autoregressive sequence context"],
          ["Task transfer", "Moderate", "High with pretraining + fine-tuning"],
        ],
      },
      note: "Contextualization is a core enabler for modern LLM quality.",
    },
    {
      title: "How Contextualized Embeddings Work",
      sections: [
        {
          heading: "Architecture Layers",
          bullets: [
            "Token/base embedding layer maps input ids to dense vectors.",
            "Context encoder layers (often Transformer blocks) enrich each token with sequence context.",
            "Task head uses contextual features for prediction.",
          ],
        },
        {
          heading: "Layer Semantics",
          bullets: [
            "Lower layers capture local syntax/patterns.",
            "Middle layers improve sense disambiguation.",
            "Upper layers capture richer semantics and task-specific signals.",
          ],
        },
      ],
    },
    {
      title: "Impact of Contextual Embeddings on LLMs",
      bullets: [
        "Better understanding of ambiguous queries and nuanced language.",
        "Strong transfer learning via pretrain-then-finetune workflows.",
        "Improved scalability for large vocabularies and unseen contexts.",
      ],
      table: {
        headers: ["Benefit", "Practical Outcome"],
        rows: [
          ["Disambiguation", "Fewer semantic errors in QA/NER/sentiment tasks"],
          ["Transfer learning", "Less task-specific labeled data required"],
          ["Generalization", "Better robustness on new domains"],
        ],
      },
    },
    {
      title: "From Traditional LMs to Recurrent Models",
      bullets: [
        "N-gram models struggle with long-distance dependencies and memory cost.",
        "RNNs process full sequences by propagating hidden state through time.",
        "Shared parameters across time steps keep model size manageable.",
      ],
      note: "RNNs were an important step beyond count-based language modeling.",
    },
    {
      title: "RNN Mechanism and Weight Sharing",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg",
      ],
      bullets: [
        "At time t, the RNN consumes current input and previous hidden state.",
        "The same cell and weights are reused at every time step.",
        "This recurrence captures sequential information in variable-length text.",
      ],
      formula: "h_t = f(W_x x_t + W_h h_{t-1} + b)",
    },
    {
      title: "Common RNN Input/Output Patterns",
      table: {
        headers: ["Pattern", "Mapping", "Example Task"],
        rows: [
          ["One-to-One", "single input -> single output", "basic regression/classification"],
          ["One-to-Many", "single input -> sequence output", "image captioning"],
          ["Many-to-One", "sequence input -> single output", "sentiment classification"],
          ["Many-to-Many", "sequence input -> sequence output", "machine translation"],
        ],
      },
      note: "Sequence-aware patterns are where recurrent models provide clear value.",
    },
    {
      title: "RNN Family: Vanilla, GRU, BiRNN, LSTM",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg",
      ],
      table: {
        headers: ["Model", "Vanishing Gradient Risk", "Key Strength", "Typical Limitation"],
        rows: [
          ["Vanilla RNN", "High", "Simple architecture", "Poor long-range memory"],
          ["GRU", "Lower", "Efficient gating with fewer parameters", "Can still degrade on very long contexts"],
          ["BiRNN", "Medium", "Uses past and future context", "Higher compute and memory"],
          ["LSTM", "Low (relative)", "Strong long-term dependency handling", "Heavier than GRU"],
        ],
      },
    },
    {
      title: "Activation Functions in Recurrent/Deep Models",
      table: {
        headers: ["Activation", "Range", "Typical Use", "Note"],
        rows: [
          ["tanh", "(-1, 1)", "RNN hidden states", "Smooth and zero-centered"],
          ["sigmoid", "(0, 1)", "gates and binary outputs", "Interpretable as probability"],
          ["ReLU", "[0, inf)", "deep feedforward/CNN layers", "Fast but can produce dead units"],
          ["softmax", "(0,1) distribution", "multiclass output layer", "Probabilities sum to 1"],
        ],
      },
    },
    {
      title: "Contextual Embeddings and RNNs Summary",
      bullets: [
        "Contextualized embeddings replaced one-vector-per-word limitations.",
        "RNNs introduced sequence-aware state propagation over time.",
        "GRU/LSTM mitigate gradient issues and improve long-context learning.",
        "These ideas paved the path toward stronger seq2seq and transformer systems.",
      ],
    },
    {
      title: "NLP Seq2Seq for Neural Machine Translation",
      subtitle: "Encoder-Decoder Modeling, Decoding Strategies, and Evaluation",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/3/37/Seq2seq_with_RNN_and_attention_mechanism.gif",
      ],
      bullets: [
        "Seq2Seq maps variable-length input sequences to variable-length outputs.",
        "Encoder-decoder models were foundational for neural machine translation.",
        "This module covers training, decoding, bottlenecks, attention, and metrics.",
      ],
    },
    {
      title: "Seq2Seq Core Architecture (NMT)",
      sections: [
        {
          heading: "Encoder",
          bullets: [
            "Consumes token embeddings and updates hidden states over source sequence.",
            "Final state or state set summarizes source sentence information.",
          ],
        },
        {
          heading: "Decoder",
          bullets: [
            "Starts with <SOS>/<BOS> and generates target tokens autoregressively.",
            "Stops when <EOS> is produced.",
          ],
        },
      ],
      note: "LSTM/GRU were widely used to reduce vanishing/exploding gradient issues in seq2seq.",
    },
    {
      title: "Seq2Seq Step-by-Step Generation",
      table: {
        headers: ["Step", "Decoder Input", "Predicted Output", "Comment"],
        rows: [
          ["1", "<bos>", "I", "Initialization from encoder context"],
          ["2", "I", "saw", "Uses prior token and hidden state"],
          ["3", "saw", "a", "Autoregressive continuation"],
          ["4", "a", "cat", "Context accumulates over steps"],
          ["5", "mat", "<eos>", "Termination token stops decoding"],
        ],
      },
      note: "At each step, the decoder outputs a full vocabulary probability distribution.",
    },
    {
      title: "Training Seq2Seq with Cross-Entropy",
      formula: "\\mathcal{L} = -\\sum_{t=1}^{T} \\log P(y_t^* \\mid y_{<t}, x)",
      bullets: [
        "At each step, compare predicted distribution against the gold next token.",
        "Higher probability on correct token yields lower loss.",
        "Sentence loss is the sum (or mean) across time steps.",
      ],
      table: {
        headers: ["Example p(correct token)", "Loss -log(p)", "Interpretation"],
        rows: [
          ["0.85", "0.16", "Good confident prediction"],
          ["0.05", "3.00", "Poor uncertain/wrong prediction"],
        ],
      },
    },
    {
      title: "Inference: Greedy Decoding vs Beam Search",
      table: {
        headers: ["Method", "Decision Rule", "Strength", "Risk"],
        rows: [
          ["Greedy", "Pick top token each step", "Fast and simple", "May miss globally better sequence"],
          ["Beam Search", "Track top-k hypotheses each step", "Better global sequence quality", "Higher compute; can become generic/bland"],
        ],
      },
      note: "Typical beam sizes are moderate (e.g., 4-10) to balance quality and cost.",
    },
    {
      title: "Information Bottleneck in Basic Seq2Seq",
      bullets: [
        "Compressing a full source sentence into one fixed vector can lose detail.",
        "Longer/complex inputs worsen the bottleneck effect.",
        "Decoder needs different source details at different output steps.",
      ],
      note: "This motivates attention over all encoder hidden states.",
    },
    {
      title: "Attention as the Bottleneck Solution",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png",
      ],
      bullets: [
        "Decoder attends to relevant encoder positions at each generation step.",
        "Dynamic alignment improves translation adequacy and fluency.",
        "Attention laid the foundation for transformer-dominant NMT systems.",
      ],
    },
    {
      title: "NMT Evaluation Metrics: BLEU and ROUGE",
      table: {
        headers: ["Metric", "Orientation", "What It Measures", "Common Limitation"],
        rows: [
          ["BLEU", "Precision-oriented", "n-gram overlap from candidate to reference", "Weak semantic/syntactic sensitivity"],
          ["ROUGE-N", "Recall-oriented", "n-gram overlap from reference to candidate", "Can reward lexical overlap over meaning"],
          ["F1 (with overlap metrics)", "Balance precision/recall", "Harmonic tradeoff view", "Still limited on deep semantics"],
        ],
      },
    },
    {
      title: "BLEU Nuance: Modified Precision",
      bullets: [
        "Raw overlap can over-reward repeated common words.",
        "Modified BLEU caps token matches by reference token counts.",
        "This prevents unrealistic gains from repetition-heavy outputs.",
      ],
      note: 'Example: candidate "I I am I" should not receive full credit for repeated "I".',
    },
    {
      title: "Metric Caveat and Practical Evaluation",
      bullets: [
        "High BLEU/ROUGE does not guarantee semantic correctness.",
        "Use metric scores alongside human or task-specific qualitative checks.",
        "Inspect adequacy, fluency, and faithfulness on representative examples.",
      ],
      note: 'A syntactically broken sentence can still receive non-zero n-gram overlap scores.',
    },
    {
      title: "Seq2Seq and NMT Summary",
      bullets: [
        "Seq2Seq provides a general framework for sequence transduction.",
        "Cross-entropy trains token-level next-step predictions.",
        "Beam search improves sequence-level quality over greedy decoding.",
        "Attention resolves fixed-vector bottlenecks and improves translation performance.",
        "BLEU/ROUGE are useful but should be complemented with semantic evaluation.",
      ],
    },
    {
      title: "Generative AI: Core Concepts",
      subtitle: "BERT, T5, GPT, LLMs, and Attention (Focused Edition)",
      bullets: [
        "This section extracts the most important ideas into a compact teaching flow.",
        "Focus areas: transfer learning, model families, attention mechanics, scaling, and practical deployment.",
        "Designed for bootcamp delivery within roughly 20 slides.",
      ],
    },
    {
      title: "Transfer Learning in Generative AI",
      table: {
        headers: ["Stage", "Data Type", "Goal"],
        rows: [
          ["Pretraining", "Large mostly unlabeled corpora", "Learn general language representations"],
          ["Fine-tuning", "Task-labeled dataset", "Adapt model to specific downstream objective"],
          ["Inference", "User prompt/context", "Generate or classify outputs for real tasks"],
        ],
      },
      note: "Transfer learning reduces labeled data needs and accelerates convergence.",
    },
    {
      title: "Feature-Based Transfer vs Fine-Tuning",
      table: {
        headers: ["Strategy", "What Changes", "Pros", "Tradeoff"],
        rows: [
          ["Feature-based", "Freeze pretrained backbone; use embeddings as input features", "Fast and lightweight", "Less task adaptation"],
          ["Fine-tuning", "Update model weights (often with a task head)", "Higher task performance", "More compute and tuning effort"],
        ],
      },
    },
    {
      title: "BERT: Encoder-Only Bidirectional Understanding",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png",
      ],
      bullets: [
        "BERT learns contextual token representations using both left and right context.",
        "Strong for understanding tasks: classification, NER, QA, and retrieval-oriented use cases.",
        "Pretrained at scale (Wikipedia + BooksCorpus), then adapted to downstream tasks.",
      ],
    },
    {
      title: "BERT Pretraining Objectives",
      table: {
        headers: ["Objective", "How It Works", "What It Teaches"],
        rows: [
          ["MLM (Masked Language Modeling)", "Mask subset of tokens and predict originals", "Bidirectional contextual semantics"],
          ["NSP (Next Sentence Prediction)", "Predict whether sentence B follows sentence A", "Inter-sentence coherence signals"],
        ],
      },
      note: "MLM and NSP were jointly used in original BERT training setup.",
    },
    {
      title: "BERT Special Tokens: [CLS] and [SEP]",
      bullets: [
        "[CLS] is prepended and its final embedding is used as a sequence-level summary.",
        "[SEP] separates sentence segments and marks boundaries.",
        "In classification tasks, [CLS] passes through a lightweight prediction head.",
      ],
      note: "Token design helps unify single- and pair-sentence tasks.",
    },
    {
      title: "Arabic Adaptation Example: AraBERT",
      bullets: [
        "AraBERT follows BERT-base style architecture with Arabic-specific preprocessing.",
        "Segmentation and Arabic-tailored tokenization improve vocabulary coverage.",
        "Domain/language adaptation quality can matter more than raw parameter count.",
      ],
      table: {
        headers: ["Component", "Adaptation Benefit"],
        rows: [
          ["Farasa-style segmentation", "Better handling of prefixes/suffixes and morphology"],
          ["Arabic-focused vocabulary", "Lower fragmentation and stronger lexical coverage"],
          ["Arabic corpus curation", "Improved contextual understanding in target language"],
        ],
      },
    },
    {
      title: "T5: Unified Text-to-Text Framework",
      bullets: [
        "T5 reframes every NLP task as text input -> text output.",
        'Task instruction is included as a prefix (e.g., "summarize:", "translate:").',
        "One shared architecture/training recipe serves multiple tasks.",
      ],
      note: "This design strongly influenced modern prompt-based LLM usage.",
    },
    {
      title: "T5 Pretraining Objective: Span Corruption",
      bullets: [
        "Remove contiguous text spans from input and replace with sentinel tokens.",
        "Train model to reconstruct missing spans autoregressively.",
        "Encourages stronger generative behavior than token-only masking.",
      ],
      table: {
        headers: ["Model", "Corruption Style", "Typical Strength"],
        rows: [
          ["BERT", "Random masked individual tokens", "Language understanding tasks"],
          ["T5", "Contiguous span corruption", "Generation + multitask transfer"],
        ],
      },
    },
    {
      title: "T5 Attention Strategies (Encoder/Decoder)",
      table: {
        headers: ["Attention Type", "Visibility", "Used In"],
        rows: [
          ["Fully visible", "All tokens attend to all tokens", "Encoder representations"],
          ["Causal", "Token attends to past only", "Autoregressive generation"],
          ["Prefix-causal hybrid", "Full source access + causal target decoding", "Seq2Seq decoding in T5"],
        ],
      },
    },
    {
      title: "GPT: Decoder-Only Autoregressive Generation",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg",
      ],
      bullets: [
        "GPT predicts next token from left context only (causal modeling).",
        "Uses masked self-attention in decoder stack for no-lookahead generation.",
        "Excellent for open-ended completion, instruction following, and synthesis.",
      ],
    },
    {
      title: "GPT Evolution and Foundation Model Scale",
      table: {
        headers: ["Generation", "Approx. Parameters", "Key Theme"],
        rows: [
          ["GPT-1", "117M", "Proof of transfer-learning viability"],
          ["GPT-2", "1.5B", "Large-scale web pretraining for generation"],
          ["GPT-3", "175B", "Few-shot in-context capabilities at scale"],
        ],
      },
      note: "Model utility scales with data, architecture, and training compute quality.",
    },
    {
      title: "Attention: Why It Was a Breakthrough",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png",
      ],
      bullets: [
        "Attention solves fixed-vector bottlenecks in sequence transduction.",
        "At each step, model dynamically focuses on most relevant source positions.",
        "Entire mechanism is differentiable and learned end-to-end.",
      ],
    },
    {
      title: "Attention Computation Pipeline",
      bullets: [
        "Compute relevance scores between query state and source states.",
        "Apply softmax to obtain attention weights (probability distribution).",
        "Return weighted sum of value/source states as contextual output.",
      ],
      formula:
        "\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
    },
    {
      title: "Bahdanau vs Luong Attention (Classic RNN Era)",
      table: {
        headers: ["Variant", "Scoring Function", "Typical Placement"],
        rows: [
          ["Luong", "Bilinear/dot-style", "Attention after decoder state update"],
          ["Bahdanau", "MLP/additive score", "Attention integrated before decoder update"],
        ],
      },
      note: "Both approximate alignment; design choice affects speed and accuracy tradeoffs.",
    },
    {
      title: "Self-Attention, Q/K/V, and Multi-Head",
      bullets: [
        "Query asks for relevant context; Key indexes available context; Value carries content.",
        "Self-attention lets each token aggregate information from other tokens in sequence.",
        "Multi-head attention captures different linguistic relations in parallel.",
      ],
      note: "Different heads can specialize in syntax, agreement, locality, or semantics.",
    },
    {
      title: "Masked Self-Attention in Decoders",
      bullets: [
        "Decoder cannot access future tokens during generation.",
        "Causal mask enforces left-to-right consistency and prevents information leakage.",
        "Enables parallel training over full target sequence while preserving autoregressive objective.",
      ],
    },
    {
      title: "Long-Sequence Challenge in Transformers",
      table: {
        headers: ["Bottleneck", "Complexity", "Practical Impact"],
        rows: [
          ["Attention map computation", "O(L^2)", "Time/memory explode as context grows"],
          ["Activation storage (training)", "O(N*L*d_model)", "High VRAM demand for deep long-context models"],
        ],
      },
      note: "Long-context efficiency is now a central LLM engineering topic.",
    },
    {
      title: "Scaling Laws and Compute-Optimal Training",
      bullets: [
        "Performance improves with data, model size, and compute, but with diminishing returns.",
        "Compute-optimal training balances parameter count and token budget.",
        "Chinchilla-style insight: many large models are under-trained relative to their size.",
      ],
      table: {
        headers: ["Principle", "Implication"],
        rows: [
          ["Fixed compute budget", "Tune model size and data volume jointly"],
          ["Data-quality filtering", "Small fraction of tokens may dominate useful learning"],
          ["Chinchilla ratio (rule of thumb)", "Roughly ~20 training tokens per parameter"],
        ],
      },
    },
    {
      title: "Generative AI Practical Takeaways",
      bullets: [
        "Choose architecture by task type: encoder-only, encoder-decoder, or decoder-only.",
        "Prefer transfer learning and fine-tuning over training from scratch when possible.",
        "Use attention-aware designs and decoding strategy (greedy/beam) based on product constraints.",
        "Plan for memory/compute early: quantization, context limits, and deployment targets.",
        "For domain-heavy use cases, adapt with specialized corpora and evaluation protocols.",
      ],
      note: "Strong GenAI systems come from balanced choices across data, architecture, compute, and evaluation.",
    },
  ],
};

function insertSlideBeforeTitle(targetTitle, newSlide) {
  const index = presentationData.slides.findIndex((slide) => slide.title === targetTitle);
  if (index !== -1) {
    presentationData.slides.splice(index, 0, newSlide);
  }
}

function addPresentationStructure() {
  if (presentationData._structureAdded) return;

  presentationData.slides.unshift({
    title: "Course Agenda",
    subtitle: "Main Sections",
    bullets: [
      "Foundations and Data Pre-Processing",
      "Regression Models and Evaluation",
      "Classification Basics (Logistic Regression and K-NN)",
      "Naive Bayes, Decision Trees, and Random Forest",
      "SVM and Kernel Methods",
      "Clustering and PCA",
      "Deep Learning and Neural Networks",
      "Natural Language Processing (NLP)",
      "NLP Advanced Topics",
      "Generative AI Foundations",
    ],
    note: "Use the slide dots below to quickly jump across sections.",
  });

  presentationData.slides.splice(1, 0, {
    title: "Bootcamp Timeline (4 Weeks)",
    subtitle: "Month Plan Overview",
    table: {
      headers: ["Week", "Main Topics", "Output / Milestone"],
      rows: [
        [
          "Week 1",
          "ML foundations, data preprocessing, feature engineering, regression basics",
          "Clean data workflow + baseline regression models",
        ],
        [
          "Week 2",
          "Classification methods, evaluation metrics, Naive Bayes, Trees, Random Forest, SVM",
          "End-to-end classification pipeline and model comparison",
        ],
        [
          "Week 3",
          "Clustering, PCA, deep learning fundamentals, perceptron, activations, CNN/RNN intro",
          "Dimensionality reduction + first neural network experiments",
        ],
        [
          "Week 4",
          "NLP core and advanced topics, Seq2Seq, attention, BERT/T5/GPT/LLMs, transfer learning in GenAI",
          "Mini GenAI project + final presentation readiness",
        ],
      ],
    },
    note: "Suggested pacing: concept session + guided lab + practice task each day.",
  });

  insertSlideBeforeTitle("The Machine Learning Process", {
    type: "section-divider",
    title: "Section 1",
    subtitle: "Foundations and Data Pre-Processing",
  });

  insertSlideBeforeTitle("Regression - Simple Linear Regression", {
    type: "section-divider",
    title: "Section 2",
    subtitle: "Regression Models",
  });

  insertSlideBeforeTitle("Classification Overview", {
    type: "section-divider",
    title: "Section 3",
    subtitle: "Classification Basics",
  });

  insertSlideBeforeTitle("Naive Bayes: Bayes' Theorem", {
    type: "section-divider",
    title: "Section 4",
    subtitle: "Naive Bayes, Trees, and Evaluation",
  });

  insertSlideBeforeTitle("Support Vector Machine (SVM): Core Idea", {
    type: "section-divider",
    title: "Section 5",
    subtitle: "SVM and Kernel Methods",
  });

  insertSlideBeforeTitle("Clustering Overview", {
    type: "section-divider",
    title: "Section 6",
    subtitle: "Clustering and PCA",
  });

  insertSlideBeforeTitle("Deep Learning Overview", {
    type: "section-divider",
    title: "Section 7",
    subtitle: "Deep Learning and Neural Networks",
  });

  insertSlideBeforeTitle("NLP Fundamentals and Challenges", {
    type: "section-divider",
    title: "Section 8",
    subtitle: "Natural Language Processing (NLP)",
  });

  insertSlideBeforeTitle("NLP Tokenization Masterclass", {
    type: "section-divider",
    title: "Section 9",
    subtitle: "NLP Tokenization Workshop",
  });

  insertSlideBeforeTitle("NLP Language Modeling with N-grams", {
    type: "section-divider",
    title: "Section 10",
    subtitle: "NLP Language Modeling",
  });

  insertSlideBeforeTitle("NLP Contextualized Embeddings and RNNs", {
    type: "section-divider",
    title: "Section 11",
    subtitle: "NLP Contextual Embeddings and RNNs",
  });

  insertSlideBeforeTitle("NLP Seq2Seq for Neural Machine Translation", {
    type: "section-divider",
    title: "Section 12",
    subtitle: "NLP Seq2Seq and NMT Evaluation",
  });

  insertSlideBeforeTitle("Generative AI: Core Concepts", {
    type: "section-divider",
    title: "Section 13",
    subtitle: "GenAI: BERT, T5, GPT, Attention",
  });

  presentationData.slides.push({
    title: "Conclusion",
    subtitle: "Key Takeaways",
    bullets: [
      "Good ML pipelines start with strong preprocessing and proper validation.",
      "Model choice depends on data structure, interpretability needs, and scale.",
      "For classification, evaluate with confusion matrix, precision, recall, and F1.",
      "For unsupervised tasks, combine clustering diagnostics with PCA-based interpretation.",
      "For deep learning, balance architecture power with regularization and validation discipline.",
      "For NLP, robust preprocessing and tokenization choices strongly shape model outcomes.",
      "Tokenizer design directly impacts OOV handling, sequence length, and model quality in NLP.",
      "For language modeling, probability estimation quality and perplexity tracking are critical.",
      "For sequence tasks, contextual representations and attention mechanisms are key drivers of quality.",
      "For MT/NLG, combine BLEU and ROUGE with qualitative semantic validation.",
      "For modern GenAI, balance architecture choice, scaling strategy, and compute efficiency.",
      "Use cross-validation and hyperparameter tuning for robust generalization.",
    ],
    note: "Thank you. Questions and discussion are welcome.",
  });

  presentationData._structureAdded = true;
}

const deckTitle = document.getElementById("deck-title");
const slideContainer = document.getElementById("slide-container");
const currentSlideEl = document.getElementById("current-slide");
const totalSlidesEl = document.getElementById("total-slides");
const slideJumpBtn = document.getElementById("slide-jump-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dotsContainer = document.getElementById("dots");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const showTemplateBtn = document.getElementById("show-template-btn");
const templateModal = document.getElementById("template-modal");
const closeTemplateBtn = document.getElementById("close-template-btn");
const templateContentEl = document.getElementById("template-content");
const downloadPdfBtn = document.getElementById("download-pdf-btn");
const printContainer = document.getElementById("print-container");
const sectionLabelEl = document.getElementById("section-label");
const progressFillEl = document.getElementById("progress-fill");

let currentIndex = 0;
const THEME_STORAGE_KEY = "ml-presentation-theme";

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function typesetMath(targetElement) {
  if (!targetElement) return;
  if (!window.MathJax || !window.MathJax.typesetPromise) return;
  window.MathJax.typesetClear([targetElement]);
  window.MathJax.typesetPromise([targetElement]).catch(() => {});
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggleBtn) {
    const isLight = theme === "light";
    if (themeIcon) {
      themeIcon.textContent = isLight ? "☀️" : "🌙";
    }
    if (themeLabel) {
      themeLabel.textContent = isLight ? "الوضع: نهاري" : "الوضع: ليلي";
    }
    themeToggleBtn.setAttribute(
      "aria-label",
      isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري"
    );
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
}

function buildMentorshipTemplateMarkup() {
  const sections = [
    {
      id: "01",
      title: "Program Information",
      rows: [
        ["Program Name", "AI & ML Bootcamp"],
        ["Trainer Name", "Ahmed Alharbi"],
        ["Technical Field", "AI / Machine Learning / NLP / Generative AI"],
        ["Program Duration", "4 Weeks"],
        ["Number of Sessions", "20 Sessions (suggested)"],
        ["Session Duration", "2 Hours per Session"],
      ],
    },
    {
      id: "02",
      title: "Program Description",
      paragraph:
        "This intensive bootcamp provides a structured and practice-driven pathway from core machine learning concepts to modern NLP and Generative AI systems. Participants develop competence in data preprocessing, supervised and unsupervised learning, neural networks, sequence modeling, and transformer-based architectures. The curriculum balances theory with labs and mini-projects to build job-ready technical skills.",
    },
    {
      id: "03",
      title: "Program Objectives",
      bullets: [
        "Build complete ML pipelines from preprocessing to evaluation.",
        "Compare and select models (regression, classification, clustering, deep learning) based on data and constraints.",
        "Implement practical NLP workflows, including tokenization and language modeling basics.",
        "Explain and apply key GenAI concepts (BERT, T5, GPT, Attention) in real scenarios.",
        "Present model results with appropriate metrics and interpretation.",
      ],
    },
    {
      id: "04",
      title: "Target Audience",
      bullets: [
        "University students in Computer Science / IT / Data Science.",
        "Beginners seeking a strong practical foundation in AI and ML.",
        "Junior IT professionals transitioning to data and AI roles.",
      ],
    },
    {
      id: "05",
      title: "Prerequisites",
      bullets: [
        "Basic computer literacy and command-line familiarity.",
        "Introductory Python and data handling knowledge.",
        "Ability to install and run required tools locally.",
      ],
    },
    {
      id: "06",
      title: "Tools and Technical Environment",
      bullets: [
        "Python 3.x, Jupyter Notebook, VS Code/Cursor",
        "NumPy, Pandas, scikit-learn",
        "Matplotlib / Seaborn",
        "TensorFlow or PyTorch (introductory level)",
        "Hugging Face ecosystem for NLP/LLM demos",
        "Git and GitHub for version tracking",
      ],
    },
    {
      id: "07",
      title: "Course Structure (4 Weeks)",
      bullets: [
        "Week 1: Foundations, preprocessing, feature engineering, regression basics",
        "Week 2: Classification methods, metrics, Naive Bayes, Trees, Random Forest, SVM",
        "Week 3: Clustering, PCA, deep learning fundamentals, CNN/RNN intro",
        "Week 4: NLP workflows, Seq2Seq, Attention, BERT/T5/GPT, mini GenAI project",
      ],
    },
    {
      id: "08",
      title: "Topic Deep Dive (Sample)",
      rows: [
        ["Topic Title", "Tokenization for Modern NLP Systems"],
        [
          "Academic Overview",
          "Tokenization is a core representational stage that directly affects model efficiency, out-of-vocabulary behavior, and semantic coverage. Modern NLP systems rely on subword approaches to balance vocabulary size and generalization.",
        ],
        ["Core Theoretical Concepts", "Whitespace tokenization, BPE, WordPiece, Unigram LM, OOV handling"],
        ["Learning Taxonomy Level", "Apply / Analyze"],
        [
          "Relationship to Other Topics",
          "Builds on text preprocessing and supports language modeling, transformers, and generation quality.",
        ],
        ["Real-World Relevance", "Required in NLP engineer, LLM engineer, and AI product roles."],
        [
          "Recommended Teaching Approach",
          "Concept briefing (20m) + guided comparison (20m) + hands-on tokenizer lab (40m).",
        ],
        [
          "Assessment Indicators",
          "Student can justify tokenizer choice and demonstrate tokenization behavior on real samples.",
        ],
        ["Estimated Teaching Time", "1 Session x 2 Hours"],
        ["Key References", "Jurafsky & Martin NLP; SentencePiece docs; Hugging Face tokenizers docs."],
      ],
      bullets: [
        'Learning outcomes: compare tokenization algorithms, diagnose tokenization issues, and select suitable strategy for downstream modeling.',
        'Common misconception 1: "Tokenization is just splitting by spaces." -> Tokenizer design is a model-quality decision.',
        'Common misconception 2: "Any tokenizer works the same." -> Different algorithms affect performance and sequence length.',
      ],
    },
    {
      id: "09",
      title: "Session Plan (Sample)",
      rows: [
        ["Session Number", "01"],
        ["Session Title", "ML Foundations and Data Workflow"],
        ["Key Concepts", "Dataset lifecycle | train/test split | feature scaling"],
        [
          "Content Explanation",
          "Introduce the ML workflow and why preprocessing quality drives downstream performance.",
        ],
        [
          "Practical Lab",
          "Clean a dataset, split data, apply scaling, and compare baseline model behavior.",
        ],
        ["Tools Used", "Python, Pandas, scikit-learn, Jupyter"],
        ["Trainer Notes", "Emphasize data leakage risks and metric selection discipline."],
      ],
    },
    {
      id: "10",
      title: "Practical Labs",
      bullets: [
        "Lab 1: End-to-end preprocessing and baseline regression",
        "Lab 2: Classification benchmark (LogReg vs SVM vs Random Forest)",
        "Lab 3: Clustering + PCA interpretation",
        "Lab 4: NLP tokenization and N-gram language modeling",
        "Lab 5: Mini GenAI workflow with transformer-based model",
      ],
    },
    {
      id: "11",
      title: "Learning Resources",
      rows: [
        ["Recommended Courses", "Fast.ai, DeepLearning.AI, Hugging Face Course"],
        ["Recommended Books", "Hands-On ML (Geron), Deep Learning (Goodfellow), Speech and Language Processing"],
        ["Recommended Channels", "StatQuest, 3Blue1Brown, Hugging Face"],
        ["Official Docs", "scikit-learn.org | pytorch.org / tensorflow.org | huggingface.co/docs"],
      ],
    },
    {
      id: "12",
      title: "Curriculum Improvement Notes",
      paragraph:
        "Capture pacing feedback weekly, identify difficult concepts early, and adjust lab complexity to cohort readiness.",
    },
  ];

  const sectionsHtml = sections
    .map((section) => {
      const rowsHtml = (section.rows || [])
        .map(
          ([label, value]) => `
            <div class="template-row">
              <span class="template-row-label">${escapeHTML(label)}</span>
              <p class="template-row-value">${escapeHTML(value)}</p>
            </div>
          `
        )
        .join("");

      const bulletsHtml = (section.bullets || [])
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("");

      return `
        <article class="template-section">
          <div class="template-section-head">
            <span class="template-section-id">${escapeHTML(section.id)}</span>
            <h3>${escapeHTML(section.title)}</h3>
          </div>
          ${section.paragraph ? `<p class="template-paragraph">${escapeHTML(section.paragraph)}</p>` : ""}
          ${rowsHtml ? `<div class="template-rows">${rowsHtml}</div>` : ""}
          ${bulletsHtml ? `<ul class="template-bullets">${bulletsHtml}</ul>` : ""}
        </article>
      `;
    })
    .join("");

  return `
    <div class="template-meta">
      <span class="template-pill">Curriculum</span>
      <span class="template-meta-text">Training Curriculum Template · Trainer Edition</span>
      <span class="template-pill subtle">Filled Draft</span>
    </div>
    <div class="template-grid">${sectionsHtml}</div>
  `;
}

function openTemplateModal() {
  if (!templateModal || !templateContentEl) return;
  templateContentEl.innerHTML = buildMentorshipTemplateMarkup();
  templateModal.classList.add("is-open");
  templateModal.setAttribute("aria-hidden", "false");
}

function closeTemplateModal() {
  if (!templateModal) return;
  templateModal.classList.remove("is-open");
  templateModal.setAttribute("aria-hidden", "true");
}

function buildTableMarkup(table) {
  if (!table) return "";
  return `
    <div class="table-wrap">
      ${table.title ? `<h3>${escapeHTML(table.title)}</h3>` : ""}
      <table>
        <thead>
          <tr>
            ${(table.headers || [])
              .map((header) => `<th>${escapeHTML(header)}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${(table.rows || [])
            .map(
              (row) =>
                `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getImageSources(slide) {
  if (!slide) return [];
  if (Array.isArray(slide.imageUrls)) return slide.imageUrls;
  if (slide.imageUrl) return [slide.imageUrl];
  return [];
}

function buildMediaBadgeMarkup(slide) {
  const imageSources = getImageSources(slide);
  if (!imageSources.length) return "";

  const hasAnimated = imageSources.some((src) => /\.gif($|\?)/i.test(String(src)));
  const hasStatic = imageSources.some((src) => !/\.gif($|\?)/i.test(String(src)));

  if (hasAnimated && hasStatic) {
    return `
      <span class="media-badge media-badge-static" title="تحتوي الشريحة صور ثابتة">🖼️ صورة ثابتة</span>
      <span class="media-badge media-badge-animated" title="تحتوي الشريحة صور متحركة">🎞️ صورة متحركة</span>
    `;
  }

  if (hasAnimated) {
    return `<span class="media-badge media-badge-animated" title="تحتوي الشريحة صور متحركة">🎞️ صورة متحركة</span>`;
  }

  return `<span class="media-badge media-badge-static" title="تحتوي الشريحة صور ثابتة">🖼️ صورة ثابتة</span>`;
}

function buildSlideMarkup(slide) {
  if (slide.type === "section-divider") {
    return `
      <div class="section-divider-box">
        <p class="section-tag">${escapeHTML(slide.title || "")}</p>
        <h2>${escapeHTML(slide.subtitle || "")}</h2>
      </div>
    `;
  }

  if (slide.type === "three-columns") {
    const columnsHTML = (slide.columns || [])
      .map((col) => {
        const colBullets = (col.bullets || [])
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join("");
        return `
          <article class="step-card">
            <h3>${escapeHTML(col.heading || "")}</h3>
            <ul>${colBullets}</ul>
          </article>
        `;
      })
      .join("");

    const mediaBadgeHTML = buildMediaBadgeMarkup(slide);
    return `
      <h2>${escapeHTML(slide.title)}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}</h2>
      ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(slide.subtitle)}</p>` : ""}
      <div class="steps-grid">${columnsHTML}</div>
    `;
  }

  const bulletsHTML = (slide.bullets || [])
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join("");

  const sectionsHTML = (slide.sections || [])
    .map((section) => {
      const sectionBullets = (section.bullets || [])
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("");
      return `
        <article class="content-card">
          <h3>${escapeHTML(section.heading || "")}</h3>
          ${section.body ? `<p>${escapeHTML(section.body)}</p>` : ""}
          ${section.formula ? `<div class="formula">\\[${escapeHTML(section.formula)}\\]</div>` : ""}
          ${sectionBullets ? `<ul>${sectionBullets}</ul>` : ""}
          ${buildTableMarkup(section.table)}
        </article>
      `;
    })
    .join("");

  const tableHTML = buildTableMarkup(slide.table);
  const tablesHTML = (slide.tables || []).map((table) => buildTableMarkup(table)).join("");
  const imageSources = getImageSources(slide);
  const mediaBadgeHTML = buildMediaBadgeMarkup(slide);
  const imageHTML = imageSources
    .map(
      (src, index) => `
      <figure class="slide-image">
        <img src="${escapeHTML(src)}" alt="${escapeHTML(slide.imageAlt || `slide image ${index + 1}`)}" />
      </figure>
    `
    )
    .join("");

  return `
    <h2>${escapeHTML(slide.title)}${mediaBadgeHTML ? ` <span class="media-badges">${mediaBadgeHTML}</span>` : ""}</h2>
    ${slide.subtitle ? `<p class="slide-subtitle">${escapeHTML(slide.subtitle)}</p>` : ""}
    ${slide.body ? `<p class="slide-body">${escapeHTML(slide.body)}</p>` : ""}
    ${slide.formula ? `<div class="formula">\\[${escapeHTML(slide.formula)}\\]</div>` : ""}
    ${imageHTML}
    ${bulletsHTML ? `<ul>${bulletsHTML}</ul>` : ""}
    ${sectionsHTML ? `<div class="content-sections">${sectionsHTML}</div>` : ""}
    ${tableHTML}
    ${tablesHTML}
    ${slide.note ? `<p class="note-box">${escapeHTML(slide.note)}</p>` : ""}
  `;
}

function getActiveSectionLabel(slideIndex) {
  const allSlides = presentationData.slides;
  for (let i = slideIndex; i >= 0; i -= 1) {
    const slide = allSlides[i];
    if (slide && slide.type === "section-divider") {
      return slide.subtitle || slide.title || "Overview";
    }
  }
  return "Overview";
}

function renderPrintDeck() {
  const allSlidesHTML = presentationData.slides
    .map((slide) => {
      return `<section class="slide print-slide">${buildSlideMarkup(slide)}</section>`;
    })
    .join("");

  printContainer.innerHTML = allSlidesHTML;
  typesetMath(printContainer);
}

function renderSlide() {
  const slide = presentationData.slides[currentIndex];
  slideContainer.classList.add("is-entering");
  slideContainer.innerHTML = buildSlideMarkup(slide);
  requestAnimationFrame(() => {
    slideContainer.classList.remove("is-entering");
  });
  typesetMath(slideContainer);

  currentSlideEl.textContent = String(currentIndex + 1);
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === presentationData.slides.length - 1;

  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  const progressPercent = Math.round(((currentIndex + 1) / presentationData.slides.length) * 100);
  if (progressFillEl) {
    progressFillEl.style.width = `${progressPercent}%`;
    const track = progressFillEl.parentElement;
    if (track) track.setAttribute("aria-valuenow", String(progressPercent));
  }
  if (sectionLabelEl) {
    sectionLabelEl.textContent = getActiveSectionLabel(currentIndex);
  }
}

function buildDots() {
  dotsContainer.innerHTML = "";
  presentationData.slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `اذهب للشريحة ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      renderSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function goNext() {
  if (currentIndex < presentationData.slides.length - 1) {
    currentIndex += 1;
    renderSlide();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderSlide();
  }
}

function goToSlideByNumber() {
  const total = presentationData.slides.length;
  const input = window.prompt(`اكتب رقم الشريحة (1 - ${total})`, String(currentIndex + 1));
  if (input === null) return;

  const target = Number.parseInt(input.trim(), 10);
  if (Number.isNaN(target) || target < 1 || target > total) {
    window.alert(`رقم غير صحيح. اختر رقم بين 1 و ${total}.`);
    return;
  }

  currentIndex = target - 1;
  renderSlide();
}

function init() {
  addPresentationStructure();
  applyTheme(loadSavedTheme());
  deckTitle.textContent = presentationData.title;
  totalSlidesEl.textContent = String(presentationData.slides.length);
  buildDots();
  renderSlide();

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
  if (slideJumpBtn) {
    slideJumpBtn.addEventListener("click", goToSlideByNumber);
  }
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  if (showTemplateBtn) {
    showTemplateBtn.addEventListener("click", openTemplateModal);
  }
  if (closeTemplateBtn) {
    closeTemplateBtn.addEventListener("click", closeTemplateModal);
  }
  if (templateModal) {
    templateModal.addEventListener("click", (event) => {
      if (event.target === templateModal) {
        closeTemplateModal();
      }
    });
  }
  downloadPdfBtn.addEventListener("click", () => {
    renderPrintDeck();
    window.print();
  });

  window.addEventListener("beforeprint", renderPrintDeck);
  window.addEventListener("afterprint", () => {
    printContainer.innerHTML = "";
  });
  window.addEventListener("load", () => {
    typesetMath(slideContainer);
  });

  document.addEventListener("keydown", (event) => {
    if (templateModal && templateModal.classList.contains("is-open")) {
      if (event.key === "Escape") {
        closeTemplateModal();
      }
      return;
    }
    if (event.key === "ArrowRight") {
      goNext();
    }
    if (event.key === "ArrowLeft") {
      goPrev();
    }
  });
}

init();
