/** Auto-split from presentationData — section08-nlp-fundamentals */
export const slides = [
    {
      "title": "NLP Fundamentals and Challenges",
      "subtitle": "Why Natural Language Is Difficult for Machines",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Major_levels_of_linguistic_structure.svg"
      ],
      "bullets": [
        "Natural language is ambiguous, context-dependent, and full of idioms.",
        "Meaning often depends on pragmatics, domain, and cultural background.",
        "The same sentence can map to multiple valid interpretations."
      ],
      "note": "NLP systems must model form, meaning, and context simultaneously.",
      "speakerNote": "NLP systems must model form, meaning, and context simultaneously."
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
      "speakerNote": "Robust NLP requires disambiguation using surrounding textual and situational context."
    },
    {
      "title": "NLP Grand Goal and Core Applications",
      "sections": [
        {
          "heading": "Grand Goal",
          "bullets": [
            "Human-level language understanding with nuance, intent, and context.",
            "Natural human-machine interaction over text and speech."
          ]
        },
        {
          "heading": "Applications",
          "bullets": [
            "Machine translation, sentiment analysis, question answering, search.",
            "Conversational assistants, customer support automation, social analytics."
          ]
        }
      ],
      "speakerNote": "Present \"NLP Grand Goal and Core Applications\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "Regular Expressions (Regex): Core Idea",
      "bullets": [
        "Regex is a compact pattern language for matching and transforming text.",
        "Typical uses include validation, extraction, and rule-based cleanup.",
        "Useful for emails, phone numbers, logs, and normalization pipelines."
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
      "speakerNote": "Cover \"Regular Expressions (Regex): Core Idea\". Emphasize: Regex is a compact pattern language for matching and transforming text.; then Typical uses include validation, extraction, and rule-based cleanup.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Regex Quantifiers and Boundaries",
      "table": {
        "headers": [
          "Regex Element",
          "Role",
          "Example"
        ],
        "rows": [
          [
            "*",
            "zero or more occurrences",
            "ba* -> b, ba, baaa"
          ],
          [
            "+",
            "one or more occurrences",
            "\\d+ -> 4, 2024"
          ],
          [
            "|",
            "OR between alternatives",
            "cat|dog"
          ],
          [
            "\\b",
            "word boundary",
            "\\bing\\b matches standalone 'ing'"
          ],
          [
            "^ / $",
            "start / end anchors",
            "^The, end$"
          ]
        ]
      },
      "note": "Boundary-aware regex prevents false matches inside larger words.",
      "speakerNote": "Boundary-aware regex prevents false matches inside larger words."
    },
    {
      "title": "Regex Refinement Workflow",
      "bullets": [
        "Initial pattern may under-match or over-match.",
        "Iteratively refine with case handling and boundaries.",
        "Use raw strings in Python regex (e.g., r\"\\d+\") to avoid escaping pitfalls."
      ],
      "table": {
        "headers": [
          "Iteration",
          "Pattern",
          "Issue / Improvement"
        ],
        "rows": [
          [
            "1",
            "the",
            "Misses uppercase forms like 'The'"
          ],
          [
            "2",
            "[tT]he",
            "Matches both cases but may hit substrings (e.g., other)"
          ],
          [
            "3",
            "\\W[tT]he\\W",
            "Targets standalone word occurrences"
          ]
        ]
      },
      "speakerNote": "Cover \"Regex Refinement Workflow\". Emphasize: Initial pattern may under-match or over-match.; then Iteratively refine with case handling and boundaries.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Words and Corpora: Tokens vs Types",
      "bullets": [
        "Tokens are total observed word instances (with repetition).",
        "Types are unique vocabulary items in the corpus.",
        "Corpus statistics vary by language, genre, time, and author demographics."
      ],
      "table": {
        "headers": [
          "Text",
          "Tokens (N)",
          "Types (|V|)"
        ],
        "rows": [
          [
            "the cat sat on the mat",
            "6",
            "5"
          ],
          [
            "NLP models learn from repeated contexts",
            "6",
            "6"
          ]
        ]
      },
      "speakerNote": "Cover \"Words and Corpora: Tokens vs Types\". Emphasize: Tokens are total observed word instances (with repetition).; then Types are unique vocabulary items in the corpus.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Heaps' Law in NLP Corpora",
      "formula": "|V| = kN^b,\\quad 0 < b < 1",
      "bullets": [
        "Vocabulary size grows with corpus size, but sublinearly.",
        "Early in corpus growth, many new words appear quickly.",
        "Later growth adds fewer unseen types per additional token."
      ],
      "note": "This behavior motivates subword methods and scalable vocabulary design.",
      "speakerNote": "This behavior motivates subword methods and scalable vocabulary design."
    },
    {
      "title": "Text Normalization Pipeline",
      "subtitle": "Prepare Raw Text for Modeling",
      "sections": [
        {
          "heading": "Core Steps",
          "bullets": [
            "Tokenize text (word/subword/sentence segmentation).",
            "Lowercase (task-dependent), remove noisy symbols, clean markup.",
            "Normalize word forms via stemming or lemmatization."
          ]
        },
        {
          "heading": "Why It Matters",
          "bullets": [
            "Reduces noise and redundancy in unstructured text.",
            "Improves downstream feature quality and model robustness."
          ]
        }
      ],
      "speakerNote": "Present \"Text Normalization Pipeline\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "Text Preprocessing Techniques (Operational View)",
      "table": {
        "headers": [
          "Technique",
          "Purpose",
          "Example"
        ],
        "rows": [
          [
            "Remove HTML tags",
            "Drop markup noise",
            "<p>Hello</p> -> Hello"
          ],
          [
            "Remove URLs",
            "Keep linguistic content only",
            "visit https://... -> visit"
          ],
          [
            "Remove punctuation",
            "Standardize lexical forms",
            "hello, world! -> hello world"
          ],
          [
            "Handle chat words/emojis",
            "Preserve semantic sentiment cues",
            "gr8 -> great, :) -> positive_emoji"
          ],
          [
            "Stopword handling",
            "Reduce weakly informative tokens",
            "the, is, and"
          ]
        ]
      },
      "speakerNote": "Present \"Text Preprocessing Techniques (Operational View)\". Tie back to the section objective and invite one question before advancing."
    },
    {
      "title": "Tokenization Strategies",
      "bullets": [
        "Whitespace tokenization is simple and effective for many scripts.",
        "Character-level tokenization avoids OOV but can lengthen sequences.",
        "Subword tokenization balances vocabulary size and semantic coverage."
      ],
      "table": {
        "headers": [
          "Strategy",
          "Strength",
          "Tradeoff"
        ],
        "rows": [
          [
            "Word/space-based",
            "Human-readable tokens",
            "Weak on rare/compound words"
          ],
          [
            "Character-based",
            "No unknown words",
            "Very long sequences"
          ],
          [
            "Subword-based",
            "Handles rare words and morphology",
            "Tokenizer training complexity"
          ]
        ]
      },
      "speakerNote": "Cover \"Tokenization Strategies\". Emphasize: Whitespace tokenization is simple and effective for many scripts.; then Character-level tokenization avoids OOV but can lengthen sequences.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Subword Tokenization Algorithms",
      "table": {
        "headers": [
          "Algorithm",
          "Base Idea",
          "Common Usage"
        ],
        "rows": [
          [
            "BPE",
            "Merge most frequent adjacent units iteratively",
            "GPT-family style tokenizers"
          ],
          [
            "WordPiece",
            "Likelihood-driven merges",
            "BERT-family models"
          ],
          [
            "Unigram LM",
            "Probabilistic token inventory pruning",
            "T5/XLNet-style pipelines"
          ],
          [
            "SentencePiece",
            "Train on raw text without pre-tokenization",
            "Multilingual pipelines"
          ]
        ]
      },
      "note": "Subword methods control vocabulary growth while preserving useful semantics.",
      "speakerNote": "Subword methods control vocabulary growth while preserving useful semantics."
    },
    {
      "title": "Unigram LM Tokenization Example",
      "bullets": [
        "Model evaluates multiple candidate segmentations with token probabilities.",
        "Chooses segmentation with highest likelihood for each word context.",
        "EM training updates token probabilities and prunes weak tokens."
      ],
      "table": {
        "headers": [
          "Candidate Tokenization",
          "Score"
        ],
        "rows": [
          [
            "basket + ball",
            "0.30"
          ],
          [
            "basketball",
            "0.40"
          ],
          [
            "bask + etball",
            "0.06"
          ]
        ]
      },
      "note": "Highest-probability segmentation is selected in decoding.",
      "speakerNote": "Highest-probability segmentation is selected in decoding."
    },
    {
      "title": "BPE Training Process",
      "bullets": [
        "Start from character-level symbols.",
        "Count adjacent symbol-pair frequencies.",
        "Merge most frequent pair into a new token.",
        "Repeat until target vocabulary size is reached."
      ],
      "table": {
        "headers": [
          "Step",
          "Operation"
        ],
        "rows": [
          [
            "1",
            "Initialize symbol inventory"
          ],
          [
            "2",
            "Compute pair frequencies"
          ],
          [
            "3",
            "Merge best pair"
          ],
          [
            "4",
            "Rebuild sequence with merged token and iterate"
          ]
        ]
      },
      "speakerNote": "Cover \"BPE Training Process\". Emphasize: Start from character-level symbols.; then Count adjacent symbol-pair frequencies.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Stemming vs Lemmatization",
      "table": {
        "headers": [
          "Aspect",
          "Stemming",
          "Lemmatization"
        ],
        "rows": [
          [
            "Method",
            "Rule-based suffix stripping",
            "Vocabulary + morphology aware normalization"
          ],
          [
            "Output quality",
            "May produce non-words (studi)",
            "Canonical dictionary forms (study)"
          ],
          [
            "Context sensitivity",
            "Low",
            "Higher (POS-aware)"
          ],
          [
            "Use case",
            "Fast retrieval/indexing",
            "Semantically cleaner linguistic analysis"
          ]
        ]
      },
      "note": "Choose based on task priority: speed and recall vs linguistic precision.",
      "speakerNote": "Choose based on task priority: speed and recall vs linguistic precision."
    },
    {
      "title": "Lemmatization and Morphology Examples",
      "bullets": [
        "Verb forms: am/are/is/was/were -> be.",
        "Irregular nouns: mice -> mouse, children -> child.",
        "POS-aware cases: better (adj) -> good, better (verb) -> better."
      ],
      "note": "Lemmatization preserves semantics better than aggressive stemming.",
      "speakerNote": "Lemmatization preserves semantics better than aggressive stemming."
    },
    {
      "title": "Modern NLP Models: From Embeddings to Transformers",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/d/dd/Continuous_Bag_of_Words_model_%28CBOW%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png"
      ],
      "bullets": [
        "Distributed embeddings (e.g., CBOW) map words into dense semantic vectors.",
        "Transformers model long-range dependencies via self-attention.",
        "Current NLP systems combine strong preprocessing with large pretrained models."
      ],
      "speakerNote": "Cover \"Modern NLP Models: From Embeddings to Transformers\". Emphasize: Distributed embeddings (e.g., CBOW) map words into dense semantic vectors.; then Transformers model long-range dependencies via self-attention.. Pause for a quick check-in before moving on."
    },
    {
      "title": "Transformer Encoder-Decoder Overview",
      "imageUrls": [
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Attention_Is_All_You_Need_-_Encoder-decoder_Architecture.png"
      ],
      "bullets": [
        "Encoder builds contextual token representations from source text.",
        "Decoder generates target tokens autoregressively with attention to encoder states.",
        "Foundation architecture for translation, summarization, and many LLM pipelines."
      ],
      "note": "Attention mechanisms reduce reliance on recurrence for sequence modeling.",
      "speakerNote": "Attention mechanisms reduce reliance on recurrence for sequence modeling."
    }
  ];
