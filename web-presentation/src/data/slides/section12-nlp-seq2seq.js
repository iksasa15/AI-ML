/** Week 3 Session 6 — Seq2Seq, NMT, attention, transformer bridge */
export const slides = [
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
    "title": "Seq2Seq Core Architecture (NMT)",
    "sections": [
      {
        "heading": "Encoder",
        "bullets": [
          {
            "text": "Consumes token embeddings and updates hidden states over source sequence.",
            "icon": "neural-net"
          },
          {
            "text": "Final state or state set summarizes source sentence information.",
            "icon": "seq2seq"
          }
        ]
      },
      {
        "heading": "Decoder",
        "bullets": [
          {
            "text": "Starts with <SOS>/<BOS> and generates target tokens autoregressively.",
            "icon": "regression"
          },
          {
            "text": "Stops when <EOS> is produced.",
            "icon": "seq2seq"
          }
        ]
      }
    ],
    "note": "LSTM/GRU were widely used to reduce vanishing/exploding gradient issues in seq2seq.",
    "speakerNote": "LSTM/GRU were widely used to reduce vanishing/exploding gradient issues in seq2seq.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention",
    "bullets": [
      {
        "text": "Encoder compresses source; decoder generates target token by token.",
        "icon": "seq2seq"
      },
      {
        "text": "Attention lets the decoder focus on relevant encoder states.",
        "icon": "attention"
      },
      {
        "text": "Teacher forcing during training; beam search often used at inference.",
        "icon": "model"
      }
    ]
  },
  {
    "title": "Seq2Seq Step-by-Step Generation",
    "table": {
      "headers": [
        "Step",
        "Decoder Input",
        "Predicted Output",
        "Comment"
      ],
      "rows": [
        [
          "1",
          "<bos>",
          "I",
          "Initialization from encoder context"
        ],
        [
          "2",
          "I",
          "saw",
          "Uses prior token and hidden state"
        ],
        [
          "3",
          "saw",
          "a",
          "Autoregressive continuation"
        ],
        [
          "4",
          "a",
          "cat",
          "Context accumulates over steps"
        ],
        [
          "5",
          "mat",
          "<eos>",
          "Termination token stops decoding"
        ]
      ]
    },
    "note": "At each step, the decoder outputs a full vocabulary probability distribution.",
    "speakerNote": "At each step, the decoder outputs a full vocabulary probability distribution.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention"
  },
  {
    "title": "Training Seq2Seq with Cross-Entropy",
    "formula": "\\mathcal{L} = -\\sum_{t=1}^{T} \\log P(y_t^* \\mid y_{<t}, x)",
    "bullets": [
      {
        "text": "At each step, compare predicted distribution against the gold next token.",
        "icon": "token"
      },
      {
        "text": "Higher probability on correct token yields lower loss.",
        "icon": "token"
      },
      {
        "text": "Sentence loss is the sum (or mean) across time steps.",
        "icon": "formula"
      }
    ],
    "table": {
      "headers": [
        "Example p(correct token)",
        "Loss -log(p)",
        "Interpretation"
      ],
      "rows": [
        [
          "0.85",
          "0.16",
          "Good confident prediction"
        ],
        [
          "0.05",
          "3.00",
          "Poor uncertain/wrong prediction"
        ]
      ]
    },
    "speakerNote": "Use the table as your agenda — roughly one row per minute. Land: At each step, compare predicted distribution against the gold next token. · Higher probability on correct token yields lower loss.. Budget ~3 min. Quick check: ask one volunteer to paraphrase the first bullet.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention"
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
    "title": "BLEU Nuance: Modified Precision",
    "bullets": [
      {
        "text": "Raw overlap can over-reward repeated common words.",
        "icon": "metric"
      },
      {
        "text": "Modified BLEU caps token matches by reference token counts.",
        "icon": "token"
      },
      {
        "text": "This prevents unrealistic gains from repetition-heavy outputs.",
        "icon": "metric"
      }
    ],
    "note": "Example: candidate \"I I am I\" should not receive full credit for repeated \"I\".",
    "speakerNote": "Example: candidate \"I I am I\" should not receive full credit for repeated \"I\".",
    "titleIcon": "metric"
  },
  {
    "title": "Metric Caveat and Practical Evaluation",
    "bullets": [
      {
        "text": "High BLEU/ROUGE does not guarantee semantic correctness.",
        "icon": "metric"
      },
      {
        "text": "Use metric scores alongside human or task-specific qualitative checks.",
        "icon": "metric"
      },
      {
        "text": "Inspect adequacy, fluency, and faithfulness on representative examples.",
        "icon": "metric"
      }
    ],
    "note": "A syntactically broken sentence can still receive non-zero n-gram overlap scores.",
    "speakerNote": "A syntactically broken sentence can still receive non-zero n-gram overlap scores.",
    "titleIcon": "metric"
  },
  {
    "title": "Seq2Seq and NMT Summary",
    "bullets": [
      {
        "text": "Seq2Seq provides a general framework for sequence transduction.",
        "icon": "seq2seq"
      },
      {
        "text": "Cross-entropy trains token-level next-step predictions.",
        "icon": "train"
      },
      {
        "text": "Beam search improves sequence-level quality over greedy decoding.",
        "icon": "seq2seq"
      },
      {
        "text": "Attention resolves fixed-vector bottlenecks and improves translation performance.",
        "icon": "embedding"
      },
      {
        "text": "BLEU/ROUGE are useful but should be complemented with semantic evaluation.",
        "icon": "test"
      }
    ],
    "speakerNote": "Walk the on-screen bullets top to bottom. Land: Seq2Seq provides a general framework for sequence transduction. · Cross-entropy trains token-level next-step predictions.. Budget ~2 min. Pause for questions — if silent, pose a concrete scenario from the bullets.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention"
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
