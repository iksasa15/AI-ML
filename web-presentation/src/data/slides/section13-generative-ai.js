/** Auto-split from presentationData — section13-generative-ai */
export const slides = [
    {
      "title": "Generative AI: Core Concepts",
      "subtitle": "BERT, T5, GPT, LLMs, and Attention (Focused Edition)",
      "bullets": [
        "This section extracts the most important ideas into a compact teaching flow.",
        "Focus areas: transfer learning, model families, attention mechanics, scaling, and practical deployment.",
        "Designed for bootcamp delivery within roughly 20 slides."
      ],
      "speakerNote": "Cover \"Generative AI: Core Concepts\". Emphasize: This section extracts the most important ideas into a compact teaching flow.; then Focus areas: transfer learning, model families, attention mechanics, scaling, and practical deployment.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Transfer Learning in Generative AI",
      "table": {
        "headers": [
          "Stage",
          "Data Type",
          "Goal"
        ],
        "rows": [
          [
            "Pretraining",
            "Large mostly unlabeled corpora",
            "Learn general language representations"
          ],
          [
            "Fine-tuning",
            "Task-labeled dataset",
            "Adapt model to specific downstream objective"
          ],
          [
            "Inference",
            "User prompt/context",
            "Generate or classify outputs for real tasks"
          ]
        ]
      },
      "note": "Transfer learning reduces labeled data needs and accelerates convergence.",
      "speakerNote": "Transfer learning reduces labeled data needs and accelerates convergence."
    },
    {
      "title": "Feature-Based Transfer vs Fine-Tuning",
      "table": {
        "headers": [
          "Strategy",
          "What Changes",
          "Pros",
          "Tradeoff"
        ],
        "rows": [
          [
            "Feature-based",
            "Freeze pretrained backbone; use embeddings as input features",
            "Fast and lightweight",
            "Less task adaptation"
          ],
          [
            "Fine-tuning",
            "Update model weights (often with a task head)",
            "Higher task performance",
            "More compute and tuning effort"
          ]
        ]
      },
      "speakerNote": "Present \"Feature-Based Transfer vs Fine-Tuning\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "BERT: Encoder-Only Bidirectional Understanding",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png"
      ],
      "bullets": [
        "BERT learns contextual token representations using both left and right context.",
        "Strong for understanding tasks: classification, NER, QA, and retrieval-oriented use cases.",
        "Pretrained at scale (Wikipedia + BooksCorpus), then adapted to downstream tasks."
      ],
      "speakerNote": "Cover \"BERT: Encoder-Only Bidirectional Understanding\". Emphasize: BERT learns contextual token representations using both left and right context.; then Strong for understanding tasks: classification, NER, QA, and retrieval-oriented use cases.. Pause for a quick check-in before moving on."
    },
    {
      "title": "BERT Pretraining Objectives",
      "table": {
        "headers": [
          "Objective",
          "How It Works",
          "What It Teaches"
        ],
        "rows": [
          [
            "MLM (Masked Language Modeling)",
            "Mask subset of tokens and predict originals",
            "Bidirectional contextual semantics"
          ],
          [
            "NSP (Next Sentence Prediction)",
            "Predict whether sentence B follows sentence A",
            "Inter-sentence coherence signals"
          ]
        ]
      },
      "note": "MLM and NSP were jointly used in original BERT training setup.",
      "speakerNote": "MLM and NSP were jointly used in original BERT training setup."
    },
    {
      "title": "BERT Special Tokens: [CLS] and [SEP]",
      "bullets": [
        "[CLS] is prepended and its final embedding is used as a sequence-level summary.",
        "[SEP] separates sentence segments and marks boundaries.",
        "In classification tasks, [CLS] passes through a lightweight prediction head."
      ],
      "note": "Token design helps unify single- and pair-sentence tasks.",
      "speakerNote": "Token design helps unify single- and pair-sentence tasks."
    },
    {
      "title": "Arabic Adaptation Example: AraBERT",
      "bullets": [
        "AraBERT follows BERT-base style architecture with Arabic-specific preprocessing.",
        "Segmentation and Arabic-tailored tokenization improve vocabulary coverage.",
        "Domain/language adaptation quality can matter more than raw parameter count."
      ],
      "table": {
        "headers": [
          "Component",
          "Adaptation Benefit"
        ],
        "rows": [
          [
            "Farasa-style segmentation",
            "Better handling of prefixes/suffixes and morphology"
          ],
          [
            "Arabic-focused vocabulary",
            "Lower fragmentation and stronger lexical coverage"
          ],
          [
            "Arabic corpus curation",
            "Improved contextual understanding in target language"
          ]
        ]
      },
      "speakerNote": "Cover \"Arabic Adaptation Example: AraBERT\". Emphasize: AraBERT follows BERT-base style architecture with Arabic-specific preprocessing.; then Segmentation and Arabic-tailored tokenization improve vocabulary coverage.. Pause for a quick check-in before moving on."
    },
    {
      "title": "T5: Unified Text-to-Text Framework",
      "bullets": [
        "T5 reframes every NLP task as text input -> text output.",
        "Task instruction is included as a prefix (e.g., \"summarize:\", \"translate:\").",
        "One shared architecture/training recipe serves multiple tasks."
      ],
      "note": "This design strongly influenced modern prompt-based LLM usage.",
      "speakerNote": "This design strongly influenced modern prompt-based LLM usage."
    },
    {
      "title": "T5 Pretraining Objective: Span Corruption",
      "bullets": [
        "Remove contiguous text spans from input and replace with sentinel tokens.",
        "Train model to reconstruct missing spans autoregressively.",
        "Encourages stronger generative behavior than token-only masking."
      ],
      "table": {
        "headers": [
          "Model",
          "Corruption Style",
          "Typical Strength"
        ],
        "rows": [
          [
            "BERT",
            "Random masked individual tokens",
            "Language understanding tasks"
          ],
          [
            "T5",
            "Contiguous span corruption",
            "Generation + multitask transfer"
          ]
        ]
      },
      "speakerNote": "Cover \"T5 Pretraining Objective: Span Corruption\". Emphasize: Remove contiguous text spans from input and replace with sentinel tokens.; then Train model to reconstruct missing spans autoregressively.. Pause for a quick check-in before moving on."
    },
    {
      "title": "T5 Attention Strategies (Encoder/Decoder)",
      "table": {
        "headers": [
          "Attention Type",
          "Visibility",
          "Used In"
        ],
        "rows": [
          [
            "Fully visible",
            "All tokens attend to all tokens",
            "Encoder representations"
          ],
          [
            "Causal",
            "Token attends to past only",
            "Autoregressive generation"
          ],
          [
            "Prefix-causal hybrid",
            "Full source access + causal target decoding",
            "Seq2Seq decoding in T5"
          ]
        ]
      },
      "speakerNote": "Present \"T5 Attention Strategies (Encoder/Decoder)\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "GPT: Decoder-Only Autoregressive Generation",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg"
      ],
      "bullets": [
        "GPT predicts next token from left context only (causal modeling).",
        "Uses masked self-attention in decoder stack for no-lookahead generation.",
        "Excellent for open-ended completion, instruction following, and synthesis."
      ],
      "speakerNote": "Cover \"GPT: Decoder-Only Autoregressive Generation\". Emphasize: GPT predicts next token from left context only (causal modeling).; then Uses masked self-attention in decoder stack for no-lookahead generation.. Pause for a quick check-in before moving on."
    },
    {
      "title": "GPT Evolution and Foundation Model Scale",
      "table": {
        "headers": [
          "Generation",
          "Approx. Parameters",
          "Key Theme"
        ],
        "rows": [
          [
            "GPT-1",
            "117M",
            "Proof of transfer-learning viability"
          ],
          [
            "GPT-2",
            "1.5B",
            "Large-scale web pretraining for generation"
          ],
          [
            "GPT-3",
            "175B",
            "Few-shot in-context capabilities at scale"
          ]
        ]
      },
      "note": "Model utility scales with data, architecture, and training compute quality.",
      "speakerNote": "Model utility scales with data, architecture, and training compute quality."
    },
    {
      "title": "Attention: Why It Was a Breakthrough",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png"
      ],
      "bullets": [
        "Attention solves fixed-vector bottlenecks in sequence transduction.",
        "At each step, model dynamically focuses on most relevant source positions.",
        "Entire mechanism is differentiable and learned end-to-end."
      ],
      "speakerNote": "Cover \"Attention: Why It Was a Breakthrough\". Emphasize: Attention solves fixed-vector bottlenecks in sequence transduction.; then At each step, model dynamically focuses on most relevant source positions.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Attention Computation Pipeline",
      "bullets": [
        "Compute relevance scores between query state and source states.",
        "Apply softmax to obtain attention weights (probability distribution).",
        "Return weighted sum of value/source states as contextual output."
      ],
      "formula": "\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
      "speakerNote": "Cover \"Attention Computation Pipeline\". Emphasize: Compute relevance scores between query state and source states.; then Apply softmax to obtain attention weights (probability distribution).. Pause for a quick check-in before moving on."
    },
    {
      "title": "Bahdanau vs Luong Attention (Classic RNN Era)",
      "table": {
        "headers": [
          "Variant",
          "Scoring Function",
          "Typical Placement"
        ],
        "rows": [
          [
            "Luong",
            "Bilinear/dot-style",
            "Attention after decoder state update"
          ],
          [
            "Bahdanau",
            "MLP/additive score",
            "Attention integrated before decoder update"
          ]
        ]
      },
      "note": "Both approximate alignment; design choice affects speed and accuracy tradeoffs.",
      "speakerNote": "Both approximate alignment; design choice affects speed and accuracy tradeoffs."
    },
    {
      "title": "Self-Attention, Q/K/V, and Multi-Head",
      "bullets": [
        "Query asks for relevant context; Key indexes available context; Value carries content.",
        "Self-attention lets each token aggregate information from other tokens in sequence.",
        "Multi-head attention captures different linguistic relations in parallel."
      ],
      "note": "Different heads can specialize in syntax, agreement, locality, or semantics.",
      "speakerNote": "Different heads can specialize in syntax, agreement, locality, or semantics."
    },
    {
      "title": "Masked Self-Attention in Decoders",
      "bullets": [
        "Decoder cannot access future tokens during generation.",
        "Causal mask enforces left-to-right consistency and prevents information leakage.",
        "Enables parallel training over full target sequence while preserving autoregressive objective."
      ],
      "speakerNote": "Cover \"Masked Self-Attention in Decoders\". Emphasize: Decoder cannot access future tokens during generation.; then Causal mask enforces left-to-right consistency and prevents information leakage.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Long-Sequence Challenge in Transformers",
      "table": {
        "headers": [
          "Bottleneck",
          "Complexity",
          "Practical Impact"
        ],
        "rows": [
          [
            "Attention map computation",
            "O(L^2)",
            "Time/memory explode as context grows"
          ],
          [
            "Activation storage (training)",
            "O(N*L*d_model)",
            "High VRAM demand for deep long-context models"
          ]
        ]
      },
      "note": "Long-context efficiency is now a central LLM engineering topic.",
      "speakerNote": "Long-context efficiency is now a central LLM engineering topic."
    },
    {
      "title": "Scaling Laws and Compute-Optimal Training",
      "bullets": [
        "Performance improves with data, model size, and compute, but with diminishing returns.",
        "Compute-optimal training balances parameter count and token budget.",
        "Chinchilla-style insight: many large models are under-trained relative to their size."
      ],
      "table": {
        "headers": [
          "Principle",
          "Implication"
        ],
        "rows": [
          [
            "Fixed compute budget",
            "Tune model size and data volume jointly"
          ],
          [
            "Data-quality filtering",
            "Small fraction of tokens may dominate useful learning"
          ],
          [
            "Chinchilla ratio (rule of thumb)",
            "Roughly ~20 training tokens per parameter"
          ]
        ]
      },
      "speakerNote": "Cover \"Scaling Laws and Compute-Optimal Training\". Emphasize: Performance improves with data, model size, and compute, but with diminishing returns.; then Compute-optimal training balances parameter count and token budget.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Generative AI Practical Takeaways",
      "bullets": [
        "Choose architecture by task type: encoder-only, encoder-decoder, or decoder-only.",
        "Prefer transfer learning and fine-tuning over training from scratch when possible.",
        "Use attention-aware designs and decoding strategy (greedy/beam) based on product constraints.",
        "Plan for memory/compute early: quantization, context limits, and deployment targets.",
        "For domain-heavy use cases, adapt with specialized corpora and evaluation protocols."
      ],
      "note": "Strong GenAI systems come from balanced choices across data, architecture, compute, and evaluation.",
      "speakerNote": "Strong GenAI systems come from balanced choices across data, architecture, compute, and evaluation."
    }
  ];
