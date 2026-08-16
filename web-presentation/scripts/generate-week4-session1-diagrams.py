#!/usr/bin/env python3
"""Fetch Wikimedia originals and generate custom diagrams for Week 4 Session 1."""

from __future__ import annotations

import io
import time
import urllib.error
import urllib.request
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Rectangle

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "session-w4s1-diagrams"
OUT.mkdir(parents=True, exist_ok=True)

PRIMARY = "#5234B7"
SECONDARY = "#9E59CD"
SOFT = "#EEE8FA"
SOFT_2 = "#F5F1FC"
SURFACE = "#FAF8FF"
INK = "#121018"
MUTED = "#5A5470"
WHITE = "#FFFFFF"

WIKI_UA = "ETRA-GenAI-Slides/1.0 (educational classroom deck; Week 4 Session 1)"
WIKI_ORIGINALS = [
    (
        "transformer-full.png",
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png",
    ),
    (
        "gpt-architecture.png",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg",
    ),
    (
        "attention-architecture.png",
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png",
    ),
]


def _http_get(url: str, retries: int = 4) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": WIKI_UA})
    delay = 1.5
    last_err: Exception | None = None
    for _ in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                return resp.read()
        except urllib.error.HTTPError as exc:
            last_err = exc
            if exc.code in (429, 503):
                time.sleep(delay)
                delay *= 2
                continue
            raise
    assert last_err is not None
    raise last_err


def _raster_to_png(data: bytes, dest: Path) -> None:
    from PIL import Image as PILImage

    im = PILImage.open(io.BytesIO(data))
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA")
    w, h = im.size
    if w > 1800:
        h = int(h * (1800 / w))
        im = im.resize((1800, max(1, h)), PILImage.Resampling.LANCZOS)
    im.save(dest, format="PNG")


def style_ax(ax) -> None:
    ax.set_facecolor(SURFACE)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.set_xticks([])
    ax.set_yticks([])


def save(fig, name: str) -> None:
    path = OUT / name
    fig.savefig(path, dpi=160, bbox_inches="tight", facecolor=SURFACE, pad_inches=0.15)
    plt.close(fig)
    print(f"  wrote {name}")


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
    if text:
        ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=fontsize, color=color, fontweight="bold")


def arrow(ax, x1, y1, x2, y2, *, color=SECONDARY, lw=2.0) -> None:
    ax.add_patch(
        FancyArrowPatch(
            (x1, y1),
            (x2, y2),
            arrowstyle="-|>",
            mutation_scale=12,
            linewidth=lw,
            color=color,
        )
    )


def diagram_encoding_comparison() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    ax.text(5.3, 3.2, "Encoding Comparison", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 2.82, "Three ways to encode categorical variables", ha="center", fontsize=12, color=MUTED)
    panels = ["One-Hot", "Dummy", "Ordinal"]
    for i, title in enumerate(panels):
        x = 0.4 + i * 3.4
        rounded_box(ax, x, 0.45, 3.05, 2.05, "", fc=SOFT if i != 2 else SOFT_2)
        ax.text(x + 1.52, 1.95, title, ha="center", fontsize=16, color=PRIMARY, fontweight="bold")
        for j in range(3):
            ax.add_patch(
                plt.Rectangle(
                    (x + 0.55 + j * 0.7, 0.75),
                    0.5,
                    0.7,
                    facecolor=PRIMARY if j == i else SOFT_2,
                    edgecolor=PRIMARY,
                    lw=1.1,
                    alpha=0.9 if j == i else 0.45,
                )
            )
    save(fig, "encoding-comparison.png")


def _hex_to_rgb(hex_color: str) -> tuple[float, float, float]:
    h = hex_color.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def diagram_attention_heatmap() -> None:
    tokens = ["The", "cat", "sat", "on", "mat"]
    weights = [
        [55, 20, 10, 8, 7],
        [15, 50, 15, 10, 10],
        [8, 22, 45, 15, 10],
        [5, 10, 20, 25, 40],
        [10, 15, 10, 20, 45],
    ]
    fig, ax = plt.subplots(figsize=(8.6, 5.6))
    style_ax(ax)
    ax.set_xlim(0, 8.6)
    ax.set_ylim(0, 5.6)
    ax.text(4.3, 5.32, "Attention Heatmap", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    ax.text(4.3, 4.95, "How each token attends to others", ha="center", fontsize=12, color=MUTED)

    origin_x, origin_y = 1.7, 0.58
    cell = 0.78
    pr, pg, pb = _hex_to_rgb(PRIMARY)
    sr, sg, sb = _hex_to_rgb(SURFACE)
    header_y = origin_y + 5 * cell + 0.22
    for j, tok in enumerate(tokens):
        ax.text(
            origin_x + (j + 0.5) * cell,
            header_y,
            tok,
            ha="center",
            va="center",
            fontsize=12,
            color=PRIMARY,
            fontweight="bold",
        )
    for i, row in enumerate(weights):
        y = origin_y + (4 - i) * cell
        ax.text(
            origin_x - 0.14,
            y + 0.5 * cell,
            tokens[i],
            ha="right",
            va="center",
            fontsize=12,
            color=PRIMARY,
            fontweight="bold",
        )
        peak = max(row)
        for j, val in enumerate(row):
            x = origin_x + j * cell
            t = 0.12 + (val / 100) * 0.75
            fc = (sr * (1 - t) + pr * t, sg * (1 - t) + pg * t, sb * (1 - t) + pb * t)
            ax.add_patch(
                Rectangle(
                    (x + 0.04, y + 0.04),
                    cell - 0.08,
                    cell - 0.08,
                    facecolor=fc,
                    edgecolor=PRIMARY,
                    lw=1.2 if val == peak else 0.55,
                )
            )
            tc = WHITE if val >= 40 else INK
            ax.text(
                x + cell / 2,
                y + cell / 2,
                str(val),
                ha="center",
                va="center",
                fontsize=12,
                color=tc,
                fontweight="bold",
            )
    ax.text(4.3, 0.22, "Darker cells = stronger attention weight", ha="center", fontsize=12, color=MUTED)
    save(fig, "attention-heatmap.png")


def diagram_transformer_block() -> None:
    fig, ax = plt.subplots(figsize=(7.2, 4.6))
    style_ax(ax)
    ax.set_xlim(0, 7.2)
    ax.set_ylim(0, 4.6)
    rounded_box(ax, 1.9, 3.15, 3.4, 0.85, "Self-Attention", fontsize=16, fc=SOFT)
    arrow(ax, 3.6, 3.12, 3.6, 2.72, lw=1.8)
    rounded_box(ax, 1.9, 1.75, 3.4, 0.85, "Feed-Forward", fontsize=16, fc=SOFT_2)
    arrow(ax, 3.6, 1.72, 3.6, 1.32, lw=1.8)
    ax.text(3.6, 0.95, "Output", ha="center", va="center", fontsize=16, color=PRIMARY, fontweight="bold")
    ax.text(3.6, 0.32, "Transformer encoder block (simplified)", ha="center", fontsize=12, color=MUTED)
    save(fig, "transformer-block.png")


def diagram_tokenization_flow() -> None:
    """SentencePiece-style split of “Hello world” into 4 tokens."""
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    ax.text(5.3, 3.32, "Tokenization Flow", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 2.95, "Text  →  subword tokens", ha="center", fontsize=12, color=MUTED)
    ax.text(5.3, 2.52, "Hello world", ha="center", fontsize=20, color=PRIMARY, fontweight="bold")
    tokens = [r"▁Hel", "lo", r"▁wor", "ld"]
    for i, tok in enumerate(tokens):
        x = 0.55 + i * 2.5
        rounded_box(
            ax,
            x,
            0.95,
            2.25,
            1.05,
            tok,
            fontsize=18,
            fc=PRIMARY if i % 2 == 0 else SOFT,
            color=WHITE if i % 2 == 0 else PRIMARY,
        )
        if i < 3:
            arrow(ax, x + 2.28, 1.47, x + 2.47, 1.47, lw=1.5)
    ax.text(5.3, 0.38, '"Hello world"  →  4 tokens', ha="center", fontsize=13, color=INK, fontweight="bold")
    save(fig, "tokenization-flow.png")


def fetch_wikimedia_originals() -> None:
    from PIL import Image as PILImage

    for i, (name, url) in enumerate(WIKI_ORIGINALS):
        dest = OUT / name
        if dest.is_file():
            print(f"  skip {name} (exists)")
            continue
        print(f"  fetching {name}")
        if i:
            time.sleep(1.2)
        data = _http_get(url)
        if url.lower().endswith(".svg"):
            import cairosvg

            cairosvg.svg2png(bytestring=data, write_to=str(dest), output_width=1600)
        else:
            _raster_to_png(data, dest)
        with PILImage.open(dest) as im:
            print(f"  wrote {name} ({im.size[0]}x{im.size[1]})")


def main() -> None:
    print(f"Week 4 Session 1 diagrams → {OUT}")
    fetch_wikimedia_originals()
    diagram_tokenization_flow()
    diagram_encoding_comparison()
    diagram_attention_heatmap()
    diagram_transformer_block()
    print("Done.")


if __name__ == "__main__":
    main()
