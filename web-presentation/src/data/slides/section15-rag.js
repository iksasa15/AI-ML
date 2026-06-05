/** Section 15 — RAG (Retrieval-Augmented Generation) */
export const slides = [
  {
    title: "Why RAG?",
    subtitle: "Grounding LLMs in Your Data",
    bullets: [
      "LLMs alone lack private, up-to-date, or domain-specific knowledge.",
      "RAG retrieves relevant documents at query time and injects them into the prompt.",
      "Reduces hallucination risk and lets you cite sources in enterprise settings.",
    ],
    speakerNote:
      "Open with a failed pure-LLM answer on internal policy — then show the same question with retrieved docs.",
  },
  {
    title: "RAG Pipeline Overview",
    subtitle: "Index → Retrieve → Augment → Generate",
    bullets: [
      "Offline: chunk documents → embed → store in a vector index.",
      "Online: embed user query → retrieve top-k chunks → build augmented prompt.",
      "LLM generates answer conditioned on retrieved context.",
    ],
    note: "Think of RAG as search + synthesis, not search alone.",
    speakerNote: "Draw the four boxes on the board; emphasize offline vs online paths.",
  },
  {
    title: "Chunking Strategies",
    bullets: [
      "Fixed-size windows (e.g., 512 tokens) — simple but may split semantics.",
      "Semantic / paragraph chunks — better coherence, variable length.",
      "Overlap between chunks improves recall for boundary facts.",
    ],
    speakerNote: "Demo: same paragraph split badly vs well — show retrieval difference.",
  },
  {
    title: "Embeddings & Vector Stores",
    table: {
      headers: ["Component", "Role", "Examples"],
      rows: [
        ["Embedding model", "Maps text to dense vectors", "OpenAI, Cohere, sentence-transformers"],
        ["Vector DB", "Similarity search at scale", "FAISS, Pinecone, Chroma, pgvector"],
        ["Metadata", "Filter by tenant, date, ACL", "JSON fields on each chunk"],
      ],
    },
    speakerNote: "Stress metadata filters for multi-tenant enterprise deployments.",
  },
  {
    title: "Retrieval Quality",
    bullets: [
      "Recall@k: did the right chunk appear in top results?",
      "Hybrid search (BM25 + vectors) often beats either alone.",
      "Re-rankers can sharpen top results before the LLM sees them.",
    ],
    speakerNote: "Ask: what happens if the correct chunk ranks #11 with k=5?",
  },
  {
    title: "Prompt Construction for RAG",
    body: "A robust template states rules, lists sources, then asks the question.",
    bullets: [
      "Instruct the model to answer only from provided context.",
      "Include chunk boundaries and source IDs for traceability.",
      "Handle empty retrieval with a safe fallback message.",
    ],
    speakerNote: "Show a minimal prompt template trainees can copy.",
  },
  {
    title: "Faithfulness & Hallucination",
    bullets: [
      "Even with context, models may invent facts — evaluate faithfulness.",
      "Ask the model to quote supporting spans when possible.",
      "Human review for high-stakes domains (legal, medical, finance).",
    ],
    speakerNote: "Run a live example where the model ignores a contradicting chunk.",
  },
  {
    title: "RAG Evaluation Metrics",
    table: {
      headers: ["Metric", "What it measures"],
      rows: [
        ["Retrieval recall", "Correct chunk in top-k"],
        ["Answer relevance", "Response addresses the user question"],
        ["Faithfulness", "Claims supported by retrieved text"],
        ["Latency / cost", "End-to-end SLA and token usage"],
      ],
    },
    speakerNote: "Tie metrics to product SLAs, not just offline benchmarks.",
  },
  {
    title: "Common Failure Modes",
    bullets: [
      "Chunks too large — dilute relevance; too small — lose context.",
      "Stale index — documents updated but embeddings not refreshed.",
      "ACL leaks — retrieving chunks the user should not see.",
    ],
    speakerNote: "Security slide — pause for questions on access control.",
  },
  {
    title: "RAG vs Fine-Tuning",
    table: {
      headers: ["Approach", "Best when", "Tradeoff"],
      rows: [
        ["RAG", "Knowledge changes often; need citations", "Retrieval quality is critical"],
        ["Fine-tuning", "Style/format/domain phrasing", "Expensive refresh cycle"],
        ["Both", "Regulated domain + brand voice", "Higher ops complexity"],
      ],
    },
    speakerNote: "Most production systems start with RAG before fine-tuning.",
  },
  {
    title: "Mini Lab — RAG Walkthrough",
    bullets: [
      "Embed the user query and every document chunk.",
      "Retrieve the top chunk via similarity search.",
      "Inject retrieved text into the LLM prompt before generation.",
    ],
    speakerNote: "Walk the RAG loop conceptually; use a real embedding model in the hands-on lab.",
  },
  {
    title: "Production Checklist",
    bullets: [
      "Versioned ingestion pipeline with chunk + embed + index jobs.",
      "Observability: log queries, retrieved IDs, latency, user feedback.",
      "Governance: PII scrubbing, retention policy, and access-controlled indexes.",
    ],
    speakerNote: "Hand out checklist PDF or link — bridge to MLOps section next.",
  },
];
