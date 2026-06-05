/** Auto-split from presentationData — section12-nlp-seq2seq */
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
    "speakerNote": "Cover \"NLP Seq2Seq for Neural Machine Translation\". Emphasize: Seq2Seq maps variable-length input sequences to variable-length outputs.; then Encoder-decoder models were foundational for neural machine translation.. Pause for a quick check-in before moving on.",
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
    "conceptAnimation": "seq2seq-attention"
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
    "speakerNote": "Cover \"Training Seq2Seq with Cross-Entropy\". Emphasize: At each step, compare predicted distribution against the gold next token.; then Higher probability on correct token yields lower loss.. Pause for a quick check-in before moving on.",
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
    "speakerNote": "Cover \"Attention as the Bottleneck Solution\". Emphasize: Decoder attends to relevant encoder positions at each generation step.; then Dynamic alignment improves translation adequacy and fluency.. Pause for a quick check-in before moving on.",
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
    "speakerNote": "Present \"NMT Evaluation Metrics: BLEU and ROUGE\". Tie back to the section objective and invite one question before advancing.",
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
    "speakerNote": "Cover \"Seq2Seq and NMT Summary\". Emphasize: Seq2Seq provides a general framework for sequence transduction.; then Cross-entropy trains token-level next-step predictions.. Pause for a quick check-in before moving on.",
    "titleIcon": "seq2seq",
    "conceptAnimation": "seq2seq-attention"
  }
];
