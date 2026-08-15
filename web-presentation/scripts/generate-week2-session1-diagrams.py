#!/usr/bin/env python3
"""Generate ETRA-branded classroom diagrams for Week 2 Session 1 PPTX."""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle, FancyBboxPatch, Rectangle

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "session-w2s1-diagrams"
OUT.mkdir(parents=True, exist_ok=True)

PRIMARY = "#5234B7"
SECONDARY = "#9E59CD"
SOFT = "#EEE8FA"
SOFT_2 = "#F5F1FC"
SURFACE = "#FAF8FF"
INK = "#121018"
MUTED = "#5A5470"
WHITE = "#FFFFFF"
LINE = "#E4DCF4"
ACCENT_OK = "#3D8B6E"
ACCENT_WARN = "#C45C26"


def style_ax(ax, *, spines=False):
    ax.set_facecolor(SURFACE)
    if not spines:
        for s in ax.spines.values():
            s.set_visible(False)
        ax.set_xticks([])
        ax.set_yticks([])


def save(fig, name: str) -> None:
    path = OUT / name
    fig.savefig(path, dpi=160, bbox_inches="tight", facecolor=SURFACE, pad_inches=0.15)
    plt.close(fig)
    print(f"  wrote {path.name}")


def rounded_box(ax, x, y, w, h, text, *, fc=SOFT, ec=PRIMARY, fontsize=12, color=INK, lw=1.6):
    box = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=lw,
        edgecolor=ec,
        facecolor=fc,
    )
    ax.add_patch(box)
    ax.text(
        x + w / 2,
        y + h / 2,
        text,
        ha="center",
        va="center",
        fontsize=fontsize,
        color=color,
        fontweight="bold",
        linespacing=1.25,
    )
    return box


def arrow(ax, x1, y1, x2, y2, color=SECONDARY, lw=2.2):
    ax.annotate(
        "",
        xy=(x2, y2),
        xytext=(x1, y1),
        arrowprops=dict(arrowstyle="-|>", color=color, lw=lw, mutation_scale=14),
    )


def diagram_ai_ml_dl() -> None:
    fig, ax = plt.subplots(figsize=(10, 4.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.4)

    ax.add_patch(
        FancyBboxPatch((0.4, 0.35), 9.2, 3.7, boxstyle="round,pad=0.02,rounding_size=0.12", fc=SOFT, ec=PRIMARY, lw=1.8)
    )
    ax.text(0.7, 3.7, "AI", ha="left", va="center", fontsize=16, color=PRIMARY, fontweight="bold")
    ax.text(0.7, 3.35, "Intelligent systems · search · rules · learning", ha="left", fontsize=10, color=MUTED)

    ax.add_patch(
        FancyBboxPatch((1.1, 0.55), 7.9, 2.5, boxstyle="round,pad=0.02,rounding_size=0.12", fc=SOFT_2, ec=SECONDARY, lw=1.8)
    )
    ax.text(1.4, 2.7, "Machine Learning", ha="left", va="center", fontsize=15, color=SECONDARY, fontweight="bold")
    ax.text(1.4, 2.35, "Learn from data · linear models · trees · kernels", ha="left", fontsize=10, color=MUTED)

    ax.add_patch(
        FancyBboxPatch((2.0, 0.75), 6.1, 1.3, boxstyle="round,pad=0.02,rounding_size=0.1", fc=PRIMARY, ec=PRIMARY, lw=1.4)
    )
    ax.text(5.05, 1.55, "Deep Learning", ha="center", va="center", fontsize=15, color=WHITE, fontweight="bold")
    ax.text(5.05, 1.15, "Stacked nonlinear layers · CNNs · RNNs · Transformers", ha="center", fontsize=10, color=WHITE)

    ax.text(5, 4.2, "DL  ⊂  ML  ⊂  AI", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    save(fig, "ai-ml-dl.png")


def diagram_three_ingredients() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.4)
    items = [
        ("1", "Architecture", "How signals flow\nMLP · CNN · RNN"),
        ("2", "Loss", "What “better” means\nMSE · cross-entropy"),
        ("3", "Optimizer + data", "How we search weights\nSGD · Adam · batches"),
    ]
    for i, (n, title, body) in enumerate(items):
        x = 0.4 + i * 3.2
        rounded_box(ax, x, 0.55, 2.9, 2.35, "", fc=SOFT if i != 1 else SOFT_2)
        ax.add_patch(Circle((x + 0.45, 2.45), 0.22, fc=PRIMARY, ec=PRIMARY))
        ax.text(x + 0.45, 2.45, n, ha="center", va="center", fontsize=11, color=WHITE, fontweight="bold")
        ax.text(x + 1.55, 2.45, title, ha="center", va="center", fontsize=13, color=PRIMARY, fontweight="bold")
        ax.text(x + 1.45, 1.4, body, ha="center", va="center", fontsize=11, color=INK, linespacing=1.4)
    ax.text(5, 3.15, "Three ingredients of every deep model", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "three-ingredients.png")


def diagram_perceptron() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.8))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.8)

    ys = [2.9, 1.9, 0.9]
    labels = [r"$x_1$", r"$x_2$", r"$x_d$"]
    for y, lab in zip(ys, labels):
        ax.add_patch(Circle((1.1, y), 0.28, fc=SOFT, ec=PRIMARY, lw=1.6))
        ax.text(1.1, y, lab, ha="center", va="center", fontsize=12, color=PRIMARY, fontweight="bold")
        ax.plot([1.38, 3.55], [y, 1.9], color=SECONDARY, lw=1.8)
        ax.text(2.35, (y + 1.9) / 2 + 0.12, r"$w$", fontsize=10, color=MUTED)

    ax.add_patch(Circle((4.05, 1.9), 0.48, fc=PRIMARY, ec=PRIMARY))
    ax.text(4.05, 1.9, r"$\Sigma$+b", ha="center", va="center", fontsize=12, color=WHITE, fontweight="bold")
    arrow(ax, 4.55, 1.9, 5.55, 1.9)
    ax.text(5.05, 2.25, r"$z$", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")

    rounded_box(ax, 5.6, 1.35, 1.7, 1.1, "f(z)", fontsize=14, fc=SOFT_2, ec=SECONDARY)
    arrow(ax, 7.35, 1.9, 8.35, 1.9)
    ax.text(7.85, 2.25, r"$a$", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")

    ax.add_patch(Circle((8.85, 1.9), 0.38, fc=SECONDARY, ec=SECONDARY))
    ax.text(8.85, 1.9, r"$\hat{y}$", ha="center", va="center", fontsize=13, color=WHITE, fontweight="bold")

    ax.text(5, 3.5, "Perceptron  ·  z = wᵀx + b   then   a = f(z)", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "perceptron.png")


def diagram_mlp() -> None:
    fig, ax = plt.subplots(figsize=(10, 4.0))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.0)

    layers = [
        (1.4, 3, "Input"),
        (5.0, 5, "Hidden"),
        (8.6, 2, "Output"),
    ]
    coords = []
    for x, n, label in layers:
        ys = np.linspace(0.7, 3.1, n)
        layer_pts = []
        for y in ys:
            ax.add_patch(Circle((x, y), 0.22, fc=SOFT if label != "Hidden" else PRIMARY, ec=PRIMARY, lw=1.5))
            layer_pts.append((x, y))
        coords.append(layer_pts)
        ax.text(x, 3.55, label, ha="center", fontsize=12, color=PRIMARY, fontweight="bold")

    for xa, ya in coords[0]:
        for xb, yb in coords[1]:
            ax.plot([xa + 0.22, xb - 0.22], [ya, yb], color=SECONDARY, lw=0.7, alpha=0.55, zorder=0)
    for xa, ya in coords[1]:
        for xb, yb in coords[2]:
            ax.plot([xa + 0.22, xb - 0.22], [ya, yb], color=SECONDARY, lw=0.8, alpha=0.7, zorder=0)

    ax.text(5, 3.9, "Multi-Layer Perceptron (MLP)", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "mlp-architecture.png")


def diagram_nn_forward() -> None:
    """Match the in-deck Neural Network visualizer: 3-4-2, weight thickness."""
    fig, ax = plt.subplots(figsize=(10.2, 4.4))
    style_ax(ax)
    ax.set_xlim(0, 10.2)
    ax.set_ylim(0, 4.4)

    weights_ih = {
        (0, 0): 0.6,
        (0, 1): -0.3,
        (0, 2): 0.45,
        (0, 3): 0.2,
        (1, 0): -0.5,
        (1, 1): 0.7,
        (1, 2): 0.15,
        (1, 3): -0.4,
        (2, 0): 0.35,
        (2, 1): 0.55,
        (2, 2): -0.25,
        (2, 3): 0.65,
    }
    weights_ho = {
        (0, 0): 0.5,
        (0, 1): -0.35,
        (1, 0): -0.2,
        (1, 1): 0.6,
        (2, 0): 0.4,
        (2, 1): 0.3,
        (3, 0): -0.45,
        (3, 1): 0.55,
    }

    specs = [
        (1.5, 3, "Input", ["x1", "x2", "x3"], SOFT),
        (5.1, 4, "Hidden", ["h1", "h2", "h3", "h4"], PRIMARY),
        (8.7, 2, "Output", ["y1", "y2"], SOFT),
    ]
    coords = []
    for x, n, layer, labels, fill in specs:
        ys = np.linspace(0.85, 3.15, n)
        pts = []
        tc = WHITE if fill == PRIMARY else PRIMARY
        for y, lab in zip(ys, labels):
            ax.add_patch(Circle((x, y), 0.28, fc=fill, ec=PRIMARY, lw=1.6, zorder=3))
            ax.text(x, y, lab, ha="center", va="center", fontsize=10, color=tc, fontweight="bold", zorder=4)
            pts.append((x, y))
        coords.append(pts)
        ax.text(x, 0.42, layer, ha="center", fontsize=12, color=PRIMARY, fontweight="bold")

    def draw_edges(src, dst, wmap):
        for i, (xa, ya) in enumerate(src):
            for j, (xb, yb) in enumerate(dst):
                w = abs(wmap.get((i, j), 0.3))
                ax.plot(
                    [xa + 0.28, xb - 0.28],
                    [ya, yb],
                    color=SECONDARY,
                    lw=0.7 + w * 3.2,
                    alpha=0.28 + w * 0.55,
                    zorder=0,
                    solid_capstyle="round",
                )

    draw_edges(coords[0], coords[1], weights_ih)
    draw_edges(coords[1], coords[2], weights_ho)

    ax.text(5.1, 4.1, "Neural Network", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    ax.text(5.1, 3.72, "Input → Hidden → Output (forward pass)", ha="center", fontsize=11, color=MUTED)
    save(fig, "nn-forward.png")


def diagram_xor() -> None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.8))
    fig.patch.set_facecolor(SURFACE)

    pts = [(0, 0, 0), (0, 1, 1), (1, 0, 1), (1, 1, 0)]
    ax = axes[0]
    style_ax(ax, spines=True)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.set_xlim(-0.4, 1.4)
    ax.set_ylim(-0.4, 1.4)
    ax.set_xticks([0, 1])
    ax.set_yticks([0, 1])
    ax.set_title("XOR is not linearly separable", fontsize=11, color=PRIMARY, fontweight="bold")
    for x, y, c in pts:
        color = PRIMARY if c == 1 else SECONDARY
        marker = "o" if c == 1 else "s"
        ax.scatter([x], [y], s=220, c=color, marker=marker, zorder=3, edgecolors=WHITE, linewidths=1.5)
    ax.plot([-0.2, 1.2], [0.2, 1.2], color=ACCENT_WARN, lw=2, linestyle="--")
    ax.text(0.7, 0.05, "no single line works", fontsize=9, color=ACCENT_WARN, fontweight="bold")

    ax = axes[1]
    style_ax(ax, spines=True)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.set_xlim(-0.4, 1.4)
    ax.set_ylim(-0.4, 1.4)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_title("Hidden layer remaps the space", fontsize=11, color=PRIMARY, fontweight="bold")
    mapped = [(0.15, 0.2, 0), (0.85, 0.85, 1), (0.2, 0.85, 1), (0.9, 0.2, 0)]
    for x, y, c in mapped:
        color = PRIMARY if c == 1 else SECONDARY
        marker = "o" if c == 1 else "s"
        ax.scatter([x], [y], s=220, c=color, marker=marker, zorder=3, edgecolors=WHITE, linewidths=1.5)
    ax.plot([-0.2, 1.3], [0.52, 0.52], color=ACCENT_OK, lw=2.4)
    ax.text(0.55, 0.12, "now linearly separable", fontsize=9, color=ACCENT_OK, fontweight="bold")

    fig.suptitle("Why a hidden layer is necessary", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "xor-separability.png")


def diagram_activations() -> None:
    fig, axes = plt.subplots(1, 3, figsize=(10.5, 3.4))
    fig.patch.set_facecolor(SURFACE)
    z = np.linspace(-4.5, 4.5, 300)
    curves = [
        ("Sigmoid", 1 / (1 + np.exp(-z)), (0, 1), PRIMARY),
        ("Tanh", np.tanh(z), (-1, 1), SECONDARY),
        ("ReLU", np.maximum(0, z), (0, 4.5), PRIMARY),
    ]
    for ax, (name, y, ylim, color) in zip(axes, curves):
        style_ax(ax, spines=True)
        ax.set_facecolor(SURFACE)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
        ax.spines["left"].set_color(LINE)
        ax.spines["bottom"].set_color(LINE)
        ax.axhline(0, color=LINE, lw=1)
        ax.axvline(0, color=LINE, lw=1)
        ax.plot(z, y, color=color, lw=2.6)
        ax.set_xlim(-4.5, 4.5)
        ax.set_ylim(ylim[0] - 0.15, ylim[1] + 0.15)
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title(name, fontsize=13, color=PRIMARY, fontweight="bold")
    fig.suptitle("Activation functions introduce nonlinearity", fontsize=13, color=PRIMARY, fontweight="bold", y=1.04)
    save(fig, "activations.png")


def diagram_sigmoid_tanh() -> None:
    """Wikimedia-style sigmoid (two steepness) + tanh, redrawn in ETRA colors."""
    fig, axes = plt.subplots(2, 1, figsize=(8.8, 5.6), gridspec_kw={"height_ratios": [1.05, 1]})
    fig.patch.set_facecolor(SURFACE)

    ax = axes[0]
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.grid(True, color=LINE, lw=0.8, alpha=0.9)
    x = np.linspace(-1.0, 1.0, 400)
    ax.plot(x, 1 / (1 + np.exp(-5 * x)), color=SECONDARY, lw=2.4, label=r"$f(x)=1/(1+e^{-5x})$")
    ax.plot(x, 1 / (1 + np.exp(-10 * x)), color=PRIMARY, lw=2.4, label=r"$g(x)=1/(1+e^{-10x})$")
    ax.set_xlim(-1.0, 1.0)
    ax.set_ylim(0.0, 1.0)
    ax.set_xticks(np.round(np.arange(-1.0, 1.01, 0.2), 1))
    ax.set_yticks(np.round(np.arange(0.0, 1.01, 0.2), 1))
    ax.tick_params(colors=MUTED, labelsize=8)
    ax.legend(frameon=False, fontsize=9, loc="upper left")
    ax.set_title("Sigmoid — larger |w| makes a steeper cutoff", fontsize=12, color=PRIMARY, fontweight="bold")

    ax = axes[1]
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.grid(True, color=LINE, lw=0.8, alpha=0.9)
    x = np.linspace(-2.6, 2.6, 400)
    ax.plot(x, np.tanh(x), color=SECONDARY, lw=2.6, label=r"$\tanh(x)$")
    ax.axhline(0, color=LINE, lw=1)
    ax.axvline(0, color=LINE, lw=1)
    ax.set_xlim(-2.6, 2.6)
    ax.set_ylim(-1.05, 1.05)
    ax.set_xticks([-2, -1, 0, 1, 2])
    ax.set_yticks([-1, 0, 1])
    ax.tick_params(colors=MUTED, labelsize=8)
    ax.legend(frameon=False, fontsize=10, loc="upper left")
    ax.set_title("Tanh — zero-centered, range (−1, 1)", fontsize=12, color=PRIMARY, fontweight="bold")

    fig.tight_layout(h_pad=0.8)
    save(fig, "sigmoid-tanh.png")


def diagram_sigmoid_threshold() -> None:
    fig, ax = plt.subplots(figsize=(9.6, 3.6))
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)

    z = np.linspace(-6, 6, 400)
    s = 1 / (1 + np.exp(-z))
    ax.plot(z, s, color=PRIMARY, lw=2.6)
    ax.axhline(0.5, color=SECONDARY, lw=1.6, linestyle="--")
    ax.axvline(0, color=LINE, lw=1)
    ax.scatter([0], [0.5], s=70, color=SECONDARY, zorder=3)
    ax.text(0.35, 0.58, r"$\tau = 0.5$", fontsize=12, color=SECONDARY, fontweight="bold")
    ax.fill_between(z, 0.5, 1, where=s >= 0.5, color=SOFT, alpha=0.9)
    ax.set_xlim(-6, 6)
    ax.set_ylim(-0.05, 1.08)
    ax.set_yticks([0, 0.5, 1])
    ax.set_xticks([])
    ax.set_ylabel(r"$\sigma(z)$", fontsize=11, color=MUTED)
    ax.set_title("Sigmoid & threshold — probability cutoff for classification", fontsize=12, color=PRIMARY, fontweight="bold")
    save(fig, "sigmoid-threshold.png")


def diagram_forward_pass() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.2)
    steps = [
        ("x", "Input"),
        ("z = Wx + b", "Linear"),
        ("a = f(z)", "Activation"),
        ("ŷ", "Head"),
    ]
    for i, (top, bot) in enumerate(steps):
        x = 0.35 + i * 2.45
        rounded_box(ax, x, 0.85, 2.1, 1.4, f"{top}\n{bot}", fontsize=12)
        if i < 3:
            arrow(ax, x + 2.15, 1.55, x + 2.4, 1.55)
    ax.text(5, 2.75, "Forward pass — inference through the graph", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "forward-pass.png")


def diagram_backprop() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.6)

    boxes = [("x", 0.4), ("Layer 1", 2.3), ("Layer 2", 4.5), ("Loss L", 6.8)]
    for label, x in boxes:
        rounded_box(ax, x, 1.55, 1.7, 0.95, label, fontsize=12, fc=SOFT if "Loss" not in label else SOFT_2)

    for x in (2.1, 4.3, 6.5):
        arrow(ax, x, 2.05, x + 0.2, 2.05, color=PRIMARY, lw=2.4)
    ax.text(5, 2.75, "Forward  →  compute predictions", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")

    for x in (6.7, 4.5, 2.3):
        ax.annotate(
            "",
            xy=(x - 0.15, 1.35),
            xytext=(x + 1.55, 1.35),
            arrowprops=dict(arrowstyle="-|>", color=ACCENT_WARN, lw=2.2, mutation_scale=13),
        )
    ax.text(5, 0.85, "Backward  ←  chain rule gradients  ∂L/∂w", ha="center", fontsize=11, color=ACCENT_WARN, fontweight="bold")
    ax.text(5, 3.3, "Backpropagation on the computational graph", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "backprop-flow.png")


def diagram_fit_regimes() -> None:
    fig, axes = plt.subplots(1, 3, figsize=(10.5, 3.5))
    fig.patch.set_facecolor(SURFACE)
    ep = np.arange(1, 21)
    series = [
        ("Underfitting", 2.4 - 0.02 * ep, 2.5 - 0.015 * ep, MUTED),
        ("Good fit", 2.2 * np.exp(-0.18 * ep) + 0.35, 2.15 * np.exp(-0.16 * ep) + 0.45, ACCENT_OK),
        ("Overfitting", 2.1 * np.exp(-0.22 * ep) + 0.15, np.concatenate([2.05 * np.exp(-0.18 * ep[:8]) + 0.5, 0.55 + 0.07 * np.arange(12)]), ACCENT_WARN),
    ]
    for ax, (title, tr, va, color) in zip(axes, series):
        style_ax(ax, spines=True)
        ax.set_facecolor(SURFACE)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
        ax.spines["left"].set_color(LINE)
        ax.spines["bottom"].set_color(LINE)
        ax.plot(ep, tr, color=PRIMARY, lw=2.4, label="Train")
        ax.plot(ep, va, color=color, lw=2.4, linestyle="--", label="Val")
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title(title, fontsize=12, color=PRIMARY, fontweight="bold")
        ax.set_ylim(0, 2.8)
        if title == "Good fit":
            ax.legend(frameon=False, fontsize=8, loc="upper right")
    fig.suptitle("Read train vs validation loss", fontsize=13, color=PRIMARY, fontweight="bold", y=1.03)
    save(fig, "train-val-curves.png")


def _offset_stack(ax, x, y, n, w, h, dx=0.07, dy=0.08, *, highlight=None):
    """Draw n offset feature-map rectangles (Wikimedia CNN style)."""
    for i in range(n - 1, -1, -1):
        xi = x + i * dx
        yi = y + i * dy
        fc = PRIMARY if highlight is not None and i == highlight else (SOFT_2 if i % 2 else SOFT)
        ec = PRIMARY
        ax.add_patch(
            Rectangle((xi, yi), w, h, facecolor=fc, edgecolor=ec, lw=1.15, zorder=2 + i)
        )
    return (x + (n - 1) * dx + w / 2, y + (n - 1) * dy + h / 2)


def diagram_cnn_architecture() -> None:
    """Wikimedia CNN (slide image 1), redrawn in ETRA colors."""
    fig, ax = plt.subplots(figsize=(11.2, 4.15))
    style_ax(ax)
    ax.set_xlim(0, 11.2)
    ax.set_ylim(0, 4.15)

    # Input image as an H×W grid with a local patch
    rng = np.random.default_rng(4)
    grid = rng.integers(1, 9, size=(6, 5))
    cell = 0.22
    ox, oy = 0.28, 1.15
    for i in range(6):
        for j in range(5):
            in_k = 1 <= i <= 3 and 1 <= j <= 3
            ax.add_patch(
                Rectangle(
                    (ox + j * cell, oy + (5 - i) * cell),
                    cell,
                    cell,
                    facecolor=SOFT_2 if in_k else SOFT,
                    edgecolor=SECONDARY if in_k else LINE,
                    lw=1.05,
                )
            )
    ax.add_patch(
        Rectangle(
            (ox + cell, oy + 2 * cell),
            3 * cell,
            3 * cell,
            fill=False,
            edgecolor=PRIMARY,
            lw=1.8,
            zorder=5,
        )
    )
    ax.text(ox + 2.5 * cell, 3.05, "Image", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
    ax.text(ox + 2.5 * cell, 0.88, "H×W×3", ha="center", fontsize=9, color=MUTED)

    # Feature-map stacks (conv + pool)
    stacks = [
        (2.15, 1.35, 3, 0.72, 1.15),
        (4.05, 1.55, 5, 0.58, 0.95),
        (5.85, 1.70, 7, 0.46, 0.78),
    ]
    centers = []
    for x, y, n, w, h in stacks:
        c = _offset_stack(ax, x, y, n, w, h, highlight=0)
        centers.append(c)

    ax.annotate(
        "",
        xy=(stacks[0][0] + 0.08, stacks[0][1] + stacks[0][4] * 0.62),
        xytext=(ox + 4 * cell, oy + 3.5 * cell),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.3, mutation_scale=10, linestyle="--"),
    )
    ax.annotate(
        "",
        xy=(stacks[1][0] + 0.06, stacks[1][1] + stacks[1][4] * 0.55),
        xytext=(stacks[0][0] + stacks[0][3] * 0.55, stacks[0][1] + stacks[0][4] * 0.7),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.3, mutation_scale=10, linestyle="--"),
    )
    ax.annotate(
        "",
        xy=(stacks[2][0] + 0.05, stacks[2][1] + stacks[2][4] * 0.5),
        xytext=(stacks[1][0] + stacks[1][3] * 0.55, stacks[1][1] + stacks[1][4] * 0.65),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.3, mutation_scale=10, linestyle="--"),
    )

    ax.text(4.55, 3.72, "Convolutional and pooling layers", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
    ax.text(4.55, 0.55, "Feature learning", ha="center", fontsize=10, color=MUTED)

    # Flatten
    for i in range(6):
        ax.add_patch(
            Rectangle((7.55, 1.15 + i * 0.28), 0.42, 0.24, facecolor=SOFT, edgecolor=PRIMARY, lw=1.1)
        )
    ax.annotate(
        "",
        xy=(7.52, 2.05),
        xytext=(stacks[2][0] + stacks[2][3] + 0.42, centers[2][1]),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.6, mutation_scale=12),
    )
    ax.text(7.76, 3.72, "Vectorisation", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
    ax.text(7.76, 0.55, "Flatten", ha="center", fontsize=10, color=MUTED)

    # Dense layers
    ys1 = np.linspace(1.25, 2.95, 4)
    ys2 = np.linspace(1.45, 2.75, 3)
    for y in ys1:
        ax.add_patch(Circle((8.85, y), 0.16, fc=SOFT_2, ec=PRIMARY, lw=1.3, zorder=3))
    for y in ys2:
        ax.add_patch(Circle((9.85, y), 0.16, fc=PRIMARY, ec=PRIMARY, lw=1.3, zorder=3))
    for y1 in ys1:
        for y2 in ys2:
            ax.plot([9.01, 9.69], [y1, y2], color=SECONDARY, lw=0.7, alpha=0.55, zorder=0)
    ax.annotate(
        "",
        xy=(8.68, 2.1),
        xytext=(8.02, 2.05),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.6, mutation_scale=12),
    )
    ax.text(9.35, 3.72, "Connected layers", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
    ax.text(9.35, 0.55, "Classification", ha="center", fontsize=10, color=MUTED)

    # Output scores
    labels = [("cat", "0.70"), ("dog", "0.22"), ("bird", "0.08")]
    for y, (name, score) in zip(ys2, labels):
        ax.plot([10.01, 10.22], [y, y], color=SECONDARY, lw=1.1)
        ax.text(10.28, y, f"{name}  {score}", ha="left", va="center", fontsize=10, color=INK, fontweight="bold")

    ax.text(5.6, 4.02, "Convolutional neural network", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "cnn-architecture.png")


def diagram_convolution() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.8))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.8)

    # input grid
    rng = np.random.default_rng(3)
    grid = rng.integers(1, 9, size=(5, 5))
    origin = (0.4, 0.7)
    cell = 0.42
    for i in range(5):
        for j in range(5):
            x = origin[0] + j * cell
            y = origin[1] + (4 - i) * cell
            in_k = i in (1, 2, 3) and j in (1, 2, 3)
            fc = SOFT_2 if in_k else SOFT
            ec = SECONDARY if in_k else LINE
            ax.add_patch(Rectangle((x, y), cell, cell, facecolor=fc, edgecolor=ec, lw=1.2))
            ax.text(x + cell / 2, y + cell / 2, str(grid[i, j]), ha="center", va="center", fontsize=8, color=INK)
    ax.text(1.45, 3.05, "Image patch", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")

    arrow(ax, 2.7, 1.75, 3.35, 1.75)

    rounded_box(ax, 3.45, 1.15, 1.7, 1.25, "3×3\nkernel", fontsize=12, fc=PRIMARY, ec=PRIMARY, color=WHITE)
    arrow(ax, 5.25, 1.75, 5.9, 1.75)

    fmap = rng.integers(2, 8, size=(3, 3))
    for i in range(3):
        for j in range(3):
            x = 6.1 + j * 0.55
            y = 1.05 + (2 - i) * 0.55
            ax.add_patch(Rectangle((x, y), 0.55, 0.55, facecolor=SOFT, edgecolor=PRIMARY, lw=1.3))
            ax.text(x + 0.27, y + 0.27, str(fmap[i, j]), ha="center", va="center", fontsize=10, color=PRIMARY, fontweight="bold")
    ax.text(6.95, 2.85, "Feature map", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")

    ax.text(5, 3.5, "Convolution — slide a kernel, write a feature map", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "convolution.png")


def diagram_sobel() -> None:
    """Wikimedia Sobel Y (slide image 2), framed in ETRA colors."""
    from PIL import Image as PILImage

    src = OUT / "sobel-y-source.png"
    img = np.asarray(PILImage.open(src).convert("L"), dtype=float)
    img = 1.0 - (img / 255.0)

    fig, axes = plt.subplots(
        1,
        2,
        figsize=(10.6, 4.05),
        gridspec_kw={"width_ratios": [1.0, 1.85], "wspace": 0.18},
    )
    ax_k, ax_im = axes
    style_ax(ax_k)
    ax_k.set_xlim(0, 4)
    ax_k.set_ylim(0, 4)

    kernel = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]])
    cell = 0.85
    ox, oy = 0.72, 0.85
    for i in range(3):
        for j in range(3):
            val = int(kernel[i, j])
            x = ox + j * cell
            y = oy + (2 - i) * cell
            if val == 0:
                fc, tc = SOFT, MUTED
            elif val > 0:
                fc, tc = PRIMARY, WHITE
            else:
                fc, tc = SOFT_2, PRIMARY
            ax_k.add_patch(Rectangle((x, y), cell, cell, facecolor=fc, edgecolor=PRIMARY, lw=1.4))
            ax_k.text(
                x + cell / 2,
                y + cell / 2,
                f"{val:+d}" if val != 0 else "0",
                ha="center",
                va="center",
                fontsize=14,
                color=tc,
                fontweight="bold",
            )
    ax_k.text(2.0, 3.62, "Sobel Y kernel", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")
    ax_k.text(2.0, 0.38, "Fixed 3×3 filter", ha="center", fontsize=10, color=MUTED)

    ax_im.set_facecolor(SURFACE)
    for s in ax_im.spines.values():
        s.set_visible(False)
    ax_im.set_xticks([])
    ax_im.set_yticks([])
    cmap = plt.matplotlib.colors.LinearSegmentedColormap.from_list(
        "etra_sobel",
        [WHITE, SOFT, SECONDARY, PRIMARY],
    )
    ax_im.imshow(img, cmap=cmap, aspect="auto")
    ax_im.set_title("Sobel Y on a photograph", fontsize=12, color=PRIMARY, fontweight="bold", pad=8)

    fig.suptitle("Classical edge detector — a kernel that is not learned", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "sobel-y.png")


def diagram_cnn_stack() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.2)
    steps = ["Image", "Conv", "ReLU", "Pool", "Conv", "FC", "ŷ"]
    for i, label in enumerate(steps):
        x = 0.25 + i * 1.38
        fc = PRIMARY if label in {"Conv", "FC"} else (SOFT_2 if label == "ŷ" else SOFT)
        tc = WHITE if label in {"Conv", "FC"} else INK
        rounded_box(ax, x, 1.05, 1.18, 1.15, label, fontsize=11, fc=fc, color=tc, ec=PRIMARY)
        if i < len(steps) - 1:
            arrow(ax, x + 1.2, 1.62, x + 1.35, 1.62, lw=1.8)
    ax.text(5, 2.7, "Typical CNN stack", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "cnn-stack.png")


def diagram_residual() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.4)

    rounded_box(ax, 0.5, 1.25, 1.4, 0.9, "x", fontsize=16)
    arrow(ax, 1.95, 1.7, 2.55, 1.7)
    rounded_box(ax, 2.6, 1.15, 2.3, 1.1, "F(x)\nConv · ReLU · Conv", fontsize=11, fc=SOFT_2, ec=SECONDARY)
    arrow(ax, 4.95, 1.7, 5.55, 1.7)

    # skip path
    ax.annotate(
        "",
        xy=(5.55, 2.55),
        xytext=(1.2, 2.55),
        arrowprops=dict(arrowstyle="-|>", color=PRIMARY, lw=2.2, mutation_scale=14, connectionstyle="arc3,rad=0"),
    )
    ax.plot([1.2, 1.2], [2.15, 2.55], color=PRIMARY, lw=2.2)
    ax.plot([5.7, 5.7], [2.55, 2.05], color=PRIMARY, lw=2.2)
    ax.text(3.4, 2.75, "skip / identity", ha="center", fontsize=11, color=PRIMARY, fontweight="bold")

    rounded_box(ax, 5.6, 1.2, 1.7, 1.0, "+  add", fontsize=13, fc=PRIMARY, color=WHITE)
    arrow(ax, 7.35, 1.7, 7.95, 1.7)
    rounded_box(ax, 8.0, 1.25, 1.5, 0.9, "y", fontsize=16)

    ax.text(5, 3.15, "Residual block   y = F(x) + x", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "residual-block.png")


def diagram_transfer() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.4)

    rounded_box(ax, 0.4, 0.7, 4.6, 2.2, "", fc=SOFT)
    ax.text(2.7, 2.55, "Frozen backbone", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.text(2.7, 1.7, "ImageNet features\nedges → textures → parts", ha="center", fontsize=11, color=INK)
    ax.text(2.7, 0.95, "small or zero learning rate", ha="center", fontsize=10, color=MUTED)

    arrow(ax, 5.1, 1.8, 5.7, 1.8)

    rounded_box(ax, 5.8, 0.7, 3.8, 2.2, "", fc=SOFT_2, ec=SECONDARY)
    ax.text(7.7, 2.55, "New head", ha="center", fontsize=13, color=SECONDARY, fontweight="bold")
    ax.text(7.7, 1.7, "Train classifier\non your labels", ha="center", fontsize=11, color=INK)
    ax.text(7.7, 0.95, "few classes · less data", ha="center", fontsize=10, color=MUTED)

    ax.text(5, 3.15, "Transfer learning — reuse features, adapt the head", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "transfer-learning.png")


def diagram_rnn_unfold() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.6)

    rounded_box(ax, 0.35, 1.35, 1.7, 1.15, "RNN\ncell", fontsize=12, fc=PRIMARY, color=WHITE)
    ax.annotate(
        "",
        xy=(0.55, 2.7),
        xytext=(1.85, 2.7),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=2, mutation_scale=12, connectionstyle="arc3,rad=0.7"),
    )
    ax.text(1.2, 3.05, "h", ha="center", fontsize=10, color=SECONDARY, fontweight="bold")
    ax.text(1.2, 0.95, "rolled", ha="center", fontsize=10, color=MUTED)

    ax.text(2.4, 1.9, "=", fontsize=18, color=PRIMARY, fontweight="bold", ha="center")

    xs = [3.0, 5.15, 7.3]
    labels = [r"$x_{t-1}$", r"$x_t$", r"$x_{t+1}$"]
    hs = [r"$h_{t-1}$", r"$h_t$", r"$h_{t+1}$"]
    for i, (x, xt, ht) in enumerate(zip(xs, labels, hs)):
        rounded_box(ax, x, 1.45, 1.55, 0.95, "RNN", fontsize=12, fc=SOFT)
        ax.text(x + 0.77, 0.85, xt, ha="center", fontsize=11, color=MUTED)
        arrow(ax, x + 0.77, 1.2, x + 0.77, 1.42, color=MUTED, lw=1.6)
        ax.text(x + 0.77, 2.7, ht, ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
        arrow(ax, x + 0.77, 2.42, x + 0.77, 2.55, color=PRIMARY, lw=1.6)
        if i < 2:
            arrow(ax, x + 1.6, 1.92, xs[i + 1] - 0.05, 1.92)
    ax.text(6.1, 3.3, "Unfolded through time — shared weights", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "rnn-unfold.png")


def diagram_lstm() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.5)

    gates = [
        ("Forget  fₜ", "erase old cell"),
        ("Input  iₜ", "write new info"),
        ("Output  oₜ", "expose as hₜ"),
    ]
    for i, (title, body) in enumerate(gates):
        x = 0.45 + i * 3.2
        rounded_box(ax, x, 0.7, 2.95, 2.15, "", fc=SOFT if i != 1 else SOFT_2)
        ax.text(x + 1.47, 2.4, title, ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
        ax.text(x + 1.47, 1.5, body, ha="center", fontsize=12, color=INK)
    ax.text(5, 3.2, "LSTM gates control a linear memory path cₜ", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "lstm-gates.png")


def diagram_dropout() -> None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.8))
    fig.patch.set_facecolor(SURFACE)

    def draw_net(ax, drop, title):
        style_ax(ax)
        ax.set_xlim(0, 5)
        ax.set_ylim(0, 4)
        ax.set_title(title, fontsize=12, color=PRIMARY, fontweight="bold")
        layers = [1.0, 2.5, 4.0]
        counts = [3, 4, 2]
        dropped = {(1, 1), (1, 3)} if drop else set()
        pts = []
        for li, (x, n) in enumerate(zip(layers, counts)):
            ys = np.linspace(0.7, 3.2, n)
            layer = []
            for ni, y in enumerate(ys):
                is_drop = (li, ni) in dropped
                fc = LINE if is_drop else (PRIMARY if li == 1 else SOFT)
                ec = MUTED if is_drop else PRIMARY
                ax.add_patch(Circle((x, y), 0.18, fc=fc, ec=ec, lw=1.4, alpha=0.35 if is_drop else 1))
                layer.append((x, y, is_drop))
            pts.append(layer)
        for a in pts[0]:
            for b in pts[1]:
                faded = a[2] or b[2]
                ax.plot([a[0] + 0.18, b[0] - 0.18], [a[1], b[1]], color=LINE if faded else SECONDARY, lw=0.8, alpha=0.35 if faded else 0.7)
        for a in pts[1]:
            for b in pts[2]:
                faded = a[2] or b[2]
                ax.plot([a[0] + 0.18, b[0] - 0.18], [a[1], b[1]], color=LINE if faded else SECONDARY, lw=0.8, alpha=0.35 if faded else 0.7)

    draw_net(axes[0], False, "Train without dropout")
    draw_net(axes[1], True, "Train with dropout")
    fig.suptitle("Dropout randomly silences units during training", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "dropout.png")


def diagram_feature_scaling() -> None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.6))
    fig.patch.set_facecolor(SURFACE)
    labels = ["Feat A", "Feat B", "Feat C"]
    before = [90, 12, 48]
    after = [0.90, 0.12, 0.48]
    panels = [
        (axes[0], "Before scaling", before, (0, 100), "Raw ranges dominate"),
        (axes[1], "After scaling — heights are comparable", after, (0, 1.05), "Features in a comparable range"),
    ]
    colors = [PRIMARY, SECONDARY, PRIMARY]
    for ax, title, vals, ylim, cap in panels:
        style_ax(ax, spines=True)
        ax.set_facecolor(SURFACE)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
        ax.spines["left"].set_color(LINE)
        ax.spines["bottom"].set_color(LINE)
        ax.set_ylim(*ylim)
        ax.set_xticks(range(len(labels)))
        ax.set_xticklabels(labels, fontsize=11, color=MUTED)
        ax.set_yticks([])
        ax.set_title(title, fontsize=11, color=PRIMARY, fontweight="bold", pad=8)
        bars = ax.bar(labels, vals, color=colors, width=0.55, edgecolor=WHITE, linewidth=1)
        for bar, v in zip(bars, vals):
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() + (ylim[1] * 0.03),
                f"{v:g}",
                ha="center",
                va="bottom",
                fontsize=10,
                color=INK,
                fontweight="bold",
            )
        ax.text(1, -0.18 if ylim[1] < 2 else -12, cap, ha="center", fontsize=10, color=MUTED, transform=ax.get_xaxis_transform())
    fig.suptitle("Feature Scaling", fontsize=13, color=PRIMARY, fontweight="bold", y=1.04)
    save(fig, "feature-scaling.png")


def diagram_ann_intro() -> None:
    """Wikimedia-style ANN (slide image 1), redrawn in ETRA colors."""
    fig, ax = plt.subplots(figsize=(8.8, 4.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.4)

    layers = [
        (1.15, 4, "Input"),
        (3.7, 6, "Hidden"),
        (6.3, 6, "Hidden"),
        (8.85, 3, "Output"),
    ]
    coords = []
    for li, (x, n, label) in enumerate(layers):
        ys = np.linspace(0.55, 3.35, n)
        pts = []
        fill = PRIMARY if li in (1, 2) else SOFT
        for y in ys:
            ax.add_patch(Circle((x, y), 0.20, fc=fill, ec=PRIMARY, lw=1.5, zorder=3))
            pts.append((x, y))
        coords.append(pts)
        ax.text(x, 3.85, label, ha="center", fontsize=11, color=PRIMARY, fontweight="bold")

    for a, b in zip(coords, coords[1:]):
        for xa, ya in a:
            for xb, yb in b:
                ax.plot([xa + 0.20, xb - 0.20], [ya, yb], color=SECONDARY, lw=0.7, alpha=0.55, zorder=0)

    ax.text(5, 4.2, "Artificial neural network", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "ann-intro.png")


def diagram_four_phases() -> None:
    fig, ax = plt.subplots(figsize=(10.4, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.4)
    ax.set_ylim(0, 3.6)

    phases = [
        ("1", "Foundations", "Why depth?\nWhat does a\nneuron compute?"),
        ("2", "Optimization", "How does training\nstay stable and\ngeneralize?"),
        ("3", "Architectures", "Images vs\nsequences —\nwhich structure?"),
        ("4", "Autoencoders", "Generation and\nreconstruction"),
    ]
    for i, (n, title, q) in enumerate(phases):
        x = 0.25 + i * 2.55
        rounded_box(ax, x, 0.45, 2.35, 2.55, "", fc=SOFT if i % 2 == 0 else SOFT_2)
        ax.add_patch(Circle((x + 0.38, 2.58), 0.20, fc=PRIMARY, ec=PRIMARY))
        ax.text(x + 0.38, 2.58, n, ha="center", va="center", fontsize=11, color=WHITE, fontweight="bold")
        ax.text(x + 1.35, 2.58, title, ha="center", va="center", fontsize=12, color=PRIMARY, fontweight="bold")
        ax.text(x + 1.17, 1.35, q, ha="center", va="center", fontsize=10, color=INK, linespacing=1.35)
        if i < 3:
            arrow(ax, x + 2.38, 1.7, x + 2.52, 1.7, lw=1.8)
    ax.text(5.2, 3.3, "Four phases of this Deep Learning block", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "four-phases.png")


def diagram_hierarchical() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.2)
    steps = ["Pixels", "Edges", "Textures", "Parts", "Objects"]
    for i, label in enumerate(steps):
        x = 0.35 + i * 1.95
        rounded_box(ax, x, 0.95, 1.7, 1.25, label, fontsize=13, fc=SOFT if i % 2 == 0 else SOFT_2)
        if i < 4:
            arrow(ax, x + 1.75, 1.57, x + 1.9, 1.57)
    ax.text(5, 2.7, "Depth learns hierarchical features", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "hierarchical-features.png")


def main() -> None:
    print(f"Generating Week 2 Session 1 diagrams → {OUT}")
    diagram_ai_ml_dl()
    diagram_three_ingredients()
    diagram_perceptron()
    diagram_mlp()
    diagram_nn_forward()
    diagram_xor()
    diagram_activations()
    diagram_sigmoid_tanh()
    diagram_sigmoid_threshold()
    diagram_forward_pass()
    diagram_backprop()
    diagram_fit_regimes()
    diagram_cnn_architecture()
    diagram_convolution()
    diagram_sobel()
    diagram_cnn_stack()
    diagram_residual()
    diagram_transfer()
    diagram_rnn_unfold()
    diagram_lstm()
    diagram_dropout()
    diagram_feature_scaling()
    diagram_ann_intro()
    diagram_four_phases()
    diagram_hierarchical()
    print("Done.")


if __name__ == "__main__":
    main()
