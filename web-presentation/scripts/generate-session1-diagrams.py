#!/usr/bin/env python3
"""Generate ETRA-branded classroom diagrams for Week 1 Session 1 PPTX."""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Circle
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "session1-diagrams"
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


def rounded_box(ax, x, y, w, h, text, *, fc=SOFT, ec=PRIMARY, fontsize=12, tw=None):
    box = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=1.6,
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
        color=INK,
        fontweight="bold",
        wrap=True,
        linespacing=1.25,
    )
    return box


def arrow(ax, x1, y1, x2, y2, color=SECONDARY):
    ax.annotate(
        "",
        xy=(x2, y2),
        xytext=(x1, y1),
        arrowprops=dict(arrowstyle="-|>", color=color, lw=2.2, mutation_scale=14),
    )


def diagram_ml_process() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.2)
    steps = [
        (0.4, "1\nData Pre-Processing"),
        (3.6, "2\nModelling"),
        (6.8, "3\nEvaluation"),
    ]
    for i, (x, label) in enumerate(steps):
        rounded_box(ax, x, 0.7, 2.6, 1.8, label, fontsize=13, fc=SOFT if i != 1 else SOFT_2)
        if i < 2:
            arrow(ax, x + 2.7, 1.6, steps[i + 1][0] - 0.1, 1.6)
    ax.text(5, 2.9, "The Machine Learning Process", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    save(fig, "ml-process.png")


def diagram_preprocess_pipeline() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.0))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3)
    steps = ["Clean", "Scale", "Encode", "Split"]
    for i, label in enumerate(steps):
        x = 0.35 + i * 2.45
        rounded_box(ax, x, 0.85, 2.0, 1.35, f"{i + 1}\n{label}", fontsize=13)
        if i < 3:
            arrow(ax, x + 2.05, 1.5, x + 2.35, 1.5)
    ax.text(5, 2.55, "Standard Preprocessing Workflow", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "preprocess-pipeline.png")


def diagram_train_test_split() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.4)

    # Full dataset bar
    ax.add_patch(FancyBboxPatch((0.5, 2.3), 9, 0.55, boxstyle="round,pad=0.02,rounding_size=0.06", fc=LINE, ec=LINE))
    ax.text(5, 2.57, "Full Dataset", ha="center", va="center", fontsize=11, color=MUTED, fontweight="bold")

    arrow(ax, 5, 2.25, 5, 1.85)

    # Train 80%
    ax.add_patch(FancyBboxPatch((0.5, 0.55), 7.0, 1.15, boxstyle="round,pad=0.02,rounding_size=0.08", fc=SOFT, ec=PRIMARY, lw=1.8))
    ax.text(4.0, 1.12, "Training Set  ·  80%", ha="center", va="center", fontsize=14, color=PRIMARY, fontweight="bold")

    # Test 20%
    ax.add_patch(FancyBboxPatch((7.7, 0.55), 1.8, 1.15, boxstyle="round,pad=0.02,rounding_size=0.08", fc=SOFT_2, ec=SECONDARY, lw=1.8))
    ax.text(8.6, 1.12, "Test\n20%", ha="center", va="center", fontsize=12, color=SECONDARY, fontweight="bold")

    ax.text(5, 3.15, "Train / Test Split", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "train-test-split.png")


def diagram_scaling_before_after() -> None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.6))
    fig.patch.set_facecolor(SURFACE)

    labels = ["Age", "Salary", "Score"]
    before = [25, 90000, 75]
    after = [0.25, 0.90, 0.75]

    for ax, title, vals, ylim in [
        (axes[0], "Before scaling", before, (0, 100000)),
        (axes[1], "After scaling", after, (0, 1.1)),
    ]:
        style_ax(ax, spines=True)
        ax.set_facecolor(SURFACE)
        for s in ax.spines.values():
            s.set_color(LINE)
        ax.set_xticks(range(len(labels)))
        ax.set_xticklabels(labels, fontsize=11, color=MUTED)
        ax.set_yticks([])
        ax.set_ylim(*ylim)
        ax.set_title(title, fontsize=12, color=PRIMARY, fontweight="bold", pad=10)
        colors = [PRIMARY, SECONDARY, PRIMARY]
        bars = ax.bar(labels, vals, color=colors, width=0.55, edgecolor=WHITE, linewidth=1)
        for bar, v in zip(bars, vals):
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() * 1.02 if ylim[1] > 2 else bar.get_height() + 0.04,
                f"{v:,}" if v >= 10 else f"{v:.2f}",
                ha="center",
                va="bottom",
                fontsize=10,
                color=INK,
                fontweight="bold",
            )

    fig.suptitle("Feature Scaling — comparable ranges", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "scaling-before-after.png")


def diagram_normalization() -> None:
    fig, ax = plt.subplots(figsize=(9.5, 3.0))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3)

    # Original axis
    ax.plot([0.8, 9.2], [2.1, 2.1], color=LINE, lw=6, solid_capstyle="round")
    for x, lab in [(0.8, "20"), (3.5, "40"), (5.5, "60"), (7.5, "80"), (9.2, "100")]:
        ax.plot(x, 2.1, "o", color=PRIMARY, markersize=10)
        ax.text(x, 2.45, lab, ha="center", fontsize=10, color=MUTED)
    ax.text(0.3, 2.1, "x", ha="right", va="center", fontsize=12, color=INK, fontweight="bold")

    arrow(ax, 5, 1.75, 5, 1.25)

    # Normalized axis
    ax.plot([0.8, 9.2], [0.7, 0.7], color=SOFT, lw=8, solid_capstyle="round")
    ax.plot([0.8, 9.2], [0.7, 0.7], color=PRIMARY, lw=2.5, solid_capstyle="round")
    for x, lab in [(0.8, "0"), (3.5, "0.25"), (5.5, "0.50"), (7.5, "0.75"), (9.2, "1")]:
        ax.plot(x, 0.7, "o", color=SECONDARY, markersize=10)
        ax.text(x, 0.28, lab, ha="center", fontsize=10, color=MUTED)
    ax.text(0.3, 0.7, "xₙₒᵣₘ", ha="right", va="center", fontsize=11, color=INK, fontweight="bold")

    ax.text(5, 2.85, "Min-Max Normalization → [0, 1]", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "normalization-scale.png")


def diagram_standardization() -> None:
    fig, ax = plt.subplots(figsize=(9.5, 3.4))
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)

    xs = np.linspace(-3.5, 3.5, 200)
    ys = np.exp(-0.5 * xs**2) / np.sqrt(2 * np.pi)
    ax.fill_between(xs, ys, color=SOFT, alpha=0.95)
    ax.plot(xs, ys, color=PRIMARY, lw=2.5)
    ax.axvline(0, color=SECONDARY, lw=2, linestyle="--")
    ax.set_xticks([-2, -1, 0, 1, 2])
    ax.set_xticklabels(["−2σ", "−1σ", "μ = 0", "+1σ", "+2σ"], fontsize=11, color=MUTED)
    ax.set_yticks([])
    ax.set_title("Standardization — centered at 0, scaled by σ", fontsize=13, color=PRIMARY, fontweight="bold", pad=10)
    save(fig, "standardization-curve.png")


def diagram_encoding_label_vs_onehot() -> None:
    fig, axes = plt.subplots(1, 2, figsize=(10, 3.6))
    fig.patch.set_facecolor(SURFACE)

    # Label encoding
    ax = axes[0]
    style_ax(ax)
    ax.set_xlim(0, 5)
    ax.set_ylim(0, 5)
    ax.set_title("Label Encoding", fontsize=12, color=PRIMARY, fontweight="bold")
    rows = [("Red", "0"), ("Green", "1"), ("Blue", "2")]
    for i, (cat, code) in enumerate(rows):
        y = 3.6 - i * 1.1
        rounded_box(ax, 0.4, y, 1.8, 0.8, cat, fontsize=11, fc=SOFT)
        arrow(ax, 2.4, y + 0.4, 2.9, y + 0.4)
        rounded_box(ax, 3.1, y, 1.3, 0.8, code, fontsize=14, fc=SOFT_2, ec=SECONDARY)

    # One-hot
    ax = axes[1]
    style_ax(ax)
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 5)
    ax.set_title("One-Hot Encoding", fontsize=12, color=PRIMARY, fontweight="bold")
    headers = ["R", "G", "B"]
    data = [("Red", [1, 0, 0]), ("Green", [0, 1, 0]), ("Blue", [0, 0, 1])]
    for j, h in enumerate(headers):
        ax.text(2.2 + j * 1.1, 4.3, h, ha="center", fontsize=11, color=MUTED, fontweight="bold")
    for i, (cat, vec) in enumerate(data):
        y = 3.4 - i * 1.05
        rounded_box(ax, 0.25, y, 1.5, 0.75, cat, fontsize=11, fc=SOFT)
        for j, v in enumerate(vec):
            fc = PRIMARY if v == 1 else SOFT_2
            tc = WHITE if v == 1 else MUTED
            box = FancyBboxPatch(
                (1.85 + j * 1.1, y),
                0.9,
                0.75,
                boxstyle="round,pad=0.02,rounding_size=0.06",
                fc=fc,
                ec=PRIMARY if v == 1 else LINE,
                lw=1.2,
            )
            ax.add_patch(box)
            ax.text(2.3 + j * 1.1, y + 0.37, str(v), ha="center", va="center", fontsize=13, color=tc, fontweight="bold")

    fig.suptitle("Categorical Encoding", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "encoding-label-vs-onehot.png")


def diagram_missing_types() -> None:
    fig, axes = plt.subplots(1, 3, figsize=(10.5, 3.5))
    fig.patch.set_facecolor(SURFACE)
    titles = ["MCAR", "MAR", "MNAR"]
    captions = [
        "Random gaps\nno pattern",
        "Depends on\nobserved X",
        "Depends on\nmissing Y itself",
    ]

    rng = np.random.default_rng(7)
    for ax, title, cap, kind in zip(axes, titles, captions, ["mcar", "mar", "mnar"]):
        style_ax(ax)
        ax.set_xlim(-0.5, 4.5)
        ax.set_ylim(-0.5, 5.5)
        ax.set_title(title, fontsize=13, color=PRIMARY, fontweight="bold")

        # grid of cells: rows=samples, cols=features X,Y
        # MAR: mark high-X rows; MNAR: mark that Y itself is the cause (high Y hidden)
        for r in range(5):
            x_high = r in (0, 1)
            for c, feat in enumerate(["X", "Y"]):
                missing = False
                cell_label = feat
                if kind == "mcar":
                    missing = (r, c) in {(1, 0), (2, 1), (4, 0)}
                elif kind == "mar":
                    # Y missing when X is high (observed driver)
                    missing = c == 1 and x_high
                    if c == 0 and x_high:
                        cell_label = "X↑"
                else:  # mnar — Y missing because Y would be high
                    missing = c == 1 and r in (0, 1)
                    if missing:
                        cell_label = "Y↑?"

                x, y = c * 1.7 + 0.6, 4.2 - r * 0.75
                fc = "#F3D6D0" if missing else (SOFT_2 if cell_label == "X↑" else SOFT)
                ec = ACCENT_WARN if missing else (SECONDARY if cell_label == "X↑" else PRIMARY)
                ax.add_patch(
                    FancyBboxPatch(
                        (x, y),
                        1.35,
                        0.55,
                        boxstyle="round,pad=0.01,rounding_size=0.05",
                        fc=fc,
                        ec=ec,
                        lw=1.3,
                    )
                )
                ax.text(
                    x + 0.67,
                    y + 0.27,
                    "Missing" if missing and kind != "mnar" else ("Missing" if missing else cell_label),
                    ha="center",
                    va="center",
                    fontsize=8,
                    color=ACCENT_WARN if missing else MUTED,
                    fontweight="bold",
                )

        ax.text(2, -0.15, cap, ha="center", va="top", fontsize=10, color=MUTED)

    fig.suptitle("Types of Missing Data", fontsize=13, color=PRIMARY, fontweight="bold", y=1.02)
    save(fig, "missing-mcar-mar-mnar.png")


def diagram_knn_neighbors() -> None:
    fig, ax = plt.subplots(figsize=(9.5, 3.8))
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)

    # Grade vs Attendance; Study hours as annotation
    pts = {
        "A": (90, 95, 8),
        "B": (88, 92, 7),
        "C": (91, 96, None),
        "D": (70, 75, 3),
    }
    for name, (g, a, h) in pts.items():
        if name == "C":
            ax.scatter([g], [a], s=320, color=SECONDARY, zorder=3, edgecolors=WHITE, linewidths=2)
            ax.text(g + 0.7, a + 0.6, f"{name}  (missing hours)", fontsize=11, color=SECONDARY, fontweight="bold")
        elif name in ("A", "B"):
            ax.scatter([g], [a], s=260, color=PRIMARY, zorder=3, edgecolors=WHITE, linewidths=2)
            ax.text(g + 0.7, a - 1.2, f"{name}  hours={h}", fontsize=10, color=PRIMARY, fontweight="bold")
        else:
            ax.scatter([g], [a], s=200, color=LINE, zorder=2, edgecolors=MUTED, linewidths=1)
            ax.text(g + 0.7, a - 1.0, f"{name}  hours={h}", fontsize=10, color=MUTED)

    # circle around C covering A,B
    circ = Circle((91, 96), 5.5, fill=False, edgecolor=SECONDARY, lw=1.8, linestyle="--")
    ax.add_patch(circ)
    ax.plot([91, 90], [96, 95], color=SECONDARY, lw=1.5, alpha=0.7)
    ax.plot([91, 88], [96, 92], color=SECONDARY, lw=1.5, alpha=0.7)

    ax.set_xlabel("Grade", fontsize=11, color=MUTED)
    ax.set_ylabel("Attendance %", fontsize=11, color=MUTED)
    ax.set_xlim(65, 100)
    ax.set_ylim(70, 102)
    ax.set_title("kNN Imputation (k = 2) — neighbors of C are A & B", fontsize=12, color=PRIMARY, fontweight="bold")
    save(fig, "knn-neighbors.png")


def diagram_missingness_indicator() -> None:
    fig, ax = plt.subplots(figsize=(9.5, 3.2))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.2)

    headers = ["Participant", "Stress (imputed)", "Was_Missing"]
    rows = [
        ["1", "2.0", "0"],
        ["2", "4.1", "1"],
        ["3", "3.0", "0"],
        ["4", "4.3", "1"],
    ]
    col_x = [1.0, 4.0, 7.4]
    widths = [2.2, 2.6, 2.0]

    for x, w, h in zip(col_x, widths, headers):
        ax.add_patch(
            FancyBboxPatch(
                (x, 2.35),
                w,
                0.55,
                boxstyle="round,pad=0.01,rounding_size=0.05",
                fc=PRIMARY,
                ec=PRIMARY,
                lw=1.2,
            )
        )
        ax.text(x + w / 2, 2.62, h, ha="center", va="center", fontsize=10, color=WHITE, fontweight="bold")

    for i, row in enumerate(rows):
        y = 1.65 - i * 0.5
        for x, w, val in zip(col_x, widths, row):
            fc = "#F3D6D0" if val == "1" else SOFT
            ec = ACCENT_WARN if val == "1" else LINE
            ax.add_patch(
                FancyBboxPatch((x, y), w, 0.42, boxstyle="round,pad=0.01,rounding_size=0.04", fc=fc, ec=ec, lw=1.1)
            )
            ax.text(x + w / 2, y + 0.21, val, ha="center", va="center", fontsize=11, color=INK, fontweight="bold")

    ax.text(5, 3.05, "Preserve the missingness pattern with an indicator column", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")
    save(fig, "missingness-indicator.png")


def diagram_data_leakage() -> None:
    fig, ax = plt.subplots(figsize=(10, 3.4))
    style_ax(ax)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.4)

    rounded_box(ax, 0.4, 1.1, 2.8, 1.4, "Training\nSet", fontsize=13, fc=SOFT)
    rounded_box(ax, 6.8, 1.1, 2.8, 1.4, "Test\nSet", fontsize=13, fc=SOFT_2, ec=SECONDARY)

    # Contaminating arrow from test into train
    ax.annotate(
        "",
        xy=(3.3, 1.8),
        xytext=(6.7, 1.8),
        arrowprops=dict(arrowstyle="-|>", color=ACCENT_WARN, lw=2.8, mutation_scale=16),
    )
    ax.text(5, 2.35, "Test info leaks\ninto training", ha="center", fontsize=11, color=ACCENT_WARN, fontweight="bold")

    ax.add_patch(Circle((5, 0.55), 0.28, fc=ACCENT_WARN, ec=ACCENT_WARN))
    ax.text(5.5, 0.55, "Optimistic / invalid scores", ha="left", va="center", fontsize=11, color=ACCENT_WARN, fontweight="bold")
    ax.text(5, 3.15, "Data Leakage — keep test data unseen", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "data-leakage.png")


def main() -> None:
    print(f"Generating Session 1 diagrams → {OUT}")
    diagram_ml_process()
    diagram_preprocess_pipeline()
    diagram_train_test_split()
    diagram_scaling_before_after()
    diagram_normalization()
    diagram_standardization()
    diagram_encoding_label_vs_onehot()
    diagram_missing_types()
    diagram_knn_neighbors()
    diagram_missingness_indicator()
    diagram_data_leakage()
    print("Done.")


if __name__ == "__main__":
    main()
