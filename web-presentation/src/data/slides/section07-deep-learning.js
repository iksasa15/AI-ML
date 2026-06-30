/** Auto-split from presentationData — section07-deep-learning */
export const slides = [
  {
    "title": "Deep Learning: Introduction",
    "subtitle": "Foundations → Optimization → Architectures → Advanced Topics",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "body": "Each phase answers a different question: Phase 1 — why depth and what a neuron actually computes; Phase 2 — how training stays stable and generalizes; Phase 3 — which architecture matches images vs sequences; Phase 4 — generation and reconstruction.",
    "note": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
    "speakerNote": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
    "titleIcon": "neural-net",
    "bullets": [
      {
        "text": "Four phases: foundations → optimization → architectures → autoencoders.",
        "icon": "workflow"
      },
      {
        "text": "Each phase has a lab-style checkpoint — pause at phase boundaries.",
        "icon": "check"
      },
      {
        "text": "Focus on deep learning basics — phase breaks are intentional.",
        "icon": "idea"
      }
    ]
  },
  {
    "title": "Phase 1: Foundations & Neural Core",
    "subtitle": "Why depth, neurons, and forward pass",
    "speakerNote": "Phase 1 (~45 min): Set expectations — we build intuition before scale. Start with the perceptron diagram, then one forward-pass walkthrough on the board. Ask: 'Why can't a single linear layer solve XOR?' Pause after the loss slide for a 1-minute pair discussion.",
    "titleIcon": "neural-net",
    "illustration": "neural-net",
    "bullets": [
      {
        "text": "Goal: understand what a neuron computes and why stacking layers enables hierarchical features.",
        "icon": "neural-net"
      },
      {
        "text": "Topics: perceptron, activations, MLP, forward propagation, and loss functions.",
        "icon": "formula"
      },
      {
        "text": "Exit check: explain z = w·x + b and why nonlinearity is required between layers.",
        "icon": "check"
      }
    ],
    "table": {
      "title": "Phase 1 roadmap",
      "headers": [
        "Block",
        "Question it answers"
      ],
      "rows": [
        [
          "Perceptron & MLP",
          "What does one layer compute?"
        ],
        [
          "Forward pass",
          "How does inference flow through the graph?"
        ],
        [
          "Loss & gradients",
          "What are we optimizing?"
        ]
      ]
    }
  },
  {
    "title": "What Is Deep Learning?",
    "subtitle": "Definition in One Sentence — Then the Details",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "bullets": [
      {
        "text": "Deep learning learns a parameterized mapping from inputs to outputs by stacking nonlinear transformations (layers). “Deep” means multiple such transformations—hierarchical features, not one giant linear rule.",
        "icon": "regression"
      },
      {
        "text": "Training = pick a loss that measures mistakes, then adjust weights with gradients so average loss drops on data (generalization to unseen data is the real goal).",
        "icon": "train"
      },
      {
        "text": "Unlike fixed pipelines of hand-crafted features, the network learns representations that are tuned to the task (edges → textures → parts → objects in vision, etc.).",
        "icon": "monitoring"
      }
    ],
    "table": {
      "title": "Three ingredients you always have",
      "headers": [
        "Ingredient",
        "What it means"
      ],
      "rows": [
        [
          "Architecture",
          "How signals flow (MLP, CNN, RNN, Transformer, …)"
        ],
        [
          "Loss / objective",
          "What “better” means for your task (MSE, cross-entropy, …)"
        ],
        [
          "Optimizer + data",
          "How you search parameters and what examples you show"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Deep learning learns a parameterized mapping from inputs to outputs by stacking  · Training = pick a loss that measures mistakes, then adjust weights with gradient. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "neural-net"
  },
  {
    "title": "AI, Machine Learning, and Deep Learning",
    "subtitle": "Subset Relationships — Not Interchangeable Labels",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "bullets": [
      {
        "text": "Artificial intelligence (AI): the broad field—rules, search, optimization, learning, planning—anything that aims at intelligent behavior.",
        "icon": "neural-net"
      },
      {
        "text": "Machine learning (ML): a subfield of AI where behavior improves from data via a learning algorithm (not only hand-written rules).",
        "icon": "data"
      },
      {
        "text": "Deep learning (DL): a subfield of ML using deep neural networks—multiple learned nonlinear layers; representation learning is central.",
        "icon": "regression"
      }
    ],
    "table": {
      "title": "Containment (conceptual)",
      "headers": [
        "Set",
        "Contains"
      ],
      "rows": [
        [
          "AI",
          "Rule systems, classical search, ML, knowledge bases, …"
        ],
        [
          "ML",
          "Linear models, trees, kernel SVMs, shallow nets, deep nets"
        ],
        [
          "DL",
          "CNNs, RNNs/GRU/LSTM, Transformers, GANs, VAEs, …"
        ]
      ]
    },
    "note": "Saying “we used AI” is vague; “we used supervised DL with a CNN” is precise.",
    "speakerNote": "Saying “we used AI” is vague; “we used supervised DL with a CNN” is precise.",
    "titleIcon": "neural-net"
  },
  {
    "title": "Use-Case Fit: When Deep Learning Shines — and When to Skip It",
    "subtitle": "Match Method to Data, Risk, and Budget",
    "bullets": [
      {
        "text": "DL is strongest when: large data (or strong pre-training), high-dimensional raw inputs (images, text, speech), and compositionality you want learned end-to-end.",
        "icon": "train"
      },
      {
        "text": "Think twice when: tiny tabular datasets, strict interpretability requirements, tight latency on CPU without optimization, or simple baselines already solve the problem.",
        "icon": "data"
      },
      {
        "text": "Always compare against strong baselines (logistic regression, gradient boosting, k-NN on engineered features)—DL must earn its complexity on validation metrics you care about.",
        "icon": "test"
      }
    ],
    "table": {
      "headers": [
        "Situation",
        "Typical first choice",
        "Why"
      ],
      "rows": [
        [
          "Large labeled images / audio / text",
          "Pre-trained DL + fine-tune",
          "Raw inputs; hierarchical features"
        ],
        [
          "Small tabular (< few k rows)",
          "Trees / linear + regularization",
          "Lower variance, fast iteration, interpretability"
        ],
        [
          "Need causal or legal explanation",
          "Simpler model or hybrid",
          "Auditability and stability"
        ],
        [
          "Plenty of GPUs + big data",
          "Larger nets + careful tuning",
          "Capacity + regularization can scale"
        ],
        [
          "Edge device, millisecond latency",
          "Small distilled / quantized models",
          "Memory and power limits"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: DL is strongest when: large data (or strong pre-training), high-dimensional raw  · Think twice when: tiny tabular datasets, strict interpretability requirements, t. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "neural-net"
  },
  {
    "title": "Single Neuron (Perceptron): Math, Weights, and Bias",
    "subtitle": "One Affine Map + One Nonlinearity",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Perceptron_example.svg"
    ],
    "formula": "z = w^\\top x + b,\\quad a = f(z),\\quad \\hat{y} = a\\ \\text{(or further processing)}",
    "bullets": [
      {
        "text": "Affine part (see formula above): z is the weighted sum of inputs plus b—each x_i is multiplied by w_i. The bias b shifts the decision boundary (same orientation, normal w); it does not rotate the separating hyperplane.",
        "icon": "formula"
      },
      {
        "text": "Weights encode which patterns excite the neuron; training adjusts w and b so that on labeled data the loss decreases.",
        "icon": "train"
      },
      {
        "text": "With no hidden layer and a monotonic activation, the decision boundary in input space is linear (a hyperplane)—powerful but limited.",
        "icon": "regression"
      }
    ],
    "table": {
      "headers": [
        "Symbol",
        "Shape intuition",
        "Role"
      ],
      "rows": [
        [
          "x",
          "Feature vector (length d)",
          "One training example’s inputs"
        ],
        [
          "w",
          "Same length as x",
          "Direction + strength of sensitivity to each feature"
        ],
        [
          "b",
          "Scalar",
          "Offset / threshold in logit space"
        ],
        [
          "f",
          "Maps ℝ → ℝ (per neuron)",
          "Introduces nonlinearity (or identity)"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Affine part (see formula above): z is the weighted sum of inputs plus b—each x_i · Weights encode which patterns excite the neuron; training adjusts w and b so tha. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Weight Initialization: Why Zeros Break Training",
    "subtitle": "Symmetry Must Be Broken",
    "bullets": [
      {
        "text": "If all weights in a layer start equal (especially zero), every hidden unit receives the same gradient and stays identical forever—symmetry never breaks.",
        "icon": "neural-net"
      },
      {
        "text": "Random initialization makes each unit walk a different path in parameter space so they can specialize as feature detectors.",
        "icon": "feature"
      },
      {
        "text": "Frameworks use formulas like He (Kaiming) for ReLU: variance = 2/n_in, and Xavier (Glorot) for Tanh: variance = 2/(n_in + n_out) to keep activation scale stable.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Init Scheme",
        "Problem it avoids",
        "Best suited for"
      ],
      "rows": [
        [
          "All zeros",
          "Hidden units stay identical; no representation diversity",
          "None (always avoid for weights)"
        ],
        [
          "Xavier (Glorot)",
          "Vanishing or exploding variance across layers",
          "Sigmoid / Tanh activations"
        ],
        [
          "He (Kaiming)",
          "Variance drop due to ReLU zeroing out half the signals",
          "ReLU / Leaky ReLU activations"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: If all weights in a layer start equal (especially zero), every hidden unit recei · Random initialization makes each unit walk a different path in parameter space s. Budget ~3 min. He and Xavier are standard math formulas used behind the scenes in frameworks like PyTorch and TensorFlow.",
    "titleIcon": "idea"
  },
  {
    "title": "Activation Functions: Sigmoid, Tanh, and ReLU",
    "subtitle": "Nonlinearity is the Key to Network Depth",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Sigmoid-function.svg",
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Hyperbolic_Tangent.svg"
    ],
    "formula": "\\sigma(z)=\\frac{1}{1+e^{-z}},\\quad \\tanh(z) = \\frac{e^z-e^{-z}}{e^z+e^{-z}},\\quad \\mathrm{ReLU}(z)=\\max(0,z)",
    "bullets": [
      {
        "text": "Sigmoid: maps inputs to (0, 1)—useful for probabilities, but suffers from vanishing gradients when z is very large or very small (saturation).",
        "icon": "probability"
      },
      {
        "text": "Tanh: zero-centered, maps inputs to (-1, 1)—often nicer than sigmoid for hidden layers but still saturates.",
        "icon": "neural-net"
      },
      {
        "text": "ReLU: modern default for deep stacks—cheap to compute, avoids vanishing gradient on positive domain; leaky ReLU / ELU are variants.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Function",
        "Range",
        "Primary Use-case"
      ],
      "rows": [
        [
          "Sigmoid",
          "(0, 1)",
          "Binary classification output layer, gating networks"
        ],
        [
          "Tanh",
          "(-1, 1)",
          "Hidden layers (recurrent networks)"
        ],
        [
          "ReLU",
          "[0, ∞)",
          "Default choice for hidden layers in MLPs and CNNs"
        ]
      ]
    },
    "speakerNote": "Explain why linear layers stacked together compress to a single linear layer: f(g(x)) = W1(W2x + b2) + b1 = W_new x + b_new. Nonlinear activations prevent this collapse, giving networks representational capacity.",
    "titleIcon": "neural-net",
    "conceptAnimation": "sigmoid-threshold"
  },
  {
    "title": "The XOR Problem: Why Hidden Layers Are Logically Necessary",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Perceptron_XOR_task.svg"
    ],
    "bullets": [
      {
        "text": "XOR is not linearly separable in the 2D input plane: no single line separates class 1 from class 0 on the four corners.",
        "icon": "regression"
      },
      {
        "text": "A single perceptron computes a half-space; XOR requires nonlinear mixing of inputs—exactly what a hidden layer provides.",
        "icon": "regression"
      },
      {
        "text": "Hidden units reparameterize inputs into a space where the task becomes linearly separable—this is the core intuition for representation learning.",
        "icon": "regression"
      }
    ],
    "table": {
      "headers": [
        "x₁",
        "x₂",
        "XOR"
      ],
      "rows": [
        [
          "0",
          "0",
          "0"
        ],
        [
          "0",
          "1",
          "1"
        ],
        [
          "1",
          "0",
          "1"
        ],
        [
          "1",
          "1",
          "0"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: XOR is not linearly separable in the 2D input plane: no single line separates cl · A single perceptron computes a half-space; XOR requires nonlinear mixing of inpu. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "From Perceptron to MLP (Multi-Layer Perceptron)",
    "subtitle": "Depth = Composed Nonlinear Features",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Multilayer_Perceptron_with_one_hidden_layer.svg"
    ],
    "formula": "h = \\phi(W_1x+b_1),\\quad \\hat{y}=\\tau(W_2h+b_2)",
    "bullets": [
      {
        "text": "Each hidden layer applies an affine map followed by a nonlinearity, producing new features \\(h\\) as functions of the original inputs.",
        "icon": "regression"
      },
      {
        "text": "Width (units per layer) and depth (number of layers) trade off capacity, data needs, compute, and optimization difficulty.",
        "icon": "neural-net"
      },
      {
        "text": "Universal approximation (broad strokes): one sufficiently wide hidden layer can approximate many continuous functions on compact domains—in practice depth + inductive bias wins.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "headers": [
        "Hyperparameter",
        "What it controls"
      ],
      "rows": [
        [
          "Hidden width",
          "How many independent nonlinear features per layer"
        ],
        [
          "Depth",
          "How many levels of composition (edges→textures→…)"
        ],
        [
          "Skip / residual",
          "Ease of optimization in very deep nets"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Each hidden layer applies an affine map followed by a nonlinearity, producing ne · Width (units per layer) and depth (number of layers) trade off capacity, data ne. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "idea"
  },
  {
    "title": "Forward Propagation: The Engine of Inference",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Multilayer_Perceptron_with_one_hidden_layer.svg"
    ],
    "bullets": [
      {
        "text": "Forward pass: feed input \\(x\\) through each layer in order—compute logits or scores at the end (then softmax for class probabilities if needed).",
        "icon": "neural-net"
      },
      {
        "text": "Implementation-wise this is a computational graph: each op (matmul, ReLU, …) knows how to propagate values forward.",
        "icon": "neural-net"
      },
      {
        "text": "Training repeats forward passes on mini-batches for efficiency and gradient noise that can help generalization.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Step",
        "Operation",
        "Output carries…"
      ],
      "rows": [
        [
          "1",
          "Linear: \\(z = Wx + b\\)",
          "Weighted sum at each unit"
        ],
        [
          "2",
          "Activation: \\(a = f(z)\\)",
          "Nonlinear feature for next layer"
        ],
        [
          "3",
          "Repeat / head",
          "Class logits or regression value"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Forward pass: feed input \\(x\\) through each layer in order—compute logits or sco · Implementation-wise this is a computational graph: each op (matmul, ReLU, …) kno. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "neural-net",
    "conceptAnimation": "neural-network"
  },
  {
    "title": "Loss Functions: MSE vs Cross-Entropy",
    "subtitle": "Match the Loss to the Output and Task",
    "sections": [
      {
        "heading": "Regression — Mean Squared Error (MSE)",
        "formula": "\\mathcal{L} = \\frac{1}{N}\\sum_i \\|\\hat{y}_i - y_i\\|^2",
        "bullets": [
          {
            "text": "Penalizes large errors heavily (quadratic); differentiable everywhere—classic for continuous targets.",
            "icon": "formula"
          },
          {
            "text": "Assumes Gaussian-like noise in a probabilistic story; outliers can dominate—Huber loss is a robust alternative.",
            "icon": "formula"
          }
        ]
      },
      {
        "heading": "Classification — Cross-entropy",
        "formula": "\\mathcal{L} = -\\frac{1}{N}\\sum_i \\sum_c y_{ic}\\log \\hat{p}_{ic}\\quad\\text{(often with logits + log-softmax for stability)}",
        "bullets": [
          {
            "text": "Compares predicted probabilities \\(\\hat{p}\\) to true distribution (one-hot or soft labels).",
            "icon": "encoding"
          },
          {
            "text": "Pairs naturally with softmax at the output; gradients are well-behaved when implemented in log-space.",
            "icon": "formula"
          }
        ]
      }
    ],
    "table": {
      "headers": [
        "Task",
        "Common head + loss"
      ],
      "rows": [
        [
          "Regression",
          "Linear output + MSE / Huber"
        ],
        [
          "Binary classification",
          "Sigmoid + binary cross-entropy"
        ],
        [
          "Multi-class",
          "Softmax + cross-entropy"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Penalizes large errors heavily (quadratic); differentiable everywhere—classic fo · Assumes Gaussian-like noise in a probabilistic story; outliers can dominate—Hube. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "formula"
  },
  {
    "title": "Backpropagation: Chain Rule on the Computational Graph",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "formula": "\\frac{\\partial \\mathcal{L}}{\\partial w}=\\frac{\\partial \\mathcal{L}}{\\partial z}\\frac{\\partial z}{\\partial w}\\quad\\text{(chain along paths)}",
    "bullets": [
      {
        "text": "Backprop applies the chain rule systematically: compute adjoints \\(\\partial \\mathcal{L}/\\partial\\) each intermediate tensor from outputs backward.",
        "icon": "neural-net"
      },
      {
        "text": "Reverse-mode autodiff (backprop) is efficient when many parameters feed one scalar loss—exactly the neural net case.",
        "icon": "scaling"
      },
      {
        "text": "Modern frameworks (PyTorch, JAX, TensorFlow) build the graph (explicit or traced) and implement this reliably—you still debug shapes, numerical stability, and vanishing gradients.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "headers": [
        "Idea",
        "Meaning"
      ],
      "rows": [
        [
          "Shared subexpressions",
          "Same forward values reused; backward visits each edge once"
        ],
        [
          "Topological order",
          "Visit nodes after their successors—dynamic programming on the graph"
        ]
      ]
    },
    "note": "Understanding backprop = understanding which paths carry gradient and which activations saturate.",
    "speakerNote": "Understanding backprop = understanding which paths carry gradient and which activations saturate.",
    "titleIcon": "neural-net"
  },
  {
    "title": "Phase 2: Optimization & Training Strategy",
    "subtitle": "Stable Optimization + Generalization",
    "bullets": [
      {
        "text": "Phase 2 is about the art of training: diagnosing fit, controlling gradients, picking optimizers, normalizing, and regularizing.",
        "icon": "train"
      },
      {
        "text": "Good models are not only “big”—they match capacity to data, monitor validation faithfully, and fail visibly when something is wrong.",
        "icon": "test"
      }
    ],
    "table": {
      "title": "What you will control in practice",
      "headers": [
        "Layer",
        "Examples"
      ],
      "rows": [
        [
          "Optimization",
          "SGD, Adam, gradient clipping"
        ],
        [
          "Stabilization",
          "Batch Norm, residual paths, initialization"
        ],
        [
          "Generalization",
          "Dropout, weight decay, early stopping"
        ]
      ]
    },
    "speakerNote": "Phase 2 (~40 min): Optimization & Training Strategy. Use the table as your agenda. After the overview, dive into the first technical slide without a separate divider pause.",
    "titleIcon": "compare"
  },
  {
    "title": "Training Diagnostics: Underfitting, Good Fit, and Overfitting",
    "subtitle": "Read Train vs Validation Behavior",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/Overfitting_svg.svg"
    ],
    "bullets": [
      {
        "text": "Underfitting: both train and validation error stay high—the model is too simple, features are insufficient, or optimization is stuck (LR too low, wrong loss).",
        "icon": "train"
      },
      {
        "text": "Good fit: train and validation errors are both low and track each other; small gap is normal if train is slightly better.",
        "icon": "train"
      },
      {
        "text": "Overfitting: train error keeps dropping while validation worsens or plateaus badly—the model memorizes idiosyncrasies (noise, augment leakage).",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Regime",
        "Train loss",
        "Val loss / metric",
        "Typical response"
      ],
      "rows": [
        [
          "Underfitting",
          "High",
          "High",
          "More capacity, better features, longer train, higher LR (carefully)"
        ],
        [
          "Good fit",
          "Low",
          "Low, close to train",
          "Keep regularization; ship or iterate on data"
        ],
        [
          "Overfitting",
          "Very low",
          "Worse / diverging gap",
          "More data, dropout, wd, simpler model, early stop"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Underfitting: both train and validation error stay high—the model is too simple, · Good fit: train and validation errors are both low and track each other; small g. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "evaluate"
  },
  {
    "title": "Vanishing and Exploding Gradients",
    "subtitle": "Depth Multiplies Jacobians Layer by Layer",
    "bullets": [
      {
        "text": "Vanishing: backprop multiplies many factors \\(<1\\) (saturated sigmoid/tanh, poor init)—early layers get tiny updates and learn slowly.",
        "icon": "neural-net"
      },
      {
        "text": "Exploding: repeated factors \\(>1\\) or large weights produce huge parameter updates—loss spikes, NaNs.",
        "icon": "formula"
      },
      {
        "text": "Fixes are layered: architecture (residual paths), activations (ReLU), initialization (He/Xavier), normalization (BN/LN), and optimization (clipping).",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Symptom",
        "Likely cause",
        "Mitigation"
      ],
      "rows": [
        [
          "Early layers barely move",
          "Vanishing chain through saturated units",
          "ReLU, He init, residuals, norm"
        ],
        [
          "Loss → NaN quickly",
          "Exploding activations or LR too high",
          "Clip grads, lower LR, check loss scaling"
        ],
        [
          "Stable then sudden blow-up",
          "Rare but real—mixed precision, bad data batch",
          "Finite checks, gradient clipping"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Vanishing: backprop multiplies many factors \\(<1\\) (saturated sigmoid/tanh, poor · Exploding: repeated factors \\(>1\\) or large weights produce huge parameter updat. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "formula"
  },
  {
    "title": "Optimizers: SGD and Adam",
    "subtitle": "Learning rate, Momentum, and Adaptive Steps",
    "bullets": [
      {
        "text": "SGD + momentum: accumulates updates in a velocity vector to dampen oscillations in ravines and accelerate along consistent directions.",
        "icon": "embedding"
      },
      {
        "text": "Adam: tracks both first-moment (momentum) and second-moment (recent squared gradients) of gradients to adapt learning rates per parameter.",
        "icon": "regularization"
      },
      {
        "text": "SGD is often preferred in computer vision for generalization, while Adam is the default starting point for Transformers and general MLPs.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Optimizer",
        "Core mechanism",
        "When to use"
      ],
      "rows": [
        [
          "Vanilla SGD",
          "Step in negative gradient direction",
          "Rarely used alone today"
        ],
        [
          "SGD + Momentum",
          "Adds fraction of previous step direction",
          "Standard for CV models"
        ],
        [
          "Adam",
          "Adapts learning rate per parameter based on gradients",
          "Robust default for text/tabular/MLPs"
        ]
      ]
    },
    "note": "Learning rate (LR) is the single most important hyperparameter to tune (typically searched on a log grid, e.g., 1e-4, 1e-3, 1e-2).",
    "speakerNote": "Make sure students understand that Adam dynamically changes the learning rate per weight based on gradient history, while SGD updates weights uniformly.",
    "titleIcon": "regularization"
  },
  {
    "title": "Normalization: Batch Normalization",
    "subtitle": "Stabilize Activations and Speed Up Deep Training",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "bullets": [
      {
        "text": "Batch Norm (BN): normalizes activations across the mini-batch for each channel, then learns scale γ and shift β.",
        "icon": "train"
      },
      {
        "text": "It stabilizes internal activations, allowing higher learning rates and reducing dependency on precise initialization.",
        "icon": "scaling"
      },
      {
        "text": "Alternative is Layer Norm (LN) which normalizes across features per example—standard in Transformers and sequence models.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Method",
        "Normalization dimension",
        "Typical use-case"
      ],
      "rows": [
        [
          "Batch Norm",
          "Across batch and spatial dimensions",
          "CNN classifiers, ResNets"
        ],
        [
          "Layer Norm",
          "Across features for a single token/example",
          "Transformers, RNNs"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Batch Norm (BN): for each channel, normalize across batch and spatial dims, then · Layer Norm (LN): normalize across features for each example independently—no bat. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling"
  },
  {
    "title": "Regularization: Dropout, Weight Decay, and Early Stopping",
    "subtitle": "Constrain Capacity to Prevent Overfitting",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Dropout.svg"
    ],
    "sections": [
      {
        "heading": "Dropout",
        "bullets": [
          {
            "text": "Randomly zero out hidden units during training with probability p (e.g., 0.2-0.5) so neurons cannot co-adapt.",
            "icon": "train"
          },
          {
            "text": "Acts as a powerful implicit ensemble method; disabled during inference (evaluation mode).",
            "icon": "forest"
          }
        ]
      },
      {
        "heading": "Weight Decay (L2 regularization)",
        "bullets": [
          {
            "text": "Adds a penalty to the loss proportional to the squared sum of weights to keep weights small and smooth.",
            "icon": "regularization"
          }
        ]
      },
      {
        "heading": "Early stopping",
        "bullets": [
          {
            "text": "Monitor validation loss during training and stop when it ceases to improve for a certain number of epochs (patience).",
            "icon": "test"
          }
        ]
      }
    ],
    "table": {
      "headers": [
        "Technique",
        "Primary action",
        "Inference behavior"
      ],
      "rows": [
        [
          "Dropout",
          "Randomly drops connections",
          "Turned OFF (weights scaled)"
        ],
        [
          "L2 Weight Decay",
          "Shrinks weights toward zero",
          "Turned ON (weights are static)"
        ],
        [
          "Early Stopping",
          "Halts training at lowest val loss",
          "N/A (model is checkpointed)"
        ]
      ]
    },
    "speakerNote": "Make sure to explain that during evaluation/inference, we turn off dropout (e.g., model.eval() in PyTorch) so the predictions are deterministic.",
    "titleIcon": "regularization"
  },
  {
    "title": "Phase 3: Specialized Architectures (Vision & Sequences)",
    "subtitle": "Images vs Ordered Sequences",
    "bullets": [
      {
        "text": "Images have 2D locality and translation symmetry—convolutions exploit shared weights across space.",
        "icon": "cnn"
      },
      {
        "text": "Sequences have order—recurrence, causal convolutions, or attention carry context across time or position.",
        "icon": "cnn"
      },
      {
        "text": "Choosing the right inductive bias beats blindly scaling the wrong architecture.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Modality",
        "Core structure",
        "Representative layers"
      ],
      "rows": [
        [
          "Image / video frames",
          "Spatial grids",
          "Conv2D, pooling, residual blocks"
        ],
        [
          "Text / speech / sensors",
          "Ordered tokens or time steps",
          "RNN/GRU/LSTM, causal conv, self-attention"
        ]
      ]
    },
    "speakerNote": "Phase 3 (~40 min): Specialized Architectures (Vision & Sequences). Use the table as your agenda. After the overview, dive into the first technical slide without a separate divider pause.",
    "titleIcon": "data"
  },
  {
    "title": "Image Data: How Computers “See” Pixels",
    "subtitle": "Tensors, Channels, and Local Structure",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "bullets": [
      {
        "text": "A color image is usually a tensor of shape H×W×3 (RGB); each entry is an intensity discretized into 8 bits (0–255) before normalization.",
        "icon": "scaling"
      },
      {
        "text": "Meaning lives in local neighborhoods: small patches reveal edges; larger contexts reveal objects—hierarchical composition.",
        "icon": "data"
      },
      {
        "text": "Augmentation (crop, flip, color jitter) teaches invariance; normalization (e.g., ImageNet mean/std) stabilizes optimization.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Stage",
        "What happens"
      ],
      "rows": [
        [
          "Raw sensor",
          "Quantized intensities per channel per pixel"
        ],
        [
          "Preprocess",
          "Resize, crop, normalize, augment"
        ],
        [
          "Model input",
          "Batch × C × H × W tensor fed to stem convolutions"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: A color image is usually a tensor of shape H×W×3 (RGB); each entry is an intensi · Meaning lives in local neighborhoods: small patches reveal edges; larger context. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "data"
  },
  {
    "title": "Convolution: Kernels, Edge Filters, and Feature Maps",
    "subtitle": "Sliding Linear Filters + Nonlinearity",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png",
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/SobelImageY.png"
    ],
    "bullets": [
      {
        "text": "A kernel is a small learnable matrix (e.g., 3×3) that responds to local patterns; multiple kernels produce a stack of feature maps.",
        "icon": "svm"
      },
      {
        "text": "Classical edge detectors (Sobel, shown) are fixed kernels; CNNs learn task-specific filters from data.",
        "icon": "svm"
      },
      {
        "text": "Deep stacks widen the receptive field: early layers ≈ edges/textures; late layers ≈ object parts and semantics.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "headers": [
        "Hyperparameter",
        "Effect"
      ],
      "rows": [
        [
          "Kernel size",
          "Immediate neighborhood size (3×3 common)"
        ],
        [
          "Stride",
          "Downsample spatially when >1"
        ],
        [
          "Padding",
          "Keep spatial size (same padding) or control border"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: A kernel is a small learnable matrix (e.g., 3×3) that responds to local patterns · Classical edge detectors (Sobel, shown) are fixed kernels; CNNs learn task-speci. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "svm"
  },
  {
    "title": "CNN Blocks: From Conv-Pool to ResNet",
    "subtitle": "Depth, Regularization, and Residual Learning",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "formula": "y = \\mathcal{F}(x) + x\\quad\\text{(residual block learns }\\mathcal{F}\\text{, identity carries gradient)}",
    "bullets": [
      {
        "text": "Standard CNN: Alternates Conv2D, Activation (ReLU), and Pooling (Max Pool) layers to extract spatial features and downsample.",
        "icon": "cnn"
      },
      {
        "text": "AlexNet (2012): First large-scale CNN to win ImageNet; used ReLU, dropout, and multi-GPU training.",
        "icon": "scaling"
      },
      {
        "text": "ResNet (2015): Introduced skip (shortcut) connections, allowing gradients to flow back easily through identity mappings. Enables training networks with 100+ layers.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "title": "Landmark ideas (simplified)",
      "headers": [
        "Model / block",
        "Idea you should remember"
      ],
      "rows": [
        [
          "Conv + MaxPool",
          "Feature extraction + spatial downsampling"
        ],
        [
          "AlexNet",
          "Scale + ReLU + data aug on GPUs"
        ],
        [
          "ResNet",
          "Residual mapping F(x)+x; skip paths help gradients"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. ResNet skip connections resolve the vanishing gradient issue in extremely deep networks.",
    "titleIcon": "cnn"
  },
  {
    "title": "Transfer Learning with Pretrained Models",
    "subtitle": "Reuse Features, Adapt the Head",
    "bullets": [
      {
        "text": "Pretraining on millions of labeled images (e.g. ImageNet) learns general low/mid-level filters (edges, textures) transferable to new domains.",
        "icon": "train"
      },
      {
        "text": "Typical recipe: replace the final classifier head; freeze the pretrained backbone for small datasets, or fine-tune with a very small learning rate for larger datasets.",
        "icon": "train"
      },
      {
        "text": "Transfer learning dramatically reduces training time and required labeled samples for a new vision task.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Target Dataset Size",
        "Strategy"
      ],
      "rows": [
        [
          "Small target dataset",
          "Freeze backbone, train head only"
        ],
        [
          "Medium dataset",
          "Fine-tune top blocks with a smaller learning rate"
        ],
        [
          "Large target dataset",
          "Full fine-tune of all layers with a small learning rate"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Pretraining on millions of labeled images learns general low/mid-level filters. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Sequential Data & Vanilla RNNs",
    "subtitle": "One Transition, Unfolded Through Time",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg"
    ],
    "formula": "h_t = \\phi\\big(W_{hh} h_{t-1} + W_{xh} x_t + b\\big)",
    "bullets": [
      {
        "text": "Sequence modeling: text, audio, and sensor streams have order; shuffling them breaks their semantic meaning.",
        "icon": "token"
      },
      {
        "text": "Recurrent Neural Networks (RNN): maintain a recurrent state vector h_t that acts as a memory summary of the past.",
        "icon": "rnn"
      },
      {
        "text": "The same weights W_hh and W_xh are reused across all timesteps (parameter efficiency), but long-range dependencies suffer from vanishing/exploding gradients.",
        "icon": "rnn"
      }
    ],
    "table": {
      "headers": [
        "Feature",
        "Limitation"
      ],
      "rows": [
        [
          "Reuses parameters",
          "Sequential execution (cannot parallelize steps)"
        ],
        [
          "Tracks state h_t",
          "Cannot hold long-term memories in practice"
        ]
      ]
    },
    "speakerNote": "Make sure students understand that vanilla RNNs struggle with long sentences because backpropagating through 50 timesteps is mathematically similar to multiplying a weight matrix 50 times, leading to vanishing or exploding gradients.",
    "titleIcon": "rnn"
  },
  {
    "title": "LSTM: Gates for Long-Term Memory",
    "subtitle": "Forget, Input, Output — Cell State Flows Linearly",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/6/63/Long_Short-Term_Memory.svg"
    ],
    "bullets": [
      {
        "text": "Cell state c_t can accumulate information with an additive path—mitigates vanishing signal compared with plain tanh RNNs.",
        "icon": "rnn"
      },
      {
        "text": "Forget gate f_t decides how much past cell content to erase; input gate i_t and candidate g̃ control new information written.",
        "icon": "rnn"
      },
      {
        "text": "Output gate o_t filters what becomes hidden state h_t exposed to the next layer or timestep.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "headers": [
        "Gate",
        "Role (intuition)"
      ],
      "rows": [
        [
          "f_t",
          "Erase irrelevant history from the cell"
        ],
        [
          "i_t",
          "Allow new candidate information in"
        ],
        [
          "o_t",
          "Expose part of the cell as h_t"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Cell state c_t can accumulate information with an additive path—mitigates vanish · Forget gate f_t decides how much past cell content to erase; input gate i_t and . Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "rnn"
  },
  {
    "title": "Phase 4: Generative Models & Reconstruction",
    "subtitle": "Generative Models and Representation Learning",
    "bullets": [
      {
        "text": "Phase 4 explores unsupervised representation learning and basic generative frameworks.",
        "icon": "embedding"
      },
      {
        "text": "Autoencoders are the foundation here: they learn to compress inputs to a low-dimensional bottleneck (latent space) and reconstruct them.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Concept",
        "Input",
        "Goal"
      ],
      "rows": [
        [
          "Autoencoder",
          "Unlabeled data x",
          "Compress and reconstruct x̂ ≈ x"
        ]
      ]
    },
    "speakerNote": "Phase 4 (~15 min): Autoencoders. Introduce the concept of reconstruction loss: penalizing the network for failing to restore its own inputs.",
    "titleIcon": "llm"
  },
  {
    "title": "Autoencoders (AE): Compression and Reconstruction",
    "subtitle": "Encoder → Bottleneck → Decoder",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "bullets": [
      {
        "text": "Encoder f maps input x to a low-dimensional code z = f(x); decoder g maps z back to x̂ ≈ x.",
        "icon": "encoding"
      },
      {
        "text": "The bottleneck forces a compressed representation—useful for denoising (train on noisy→clean), anomaly detection (high recon error = abnormal).",
        "icon": "train"
      },
      {
        "text": "Linear AE with MSE relates to PCA when constraints align—nonlinear AE learns curved manifolds.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Variant",
        "Idea"
      ],
      "rows": [
        [
          "Denoising AE",
          "Corrupt input, reconstruct clean—robust features"
        ],
        [
          "Sparse AE",
          "Penalty on activations—encourages informative sparse codes"
        ],
        [
          "Contractive AE",
          "Penalize sensitivity of code to small input changes—smoother latent map"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Encoder f maps input x to a low-dimensional code z = f(x); decoder g maps z back · The bottleneck forces a compressed representation—useful for denoising (train on. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "encoding",
    "conceptAnimation": "encoding-comparison"
  }
];
