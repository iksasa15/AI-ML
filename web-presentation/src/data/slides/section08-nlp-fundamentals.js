/** Week 3 Session 1 — NLP intro, pipeline, regex, text cleaning */
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
    "title": "NLP Grand Goal and Core Applications",
    "sections": [
      {
        "heading": "Grand Goal",
        "bullets": [
          {
            "text": "Human-level language understanding with nuance, intent, and context.",
            "icon": "nlp"
          },
          {
            "text": "Natural human-machine interaction over text and speech.",
            "icon": "nlp"
          }
        ]
      },
      {
        "heading": "Applications",
        "bullets": [
          {
            "text": "Machine translation, sentiment analysis, question answering, search.",
            "icon": "nlp"
          },
          {
            "text": "Conversational assistants, customer support automation, social analytics.",
            "icon": "nlp"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Goal: algorithms that understand, generate, and transform human language. · Applications span search, assistants, translation, and analytics.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "nlp",
    "bullets": [
      {
        "text": "Goal: algorithms that understand, generate, and transform human language.",
        "icon": "nlp"
      },
      {
        "text": "Applications span search, assistants, translation, and analytics.",
        "icon": "idea"
      }
    ]
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
    "speakerNote": "Boundary-aware regex prevents false matches inside larger words.",
    "titleIcon": "idea"
  },
  {
    "title": "Regex Refinement Workflow",
    "bullets": [
      {
        "text": "Initial pattern may under-match or over-match.",
        "icon": "idea"
      },
      {
        "text": "Iteratively refine with case handling and boundaries.",
        "icon": "idea"
      },
      {
        "text": "Use raw strings in Python regex (e.g., r\"\\d+\") to avoid escaping pitfalls.",
        "icon": "warning"
      }
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Initial pattern may under-match or over-match. · Iteratively refine with case handling and boundaries.. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Words and Corpora: Tokens vs Types",
    "bullets": [
      {
        "text": "Tokens are total observed word instances (with repetition).",
        "icon": "token"
      },
      {
        "text": "Types are unique vocabulary items in the corpus.",
        "icon": "token"
      },
      {
        "text": "Corpus statistics vary by language, genre, time, and author demographics.",
        "icon": "token"
      }
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Tokens are total observed word instances (with repetition). · Types are unique vocabulary items in the corpus.. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Heaps' Law in NLP Corpora",
    "formula": "|V| = kN^b,\\quad 0 < b < 1",
    "bullets": [
      {
        "text": "Vocabulary size grows with corpus size, but sublinearly.",
        "icon": "regression"
      },
      {
        "text": "Early in corpus growth, many new words appear quickly.",
        "icon": "nlp"
      },
      {
        "text": "Later growth adds fewer unseen types per additional token.",
        "icon": "token"
      }
    ],
    "note": "This behavior motivates subword methods and scalable vocabulary design.",
    "speakerNote": "This behavior motivates subword methods and scalable vocabulary design.",
    "titleIcon": "nlp"
  },
  {
    "title": "Text Normalization Pipeline",
    "subtitle": "Prepare Raw Text for Modeling",
    "sections": [
      {
        "heading": "Core Steps",
        "bullets": [
          {
            "text": "Tokenize text (word/subword/sentence segmentation).",
            "icon": "token"
          },
          {
            "text": "Lowercase (task-dependent), remove noisy symbols, clean markup.",
            "icon": "regression"
          },
          {
            "text": "Normalize word forms via stemming or lemmatization.",
            "icon": "scaling"
          }
        ]
      },
      {
        "heading": "Why It Matters",
        "bullets": [
          {
            "text": "Reduces noise and redundancy in unstructured text.",
            "icon": "scaling"
          },
          {
            "text": "Improves downstream feature quality and model robustness.",
            "icon": "feature"
          }
        ]
      }
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Typical order: lowercase → punctuation → tokenize → stopwords → stem/lemma. · Order matters — document the pipeline for reproducibility.. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling",
    "bullets": [
      {
        "text": "Typical order: lowercase → punctuation → tokenize → stopwords → stem/lemma.",
        "icon": "pipeline"
      },
      {
        "text": "Order matters — document the pipeline for reproducibility.",
        "icon": "check"
      }
    ]
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "pipeline",
    "illustration": "preprocessing-pipeline"
  },
  {
    "title": "The Full NLP Pipeline",
    "subtitle": "From Raw Text to Structured Signals",
    "bullets": [
      {
        "text": "1. Text cleaning — HTML/URLs/noise removal.",
        "icon": "nlp"
      },
      {
        "text": "2. Tokenization — words, subwords, or sentences.",
        "icon": "token"
      },
      {
        "text": "3. Stop word removal — optional, task-dependent.",
        "icon": "nlp"
      },
      {
        "text": "4. Normalization — case, unicode, spelling heuristics.",
        "icon": "scaling"
      },
      {
        "text": "5. Stemming / lemmatization — canonical word forms.",
        "icon": "nlp"
      },
      {
        "text": "6. POS tagging — grammatical roles.",
        "icon": "nlp"
      },
      {
        "text": "7. NER — entities (people, orgs, money, dates, …).",
        "icon": "nlp"
      }
    ],
    "note": "Output is structured data ready for classical ML, search, or neural models.",
    "speakerNote": "Output is structured data ready for classical ML, search, or neural models.",
    "titleIcon": "nlp",
    "illustration": "nlp-pipeline"
  },
  {
    "title": "Text Cleaning — Why Raw Text Is Messy",
    "bullets": [
      {
        "text": "Web text mixes markup, entities, URLs, handles, hashtags, emoji, and boilerplate.",
        "icon": "idea"
      },
      {
        "text": "Downstream models and lexicons assume cleaner character sequences.",
        "icon": "model"
      },
      {
        "text": "Cleaning rules must match your task — aggressive stripping can erase signal.",
        "icon": "check"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Web text mixes markup, entities, URLs, handles, hashtags, emoji, and boilerplate · Downstream models and lexicons assume cleaner character sequences.. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
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
    "title": "Lowercase Normalization: Usage & Tradeoffs",
    "subtitle": "Standardizing case while avoiding semantic signal loss",
    "bullets": [
      {
        "text": "Lowercasing merges surface forms: \"NASA\" / \"nasa\" → same token for bag-of-words.",
        "icon": "token"
      },
      {
        "text": "Risk: named-entity signal loss — \"Apple\" (company) vs \"apple\" (fruit).",
        "icon": "warning"
      },
      {
        "text": "For NER and MT, preserve case until you have a tokenizer/model policy.",
        "icon": "check"
      }
    ],
    "table": {
      "headers": [
        "Case",
        "Input text",
        "Python operation",
        "Output text"
      ],
      "rows": [
        [
          "Standard Case",
          "Natural Language Processing",
          "normalize_case(text)",
          "natural language processing"
        ],
        [
          "Mixed Case",
          "iPhone vs Android",
          "normalize_case(text)",
          "iphone vs android"
        ],
        [
          "Acronym Case",
          "NASA launched SpaceX",
          "normalize_case(text)",
          "nasa launched spacex"
        ]
      ]
    },
    "note": "Academic rule: lowercase for retrieval/classification, keep case for NER-sensitive pipelines.",
    "speakerNote": "Discuss the advantages and risks of case normalization, then use the table for examples.",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling"
  }
];
