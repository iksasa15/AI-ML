/** Day 1 — Introduction to NLP (intensive track), as deck slides */
export const slides = [
  {
    title: "Day 1 — Course Overview & Objectives",
    bullets: [
      "Explain what NLP is and why it is hard.",
      "Apply a full NLP pipeline to raw text.",
      "Use SpaCy and NLTK for core text processing.",
      "Contrast stemming vs lemmatization; extract named entities.",
      "Outline a complete text-analysis mini-project.",
    ],
    note: "Focus on why each pipeline step exists — patterns matter more than memorizing APIs.",
  },
  {
    title: "What Is NLP?",
    subtitle: "Definition",
    bullets: [
      "NLP is an AI subfield: computers understand, generate, and interact with human language.",
      "Language encodes meaning, context, intent, and sentiment — not just tokens.",
      "Systems must bridge informal human expression and structured machine representations.",
    ],
  },
  {
    title: "Why Language Is Hard for Computers",
    subtitle: "Ambiguity Is the Core Challenge",
    bullets: [
      'Example: "I saw the man with the telescope" — instrument vs modifier reading.',
      "Humans disambiguate instantly with world knowledge; models must learn or infer context.",
      "Ambiguity appears at lexical, syntactic, semantic, and pragmatic levels.",
    ],
    table: {
      headers: ["Type", "Example", "Interpretations"],
      rows: [
        ["Lexical", "bank", "Financial institution vs river bank"],
        ["Syntactic", "Flying planes can be dangerous", "Planes vs piloting activity"],
        ["Semantic", "Every child loves a parent", "Specific vs any parent"],
        ["Pragmatic", "Can you pass the salt?", "Question form vs polite request"],
      ],
    },
  },
  {
    title: "More NLP Challenges",
    bullets: [
      "Sarcasm, idioms, and figurative language invert or stretch literal meaning.",
      "Coreference: \"Sarah told Mary she was late\" — who is \"she\"?",
      "Noise: misspellings, slang (\"That's fire\"), dialect, negation (\"not bad\").",
    ],
  },
  {
    title: "Real-World NLP Applications",
    table: {
      headers: ["Domain", "Examples"],
      rows: [
        ["Search & assistants", "Google Search, Siri/Alexa, intent detection"],
        ["Generation & MT", "ChatGPT/Claude, Gmail Smart Reply, Google Translate"],
        ["Enterprise", "Bloomberg sentiment, healthcare records, Amazon reviews"],
        ["Safety & ops", "Spam filters, fake-news and toxicity detection, call centers"],
      ],
    },
  },
  {
    title: "The Full NLP Pipeline",
    subtitle: "From Raw Text to Structured Signals",
    bullets: [
      "1. Text cleaning — HTML/URLs/noise removal.",
      "2. Tokenization — words, subwords, or sentences.",
      "3. Stop word removal — optional, task-dependent.",
      "4. Normalization — case, unicode, spelling heuristics.",
      "5. Stemming / lemmatization — canonical word forms.",
      "6. POS tagging — grammatical roles.",
      "7. NER — entities (people, orgs, money, dates, …).",
    ],
    note: "Output is structured data ready for classical ML, search, or neural models.",
  },
  {
    title: "Text Cleaning — Why Raw Text Is Messy",
    bullets: [
      "Web text mixes markup, entities, URLs, handles, hashtags, emoji, and boilerplate.",
      "Downstream models and lexicons assume cleaner character sequences.",
      "Cleaning rules must match your task — aggressive stripping can erase signal.",
    ],
  },
  {
    title: "Cleaning Pipeline (Conceptual Steps)",
    table: {
      headers: ["Step", "Typical operation"],
      rows: [
        ["1", "Decode HTML entities to plain characters"],
        ["2", "Strip HTML/XML tags"],
        ["3", "Remove URLs, emails, phone patterns"],
        ["4", "Remove @mentions and #hashtags if irrelevant"],
        ["5", "Normalize unicode / optionally ASCII-fold"],
        ["6", "Collapse whitespace; trim edges"],
      ],
    },
    note: "Regex + html.unescape is the usual Python stack for rule-based cleanup.",
  },
  {
    title: "Lowercase Normalization",
    bullets: [
      "Lowercasing merges surface forms: \"NASA\" / \"nasa\" → same token for bag-of-words style tasks.",
      "Risk: named-entity signal loss — \"Apple\" (company) vs \"apple\" (fruit).",
      "For NER and MT, preserve case until you have a tokenizer/model policy.",
    ],
  },
  {
    title: "Tokenization Fundamentals",
    subtitle: "Splitting Text into Tokens",
    bullets: [
      "Word: fast and interpretable; brittle on OOV and morphology.",
      "Character: no unknown tokens; very long sequences.",
      "Subword: balances vocabulary size with rare-word coverage — standard for LLMs.",
    ],
    table: {
      headers: ["Granularity", "Example fragment", "Idea"],
      rows: [
        ["Word", "running → running", "Whole-word units"],
        ["Subword", "running → run + ##ning", "Shared roots across inflections"],
        ["Sentence", "One string per sentence", "Segment before document models"],
      ],
    },
  },
  {
    title: "NLTK Tokenization Essentials",
    bullets: [
      "word_tokenize handles contractions and punctuation boundaries.",
      "sent_tokenize splits paragraphs into sentences.",
      "TweetTokenizer preserves hashtags, mentions, and emoticon tokens.",
    ],
    note: "Download punkt (and punkt_tab where required) before first tokenize calls.",
  },
  {
    title: "Subword Tokenization for Modern LLMs",
    bullets: [
      "Large word vocabularies miss typos, neologisms, and multi-lingual morphology.",
      "Subwords reuse frequent pieces: \"unbelievably\" → learned merges.",
      "GPT-style BPE vs BERT WordPiece: different merge heuristics, same goal.",
    ],
    table: {
      headers: ["Tokenizer family", "Representative models"],
      rows: [
        ["BPE merges", "GPT-2, GPT-3, many open LLMs"],
        ["WordPiece", "BERT, DistilBERT"],
        ["Unigram LM / SentencePiece", "T5, multilingual pipelines"],
      ],
    },
  },
  {
    title: "Why Token Counts Matter",
    bullets: [
      "API pricing and context windows are measured in tokens, not characters.",
      "Technical prose and code usually cost more tokens than simple narrative.",
      "Tokenizer choice changes length → affects batching and truncation strategy.",
    ],
  },
  {
    title: "Stop Words — Removing Low-Information Tokens",
    bullets: [
      "Function words (the, is, and) dominate counts but often carry little topic signal.",
      "Removing them tightens bag-of-words / TF-IDF and classic retrieval setups.",
      "Always validate on a sample — domain-specific 'stop' lists are common.",
    ],
  },
  {
    title: "NLTK Stop Words in Practice",
    bullets: [
      "stopwords.words('english') provides a baseline English set.",
      "Filter after lowercasing and tokenization; often keep alphanumeric tokens only.",
      "Measure reduction: e.g. 17 → 9 tokens on a sample sentence.",
    ],
  },
  {
    title: "Custom and Domain Stop Words",
    bullets: [
      "Sklearn TfidfVectorizer accepts custom stop word lists.",
      "Add boilerplate from your genre: click, read more, subscribe, etc.",
      "Union standard + domain lists; cap size to avoid over-pruning.",
    ],
  },
  {
    title: "When Not to Remove Stop Words",
    table: {
      headers: ["Task type", "Reason to keep stop words"],
      rows: [
        ["Language models (GPT/BERT)", "Negation and function words carry syntax and meaning"],
        ["Machine translation", "Grammar requires determiners and auxiliaries"],
        ["Sentiment", "\"not bad\" ≠ \"bad\"; intensifiers matter"],
        ["QA / chatbots", "Question words and politeness markers are contentful"],
      ],
    },
    note: "Classic IR and topic models still benefit from stop word pruning.",
  },
  {
    title: "Stemming vs Lemmatization",
    table: {
      headers: ["Aspect", "Stemming", "Lemmatization"],
      rows: [
        ["Mechanism", "Rule-based suffix cuts", "Dictionary + morphology (often POS-aware)"],
        ["Speed", "Very fast", "Slower"],
        ["Output", "May be non-words (studi)", "Real lemmas (study)"],
        ["Best for", "Large-scale indexing / recall", "Higher-accuracy linguistic features"],
      ],
    },
  },
  {
    title: "NLTK Stemmer Families",
    bullets: [
      "Porter: gentle, widely used default.",
      "Lancaster: aggressive — can over-chop (organization → organ).",
      "Snowball: language-aware family; good English compromise.",
    ],
    note: "Compare stems on your corpus before picking one for production indexing.",
  },
  {
    title: "Lemmatization with SpaCy",
    bullets: [
      "en_core_web_sm gives lemmas, POS, dependencies, and NER in one nlp() call.",
      "Handles irregulars: mice → mouse; ran → run (verb).",
      "Filter stops/punct before printing lemma tables for teaching clarity.",
    ],
  },
  {
    title: "Choosing Stemming vs Lemmatization",
    bullets: [
      "Stemming: search-scale retrieval, rough clustering, strict latency budgets.",
      "Lemmatization: classification features, QA preprocessing, linguistic analytics.",
      "When unsure, prefer lemmatization if SpaCy (or similar) is available.",
    ],
  },
  {
    title: "Part-of-Speech (POS) Tagging",
    subtitle: "Grammar Labels per Token",
    bullets: [
      "Universal categories include NOUN, VERB, ADJ, ADV, DET, ADP, PROPN, NUM, …",
      "POS feeds lemmatization quality and downstream relation extraction.",
      "SpaCy exposes coarse pos_ and fine-grained tag_ plus dependency dep_.",
    ],
    table: {
      headers: ["POS", "Role", "Quick examples"],
      rows: [
        ["NOUN / PROPN", "Things and names", "city, Tesla"],
        ["VERB / AUX", "Actions and helpers", "run, is"],
        ["ADJ / ADV", "Modifiers", "quick, quickly"],
        ["DET / ADP", "Structure words", "the, in"],
      ],
    },
  },
  {
    title: "POS and Dependency Highlights in SpaCy",
    bullets: [
      "Apple is looking at buying a U.K. startup — PROPN vs common-noun readings matter.",
      "dep_ links heads and dependents (nsubj, dobj, prep) for shallow semantics.",
      "noun_chunks surfaces multi-word subjects/objects for summarization heuristics.",
    ],
  },
  {
    title: "Named Entity Recognition (NER)",
    subtitle: "Typed Spans over Text",
    bullets: [
      "Labels include PERSON, ORG, GPE, DATE, MONEY, PERCENT, PRODUCT, EVENT, …",
      "Useful for indexing, compliance redaction, financial news graphs, and search facets.",
      "Small models err on edge cases — always spot-check domain text.",
    ],
    table: {
      headers: ["Label", "Examples"],
      rows: [
        ["PERSON", "Tim Cook, Jensen Huang"],
        ["ORG / GPE", "Apple, Texas"],
        ["MONEY / PERCENT", "$430 billion, 3.5%"],
      ],
    },
  },
  {
    title: "NER with SpaCy — Basic Usage",
    bullets: [
      "doc.ents yields (text, label_, start_char, end_char) for each span.",
      "Group by label with defaultdict(set) for quick corpus dashboards.",
      "Combine NER with dependency paths for lightweight relation tuples.",
    ],
  },
  {
    title: "Evaluating NER Quality",
    bullets: [
      "Gold spans with strict label match drive precision/recall/F1.",
      "Spacy Scorer + Example.from_dict supports batch evaluation scripts.",
      "Confusion often concentrates on ORG vs PRODUCT and fine-grained GPE vs LOC.",
    ],
  },
  {
    title: "Full SpaCy Pipeline Functionally",
    bullets: [
      "One doc object: tokens, lemmas, POS, entities, noun_chunks, sents.",
      "Typical export: clean token list, lemma bag, entity list, POS histogram.",
      "Use length-based heuristics (e.g. longest sentence) only as weak importance cues.",
    ],
  },
  {
    title: "Day Project — Product Review Analyzer",
    bullets: [
      "Load short reviews; run SpaCy per document.",
      "Mine adjectives vs a sentiment lexicon; list aspects (camera, battery, …).",
      "Aggregate counters across SKUs for a one-page report.",
    ],
    note: "Cross-check lexicon sentiment with star ratings to catch sarcasm gaps.",
  },
  {
    title: "End-to-End Flow (Conceptual)",
    bullets: [
      "Raw marketing sentence → clean → tokenize → optional stop removal.",
      "Lemmatize → POS tags → NER spans.",
      "Emit structured JSON for charts, search, or model features.",
    ],
  },
  {
    title: "Practice Track — Exercises",
    sections: [
      {
        heading: "Exercise 1 — Easy",
        bullets: ["Financial news paragraph: group SpaCy entities by label."],
      },
      {
        heading: "Exercise 2 — Medium",
        bullets: ["Jaccard similarity on lemma sets between two sentences (minus stops)."],
      },
      {
        heading: "Exercise 3 — Advanced",
        bullets: ["Lightweight event tuples: subject–verb–object + DATE/GPE hooks via deps."],
      },
    ],
  },
  {
    title: "Curated Learning Resources",
    table: {
      headers: ["Resource", "Focus"],
      rows: [
        ["NLTK Book (ch. 1–2)", "Python + linguistic basics"],
        ["SpaCy 101", "Industrial NLP API mental model"],
        ["Stanford CS224N (YouTube)", "Deep NLP theory"],
        ["Hugging Face NLP course", "Modern pipelines and tokenizers"],
      ],
    },
  },
  {
    title: "Day 1 Readiness Checklist",
    bullets: [
      "Explain ambiguity types with fresh examples.",
      "Run a cleaning + tokenization path on messy sample text.",
      "Contrast BPE vs WordPiece motivations at a high level.",
      "State when stop word removal helps vs hurts.",
      "Show stemming vs lemmatization on the same 5 word forms.",
      "List entities from a news snippet with correct coarse types.",
    ],
    note: "Complete Exercises 1–2 before moving to text-as-vectors topics (Day 2).",
  },
  {
    title: "Day 1 Closing",
    subtitle: "Next: Text Representations",
    bullets: [
      "You now have a concrete pipeline from characters to lemmas, POS, and entities.",
      "Next sessions connect these signals to BoW, TF-IDF, and dense embeddings.",
      "Keep notes on failure cases in your own domain — they guide tokenizer and model choices.",
    ],
  },
];
