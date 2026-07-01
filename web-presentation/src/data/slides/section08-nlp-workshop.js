/** Combined NLP Workshop — 30 selected slides covering Foundations, Tokenization, SpaCy, LM, RNNs, and Seq2Seq */
export const slides = [
  {
    "title": "NLP Fundamentals and Challenges",
    "subtitle": "Why Natural Language Is Difficult for Machines",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Major_levels_of_linguistic_structure.svg"
    ],
    "bullets": [
      {
        "text": "Natural language is ambiguous, context-dependent, and full of idioms.",
        "icon": "nlp"
      },
      {
        "text": "Meaning often depends on pragmatics, domain, and cultural background.",
        "icon": "rag"
      },
      {
        "text": "The same sentence can map to multiple valid interpretations.",
        "icon": "test"
      }
    ],
    "note": "NLP systems must model form, meaning, and context simultaneously.",
    "speakerNote": "NLP systems must model form, meaning, and context simultaneously.",
    "titleIcon": "nlp"
  },
  {
    "title": "Ambiguity in Language: Practical Examples",
    "table": {
      "headers": [
        "Expression",
        "Possible Interpretation A",
        "Possible Interpretation B"
      ],
      "rows": [
        [
          "The bank is closed",
          "Financial institution is closed",
          "River bank area is inaccessible"
        ],
        [
          "It's cold",
          "Low temperature",
          "Emotionally distant behavior"
        ],
        [
          "The chicken is ready to eat",
          "Food is ready to be eaten",
          "Animal is ready to eat food"
        ]
      ]
    },
    "note": "Robust NLP requires disambiguation using surrounding textual and situational context.",
    "speakerNote": "Robust NLP requires disambiguation using surrounding textual and situational context.",
    "titleIcon": "idea"
  },
  {
    "title": "Regular Expressions (Regex): Core Idea",
    "bullets": [
      {
        "text": "Regex is a compact pattern language for matching and transforming text.",
        "icon": "idea"
      },
      {
        "text": "Typical uses include validation, extraction, and rule-based cleanup.",
        "icon": "test"
      },
      {
        "text": "Useful for emails, phone numbers, logs, and normalization pipelines.",
        "icon": "scaling"
      }
    ],
    "table": {
      "headers": [
        "Pattern",
        "Meaning",
        "Example Match"
      ],
      "rows": [
        [
          "\\d+",
          "one or more digits",
          "2026"
        ],
        [
          "\\w+",
          "one or more word chars",
          "nlp_model1"
        ],
        [
          "^[A-Z]",
          "starts with uppercase letter",
          "Hello"
        ],
        [
          "\\S+",
          "one or more non-space chars",
          "token123"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Regex is a compact pattern language for matching and transforming text. · Typical uses include validation, extraction, and rule-based cleanup.. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Text Cleaning — Conceptual Steps & Python Code",
    "subtitle": "Conceptual stages matched with Python regex implementations",
    "table": {
      "headers": [
        "Stage",
        "Python Implementation",
        "Goal"
      ],
      "rows": [
        [
          "1. Decode & Clean HTML",
          "html.unescape(text) & re.sub(r'<[^>]+>', '', text)",
          "Keep readable text only"
        ],
        [
          "2. Remove Contacts/URLs",
          "re.sub(r'https?://\\S+|www\\.\\S+', '', text)",
          "Drop URL metadata"
        ],
        [
          "3. Remove Mentions/Socials",
          "re.sub(r'@\\w+|#\\w+', '', text)",
          "Remove handles & hashtags"
        ],
        [
          "4. Drop Non-ASCII & Emoji",
          "text.encode('ascii', 'ignore').decode('ascii')",
          "Drop emoji/special symbols"
        ],
        [
          "5. Normalize Whitespace",
          "re.sub(r'\\s+', ' ', text).strip()",
          "Normalize extra spaces"
        ]
      ]
    },
    "note": "A regex-based cleaning function is usually the first stage in an NLP preprocessing pipeline.",
    "speakerNote": "Walk the table to show how each cleaning stage corresponds to a Python/Regex operation.",
    "titleIcon": "pipeline"
  },
  {
    "title": "Text Cleaning — Worked Example",
    "subtitle": "Trace of raw input transitioning to clean text",
    "table": {
      "headers": [
        "Stage",
        "Operation performed",
        "Text snapshot"
      ],
      "rows": [
        [
          "0. Raw Input",
          "Original raw string",
          "<p>John: \"AI is amazing!!!! 🤖🔥\" Visit: https://ai.com @john #AI</p>"
        ],
        [
          "1. Clean HTML",
          "Decode entities & remove tags",
          "John: \"AI is amazing!!!! 🤖🔥\" Visit: https://ai.com @john #AI"
        ],
        [
          "2. Remove URLs",
          "Remove web addresses",
          "John: \"AI is amazing!!!! 🤖🔥\" Visit:  @john #AI"
        ],
        [
          "3. Remove Socials",
          "Remove @mentions and #hashtags",
          "John: \"AI is amazing!!!! 🤖🔥\" Visit:  "
        ],
        [
          "4. Drop Emoji/Symbols",
          "ASCII-only encoding & cleanup",
          "John AI is amazing!!!! Visit"
        ]
      ]
    },
    "note": "Text cleaning produces standard, noise-free input for tokenizer components.",
    "speakerNote": "Walk through the worked example, showing how the raw input on row 0 is progressively cleaned until row 4.",
    "titleIcon": "idea"
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
    "title": "Part-of-Speech (POS) Tagging",
    "subtitle": "Grammar Labels per Token",
    "bullets": [
      {
        "text": "Universal categories include NOUN, VERB, ADJ, ADV, DET, ADP, PROPN, NUM, …",
        "icon": "token"
      },
      {
        "text": "POS feeds lemmatization quality and downstream relation extraction.",
        "icon": "token"
      },
      {
        "text": "SpaCy exposes coarse pos_ and fine-grained tag_ plus dependency dep_.",
        "icon": "token"
      }
    ],
    "table": {
      "headers": [
        "POS",
        "Role",
        "Quick examples"
      ],
      "rows": [
        [
          "NOUN / PROPN",
          "Things and names",
          "city, Tesla"
        ],
        [
          "VERB / AUX",
          "Actions and helpers",
          "run, is"
        ],
        [
          "ADJ / ADV",
          "Modifiers",
          "quick, quickly"
        ],
        [
          "DET / ADP",
          "Structure words",
          "the, in"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Universal categories include NOUN, VERB, ADJ, ADV, DET, ADP, PROPN, NUM, … · POS feeds lemmatization quality and downstream relation extraction.. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Named Entity Recognition (NER)",
    "subtitle": "Typed Spans over Text",
    "bullets": [
      {
        "text": "Labels include PERSON, ORG, GPE, DATE, MONEY, PERCENT, PRODUCT, EVENT, …",
        "icon": "idea"
      },
      {
        "text": "Useful for indexing, compliance redaction, financial news graphs, and search facets.",
        "icon": "idea"
      },
      {
        "text": "Small models err on edge cases — always spot-check domain text.",
        "icon": "model"
      }
    ],
    "table": {
      "headers": [
        "Label",
        "Examples"
      ],
      "rows": [
        [
          "PERSON",
          "Tim Cook, Jensen Huang"
        ],
        [
          "ORG / GPE",
          "Apple, Texas"
        ],
        [
          "MONEY / PERCENT",
          "$430 billion, 3.5%"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Labels include PERSON, ORG, GPE, DATE, MONEY, PERCENT, PRODUCT, EVENT, … · Useful for indexing, compliance redaction, financial news graphs, and search fac. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "idea"
  },
  {
    "title": "Full SpaCy Pipeline Functionally",
    "bullets": [
      {
        "text": "One doc object: tokens, lemmas, POS, entities, noun_chunks, sents.",
        "icon": "token"
      },
      {
        "text": "Typical export: clean token list, lemma bag, entity list, POS histogram.",
        "icon": "token"
      },
      {
        "text": "Use length-based heuristics (e.g. longest sentence) only as weak importance cues.",
        "icon": "pipeline"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: One doc object: tokens, lemmas, POS, entities, noun_chunks, sents. · Typical export: clean token list, lemma bag, entity list, POS histogram.. Budget ~2 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "pipeline"
  },
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
    "title": "Static vs Contextualized Word Representations",
    "table": {
      "headers": [
        "Property",
        "Static Embeddings (Word2Vec/GloVe)",
        "Contextualized Embeddings (ELMo/BERT/GPT)"
      ],
      "rows": [
        [
          "Vector per word",
          "One fixed vector",
          "Different vectors per context"
        ],
        [
          "Polysemy handling",
          "Weak",
          "Strong"
        ],
        [
          "Context direction",
          "Usually local/global corpus only",
          "Bidirectional or autoregressive sequence context"
        ],
        [
          "Task transfer",
          "Moderate",
          "High with pretraining + fine-tuning"
        ]
      ]
    },
    "note": "Contextualization is a core enabler for modern LLM quality.",
    "speakerNote": "Contextualization is a core enabler for modern LLM quality.",
    "titleIcon": "idea"
  },
  {
    "title": "How Contextualized Embeddings Work",
    "sections": [
      {
        "heading": "Architecture Layers",
        "bullets": [
          {
            "text": "Token/base embedding layer maps input ids to dense vectors.",
            "icon": "neural-net"
          },
          {
            "text": "Context encoder layers (often Transformer blocks) enrich each token with sequence context.",
            "icon": "encoding"
          },
          {
            "text": "Task head uses contextual features for prediction.",
            "icon": "feature"
          }
        ]
      },
      {
        "heading": "Layer Semantics",
        "bullets": [
          {
            "text": "Lower layers capture local syntax/patterns.",
            "icon": "neural-net"
          },
          {
            "text": "Middle layers improve sense disambiguation.",
            "icon": "neural-net"
          },
          {
            "text": "Upper layers capture richer semantics and task-specific signals.",
            "icon": "neural-net"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Static embeddings: one vector per word type. · Contextual: vector depends on surrounding tokens (ELMo, BERT-style).. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "embedding",
    "illustration": "embedding-space",
    "bullets": [
      {
        "text": "Static embeddings: one vector per word type.",
        "icon": "embedding"
      },
      {
        "text": "Contextual: vector depends on surrounding tokens (ELMo, BERT-style).",
        "icon": "attention"
      }
    ]
  },
  {
    "title": "RNN Mechanism and Weight Sharing",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg"
    ],
    "bullets": [
      {
        "text": "At time t, the RNN consumes current input and previous hidden state.",
        "icon": "neural-net"
      },
      {
        "text": "The same cell and weights are reused at every time step.",
        "icon": "rnn"
      },
      {
        "text": "This recurrence captures sequential information in variable-length text.",
        "icon": "rnn"
      }
    ],
    "formula": "h_t = f(W_x x_t + W_h h_{t-1} + b)",
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: At time t, the RNN consumes current input and previous hidden state. · The same cell and weights are reused at every time step.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "rnn"
  },
  {
    "title": "Common RNN Input/Output Patterns",
    "table": {
      "headers": [
        "Pattern",
        "Mapping",
        "Example Task"
      ],
      "rows": [
        [
          "One-to-One",
          "single input -> single output",
          "basic regression/classification"
        ],
        [
          "One-to-Many",
          "single input -> sequence output",
          "image captioning"
        ],
        [
          "Many-to-One",
          "sequence input -> single output",
          "sentiment classification"
        ],
        [
          "Many-to-Many",
          "sequence input -> sequence output",
          "machine translation"
        ]
      ]
    },
    "note": "Sequence-aware patterns are where recurrent models provide clear value.",
    "speakerNote": "Sequence-aware patterns are where recurrent models provide clear value.",
    "titleIcon": "rnn"
  },
  {
    "title": "RNN Family: Vanilla, GRU, BiRNN, LSTM",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg"
    ],
    "table": {
      "headers": [
        "Model",
        "Vanishing Gradient Risk",
        "Key Strength",
        "Typical Limitation"
      ],
      "rows": [
        [
          "Vanilla RNN",
          "High",
          "Simple architecture",
          "Poor long-range memory"
        ],
        [
          "GRU",
          "Lower",
          "Efficient gating with fewer parameters",
          "Can still degrade on very long contexts"
        ],
        [
          "BiRNN",
          "Medium",
          "Uses past and future context",
          "Higher compute and memory"
        ],
        [
          "LSTM",
          "Low (relative)",
          "Strong long-term dependency handling",
          "Heavier than GRU"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "rnn"
  },
  {
    "title": "NLP Seq2Seq for Neural Machine Translation",
    "subtitle": "Encoder-Decoder Modeling, Decoding Strategies, and Evaluation",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Seq2seq_with_RNN_and_attention_mechanism.gif"
    ],
    "bullets": [
      {
        "text": "Seq2Seq maps variable-length input sequences to variable-length outputs.",
        "icon": "encoding"
      },
      {
        "text": "Encoder-decoder models were foundational for neural machine translation.",
        "icon": "encoding"
      },
      {
        "text": "This module covers training, decoding, bottlenecks, attention, and metrics.",
        "icon": "train"
      }
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Seq2Seq maps variable-length input sequences to variable-length outputs. · Encoder-decoder models were foundational for neural machine translation.. Budget ~2 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "encoding",
    "conceptAnimation": "encoding-comparison"
  },
  {
    "title": "Inference: Greedy Decoding vs Beam Search",
    "table": {
      "headers": [
        "Method",
        "Decision Rule",
        "Strength",
        "Risk"
      ],
      "rows": [
        [
          "Greedy",
          "Pick top token each step",
          "Fast and simple",
          "May miss globally better sequence"
        ],
        [
          "Beam Search",
          "Track top-k hypotheses each step",
          "Better global sequence quality",
          "Higher compute; can become generic/bland"
        ]
      ]
    },
    "note": "Typical beam sizes are moderate (e.g., 4-10) to balance quality and cost.",
    "speakerNote": "Typical beam sizes are moderate (e.g., 4-10) to balance quality and cost.",
    "titleIcon": "idea",
    "conceptAnimation": "seq2seq-attention"
  },
  {
    "title": "Information Bottleneck in Basic Seq2Seq",
    "bullets": [
      {
        "text": "Compressing a full source sentence into one fixed vector can lose detail.",
        "icon": "embedding"
      },
      {
        "text": "Longer/complex inputs worsen the bottleneck effect.",
        "icon": "seq2seq"
      },
      {
        "text": "Decoder needs different source details at different output steps.",
        "icon": "seq2seq"
      }
    ],
    "note": "This motivates attention over all encoder hidden states.",
    "speakerNote": "This motivates attention over all encoder hidden states.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention"
  },
  {
    "title": "Attention as the Bottleneck Solution",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png"
    ],
    "bullets": [
      {
        "text": "Decoder attends to relevant encoder positions at each generation step.",
        "icon": "encoding"
      },
      {
        "text": "Dynamic alignment improves translation adequacy and fluency.",
        "icon": "attention"
      },
      {
        "text": "Attention laid the foundation for transformer-dominant NMT systems.",
        "icon": "attention"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Decoder attends to relevant encoder positions at each generation step. · Dynamic alignment improves translation adequacy and fluency.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "attention"
  },
  {
    "title": "NMT Evaluation Metrics: BLEU and ROUGE",
    "table": {
      "headers": [
        "Metric",
        "Orientation",
        "What It Measures",
        "Common Limitation"
      ],
      "rows": [
        [
          "BLEU",
          "Precision-oriented",
          "n-gram overlap from candidate to reference",
          "Weak semantic/syntactic sensitivity"
        ],
        [
          "ROUGE-N",
          "Recall-oriented",
          "n-gram overlap from reference to candidate",
          "Can reward lexical overlap over meaning"
        ],
        [
          "F1 (with overlap metrics)",
          "Balance precision/recall",
          "Harmonic tradeoff view",
          "Still limited on deep semantics"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "seq2seq"
  },
  {
    "title": "Transformer Encoder-Decoder Overview",
    "imageUrls": [
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png"
    ],
    "bullets": [
      {
        "text": "Encoder builds contextual token representations from source text.",
        "icon": "encoding"
      },
      {
        "text": "Decoder generates target tokens autoregressively with attention to encoder states.",
        "icon": "encoding"
      },
      {
        "text": "Foundation architecture for translation, summarization, and many LLM pipelines.",
        "icon": "llm"
      }
    ],
    "note": "Attention mechanisms reduce reliance on recurrence for sequence modeling.",
    "speakerNote": "Preview Week 4: same encoder-decoder idea scales to Transformers and modern LLMs.",
    "titleIcon": "encoding",
    "conceptAnimation": "encoding-comparison",
    "subtitle": "Bridge to Week 4 GenAI — encoder-decoder intuition before BERT/GPT"
  }
];
