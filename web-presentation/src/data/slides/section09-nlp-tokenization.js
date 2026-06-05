/** Auto-split from presentationData — section09-nlp-tokenization */
export const slides = [
  {
    "title": "NLP Tokenization Masterclass",
    "subtitle": "From Word Splits to Subword Modeling",
    "bullets": [
      {
        "text": "This module focuses on practical tokenization design choices in NLP pipelines.",
        "icon": "token"
      },
      {
        "text": "We compare space-based, character-based, and subword tokenization strategies.",
        "icon": "token"
      },
      {
        "text": "Goal: handle rare words while controlling vocabulary growth.",
        "icon": "token"
      }
    ],
    "note": "Tokenization quality strongly affects downstream embedding and model performance.",
    "speakerNote": "Tokenization quality strongly affects downstream embedding and model performance.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Space-Based vs Subword Tokenization",
    "table": {
      "headers": [
        "Method",
        "How It Splits",
        "Best Use",
        "Limitation"
      ],
      "rows": [
        [
          "Whitespace",
          "Split by spaces",
          "Simple corpora and fast baselines",
          "Weak handling of rare/morphologically rich words"
        ],
        [
          "Character",
          "Each char is a token",
          "No OOV failures",
          "Very long token sequences"
        ],
        [
          "Subword",
          "Word pieces learned from corpus",
          "Modern NLP/LLMs",
          "Requires tokenizer training and tuning"
        ]
      ]
    },
    "note": "Subword tokenization is usually the best compromise for modern production NLP.",
    "speakerNote": "Subword tokenization is usually the best compromise for modern production NLP.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Subword Algorithms Comparison",
    "table": {
      "headers": [
        "Algorithm",
        "Core Idea",
        "Needs Pre-tokenization?",
        "Common Models"
      ],
      "rows": [
        [
          "Unigram LM",
          "Probabilistic token inventory",
          "No",
          "XLNet, T5"
        ],
        [
          "WordPiece",
          "Likelihood-based merge scoring",
          "Yes",
          "BERT family"
        ],
        [
          "BPE",
          "Frequent-pair iterative merges",
          "Yes",
          "GPT, RoBERTa style pipelines"
        ],
        [
          "SentencePiece",
          "Raw text tokenization framework",
          "No",
          "mBART, multilingual setups"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "token"
  },
  {
    "title": "Unigram LM Example: Choosing Best Segmentation",
    "body": "Input word: basketball",
    "table": {
      "headers": [
        "Candidate Tokenization",
        "Probability",
        "Decision"
      ],
      "rows": [
        [
          "basket + ball",
          "0.30",
          "Possible"
        ],
        [
          "basketball",
          "0.40",
          "Selected (highest likelihood)"
        ],
        [
          "bask + etball",
          "0.06",
          "Rejected"
        ]
      ]
    },
    "bullets": [
      {
        "text": "Unigram LM keeps multiple candidates and scores them probabilistically.",
        "icon": "idea"
      },
      {
        "text": "EM training refines token probabilities and prunes weak tokens over time.",
        "icon": "train"
      }
    ],
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Unigram LM keeps multiple candidates and scores them probabilistically. · EM training refines token probabilities and prunes weak tokens over time.. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "idea"
  },
  {
    "title": "BPE Walkthrough: low, lowest, lower",
    "table": {
      "headers": [
        "Step",
        "Action",
        "Result"
      ],
      "rows": [
        [
          "1",
          "Start with characters",
          "l, o, w, e, s, t, r"
        ],
        [
          "2",
          "Merge most frequent pair l+o",
          "lo"
        ],
        [
          "3",
          "Merge lo+w",
          "low"
        ],
        [
          "4",
          "Continue frequent merges",
          "lower, lowest become compact tokens"
        ]
      ]
    },
    "note": "BPE repeatedly merges frequent adjacent units until target vocabulary size is reached.",
    "speakerNote": "BPE repeatedly merges frequent adjacent units until target vocabulary size is reached.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "BPE Tokenization Inference Example",
    "body": "Given sentence: lowered the lowest curtain",
    "table": {
      "headers": [
        "Word",
        "Subword Output"
      ],
      "rows": [
        [
          "lowered",
          "low + er + ed"
        ],
        [
          "the",
          "the"
        ],
        [
          "lowest",
          "low + est"
        ],
        [
          "curtain",
          "curtain (or further split if unseen)"
        ]
      ]
    },
    "bullets": [
      {
        "text": "Subword decomposition reduces out-of-vocabulary failures.",
        "icon": "token"
      },
      {
        "text": "Frequent morphemes become reusable building blocks across words.",
        "icon": "token"
      }
    ],
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Subword decomposition reduces out-of-vocabulary failures. · Frequent morphemes become reusable building blocks across words.. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Why Subword Tokenization Matters in Practice",
    "sections": [
      {
        "heading": "Operational Benefits",
        "bullets": [
          {
            "text": "Handles rare and unseen words gracefully.",
            "icon": "token"
          },
          {
            "text": "Keeps vocabulary compact without losing compositional meaning.",
            "icon": "token"
          },
          {
            "text": "Improves transfer across domains and noisy user text.",
            "icon": "token"
          }
        ]
      },
      {
        "heading": "Bootcamp Takeaway",
        "bullets": [
          {
            "text": "Tokenizer choice is a model-design decision, not just preprocessing.",
            "icon": "token"
          },
          {
            "text": "Always validate tokenization behavior on your real domain samples.",
            "icon": "test"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Open vocabulary: rare words decompose into known subwords. · Balances character-level flexibility with word-level efficiency.. Budget ~2 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow",
    "bullets": [
      {
        "text": "Open vocabulary: rare words decompose into known subwords.",
        "icon": "token"
      },
      {
        "text": "Balances character-level flexibility with word-level efficiency.",
        "icon": "compare"
      }
    ]
  },
  {
    "title": "Tokenization Practice Exercise",
    "subtitle": "Manual Tokenization Drill",
    "body": "Corpus: \"go going gone goals\"",
    "bullets": [
      {
        "text": "Task: tokenize sentence \"the goat is going to the goal\" using a subword strategy.",
        "icon": "token"
      },
      {
        "text": "Compare outputs under whitespace, BPE-style merges, and Unigram-style choices.",
        "icon": "token"
      },
      {
        "text": "Discuss which strategy gives better reuse and fewer unknown tokens.",
        "icon": "token"
      }
    ],
    "note": "Practice builds intuition for tokenizer behavior before model training.",
    "speakerNote": "Practice builds intuition for tokenizer behavior before model training.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  }
];
