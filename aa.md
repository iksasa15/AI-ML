<style>
/* إعدادات الصفحة بالعرض وتنسيق الخطوط */
@page {
    size: A4 landscape;
    margin: 1.5cm;
}

body {
    font-family: 'Cairo', sans-serif;
    color: #333;
    font-size: 16pt;
    line-height: 1.7;
}

h1 {
    text-align: center;
    font-size: 34pt;
    color: #1a1a1a;
    margin-bottom: 20px;
}

h2 {
    font-size: 28pt;
    color: #007aff;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 16px;
}

h3 {
    font-size: 22pt;
    color: #555;
    margin-bottom: 14px;
}

p,
li {
    font-size: 16pt;
}

ul,
ol {
    margin-top: 8px;
    margin-bottom: 14px;
}

/* سلايد كامل في صفحة واحدة */
.slide-page {
    page-break-inside: avoid;
    break-inside: avoid-page;
}

.slide-page h2 {
    margin-top: 0;
}

.slide-page img {
    display: block;
    max-width: 62%;
    max-height: 6.8cm;
    margin: 8px auto 12px;
}

.slide-page h3 {
    margin-top: 8px;
    margin-bottom: 8px;
}

.slide-page ul {
    margin-top: 4px;
    margin-bottom: 10px;
}

/* تنسيق الجدول ليمتد على كامل عرض الصفحة */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th {
    background-color: #f9f9f9;
    padding: 15px;
    text-align: left;
    font-size: 15pt;
    border: 1px solid #eee;
}

td {
    padding: 20px;
    vertical-align: top;
    border: 1px solid #eee;
    font-size: 14pt;
}

/* إخفاء أي ظلال أو زخرفة زائدة */
* {
    box-shadow: none !important;
}
</style>

# Machine Learning Course

## Slide 1: The Machine Learning Process

### The 3 Main Steps



| **Step 1: Data Pre-Processing** | **Step 2: Modelling** | **Step 3: Evaluation** |
|:--|:--|:--|
| 1. Import the data<br>2. Clean the data<br>3. Split into training and test sets<br>4. Feature scaling | 1. Build the model<br>2. Train the model<br>3. Make predictions | 1. Calculate performance metrics<br>2. Make a final prediction |

<div style="page-break-before: always;"></div>

<div class="slide-page">

## Slide 2: Training Set & Test Set

![Training Set & Test Set](https://miro.medium.com/v2/resize:fit:1160/format:webp/1*OECM6SWmlhVzebmSuvMtBg.png)

### Key Idea

- **Training Set:** Data used by the model to learn patterns.
- **Test Set:** New, unseen data used to check model performance.

### Teaching Note

- We train on one part of the data, then test on another part to make sure the model generalizes well.

</div>

<div style="page-break-before: always;"></div>

<div class="slide-page">

## Slide 3: Feature Scaling

### What is Feature Scaling?

Feature scaling means adjusting feature values to a similar range using methods like:
- **Standardization**
- **Normalization**

### Why do we use it?

- It prevents large-value features from dominating smaller-value features.
- It improves performance for distance-based and gradient-based algorithms (e.g., KNN, SVM, Gradient Descent).
- It helps training converge faster.

### Example (Before vs After Scaling)

| Student | Height (cm) - Before | Weight (kg) - Before | Height (Scaled) | Weight (Scaled) |
|:--|--:|--:|--:|--:|
| A | 150 | 50 | 0.25 | 0.22 |
| B | 170 | 70 | 0.58 | 0.67 |
| C | 185 | 85 | 0.83 | 1.00 |

- Before scaling, height and weight have different numeric ranges.
- After scaling, both features are on a comparable scale and contribute more fairly.

</div>

<div style="page-break-before: always;"></div>

<div class="slide-page">

## Slide 4: Feature Scaling Methods

### 1) Normalization (Min-Max Scaling)

Normalization transforms each value to a range between **0 and 1**.

$$
x_{\text{norm}} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}
$$

**When to use it:**
- Useful for models that depend on distances or absolute magnitudes.
- Common choice for algorithms such as **KNN** and **K-Means**.

---

### 2) Standardization (Z-score Scaling)

Standardization centers data around **0** with a standard deviation of **1**.

$$
z = \frac{x - \mu}{\sigma}
$$

Where:
- $\mu$ = mean of the feature
- $\sigma$ = standard deviation of the feature

**When to use it:**
- Preferred when features are close to a Gaussian distribution.
- Works well with models like **Logistic Regression**, **SVM**, and **Linear Regression**.

</div>
