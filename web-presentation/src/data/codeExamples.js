/**
 * Live code snippets — one lab anchor per main section.
 * Shown when slide.title matches anchorTitle (or slide.codeExampleId === id).
 */
export const codeExamples = [
  {
    id: "section-01",
    sectionTag: "Section 1",
    anchorTitle: "Training Set & Test Set",
    title: "Train / Test Split",
    language: "python",
    code: `# Section 1 — Foundations · train/test split
import numpy as np

rng = np.random.default_rng(42)
data = rng.normal(10, 2, size=20)

split = int(len(data) * 0.8)
train, test = data[:split], data[split:]

print(f"Total samples: {len(data)}")
print(f"Train: {len(train)} | Test: {len(test)}")
print(f"Train mean: {train.mean():.2f}")
print(f"Test mean:  {test.mean():.2f}")`,
  },
  {
    id: "section-02",
    sectionTag: "Section 2",
    anchorTitle: "Regression - Simple Linear Regression",
    title: "Linear Regression Lab",
    language: "python",
    code: `# Section 2 — Linear Regression (numpy OLS-style)
import numpy as np

X = np.array([1, 2, 3, 4, 5], dtype=float)
y = np.array([2, 4, 5, 4, 5], dtype=float)

# Fit line: y = a*x + b
a, b = np.polyfit(X, y, 1)
y_hat = a * X + b

ss_res = np.sum((y - y_hat) ** 2)
ss_tot = np.sum((y - y.mean()) ** 2)
r2 = 1 - ss_res / ss_tot

print(f"slope = {a:.3f}, intercept = {b:.3f}")
print(f"R² = {r2:.3f}")`,
  },
  {
    id: "section-03",
    sectionTag: "Section 3",
    anchorTitle: "Logistic Regression: Definition",
    title: "Sigmoid & Classification",
    language: "python",
    code: `# Section 3 — Logistic regression intuition
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

scores = np.array([-2.0, -0.5, 0.0, 1.2, 3.0])
probs = sigmoid(scores)
preds = (probs >= 0.5).astype(int)

for s, p, y in zip(scores, probs, preds):
    print(f"score={s:+.1f}  P(class=1)={p:.3f}  pred={y}")`,
  },
  {
    id: "section-04",
    sectionTag: "Section 4",
    anchorTitle: "Naive Bayes: Bayes' Theorem",
    title: "Naive Bayes Demo",
    language: "python",
    code: `# Section 4 — Naive Bayes (toy spam filter)
import math

# P(spam), P(word|spam) simplified
priors = {"spam": 0.4, "ham": 0.6}
likelihood = {
    "spam": {"free": 0.8, "win": 0.7, "meeting": 0.1},
    "ham": {"free": 0.1, "win": 0.05, "meeting": 0.6},
}

words = ["free", "win"]
for label in ("spam", "ham"):
    log_p = math.log(priors[label])
    for w in words:
        log_p += math.log(likelihood[label][w])
    print(f"log P({label} | words) = {log_p:.3f}")`,
  },
  {
    id: "section-05",
    sectionTag: "Section 5",
    anchorTitle: "Support Vector Machine (SVM): Core Idea",
    title: "Linear SVM Margin",
    language: "python",
    code: `# Section 5 — SVM margin intuition (2D)
import numpy as np

# Two separable points + candidate hyperplane w·x + b = 0
w = np.array([1.0, -1.0])
b = 0.0

points = np.array([[2, 0], [0, 2], [-2, 0], [0, -2]])
labels = np.array([1, 1, -1, -1])

def margin(w, b, x):
    return labels * (w @ x + b)

margins = [margin(w, b, x) for x in points]
print(f"Margins: {[round(m, 2) for m in margins]}")
print(f"Min margin (should be > 0): {min(margins):.2f}")`,
  },
  {
    id: "section-06",
    sectionTag: "Section 6",
    anchorTitle: "K-Means Clustering: Core Idea",
    title: "K-Means Step",
    language: "python",
    code: `# Section 6 — One k-means assignment step
import numpy as np

X = np.array([[1, 1], [1.5, 2], [3, 4], [5, 7], [6, 8]], dtype=float)
centroids = np.array([[1, 1], [6, 8]], dtype=float)

dist = ((X[:, None, :] - centroids[None, :, :]) ** 2).sum(axis=2)
labels = dist.argmin(axis=1)

for i, (point, lab) in enumerate(zip(X, labels)):
    print(f"point {point} -> cluster {lab}")`,
  },
  {
    id: "section-07",
    sectionTag: "Section 7",
    anchorTitle: "Forward Propagation: The Engine of Inference",
    title: "Forward Pass",
    language: "python",
    code: `# Section 7 — Tiny forward pass
import numpy as np

def relu(z):
    return np.maximum(0, z)

x = np.array([0.5, -1.0, 0.2])
W1 = np.array([[0.4, -0.2], [0.1, 0.8], [-0.3, 0.5]])
b1 = np.array([0.1, -0.1])
h = relu(W1.T @ x + b1)

W2 = np.array([0.6, -0.4])
out = W2 @ h + 0.05

print("hidden:", np.round(h, 3))
print("output:", round(float(out), 3))`,
  },
  {
    id: "section-08",
    sectionTag: "Section 8",
    anchorTitle: "NLP Fundamentals and Challenges",
    title: "Text Preprocessing",
    language: "python",
    code: `# Section 8 — Basic NLP preprocessing
import re

text = "Hello World! NLP is FUN... isn't it?"
tokens = re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?", text.lower())

print("Original:", text)
print("Tokens:", tokens)
print("Token count:", len(tokens))`,
  },
  {
    id: "section-09",
    sectionTag: "Section 9",
    anchorTitle: "NLP Tokenization Masterclass",
    title: "Whitespace Tokenizer",
    language: "python",
    code: `# Section 9 — Tokenization comparison
sentence = "lowest lowest lower"

whitespace = sentence.split()
# naive BPE-like merge demo
words = ["low", "er", "est"]
print("Whitespace:", whitespace)
print("Subword pieces:", words)
print("Joined:", "".join(words))`,
  },
  {
    id: "section-10",
    sectionTag: "Section 10",
    anchorTitle: "NLP Language Modeling with N-grams",
    title: "Bigram Counts",
    language: "python",
    code: `# Section 10 — Bigram language model
from collections import Counter

corpus = "the cat sat on the mat the cat"
tokens = corpus.split()
bigrams = list(zip(tokens, tokens[1:]))
counts = Counter(bigrams)

print("Top bigrams:")
for bg, c in counts.most_common(5):
    print(f"  {bg} -> {c}")`,
  },
  {
    id: "section-11",
    sectionTag: "Section 11",
    anchorTitle: "NLP Contextualized Embeddings and RNNs",
    title: "Word Similarity",
    language: "python",
    code: `# Section 11 — Static vs contextual (toy vectors)
import numpy as np

bank_fin = np.array([1.0, 0.1, 0.0])
bank_river = np.array([0.1, 1.0, 0.0])
query_fin = np.array([0.9, 0.2, 0.1])

def cos(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

print("cos(query, financial bank):", round(cos(query_fin, bank_fin), 3))
print("cos(query, river bank):", round(cos(query_fin, bank_river), 3))`,
  },
  {
    id: "section-12",
    sectionTag: "Section 12",
    anchorTitle: "NLP Seq2Seq for Neural Machine Translation",
    title: "Sequence Mapping",
    language: "python",
    code: `# Section 12 — Seq2Seq toy alignment
src = ["I", "love", "NLP"]
tgt = ["أنا", "أحب", "NLP"]

alignment = list(zip(src, tgt))
print("Source:", src)
print("Target:", tgt)
print("Alignment pairs:")
for s, t in alignment:
    print(f"  {s} -> {t}")`,
  },
  {
    id: "section-13",
    sectionTag: "Section 13",
    anchorTitle: "Self-Attention, Q/K/V, and Multi-Head",
    title: "Attention Scores",
    language: "python",
    code: `# Section 13 — Scaled dot-product attention (toy)
import numpy as np

Q = np.array([[1.0, 0.0], [0.5, 0.5]])
K = np.array([[1.0, 0.0], [0.0, 1.0]])
V = np.array([[1.0, 2.0], [3.0, 4.0]])

scores = Q @ K.T / np.sqrt(K.shape[1])
weights = np.exp(scores) / np.exp(scores).sum(axis=1, keepdims=True)
out = weights @ V

print("attention weights:\\n", np.round(weights, 3))
print("output:\\n", np.round(out, 3))`,
  },
  {
    id: "section-14",
    sectionTag: "Section 14",
    anchorTitle: "Day 1 — Course Overview & Objectives",
    title: "NLP Pipeline Sketch",
    language: "python",
    code: `# Section 14 — Mini NLP pipeline (stdlib)
import re

raw = "  Contact Ahmed@email.com for NLP Bootcamp!!!  "
clean = re.sub(r"[^\\w\\s@.]", "", raw).strip().lower()
tokens = clean.split()
entities = [t for t in tokens if "@" in t]

print("clean:", clean)
print("tokens:", tokens)
print("entities:", entities)`,
  },
  {
    id: "section-15",
    sectionTag: "Section 15",
    anchorTitle: "Mini Lab — RAG in Python",
    title: "RAG Retrieval Sketch",
    language: "python",
    code: `# Section 15 — cosine retrieval sketch
import numpy as np

docs = ["Refunds within 30 days", "Do not log PII"]
doc_emb = np.array([[1.0, 0.0], [0.0, 1.0]])
q = np.array([0.9, 0.1])

scores = doc_emb @ q
best = int(np.argmax(scores))
print("Top doc:", docs[best], "score:", scores[best])`,
  },
  {
    id: "section-16",
    sectionTag: "Section 16",
    anchorTitle: "Mini Lab — MLflow-style Run Log",
    title: "Experiment Run Log",
    language: "python",
    code: `# Section 16 — experiment metadata pattern
run = {
    "params": {"lr": 0.01, "max_depth": 5},
    "metrics": {"f1": 0.82},
    "tags": {"data_version": "2026-06-01", "git_sha": "abc123"},
}
for k, v in run.items():
    print(k, v)`,
  },
];
