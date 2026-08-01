#!/usr/bin/env python3
"""Generate regression slide plot PNGs for section02-regression.js."""
from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.gridspec import GridSpec
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "plots"
OUT.mkdir(parents=True, exist_ok=True)

RNG = np.random.default_rng(42)
X = RNG.uniform(0, 10, 80)
Y = 2.5 * X + 3 + RNG.normal(0, 2.5, 80)


def save(name: str) -> None:
    path = OUT / name
    plt.tight_layout()
    plt.savefig(path, dpi=140, bbox_inches="tight", facecolor="white")
    plt.close()
    print(f"  wrote {path.name}")


def slide_19_1() -> None:
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.scatter(X, Y, alpha=0.65, color="#5234b7", label="Data")
    m, b = np.polyfit(X, Y, 1)
    xs = np.linspace(X.min(), X.max(), 100)
    ax.plot(xs, m * xs + b, color="#9e59cd", linewidth=2.5, label="Linear fit")
    ax.set_title("Simple Linear Regression")
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.legend()
    ax.grid(alpha=0.25)
    save("slide-19-1.png")


def slide_22() -> None:
    for idx, noise in enumerate([0.8, 4.5], start=1):
        fig, ax = plt.subplots(figsize=(8, 5))
        x = np.linspace(0, 10, 60)
        y_true = 2 * x + 1
        y = y_true + RNG.normal(0, noise, x.size)
        m, b = np.polyfit(x, y, 1)
        y_hat = m * x + b
        ss_res = np.sum((y - y_hat) ** 2)
        ss_tot = np.sum((y - y.mean()) ** 2)
        r2 = 1 - ss_res / ss_tot
        ax.scatter(x, y, color="#5234b7", alpha=0.55)
        ax.plot(x, y_hat, color="#9e59cd", linewidth=2.5)
        ax.set_title(f"R² ≈ {r2:.2f}")
        ax.set_xlabel("x")
        ax.set_ylabel("y")
        ax.grid(alpha=0.25)
        save(f"slide-22-{idx}.png")


def slide_25_1() -> None:
    fig, ax = plt.subplots(figsize=(8, 5))
    x = np.linspace(0, 10, 50)
    y_hat = 2.2 * x + 1.5
    residuals = RNG.normal(0, 1.2, x.size)
    ax.scatter(x, residuals, color="#5234b7", alpha=0.7)
    ax.axhline(0, color="#9e59cd", linewidth=2)
    ax.set_title("Residuals vs. Fitted Values")
    ax.set_xlabel("Fitted value")
    ax.set_ylabel("Residual")
    ax.grid(alpha=0.25)
    save("slide-25-1.png")


def slide_39() -> None:
    x = np.linspace(-2, 6, 120)
    y = 0.4 * x**3 - 2 * x**2 + x + 3 + RNG.normal(0, 1.5, x.size)
    order = np.argsort(x)
    x_s, y_s = x[order], y[order]
    xs = np.linspace(x_s.min(), x_s.max(), 200)
    for deg, filename in [(1, "slide-39-1"), (3, "slide-39-2")]:
        fig, ax = plt.subplots(figsize=(8, 5))
        coef = np.polyfit(x_s, y_s, deg)
        ax.scatter(x_s, y_s, color="#5234b7", alpha=0.45, s=18)
        ax.plot(xs, np.polyval(coef, xs), color="#9e59cd", linewidth=2.5)
        ax.set_title(f"{'Linear (degree 1)' if deg == 1 else 'Polynomial (degree 3)'}")
        ax.grid(alpha=0.25)
        save(f"{filename}.png")


def slide_42() -> None:
    x = np.linspace(0, 10, 25)
    y = np.sin(x) + RNG.normal(0, 0.15, x.size)
    xs = np.linspace(0, 10, 300)

    # Bias–variance intuition (side-by-side)
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    under = np.polyfit(x, y, 1)
    over = np.polyfit(x, y, 12)
    axes[0].scatter(x, y, color="#5234b7")
    axes[0].plot(xs, np.polyval(under, xs), color="#9e59cd", linewidth=2)
    axes[0].set_title("Underfitting (too simple)")
    axes[1].scatter(x, y, color="#5234b7")
    axes[1].plot(xs, np.polyval(over, xs), color="#c0392b", linewidth=2)
    axes[1].set_title("Overfitting (too complex)")
    for ax in axes:
        ax.grid(alpha=0.25)
    save("slide-42-1.png")

    # SVR fit example with ε-tube
    x_svr = np.linspace(0, 10, 40)
    y_svr = np.sin(x_svr) + 0.3 * x_svr + RNG.normal(0, 0.35, x_svr.size)
    model = SVR(kernel="rbf", C=100, epsilon=0.45, gamma=0.35).fit(
        x_svr.reshape(-1, 1), y_svr
    )
    xs_svr = np.linspace(0, 10, 400).reshape(-1, 1)
    pred = model.predict(xs_svr)
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.fill_between(
        xs_svr.ravel(),
        pred - model.epsilon,
        pred + model.epsilon,
        color="#9e59cd",
        alpha=0.18,
        label="ε-tube",
    )
    ax.scatter(x_svr, y_svr, color="#5234b7", alpha=0.75, s=36, label="Data", zorder=3)
    ax.plot(xs_svr.ravel(), pred, color="#5234b7", linewidth=2.6, label="SVR (RBF)", zorder=4)
    ax.plot(
        xs_svr.ravel(),
        pred + model.epsilon,
        color="#9e59cd",
        linewidth=1.2,
        linestyle="--",
        alpha=0.9,
    )
    ax.plot(
        xs_svr.ravel(),
        pred - model.epsilon,
        color="#9e59cd",
        linewidth=1.2,
        linestyle="--",
        alpha=0.9,
    )
    ax.set_title("SVR Fit Example (RBF + ε-tube)")
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    ax.legend(loc="upper left", framealpha=0.95)
    ax.grid(alpha=0.25)
    save("slide-42-2.png")


def slide_46() -> None:
    x = X.reshape(-1, 1)
    y = Y
    xs = np.linspace(X.min(), X.max(), 200).reshape(-1, 1)
    models = [
        ("SVR (RBF)", SVR(kernel="rbf", C=10, epsilon=0.5).fit(x, y)),
        ("Decision Tree", DecisionTreeRegressor(max_depth=4, random_state=42).fit(x, y)),
        ("Random Forest", RandomForestRegressor(n_estimators=80, random_state=42).fit(x, y)),
    ]
    for idx, (title, model) in enumerate(models, start=1):
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.scatter(X, Y, color="#5234b7", alpha=0.55)
        ax.plot(xs.ravel(), model.predict(xs), color="#9e59cd", linewidth=2.5)
        ax.set_title(title)
        ax.grid(alpha=0.25)
        save(f"slide-46-{idx}.png")


def slide_48_1() -> None:
    fig, ax = plt.subplots(figsize=(8, 5))
    features = ["Size", "Age", "Rooms", "Distance", "Score"]
    importance = np.array([0.35, 0.22, 0.18, 0.15, 0.10])
    ax.barh(features, importance, color="#5234b7")
    ax.set_title("Feature Importance (Random Forest)")
    ax.set_xlabel("Importance")
    ax.grid(axis="x", alpha=0.25)
    save("slide-48-1.png")


def slide_52() -> None:
    metrics = ["RMSE", "MAE", "R²"]
    models = {
        "Linear": [2.8, 2.1, 0.72],
        "Polynomial": [2.2, 1.7, 0.81],
        "Random Forest": [1.9, 1.4, 0.86],
    }
    x = np.arange(len(metrics))
    width = 0.25
    fig, ax = plt.subplots(figsize=(9, 5))
    for i, (name, vals) in enumerate(models.items()):
        ax.bar(x + i * width, vals, width=width, label=name)
    ax.set_xticks(x + width)
    ax.set_xticklabels(metrics)
    ax.set_title("Model Comparison Metrics")
    ax.legend()
    ax.grid(axis="y", alpha=0.25)
    save("slide-52-1.png")

    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot([1, 2, 3], [2.8, 2.2, 1.9], marker="o", label="RMSE")
    ax.plot([1, 2, 3], [0.72, 0.81, 0.86], marker="s", label="R²")
    ax.set_xticks([1, 2, 3])
    ax.set_xticklabels(["Linear", "Poly", "RF"])
    ax.set_title("Error vs. Complexity")
    ax.legend()
    ax.grid(alpha=0.25)
    save("slide-52-2.png")

    fig, ax = plt.subplots(figsize=(8, 5))
    train_err = [2.5, 1.8, 0.9]
    test_err = [2.8, 2.2, 1.9]
    ax.plot([1, 2, 3], train_err, marker="o", label="Train")
    ax.plot([1, 2, 3], test_err, marker="s", label="Test")
    ax.set_xticks([1, 2, 3])
    ax.set_xticklabels(["Linear", "Poly", "RF"])
    ax.set_title("Train vs. Test Error")
    ax.legend()
    ax.grid(alpha=0.25)
    save("slide-52-3.png")


def slide_54_1() -> None:
    x = X.reshape(-1, 1)
    y = Y
    xs = np.linspace(X.min(), X.max(), 200).reshape(-1, 1)
    fig = plt.figure(figsize=(12, 8))
    gs = GridSpec(2, 3, figure=fig)
    specs = [
        ("Linear", np.poly1d(np.polyfit(X, Y, 1))),
        ("Poly d=2", np.poly1d(np.polyfit(X, Y, 2))),
        ("Poly d=3", np.poly1d(np.polyfit(X, Y, 3))),
    ]
    for i, (title, fn) in enumerate(specs):
        ax = fig.add_subplot(gs[0, i])
        ax.scatter(X, Y, s=12, alpha=0.5, color="#5234b7")
        ax.plot(xs, fn(xs.ravel()), color="#9e59cd", linewidth=2)
        ax.set_title(title)
        ax.grid(alpha=0.25)
    models = [
        ("SVR", SVR(kernel="rbf", C=10).fit(x, y)),
        ("Decision Tree", DecisionTreeRegressor(max_depth=4, random_state=42).fit(x, y)),
    ]
    for i, (title, model) in enumerate(models):
        ax = fig.add_subplot(gs[1, i])
        ax.scatter(X, Y, s=12, alpha=0.5, color="#5234b7")
        ax.plot(xs.ravel(), model.predict(xs), color="#9e59cd", linewidth=2)
        ax.set_title(title)
        ax.grid(alpha=0.25)
    ax = fig.add_subplot(gs[1, 2])
    rf = RandomForestRegressor(n_estimators=60, random_state=42).fit(x, y)
    ax.scatter(X, Y, s=12, alpha=0.5, color="#5234b7")
    ax.plot(xs.ravel(), rf.predict(xs), color="#9e59cd", linewidth=2)
    ax.set_title("Random Forest")
    ax.grid(alpha=0.25)
    fig.suptitle("Regression Models on the Same Dataset", fontsize=14)
    save("slide-54-1.png")


def main() -> None:
    print(f"Output: {OUT}")
    slide_19_1()
    slide_22()
    slide_25_1()
    slide_39()
    slide_42()
    slide_46()
    slide_48_1()
    slide_52()
    slide_54_1()
    print("Done.")


if __name__ == "__main__":
    main()
