/** Auto-split from presentationData — section07-deep-learning */
export const slides = [
  {
    "title": "Deep Learning: Introduction",
    "subtitle": "Foundations → Optimization → Architectures → Advanced Topics",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/Artificial_neural_network.svg"
    ],
    "body": "Each phase answers a different question: Phase 1 — why depth and what a neuron actually computes; Phase 2 — how training stays stable and generalizes; Phase 3 — which architecture matches images vs sequences; Phase 4 — generation, compression, and deployment.",
    "note": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
    "speakerNote": "Phase 1 focus: understand the “why” and the mathematical mechanics of a single neuron before scaling to layers and data.",
    "titleIcon": "neural-net",
    "bullets": [
      {
        "text": "Four phases: foundations → optimization → architectures → deployment.",
        "icon": "workflow"
      },
      {
        "text": "Each phase has a lab-style checkpoint — pause at phase boundaries.",
        "icon": "check"
      },
      {
        "text": "Expect ~3 hours for Section 7 — phase breaks are intentional.",
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
    "title": "Brief History: Eras That Shaped Deep Learning",
    "subtitle": "Old Ideas — New Scale",
    "bullets": [
      {
        "text": "Perceptrons (1950s–60s): proof-of-concept linear classifiers; optimism, then limits (XOR, single-layer).",
        "icon": "regression"
      },
      {
        "text": "Backpropagation & MLPs (1980s–90s): chain rule training for multilayer nets; practical on small data, still limited by compute and datasets.",
        "icon": "train"
      },
      {
        "text": "Deep CNN breakthrough (2012–): large labeled vision data + GPUs made depth trainable; depth became the default for perception.",
        "icon": "train"
      },
      {
        "text": "Today: transformers, generative models, and self-supervised pre-training—same gradient machinery, bigger models and data.",
        "icon": "train"
      }
    ],
    "table": {
      "title": "Timeline (simplified)",
      "headers": [
        "Era",
        "What changed"
      ],
      "rows": [
        [
          "1950s–70s",
          "Perceptron, early optimism, XOR limitation"
        ],
        [
          "1980s–90s",
          "Backprop, MLPs, first real multilayer training"
        ],
        [
          "2012+",
          "AlexNet-scale CNNs; ImageNet as a benchmark catalyst"
        ],
        [
          "2017+",
          "Transformers; sequence modeling without recurrence"
        ],
        [
          "2020+",
          "Large-scale generative models; multimodal pre-training"
        ]
      ]
    },
    "note": "Many core ideas are decades old—data scale, compute, and stable training recipes made them dominant.",
    "speakerNote": "Many core ideas are decades old—data scale, compute, and stable training recipes made them dominant.",
    "titleIcon": "neural-net"
  },
  {
    "title": "Why Classical ML Struggles: The Curse of Dimensionality",
    "subtitle": "Geometry of High-Dimensional Spaces",
    "bullets": [
      {
        "text": "Volume grows exponentially with dimension: a fixed number of samples fills an ever-smaller fraction of the input space—data look sparse even when n is large in absolute terms.",
        "icon": "pca"
      },
      {
        "text": "Local methods (k-NN, kernel density) need enough neighbors in every direction; in high-D, “nearby” points may not exist unless n is enormous.",
        "icon": "svm"
      },
      {
        "text": "Distance concentration: in very high-D, pairwise distances can look similar—distance-based reasoning weakens without structure.",
        "icon": "pca"
      },
      {
        "text": "Hand-crafted features for raw images, audio, or text do not scale in coverage; DL instead learns task-aligned features from examples.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Phenomenon",
        "Effect on classical ML",
        "How deep learning helps"
      ],
      "rows": [
        [
          "Sparse coverage in high-D",
          "Poor generalization with fixed n",
          "Compositional layers reuse structure across positions and depth"
        ],
        [
          "Unstructured raw inputs",
          "Hard to design universal descriptors",
          "Architectures match modality (CNN locality, RNN order, attention)"
        ],
        [
          "Hierarchical patterns",
          "Shallow models miss multi-level structure",
          "Stacked nonlinearities build abstractions level by level"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Volume grows exponentially with dimension: a fixed number of samples fills an ev · Local methods (k-NN, kernel density) need enough neighbors in every direction; i. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "pca"
  },
  {
    "title": "Curse of Dimensionality: A Quantitative Glimpse",
    "subtitle": "Why “More Features” Is Not Free",
    "formula": "\\text{Volume of } d\\text{-ball of radius } r \\propto r^{d}\\quad(\\text{exponential in } d)",
    "bullets": [
      {
        "text": "Intuition: to maintain the same density of samples as dimension grows, required sample size can grow exponentially—unrealistic in raw pixel space.",
        "icon": "pca"
      },
      {
        "text": "That is why reducing raw dimension (PCA), or learning compressed representations (deep nets), is central to practical learning.",
        "icon": "pca"
      },
      {
        "text": "DL does not “remove” the curse magically—it exploits structure (smoothness, locality, compositionality) so not every direction in ℝᵈ must be explored independently.",
        "icon": "check"
      }
    ],
    "table": {
      "headers": [
        "If you only change…",
        "Typical risk"
      ],
      "rows": [
        [
          "Add many raw features without more data",
          "Overfitting, unstable validation, noisy metrics"
        ],
        [
          "Keep model too simple for the signal",
          "Underfitting—both train and val error stay high"
        ],
        [
          "Match model capacity + regularization to data",
          "Best chance of good generalization"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Intuition: to maintain the same density of samples as dimension grows, required  · That is why reducing raw dimension (PCA), or learning compressed representations. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "pca"
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
        "text": "Scale matters: too large → exploding activations; too small → vanishing signals—Xavier and He pick variance based on fan-in (and sometimes fan-out).",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Init",
        "Problem it avoids"
      ],
      "rows": [
        [
          "All zeros",
          "Hidden units stay identical; no representation diversity"
        ],
        [
          "Too high variance",
          "Saturation (sigmoid/tanh) or exploding norms"
        ],
        [
          "Too low variance",
          "Tiny activations and gradients; slow learning"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: If all weights in a layer start equal (especially zero), every hidden unit recei · Random initialization makes each unit walk a different path in parameter space s. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Xavier (Glorot) and He Initialization",
    "subtitle": "Formulas You See in Frameworks",
    "sections": [
      {
        "heading": "Xavier / Glorot",
        "formula": "\\sigma_w^2 = \\frac{2}{n_{\\text{in}} + n_{\\text{out}}}\\quad\\text{(variance for uniform/normal draws)}",
        "bullets": [
          {
            "text": "Keeps activation variance roughly stable across layers when using sigmoid/tanh/linear-like behavior—good default for older fully-connected stacks.",
            "icon": "regression"
          },
          {
            "text": "Balances signal flowing forward and gradients flowing backward at initialization.",
            "icon": "formula"
          }
        ]
      },
      {
        "heading": "He (Kaiming)",
        "formula": "\\sigma_w^2 = \\frac{2}{n_{\\text{in}}}\\quad\\text{(common for ReLU family)}",
        "bullets": [
          {
            "text": "ReLU zeros half the activations on average—He init compensates so variance does not shrink layer by layer.",
            "icon": "neural-net"
          },
          {
            "text": "Default for many ConvNet / MLP blocks with ReLU and derivatives.",
            "icon": "formula"
          }
        ]
      }
    ],
    "note": "Frameworks differ slightly (uniform vs normal, fan-in vs fan-out only)—always read the docstring for your layer.",
    "speakerNote": "Frameworks differ slightly (uniform vs normal, fan-in vs fan-out only)—always read the docstring for your layer.",
    "titleIcon": "formula",
    "bullets": [
      {
        "text": "Xavier: scale for tanh/sigmoid — variance stays stable across layers.",
        "icon": "formula"
      },
      {
        "text": "He: scale for ReLU — accounts for half the activations being zero.",
        "icon": "formula"
      },
      {
        "text": "Poor init can stall or explode training before the first epoch completes.",
        "icon": "warning"
      }
    ]
  },
  {
    "title": "Activation Functions: Classics — Sigmoid and Tanh",
    "subtitle": "Bounded, Smooth — Watch Saturation",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Sigmoid-function.svg",
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Hyperbolic_Tangent.svg"
    ],
    "formula": "\\displaystyle \\sigma(z)=\\frac{1}{1+e^{-z}}",
    "bullets": [
      {
        "text": "Sigmoid (formula above) maps ℝ to (0, 1)—useful as a binary probability; when |z| is large the derivative is tiny (vanishing gradient).",
        "icon": "probability"
      },
      {
        "text": "Tanh maps to (-1, 1) and is zero-centered—often nicer than sigmoid for hidden layers, still saturates.",
        "icon": "neural-net"
      },
      {
        "text": "Both are smooth; great for gates in LSTM/GRU; for deep hidden stacks, ReLU family often trains faster.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "fn",
        "Range",
        "Typical role today"
      ],
      "rows": [
        [
          "Sigmoid",
          "(0, 1)",
          "Binary logits, gates, calibration"
        ],
        [
          "Tanh",
          "(-1, 1)",
          "Hidden activations in some RNNs; less common in new CV"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Sigmoid (formula above) maps ℝ to (0, 1)—useful as a binary probability; when |z · Tanh maps to (-1, 1) and is zero-centered—often nicer than sigmoid for hidden la. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "neural-net",
    "conceptAnimation": "sigmoid-threshold"
  },
  {
    "title": "Activation Functions: ReLU, Swish, and GELU",
    "subtitle": "Modern Defaults for Depth",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "formula": "\\mathrm{ReLU}(z)=\\max(0,z),\\quad \\mathrm{Swish}(z)=z\\cdot\\sigma(z),\\quad \\mathrm{GELU}(z)\\approx z\\cdot\\Phi(z)",
    "bullets": [
      {
        "text": "ReLU: sparse, fast, avoids vanishing gradient for active neurons; dead ReLUs can stick at 0—leaky ReLU / ELU mitigate.",
        "icon": "leakage"
      },
      {
        "text": "Swish / SiLU: smooth, non-monotonic; often matches or beats ReLU on depth with similar cost.",
        "icon": "neural-net"
      },
      {
        "text": "GELU: used heavily in Transformers; smooth gating that behaves like a probabilistic rectifier.",
        "icon": "attention"
      }
    ],
    "table": {
      "headers": [
        "Activation",
        "Idea",
        "Where you see it"
      ],
      "rows": [
        [
          "ReLU / leaky ReLU",
          "Hard sparsity, cheap",
          "CNNs, MLPs—default backbone"
        ],
        [
          "Swish / SiLU",
          "Smooth, trainable-like behavior",
          "Some CV/NLP backbones"
        ],
        [
          "GELU",
          "Smooth gating",
          "BERT, ViT, many modern transformers"
        ],
        [
          "Softmax (vector)",
          "K-way probabilities sum to 1",
          "Multi-class output layer"
        ]
      ]
    },
    "note": "Stacking linear layers only collapses to one linear map—nonlinearity is what makes depth meaningful.",
    "speakerNote": "Stacking linear layers only collapses to one linear map—nonlinearity is what makes depth meaningful.",
    "titleIcon": "neural-net"
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
          "Skip / residual (later)",
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
        ],
        [
          "Higher-order",
          "Rare in standard training; Hessians expensive"
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
        "text": "Phase 2 is about the art of training: diagnosing fit, controlling gradients, picking optimizers and normalization, regularizing sensibly, and scheduling learning rates.",
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
          "SGD, Adam, AdamW, gradient clipping"
        ],
        [
          "Stabilization",
          "Batch/Layer norm, residual paths, init"
        ],
        [
          "Generalization",
          "Dropout, weight decay, early stopping, data augmentation"
        ],
        [
          "Schedules",
          "Warm-up, cosine decay, restarts, batch size"
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
    "title": "Learning Curves: What They Tell You",
    "subtitle": "Plot Loss and Metrics Over Steps or Epochs",
    "bullets": [
      {
        "text": "Smooth downward train loss with flat val loss early on often means you can still train longer or increase capacity.",
        "icon": "train"
      },
      {
        "text": "Train ↓ and val ↑ is the classic overfitting signature—freeze or regularize before wasting compute.",
        "icon": "train"
      },
      {
        "text": "Noisy val curves: try larger val set, moving average, or more seeds—do not chase single noisy points.",
        "icon": "rag"
      }
    ],
    "table": {
      "headers": [
        "Curve pattern",
        "Interpretation"
      ],
      "rows": [
        [
          "Both losses flat",
          "LR too low or wrong normalization / frozen layers"
        ],
        [
          "Train drops, val spikes periodically",
          "LR may be high; try warmup or decay"
        ],
        [
          "Sudden NaNs",
          "Exploding gradients, bad init, or numerical issue in loss"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Smooth downward train loss with flat val loss early on often means you can still · Train ↓ and val ↑ is the classic overfitting signature—freeze or regularize befo. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "metric"
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
    "title": "Advanced Optimizers: Beyond Plain SGD",
    "subtitle": "Momentum, Adaptive Steps, and Decoupled Weight Decay",
    "bullets": [
      {
        "text": "SGD + momentum: accumulate a velocity vector—dampens oscillations in ravines and speeds consistent directions.",
        "icon": "embedding"
      },
      {
        "text": "RMSProp: divide update by root-mean-square of recent squared gradients—per-parameter scale adapts to curvature (useful when gradients are sparse or non-stationary).",
        "icon": "scaling"
      },
      {
        "text": "Adam: combines momentum with second-moment estimates; low friction default for many research prototypes.",
        "icon": "regularization"
      },
      {
        "text": "AdamW: weight decay applied directly to weights (decoupled), not mixed into the adaptive preconditioner—often better generalization.",
        "icon": "regularization"
      }
    ],
    "table": {
      "headers": [
        "Optimizer",
        "Core idea",
        "When it helps"
      ],
      "rows": [
        [
          "SGD + momentum",
          "Velocity-smoothed steps",
          "Large-batch CV, well-tuned schedules"
        ],
        [
          "RMSProp",
          "Scale by running avg of g²",
          "RNNs historically; non-stationary signals"
        ],
        [
          "Adam",
          "m + v estimates per parameter",
          "Fast iteration, NLP/Transformer defaults"
        ],
        [
          "AdamW",
          "Adam + true weight decay",
          "Often best default when using wd with Adam"
        ]
      ]
    },
    "note": "Match optimizer to codebase and paper recipe—changing only optimizer without LR/wd can flip results.",
    "speakerNote": "Match optimizer to codebase and paper recipe—changing only optimizer without LR/wd can flip results.",
    "titleIcon": "regularization"
  },
  {
    "title": "Normalization: Batch Norm vs Layer Norm",
    "subtitle": "Stabilize Activations and Speed Up Deep Training",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "bullets": [
      {
        "text": "Batch Norm (BN): for each channel, normalize across batch and spatial dims, then learn scale γ and shift β—reduces internal covariate shift; uses batch statistics at train, moving averages at eval.",
        "icon": "train"
      },
      {
        "text": "Layer Norm (LN): normalize across features for each example independently—no batch dimension required; default in Transformers.",
        "icon": "scaling"
      },
      {
        "text": "Group Norm: middle ground for small batches in CV—normalize within channel groups per instance.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Method",
        "What is normalized",
        "Typical use"
      ],
      "rows": [
        [
          "Batch Norm",
          "N×H×W per channel (batch + space)",
          "ResNets, CNN classifiers with decent batch size"
        ],
        [
          "Layer Norm",
          "Hidden dim per token/step",
          "Transformers, RNNs with variable length"
        ],
        [
          "Group Norm",
          "Channels within groups per image",
          "Detection/segmentation with small batches"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Batch Norm (BN): for each channel, normalize across batch and spatial dims, then · Layer Norm (LN): normalize across features for each example independently—no bat. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling"
  },
  {
    "title": "Regularization: Dropout, L1/L2, and Early Stopping",
    "subtitle": "Constrain Capacity Without Changing the Architecture Forever",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Dropout.svg"
    ],
    "sections": [
      {
        "heading": "Dropout",
        "bullets": [
          {
            "text": "Randomly zero hidden units during training so units cannot co-adapt; at inference, use expectation scaling or inverted dropout.",
            "icon": "train"
          },
          {
            "text": "Strong implicit ensemble effect; typical rates 0.1–0.5 depending on layer width.",
            "icon": "forest"
          }
        ]
      },
      {
        "heading": "L1 / L2 weight penalties",
        "bullets": [
          {
            "text": "L2 (weight decay): shrink weights toward zero smoothly—standard with SGD; use AdamW-style decoupling with Adam.",
            "icon": "regularization"
          },
          {
            "text": "L1: promotes sparsity; more common in linear models than full deep nets unless structured pruning is a goal.",
            "icon": "regression"
          }
        ]
      },
      {
        "heading": "Early stopping",
        "bullets": [
          {
            "text": "Stop when validation metric stops improving for patience epochs; restore best weights—cheap, effective regularizer on wall-clock.",
            "icon": "test"
          }
        ]
      }
    ],
    "table": {
      "headers": [
        "Technique",
        "What it penalizes"
      ],
      "rows": [
        [
          "Dropout",
          "Complex co-adaptations between units"
        ],
        [
          "L2 / wd",
          "Large weight magnitudes"
        ],
        [
          "Early stopping",
          "Excessive training time / memorization"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Randomly zero hidden units during training so units cannot co-adapt; at inferenc · Strong implicit ensemble effect; typical rates 0.1–0.5 depending on layer width.. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "regularization"
  },
  {
    "title": "Learning-Rate Schedules, Warm-up, and Batch Size",
    "subtitle": "Time-Varying LR and the Noise–Throughput Trade-off",
    "bullets": [
      {
        "text": "Warm-up: linearly increase LR from a small value—stabilizes Transformers and large-batch training before aggressive updates.",
        "icon": "train"
      },
      {
        "text": "Decay: step decay (piecewise), exponential, or cosine annealing—reduce LR as you approach a minimum; cosine with restarts can escape shallow minima.",
        "icon": "idea"
      },
      {
        "text": "Batch size: larger batches give lower-gradient noise but need more memory; linear LR scaling (increase LR with batch size) is a heuristic, not a law—validate on your task.",
        "icon": "test"
      }
    ],
    "table": {
      "headers": [
        "Schedule",
        "Behavior",
        "Typical setting"
      ],
      "rows": [
        [
          "Warm-up",
          "LR rises over first k steps",
          "Transformers, large batch"
        ],
        [
          "Step decay",
          "Drop LR by factor at milestones",
          "CNN classifiers"
        ],
        [
          "Cosine decay",
          "Smooth decrease to near zero",
          "Long training runs"
        ],
        [
          "Batch size",
          "Gradient noise vs throughput",
          "As large as memory allows, then tune LR"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Warm-up: linearly increase LR from a small value—stabilizes Transformers and lar · Decay: step decay (piecewise), exponential, or cosine annealing—reduce LR as you. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Hyperparameter Tuning: Practical Search Strategies",
    "bullets": [
      {
        "text": "Search learning rate on a log grid (1e-4 … 1e-1); it is usually the highest-leverage knob.",
        "icon": "rag"
      },
      {
        "text": "Tune dropout and weight decay together with capacity—wider nets often need stronger regularization.",
        "icon": "idea"
      },
      {
        "text": "Random search explores diverse combinations faster than exhaustive grids; Bayesian optimization helps when evaluations are expensive.",
        "icon": "test"
      }
    ],
    "table": {
      "headers": [
        "Hyperparameter",
        "Search tip"
      ],
      "rows": [
        [
          "LR",
          "Log-uniform sampling; one-order-of-magnitude brackets"
        ],
        [
          "Weight decay / dropout",
          "Couple with width; watch val–train gap"
        ],
        [
          "Depth / width",
          "Grow until val returns diminish"
        ],
        [
          "Schedules",
          "Cosine vs step—compare same epoch budget"
        ]
      ]
    },
    "note": "Always fix seeds and data splits when comparing runs—otherwise you tune noise.",
    "speakerNote": "Always fix seeds and data splits when comparing runs—otherwise you tune noise.",
    "titleIcon": "idea"
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
          "Keep spatial size (same padding) or control border artifacts"
        ],
        [
          "Dilation",
          "Expand receptive field without pooling"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: A kernel is a small learnable matrix (e.g., 3×3) that responds to local patterns · Classical edge detectors (Sobel, shown) are fixed kernels; CNNs learn task-speci. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "svm"
  },
  {
    "title": "CNN Blocks: From AlexNet to ResNet",
    "subtitle": "Depth, Regularization, and Residual Learning",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "formula": "y = \\mathcal{F}(x) + x\\quad\\text{(residual block learns }\\mathcal{F}\\text{, identity carries gradient)}",
    "bullets": [
      {
        "text": "AlexNet (2012): ReLU + dropout + GPU scale—proved CNNs dominate ImageNet with end-to-end learning.",
        "icon": "scaling"
      },
      {
        "text": "VGG-style: deep stacks of small 3×3 convolutions—simple pattern, many parameters, needs care (init, BN, WD).",
        "icon": "cnn"
      },
      {
        "text": "ResNet: skip connections let layers learn corrections around identity—much easier to optimize very deep nets.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "title": "Landmark ideas (simplified)",
      "headers": [
        "Era / model",
        "Idea you should remember"
      ],
      "rows": [
        [
          "AlexNet",
          "Scale + ReLU + data aug on GPUs"
        ],
        [
          "VGG",
          "Depth from repeated 3×3; shows depth helps with care"
        ],
        [
          "ResNet",
          "Residual mapping F(x)+x; skip paths help gradients"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: AlexNet (2012): ReLU + dropout + GPU scale—proved CNNs dominate ImageNet with en · VGG-style: deep stacks of small 3×3 convolutions—simple pattern, many parameters. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "cnn"
  },
  {
    "title": "Computer Vision Tasks: Classification, Detection, Segmentation",
    "subtitle": "Different Outputs Need Different Heads",
    "bullets": [
      {
        "text": "Classification: one label (or multi-label) per image—global pooling then linear classifier.",
        "icon": "regression"
      },
      {
        "text": "Detection: objects as boxes + class scores—needs localization and handling many scales.",
        "icon": "scaling"
      },
      {
        "text": "Segmentation: dense per-pixel class—needs high-resolution maps; skip connections or dilated convs preserve detail.",
        "icon": "classification"
      }
    ],
    "table": {
      "headers": [
        "Task",
        "Output tensor / structure",
        "Example stacks"
      ],
      "rows": [
        [
          "Image classification",
          "Vector of class logits",
          "ResNet, EfficientNet, ViT"
        ],
        [
          "Object detection",
          "Many boxes + scores + classes",
          "YOLO, RetinaNet, Faster R-CNN"
        ],
        [
          "Instance segmentation",
          "Mask per object instance",
          "Mask R-CNN"
        ],
        [
          "Semantic segmentation",
          "Per-pixel class map",
          "U-Net, DeepLab"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Classification: one label (or multi-label) per image—global pooling then linear  · Detection: objects as boxes + class scores—needs localization and handling many . Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "classification"
  },
  {
    "title": "Object Detection: Boxes, IoU, YOLO vs Faster R-CNN",
    "subtitle": "Matching Predictions to Ground Truth",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Intersection_over_Union_-_visual_equation.png"
    ],
    "bullets": [
      {
        "text": "Bounding box formats: center (cx, cy, w, h) or corners—must be consistent in loss and decoding.",
        "icon": "formula"
      },
      {
        "text": "IoU = area(intersection) / area(union) between predicted and reference boxes—thresholds like 0.5 or 0.75 define positives in training and evaluation.",
        "icon": "train"
      },
      {
        "text": "Single-stage (YOLO family): predict boxes densely on a grid—very fast. Two-stage (Faster R-CNN): propose regions then refine—often more accurate, heavier.",
        "icon": "cnn"
      }
    ],
    "table": {
      "headers": [
        "Family",
        "Mechanism",
        "Trade-off"
      ],
      "rows": [
        [
          "YOLO / SSD / RetinaNet",
          "Dense predictions over feature maps",
          "Speed vs fine localization"
        ],
        [
          "Faster R-CNN / Mask R-CNN",
          "RPN proposals + ROI align",
          "Accuracy vs latency"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Bounding box formats: center (cx, cy, w, h) or corners—must be consistent in los · IoU = area(intersection) / area(union) between predicted and reference boxes—thr. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "cnn"
  },
  {
    "title": "Image Segmentation and the U-Net Architecture",
    "subtitle": "Pixel-Level Classification with Skip Connections",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Convolutional_Neural_Network.png"
    ],
    "bullets": [
      {
        "text": "Semantic segmentation assigns a class label to every pixel—output has the same H×W as input (possibly downsampled then upsampled).",
        "icon": "classification"
      },
      {
        "text": "U-Net: encoder downsamples to capture context; decoder upsamples to recover resolution; skip connections concatenate fine encoder features to the decoder—sharp boundaries.",
        "icon": "encoding"
      },
      {
        "text": "Common in medical imaging, satellite imagery, and any task where object edges must be precise.",
        "icon": "check"
      }
    ],
    "table": {
      "headers": [
        "U-Net path",
        "Role"
      ],
      "rows": [
        [
          "Encoder",
          "Context: what is globally present"
        ],
        [
          "Bottleneck",
          "Compressed semantic code"
        ],
        [
          "Decoder + skips",
          "Localization: where boundaries are"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Semantic segmentation assigns a class label to every pixel—output has the same H · U-Net: encoder downsamples to capture context; decoder upsamples to recover reso. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "classification"
  },
  {
    "title": "Transfer Learning with ImageNet-Scale Pretraining",
    "subtitle": "Reuse Features, Adapt the Head",
    "bullets": [
      {
        "text": "Pretraining on millions of labeled images learns general low/mid-level filters (edges, textures) transferable to new domains.",
        "icon": "train"
      },
      {
        "text": "Typical recipe: replace classifier head; optionally freeze early layers for small datasets; use smaller LR on pretrained layers.",
        "icon": "train"
      },
      {
        "text": "Self-supervised pretraining (contrastive, masked image modeling) reduces reliance on labels—same fine-tuning story afterward.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Scenario",
        "Strategy"
      ],
      "rows": [
        [
          "Small target dataset",
          "Freeze backbone, train head only or top blocks"
        ],
        [
          "Medium dataset",
          "Unfreeze progressively (discriminative LR: lower layers smaller LR)"
        ],
        [
          "Large domain shift",
          "Full fine-tune with strong aug + careful monitoring"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Pretraining on millions of labeled images learns general low/mid-level filters ( · Typical recipe: replace classifier head; optionally freeze early layers for smal. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Sequential Data: Why Order Matters",
    "subtitle": "Shuffling Destroys Structure",
    "bullets": [
      {
        "text": "Language, audio, time series, and video (frame order) are ordered; permuting tokens or frames usually destroys the label relationship.",
        "icon": "token"
      },
      {
        "text": "Models must summarize past context without seeing the future (in many online settings)—causal masking matters.",
        "icon": "model"
      },
      {
        "text": "Three families: recurrent networks, temporal convolutions, attention—trade memory, parallelism, and inductive bias.",
        "icon": "cnn"
      }
    ],
    "table": {
      "headers": [
        "Example",
        "What order carries"
      ],
      "rows": [
        [
          "Machine translation",
          "Word order and agreement across long distances"
        ],
        [
          "Speech",
          "Phonemes over milliseconds"
        ],
        [
          "Wearable sensors",
          "Temporal patterns before an event"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Language, audio, time series, and video (frame order) are ordered; permuting tok · Models must summarize past context without seeing the future (in many online set. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "data"
  },
  {
    "title": "Vanilla RNNs: Architecture and Memory Limits",
    "subtitle": "One Transition, Unfolded Through Time",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg"
    ],
    "formula": "h_t = \\phi\\big(W_{hh} h_{t-1} + W_{xh} x_t + b\\big)",
    "bullets": [
      {
        "text": "The same weights are reused each timestep—parameter efficient and aligned with stationarity assumptions.",
        "icon": "rnn"
      },
      {
        "text": "Hidden state h_t is a lossy summary of the past; capacity is limited by hidden size and nonlinear squeezing.",
        "icon": "regression"
      },
      {
        "text": "Long-range dependencies suffer from vanishing/exploding dynamics through repeated Jacobians—motivates gates (LSTM/GRU) or attention.",
        "icon": "rnn"
      }
    ],
    "table": {
      "headers": [
        "Strength",
        "Limitation"
      ],
      "rows": [
        [
          "Compact (one cell, many steps)",
          "Sequential forward pass—harder to parallelize than conv/attention"
        ],
        [
          "Built-in memory variable h_t",
          "Vanishing gradients over long horizons in vanilla form"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: The same weights are reused each timestep—parameter efficient and aligned with s · Hidden state h_t is a lossy summary of the past; capacity is limited by hidden s. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
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
    "title": "GRU: Fewer Gates, Often Similar Quality",
    "subtitle": "Update and Reset Instead of Separate Cell",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg"
    ],
    "bullets": [
      {
        "text": "GRU merges cell and hidden states compared with LSTM—fewer parameters per layer.",
        "icon": "neural-net"
      },
      {
        "text": "Reset gate controls how much past state influences the candidate; update gate blends old and new.",
        "icon": "regression"
      },
      {
        "text": "Often matches LSTM on many tasks with faster runtime—try both on your sequence benchmark.",
        "icon": "rnn"
      }
    ],
    "table": {
      "headers": [
        "Compare",
        "When to prefer"
      ],
      "rows": [
        [
          "LSTM",
          "Very long dependencies, richer gating may help"
        ],
        [
          "GRU",
          "Smaller models, speed-sensitive deployment"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: GRU merges cell and hidden states compared with LSTM—fewer parameters per layer. · Reset gate controls how much past state influences the candidate; update gate bl. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "rnn"
  },
  {
    "title": "Encoder–Decoder (Seq2Seq) for Translation and Beyond",
    "subtitle": "Compress Source, Generate Target Step by Step",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg"
    ],
    "bullets": [
      {
        "text": "Encoder reads the entire source (words, phonemes, frames) into a vector or sequence of states.",
        "icon": "encoding"
      },
      {
        "text": "Decoder is autoregressive: predicts next target token conditioned on previous predictions and the encoder context.",
        "icon": "encoding"
      },
      {
        "text": "Attention (later generalized in Transformers) fixes the bottleneck of a single fixed context vector—critical for long sentences.",
        "icon": "embedding"
      }
    ],
    "table": {
      "headers": [
        "Component",
        "Role"
      ],
      "rows": [
        [
          "Encoder",
          "Build representation of source sequence"
        ],
        [
          "Context bridge",
          "Fixed vector (early seq2seq) or attention-weighted mix"
        ],
        [
          "Decoder",
          "Generate target tokens one by one (teacher forcing during training)"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Encoder reads the entire source (words, phonemes, frames) into a vector or seque · Decoder is autoregressive: predicts next target token conditioned on previous pr. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "encoding",
    "conceptAnimation": "encoding-comparison"
  },
  {
    "title": "Phase 4: Generative Models & Deployment",
    "subtitle": "Generative Models and Real-World Constraints",
    "bullets": [
      {
        "text": "Phase 4 connects ideas to products: learn latent spaces (AE/VAE), adversarial generation (GANs), then shrink and accelerate models for phones, browsers, and embedded devices.",
        "icon": "embedding"
      },
      {
        "text": "A model that only trains well in the lab is incomplete—deployment constraints shape architecture, precision, and monitoring.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Theme",
        "Question it answers"
      ],
      "rows": [
        [
          "Autoencoders / VAEs",
          "How do we compress data and sample new points?"
        ],
        [
          "GANs",
          "How do we learn a generator through a learned critic?"
        ],
        [
          "Quantization / pruning",
          "How small and fast can we make inference?"
        ],
        [
          "Edge & DL-Ops",
          "How do we run and monitor models in production?"
        ]
      ]
    },
    "speakerNote": "Phase 4 (~40 min): Generative Models & Deployment. Use the table as your agenda. After the overview, dive into the first technical slide without a separate divider pause.",
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
  },
  {
    "title": "Variational Autoencoders (VAEs): A Latent Space You Can Sample",
    "subtitle": "Probabilistic Encoder + Reparameterization Trick",
    "formula": "\\mathcal{L}=\\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)]-D_{KL}\\big(q_\\phi(z|x)\\,\\|\\,p(z)\\big)",
    "bullets": [
      {
        "text": "Instead of a single code z, infer a distribution q(z|x) (often Gaussian with learned μ, σ); sample z to reconstruct—enables generation by sampling z ~ prior p(z).",
        "icon": "encoding"
      },
      {
        "text": "KL term regularizes the posterior to stay close to a simple prior (e.g., N(0,I)) so the latent space is smooth and interpolatable.",
        "icon": "encoding"
      },
      {
        "text": "Reparameterization: z = μ + σε with ε ~ N(0,1) makes sampling differentiable w.r.t. φ—critical for backprop.",
        "icon": "encoding"
      }
    ],
    "table": {
      "headers": [
        "Term",
        "Role"
      ],
      "rows": [
        [
          "Reconstruction log-likelihood",
          "Learn to decode samples from q(z|x)"
        ],
        [
          "KL to prior",
          "Organize latent space; avoid arbitrary codes"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Instead of a single code z, infer a distribution q(z|x) (often Gaussian with lea · KL term regularizes the posterior to stay close to a simple prior (e.g., N(0,I)). Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "encoding",
    "conceptAnimation": "encoding-comparison"
  },
  {
    "title": "Generative Adversarial Networks (GANs)",
    "subtitle": "Generator vs Discriminator — A Two-Player Game",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Generative_adversarial_network.svg"
    ],
    "formula": "\\min_G \\max_D\\ \\mathbb{E}_{x\\sim p_{data}}[\\log D(x)]+\\mathbb{E}_{z\\sim p_z}[\\log(1-D(G(z)))]",
    "bullets": [
      {
        "text": "Generator G maps noise z to fake samples; discriminator D assigns high score to real data and low to fakes.",
        "icon": "data"
      },
      {
        "text": "Training alternates (in practice) updating D and G toward this minimax—D provides a learned training signal for G.",
        "icon": "train"
      },
      {
        "text": "Failure modes: mode collapse (G ignores part of data), instability, non-convergence—mitigations include Wasserstein variants, spectral normalization, progressive growing, better architectures.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Issue",
        "Symptom",
        "Directional fix"
      ],
      "rows": [
        [
          "Mode collapse",
          "Generated diversity drops",
          "Minibatch discrimination, unrolled GAN, better losses"
        ],
        [
          "Training instability",
          "Oscillating losses",
          "LR tuning, architecture balance, regularize D"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Generator G maps noise z to fake samples; discriminator D assigns high score to  · Training alternates (in practice) updating D and G toward this minimax—D provide. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "llm"
  },
  {
    "title": "Model Compression: Quantization (FP32 → INT8 and Beyond)",
    "subtitle": "Smaller Weights, Faster Integer Arithmetic",
    "bullets": [
      {
        "text": "Post-training quantization maps FP32 weights/activations to INT8 (or mixed FP16) using calibration on representative batches.",
        "icon": "train"
      },
      {
        "text": "Quantization-aware training (QAT) simulates low precision during training—usually recovers more accuracy than PTQ alone.",
        "icon": "train"
      },
      {
        "text": "Trade-off: fewer bits → smaller model and higher throughput, but risk of accuracy loss if outliers are poorly handled.",
        "icon": "metric"
      }
    ],
    "table": {
      "headers": [
        "Precision",
        "Typical benefit",
        "Watch out for"
      ],
      "rows": [
        [
          "FP32",
          "Reference training",
          "Largest memory footprint"
        ],
        [
          "FP16 / bfloat16",
          "2× smaller activations; tensor cores",
          "Numerical range (bf16 vs fp16)"
        ],
        [
          "INT8",
          "4× smaller weights; fast int ops",
          "Calibration, per-channel scales, overflow"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Post-training quantization maps FP32 weights/activations to INT8 (or mixed FP16) · Quantization-aware training (QAT) simulates low precision during training—usuall. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "model"
  },
  {
    "title": "Model Compression: Pruning and Distillation",
    "subtitle": "Remove Weights or Train Smaller Student Networks",
    "bullets": [
      {
        "text": "Unstructured pruning: zero tiny weights—sparse matrices need hardware support to actually speed up.",
        "icon": "model"
      },
      {
        "text": "Structured pruning: drop whole channels/filters—compatible with dense kernels on GPUs after fine-tuning.",
        "icon": "svm"
      },
      {
        "text": "Knowledge distillation: train a small student to mimic logits or features of a large teacher—accuracy retention with smaller compute.",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Technique",
        "What shrinks",
        "Often needs"
      ],
      "rows": [
        [
          "Unstructured prune",
          "Individual weights",
          "Sparse runtimes or retraining"
        ],
        [
          "Structured prune",
          "Channels / heads / layers",
          "Fine-tune after pruning"
        ],
        [
          "Distillation",
          "Student architecture",
          "Teacher outputs + temperature on softmax"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Unstructured pruning: zero tiny weights—sparse matrices need hardware support to · Structured pruning: drop whole channels/filters—compatible with dense kernels on. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "model"
  },
  {
    "title": "Inference Optimization and Edge AI (DL-Ops)",
    "subtitle": "From Checkpoint to On-Device Runtime",
    "bullets": [
      {
        "text": "Graph optimization: fuse ops (conv+bn+relu), pick kernels for target hardware, eliminate dead tensors.",
        "icon": "svm"
      },
      {
        "text": "Runtimes: TensorRT, ONNX Runtime, OpenVINO, Core ML, TensorFlow Lite—same weights, different execution engines.",
        "icon": "idea"
      },
      {
        "text": "Edge constraints: thermal limits, battery, no GPU—combine quantization, pruning, distillation, and sometimes smaller architectures (MobileNet-style).",
        "icon": "train"
      }
    ],
    "table": {
      "headers": [
        "Concern",
        "What to plan"
      ],
      "rows": [
        [
          "Latency",
          "Batch=1 profiling, threading, accelerator choice"
        ],
        [
          "Memory",
          "Max activation footprint, mmap weights"
        ],
        [
          "Correctness drift",
          "Monitor inputs/outputs in prod; refresh data"
        ],
        [
          "Versioning",
          "Model + code + preprocessing hash together"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Graph optimization: fuse ops (conv+bn+relu), pick kernels for target hardware, e · Runtimes: TensorRT, ONNX Runtime, OpenVINO, Core ML, TensorFlow Lite—same weight. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Deep Learning Practical Checklist",
    "subtitle": "Before You Ship",
    "bullets": [
      {
        "text": "Reproducibility: fix seeds where possible; log library, CUDA, and data snapshot hashes.",
        "icon": "data"
      },
      {
        "text": "Metrics: report calibration, per-class performance, and worst cohorts—not only average accuracy.",
        "icon": "rag"
      },
      {
        "text": "Data: version datasets and augmentations; document leakage checks (duplicates across splits).",
        "icon": "leakage"
      },
      {
        "text": "Deployment: define SLOs (latency p99), memory caps, and fallback behavior; run shadow traffic before full rollout.",
        "icon": "monitoring"
      }
    ],
    "table": {
      "headers": [
        "Stage",
        "Minimum artifact"
      ],
      "rows": [
        [
          "Experiment",
          "Config file + git commit + metric CSV"
        ],
        [
          "Release",
          "Signed model bundle + preprocessing spec"
        ],
        [
          "Production",
          "Dashboards for latency, errors, drift"
        ]
      ]
    },
    "note": "Solid engineering around experiments often beats marginal architecture tweaks.",
    "speakerNote": "Solid engineering around experiments often beats marginal architecture tweaks.",
    "titleIcon": "neural-net"
  }
];
