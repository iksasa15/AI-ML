/** Auto-split from presentationData — section14-day01-nlp-intro */
export const slides = [
  {
    "title": "Day 1 — Course Overview & Objectives",
    "bullets": [
      {
        "text": "Explain what NLP is and why it is hard.",
        "icon": "idea"
      },
      {
        "text": "Apply a full NLP pipeline to raw text.",
        "icon": "monitoring"
      },
      {
        "text": "Use SpaCy and NLTK for core text processing.",
        "icon": "idea"
      },
      {
        "text": "Contrast stemming vs lemmatization; extract named entities.",
        "icon": "idea"
      },
      {
        "text": "Outline a complete text-analysis mini-project.",
        "icon": "idea"
      }
    ],
    "note": "Focus on why each pipeline step exists — patterns matter more than memorizing APIs.",
    "speakerNote": "Focus on why each pipeline step exists — patterns matter more than memorizing APIs.",
    "titleIcon": "idea"
  },
  {
    "title": "What Is NLP?",
    "subtitle": "Definition",
    "bullets": [
      {
        "text": "NLP is an AI subfield: computers understand, generate, and interact with human language.",
        "icon": "nlp"
      },
      {
        "text": "Language encodes meaning, context, intent, and sentiment — not just tokens.",
        "icon": "encoding"
      },
      {
        "text": "Systems must bridge informal human expression and structured machine representations.",
        "icon": "regression"
      }
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: NLP is an AI subfield: computers understand, generate, and interact with human l · Language encodes meaning, context, intent, and sentiment — not just tokens.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "nlp"
  },
  {
    "title": "Why Language Is Hard for Computers",
    "subtitle": "Ambiguity Is the Core Challenge",
    "bullets": [
      {
        "text": "Example: \"I saw the man with the telescope\" — instrument vs modifier reading.",
        "icon": "idea"
      },
      {
        "text": "Humans disambiguate instantly with world knowledge; models must learn or infer context.",
        "icon": "model"
      },
      {
        "text": "Ambiguity appears at lexical, syntactic, semantic, and pragmatic levels.",
        "icon": "rag"
      }
    ],
    "table": {
      "headers": [
        "Type",
        "Example",
        "Interpretations"
      ],
      "rows": [
        [
          "Lexical",
          "bank",
          "Financial institution vs river bank"
        ],
        [
          "Syntactic",
          "Flying planes can be dangerous",
          "Planes vs piloting activity"
        ],
        [
          "Semantic",
          "Every child loves a parent",
          "Specific vs any parent"
        ],
        [
          "Pragmatic",
          "Can you pass the salt?",
          "Question form vs polite request"
        ]
      ]
    },
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: Example: \"I saw the man with the telescope\" — instrument vs modifier reading. · Humans disambiguate instantly with world knowledge; models must learn or infer c. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "More NLP Challenges",
    "bullets": [
      {
        "text": "Sarcasm, idioms, and figurative language invert or stretch literal meaning.",
        "icon": "nlp"
      },
      {
        "text": "Coreference: \"Sarah told Mary she was late\" — who is \"she\"?",
        "icon": "nlp"
      },
      {
        "text": "Noise: misspellings, slang (\"That's fire\"), dialect, negation (\"not bad\").",
        "icon": "missing-data"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Sarcasm, idioms, and figurative language invert or stretch literal meaning. · Coreference: \"Sarah told Mary she was late\" — who is \"she\"?. Budget ~2 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "nlp"
  },
  {
    "title": "Real-World NLP Applications",
    "table": {
      "headers": [
        "Domain",
        "Examples"
      ],
      "rows": [
        [
          "Search & assistants",
          "Google Search, Siri/Alexa, intent detection"
        ],
        [
          "Generation & MT",
          "ChatGPT/Claude, Gmail Smart Reply, Google Translate"
        ],
        [
          "Enterprise",
          "Bloomberg sentiment, healthcare records, Amazon reviews"
        ],
        [
          "Safety & ops",
          "Spam filters, fake-news and toxicity detection, call centers"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "nlp"
  },
  {
    "title": "Real-World Applications — Concrete Input/Output Examples",
    "table": {
      "headers": [
        "Use case",
        "Input",
        "Output"
      ],
      "rows": [
        [
          "Spam filtering",
          "Win a FREE iPhone now!!! Click here",
          "Label: spam (high confidence)"
        ],
        [
          "Sentiment analysis",
          "Battery life is great but camera is weak",
          "Mixed sentiment: +battery, -camera"
        ],
        [
          "Intent detection",
          "I want to reset my password",
          "Intent: account_password_reset"
        ],
        [
          "NER for finance",
          "Apple invested $1B in Texas",
          "ORG=Apple, MONEY=$1B, GPE=Texas"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "idea"
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
    "title": "Text Cleaning — Step 1: Conceptual Pipeline",
    "table": {
      "headers": [
        "Stage",
        "What happens",
        "Goal"
      ],
      "rows": [
        [
          "1",
          "Decode entities + remove HTML",
          "Keep readable content only"
        ],
        [
          "2",
          "Remove URLs / contacts / mentions",
          "Drop metadata noise"
        ],
        [
          "3",
          "Remove emoji / odd symbols",
          "Standardize character space"
        ],
        [
          "4",
          "Normalize punctuation + spaces",
          "Produce clean model-ready text"
        ]
      ]
    },
    "note": "Teach the idea first, then execute one worked example.",
    "speakerNote": "Teach the idea first, then execute one worked example.",
    "titleIcon": "pipeline"
  },
  {
    "title": "Text Cleaning — Step 2: Raw Input Example",
    "table": {
      "headers": [
        "Item",
        "Value"
      ],
      "rows": [
        [
          "Raw text",
          "<p>John said: \"AI is amazing!!!! 🤖🔥\"</p> Visit: https://ai.com @john #AI Contact: +1-800-000-0000"
        ],
        [
          "Contains",
          "HTML + URL + @mention + hashtag + phone + emoji"
        ]
      ]
    },
    "note": "Use this as the starting point before running clean_text().",
    "speakerNote": "Use this as the starting point before running clean_text().",
    "titleIcon": "idea"
  },
  {
    "title": "Text Cleaning — Python Function (Core)",
    "table": {
      "headers": [
        "Step",
        "Python line",
        "Purpose"
      ],
      "rows": [
        [
          "1",
          "text = html.unescape(text)",
          "Decode HTML entities"
        ],
        [
          "2",
          "text = re.sub(r'<[^>]+>', '', text)",
          "Remove HTML tags"
        ],
        [
          "3",
          "text = re.sub(r'https?://\\S+|www\\.\\S+', '', text)",
          "Remove URLs"
        ],
        [
          "4",
          "text = re.sub(r'\\S+@\\S+', '', text)",
          "Remove email addresses"
        ],
        [
          "5",
          "text = re.sub(r'\\+?[\\d\\-\\(\\)\\s]{9,}', '', text)",
          "Remove phone numbers"
        ],
        [
          "6",
          "text = re.sub(r'@\\w+|#\\w+', '', text)",
          "Remove mentions and hashtags"
        ],
        [
          "7",
          "text = text.encode('ascii', 'ignore').decode('ascii')",
          "Drop emoji / non-ASCII"
        ],
        [
          "8",
          "text = re.sub(r'[^\\w\\s\\.\\!\\?]', ' ', text)",
          "Keep letters/spaces/sentence punctuation"
        ],
        [
          "9",
          "text = re.sub(r'\\s+', ' ', text).strip()",
          "Normalize extra whitespace"
        ]
      ]
    },
    "note": "This is the same clean_text() pipeline from Day01_NLP_Introduction_EN.md section 3.2.",
    "speakerNote": "This is the same clean_text() pipeline from Day01_NLP_Introduction_EN.md section 3.2.",
    "titleIcon": "idea"
  },
  {
    "title": "Text Cleaning — Step 4: Transformation Trace",
    "table": {
      "headers": [
        "Step",
        "What we remove / change",
        "Text snapshot"
      ],
      "rows": [
        [
          "0 (raw)",
          "Original text",
          "<p>John said: \"AI is amazing!!!! \" Visit: https://ai.com @john #AI Contact: +1-800-000-0000</p>"
        ],
        [
          "1",
          "Remove HTML tags",
          "John said: \"AI is amazing!!!! \" Visit: https://ai.com @john #AI Contact: +1-800-000-0000"
        ],
        [
          "2",
          "Remove URL",
          "John said: \"AI is amazing!!!! \" Visit:  @john #AI Contact: +1-800-000-0000"
        ],
        [
          "3",
          "Remove @mention and #hashtag",
          "John said: \"AI is amazing!!!! \" Visit:   Contact: +1-800-000-0000"
        ],
        [
          "4",
          "Remove phone number",
          "John said: \"AI is amazing!!!! \" Visit:   Contact: "
        ],
        [
          "5",
          "Normalize punctuation + spaces",
          "John said AI is amazing!!!! Visit"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea"
  },
  {
    "title": "Text Cleaning — Step 5: Final Before/After",
    "table": {
      "headers": [
        "Case",
        "Value"
      ],
      "rows": [
        [
          "Before",
          "<p>John said: \"AI is amazing!!!! \" Visit: https://ai.com @john #AI Contact: +1-800-000-0000</p>"
        ],
        [
          "After",
          "John said AI is amazing!!!! Visit"
        ]
      ]
    },
    "note": "This is the exact expected output from the lesson example.",
    "speakerNote": "This is the exact expected output from the lesson example.",
    "titleIcon": "idea"
  },
  {
    "title": "Lowercase Normalization",
    "bullets": [
      {
        "text": "Lowercasing merges surface forms: \"NASA\" / \"nasa\" → same token for bag-of-words style tasks.",
        "icon": "token"
      },
      {
        "text": "Risk: named-entity signal loss — \"Apple\" (company) vs \"apple\" (fruit).",
        "icon": "formula"
      },
      {
        "text": "For NER and MT, preserve case until you have a tokenizer/model policy.",
        "icon": "token"
      }
    ],
    "note": "Academic rule: lowercase for retrieval/classification, keep case for NER-sensitive pipelines.",
    "speakerNote": "Academic rule: lowercase for retrieval/classification, keep case for NER-sensitive pipelines.",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling"
  },
  {
    "title": "Lowercase Normalization — Step-by-Step Examples",
    "table": {
      "headers": [
        "Step",
        "Input text",
        "Python operation",
        "Output text"
      ],
      "rows": [
        [
          "1",
          "Natural Language Processing",
          "normalize_case(text)",
          "natural language processing"
        ],
        [
          "2",
          "ARTIFICIAL INTELLIGENCE",
          "normalize_case(text)",
          "artificial intelligence"
        ],
        [
          "3",
          "iPhone vs Android",
          "normalize_case(text)",
          "iphone vs android"
        ],
        [
          "4",
          "NASA launched SpaceX",
          "normalize_case(text)",
          "nasa launched spacex"
        ]
      ]
    },
    "note": "Use lowercasing carefully for NER tasks where capitalization carries meaning.",
    "speakerNote": "Use lowercasing carefully for NER tasks where capitalization carries meaning.",
    "titleIcon": "scaling",
    "conceptAnimation": "feature-scaling"
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
    "title": "POS and Dependency Highlights in SpaCy",
    "bullets": [
      {
        "text": "Apple is looking at buying a U.K. startup — PROPN vs common-noun readings matter.",
        "icon": "idea"
      },
      {
        "text": "dep_ links heads and dependents (nsubj, dobj, prep) for shallow semantics.",
        "icon": "idea"
      },
      {
        "text": "noun_chunks surfaces multi-word subjects/objects for summarization heuristics.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Apple is looking at buying a U.K. startup — PROPN vs common-noun readings matter · dep_ links heads and dependents (nsubj, dobj, prep) for shallow semantics.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "idea"
  },
  {
    "title": "POS/Dependency — Worked Example",
    "table": {
      "headers": [
        "Token",
        "POS",
        "Dependency role"
      ],
      "rows": [
        [
          "Apple",
          "PROPN",
          "nsubj"
        ],
        [
          "looking",
          "VERB",
          "ROOT"
        ],
        [
          "buying",
          "VERB",
          "xcomp/pcomp"
        ],
        [
          "startup",
          "NOUN",
          "dobj"
        ],
        [
          "for",
          "ADP",
          "prep"
        ]
      ]
    },
    "note": "Sentence: Apple is looking at buying a U.K. startup for $1 billion.",
    "speakerNote": "Sentence: Apple is looking at buying a U.K. startup for $1 billion.",
    "titleIcon": "idea"
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
    "title": "NER with SpaCy — Basic Usage",
    "bullets": [
      {
        "text": "doc.ents yields (text, label_, start_char, end_char) for each span.",
        "icon": "idea"
      },
      {
        "text": "Group by label with defaultdict(set) for quick corpus dashboards.",
        "icon": "idea"
      },
      {
        "text": "Combine NER with dependency paths for lightweight relation tuples.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: doc.ents yields (text, label_, start_char, end_char) for each span. · Group by label with defaultdict(set) for quick corpus dashboards.. Budget ~2 min. 30-second think-pair-share: which bullet would you apply first?",
    "titleIcon": "idea"
  },
  {
    "title": "NER — Worked Example (News Snippet)",
    "table": {
      "headers": [
        "Extracted span",
        "Label"
      ],
      "rows": [
        [
          "Apple",
          "ORG"
        ],
        [
          "Tim Cook",
          "PERSON"
        ],
        [
          "Tuesday",
          "DATE"
        ],
        [
          "$430 billion",
          "MONEY"
        ],
        [
          "United States",
          "GPE"
        ],
        [
          "3.5%",
          "PERCENT"
        ]
      ]
    },
    "note": "Use this output table right after running doc.ents in class.",
    "speakerNote": "Use this output table right after running doc.ents in class.",
    "titleIcon": "idea"
  },
  {
    "title": "Evaluating NER Quality",
    "bullets": [
      {
        "text": "Gold spans with strict label match drive precision/recall/F1.",
        "icon": "metric"
      },
      {
        "text": "Spacy Scorer + Example.from_dict supports batch evaluation scripts.",
        "icon": "test"
      },
      {
        "text": "Confusion often concentrates on ORG vs PRODUCT and fine-grained GPE vs LOC.",
        "icon": "idea"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Gold spans with strict label match drive precision/recall/F1. · Spacy Scorer + Example.from_dict supports batch evaluation scripts.. Budget ~2 min. Quick check: ask one volunteer to paraphrase the first bullet.",
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
    "title": "Day Project — Product Review Analyzer",
    "bullets": [
      {
        "text": "Load short reviews; run SpaCy per document.",
        "icon": "idea"
      },
      {
        "text": "Mine adjectives vs a sentiment lexicon; list aspects (camera, battery, …).",
        "icon": "idea"
      },
      {
        "text": "Aggregate counters across SKUs for a one-page report.",
        "icon": "idea"
      }
    ],
    "note": "Cross-check lexicon sentiment with star ratings to catch sarcasm gaps.",
    "speakerNote": "Cross-check lexicon sentiment with star ratings to catch sarcasm gaps.",
    "titleIcon": "idea"
  },
  {
    "title": "End-to-End Flow (Conceptual)",
    "bullets": [
      {
        "text": "Raw marketing sentence → clean → tokenize → optional stop removal.",
        "icon": "token"
      },
      {
        "text": "Lemmatize → POS tags → NER spans.",
        "icon": "workflow"
      },
      {
        "text": "Emit structured JSON for charts, search, or model features.",
        "icon": "feature"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Raw marketing sentence → clean → tokenize → optional stop removal. · Lemmatize → POS tags → NER spans.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "workflow"
  },
  {
    "title": "Practice Track — Exercises",
    "sections": [
      {
        "heading": "Exercise 1 — Easy",
        "bullets": [
          {
            "text": "Financial news paragraph: group SpaCy entities by label.",
            "icon": "rag"
          }
        ]
      },
      {
        "heading": "Exercise 2 — Medium",
        "bullets": [
          {
            "text": "Jaccard similarity on lemma sets between two sentences (minus stops).",
            "icon": "idea"
          }
        ]
      },
      {
        "heading": "Exercise 3 — Advanced",
        "bullets": [
          {
            "text": "Lightweight event tuples: subject–verb–object + DATE/GPE hooks via deps.",
            "icon": "idea"
          }
        ]
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Work in pairs — one drives the notebook, one reviews outputs. · Raise hand when blocked >3 minutes so we can unblock the room.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "idea",
    "bullets": [
      {
        "text": "Work in pairs — one drives the notebook, one reviews outputs.",
        "icon": "check"
      },
      {
        "text": "Raise hand when blocked >3 minutes so we can unblock the room.",
        "icon": "idea"
      }
    ]
  },
  {
    "title": "Curated Learning Resources",
    "table": {
      "headers": [
        "Resource",
        "Focus"
      ],
      "rows": [
        [
          "NLTK Book (ch. 1–2)",
          "Python + linguistic basics"
        ],
        [
          "SpaCy 101",
          "Industrial NLP API mental model"
        ],
        [
          "Stanford CS224N (YouTube)",
          "Deep NLP theory"
        ],
        [
          "Hugging Face NLP course",
          "Modern pipelines and tokenizers"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Anchor on the diagram or table before moving on. Budget ~3 min. Challenge: link this slide to the section opener in one sentence.",
    "titleIcon": "idea"
  },
  {
    "title": "Day 1 Readiness Checklist",
    "bullets": [
      {
        "text": "Explain ambiguity types with fresh examples.",
        "icon": "idea"
      },
      {
        "text": "Run a cleaning + tokenization path on messy sample text.",
        "icon": "token"
      },
      {
        "text": "Contrast BPE vs WordPiece motivations at a high level.",
        "icon": "token"
      },
      {
        "text": "State when stop word removal helps vs hurts.",
        "icon": "idea"
      },
      {
        "text": "Show stemming vs lemmatization on the same 5 word forms.",
        "icon": "idea"
      },
      {
        "text": "List entities from a news snippet with correct coarse types.",
        "icon": "idea"
      }
    ],
    "note": "Complete Exercises 1–2 before moving to text-as-vectors topics (Day 2).",
    "speakerNote": "Complete Exercises 1–2 before moving to text-as-vectors topics (Day 2).",
    "titleIcon": "idea"
  },
  {
    "title": "Day 1 Closing",
    "subtitle": "Next: Text Representations",
    "bullets": [
      {
        "text": "You now have a concrete pipeline from characters to lemmas, POS, and entities.",
        "icon": "monitoring"
      },
      {
        "text": "Next sessions connect these signals to BoW, TF-IDF, and dense embeddings.",
        "icon": "embedding"
      },
      {
        "text": "Keep notes on failure cases in your own domain — they guide tokenizer and model choices.",
        "icon": "token"
      }
    ],
    "speakerNote": "Start with the subtitle, then walk bullets in order. Land: You now have a concrete pipeline from characters to lemmas, POS, and entities. · Next sessions connect these signals to BoW, TF-IDF, and dense embeddings.. Budget ~2 min. Poll the room: who has used this in production? Invite one short story.",
    "titleIcon": "idea"
  }
];
