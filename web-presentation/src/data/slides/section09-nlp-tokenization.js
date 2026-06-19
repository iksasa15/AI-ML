/** Week 3 Session 2 — Tokenization theory + NLTK/SpaCy labs */
export const slides = [
  {
    "title": "Tokenization Strategies",
    "bullets": [
      {
        "text": "Whitespace tokenization is simple and effective for many scripts.",
        "icon": "token"
      },
      {
        "text": "Character-level tokenization avoids OOV but can lengthen sequences.",
        "icon": "token"
      },
      {
        "text": "Subword tokenization balances vocabulary size and semantic coverage.",
        "icon": "token"
      }
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Whitespace tokenization is simple and effective for many scripts. · Character-level tokenization avoids OOV but can lengthen sequences.. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
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
    "speakerNote": "Subword methods control vocabulary growth while preserving useful semantics.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Unigram LM Tokenization Example",
    "bullets": [
      {
        "text": "Model evaluates multiple candidate segmentations with token probabilities.",
        "icon": "test"
      },
      {
        "text": "Chooses segmentation with highest likelihood for each word context.",
        "icon": "token"
      },
      {
        "text": "EM training updates token probabilities and prunes weak tokens.",
        "icon": "train"
      }
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
    "speakerNote": "Highest-probability segmentation is selected in decoding.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "BPE Training Process",
    "bullets": [
      {
        "text": "Start from character-level symbols.",
        "icon": "regression"
      },
      {
        "text": "Count adjacent symbol-pair frequencies.",
        "icon": "token"
      },
      {
        "text": "Merge most frequent pair into a new token.",
        "icon": "token"
      },
      {
        "text": "Repeat until target vocabulary size is reached.",
        "icon": "token"
      }
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Start from character-level symbols. · Count adjacent symbol-pair frequencies.. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
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
    "speakerNote": "Choose based on task priority: speed and recall vs linguistic precision.",
    "titleIcon": "idea"
  },
  {
    "title": "Lemmatization and Morphology Examples",
    "bullets": [
      {
        "text": "Verb forms: am/are/is/was/were -> be.",
        "icon": "idea"
      },
      {
        "text": "Irregular nouns: mice -> mouse, children -> child.",
        "icon": "idea"
      },
      {
        "text": "POS-aware cases: better (adj) -> good, better (verb) -> better.",
        "icon": "idea"
      }
    ],
    "note": "Lemmatization preserves semantics better than aggressive stemming.",
    "speakerNote": "Lemmatization preserves semantics better than aggressive stemming.",
    "titleIcon": "idea"
  },
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
  },
  {
    "title": "Day 1 Lab — Tokenization Fundamentals",
    "subtitle": "Workshop view — complements Section 8 overview and Section 9 masterclass",
    "bullets": [
      {
        "text": "Word: fast and interpretable; brittle on OOV and morphology.",
        "icon": "token"
      },
      {
        "text": "Character: no unknown tokens; very long sequences.",
        "icon": "token"
      },
      {
        "text": "Subword: balances vocabulary size with rare-word coverage — standard for LLMs.",
        "icon": "token"
      }
    ],
    "table": {
      "headers": [
        "Granularity",
        "Example fragment",
        "Idea"
      ],
      "rows": [
        [
          "Word",
          "running → running",
          "Whole-word units"
        ],
        [
          "Subword",
          "running → run + ##ning",
          "Shared roots across inflections"
        ],
        [
          "Sentence",
          "One string per sentence",
          "Segment before document models"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Word: fast and interpretable; brittle on OOV and morphology. · Character: no unknown tokens; very long sequences.. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Day 1 Lab — Tokenization Views",
    "table": {
      "headers": [
        "Tokenizer type",
        "Python idea",
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
          "['I', \"'\", 'm', ' ', 'r', 'u', ... ]"
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
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow",
    "subtitle": "Same sentence, word / char / subword splits side by side"
  },
  {
    "title": "NLTK Tokenization Essentials",
    "bullets": [
      {
        "text": "word_tokenize handles contractions and punctuation boundaries.",
        "icon": "token"
      },
      {
        "text": "sent_tokenize splits paragraphs into sentences.",
        "icon": "tree"
      },
      {
        "text": "TweetTokenizer preserves hashtags, mentions, and emoticon tokens.",
        "icon": "token"
      }
    ],
    "note": "Download punkt (and punkt_tab where required) before first tokenize calls.",
    "speakerNote": "Download punkt (and punkt_tab where required) before first tokenize calls.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "NLTK Tokenization — Practical Python Example",
    "table": {
      "headers": [
        "Step",
        "Code call",
        "Output (summary)"
      ],
      "rows": [
        [
          "1",
          "word_tokenize(text)",
          "Splits words + punctuation and contractions"
        ],
        [
          "2",
          "sent_tokenize(text)",
          "Returns sentence list"
        ],
        [
          "3",
          "TweetTokenizer().tokenize(tweet)",
          "Keeps @mentions, #hashtags, emoticons"
        ]
      ]
    },
    "note": "This mirrors section 4.2 from the markdown file with concise outputs for slides.",
    "speakerNote": "This mirrors section 4.2 from the markdown file with concise outputs for slides.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Day 1 Lab — Subword Tokenization for LLMs",
    "bullets": [
      {
        "text": "Large word vocabularies miss typos, neologisms, and multi-lingual morphology.",
        "icon": "missing-data"
      },
      {
        "text": "Subwords reuse frequent pieces: \"unbelievably\" → learned merges.",
        "icon": "token"
      },
      {
        "text": "GPT-style BPE vs BERT WordPiece: different merge heuristics, same goal.",
        "icon": "token"
      }
    ],
    "table": {
      "headers": [
        "Tokenizer family",
        "Representative models"
      ],
      "rows": [
        [
          "BPE merges",
          "GPT-2, GPT-3, many open LLMs"
        ],
        [
          "WordPiece",
          "BERT, DistilBERT"
        ],
        [
          "Unigram LM / SentencePiece",
          "T5, multilingual pipelines"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: Large word vocabularies miss typos, neologisms, and multi-lingual morphology. · Subwords reuse frequent pieces: \"unbelievably\" → learned merges.. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow",
    "subtitle": "BPE / WordPiece intuition for the Day 1 notebook"
  },
  {
    "title": "Subword Tokenization (LLMs) — Why It Wins",
    "table": {
      "headers": [
        "Problem with pure word tokens",
        "Subword solution",
        "Example"
      ],
      "rows": [
        [
          "Huge vocabulary size",
          "Reuse frequent pieces",
          "unbelievably → un + ##believe + ##ably"
        ],
        [
          "New/OOV words",
          "Break unknown forms into known units",
          "GPT-4 → G + PT + - + 4"
        ],
        [
          "Morphology variants",
          "Shared roots reduce sparsity",
          "running/runs/runner share run"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Subword Tokenization — BPE vs WordPiece (Example)",
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
    "note": "Exact tokens vary by vocabulary/version; the slide shows the same teaching intuition from the lesson.",
    "speakerNote": "Exact tokens vary by vocabulary/version; the slide shows the same teaching intuition from the lesson.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Why Token Counts Matter",
    "bullets": [
      {
        "text": "API pricing and context windows are measured in tokens, not characters.",
        "icon": "token"
      },
      {
        "text": "Technical prose and code usually cost more tokens than simple narrative.",
        "icon": "token"
      },
      {
        "text": "Tokenizer choice changes length → affects batching and truncation strategy.",
        "icon": "token"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: API pricing and context windows are measured in tokens, not characters. · Technical prose and code usually cost more tokens than simple narrative.. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Why Token Counts Matter — Practical Example",
    "table": {
      "headers": [
        "Text sample",
        "Approx token count",
        "Comment"
      ],
      "rows": [
        [
          "The cat sat on the mat.",
          "7",
          "Simple sentence, low cost"
        ],
        [
          "Transformers use multi-head self-attention.",
          "11",
          "Technical terms increase tokenization complexity"
        ],
        [
          "def hello_world(): print('Hello, World!')",
          "12",
          "Code usually splits into many sub-tokens"
        ]
      ]
    },
    "note": "Exact count depends on tokenizer/version, but the cost pattern stays similar.",
    "speakerNote": "Exact count depends on tokenizer/version, but the cost pattern stays similar.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "Stop Words — Removing Low-Information Tokens",
    "bullets": [
      {
        "text": "Function words (the, is, and) dominate counts but often carry little topic signal.",
        "icon": "token"
      },
      {
        "text": "Removing them tightens bag-of-words / TF-IDF and classic retrieval setups.",
        "icon": "rag"
      },
      {
        "text": "Always validate on a sample — domain-specific 'stop' lists are common.",
        "icon": "test"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Function words (the, is, and) dominate counts but often carry little topic signa · Removing them tightens bag-of-words / TF-IDF and classic retrieval setups.. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "token",
    "conceptAnimation": "tokenization-flow"
  },
  {
    "title": "NLTK Stop Words in Practice",
    "bullets": [
      {
        "text": "stopwords.words('english') provides a baseline English set.",
        "icon": "idea"
      },
      {
        "text": "Filter after lowercasing and tokenization; often keep alphanumeric tokens only.",
        "icon": "token"
      },
      {
        "text": "Measure reduction: e.g. 17 → 9 tokens on a sample sentence.",
        "icon": "token"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: stopwords.words('english') provides a baseline English set. · Filter after lowercasing and tokenization; often keep alphanumeric tokens only.. Budget ~2 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Custom and Domain Stop Words",
    "bullets": [
      {
        "text": "Sklearn TfidfVectorizer accepts custom stop word lists.",
        "icon": "embedding"
      },
      {
        "text": "Add boilerplate from your genre: click, read more, subscribe, etc.",
        "icon": "idea"
      },
      {
        "text": "Union standard + domain lists; cap size to avoid over-pruning.",
        "icon": "warning"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Sklearn TfidfVectorizer accepts custom stop word lists. · Add boilerplate from your genre: click, read more, subscribe, etc.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "idea"
  },
  {
    "title": "Custom Stop Words — Before / After Example",
    "table": {
      "headers": [
        "Case",
        "Tokens"
      ],
      "rows": [
        [
          "Before custom domain stop words",
          "['please','read','this','article','about','nlp','model','performance']"
        ],
        [
          "After adding {'please','read','article'}",
          "['this','about','nlp','model','performance']"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "When Not to Remove Stop Words",
    "table": {
      "headers": [
        "Task type",
        "Reason to keep stop words"
      ],
      "rows": [
        [
          "Language models (GPT/BERT)",
          "Negation and function words carry syntax and meaning"
        ],
        [
          "Machine translation",
          "Grammar requires determiners and auxiliaries"
        ],
        [
          "Sentiment",
          "\"not bad\" ≠ \"bad\"; intensifiers matter"
        ],
        [
          "QA / chatbots",
          "Question words and politeness markers are contentful"
        ]
      ]
    },
    "note": "Classic IR and topic models still benefit from stop word pruning.",
    "speakerNote": "Classic IR and topic models still benefit from stop word pruning.",
    "titleIcon": "idea"
  },
  {
    "title": "Day 1 Lab — Stemming vs Lemmatization",
    "table": {
      "headers": [
        "Aspect",
        "Stemming",
        "Lemmatization"
      ],
      "rows": [
        [
          "Mechanism",
          "Rule-based suffix cuts",
          "Dictionary + morphology (often POS-aware)"
        ],
        [
          "Speed",
          "Very fast",
          "Slower"
        ],
        [
          "Output",
          "May be non-words (studi)",
          "Real lemmas (study)"
        ],
        [
          "Best for",
          "Large-scale indexing / recall",
          "Higher-accuracy linguistic features"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Anchor on the diagram or table before moving on. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "idea",
    "subtitle": "Hands-on comparison in the Day 1 track"
  },
  {
    "title": "NLTK Stemmer Families",
    "bullets": [
      {
        "text": "Porter: gentle, widely used default.",
        "icon": "idea"
      },
      {
        "text": "Lancaster: aggressive — can over-chop (organization → organ).",
        "icon": "idea"
      },
      {
        "text": "Snowball: language-aware family; good English compromise.",
        "icon": "idea"
      }
    ],
    "note": "Compare stems on your corpus before picking one for production indexing.",
    "speakerNote": "Compare stems on your corpus before picking one for production indexing.",
    "titleIcon": "idea"
  },
  {
    "title": "Lemmatization with SpaCy",
    "bullets": [
      {
        "text": "en_core_web_sm gives lemmas, POS, dependencies, and NER in one nlp() call.",
        "icon": "idea"
      },
      {
        "text": "Handles irregulars: mice → mouse; ran → run (verb).",
        "icon": "idea"
      },
      {
        "text": "Filter stops/punct before printing lemma tables for teaching clarity.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: en_core_web_sm gives lemmas, POS, dependencies, and NER in one nlp() call. · Handles irregulars: mice → mouse; ran → run (verb).. Budget ~2 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "Choosing Stemming vs Lemmatization",
    "bullets": [
      {
        "text": "Stemming: search-scale retrieval, rough clustering, strict latency budgets.",
        "icon": "scaling"
      },
      {
        "text": "Lemmatization: classification features, QA preprocessing, linguistic analytics.",
        "icon": "classification"
      },
      {
        "text": "When unsure, prefer lemmatization if SpaCy (or similar) is available.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Stemming: search-scale retrieval, rough clustering, strict latency budgets. · Lemmatization: classification features, QA preprocessing, linguistic analytics.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  }
];
