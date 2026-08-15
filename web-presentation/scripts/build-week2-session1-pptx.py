#!/usr/bin/env python3
"""
Build Week 2 · Session 1 presentation using official ETRA Design System.
"""

from __future__ import annotations

import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches

sys.path.insert(0, str(Path(__file__).resolve().parent))
from etra_brand import (  # noqa: E402
    INK,
    MARGIN,
    MUTED,
    PRIMARY,
    SECONDARY,
    SLIDE_H,
    SLIDE_W,
    SOFT,
    SOFT_2,
    WHITE,
    add_formula,
    add_text,
    bullets,
    content_footer,
    content_header,
    gradient_fill,
    is_fraction_formula,
    logo,
    paint_light,
    rect,
    right_rail,
    soft_card,
    title_block,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pdf-exports" / "Week2-Session1-Deep-Learning.pptx"
PLOTS = ROOT / "public" / "assets" / "plots"
DIAGRAMS = ROOT / "public" / "assets" / "session-w2s1-diagrams"

SESSION = {
    "eyebrow": "Week 2  ·  Session 1",
    "section_number": "07",
    "section_tag": "S07",
    "section_title": "Deep Learning",
    "subtitle": "Neural networks, backpropagation, CNNs, and RNNs",
    "trainer_line": "AI & Machine Learning Bootcamp",
    "focus": "Neural Networks · CNNs · RNNs",
    "topics": [
        "Deep Learning",
        "Neural Networks",
        "Perceptron & MLP",
        "Backpropagation",
        "CNNs",
        "RNNs & regularization",
    ],
}

TOPIC_CONTENT: dict = {
    "Deep Learning": {
        "title": "Deep Learning: Introduction",
        "kicker": "Foundations → Optimization → Architectures → Autoencoders",
        "body": "Each phase answers a different question.",
        "bullets": [
            "Four phases: foundations → optimization → architectures → autoencoders.",
            "Each phase has a lab-style checkpoint — pause at phase boundaries.",
            "Focus on deep learning basics — phase breaks are intentional.",
        ],
        "plot_path": "ann-intro.png",
        "note": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
        "extra_slides": [
            {
                "title": "Deep Learning: Introduction",
                "kicker": "Four phases, four questions",
                "body": "Foundations → optimization → architectures → autoencoders. Pause at each boundary.",
                "layout": "diagram",
                "plot_path": "four-phases.png",
                "note": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
            },
            {
                "title": "What Is Deep Learning?",
                "kicker": "Stacked Nonlinear Transformations",
                "body": "Deep learning learns a parameterized mapping from inputs to outputs by stacking nonlinear layers.",
                "bullets": [
                    "“Deep” means several nonlinear transforms — hierarchical features, not one giant linear rule.",
                    "Training picks a loss, then adjusts weights with gradients so average loss drops.",
                    "The network learns representations tuned to the task instead of hand-crafted features.",
                ],
                "plot_path": "hierarchical-features.png",
                "note": "Generalization to unseen data is the real goal — not memorizing the training set.",
            },
            {
                "title": "AI, Machine Learning, and Deep Learning",
                "kicker": "Subset Relationships — Not Interchangeable Labels",
                "body": "DL ⊂ ML ⊂ AI. Precise language beats “we used AI”.",
                "layout": "diagram",
                "plot_path": "ai-ml-dl.png",
                "note": "Say “supervised DL with a CNN” — not just “AI”.",
            },
            {
                "title": "Containment (conceptual)",
                "kicker": "What sits inside what",
                "layout": "table",
                "table": {
                    "headers": ["Set", "Contains"],
                    "rows": [
                        ["AI", "Rule systems, search, planning, ML, knowledge bases"],
                        ["ML", "Linear models, trees, kernel SVMs, shallow nets, deep nets"],
                        ["DL", "CNNs, RNNs / LSTM, Transformers, autoencoders, GANs"],
                    ],
                },
                "note": "Deep learning is a subfield of ML that uses stacked nonlinear layers.",
            },
            {
                "title": "When Deep Learning Shines — and When to Skip It",
                "kicker": "Match Method to Data, Risk, and Budget",
                "layout": "table",
                "table": {
                    "headers": ["Situation", "Typical first choice", "Why"],
                    "rows": [
                        [
                            "Large images / audio / text",
                            "Pre-trained DL + fine-tune",
                            "Raw inputs; hierarchical features",
                        ],
                        [
                            "Small tabular (< few k rows)",
                            "Trees / linear + regularization",
                            "Lower variance, faster iteration",
                        ],
                        [
                            "Need legal / causal explanation",
                            "Simpler model or hybrid",
                            "Auditability and stability",
                        ],
                        [
                            "Tight CPU / edge latency",
                            "Small distilled / quantized net",
                            "Memory and power limits",
                        ],
                    ],
                },
                "note": "Always compare against strong baselines. DL must earn its complexity on validation metrics.",
            },
        ],
    },
    "Neural Networks": {
        "title": "Three Ingredients of Every Deep Model",
        "kicker": "Architecture · Loss · Optimizer + Data",
        "body": "Every neural network is the same three-part recipe, regardless of CNN vs RNN vs MLP.",
        "layout": "diagram",
        "plot_path": "three-ingredients.png",
        "note": "Change one ingredient and the model’s behavior changes with it.",
        "extra_slides": [
            {
                "title": "Three Ingredients — What Each Means",
                "kicker": "You always have these three",
                "layout": "table",
                "table": {
                    "headers": ["Ingredient", "What it means"],
                    "rows": [
                        ["Architecture", "How signals flow (MLP, CNN, RNN, Transformer)"],
                        ["Loss / objective", "What “better” means (MSE, cross-entropy, …)"],
                        ["Optimizer + data", "How you search parameters and which examples you show"],
                    ],
                },
                "note": "A beautiful architecture with the wrong loss still learns the wrong thing.",
            },
            {
                "title": "Why Depth Works",
                "kicker": "Hierarchical Representation Learning",
                "body": "Each layer rewrites the previous layer’s features into a more useful space.",
                "bullets": [
                    "Early layers detect simple patterns (edges, local tokens).",
                    "Middle layers compose those into textures, parts, phrases.",
                    "Late layers assemble task semantics (objects, intent, class scores).",
                ],
                "plot_path": "hierarchical-features.png",
                "note": "Depth is composition. Width is how many features you keep at each level.",
            },
            {
                "title": "Session Roadmap",
                "kicker": "What we build today",
                "layout": "table",
                "table": {
                    "headers": ["Block", "Question it answers"],
                    "rows": [
                        ["Perceptron & MLP", "What does one layer compute?"],
                        ["Backpropagation", "How do we update the weights?"],
                        ["CNNs", "How do we exploit spatial structure?"],
                        ["RNNs & regularization", "How do we model sequences and generalize?"],
                    ],
                },
                "note": "Exit check: explain z = w·x + b and why nonlinearity is required between layers.",
            },
        ],
    },
    "Perceptron & MLP": {
        "title": "Single Neuron (Perceptron)",
        "kicker": "One Affine Map + One Nonlinearity",
        "body": "The perceptron is the building block: weighted sum, plus bias, then an activation.",
        "formula": "z = wᵀx + b,   a = f(z)",
        "formula_tex": r"z = w^{\top}x + b,\quad a = f(z)",
        "formula_note": "w = sensitivity to each feature  ·  b = offset of the decision boundary",
        "layout": "formula_example",
        "bullets": [
            "Weights encode which patterns excite the neuron; training moves w and b to lower the loss.",
            "With no hidden layer, the decision boundary in input space is a hyperplane — linear.",
        ],
        "note": "A single perceptron is powerful but limited: it cannot solve XOR.",
        "extra_slides": [
            {
                "title": "Perceptron — Signal Flow",
                "kicker": "Inputs → Weighted Sum → Activation",
                "body": "Each input is multiplied by a weight, summed with bias b, then passed through f.",
                "layout": "diagram",
                "plot_path": "perceptron.png",
                "note": "z is the logit / pre-activation. a is what the next layer actually sees.",
            },
            {
                "title": "Symbols at a Glance",
                "kicker": "One Affine Map + One Nonlinearity",
                "layout": "table",
                "table": {
                    "headers": ["Symbol", "Shape intuition", "Role"],
                    "rows": [
                        ["x", "Feature vector (length d)", "One example’s inputs"],
                        ["w", "Same length as x", "Direction and strength of sensitivity"],
                        ["b", "Scalar", "Offset / threshold in logit space"],
                        ["f", "Maps ℝ → ℝ (per neuron)", "Introduces nonlinearity (or identity)"],
                    ],
                },
                "note": "Bias shifts the hyperplane; it does not rotate it. Rotation comes from w.",
            },
            {
                "title": "Weight Initialization: Why Zeros Break Training",
                "kicker": "Symmetry Must Be Broken",
                "layout": "table",
                "table": {
                    "headers": ["Init scheme", "Problem it avoids", "Best suited for"],
                    "rows": [
                        ["All zeros", "Hidden units stay identical", "Never use for weights"],
                        ["Xavier (Glorot)", "Variance collapse / explosion", "Sigmoid / Tanh"],
                        ["He (Kaiming)", "ReLU zeros out ~half the signal", "ReLU / Leaky ReLU"],
                    ],
                },
                "note": "Random init lets each unit specialize. Frameworks apply He / Xavier for you.",
            },
            {
                "title": "Activation Functions: Sigmoid, Tanh, ReLU",
                "kicker": "Nonlinearity Is What Makes Depth Useful",
                "body": "Stacked linear layers collapse to one linear map. Activations prevent that collapse.",
                "formula": "σ(z) = 1/(1+e^{−z})   ·   tanh(z)   ·   ReLU(z) = max(0, z)",
                "formula_tex": r"\sigma(z)=\dfrac{1}{1+e^{-z}},\quad \tanh(z),\quad \mathrm{ReLU}(z)=\max(0,z)",
                "layout": "formula_example",
                "bullets": [
                    "Sigmoid maps to (0, 1) — good for probabilities; saturates and vanishes gradients.",
                    "Tanh is zero-centered (−1, 1) — often nicer than sigmoid, still saturates.",
                    "ReLU is the default hidden activation — cheap, and avoids vanishing on z > 0.",
                ],
                "note": "Use ReLU (or GELU) in hidden layers; sigmoid / softmax at the output when you need probabilities.",
            },
            {
                "title": "Activation Curves",
                "kicker": "Shape Controls Gradient Flow",
                "layout": "diagram",
                "plot_path": "activations.png",
                "note": "Flat tails (sigmoid / tanh) → tiny gradients. ReLU is linear on the positive side.",
            },
            {
                "title": "The XOR Problem",
                "kicker": "Why Hidden Layers Are Necessary",
                "body": "XOR is not linearly separable: no single line separates the four corners.",
                "layout": "diagram",
                "plot_path": "xor-separability.png",
                "note": "A hidden layer remaps the inputs so the output layer can cut with a line.",
            },
            {
                "title": "XOR Truth Table",
                "kicker": "Four Points, One Nonlinear Rule",
                "layout": "table",
                "table": {
                    "headers": ["x₁", "x₂", "XOR"],
                    "rows": [
                        ["0", "0", "0"],
                        ["0", "1", "1"],
                        ["1", "0", "1"],
                        ["1", "1", "0"],
                    ],
                },
                "note": "This is the core intuition for representation learning: change the space, then classify.",
            },
            {
                "title": "From Perceptron to MLP",
                "kicker": "Depth = Composed Nonlinear Features",
                "body": "Each hidden layer applies an affine map, then a nonlinearity, producing new features h.",
                "formula": "h = φ(W₁x + b₁),   ŷ = τ(W₂h + b₂)",
                "formula_tex": r"h=\varphi(W_1 x+b_1),\quad \hat{y}=\tau(W_2 h+b_2)",
                "formula_note": "φ = hidden activation (ReLU)  ·  τ = output activation (softmax / linear)",
                "layout": "formula_example",
                "bullets": [
                    "Width = how many independent nonlinear features per layer.",
                    "Depth = how many levels of composition (edges → textures → objects).",
                ],
                "note": "Universal approximation: one wide hidden layer can fit many functions. In practice, depth + inductive bias wins.",
            },
            {
                "title": "MLP Architecture",
                "kicker": "Input → Hidden → Output",
                "layout": "diagram",
                "plot_path": "mlp-architecture.png",
                "note": "Every arrow is a weight. Training is moving those arrows so the output matches the labels.",
            },
            {
                "title": "Forward Propagation",
                "kicker": "The Engine of Inference",
                "body": "Feed x through each layer in order. The last layer emits logits, then softmax if you need class probabilities.",
                "layout": "diagram",
                "plot_path": "forward-pass.png",
                "note": "Training repeats this on mini-batches. The graph also knows how to send gradients backward.",
            },
        ],
    },
    "Backpropagation": {
        "title": "Loss Functions: MSE vs Cross-Entropy",
        "kicker": "Match the Loss to the Task",
        "body": "The loss tells the network what “wrong” means. Pick it from the output type.",
        "formula": "L_MSE = (1/N) Σ ||ŷᵢ − yᵢ||²",
        "formula_tex": r"\mathcal{L}_{\mathrm{MSE}}=\dfrac{1}{N}\sum_i \|\hat{y}_i - y_i\|^2",
        "formula_note": "Regression: quadratic penalty on residuals",
        "layout": "formula_example",
        "bullets": [
            "MSE: continuous targets; outliers can dominate — Huber is a robust alternative.",
            "Cross-entropy: predicted probabilities vs true class (often with logits + log-softmax).",
        ],
        "note": "Wrong loss → the model optimizes the wrong thing, even if the architecture is right.",
        "extra_slides": [
            {
                "title": "Loss by Task",
                "kicker": "Head + Loss Pairs",
                "layout": "table",
                "table": {
                    "headers": ["Task", "Common head + loss"],
                    "rows": [
                        ["Regression", "Linear output + MSE / Huber"],
                        ["Binary classification", "Sigmoid + binary cross-entropy"],
                        ["Multi-class", "Softmax + cross-entropy"],
                    ],
                },
                "note": "Implement classification losses in log-space for numerical stability.",
            },
            {
                "title": "Backpropagation: Chain Rule",
                "kicker": "Gradients on the Computational Graph",
                "body": "Backprop applies the chain rule from the scalar loss backward through every tensor.",
                "formula": "∂L/∂w = (∂L/∂z) (∂z/∂w)",
                "formula_tex": r"\dfrac{\partial \mathcal{L}}{\partial w}=\dfrac{\partial \mathcal{L}}{\partial z}\,\dfrac{\partial z}{\partial w}",
                "formula_note": "Reverse-mode autodiff — efficient when many weights feed one loss",
                "layout": "formula_example",
                "bullets": [
                    "Each op knows a forward and a backward rule (matmul, ReLU, …).",
                    "PyTorch / JAX / TensorFlow build this graph; you still debug shapes and saturation.",
                ],
                "note": "Understanding backprop = knowing which paths carry gradient and which activations flatten it.",
            },
            {
                "title": "Forward Then Backward",
                "kicker": "Two Passes, One Update",
                "layout": "diagram",
                "plot_path": "backprop-flow.png",
                "note": "Shared subexpressions: each edge is visited once on the way back.",
            },
            {
                "title": "Vanishing and Exploding Gradients",
                "kicker": "Depth Multiplies Jacobians",
                "layout": "table",
                "table": {
                    "headers": ["Symptom", "Likely cause", "Mitigation"],
                    "rows": [
                        [
                            "Early layers barely move",
                            "Vanishing chain / saturated units",
                            "ReLU, He init, residuals, norm",
                        ],
                        [
                            "Loss → NaN quickly",
                            "Exploding activations or LR too high",
                            "Clip grads, lower LR, check scaling",
                        ],
                        [
                            "Stable then sudden blow-up",
                            "Bad batch / mixed precision",
                            "Finite checks, gradient clipping",
                        ],
                    ],
                },
                "note": "Fixes stack: architecture + activation + init + normalization + optimizer.",
            },
            {
                "title": "Optimizers: SGD and Adam",
                "kicker": "Learning Rate, Momentum, Adaptive Steps",
                "body": "The optimizer turns a gradient into a weight update. Learning rate is the first knob to tune.",
                "formula": "θ ← θ − η ∇_θ L",
                "formula_tex": r"\theta \leftarrow \theta - \eta \nabla_{\theta}\mathcal{L}",
                "formula_note": "η = learning rate  ·  typical log grid: 1e-4, 1e-3, 1e-2",
                "layout": "formula_example",
                "bullets": [
                    "SGD + momentum: accumulates velocity to ride consistent directions and damp ravines.",
                    "Adam: adapts the step per parameter from recent gradient magnitude — a robust default.",
                ],
                "note": "SGD+momentum is still common in vision. Adam is the usual start for MLPs and Transformers.",
            },
            {
                "title": "Optimizer Cheat Sheet",
                "kicker": "When to Use Which",
                "layout": "table",
                "table": {
                    "headers": ["Optimizer", "Core mechanism", "When to use"],
                    "rows": [
                        ["Vanilla SGD", "Step in −gradient", "Rarely used alone today"],
                        ["SGD + Momentum", "Adds a fraction of the previous step", "Standard for many CV models"],
                        ["Adam", "Per-parameter adaptive rates", "Default for text / tabular / MLPs"],
                    ],
                },
                "note": "LR is usually more important than switching optimizer too early.",
            },
            {
                "title": "Batch Normalization",
                "kicker": "Stabilize Activations, Speed Up Training",
                "body": "BN normalizes each channel across the mini-batch, then learns a scale γ and shift β.",
                "formula": "x̂ = (x − μ_B) / √(σ²_B + ε),   y = γ x̂ + β",
                "formula_tex": r"\hat{x}=\dfrac{x-\mu_B}{\sqrt{\sigma_B^2+\varepsilon}},\quad y=\gamma\hat{x}+\beta",
                "layout": "formula_example",
                "bullets": [
                    "Stabilizes internal activations and allows a higher learning rate.",
                    "Layer Norm normalizes across features per example — standard in Transformers and RNNs.",
                ],
                "note": "BN uses batch statistics at train time and running averages at inference.",
            },
        ],
    },
    "CNNs": {
        "title": "Image Data: How Computers See Pixels",
        "kicker": "Tensors, Channels, and Local Structure",
        "body": "A color image is a tensor H×W×3 (RGB). Meaning lives in local neighborhoods, not isolated pixels.",
        "bullets": [
            "Small patches reveal edges; larger context reveals objects — hierarchical composition.",
            "Preprocess: resize, crop, normalize (often ImageNet mean/std), then augment.",
            "Model input is typically Batch × C × H × W fed into stem convolutions.",
        ],
        "plot_path": "convolution.png",
        "note": "Augmentation (crop, flip, color jitter) teaches invariance the loss never states explicitly.",
        "extra_slides": [
            {
                "title": "Convolution: Kernels and Feature Maps",
                "kicker": "Sliding Linear Filters + Nonlinearity",
                "body": "A kernel is a small learnable matrix (often 3×3). Multiple kernels produce a stack of feature maps.",
                "layout": "diagram",
                "plot_path": "convolution.png",
                "note": "Classical Sobel filters are fixed. CNNs learn task-specific filters from data.",
            },
            {
                "title": "Convolution Hyperparameters",
                "kicker": "Neighborhood, Stride, Border",
                "layout": "table",
                "table": {
                    "headers": ["Hyperparameter", "Effect"],
                    "rows": [
                        ["Kernel size", "Immediate neighborhood (3×3 is common)"],
                        ["Stride", "Downsample spatially when > 1"],
                        ["Padding", "Keep spatial size (same) or control the border"],
                        ["Channels / filters", "How many distinct patterns this layer can detect"],
                    ],
                },
                "note": "Deep stacks widen the receptive field: early ≈ edges; late ≈ object parts.",
            },
            {
                "title": "CNN Blocks: Conv–Pool to ResNet",
                "kicker": "Depth, Downsampling, Residual Learning",
                "body": "A standard CNN alternates convolution, ReLU, and pooling, then a fully connected head.",
                "layout": "diagram",
                "plot_path": "cnn-stack.png",
                "note": "Max-pool keeps the strongest local response and shrinks the map.",
            },
            {
                "title": "Residual Block",
                "kicker": "Learn F(x), Keep an Identity Path",
                "body": "Skip connections let gradients flow backward through identity — this is how 100+ layer nets train.",
                "formula": "y = F(x) + x",
                "formula_tex": r"y=\mathcal{F}(x)+x",
                "formula_note": "The block learns the residual F; x is copied forward",
                "layout": "formula_example",
                "bullets": [
                    "AlexNet (2012): scale + ReLU + dropout + GPUs on ImageNet.",
                    "ResNet (2015): residual mapping F(x)+x; skip paths help gradients.",
                ],
                "note": "If F learns zero, the block still acts as identity — easier than learning identity from scratch.",
            },
            {
                "title": "Residual Path",
                "kicker": "Shortcut Around the Convolutions",
                "layout": "diagram",
                "plot_path": "residual-block.png",
                "note": "The add node is why early layers still receive a usable gradient.",
            },
            {
                "title": "Transfer Learning with Pretrained Models",
                "kicker": "Reuse Features, Adapt the Head",
                "body": "Pretraining on ImageNet learns general filters you can reuse on a smaller target task.",
                "layout": "diagram",
                "plot_path": "transfer-learning.png",
                "note": "Freeze the backbone when data is scarce; fine-tune top blocks when you have more labels.",
            },
            {
                "title": "Transfer Recipe by Dataset Size",
                "kicker": "How Much of the Backbone to Touch",
                "layout": "table",
                "table": {
                    "headers": ["Target dataset", "Strategy"],
                    "rows": [
                        ["Small", "Freeze backbone, train head only"],
                        ["Medium", "Fine-tune top blocks with a smaller LR"],
                        ["Large", "Full fine-tune of all layers with a small LR"],
                    ],
                },
                "note": "Transfer learning cuts labeled-data need and wall-clock time on most vision tasks.",
            },
        ],
    },
    "RNNs & regularization": {
        "title": "Training Diagnostics: Underfit, Fit, Overfit",
        "kicker": "Read Train vs Validation Behavior",
        "body": "The gap between train and validation loss tells you whether to add capacity or add constraint.",
        "layout": "diagram",
        "plot_path": "train-val-curves.png",
        "note": "A small train–val gap is normal. A widening gap is overfitting.",
        "extra_slides": [
            {
                "title": "What to Do in Each Regime",
                "kicker": "Capacity vs Constraint",
                "layout": "table",
                "table": {
                    "headers": ["Regime", "Train loss", "Val loss", "Typical response"],
                    "rows": [
                        ["Underfitting", "High", "High", "More capacity, better features, longer train"],
                        ["Good fit", "Low", "Low, close to train", "Keep regularization; ship or iterate on data"],
                        ["Overfitting", "Very low", "Worse / diverging", "More data, dropout, weight decay, early stop"],
                    ],
                },
                "note": "Fix underfitting before celebrating a tiny training loss.",
            },
            {
                "title": "Regularization: Dropout, Weight Decay, Early Stopping",
                "kicker": "Constrain Capacity to Generalize",
                "body": "Regularization is how we stop the network from memorizing noise.",
                "layout": "diagram",
                "plot_path": "dropout.png",
                "note": "Turn dropout OFF at inference (model.eval()) so predictions are deterministic.",
            },
            {
                "title": "Regularization Toolkit",
                "kicker": "Three Levers You Will Use Together",
                "layout": "table",
                "table": {
                    "headers": ["Technique", "Primary action", "At inference"],
                    "rows": [
                        ["Dropout", "Randomly drop hidden units (p ≈ 0.2–0.5)", "Off (weights scaled)"],
                        ["L2 weight decay", "Shrink weights toward zero", "On (weights are static)"],
                        ["Early stopping", "Stop at lowest validation loss", "N/A — checkpoint the best"],
                    ],
                },
                "note": "Dropout is an implicit ensemble. Weight decay is a smoothness prior. Early stopping is free.",
            },
            {
                "title": "Sequential Data & Vanilla RNNs",
                "kicker": "One Transition, Unfolded Through Time",
                "body": "Text, audio, and sensors have order. Shuffling them destroys meaning.",
                "formula": "hₜ = φ(W_hh hₜ₋₁ + W_xh xₜ + b)",
                "formula_tex": r"h_t=\varphi(W_{hh}h_{t-1}+W_{xh}x_t+b)",
                "formula_note": "Same weights at every timestep  ·  hₜ is a running memory of the past",
                "layout": "formula_example",
                "bullets": [
                    "Parameter sharing across time is efficient — but long sequences multiply Jacobians.",
                    "Vanilla RNNs struggle with long-range dependencies (vanishing / exploding gradients).",
                ],
                "note": "Backprop through 50 steps ≈ multiplying a matrix 50 times.",
            },
            {
                "title": "RNN Unfolded Through Time",
                "kicker": "Rolled Cell = Shared Weights Across Steps",
                "layout": "diagram",
                "plot_path": "rnn-unfold.png",
                "note": "Cannot fully parallelize timesteps — each hₜ waits on hₜ₋₁.",
            },
            {
                "title": "LSTM: Gates for Long-Term Memory",
                "kicker": "Forget, Input, Output — Cell State Flows Linearly",
                "body": "LSTM adds a cell state cₜ with an additive path, so signal can travel many steps without vanishing.",
                "layout": "diagram",
                "plot_path": "lstm-gates.png",
                "note": "GRU is a simpler cousin (two gates). Transformers later replace recurrence with attention.",
            },
            {
                "title": "LSTM Gates",
                "kicker": "What Each Gate Controls",
                "layout": "table",
                "table": {
                    "headers": ["Gate", "Role (intuition)"],
                    "rows": [
                        ["Forget  fₜ", "Erase irrelevant history from the cell"],
                        ["Input  iₜ", "Allow new candidate information in"],
                        ["Output  oₜ", "Expose part of the cell as hₜ"],
                    ],
                },
                "note": "The cell is the highway; the gates are the on-ramps and off-ramps.",
            },
        ],
    },
}

TAKEAWAYS = [
    "A neuron is z = wᵀx + b then a = f(z). Depth needs nonlinearity between layers.",
    "Backprop is the chain rule on a graph. Watch vanishing gradients, LR, and train vs val.",
    "CNNs share filters across space; RNNs share weights across time; regularize so they generalize.",
]

BIG_PICTURE = {
    "title": "Where Are We in the Bootcamp?",
    "focus": "Week 1 classical ML is done — now stacked nonlinear models.",
    "current": "S7",
    "weeks": [
        {
            "label": "Week 1",
            "sessions": [
                ("S1", "Foundations & Preprocessing"),
                ("S2", "Regression Models"),
                ("S3", "Classification Basics"),
                ("S4", "Naive Bayes & Trees"),
                ("S5", "SVM & Kernels"),
                ("S6", "Clustering & PCA"),
            ],
        },
        {"label": "Week 2", "sessions": [("S7", "Deep Learning")]},
        {
            "label": "Week 3",
            "sessions": [
                ("S8", "NLP Fundamentals"),
                ("S9", "Tokenization"),
                ("S10", "Text Analysis & NER"),
                ("S11", "Language Modeling"),
                ("S12", "Embeddings & RNNs"),
                ("S13", "Seq2Seq & NMT"),
            ],
        },
        {
            "label": "Week 4",
            "sessions": [
                ("S14", "Generative AI"),
                ("S15", "RAG Systems"),
                ("S16", "MLOps"),
            ],
        },
    ],
}


def slide_title(prs, total):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.2), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(
        slide,
        MARGIN,
        Inches(2.7),
        Inches(11.5),
        Inches(0.95),
        s["section_title"],
        size=44,
        bold=True,
        color=PRIMARY,
    )
    bar = rect(slide, MARGIN, Inches(3.8), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(4.15), Inches(11), Inches(0.5), s["subtitle"], size=17, color=MUTED)
    add_text(slide, MARGIN, Inches(6.7), Inches(6), Inches(0.3), "ETRA", size=12, bold=True, color=PRIMARY)
    add_text(
        slide,
        Inches(8.5),
        Inches(6.7),
        Inches(4),
        Inches(0.3),
        s["trainer_line"],
        size=12,
        color=MUTED,
        align=PP_ALIGN.RIGHT,
    )


def slide_big_picture(prs, total, index):
    bp = BIG_PICTURE
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  Big picture", f"{index:02d}")
    title_block(slide, bp["title"], bp["focus"])

    weeks = bp["weeks"]
    col_w = Inches(2.9)
    gap = Inches(0.18)
    top = Inches(2.35)

    for wi, week in enumerate(weeks):
        x = MARGIN + wi * (col_w + gap)
        add_text(slide, x, top, col_w, Inches(0.3), week["label"], size=12, bold=True, color=PRIMARY)
        rect(slide, x, top + Inches(0.32), col_w - Inches(0.2), Inches(0.012), SOFT)

        for si, (sid, title) in enumerate(week["sessions"]):
            y = top + Inches(0.5) + Inches(si * 0.58)
            current = sid == bp["current"]
            if current:
                rect(slide, x, y + Inches(0.08), Inches(0.05), Inches(0.28), PRIMARY)
            add_text(
                slide,
                x + Inches(0.16),
                y,
                Inches(0.45),
                Inches(0.4),
                sid,
                size=11,
                bold=current,
                color=PRIMARY if current else SECONDARY,
                anchor=MSO_ANCHOR.MIDDLE,
            )
            add_text(
                slide,
                x + Inches(0.6),
                y,
                col_w - Inches(0.75),
                Inches(0.4),
                title,
                size=11,
                bold=current,
                color=INK if current else MUTED,
                anchor=MSO_ANCHOR.MIDDLE,
            )

    content_footer(slide, index, total)


def slide_section_divider(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    logo(slide, height=Inches(0.4))

    add_text(slide, MARGIN, Inches(2.05), Inches(11), Inches(0.35), s["eyebrow"], size=14, color=SECONDARY)
    add_text(
        slide,
        MARGIN,
        Inches(2.5),
        Inches(11.5),
        Inches(0.85),
        s["section_title"],
        size=42,
        bold=True,
        color=PRIMARY,
    )
    bar = rect(slide, MARGIN, Inches(3.5), Inches(1.4), Inches(0.06), PRIMARY)
    gradient_fill(bar, PRIMARY, SECONDARY, 0)
    add_text(slide, MARGIN, Inches(3.85), Inches(11), Inches(0.4), s["focus"], size=16, color=MUTED)

    topics = s["topics"]
    n_cols = 3
    chip_w = Inches(3.7)
    chip_h = Inches(0.48)
    gap_x = Inches(0.22)
    start_y = Inches(4.7)
    for i, topic in enumerate(topics):
        row, col = divmod(i, n_cols)
        x = MARGIN + col * (chip_w + gap_x)
        y = start_y + Inches(row * 0.68)
        soft_card(slide, x, y, chip_w, chip_h, fill=SOFT)
        add_text(slide, x, y + Inches(0.06), chip_w, Inches(0.36), topic, size=12, color=PRIMARY, align=PP_ALIGN.CENTER)

    content_footer(slide, index, total)


def slide_agenda(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, s["focus"], "What we will cover in this session")
    bullets(slide, s["topics"], top=Inches(2.35), size=20)
    content_footer(slide, index, total)


def _add_plot(slide, name, left, top, width, max_height, *, folder=None):
    from PIL import Image

    base = folder or PLOTS
    path = base / name
    if not path.is_file() and folder is None:
        path = DIAGRAMS / name
    if not path.is_file():
        return None
    with Image.open(path) as im:
        px_w, px_h = im.size
    if px_w <= 0 or px_h <= 0:
        return None
    aspect = px_w / px_h
    max_w_in = width.inches
    max_h_in = max_height.inches
    fit_w = min(max_w_in, max_h_in * aspect)
    fit_h = fit_w / aspect
    if fit_h > max_h_in:
        fit_h = max_h_in
        fit_w = fit_h * aspect
    x = left.inches + (max_w_in - fit_w) / 2
    return slide.shapes.add_picture(
        str(path),
        Inches(x),
        top,
        width=Inches(fit_w),
        height=Inches(fit_h),
    )


def slide_topic_rich(prs, total, index, content):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    items = content.get("bullets") or []
    has_note = bool(content.get("note"))
    dense = len(items) >= 4 or (len(items) >= 3 and has_note)
    pitch = 0.50 if dense else 0.62
    bsize = 14 if dense else 16

    if content.get("body"):
        soft_card(slide, MARGIN, Inches(2.25), Inches(12.0), Inches(1.15), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.45),
            Inches(11.3),
            Inches(0.8),
            content["body"],
            size=15,
            color=INK,
        )
        bullet_top = Inches(3.6)
    else:
        bullet_top = Inches(2.35)
        bsize = 15 if dense else 17

    note_y = 6.35 if has_note else 6.7
    max_items = max(1, int((note_y - bullet_top.inches - 0.1) / pitch))
    bullets(
        slide,
        items[:max_items],
        top=bullet_top,
        size=bsize,
        pitch=pitch,
        width=Inches(11.2),
    )

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.45),
            Inches(12),
            Inches(0.3),
            content["note"],
            size=12,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_linear_intro(prs, total, index, content):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    items = content.get("bullets") or []
    plot_name = content.get("plot") or content.get("plot_path")
    has_plot = bool(plot_name)
    has_formula = bool(content.get("formula"))
    has_note = bool(content.get("note"))
    is_frac = has_formula and (
        is_fraction_formula(content["formula"]) or bool(content.get("formula_tex"))
    )

    col_w = Inches(6.3) if has_plot else Inches(12.0)
    text_w = Inches(5.8) if has_plot else Inches(11.3)
    bullet_w = Inches(5.6) if has_plot else Inches(11.2)

    soft_card(slide, MARGIN, Inches(2.2), col_w, Inches(1.2), fill=SOFT)
    add_text(
        slide,
        MARGIN + Inches(0.3),
        Inches(2.35),
        text_w,
        Inches(0.95),
        content.get("body") or "",
        size=13,
        color=INK,
    )

    if has_formula:
        formula_card_h = 1.65 if is_frac else 1.35
        formula_box_h = 0.95 if is_frac else 0.65
        soft_card(slide, MARGIN, Inches(3.55), col_w, Inches(formula_card_h), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.3),
            Inches(3.65),
            text_w,
            Inches(0.22),
            "Formula",
            size=11,
            bold=True,
            color=SECONDARY,
        )
        add_formula(
            slide,
            Inches(MARGIN.inches + 0.3),
            Inches(3.9),
            text_w,
            Inches(formula_box_h),
            content["formula"],
            size=18 if is_frac else 20,
            bold=True,
            color=PRIMARY,
            formula_tex=content.get("formula_tex"),
        )
        if content.get("formula_note"):
            note_y = 3.9 + formula_box_h + 0.05
            add_text(
                slide,
                Inches(MARGIN.inches + 0.3),
                Inches(note_y),
                text_w,
                Inches(0.3),
                content["formula_note"],
                size=10,
                color=MUTED,
            )
        bullet_top = 3.55 + formula_card_h + 0.12
        pitch = 0.46 if (has_note or len(items) >= 2) else 0.55
        bsize = 12
    else:
        bullet_top = 3.55
        pitch = 0.50 if (has_note or len(items) >= 3) else 0.58
        bsize = 13

    note_band = 6.45 if has_note else 6.75
    max_items = max(1, int((note_band - bullet_top - 0.05) / pitch))
    if has_formula and has_plot:
        max_items = min(max_items, 2)
    bullets(
        slide,
        items[:max_items],
        top=Inches(bullet_top),
        size=bsize,
        left=MARGIN,
        width=bullet_w,
        pitch=pitch,
        item_height=Inches(0.42),
    )

    plot_folder = DIAGRAMS if content.get("plot_path") else PLOTS
    if plot_name:
        soft_card(slide, Inches(7.15), Inches(2.2), Inches(5.45), Inches(4.15), fill=SOFT)
        _add_plot(
            slide,
            plot_name,
            Inches(7.35),
            Inches(2.4),
            Inches(5.05),
            Inches(3.75),
            folder=plot_folder,
        )

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.55),
            Inches(12),
            Inches(0.28),
            content["note"],
            size=11,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_formula_example(prs, total, index, content):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    items = content.get("bullets") or []
    has_note = bool(content.get("note"))
    is_frac = is_fraction_formula(content.get("formula") or "") or bool(
        content.get("formula_tex")
    )
    dense = len(items) >= 3 or (len(items) >= 2 and has_note)

    body_top = Inches(2.15)
    if content.get("body"):
        soft_card(slide, MARGIN, body_top, Inches(12.0), Inches(0.7), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.28),
            Inches(11.3),
            Inches(0.45),
            content["body"],
            size=14,
            color=INK,
        )
        formula_top = Inches(3.0)
    else:
        formula_top = Inches(2.25)

    formula_h = 1.55 if is_frac else 1.25
    soft_card(slide, MARGIN, formula_top, Inches(12.0), Inches(formula_h), fill=SOFT)
    add_formula(
        slide,
        Inches(MARGIN.inches + 0.4),
        Inches(formula_top.inches + 0.12),
        Inches(11.2),
        Inches(0.95 if is_frac else 0.7),
        content["formula"],
        size=24 if is_frac else 26,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
        formula_tex=content.get("formula_tex"),
    )
    if content.get("formula_note"):
        add_text(
            slide,
            Inches(MARGIN.inches + 0.4),
            Inches(formula_top.inches + formula_h - 0.35),
            Inches(11.2),
            Inches(0.28),
            content["formula_note"],
            size=12,
            color=MUTED,
            align=PP_ALIGN.CENTER,
        )

    bullet_top = formula_top.inches + formula_h + 0.12
    pitch = 0.46 if dense else 0.56
    bsize = 13 if dense else 15
    note_band = 6.45 if has_note else 6.75
    max_items = max(1, int((note_band - bullet_top - 0.05) / pitch))
    if has_note:
        max_items = min(max_items, 3)
    bullets(
        slide,
        items[:max_items],
        top=Inches(bullet_top),
        size=bsize,
        pitch=pitch,
        width=Inches(11.2),
        item_height=Inches(0.42),
    )

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.55),
            Inches(12),
            Inches(0.25),
            content["note"],
            size=12,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_topic_table(prs, total, index, content):
    from pptx.util import Pt

    s = SESSION
    table = content["table"]
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    headers = table["headers"]
    rows = table["rows"]
    has_note = bool(content.get("note"))
    n_rows = 1 + len(rows)

    show_body = bool(content.get("body")) and len(rows) <= 4
    compact = len(rows) >= 5 or (show_body and has_note and len(rows) >= 4)
    body_size = 11 if compact else 13
    header_size = 10 if compact else 12

    table_top = 2.25
    if show_body:
        soft_card(slide, MARGIN, Inches(2.15), Inches(12.0), Inches(0.55), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(2.25),
            Inches(11.3),
            Inches(0.38),
            content["body"],
            size=13,
            color=INK,
        )
        table_top = 2.85

    footer_limit = 6.55
    note_reserve = 0.55 if has_note else 0.0
    available = footer_limit - table_top - note_reserve
    row_h = min(0.52 if not compact else 0.40, available / n_rows)
    row_h = max(0.30, row_h)
    table_h = row_h * n_rows

    note_top = table_top + table_h + 0.08
    render_note = has_note and (note_top + 0.45) <= 6.9

    shape = slide.shapes.add_table(
        rows=n_rows,
        cols=len(headers),
        left=MARGIN,
        top=Inches(table_top),
        width=Inches(12.0),
        height=Inches(table_h),
    )
    tbl = shape.table

    for c, header in enumerate(headers):
        cell = tbl.cell(0, c)
        cell.text = header
        for p in cell.text_frame.paragraphs:
            p.alignment = PP_ALIGN.CENTER
            for run in p.runs:
                run.font.size = Pt(header_size)
                run.font.bold = True
                run.font.color.rgb = WHITE
                run.font.name = "Helvetica"
        cell.fill.solid()
        cell.fill.fore_color.rgb = PRIMARY

    for r, row in enumerate(rows, start=1):
        for c, value in enumerate(row):
            cell = tbl.cell(r, c)
            cell.text = value
            for p in cell.text_frame.paragraphs:
                p.alignment = PP_ALIGN.LEFT
                for run in p.runs:
                    run.font.size = Pt(body_size)
                    run.font.bold = c == 0
                    run.font.color.rgb = PRIMARY if c == 0 else INK
                    run.font.name = "Helvetica"
            cell.fill.solid()
            cell.fill.fore_color.rgb = SOFT if r % 2 else SOFT_2

    if render_note:
        soft_card(slide, MARGIN, Inches(note_top), Inches(12.0), Inches(0.45), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.35),
            Inches(note_top + 0.08),
            Inches(11.3),
            Inches(0.32),
            content["note"],
            size=12,
            color=MUTED,
        )

    content_footer(slide, index, total)


def slide_full_diagram(prs, total, index, content):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, content["title"], content.get("kicker"))

    diagram_top = Inches(2.15)
    if content.get("body"):
        add_text(
            slide,
            MARGIN,
            Inches(2.1),
            Inches(12.0),
            Inches(0.35),
            content["body"],
            size=13,
            color=MUTED,
        )
        diagram_top = Inches(2.45)

    plot_name = content.get("plot_path") or content.get("plot")
    folder = DIAGRAMS if content.get("plot_path") else PLOTS
    soft_card(slide, MARGIN, diagram_top, Inches(12.0), Inches(4.35), fill=SOFT)
    _add_plot(
        slide,
        plot_name,
        Inches(MARGIN.inches + 0.2),
        Inches(diagram_top.inches + 0.15),
        Inches(11.6),
        Inches(4.05),
        folder=folder,
    )

    if content.get("note"):
        add_text(
            slide,
            MARGIN,
            Inches(6.9),
            Inches(12),
            Inches(0.25),
            content["note"],
            size=11,
            color=MUTED,
        )

    content_footer(slide, index, total)


def _render_content_slide(prs, total, index, content):
    layout = content.get("layout")
    if layout == "diagram":
        slide_full_diagram(prs, total, index, content)
    elif layout == "table" or (content.get("table") and layout not in ("formula_example", "diagram")):
        slide_topic_table(prs, total, index, content)
    elif layout == "formula_example":
        slide_formula_example(prs, total, index, content)
    elif content.get("formula") or content.get("plot") or content.get("plot_path"):
        slide_linear_intro(prs, total, index, content)
    else:
        slide_topic_rich(prs, total, index, content)


def slide_topic(prs, total, index, topic_index, topic):
    content = TOPIC_CONTENT.get(topic)
    if content:
        _render_content_slide(prs, total, index, content)
        n = 1
        for extra in content.get("extra_slides") or []:
            _render_content_slide(prs, total, index + n, extra)
            n += 1
        return n

    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  {s['section_title']}", f"{index:02d}")
    title_block(slide, topic, f"Topic {topic_index} of {len(s['topics'])}")
    soft_card(slide, MARGIN, Inches(2.45), Inches(12.0), Inches(3.7), fill=SOFT)
    add_text(
        slide,
        MARGIN + Inches(0.4),
        Inches(3.55),
        Inches(11.2),
        Inches(0.55),
        topic,
        size=26,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    content_footer(slide, index, total)
    return 1


def slide_takeaways(prs, total, index):
    s = SESSION
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    content_header(slide, f"{s['section_tag']}  ·  Takeaways", f"{index:02d}")
    title_block(slide, "3 Ideas to Keep", "Leave with these")
    for i, text in enumerate(TAKEAWAYS):
        y = Inches(2.35) + Inches(i * 1.25)
        soft_card(slide, MARGIN, y, Inches(12.0), Inches(1.08), fill=SOFT)
        add_text(
            slide,
            MARGIN + Inches(0.3),
            y + Inches(0.28),
            Inches(0.5),
            Inches(0.5),
            str(i + 1),
            size=22,
            bold=True,
            color=PRIMARY,
        )
        add_text(
            slide,
            MARGIN + Inches(0.95),
            y + Inches(0.28),
            Inches(10.6),
            Inches(0.6),
            text,
            size=16,
            color=INK,
        )
    content_footer(slide, index, total)


def slide_close(prs, total, index):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    paint_light(slide)
    right_rail(slide)
    logo(slide, height=Inches(0.4))
    add_text(
        slide,
        MARGIN,
        Inches(2.9),
        Inches(12),
        Inches(0.8),
        "Thank you",
        size=40,
        bold=True,
        color=PRIMARY,
        align=PP_ALIGN.CENTER,
    )
    add_text(
        slide,
        MARGIN,
        Inches(3.8),
        Inches(12),
        Inches(0.4),
        "Labs: code/15- Deep Learning",
        size=16,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )
    add_text(slide, MARGIN, Inches(6.7), Inches(6), Inches(0.3), "ETRA", size=12, bold=True, color=PRIMARY)
    content_footer(slide, index, total)


def _topic_slide_count(topic: str) -> int:
    content = TOPIC_CONTENT.get(topic)
    if not content:
        return 1
    return 1 + len(content.get("extra_slides") or [])


def main() -> None:
    s = SESSION
    topic_pages = sum(_topic_slide_count(t) for t in s["topics"])
    total = 6 + topic_pages
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H

    slide_title(prs, total)
    n = 2
    slide_big_picture(prs, total, n)
    n = 3
    slide_section_divider(prs, total, n)
    n = 4
    slide_agenda(prs, total, n)
    for i, topic in enumerate(s["topics"], start=1):
        n += 1
        added = slide_topic(prs, total, n, i, topic)
        n += added - 1

    n += 1
    slide_takeaways(prs, total, n)
    n += 1
    slide_close(prs, total, n)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(f"Saved: {OUT}")
    print(f"Slides: {len(prs.slides)}")
    print("Brand: ETRA Design System v1.0")
    print("Topics:", " · ".join(s["topics"]))


if __name__ == "__main__":
    main()
