/** Auto-split from presentationData — section11-nlp-contextual-rnn */
export const slides = [
    {
      title: "NLP Contextualized Embeddings and RNNs",
      subtitle: "From Static Vectors to Context-Aware Sequence Models",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/3/34/Transformer%2C_full_architecture.png",
      ],
      bullets: [
        "Contextual embeddings assign different vectors to the same word in different contexts.",
        "This shift improved disambiguation, semantics, and downstream NLP performance.",
        "This module links contextual representation learning with recurrent sequence modeling.",
      ],
    },
    {
      title: "Static vs Contextualized Word Representations",
      table: {
        headers: ["Property", "Static Embeddings (Word2Vec/GloVe)", "Contextualized Embeddings (ELMo/BERT/GPT)"],
        rows: [
          ["Vector per word", "One fixed vector", "Different vectors per context"],
          ["Polysemy handling", "Weak", "Strong"],
          ["Context direction", "Usually local/global corpus only", "Bidirectional or autoregressive sequence context"],
          ["Task transfer", "Moderate", "High with pretraining + fine-tuning"],
        ],
      },
      note: "Contextualization is a core enabler for modern LLM quality.",
    },
    {
      title: "How Contextualized Embeddings Work",
      sections: [
        {
          heading: "Architecture Layers",
          bullets: [
            "Token/base embedding layer maps input ids to dense vectors.",
            "Context encoder layers (often Transformer blocks) enrich each token with sequence context.",
            "Task head uses contextual features for prediction.",
          ],
        },
        {
          heading: "Layer Semantics",
          bullets: [
            "Lower layers capture local syntax/patterns.",
            "Middle layers improve sense disambiguation.",
            "Upper layers capture richer semantics and task-specific signals.",
          ],
        },
      ],
    },
    {
      title: "Impact of Contextual Embeddings on LLMs",
      bullets: [
        "Better understanding of ambiguous queries and nuanced language.",
        "Strong transfer learning via pretrain-then-finetune workflows.",
        "Improved scalability for large vocabularies and unseen contexts.",
      ],
      table: {
        headers: ["Benefit", "Practical Outcome"],
        rows: [
          ["Disambiguation", "Fewer semantic errors in QA/NER/sentiment tasks"],
          ["Transfer learning", "Less task-specific labeled data required"],
          ["Generalization", "Better robustness on new domains"],
        ],
      },
    },
    {
      title: "From Traditional LMs to Recurrent Models",
      bullets: [
        "N-gram models struggle with long-distance dependencies and memory cost.",
        "RNNs process full sequences by propagating hidden state through time.",
        "Shared parameters across time steps keep model size manageable.",
      ],
      note: "RNNs were an important step beyond count-based language modeling.",
    },
    {
      title: "RNN Mechanism and Weight Sharing",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Recurrent_neural_network_unfold.svg",
      ],
      bullets: [
        "At time t, the RNN consumes current input and previous hidden state.",
        "The same cell and weights are reused at every time step.",
        "This recurrence captures sequential information in variable-length text.",
      ],
      formula: "h_t = f(W_x x_t + W_h h_{t-1} + b)",
    },
    {
      title: "Common RNN Input/Output Patterns",
      table: {
        headers: ["Pattern", "Mapping", "Example Task"],
        rows: [
          ["One-to-One", "single input -> single output", "basic regression/classification"],
          ["One-to-Many", "single input -> sequence output", "image captioning"],
          ["Many-to-One", "sequence input -> single output", "sentiment classification"],
          ["Many-to-Many", "sequence input -> sequence output", "machine translation"],
        ],
      },
      note: "Sequence-aware patterns are where recurrent models provide clear value.",
    },
    {
      title: "RNN Family: Vanilla, GRU, BiRNN, LSTM",
      imageUrls: [
        "https://upload.wikimedia.org/wikipedia/commons/5/5f/Gated_Recurrent_Unit.svg",
      ],
      table: {
        headers: ["Model", "Vanishing Gradient Risk", "Key Strength", "Typical Limitation"],
        rows: [
          ["Vanilla RNN", "High", "Simple architecture", "Poor long-range memory"],
          ["GRU", "Lower", "Efficient gating with fewer parameters", "Can still degrade on very long contexts"],
          ["BiRNN", "Medium", "Uses past and future context", "Higher compute and memory"],
          ["LSTM", "Low (relative)", "Strong long-term dependency handling", "Heavier than GRU"],
        ],
      },
    },
    {
      title: "Activation Functions in Recurrent/Deep Models",
      table: {
        headers: ["Activation", "Range", "Typical Use", "Note"],
        rows: [
          ["tanh", "(-1, 1)", "RNN hidden states", "Smooth and zero-centered"],
          ["sigmoid", "(0, 1)", "gates and binary outputs", "Interpretable as probability"],
          ["ReLU", "[0, inf)", "deep feedforward/CNN layers", "Fast but can produce dead units"],
          ["softmax", "(0,1) distribution", "multiclass output layer", "Probabilities sum to 1"],
        ],
      },
    },
    {
      title: "Contextual Embeddings and RNNs Summary",
      bullets: [
        "Contextualized embeddings replaced one-vector-per-word limitations.",
        "RNNs introduced sequence-aware state propagation over time.",
        "GRU/LSTM mitigate gradient issues and improve long-context learning.",
        "These ideas paved the path toward stronger seq2seq and transformer systems.",
      ],
    },

];
