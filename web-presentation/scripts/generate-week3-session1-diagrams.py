#!/usr/bin/env python3
"""Generate ETRA-branded classroom diagrams for Week 3 Session 1 PPTX."""

from __future__ import annotations

import io
import urllib.request
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle, FancyArrowPatch, FancyBboxPatch, Rectangle

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "session-w3s1-diagrams"
OUT.mkdir(parents=True, exist_ok=True)

WIKI_UA = "ETRA-NLP-Slides/1.0 (educational classroom deck; Week 3 Session 1)"
WIKI_ORIGINALS = [
    (
        "linguistic-levels.png",
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Major_levels_of_linguistic_structure.svg",
    ),
    (
        "google-ngram.png",
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Google_Ngram.png",
    ),
    (
        "rnn-unfold.png",
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg",
    ),
    (
        "gru-cell.png",
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg",
    ),
    (
        "attention-architecture.png",
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png",
    ),
    (
        "seq2seq-attention.png",
        "https://upload.wikimedia.org/wikipedia/commons/3/37/Seq2seq_with_RNN_and_attention_mechanism.gif",
    ),
]

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


def _http_get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": WIKI_UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def _svg_to_png(data: bytes, dest: Path, width: int = 1600) -> None:
    import cairosvg

    cairosvg.svg2png(bytestring=data, write_to=str(dest), output_width=width)


def _raster_to_png(data: bytes, dest: Path, *, gif_frame: float = 0.65) -> None:
    from PIL import Image as PILImage

    im = PILImage.open(io.BytesIO(data))
    if getattr(im, "is_animated", False) and getattr(im, "n_frames", 1) > 1:
        idx = min(im.n_frames - 1, max(0, int(im.n_frames * gif_frame)))
        im.seek(idx)
        im = im.convert("RGBA")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA")
    elif im.mode == "P":
        im = im.convert("RGBA")
    w, h = im.size
    if w > 1800:
        h = int(h * (1800 / w))
        im = im.resize((1800, max(1, h)), PILImage.Resampling.LANCZOS)
    im.save(dest, format="PNG")


def fetch_wikimedia_originals() -> None:
    """Download the workshop Wikimedia figures students will recognize elsewhere."""
    for name, url in WIKI_ORIGINALS:
        dest = OUT / name
        print(f"  fetching {name}")
        data = _http_get(url)
        lower = url.lower()
        if lower.endswith(".svg"):
            _svg_to_png(data, dest)
        else:
            _raster_to_png(data, dest)
        from PIL import Image as PILImage

        with PILImage.open(dest) as im:
            print(f"  wrote {name} ({im.size[0]}x{im.size[1]})")


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
    from PIL import Image as PILImage

    with PILImage.open(path) as im:
        w, h = im.size
    if h > 1200 or (w > 0 and h / w > 2.2):
        print(f"  warning: {path.name} is {w}x{h} — retrying without tight bbox")
        fig.savefig(path, dpi=160, bbox_inches=None, facecolor=SURFACE, pad_inches=0.15)
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
    if text:
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


def diagram_linguistic_levels() -> None:
    """Wikimedia major linguistic levels (slide image 1), redrawn in ETRA colors."""
    fig, ax = plt.subplots(figsize=(7.2, 4.4))
    style_ax(ax)
    ax.set_xlim(0, 7.2)
    ax.set_ylim(0, 4.4)
    levels = [
        ("PRAGMATICS", "meaning in context of discourse"),
        ("SEMANTICS", "literal meaning of phrases and sentences"),
        ("SYNTAX", "phrases and sentences"),
        ("MORPHOLOGY", "words and signs"),
        ("PHONOLOGY", "phonemes and cheremes"),
        ("PHONETICS", "speech and sign components"),
    ]
    n = len(levels)
    cy, top, bottom = 3.6, 3.95, 0.28
    for i, (title, cap) in enumerate(levels):
        t = i / (n - 1)
        half = 1.15 + t * 1.85
        y1 = top - (i + 1) * ((top - bottom) / n)
        y0 = top - i * ((top - bottom) / n)
        xs = [cy - half, cy + half, cy + half + 0.22, cy - half - 0.22]
        ys = [y0 - 0.02, y0 - 0.02, y1 + 0.02, y1 + 0.02]
        fc = PRIMARY if i == 0 else (SOFT_2 if i % 2 else SOFT)
        tc = WHITE if i == 0 else PRIMARY
        ax.fill(xs, ys, facecolor=fc, edgecolor=PRIMARY, linewidth=1.35, zorder=2)
        ax.text(cy, (y0 + y1) / 2 + 0.08, title, ha="center", va="center", fontsize=11, color=tc, fontweight="bold", zorder=3)
        ax.text(cy, (y0 + y1) / 2 - 0.14, cap, ha="center", va="center", fontsize=8, color=WHITE if i == 0 else MUTED, zorder=3)
    ax.text(3.6, 4.22, "Major levels of linguistic structure", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")
    save(fig, "linguistic-levels.png")


def diagram_ambiguity() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.35, 1.35, 3.3, 1.15, '"The bank is closed"', fontsize=13)
    arrow(ax, 3.75, 1.92, 4.35, 1.92)
    rounded_box(ax, 4.5, 2.15, 5.7, 0.85, "A  ·  financial institution", fontsize=13, fc=SOFT)
    rounded_box(ax, 4.5, 0.7, 5.7, 0.85, "B  ·  river bank", fontsize=13, fc=SOFT_2, ec=ACCENT_WARN)
    ax.text(5.3, 3.3, "One string, two valid interpretations", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "ambiguity.png")


def diagram_regex() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.35, 0.7, 3.0, 2.15, "Pattern\n\\\\d+", fontsize=16)
    arrow(ax, 3.5, 1.77, 4.15, 1.77)
    rounded_box(ax, 4.3, 0.7, 2.7, 2.15, "Engine\nmatch / extract", fontsize=14, fc=SOFT_2, ec=SECONDARY)
    arrow(ax, 7.15, 1.77, 7.8, 1.77)
    rounded_box(ax, 7.95, 0.7, 2.3, 2.15, "Hit\n2026", fontsize=16, fc=PRIMARY, color=WHITE)
    ax.text(5.3, 3.25, "Regex is a compact pattern language for text", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "regex-core.png")


def diagram_cleaning() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.7))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.7)
    steps = ["HTML", "URLs", "Mentions", "Emoji", "Spaces"]
    for i, label in enumerate(steps):
        x = 0.3 + i * 2.05
        rounded_box(ax, x, 1.05, 1.85, 1.45, f"{i + 1}\n{label}", fontsize=13, fc=SOFT if i % 2 == 0 else SOFT_2)
        if i < 4:
            arrow(ax, x + 1.88, 1.77, x + 2.02, 1.77, lw=1.6)
    ax.text(5.3, 3.25, "Cleaning pipeline — raw web text → tokenizer-ready string", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 0.45, "Each stage is usually one regex (or encode) step", ha="center", fontsize=11, color=MUTED)
    save(fig, "cleaning-pipeline.png")


def diagram_tokenize() -> None:
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
        rounded_box(ax, x, 0.95, 2.25, 1.05, tok, fontsize=18, fc=PRIMARY if i % 2 == 0 else SOFT, color=WHITE if i % 2 == 0 else PRIMARY)
        if i < 3:
            arrow(ax, x + 2.28, 1.47, x + 2.47, 1.47, lw=1.5)
    ax.text(5.3, 0.38, '"Hello world"  →  4 tokens', ha="center", fontsize=13, color=INK, fontweight="bold")
    save(fig, "hello-world-tokens.png")


def diagram_bpe() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    steps = ["l o w", "lo  w", "low", "low + er + ed"]
    for i, lab in enumerate(steps):
        x = 0.3 + i * 2.55
        fc = PRIMARY if i == 3 else (SOFT_2 if i == 2 else SOFT)
        tc = WHITE if i == 3 else INK
        rounded_box(ax, x, 1.05, 2.3, 1.4, lab, fontsize=13, fc=fc, color=tc)
        if i < 3:
            arrow(ax, x + 2.35, 1.75, x + 2.5, 1.75, lw=1.6)
    ax.text(5.3, 3.2, "BPE: merge frequent pairs, then split unseen words", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 0.5, "lowered → ['low', 'er', 'ed']", ha="center", fontsize=12, color=MUTED)
    save(fig, "bpe-merge.png")


def diagram_stem_lemma() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.35, 1.35, 2.4, 1.15, "studying", fontsize=16)
    arrow(ax, 2.9, 2.35, 3.5, 2.35)
    arrow(ax, 2.9, 1.5, 3.5, 1.5)
    rounded_box(ax, 3.65, 2.0, 3.1, 0.9, "Stem  →  studi", fontsize=14, fc=SOFT, ec=ACCENT_WARN)
    rounded_box(ax, 3.65, 0.75, 3.1, 0.9, "Lemma  →  study", fontsize=14, fc=SOFT_2, ec=ACCENT_OK)
    ax.text(8.35, 2.45, "heuristic chop", ha="center", fontsize=11, color=ACCENT_WARN)
    ax.text(8.35, 1.2, "dictionary + POS", ha="center", fontsize=11, color=ACCENT_OK)
    ax.text(5.3, 3.25, "Stemming is fast; lemmatization keeps real words", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "stem-lemma.png")


def diagram_pos() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    tokens = [("Tesla", "PROPN"), ("is", "AUX"), ("building", "VERB"), ("cars", "NOUN"), ("quickly", "ADV")]
    for i, (tok, tag) in enumerate(tokens):
        x = 0.35 + i * 2.05
        rounded_box(ax, x, 1.55, 1.9, 0.85, tok, fontsize=14)
        ax.text(x + 0.95, 1.1, tag, ha="center", fontsize=12, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 3.15, "POS tagging — a grammar label on every token", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "pos-tags.png")


def diagram_ner() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    spans = [
        (0.4, 3.1, "Tim Cook", "PERSON", PRIMARY),
        (3.7, 2.6, "Apple", "ORG", SECONDARY),
        (6.5, 3.5, "$430B", "MONEY", ACCENT_OK),
    ]
    for x, w, tok, lab, col in spans:
        rounded_box(ax, x, 1.35, w, 1.15, f"{tok}\n{lab}", fontsize=14, fc=SOFT, ec=col)
    ax.text(5.3, 3.15, "NER — typed spans over text, not one tag per word", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "ner-spans.png")


def diagram_spacy() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    steps = ["doc", "tokens", "lemmas", "POS", "entities"]
    for i, lab in enumerate(steps):
        x = 0.3 + i * 2.05
        fc = PRIMARY if lab == "doc" else SOFT
        tc = WHITE if lab == "doc" else INK
        rounded_box(ax, x, 1.15, 1.85, 1.2, lab, fontsize=14, fc=fc, color=tc)
        if i < 4:
            arrow(ax, x + 1.88, 1.75, x + 2.02, 1.75, lw=1.6)
    ax.text(5.3, 3.1, "One SpaCy doc carries tokens, lemmas, POS, and entities", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "spacy-pipeline.png")


def diagram_google_ngram() -> None:
    """Wikimedia-style Google Ngram (slide image 1), redrawn in ETRA colors."""
    fig, ax = plt.subplots(figsize=(7.4, 4.2))
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    years = np.linspace(1800, 2000, 220)
    t = (years - 1800) / 200
    series = [
        ("data", 0.02 + 0.55 * (1 / (1 + np.exp(-12 * (t - 0.78)))), PRIMARY),
        ("information", 0.08 + 0.28 * t + 0.12 * np.sin(2.2 * np.pi * t) ** 2, SECONDARY),
        ("computer", 0.01 + 0.48 * np.clip((t - 0.72) / 0.28, 0, 1) ** 1.4, ACCENT_OK),
    ]
    for name, y, color in series:
        ax.plot(years, y, color=color, lw=2.4, label=name)
    ax.set_xlim(1800, 2000)
    ax.set_ylim(0, 0.72)
    ax.set_xticks([1800, 1850, 1900, 1950, 2000])
    ax.tick_params(colors=MUTED, labelsize=9)
    ax.set_yticks([])
    ax.set_ylabel("relative frequency", fontsize=10, color=MUTED)
    ax.legend(frameon=False, fontsize=10, loc="upper left")
    ax.set_title("Google Books Ngram — counts over time", fontsize=12, color=PRIMARY, fontweight="bold", pad=10)
    save(fig, "google-ngram.png")


def diagram_ngram() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    toks = [r"$w_{t-2}$", r"$w_{t-1}$", r"$w_t$"]
    for i, lab in enumerate(toks):
        x = 0.7 + i * 2.35
        fc = PRIMARY if i == 2 else SOFT
        tc = WHITE if i == 2 else INK
        rounded_box(ax, x, 1.2, 2.05, 1.2, lab, fontsize=16, fc=fc, color=tc)
        if i < 2:
            arrow(ax, x + 2.1, 1.8, x + 2.3, 1.8)
    rounded_box(ax, 7.55, 1.2, 2.55, 1.2, r"$P(w_t \mid h)$", fontsize=15, fc=SOFT_2, ec=SECONDARY)
    ax.text(5.3, 3.2, "N-gram LM: predict the next token from a short window", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "ngram-window.png")


def diagram_log_probs() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    rounded_box(ax, 0.35, 0.7, 4.7, 2.15, "Product space\n$p_1 \\times p_2 \\times \\cdots$\nunderflow", fontsize=14, fc=SOFT)
    rounded_box(ax, 5.55, 0.7, 4.7, 2.15, "Log space\n$\\log p_1 + \\log p_2 + \\cdots$\nstable sums", fontsize=14, fc=SOFT_2, ec=SECONDARY)
    ax.text(5.3, 3.2, "Score sequences in log space", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "log-probs.png")


def diagram_embedding_space() -> None:
    """Words as vectors in embedding space (slide illustration)."""
    fig, ax = plt.subplots(figsize=(7.2, 4.2))
    style_ax(ax, spines=True)
    ax.set_facecolor(SURFACE)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(LINE)
    ax.spines["bottom"].set_color(LINE)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 6.2)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.plot([0.6, 9.5], [0.7, 0.7], color=LINE, lw=1.4)
    ax.plot([0.6, 0.6], [0.7, 5.7], color=LINE, lw=1.4)
    points = [
        (3.1, 4.2, "king", PRIMARY),
        (4.0, 4.85, "queen", SECONDARY),
        (7.2, 2.15, "cat", ACCENT_OK),
        (8.05, 2.75, "dog", ACCENT_WARN),
    ]
    for x, y, lab, col in points:
        ax.add_patch(Circle((x, y), 0.18, fc=col, ec=col, zorder=3))
        ax.text(x + 0.28, y + 0.12, lab, fontsize=12, color=INK, fontweight="bold")
    ax.text(5.3, 5.9, "Words as vectors in embedding space", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "embedding-space.png")


def diagram_static_contextual() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.7))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.7)
    rounded_box(ax, 0.3, 0.5, 4.85, 2.65, "", fc=SOFT)
    ax.text(2.72, 2.75, "Static  ·  one vector", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    ax.add_patch(Circle((2.72, 1.55), 0.38, fc=PRIMARY, ec=PRIMARY))
    ax.text(2.72, 1.55, "bank", ha="center", va="center", fontsize=11, color=WHITE, fontweight="bold")
    ax.text(2.72, 0.75, "river and finance collide", ha="center", fontsize=11, color=MUTED)

    rounded_box(ax, 5.45, 0.5, 4.85, 2.65, "", fc=SOFT_2, ec=SECONDARY)
    ax.text(7.88, 2.75, "Contextual  ·  depends on neighbors", ha="center", fontsize=12, color=PRIMARY, fontweight="bold")
    ax.add_patch(Circle((6.85, 1.55), 0.38, fc=ACCENT_OK, ec=ACCENT_OK))
    ax.add_patch(Circle((8.9, 1.55), 0.38, fc=ACCENT_WARN, ec=ACCENT_WARN))
    ax.text(6.85, 1.55, "bank", ha="center", va="center", fontsize=10, color=WHITE, fontweight="bold")
    ax.text(8.9, 1.55, "bank", ha="center", va="center", fontsize=10, color=WHITE, fontweight="bold")
    ax.text(6.85, 0.75, "river", ha="center", fontsize=11, color=MUTED)
    ax.text(8.9, 0.75, "finance", ha="center", fontsize=11, color=MUTED)
    ax.text(5.3, 3.4, "Polysemy needs context, not a single lookup table", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "static-vs-contextual.png")


def diagram_rnn_unfold() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.3, 1.25, 1.7, 1.15, "RNN\ncell", fontsize=13, fc=PRIMARY, color=WHITE)
    ax.annotate(
        "",
        xy=(0.5, 2.7),
        xytext=(1.8, 2.7),
        arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=2, mutation_scale=12, connectionstyle="arc3,rad=0.7"),
    )
    ax.text(2.3, 1.8, "=", fontsize=18, color=PRIMARY, fontweight="bold", ha="center")
    xs = [2.9, 5.2, 7.5]
    labels = [r"$x_{t-1}$", r"$x_t$", r"$x_{t+1}$"]
    hs = [r"$h_{t-1}$", r"$h_t$", r"$h_{t+1}$"]
    for i, (x, xt, ht) in enumerate(zip(xs, labels, hs)):
        rounded_box(ax, x, 1.35, 1.7, 0.95, "RNN", fontsize=12)
        ax.text(x + 0.85, 0.8, xt, ha="center", fontsize=11, color=MUTED)
        ax.text(x + 0.85, 2.7, ht, ha="center", fontsize=11, color=PRIMARY, fontweight="bold")
        arrow(ax, x + 0.85, 1.15, x + 0.85, 1.32, color=MUTED, lw=1.5)
        arrow(ax, x + 0.85, 2.32, x + 0.85, 2.5, color=PRIMARY, lw=1.5)
        if i < 2:
            arrow(ax, x + 1.75, 1.82, xs[i + 1] - 0.05, 1.82)
    ax.text(5.3, 3.3, "Unfolded through time — shared weights", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "rnn-unfold.png")


def diagram_rnn_patterns() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    items = [
        ("1→1", "one in, one out"),
        ("1→many", "captioning"),
        ("many→1", "sentiment"),
        ("many→many", "translation"),
    ]
    for i, (title, cap) in enumerate(items):
        x = 0.3 + i * 2.55
        rounded_box(ax, x, 0.7, 2.35, 2.15, f"{title}\n{cap}", fontsize=13, fc=SOFT if i % 2 == 0 else SOFT_2)
    ax.text(5.3, 3.25, "RNN input/output patterns", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "rnn-patterns.png")


def diagram_gru() -> None:
    """Wikimedia GRU unit (slide image 1), redrawn in ETRA colors with connected wires."""
    fig, ax = plt.subplots(figsize=(10.6, 3.8))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.8)
    ax.text(5.3, 3.58, "GRU cell — fewer gates than LSTM, same shared-weight recurrence", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")

    rail_y = 3.08
    ax.plot([0.55, 9.55], [rail_y, rail_y], color=PRIMARY, lw=2.3)
    ax.annotate("", xy=(10.15, rail_y), xytext=(9.55, rail_y), arrowprops=dict(arrowstyle="-|>", color=PRIMARY, lw=2.2, mutation_scale=12))
    ax.text(0.45, 3.28, r"$h_{t-1}$", fontsize=12, color=PRIMARY, fontweight="bold")
    ax.text(10.2, 3.28, r"$h_t$", fontsize=12, color=PRIMARY, fontweight="bold", ha="right")

    gates = [
        (1.85, r"$\sigma$", r"$r$  reset", SOFT),
        (4.25, r"$\sigma$", r"$z$  update", SOFT),
        (6.65, r"$\tanh$", "candidate", SOFT_2),
    ]
    box_w, box_h, box_y = 1.95, 1.15, 1.22
    for x, op, name, fc in gates:
        rounded_box(ax, x, box_y, box_w, box_h, f"{op}\n{name}", fontsize=12, fc=fc)
        cx = x + box_w / 2
        ax.plot([cx, cx], [rail_y, box_y + box_h], color=SECONDARY, lw=1.5)
        ax.plot([cx, cx], [0.58, box_y], color=MUTED, lw=1.4)

    ax.text(0.35, 0.42, r"$x_t$", fontsize=12, color=INK, fontweight="bold")
    ax.plot([0.85, 7.62], [0.50, 0.50], color=MUTED, lw=1.5)

    mix_x = 9.05
    ax.add_patch(Circle((mix_x, rail_y), 0.16, fc=WHITE, ec=PRIMARY, lw=1.6, zorder=4))
    ax.text(mix_x, rail_y, "+", ha="center", va="center", fontsize=12, color=PRIMARY, fontweight="bold", zorder=5)
    cand_top = (6.65 + box_w / 2, box_y + box_h)
    ax.add_patch(
        FancyArrowPatch(
            cand_top,
            (mix_x, rail_y - 0.16),
            connectionstyle="arc3,rad=-0.18",
            arrowstyle="-|>",
            mutation_scale=12,
            lw=1.8,
            color=ACCENT_WARN,
        )
    )
    save(fig, "gru-cell.png")


def diagram_seq2seq() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.7))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.7)
    rounded_box(ax, 0.3, 0.7, 3.4, 2.3, "Encoder\nsource tokens", fontsize=14, fc=SOFT)
    arrow(ax, 3.85, 1.85, 4.45, 1.85)
    rounded_box(ax, 4.55, 1.15, 1.5, 1.4, "z", fontsize=18, fc=PRIMARY, color=WHITE)
    arrow(ax, 6.2, 1.85, 6.8, 1.85)
    rounded_box(ax, 6.95, 0.7, 3.3, 2.3, "Decoder\ntarget tokens", fontsize=14, fc=SOFT_2, ec=SECONDARY)
    ax.text(5.3, 3.35, "Seq2Seq maps variable length → variable length", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "seq2seq.png")


def diagram_encoding_comparison() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.5))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.5)
    panels = [
        (0.4, "One-Hot", "binary columns\nper category"),
        (3.75, "Dummy", "one-hot minus\none baseline"),
        (7.1, "Ordinal", "ordered integers\non a scale"),
    ]
    for i, (x, title, cap) in enumerate(panels):
        rounded_box(ax, x, 0.55, 3.05, 2.3, "", fc=SOFT if i != 2 else SOFT_2, ec=PRIMARY if i != 2 else ACCENT_WARN)
        ax.text(x + 1.52, 2.35, title, ha="center", fontsize=16, color=PRIMARY, fontweight="bold")
        ax.text(x + 1.52, 1.35, cap, ha="center", fontsize=12, color=INK, linespacing=1.4)
    ax.text(5.3, 3.2, "Encoding Comparison — three ways to encode categorical variables", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "encoding-comparison.png")


def diagram_bottleneck_attention() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.7))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.7)
    rounded_box(ax, 0.3, 0.5, 4.85, 2.65, "", fc=SOFT)
    ax.text(2.72, 2.75, "Bottleneck", ha="center", fontsize=13, color=ACCENT_WARN, fontweight="bold")
    ax.plot([0.9, 4.5], [1.4, 1.4], color=LINE, lw=8, solid_capstyle="round")
    ax.add_patch(Circle((2.72, 1.4), 0.22, fc=ACCENT_WARN, ec=ACCENT_WARN, zorder=3))
    ax.text(2.72, 0.75, "one vector for the whole source", ha="center", fontsize=11, color=MUTED)

    rounded_box(ax, 5.45, 0.5, 4.85, 2.65, "", fc=SOFT_2, ec=SECONDARY)
    ax.text(7.88, 2.75, "Attention", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    for i in range(4):
        ax.add_patch(Rectangle((6.05 + i * 0.85, 1.15), 0.7, 0.9, fc=PRIMARY if i == 1 else SOFT, ec=PRIMARY, lw=1.2))
    ax.text(7.88, 0.75, "decoder looks at relevant encoder states", ha="center", fontsize=11, color=MUTED)
    ax.text(5.3, 3.4, "Attention removes the fixed-vector bottleneck", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "bottleneck-attention.png")


def diagram_attention_architecture() -> None:
    """Wikimedia Attention Is All You Need encoder-decoder (slide image 1), redrawn in ETRA colors."""
    fig, ax = plt.subplots(figsize=(10.6, 3.85))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.85)

    attn_fc, ffn_fc, norm_fc = SOFT, SOFT_2, "#F6EBD4"
    emb_fc, lin_fc, sm_fc = "#F3DCC8", "#E8D4F2", "#DCEBE4"

    def layer(x, y, w, h, text, fc, ec=PRIMARY, fs=8.5, color=INK):
        rounded_box(ax, x, y, w, h, text, fc=fc, ec=ec, fontsize=fs, color=color, lw=1.15)

    def skip(x, y0, y1):
        ax.annotate(
            "",
            xy=(x - 0.12, y1 + 0.08),
            xytext=(x - 0.12, y0),
            arrowprops=dict(arrowstyle="-|>", color=SECONDARY, lw=1.0, mutation_scale=7, connectionstyle="arc3,rad=-0.85"),
        )

    # Encoder column
    ex, ew, cx = 0.22, 4.55, 2.48
    ax.text(cx, 3.68, "Encoder", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    enc = FancyBboxPatch(
        (ex, 0.92), ew, 2.58, boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=1.3, edgecolor=PRIMARY, facecolor=WHITE, linestyle="--",
    )
    ax.add_patch(enc)
    ax.text(ex + ew - 0.18, 3.32, r"$N\times$", fontsize=10, color=PRIMARY, fontweight="bold", ha="right")
    layer(ex + 0.45, 1.02, 3.55, 0.42, "Multi-Head Attention", attn_fc)
    layer(ex + 0.45, 1.52, 3.55, 0.34, "Add & Norm", norm_fc, ACCENT_WARN)
    skip(ex + 0.45, 1.23, 1.52)
    layer(ex + 0.45, 1.98, 3.55, 0.42, "Feed Forward", ffn_fc, SECONDARY)
    layer(ex + 0.45, 2.48, 3.55, 0.34, "Add & Norm", norm_fc, ACCENT_WARN)
    skip(ex + 0.45, 2.19, 2.48)
    arrow(ax, cx, 2.86, cx, 2.82, color=PRIMARY, lw=1.2)
    layer(ex + 0.55, 0.42, 3.35, 0.34, "Input Embedding", emb_fc, ACCENT_WARN, fs=9)
    ax.add_patch(Circle((cx, 0.84), 0.10, fc=WHITE, ec=PRIMARY, lw=1.1, zorder=3))
    ax.text(cx, 0.84, "+", ha="center", va="center", fontsize=8, color=PRIMARY, fontweight="bold", zorder=4)
    ax.text(cx + 0.55, 0.84, "PE", fontsize=8, color=MUTED, va="center")
    ax.text(cx, 0.18, "Inputs", ha="center", fontsize=8.5, color=MUTED)
    arrow(ax, cx, 0.76, cx, 0.92, color=PRIMARY, lw=1.2)

    # Decoder column
    dx, dw, dcx = 5.55, 4.75, 7.90
    ax.text(dcx, 3.68, "Decoder", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    layer(dcx - 1.55, 3.28, 3.10, 0.28, "Softmax", sm_fc, ACCENT_OK, fs=8.5)
    layer(dcx - 1.55, 2.94, 3.10, 0.28, "Linear", lin_fc, SECONDARY, fs=8.5)
    dec = FancyBboxPatch(
        (dx, 0.92), dw, 1.92, boxstyle="round,pad=0.02,rounding_size=0.08",
        linewidth=1.3, edgecolor=PRIMARY, facecolor=WHITE, linestyle="--",
    )
    ax.add_patch(dec)
    ax.text(dx + dw - 0.42, 2.72, r"$N\times$", fontsize=10, color=PRIMARY, fontweight="bold", ha="right")
    layer(dx + 0.38, 1.00, 3.95, 0.26, "Masked Multi-Head Attention", attn_fc, fs=8)
    layer(dx + 0.38, 1.30, 3.95, 0.22, "Add & Norm", norm_fc, ACCENT_WARN, fs=8)
    skip(dx + 0.38, 1.13, 1.30)
    layer(dx + 0.38, 1.56, 3.95, 0.26, "Multi-Head Attention", PRIMARY, PRIMARY, fs=8, color=WHITE)
    layer(dx + 0.38, 1.86, 3.95, 0.22, "Add & Norm", norm_fc, ACCENT_WARN, fs=8)
    skip(dx + 0.38, 1.69, 1.86)
    layer(dx + 0.38, 2.12, 3.95, 0.26, "Feed Forward", ffn_fc, SECONDARY, fs=8)
    layer(dx + 0.38, 2.42, 3.95, 0.22, "Add & Norm", norm_fc, ACCENT_WARN, fs=8)
    skip(dx + 0.38, 2.25, 2.42)
    arrow(ax, dcx, 2.64, dcx, 2.94, color=PRIMARY, lw=1.2)
    arrow(ax, dcx, 3.22, dcx, 3.28, color=PRIMARY, lw=1.2)
    layer(dx + 0.70, 0.42, 3.35, 0.34, "Output Embedding", emb_fc, ACCENT_WARN, fs=9)
    ax.add_patch(Circle((dcx, 0.84), 0.10, fc=WHITE, ec=PRIMARY, lw=1.1, zorder=3))
    ax.text(dcx, 0.84, "+", ha="center", va="center", fontsize=8, color=PRIMARY, fontweight="bold", zorder=4)
    ax.text(dcx, 0.18, "Outputs (shifted right)", ha="center", fontsize=8, color=MUTED)
    arrow(ax, dcx, 0.76, dcx, 0.92, color=PRIMARY, lw=1.2)

    ax.annotate(
        "",
        xy=(dx + 0.38, 1.69),
        xytext=(ex + ew - 0.02, 2.55),
        arrowprops=dict(arrowstyle="-|>", color=ACCENT_WARN, lw=1.8, mutation_scale=11),
    )
    ax.text(5.15, 3.00, "cross-attention", ha="center", fontsize=8, color=ACCENT_WARN, fontweight="bold")
    save(fig, "attention-architecture.png")


def diagram_greedy_beam() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.35, 0.55, 4.8, 2.5, "", fc=SOFT)
    ax.text(2.75, 2.7, "Greedy", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    ys = [2.05, 1.45, 0.85]
    for i, y in enumerate(ys):
        ax.add_patch(Circle((1.3 + i * 1.15, y), 0.22, fc=PRIMARY if i == 0 else SOFT, ec=PRIMARY, lw=1.2))
        if i < 2:
            ax.plot([1.52 + i * 1.15, 1.3 + (i + 1) * 1.15 - 0.22], [y, ys[i + 1]], color=SECONDARY, lw=1.6)
    ax.text(2.75, 0.7, "one best token each step", ha="center", fontsize=11, color=MUTED)

    rounded_box(ax, 5.45, 0.55, 4.8, 2.5, "", fc=SOFT_2, ec=SECONDARY)
    ax.text(7.85, 2.7, "Beam search", ha="center", fontsize=14, color=PRIMARY, fontweight="bold")
    ax.add_patch(Circle((6.4, 1.7), 0.2, fc=PRIMARY, ec=PRIMARY))
    ax.add_patch(Circle((7.85, 2.15), 0.2, fc=SOFT, ec=PRIMARY))
    ax.add_patch(Circle((7.85, 1.25), 0.2, fc=SOFT, ec=PRIMARY))
    ax.add_patch(Circle((9.3, 2.35), 0.18, fc=SOFT, ec=PRIMARY))
    ax.add_patch(Circle((9.3, 1.7), 0.18, fc=PRIMARY, ec=PRIMARY))
    ax.add_patch(Circle((9.3, 1.05), 0.18, fc=SOFT, ec=PRIMARY))
    ax.plot([6.6, 7.65], [1.7, 2.15], color=SECONDARY, lw=1.3)
    ax.plot([6.6, 7.65], [1.7, 1.25], color=SECONDARY, lw=1.3)
    ax.plot([8.05, 9.12], [2.15, 2.35], color=LINE, lw=1.1)
    ax.plot([8.05, 9.12], [1.25, 1.7], color=SECONDARY, lw=1.3)
    ax.plot([8.05, 9.12], [1.25, 1.05], color=LINE, lw=1.1)
    ax.text(7.85, 0.7, "keep top-k hypotheses", ha="center", fontsize=11, color=MUTED)
    ax.text(5.3, 3.3, "Decoding: local pick vs shortlist of sequences", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "greedy-vs-beam.png")


def diagram_seq2seq_attention() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.8))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.8)
    ax.text(5.3, 3.5, "Seq2Seq + Attention", ha="center", fontsize=15, color=PRIMARY, fontweight="bold")
    ax.text(5.3, 3.12, "Decoder attends to encoder states", ha="center", fontsize=12, color=MUTED)

    box_w, box_h, gap = 1.15, 0.72, 0.22
    start_x = 1.15
    enc_y = 1.95
    for i in range(4):
        x = start_x + i * (box_w + gap)
        rounded_box(ax, x, enc_y, box_w, box_h, "", fc=PRIMARY if i == 2 else SOFT, ec=PRIMARY)
    ax.text(start_x + 2 * (box_w + gap) + box_w / 2, enc_y - 0.28, "encoder", ha="center", fontsize=11, color=MUTED)

    dec_x, dec_y, dec_w, dec_h = 7.35, 0.55, 2.05, 0.95
    rounded_box(ax, dec_x, dec_y, dec_w, dec_h, "decoder", fontsize=13, fc="#E8D9A8", ec=ACCENT_WARN, color=INK)

    src_x = start_x + 2 * (box_w + gap) + box_w / 2
    src_y = enc_y - 0.04
    dst_x, dst_y = dec_x, dec_y + dec_h * 0.55
    ax.add_patch(
        FancyArrowPatch(
            (src_x, src_y),
            (dst_x, dst_y),
            connectionstyle="arc3,rad=0.28",
            arrowstyle="-|>",
            mutation_scale=14,
            lw=2.2,
            color=ACCENT_WARN,
        )
    )
    ax.text(5.3, 0.22, "Attention link from encoder step to decoder", ha="center", fontsize=12, color=MUTED)
    save(fig, "seq2seq-attention.png")


def diagram_transformer() -> None:
    fig, ax = plt.subplots(figsize=(10.6, 3.6))
    style_ax(ax)
    ax.set_xlim(0, 10.6)
    ax.set_ylim(0, 3.6)
    rounded_box(ax, 0.35, 0.65, 4.7, 2.25, "Encoder\ncontextual source states", fontsize=14, fc=SOFT)
    rounded_box(ax, 5.55, 0.65, 4.7, 2.25, "Decoder\nautoregressive target + attention", fontsize=14, fc=SOFT_2, ec=SECONDARY)
    arrow(ax, 5.15, 1.77, 5.5, 1.77)
    ax.text(5.3, 3.25, "Transformer encoder–decoder — bridge to Week 4 GenAI", ha="center", fontsize=13, color=PRIMARY, fontweight="bold")
    save(fig, "transformer-encdec.png")


def main() -> None:
    print(f"Generating Week 3 Session 1 diagrams → {OUT}")
    fetch_wikimedia_originals()
    diagram_ambiguity()
    diagram_regex()
    diagram_cleaning()
    diagram_tokenize()
    diagram_bpe()
    diagram_stem_lemma()
    diagram_pos()
    diagram_ner()
    diagram_spacy()
    diagram_ngram()
    diagram_log_probs()
    diagram_embedding_space()
    diagram_static_contextual()
    diagram_rnn_patterns()
    diagram_seq2seq()
    diagram_encoding_comparison()
    diagram_bottleneck_attention()
    diagram_greedy_beam()
    diagram_transformer()
    print("Done.")


if __name__ == "__main__":
    main()
