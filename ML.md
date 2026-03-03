---
marp: true
theme: uncover
paginate: true
math: mathjax
backgroundColor: #6C63FF
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    direction: ltr;
    display: flex;
    flex-direction: column;
    padding: 40px;
  }

  h1 { 
    color: #ffffff; 
    font-size: 38px; 
    margin: 0;
    text-align: left;
    align-self: flex-start;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    flex-grow: 1;
    width: 100%;
  }

  .main-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    width: 32%;
    text-align: left;
    min-height: 340px;
    display: flex;
    flex-direction: column;
  }

  .main-card h3 {
    color: #A5FFD6;
    font-size: 24px;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 10px;
  }

  .main-card ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .main-card li {
    font-size: 20px;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .main-card li::before {
    content: "→ ";
    color: #A5FFD6;
    font-weight: bold;
  }

  .footer {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    margin-top: auto;
    text-align: center;
  }
---

# Machine Learning Algorithms and Applications

---

# The Machine Learning Process

<div class="container">

  <div class="main-card">
    <h3>1. Data Pre-Processing</h3>
    <ul>
      <li>Import the data</li>
      <li>Clean the data</li>
      <li>Split into training & test sets</li>
      <li>Feature Scaling</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>2. Modelling</h3>
    <ul>
      <li>Build the model</li>
      <li>Train the model</li>
      <li>Make predictions</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>3. Evaluation</h3>
    <ul>
      <li>Calculate performance metrics</li>
      <li>Make a prediction</li>
    </ul>
  </div>

</div>

---

# Feature Scaling

<div class="container">

  <div class="main-card">
    <h3>What is it?</h3>
    <ul>
      <li>Adjusts input variables to a comparable range</li>
      <li>Uses standardization or normalization</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Why Do We Need It?</h3>
    <ul>
      <li>Better results: KNN, SVM, and Gradient Descent depend on distance, so scaling improves their performance</li>
      <li>Faster optimization: Models reach a solution more quickly when features share a similar scale</li>
      <li>Fairer weighting: Large values no longer overpower smaller ones</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Example</h3>
    <ul>
      <li>Height (cm) vs weight (kg) often have very different scales</li>
      <li>Without scaling, one can unfairly influence the model</li>
    </ul>
  </div>

</div>

---

# Feature Scaling: Normalization vs Standardization

<div class="container">

  <div class="main-card">
    <h3>Normalization</h3>
    <ul>
      <li>Maps values to the interval [0, 1]</li>
      <li>Works well for distance-based models (e.g., KNN)</li>
      <li><strong>Formula:</strong> X' = (X − X<sub>min</sub>) / (X<sub>max</sub> − X<sub>min</sub>)</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Standardization</h3>
    <ul>
      <li>Centers data at 0 with unit variance</li>
      <li>Fits models that assume normal distribution (e.g., Logistic Regression)</li>
      <li><strong>Formula:</strong> X' = (X − μ) / σ</li>
    </ul>
  </div>

</div>

---

# Feature Scaling: Choosing the Right Method

<div class="container">

  <div class="main-card">
    <h3>Normalization</h3>
    <ul>
      <li>Best when features span different ranges and you want them in [0, 1]</li>
      <li>Example: Min-Max Scaling</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Standardization</h3>
    <ul>
      <li>Best when you need a bell-shaped distribution or the data has outliers</li>
      <li>Centers data and scales by standard deviation</li>
    </ul>
  </div>

</div>

---

# Feature Scaling: Example

<div class="container">

  <div class="main-card">
    <h3>Before Scaling</h3>
    <ul>
      <li>Height: 160, 170, 180 cm</li>
      <li>Weight: 55, 70, 90 kg</li>
      <li>Different scales (150–190 vs 45–120)</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>After Min-Max (0 to 1)</h3>
    <ul>
      <li>Height: 0.25, 0.50, 0.75</li>
      <li>Weight: 0.13, 0.33, 0.60</li>
      <li>Same range, fair contribution</li>
    </ul>
  </div>

</div>

---

# Categorical Data

<div class="container">

  <div class="main-card">
    <h3>What is Categorical Data?</h3>
    <ul>
      <li>Values that represent groups or labels</li>
      <li><strong>Ordinal:</strong> Ordered levels (e.g., Budget, Mid-range, Premium)</li>
      <li><strong>Nominal:</strong> No order (e.g., Riyadh, Jeddah, Dammam)</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Why Encode It?</h3>
    <ul>
      <li>ML models work with numbers only</li>
      <li>Raw: Riyadh, Jeddah, Dammam</li>
      <li>Encoded: [1, 2, 3] or One-Hot</li>
    </ul>
  </div>

</div>

---

# Categorical Data: How to Deal with It?

## Ordinal Encoding

<div class="container">

  <div class="main-card">
    <h3>Example</h3>
    <ul>
      <li>Price tier: Budget, Mid-range, Premium</li>
      <li>Encoded: 0, 1, 2</li>
      <li>Keeps the order</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Another Example</h3>
    <ul>
      <li>Rating: Poor, Fair, Good, Excellent</li>
      <li>Encoded: 0, 1, 2, 3</li>
    </ul>
  </div>

</div>

---

# Categorical Data: How to Deal with It?

## One Hot Encoding

<div class="container">

  <div class="main-card">
    <h3>Example</h3>
    <ul>
      <li>City: Riyadh, Jeddah, Dammam</li>
      <li>Riyadh → [1, 0, 0]</li>
      <li>Jeddah → [0, 1, 0]</li>
      <li>Dammam → [0, 0, 1]</li>
    </ul>
  </div>

  <div class="main-card">
    <h3>Why One Hot?</h3>
    <ul>
      <li>No implied order between categories</li>
      <li>Each category gets its own column</li>
      <li>Model treats each category equally</li>
    </ul>
  </div>

</div>

---

&nbsp;

