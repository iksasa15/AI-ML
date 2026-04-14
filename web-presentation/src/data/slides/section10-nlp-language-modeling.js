/** Auto-split from presentationData — section10-nlp-language-modeling */
export const slides = [
    {
      title: "NLP Language Modeling with N-grams",
      subtitle: "From Count-Based Prediction to Evaluation",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Google_Ngram.png",
      ],
      bullets: [
        "Language models estimate probabilities over word sequences.",
        "N-gram models predict the next token from a limited context window.",
        "This module connects N-gram intuition to modern LLM generation.",
      ],
    },
    {
      title: "What Is an N-gram?",
      table: {
        headers: ["Model", "Context Used", "Example Prediction"],
        rows: [
          ["Unigram", "No context", "Predict based on global word frequency"],
          ["Bigram", "Previous 1 word", "P(w_t | w_{t-1})"],
          ["Trigram", "Previous 2 words", "P(w_t | w_{t-2}, w_{t-1})"],
          ["5-gram", "Previous 4 words", "P(w_t | w_{t-4}, ..., w_{t-1})"],
        ],
      },
      note: "Higher n gives richer local context but increases sparsity and data requirements.",
    },
    {
      title: "Why Next-Word Prediction Matters",
      sections: [
        {
          heading: "Classic NLP Uses",
          bullets: [
            "Grammar/spell checking via low-probability sequence detection.",
            "Search auto-complete and query continuation.",
            "Speech recognition disambiguation for phonetically similar outputs.",
          ],
        },
        {
          heading: "Modern Connection",
          bullets: [
            "Autoregressive LLMs generate text by repeated next-token prediction.",
            "The core objective extends N-gram intuition with neural representations.",
          ],
        },
      ],
    },
    {
      title: "Formal Language Modeling Objective",
      formula:
        "P(w_1,\\ldots,w_T)=\\prod_{t=1}^{T} P(w_t \\mid w_1,\\ldots,w_{t-1})",
      bullets: [
        "A language model can score full sentences or predict the next word.",
        "Exact estimation over full histories is intractable for real corpora.",
        "Approximation strategies include N-grams, smoothing, and neural LMs.",
      ],
    },
    {
      title: "Chain Rule and Markov Assumption",
      table: {
        headers: ["Approach", "Assumption", "Tradeoff"],
        rows: [
          ["Full chain rule", "Condition on full history", "Accurate but data/computation heavy"],
          ["1st-order Markov (bigram)", "Condition on previous word only", "Practical but ignores long dependencies"],
          ["(n-1)-order Markov", "Condition on last n-1 words", "Better local context with higher sparsity"],
        ],
      },
      note: "Markov assumptions make count-based language modeling operationally feasible.",
    },
    {
      title: "Unigram vs Bigram Intuition",
      bullets: [
        "Unigram models often generate incoherent sentences due to independence assumptions.",
        "Bigrams and trigrams recover local fluency but still miss distant structure.",
        "Long-distance syntax/semantics motivates neural context modeling.",
      ],
      table: {
        headers: ["Model", "Fluency", "Long-Range Handling"],
        rows: [
          ["Unigram", "Low", "None"],
          ["Bigram", "Moderate local fluency", "Weak"],
          ["Trigram+", "Better local coherence", "Still limited"],
        ],
      },
    },
    {
      title: "Key Weaknesses of N-gram Models",
      table: {
        headers: ["Limitation", "Example", "Impact"],
        rows: [
          ["Long-distance dependency failure", "Subject-verb agreement far apart", "Grammar inconsistencies"],
          ["Sparse exact matching", "Seen 'delicious meal' but not 'tasty dish'", "Poor synonym generalization"],
          ["Data sparsity", "Rare sequences unseen", "Zero probabilities without smoothing"],
        ],
      },
    },
    {
      title: "Why LLMs Outperform N-grams",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Full_GPT_architecture.svg",
      ],
      table: {
        headers: ["Capability", "N-gram", "LLM"],
        rows: [
          ["Context length", "Short fixed window", "Long contextual modeling"],
          ["Semantic understanding", "Exact surface co-occurrence", "Embedding-based representations"],
          ["Synonym/generalization", "Weak", "Strong"],
          ["Novel generation quality", "Limited", "Substantially better"],
        ],
      },
      note: "LLMs replace count tables with learned distributed representations and deep context integration.",
    },
    {
      title: "Estimating N-gram Probabilities (MLE)",
      formula:
        "P(w_t\\mid w_{t-n+1}^{t-1})=\\frac{C(w_{t-n+1}^{t})}{C(w_{t-n+1}^{t-1})}",
      bullets: [
        "Maximum Likelihood Estimation uses corpus frequency counts.",
        "For bigrams: divide count of word pair by count of prefix word.",
        "Simple and interpretable, but brittle for unseen combinations.",
      ],
    },
    {
      title: "Worked Bigram Example",
      body: 'Given counts: C("want to") = 608, C("want") = 927',
      formula: 'P("to"\\mid"want")=\\frac{608}{927}\\approx0.656',
      bullets: [
        'Interpretation: in this corpus, "to" follows "want" about 65.6% of the time.',
        "Count quality depends strongly on corpus domain and size.",
      ],
    },
    {
      title: "Why Use Log Probabilities",
      bullets: [
        "Multiplying many small probabilities causes numerical underflow.",
        "Log transform converts multiplication into stable addition.",
        "Sequence scoring becomes computationally robust and efficient.",
      ],
      table: {
        headers: ["Original Space", "Log Space"],
        rows: [
          ["P = p1 * p2 * ... * pk", "log P = log p1 + log p2 + ... + log pk"],
          ["Very small numbers", "Numerically stable sums"],
        ],
      },
    },
    {
      title: "Evaluating Language Models",
      sections: [
        {
          heading: "Extrinsic Evaluation",
          bullets: [
            "Measure downstream task impact (ASR, MT, etc.).",
            "Most realistic but expensive and slow.",
          ],
        },
        {
          heading: "Intrinsic Evaluation",
          bullets: [
            "Use perplexity on held-out text as a proxy for predictive quality.",
            "Fast model comparison during iteration.",
          ],
        },
      ],
    },
    {
      title: "Perplexity (PP): Interpretation",
      formula:
        "\\mathrm{PP}(W)=P(w_1,\\ldots,w_T)^{-\\frac{1}{T}}=\\exp\\left(-\\frac{1}{T}\\sum_{t=1}^{T}\\log P(w_t\\mid h_t)\\right)",
      bullets: [
        "Perplexity is the average branching uncertainty of the model.",
        "Lower PP means better predictive confidence on unseen text.",
        "Use identical test sets when comparing models.",
      ],
      note: "Raw sentence probabilities are length-sensitive; perplexity normalizes by token count.",
    },
    {
      title: "Perplexity Across N-gram Orders",
      table: {
        headers: ["N-gram Order", "Example PP (WSJ-style)", "Takeaway"],
        rows: [
          ["Unigram", "962", "Very weak due to no context"],
          ["Bigram", "170", "Large improvement with local context"],
          ["Trigram", "109", "Further gain from longer local history"],
        ],
      },
      note: "Increasing n generally lowers PP until sparsity and data limits dominate.",
    },
    {
      title: "Language Modeling Summary and Practice",
      subtitle: "N-gram LM Core Checklist",
      bullets: [
        "Understand chain rule factorization and Markov approximations.",
        "Compute MLE-based N-gram probabilities from counts.",
        "Use log probabilities for stable sequence scoring.",
        "Evaluate with perplexity and compare models on the same test set.",
      ],
      note: "Next step in practice: add smoothing (Laplace/Kneser-Ney) to handle unseen n-grams.",
    },

];
