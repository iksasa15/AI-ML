/** Week 3 Session 2 — Tokenization theory + NLTK/SpaCy labs */
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
    "title": "Tokenization Granularities (Word, Char, Subword)",
    "subtitle": "Comparing different levels of text splitting",
    "table": {
      "headers": [
        "Granularity",
        "Strength",
        "Tradeoff",
        "Example output (for 'running')"
      ],
      "rows": [
        [
          "Word / Space-based",
          "Human-readable tokens",
          "Weak on rare/compound words (OOV)",
          "['running']"
        ],
        [
          "Character-based",
          "No unknown words (no OOV)",
          "Very long sequences, loss of meaning",
          "['r', 'u', 'n', 'n', 'i', 'n', 'g']"
        ],
        [
          "Subword-based",
          "Handles rare words, compact vocab",
          "Requires tokenizer training/tuning",
          "['run', '##ning']"
        ]
      ]
    },
    "note": "Subword tokenization is the industry standard for modern LLMs and neural NLP models.",
    "speakerNote": "Use the table to compare the three granularities on vocabulary size and sequence length.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Tokenization Views (Code Examples)",
    "subtitle": "Same sentence, word / char / subword splits side by side",
    "table": {
      "headers": [
        "Tokenizer Type",
        "Python Implementation",
        "Result on \"I'm running to the store!\""
      ],
      "rows": [
        [
          "Word",
          "word_tokenize(text)",
          "['I', \"'m\", 'running', 'to', 'the', 'store', '!']"
        ],
        [
          "Character",
          "list(text)",
          "['I', \"'\", 'm', ' ', 'r', 'u', 'n', 'n', 'i', 'n', 'g', ...]"
        ],
        [
          "Subword",
          "model_tokenizer.tokenize(text)",
          "['I', \"'m\", 'run', '##ning', 'to', 'the', 'store', '!']"
        ],
        [
          "Sentence",
          "sent_tokenize(text)",
          "[\"I'm running to the store!\"]"
        ]
      ]
    },
    "speakerNote": "Point out how different tokenizers split contractions like 'I'm' and morphology like 'running'.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "NLTK Tokenizers (Word, Sentence, Tweet)",
    "subtitle": "Common NLTK tokenization methods and code",
    "table": {
      "headers": [
        "Tokenizer",
        "Core Feature",
        "Python Code"
      ],
      "rows": [
        [
          "Word Tokenizer",
          "Splits words, contractions, and punctuation",
          "from nltk.tokenize import word_tokenize"
        ],
        [
          "Sentence Tokenizer",
          "Splits paragraphs into sentence strings",
          "from nltk.tokenize import sent_tokenize"
        ],
        [
          "Tweet Tokenizer",
          "Preserves hashtags, @mentions, and emoticons",
          "from nltk.tokenize import TweetTokenizer"
        ]
      ]
    },
    "bullets": [
      {
        "text": "Make sure to download 'punkt' resources (nltk.download('punkt')) before calling NLTK tokenizers.",
        "icon": "warning"
      }
    ],
    "note": "Choose the right tokenizer family based on your domain data (e.g., use TweetTokenizer for social media).",
    "speakerNote": "Walk through NLTK options. Mention TweetTokenizer as a great domain-specific example.",
    "titleIcon": "token"
  },
  {
    "title": "Subword Tokenization (LLMs) — Why It Wins",
    "subtitle": "How subwords solve core vocabulary challenges",
    "table": {
      "headers": [
        "Word Tokenizer Issue",
        "Subword Solution",
        "Example Worked Out"
      ],
      "rows": [
        [
          "Huge vocabulary size",
          "Reuse frequent morphemes/pieces",
          "unbelievably → un + ##believe + ##ably"
        ],
        [
          "Out-of-Vocabulary (OOV) words",
          "Break unknown forms into known units",
          "ChatGPT → ['Chat', 'G', 'PT']"
        ],
        [
          "Morphological variants",
          "Shared roots reduce feature sparsity",
          "running/runs/runner share 'run'"
        ]
      ]
    },
    "speakerNote": "Explain how subword tokenization enables infinite vocabulary coverage with a fixed vocabulary size.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Subword Tokenization Algorithms",
    "subtitle": "Comparing training ideas and usage of subword methods",
    "table": {
      "headers": [
        "Algorithm",
        "Core Training Heuristic",
        "Needs Pre-tokenization?",
        "Common Models"
      ],
      "rows": [
        [
          "BPE (Byte Pair Encoding)",
          "Merge most frequent adjacent units iteratively",
          "Yes",
          "GPT, RoBERTa, LLaMA"
        ],
        [
          "WordPiece",
          "Merge based on maximum corpus likelihood",
          "Yes",
          "BERT, DistilBERT"
        ],
        [
          "Unigram LM",
          "Start with large vocab, prune lowest probability tokens",
          "No",
          "T5, XLNet"
        ],
        [
          "SentencePiece",
          "Wrapper for BPE/Unigram treating spaces as characters",
          "No",
          "Multilingual LLMs"
        ]
      ]
    },
    "speakerNote": "Point out the difference: BPE starts from characters and merges; Unigram starts from words and prunes.",
    "titleIcon": "token"
  },
  {
    "title": "BPE Walkthrough & Inference Example",
    "subtitle": "How Byte Pair Encoding learns merges and splits unseen words",
    "bullets": [
      {
        "text": "Walkthrough: start with chars (l, o, w, e, s, t, r) -> merge l+o (lo) -> merge lo+w (low) -> compact vocabulary.",
        "icon": "token"
      },
      {
        "text": "Inference on 'lowered the lowest curtain': splits rare words to ['low', 'er', 'ed'] and ['low', 'est'] while keeping 'the' and 'curtain' whole.",
        "icon": "token"
      }
    ],
    "table": {
      "headers": [
        "Word",
        "Subword Output",
        "Explanation"
      ],
      "rows": [
        [
          "lowered",
          "['low', 'er', 'ed']",
          "Decomposes into learned root and suffix subwords"
        ],
        [
          "lowest",
          "['low', 'est']",
          "Decomposes into base 'low' and suffix 'est'"
        ]
      ]
    },
    "note": "BPE repeatedly merges frequent adjacent units until target vocabulary size is reached.",
    "speakerNote": "Explain both BPE training (merge rules) and BPE inference (splitting unseen words).",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Unigram LM Example: Choosing Best Segmentation",
    "subtitle": "Probabilistic segmentation selection",
    "body": "Input word: basketball",
    "table": {
      "headers": [
        "Candidate Tokenization",
        "Calculated Probability",
        "Model Decision"
      ],
      "rows": [
        [
          "basket + ball",
          "0.30",
          "Possible candidate"
        ],
        [
          "basketball",
          "0.40",
          "Selected (highest probability)"
        ],
        [
          "bask + etball",
          "0.06",
          "Rejected candidate"
        ]
      ]
    },
    "bullets": [
      {
        "text": "Unigram LM keeps multiple candidate segmentations and scores them probabilistically.",
        "icon": "idea"
      },
      {
        "text": "Expectation-Maximization (EM) training iteratively prunes low-probability tokens.",
        "icon": "train"
      }
    ],
    "speakerNote": "Contrast this with BPE: BPE is deterministic during inference, while Unigram uses a probability model.",
    "titleIcon": "idea"
  },
  {
    "title": "Subword Tokenization — BPE vs WordPiece (Example)",
    "subtitle": "Different splitting heuristics in action",
    "table": {
      "headers": [
        "Word",
        "GPT-2 style (BPE)",
        "BERT style (WordPiece)"
      ],
      "rows": [
        [
          "running",
          "['running']",
          "['running']"
        ],
        [
          "unbelievably",
          "['unbelievably']",
          "['un', '##believe', '##ably']"
        ],
        [
          "ChatGPT",
          "['Chat', 'G', 'PT']",
          "['chat', '##g', '##pt']"
        ],
        [
          "COVID-19",
          "['COV', 'ID', '-', '19']",
          "['covid', '-', '19']"
        ]
      ]
    },
    "note": "Note: WordPiece uses '##' to mark continuation characters, whereas BPE uses special prefix spaces.",
    "speakerNote": "Compare BPE and WordPiece. Explain the '##' syntax in WordPiece which signifies continuation.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Why Token Counts Matter",
    "subtitle": "Operational impacts on APIs and context windows",
    "bullets": [
      {
        "text": "API pricing and context windows are measured in tokens, not characters or words.",
        "icon": "token"
      },
      {
        "text": "Technical prose and code usually cost more tokens due to frequent splits.",
        "icon": "token"
      },
      {
        "text": "Tokenizer choice changes sequence length → affects model memory & speed.",
        "icon": "warning"
      }
    ],
    "table": {
      "headers": [
        "Text Sample",
        "Approx Token Count",
        "Sparsity Comment"
      ],
      "rows": [
        [
          "The cat sat on the mat.",
          "7",
          "Simple words, high vocab hit"
        ],
        [
          "Transformers use multi-head self-attention.",
          "11",
          "Technical terms split into sub-tokens"
        ],
        [
          "def hello(): print('Hi!')",
          "10",
          "Code splits heavily due to syntax symbols"
        ]
      ]
    },
    "speakerNote": "Emphasize that 100 words in English != 100 tokens. Technical content has a higher token multiplier.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Stop Words: Purpose & Tradeoffs",
    "subtitle": "Filtering low-information tokens from texts",
    "bullets": [
      {
        "text": "Function words (the, is, and) dominate word counts but carry minimal topic signal.",
        "icon": "token"
      },
      {
        "text": "Removing stop words reduces dimensionality for TF-IDF & Bag-of-Words.",
        "icon": "scaling"
      },
      {
        "text": "Critical Rule: NEVER remove stop words for language models (GPT/BERT), translation, or sentiment analysis where negation ('not') and syntax carry the core meaning.",
        "icon": "warning"
      }
    ],
    "table": {
      "headers": [
        "Task Category",
        "Stop Word Policy",
        "Reasoning"
      ],
      "rows": [
        [
          "Search & Topic Modeling",
          "Remove",
          "Improves speed and focus on key words"
        ],
        [
          "Large Language Models",
          "Keep",
          "Syntactic and semantic flow is vital"
        ],
        [
          "Sentiment Analysis",
          "Keep",
          "Negations like 'not' reverse polarity"
        ]
      ]
    },
    "speakerNote": "Explain the classic NLP vs modern LLM divide on stop word removal policy.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Stop Words in Practice (NLTK & Custom)",
    "subtitle": "Standard lists and domain-specific stop word filtering",
    "bullets": [
      {
        "text": "NLTK provides default stop word lists for multiple languages.",
        "icon": "idea"
      },
      {
        "text": "For real-world corpora, you must add custom domain stops (e.g., 'click', 'subscribe').",
        "icon": "warning"
      }
    ],
    "table": {
      "headers": [
        "Case",
        "Tokens list"
      ],
      "rows": [
        [
          "Original Tokens",
          "['please', 'read', 'this', 'article', 'about', 'nlp', 'model', 'performance']"
        ],
        [
          "After NLTK Stops Removed",
          "['please', 'read', 'article', 'nlp', 'model', 'performance']"
        ],
        [
          "After Custom Stops Removed",
          "['nlp', 'model', 'performance']"
        ]
      ]
    },
    "note": "Filter stopwords after lowercasing to ensure correct string matching.",
    "speakerNote": "Use the table to show how standard stop words vs custom domain stop words prune the token list.",
    "titleIcon": "idea"
  },
  {
    "title": "Stemming vs Lemmatization",
    "subtitle": "Normalizing words to their base forms",
    "table": {
      "headers": [
        "Aspect",
        "Stemming",
        "Lemmatization"
      ],
      "rows": [
        [
          "Mechanism",
          "Rule-based suffix chopping (heuristic)",
          "Dictionary lookup + morphological analysis"
        ],
        [
          "Speed",
          "Very fast, computationally cheap",
          "Slower, requires resource lookup"
        ],
        [
          "Output",
          "Can be non-words (e.g., study -> studi)",
          "Always dictionary words (e.g., study -> study)"
        ],
        [
          "POS Awareness",
          "No",
          "Yes (e.g., saw -> see or saw depending on POS)"
        ]
      ]
    },
    "note": "Lemmatization preserves semantics better than aggressive stemming.",
    "speakerNote": "Explain that stemming is just chopping characters, while lemmatization understands grammar.",
    "titleIcon": "idea"
  },
  {
    "title": "Stemming & Lemmatization in Code (NLTK & SpaCy)",
    "subtitle": "Implementation patterns in Python",
    "bullets": [
      {
        "text": "NLTK Porter/Snowball: rule-based suffix cuts (fast default).",
        "icon": "idea"
      },
      {
        "text": "SpaCy: performs full POS-aware lemmatization out-of-the-box (e.g. ran -> run).",
        "icon": "idea"
      }
    ],
    "table": {
      "headers": [
        "Input Word",
        "Porter Stemmer",
        "SpaCy Lemmatizer"
      ],
      "rows": [
        [
          "running (verb)",
          "run",
          "run"
        ],
        [
          "mice (noun)",
          "mice",
          "mouse"
        ],
        [
          "was (verb)",
          "wa",
          "be"
        ],
        [
          "better (adj)",
          "better",
          "good"
        ]
      ]
    },
    "speakerNote": "Show the table entries: highlight how Porter fails on 'mice' and 'was' while Lemmatization maps them correctly.",
    "titleIcon": "idea"
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
