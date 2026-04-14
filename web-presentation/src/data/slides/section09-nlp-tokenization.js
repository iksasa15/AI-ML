/** Auto-split from presentationData — section09-nlp-tokenization */
export const slides = [
    {
      title: "NLP Tokenization Masterclass",
      subtitle: "From Word Splits to Subword Modeling",
      bullets: [
        "This module focuses on practical tokenization design choices in NLP pipelines.",
        "We compare space-based, character-based, and subword tokenization strategies.",
        "Goal: handle rare words while controlling vocabulary growth.",
      ],
      note: "Tokenization quality strongly affects downstream embedding and model performance.",
    },
    {
      title: "Space-Based vs Subword Tokenization",
      table: {
        headers: ["Method", "How It Splits", "Best Use", "Limitation"],
        rows: [
          ["Whitespace", "Split by spaces", "Simple corpora and fast baselines", "Weak handling of rare/morphologically rich words"],
          ["Character", "Each char is a token", "No OOV failures", "Very long token sequences"],
          ["Subword", "Word pieces learned from corpus", "Modern NLP/LLMs", "Requires tokenizer training and tuning"],
        ],
      },
      note: "Subword tokenization is usually the best compromise for modern production NLP.",
    },
    {
      title: "Subword Algorithms Comparison",
      table: {
        headers: ["Algorithm", "Core Idea", "Needs Pre-tokenization?", "Common Models"],
        rows: [
          ["Unigram LM", "Probabilistic token inventory", "No", "XLNet, T5"],
          ["WordPiece", "Likelihood-based merge scoring", "Yes", "BERT family"],
          ["BPE", "Frequent-pair iterative merges", "Yes", "GPT, RoBERTa style pipelines"],
          ["SentencePiece", "Raw text tokenization framework", "No", "mBART, multilingual setups"],
        ],
      },
    },
    {
      title: "Unigram LM Example: Choosing Best Segmentation",
      body: "Input word: basketball",
      table: {
        headers: ["Candidate Tokenization", "Probability", "Decision"],
        rows: [
          ["basket + ball", "0.30", "Possible"],
          ["basketball", "0.40", "Selected (highest likelihood)"],
          ["bask + etball", "0.06", "Rejected"],
        ],
      },
      bullets: [
        "Unigram LM keeps multiple candidates and scores them probabilistically.",
        "EM training refines token probabilities and prunes weak tokens over time.",
      ],
    },
    {
      title: "BPE Walkthrough: low, lowest, lower",
      table: {
        headers: ["Step", "Action", "Result"],
        rows: [
          ["1", "Start with characters", "l, o, w, e, s, t, r"],
          ["2", "Merge most frequent pair l+o", "lo"],
          ["3", "Merge lo+w", "low"],
          ["4", "Continue frequent merges", "lower, lowest become compact tokens"],
        ],
      },
      note: "BPE repeatedly merges frequent adjacent units until target vocabulary size is reached.",
    },
    {
      title: "BPE Tokenization Inference Example",
      body: "Given sentence: lowered the lowest curtain",
      table: {
        headers: ["Word", "Subword Output"],
        rows: [
          ["lowered", "low + er + ed"],
          ["the", "the"],
          ["lowest", "low + est"],
          ["curtain", "curtain (or further split if unseen)"],
        ],
      },
      bullets: [
        "Subword decomposition reduces out-of-vocabulary failures.",
        "Frequent morphemes become reusable building blocks across words.",
      ],
    },
    {
      title: "Why Subword Tokenization Matters in Practice",
      sections: [
        {
          heading: "Operational Benefits",
          bullets: [
            "Handles rare and unseen words gracefully.",
            "Keeps vocabulary compact without losing compositional meaning.",
            "Improves transfer across domains and noisy user text.",
          ],
        },
        {
          heading: "Bootcamp Takeaway",
          bullets: [
            "Tokenizer choice is a model-design decision, not just preprocessing.",
            "Always validate tokenization behavior on your real domain samples.",
          ],
        },
      ],
    },
    {
      title: "Tokenization Practice Exercise",
      subtitle: "Manual Tokenization Drill",
      body: 'Corpus: "go going gone goals"',
      bullets: [
        'Task: tokenize sentence "the goat is going to the goal" using a subword strategy.',
        "Compare outputs under whitespace, BPE-style merges, and Unigram-style choices.",
        "Discuss which strategy gives better reuse and fewer unknown tokens.",
      ],
      note: "Practice builds intuition for tokenizer behavior before model training.",
    },

];
