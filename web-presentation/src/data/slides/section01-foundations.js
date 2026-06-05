/** Auto-split from presentationData — section01-foundations */
export const slides = [
    {
      "title": "The Machine Learning Process",
      "subtitle": "The 3 Main Steps",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/a/a4/Machine_learning_workflow_diagram.png"
      ],
      "type": "three-columns",
      "columns": [
        {
          "heading": "Step 1: Data Pre-Processing",
          "bullets": [
            "Import the data",
            "Clean the data",
            "Split into training and test sets",
            "Feature scaling"
          ]
        },
        {
          "heading": "Step 2: Modelling",
          "bullets": [
            "Build the model",
            "Train the model",
            "Make predictions"
          ]
        },
        {
          "heading": "Step 3: Evaluation",
          "bullets": [
            "Calculate performance metrics",
            "Make a final prediction"
          ]
        }
      ],
      "speakerNote": "Walk through \"The Machine Learning Process\" column by column (Step 1: Data Pre-Processing and Step 2: Modelling). Keep pace — one minute per column unless discussion heats up."
    },
    {
      "title": "Training Set & Test Set",
      "subtitle": "Key Idea",
      "imageUrl": "https://miro.medium.com/v2/resize:fit:1160/format:webp/1*OECM6SWmlhVzebmSuvMtBg.png",
      "imageAlt": "Training Set and Test Set",
      "bullets": [
        "Training Set: Data used by the model to learn patterns.",
        "Test Set: New, unseen data used to check model performance."
      ],
      "note": "We train on one part of the data, then test on another part to make sure the model generalizes well.",
      "speakerNote": "We train on one part of the data, then test on another part to make sure the model generalizes well."
    },
    {
      "title": "Feature Scaling",
      "subtitle": "What is Feature Scaling?",
      "body": "Feature scaling means adjusting feature values to a similar range using methods like standardization and normalization.",
      "bullets": [
        "It prevents large-value features from dominating smaller-value features.",
        "It improves performance for distance-based and gradient-based algorithms (e.g., KNN, SVM, Gradient Descent).",
        "It helps training converge faster."
      ],
      "table": {
        "title": "Example (Before vs After Scaling)",
        "headers": [
          "Student",
          "Height (cm) - Before",
          "Weight (kg) - Before",
          "Height (Scaled)",
          "Weight (Scaled)"
        ],
        "rows": [
          [
            "A",
            "150",
            "50",
            "0.25",
            "0.22"
          ],
          [
            "B",
            "170",
            "70",
            "0.58",
            "0.67"
          ],
          [
            "C",
            "185",
            "85",
            "0.83",
            "1.00"
          ]
        ]
      },
      "note": "Before scaling, height and weight have different numeric ranges. After scaling, both features are on a comparable scale and contribute more fairly.",
      "speakerNote": "Before scaling, height and weight have different numeric ranges. After scaling, both features are on a comparable scale and contribute more fairly."
    },
    {
      "title": "Feature Scaling Methods",
      "sections": [
        {
          "heading": "1) Normalization (Min-Max Scaling)",
          "body": "Normalization transforms each value to a range between 0 and 1.",
          "formula": "x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
          "bullets": [
            "Useful for models that depend on distances or absolute magnitudes.",
            "Common choice for algorithms such as KNN and K-Means."
          ]
        },
        {
          "heading": "2) Standardization (Z-score Scaling)",
          "body": "Standardization centers data around 0 with a standard deviation of 1.",
          "formula": "z = \\frac{x - \\mu}{\\sigma}",
          "bullets": [
            "mu = mean of the feature, sigma = standard deviation of the feature.",
            "Preferred when features are close to a Gaussian distribution.",
            "Works well with Logistic Regression, SVM, and Linear Regression."
          ]
        }
      ],
      "speakerNote": "Present \"Feature Scaling Methods\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "Choosing the Right Scaling Method",
      "sections": [
        {
          "heading": "Normalization",
          "body": "Use Normalization when feature values have very different ranges and you want all values mapped to [0, 1].",
          "bullets": [
            "Typical method: Min-Max Scaling.",
            "Good for distance-based models where magnitude differences strongly affect results."
          ]
        },
        {
          "heading": "Standardization",
          "body": "Use Standardization when features are expected to follow (or be close to) a Gaussian distribution, or when the dataset contains outliers.",
          "bullets": [
            "It keeps the data centered around 0 and scales variability to 1.",
            "Often preferred for linear models and optimization-based algorithms."
          ]
        }
      ],
      "speakerNote": "Present \"Choosing the Right Scaling Method\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "Feature Scaling Example (Normalization)",
      "body": "Given feature values: [20, 40, 60, 80, 100]",
      "formula": "x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
      "bullets": [
        "x_min = 20",
        "x_max = 100"
      ],
      "table": {
        "title": "Before vs After Normalization",
        "headers": [
          "Original Value (x)",
          "Normalized Value (x_norm)"
        ],
        "rows": [
          [
            "20",
            "0.00"
          ],
          [
            "40",
            "0.25"
          ],
          [
            "60",
            "0.50"
          ],
          [
            "80",
            "0.75"
          ],
          [
            "100",
            "1.00"
          ]
        ]
      },
      "note": "This table shows how all values are scaled to the range [0, 1].",
      "speakerNote": "This table shows how all values are scaled to the range [0, 1]."
    },
    {
      "title": "Feature Scaling Example (Standardization)",
      "body": "Given feature values: [20, 40, 60, 80, 100]",
      "formula": "z = \\frac{x - \\mu}{\\sigma}",
      "bullets": [
        "Mean: \\(\\mu = 60\\)",
        "Standard deviation: \\(\\sigma = 28.28\\)"
      ],
      "table": {
        "title": "Before vs After Standardization",
        "headers": [
          "Original Value (x)",
          "Standardized Value (z)"
        ],
        "rows": [
          [
            "20",
            "-1.41"
          ],
          [
            "40",
            "-0.71"
          ],
          [
            "60",
            "0.00"
          ],
          [
            "80",
            "0.71"
          ],
          [
            "100",
            "1.41"
          ]
        ]
      },
      "note": "This table shows that standardized values are centered around 0 and measured in units of standard deviation.",
      "speakerNote": "This table shows that standardized values are centered around 0 and measured in units of standard deviation."
    },
    {
      "title": "Categorical Data",
      "subtitle": "What is Categorical Data?",
      "body": "Categorical data describes values that belong to named groups rather than continuous numbers.",
      "table": {
        "title": "Category Types",
        "headers": [
          "Type",
          "Description",
          "Example"
        ],
        "rows": [
          [
            "Ordinal",
            "Categories have a meaningful order.",
            "Education Level: High School < Bachelor's < Master's < PhD"
          ],
          [
            "Nominal",
            "Categories have no natural order.",
            "Payment Method: Cash, Card, Bank Transfer"
          ]
        ]
      },
      "note": "Most machine learning algorithms work with numerical inputs only, so categorical values must be converted into numbers.",
      "tables": [
        {
          "title": "Example 1: Label Encoding",
          "headers": [
            "Raw Category",
            "Encoded Value"
          ],
          "rows": [
            [
              "Cash",
              "0"
            ],
            [
              "Card",
              "1"
            ],
            [
              "Bank Transfer",
              "2"
            ]
          ]
        },
        {
          "title": "Example 2: One-Hot Encoding",
          "headers": [
            "Raw Category",
            "Cash",
            "Card",
            "Bank Transfer"
          ],
          "rows": [
            [
              "Cash",
              "1",
              "0",
              "0"
            ],
            [
              "Card",
              "0",
              "1",
              "0"
            ],
            [
              "Bank Transfer",
              "0",
              "0",
              "1"
            ]
          ]
        }
      ],
      "speakerNote": "Most machine learning algorithms work with numerical inputs only, so categorical values must be converted into numbers."
    },
    {
      "title": "How to Deal with Categorical Data (Ordinal Encoding)",
      "subtitle": "What is Ordinal Encoding?",
      "body": "Ordinal Encoding converts ordered categories into integers that preserve their ranking.",
      "bullets": [
        "Use Ordinal Encoding only when categories have a true order.",
        "Step 1: Identify the correct category order.",
        "Step 2: Assign an integer to each level based on that order.",
        "Step 3: Replace the original text values with encoded numbers."
      ],
      "table": {
        "title": "Example",
        "headers": [
          "Satisfaction Level",
          "Encoded Value"
        ],
        "rows": [
          [
            "Low",
            "1"
          ],
          [
            "Medium",
            "2"
          ],
          [
            "High",
            "3"
          ]
        ]
      },
      "note": "This method keeps the order information, which is important for many machine learning models.",
      "speakerNote": "This method keeps the order information, which is important for many machine learning models."
    },
    {
      "title": "How to Deal with Categorical Data (One-Hot Encoding)",
      "subtitle": "What is One-Hot Encoding?",
      "body": "One-Hot Encoding converts each category into a separate binary column (0 or 1).",
      "bullets": [
        "Use One-Hot Encoding for nominal categories (no natural order).",
        "Step 1: List all unique categories.",
        "Step 2: Create one column for each category.",
        "Step 3: Put 1 in the matching category column and 0 in all others."
      ],
      "table": {
        "title": "Example",
        "headers": [
          "Payment Method",
          "Cash",
          "Card",
          "Bank Transfer"
        ],
        "rows": [
          [
            "Cash",
            "1",
            "0",
            "0"
          ],
          [
            "Card",
            "0",
            "1",
            "0"
          ],
          [
            "Bank Transfer",
            "0",
            "0",
            "1"
          ]
        ]
      },
      "note": "This method avoids creating a false ranking between categories.",
      "speakerNote": "This method avoids creating a false ranking between categories."
    },
    {
      "title": "How to Deal with Categorical Data (Dummy Encoding)",
      "subtitle": "What is Dummy Encoding?",
      "body": "Dummy Encoding is similar to One-Hot Encoding, but it removes one category column to avoid redundancy.",
      "bullets": [
        "It helps prevent the dummy variable trap (perfect multicollinearity), especially in linear models.",
        "Step 1: Start with One-Hot encoded columns.",
        "Step 2: Drop one category as a reference (baseline).",
        "Step 3: Keep the remaining binary columns.",
        "Original categories: Payment Method = [Cash, Card, Bank Transfer].",
        "Reference category (dropped): Cash."
      ],
      "table": {
        "title": "Example",
        "headers": [
          "Payment Method",
          "Card",
          "Bank Transfer"
        ],
        "rows": [
          [
            "Cash",
            "0",
            "0"
          ],
          [
            "Card",
            "1",
            "0"
          ],
          [
            "Bank Transfer",
            "0",
            "1"
          ]
        ]
      },
      "note": "In this setup, Cash is represented when all remaining columns are 0.",
      "speakerNote": "In this setup, Cash is represented when all remaining columns are 0."
    },
    {
      "title": "How to Deal with Categorical Data (Other Encoding Types)",
      "body": "Besides Ordinal, One-Hot, and Dummy Encoding, there are other useful methods.",
      "table": {
        "title": "Encoding Methods Overview",
        "headers": [
          "Encoding Type",
          "Idea",
          "Best Use Case"
        ],
        "rows": [
          [
            "Frequency Encoding",
            "Replace each category with how often it appears.",
            "Large datasets with many categories"
          ],
          [
            "Count Encoding",
            "Similar to frequency, but uses raw counts directly.",
            "Tree-based models with high-cardinality features"
          ],
          [
            "Target Encoding",
            "Replace category with target mean for that category.",
            "Supervised tasks (use with care to avoid leakage)"
          ],
          [
            "Binary Encoding",
            "Convert category index to binary digits across columns.",
            "High-cardinality data with fewer columns than one-hot"
          ],
          [
            "Hash Encoding",
            "Use a hash function to map categories into fixed columns.",
            "Very large and dynamic category sets"
          ]
        ]
      },
      "tables": [
        {
          "title": "1) Frequency Encoding (City)",
          "headers": [
            "City",
            "Frequency"
          ],
          "rows": [
            [
              "Riyadh",
              "0.50"
            ],
            [
              "Jeddah",
              "0.33"
            ],
            [
              "Dammam",
              "0.17"
            ]
          ]
        },
        {
          "title": "2) Count Encoding (City)",
          "headers": [
            "City",
            "Count"
          ],
          "rows": [
            [
              "Riyadh",
              "3"
            ],
            [
              "Jeddah",
              "2"
            ],
            [
              "Dammam",
              "1"
            ]
          ]
        },
        {
          "title": "3) Target Encoding (City)",
          "headers": [
            "City",
            "Mean Target"
          ],
          "rows": [
            [
              "Riyadh",
              "0.80"
            ],
            [
              "Jeddah",
              "0.40"
            ],
            [
              "Dammam",
              "0.20"
            ]
          ]
        },
        {
          "title": "4) Binary Encoding (City)",
          "headers": [
            "City",
            "Category ID",
            "Binary Code"
          ],
          "rows": [
            [
              "Riyadh",
              "1",
              "01"
            ],
            [
              "Jeddah",
              "2",
              "10"
            ],
            [
              "Dammam",
              "3",
              "11"
            ]
          ]
        },
        {
          "title": "5) Hash Encoding (4 Buckets)",
          "headers": [
            "City",
            "Hash Bucket"
          ],
          "rows": [
            [
              "Riyadh",
              "2"
            ],
            [
              "Jeddah",
              "0"
            ],
            [
              "Dammam",
              "3"
            ]
          ]
        }
      ],
      "note": "Choose the encoding method based on category order, cardinality, model type, and risk of data leakage.",
      "speakerNote": "Choose the encoding method based on category order, cardinality, model type, and risk of data leakage."
    },
    {
      "title": "Handling Missing Data",
      "subtitle": "What is Missing Data?",
      "body": "Missing data refers to values that are absent or incomplete in one or more features of a dataset.",
      "table": {
        "title": "Types of Missing Data",
        "headers": [
          "Type",
          "Meaning"
        ],
        "rows": [
          [
            "MCAR (Missing Completely at Random)",
            "Missingness happens randomly and is unrelated to any variable in the dataset."
          ],
          [
            "MAR (Missing at Random)",
            "Missingness depends on other observed variables, but not on the missing value itself."
          ],
          [
            "NMAR (Not Missing at Random)",
            "Missingness depends on the missing value itself or unobserved factors."
          ]
        ]
      },
      "bullets": [
        "It can introduce bias into model training.",
        "It may reduce prediction accuracy.",
        "It can cause errors in analysis if not handled properly."
      ],
      "speakerNote": "Cover \"Handling Missing Data\". Emphasize: It can introduce bias into model training.; then It may reduce prediction accuracy.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Handling Missing Data - Why Do We Have Missing Data?",
      "body": "Missing values can appear for many practical reasons during data collection and processing.",
      "table": {
        "title": "Common Causes",
        "headers": [
          "Cause",
          "Description",
          "Example"
        ],
        "rows": [
          [
            "Human Error",
            "Data is skipped, entered incorrectly, or forgotten.",
            "A user leaves the Age field empty in a form."
          ],
          [
            "Device/Sensor Failure",
            "Measurement tools fail or disconnect.",
            "A medical sensor stops recording heart rate temporarily."
          ],
          [
            "Data Integration Issues",
            "Missing fields appear when combining data from multiple sources.",
            "One database has salary, another does not."
          ],
          [
            "Privacy or Refusal",
            "Participants choose not to share sensitive information.",
            "A customer does not provide income details."
          ],
          [
            "System/Transmission Errors",
            "Data is lost during storage, transfer, or export.",
            "Network interruption causes missing rows in logs."
          ],
          [
            "Conditional Missingness",
            "Some fields are only relevant for specific groups.",
            "Pregnancy_Status is empty for male patients."
          ]
        ]
      },
      "note": "Understanding why data is missing helps us choose the right treatment method (deletion, imputation, or advanced modeling).",
      "speakerNote": "Understanding why data is missing helps us choose the right treatment method (deletion, imputation, or advanced modeling)."
    },
    {
      "title": "Handling Missing Data - MCAR",
      "subtitle": "Missing Completely at Random (MCAR)",
      "body": "MCAR means missing values occur randomly and are independent of both observed and unobserved variables.",
      "bullets": [
        "MCAR has no systematic pattern.",
        "In practice, MCAR is often an unrealistic assumption in real-world datasets.",
        "Before assuming MCAR, review data collection workflow and consult domain experts.",
        "If MCAR is reasonable, simple imputation (mean/median/mode) can work."
      ],
      "table": {
        "title": "Illustrative Data Example",
        "headers": [
          "Student ID",
          "Age",
          "Score"
        ],
        "rows": [
          [
            "101",
            "20",
            "85"
          ],
          [
            "102",
            "Missing",
            "88"
          ],
          [
            "103",
            "21",
            "Missing"
          ],
          [
            "104",
            "23",
            "91"
          ],
          [
            "105",
            "Missing",
            "76"
          ],
          [
            "106",
            "22",
            "Missing"
          ]
        ]
      },
      "note": "Missing values appear across different rows and columns with no clear pattern, which is consistent with MCAR.",
      "speakerNote": "Missing values appear across different rows and columns with no clear pattern, which is consistent with MCAR."
    },
    {
      "title": "Handling Missing Data - MAR",
      "subtitle": "Missing at Random (MAR)",
      "body": "MAR means missingness is related to observed features in the dataset, but not to the missing feature itself.",
      "table": {
        "title": "Example (Table)",
        "headers": [
          "Student",
          "Grade (Observed)",
          "Study Hours"
        ],
        "rows": [
          [
            "1",
            "95",
            "Missing"
          ],
          [
            "2",
            "92",
            "Missing"
          ],
          [
            "3",
            "88",
            "4"
          ],
          [
            "4",
            "75",
            "6"
          ],
          [
            "5",
            "70",
            "7"
          ]
        ]
      },
      "sections": [
        {
          "heading": "Imputation Techniques for MAR",
          "table": {
            "headers": [
              "Method",
              "Idea",
              "Why It Works for MAR"
            ],
            "rows": [
              [
                "kNN Imputation",
                "Fills missing values using the nearest similar records.",
                "Uses observed features to find similar patterns."
              ],
              [
                "MissForest",
                "Uses random-forest models iteratively to predict missing values.",
                "Captures non-linear relationships from observed data effectively."
              ]
            ]
          }
        },
        {
          "heading": "Example: kNN Imputation (k = 2)",
          "body": "For student C, the two nearest students based on Grade and Attendance are A and B.",
          "formula": "\\text{Study Hours}_C = \\frac{8 + 7}{2} = 7.5",
          "table": {
            "headers": [
              "Student",
              "Grade",
              "Attendance (%)",
              "Study Hours"
            ],
            "rows": [
              [
                "A",
                "90",
                "95",
                "8"
              ],
              [
                "B",
                "88",
                "92",
                "7"
              ],
              [
                "C",
                "91",
                "96",
                "Missing"
              ],
              [
                "D",
                "70",
                "75",
                "3"
              ]
            ]
          }
        },
        {
          "heading": "Example: MissForest",
          "body": "MissForest trains a Random Forest model using known rows to predict the missing value for student C.",
          "formula": "\\text{Study Hours}_C \\approx 7.6"
        }
      ],
      "note": "MAR is common in practice because missingness can often be explained by available variables.",
      "speakerNote": "MAR is common in practice because missingness can often be explained by available variables."
    },
    {
      "title": "Handling Missing Data - MNAR",
      "subtitle": "Missing Not at Random (MNAR)",
      "body": "MNAR is usually the most complex type because missingness depends on the missing value itself or unobserved variables.",
      "bullets": [
        "Standard imputation can be unreliable without additional data or strong domain assumptions.",
        "MNAR has a systematic pattern tied to hidden information."
      ],
      "table": {
        "title": "Example (Table)",
        "headers": [
          "Participant",
          "Reported Stress Level"
        ],
        "rows": [
          [
            "1",
            "2"
          ],
          [
            "2",
            "Missing"
          ],
          [
            "3",
            "3"
          ],
          [
            "4",
            "Missing"
          ],
          [
            "5",
            "1"
          ]
        ]
      },
      "tables": [
        {
          "title": "Practical Tip: Preserve Missingness Pattern",
          "headers": [
            "Participant",
            "Stress (Imputed)",
            "Stress_Was_Missing"
          ],
          "rows": [
            [
              "1",
              "2.0",
              "0"
            ],
            [
              "2",
              "4.1",
              "1"
            ],
            [
              "3",
              "3.0",
              "0"
            ],
            [
              "4",
              "4.3",
              "1"
            ],
            [
              "5",
              "1.0",
              "0"
            ]
          ]
        }
      ],
      "speakerNote": "Cover \"Handling Missing Data - MNAR\". Emphasize: Standard imputation can be unreliable without additional data or strong domain assumptions.; then MNAR has a systematic pattern tied to hidden information.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Data Preprocessing Template",
      "subtitle": "Standard Workflow",
      "bullets": [
        "Load the dataset.",
        "Detect and handle missing values.",
        "Encode categorical features into numerical form.",
        "Split the dataset into training and test sets.",
        "Scale numerical features when needed."
      ],
      "note": "Pipeline: Raw Data -> Missing Data Treatment -> Categorical Encoding -> Train/Test Split -> Feature Scaling -> ML Model.",
      "speakerNote": "Pipeline: Raw Data -> Missing Data Treatment -> Categorical Encoding -> Train/Test Split -> Feature Scaling -> ML Model."
    }
  ];
