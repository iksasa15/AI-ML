/** Week 3 Session 3 — Text analysis, POS/NER, mini project */
export const slides = [
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
