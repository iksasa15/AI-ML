/** Auto-split from presentationData — section10-nlp-language-modeling */
export const slides = [
  {
    "title": "NLP Language Modeling with N-grams",
    "subtitle": "From Count-Based Prediction to Evaluation",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/c/c2/Google_Ngram.png"
    ],
    "bullets": [
      {
        "text": "Language models estimate probabilities over word sequences.",
        "icon": "model"
      },
      {
        "text": "N-gram models predict the next token from a limited context window.",
        "icon": "token"
      },
      {
        "text": "This module connects N-gram intuition to modern LLM generation.",
        "icon": "llm"
      }
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Language models estimate probabilities over word sequences. · N-gram models predict the next token from a limited context window.. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "nlp"
  },
  {
    "title": "What Is an N-gram?",
    "table": {
      "headers": [
        "Model",
        "Context Used",
        "Example Prediction"
      ],
      "rows": [
        [
          "Unigram",
          "No context",
          "Predict based on global word frequency"
        ],
        [
          "Bigram",
          "Previous 1 word",
          "P(w_t | w_{t-1})"
        ],
        [
          "Trigram",
          "Previous 2 words",
          "P(w_t | w_{t-2}, w_{t-1})"
        ],
        [
          "5-gram",
          "Previous 4 words",
          "P(w_t | w_{t-4}, ..., w_{t-1})"
        ]
      ]
    },
    "note": "Higher n gives richer local context but increases sparsity and data requirements.",
    "speakerNote": "Higher n gives richer local context but increases sparsity and data requirements.",
    "titleIcon": "idea"
  },
  {
    "title": "Why Next-Word Prediction Matters",
    "sections": [
      {
        "heading": "Classic NLP Uses",
        "bullets": [
          {
            "text": "Grammar/spell checking via low-probability sequence detection.",
            "icon": "probability"
          },
          {
            "text": "Search auto-complete and query continuation.",
            "icon": "idea"
          },
          {
            "text": "Speech recognition disambiguation for phonetically similar outputs.",
            "icon": "idea"
          }
        ]
      },
      {
        "heading": "Modern Connection",
        "bullets": [
          {
            "text": "Autoregressive LLMs generate text by repeated next-token prediction.",
            "icon": "regression"
          },
          {
            "text": "The core objective extends N-gram intuition with neural representations.",
            "icon": "neural-net"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Language modeling is the foundation for autocomplete, speech, and generative AI. · Better perplexity usually means better downstream performance.. Budget ~2 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea",
    "bullets": [
      {
        "text": "Language modeling is the foundation for autocomplete, speech, and generative AI.",
        "icon": "llm"
      },
      {
        "text": "Better perplexity usually means better downstream performance.",
        "icon": "metric"
      }
    ]
  },
  {
    "title": "Formal Language Modeling Objective",
    "formula": "P(w_1,\\ldots,w_T)=\\prod_{t=1}^{T} P(w_t \\mid w_1,\\ldots,w_{t-1})",
    "bullets": [
      {
        "text": "A language model can score full sentences or predict the next word.",
        "icon": "model"
      },
      {
        "text": "Exact estimation over full histories is intractable for real corpora.",
        "icon": "model"
      },
      {
        "text": "Approximation strategies include N-grams, smoothing, and neural LMs.",
        "icon": "neural-net"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: A language model can score full sentences or predict the next word. · Exact estimation over full histories is intractable for real corpora.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "model"
  },
  {
    "title": "Chain Rule and Markov Assumption",
    "table": {
      "headers": [
        "Approach",
        "Assumption",
        "Tradeoff"
      ],
      "rows": [
        [
          "Full chain rule",
          "Condition on full history",
          "Accurate but data/computation heavy"
        ],
        [
          "1st-order Markov (bigram)",
          "Condition on previous word only",
          "Practical but ignores long dependencies"
        ],
        [
          "(n-1)-order Markov",
          "Condition on last n-1 words",
          "Better local context with higher sparsity"
        ]
      ]
    },
    "note": "Markov assumptions make count-based language modeling operationally feasible.",
    "speakerNote": "Markov assumptions make count-based language modeling operationally feasible.",
    "titleIcon": "idea"
  },
  {
    "title": "Unigram vs Bigram Intuition",
    "bullets": [
      {
        "text": "Unigram models often generate incoherent sentences due to independence assumptions.",
        "icon": "model"
      },
      {
        "text": "Bigrams and trigrams recover local fluency but still miss distant structure.",
        "icon": "missing-data"
      },
      {
        "text": "Long-distance syntax/semantics motivates neural context modeling.",
        "icon": "neural-net"
      }
    ],
    "table": {
      "headers": [
        "Model",
        "Fluency",
        "Long-Range Handling"
      ],
      "rows": [
        [
          "Unigram",
          "Low",
          "None"
        ],
        [
          "Bigram",
          "Moderate local fluency",
          "Weak"
        ],
        [
          "Trigram+",
          "Better local coherence",
          "Still limited"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Unigram models often generate incoherent sentences due to independence assumptio · Bigrams and trigrams recover local fluency but still miss distant structure.. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Key Weaknesses of N-gram Models",
    "table": {
      "headers": [
        "Limitation",
        "Example",
        "Impact"
      ],
      "rows": [
        [
          "Long-distance dependency failure",
          "Subject-verb agreement far apart",
          "Grammar inconsistencies"
        ],
        [
          "Sparse exact matching",
          "Seen 'delicious meal' but not 'tasty dish'",
          "Poor synonym generalization"
        ],
        [
          "Data sparsity",
          "Rare sequences unseen",
          "Zero probabilities without smoothing"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "model"
  },
  {
    "title": "Why LLMs Outperform N-grams",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg"
    ],
    "table": {
      "headers": [
        "Capability",
        "N-gram",
        "LLM"
      ],
      "rows": [
        [
          "Context length",
          "Short fixed window",
          "Long contextual modeling"
        ],
        [
          "Semantic understanding",
          "Exact surface co-occurrence",
          "Embedding-based representations"
        ],
        [
          "Synonym/generalization",
          "Weak",
          "Strong"
        ],
        [
          "Novel generation quality",
          "Limited",
          "Substantially better"
        ]
      ]
    },
    "note": "LLMs replace count tables with learned distributed representations and deep context integration.",
    "speakerNote": "LLMs replace count tables with learned distributed representations and deep context integration.",
    "titleIcon": "llm"
  },
  {
    "title": "Estimating N-gram Probabilities (MLE)",
    "formula": "P(w_t\\mid w_{t-n+1}^{t-1})=\\frac{C(w_{t-n+1}^{t})}{C(w_{t-n+1}^{t-1})}",
    "bullets": [
      {
        "text": "Maximum Likelihood Estimation uses corpus frequency counts.",
        "icon": "idea"
      },
      {
        "text": "For bigrams: divide count of word pair by count of prefix word.",
        "icon": "idea"
      },
      {
        "text": "Simple and interpretable, but brittle for unseen combinations.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Maximum Likelihood Estimation uses corpus frequency counts. · For bigrams: divide count of word pair by count of prefix word.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "idea"
  },
  {
    "title": "Worked Bigram Example",
    "body": "Given counts: C(\"want to\") = 608, C(\"want\") = 927",
    "formula": "P(\"to\"\\mid\"want\")=\\frac{608}{927}\\approx0.656",
    "bullets": [
      {
        "text": "Interpretation: in this corpus, \"to\" follows \"want\" about 65.6% of the time.",
        "icon": "idea"
      },
      {
        "text": "Count quality depends strongly on corpus domain and size.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Summarize the body paragraph, then expand each bullet. Land: Interpretation: in this corpus, \"to\" follows \"want\" about 65.6% of the time. · Count quality depends strongly on corpus domain and size.. Budget ~90 sec. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Why Use Log Probabilities",
    "bullets": [
      {
        "text": "Multiplying many small probabilities causes numerical underflow.",
        "icon": "idea"
      },
      {
        "text": "Log transform converts multiplication into stable addition.",
        "icon": "idea"
      },
      {
        "text": "Sequence scoring becomes computationally robust and efficient.",
        "icon": "idea"
      }
    ],
    "table": {
      "headers": [
        "Original Space",
        "Log Space"
      ],
      "rows": [
        [
          "P = p1 * p2 * ... * pk",
          "log P = log p1 + log p2 + ... + log pk"
        ],
        [
          "Very small numbers",
          "Numerically stable sums"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Multiplying many small probabilities causes numerical underflow. · Log transform converts multiplication into stable addition.. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Evaluating Language Models",
    "sections": [
      {
        "heading": "Extrinsic Evaluation",
        "bullets": [
          {
            "text": "Measure downstream task impact (ASR, MT, etc.).",
            "icon": "model"
          },
          {
            "text": "Most realistic but expensive and slow.",
            "icon": "model"
          }
        ]
      },
      {
        "heading": "Intrinsic Evaluation",
        "bullets": [
          {
            "text": "Use perplexity on held-out text as a proxy for predictive quality.",
            "icon": "target"
          },
          {
            "text": "Fast model comparison during iteration.",
            "icon": "model"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Perplexity: intrinsic metric on held-out text. · BLEU/ROUGE: extrinsic metrics for generation tasks.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "model",
    "bullets": [
      {
        "text": "Perplexity: intrinsic metric on held-out text.",
        "icon": "metric"
      },
      {
        "text": "BLEU/ROUGE: extrinsic metrics for generation tasks.",
        "icon": "evaluate"
      }
    ]
  },
  {
    "title": "Perplexity (PP): Interpretation",
    "formula": "\\mathrm{PP}(W)=P(w_1,\\ldots,w_T)^{-\\frac{1}{T}}=\\exp\\left(-\\frac{1}{T}\\sum_{t=1}^{T}\\log P(w_t\\mid h_t)\\right)",
    "bullets": [
      {
        "text": "Perplexity is the average branching uncertainty of the model.",
        "icon": "tree"
      },
      {
        "text": "Lower PP means better predictive confidence on unseen text.",
        "icon": "target"
      },
      {
        "text": "Use identical test sets when comparing models.",
        "icon": "test"
      }
    ],
    "note": "Raw sentence probabilities are length-sensitive; perplexity normalizes by token count.",
    "speakerNote": "Raw sentence probabilities are length-sensitive; perplexity normalizes by token count.",
    "titleIcon": "idea"
  },
  {
    "title": "Perplexity Across N-gram Orders",
    "table": {
      "headers": [
        "N-gram Order",
        "Example PP (WSJ-style)",
        "Takeaway"
      ],
      "rows": [
        [
          "Unigram",
          "962",
          "Very weak due to no context"
        ],
        [
          "Bigram",
          "170",
          "Large improvement with local context"
        ],
        [
          "Trigram",
          "109",
          "Further gain from longer local history"
        ]
      ]
    },
    "note": "Increasing n generally lowers PP until sparsity and data limits dominate.",
    "speakerNote": "Increasing n generally lowers PP until sparsity and data limits dominate.",
    "titleIcon": "idea"
  },
  {
    "title": "Language Modeling Summary and Practice",
    "subtitle": "N-gram LM Core Checklist",
    "bullets": [
      {
        "text": "Understand chain rule factorization and Markov approximations.",
        "icon": "model"
      },
      {
        "text": "Compute MLE-based N-gram probabilities from counts.",
        "icon": "model"
      },
      {
        "text": "Use log probabilities for stable sequence scoring.",
        "icon": "model"
      },
      {
        "text": "Evaluate with perplexity and compare models on the same test set.",
        "icon": "test"
      }
    ],
    "note": "Next step in practice: add smoothing (Laplace/Kneser-Ney) to handle unseen n-grams.",
    "speakerNote": "Next step in practice: add smoothing (Laplace/Kneser-Ney) to handle unseen n-grams.",
    "titleIcon": "model"
  }
];
