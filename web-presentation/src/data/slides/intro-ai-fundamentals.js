/** Pre-Week 1 — AI fundamentals intro (before Section 1) */
export const slides = [
  {
    title: "Introduction to Artificial Intelligence",
    subtitle: "Pre-Week 1 · Foundations",
    body: "Before we dive into machine learning pipelines and models, we need a shared vocabulary: what AI is, how it differs from traditional software, why data matters, and what kinds of AI exist today versus in the future.",
    bullets: [
      { text: "This block sets context for Week 1 (Sections S1–S6).", icon: "idea" },
      { text: "All slides are in English — technical terms stay standard for industry use.", icon: "target" },
      { text: "Goal: understand the landscape before writing your first ML pipeline.", icon: "workflow" },
    ],
    speakerNote:
      "Welcome trainees to the AI fundamentals block. Set expectations: ~15 minutes, conceptual only — hands-on starts at Section 1. Ask: who has used ChatGPT or a spam filter? That is Narrow AI in daily life.",
    note: "Pacing: ~2 minutes. Transition from bootcamp timeline into conceptual foundations.",
    titleIcon: "idea",
  },
  {
    title: "What Is Artificial Intelligence?",
    subtitle: "A Simple, Comprehensive Definition",
    body: "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence — such as learning from experience, recognizing patterns, reasoning about information, understanding language, and making decisions under uncertainty.",
    bullets: [
      { text: "Learning: improve performance from data and feedback (e.g., recommendation engines).", icon: "train" },
      { text: "Reasoning: draw conclusions from incomplete or noisy information.", icon: "idea" },
      { text: "Perception: interpret images, speech, and sensor signals (e.g., face unlock).", icon: "target" },
      { text: "Language: understand and generate text or speech (e.g., voice assistants, chatbots).", icon: "nlp" },
      { text: "Everyday examples: spam filters, navigation apps, fraud detection, product suggestions.", icon: "check" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/AI_hierarchy.svg",
    imageAlt: "Hierarchy of AI, machine learning, and deep learning",
    speakerNote:
      "Read the definition once, then walk the four capability bullets. Land on everyday examples — trainees should recognize at least two. Clarify: AI is an umbrella term; ML and DL are subsets we will study in this bootcamp.",
    note: "Key phrase: tasks that typically require human intelligence.",
    titleIcon: "idea",
  },
  {
    title: 'How Does a Computer "Think"?',
    subtitle: "Traditional Programming vs. Artificial Intelligence",
    type: "three-columns",
    illustration: "ml-workflow",
    conceptAnimation: "neural-network",
    columns: [
      {
        heading: "Traditional Programming",
        bullets: [
          { text: "Developer writes explicit rules (if/else, formulas).", icon: "compare" },
          { text: "Logic is fixed before the program runs.", icon: "check" },
          { text: "Output is deterministic for the same input.", icon: "target" },
          { text: "Best when rules are known and stable.", icon: "workflow" },
        ],
      },
      {
        heading: "AI / Machine Learning",
        bullets: [
          { text: "System learns patterns from examples (data).", icon: "train" },
          { text: "Rules emerge from training — not hand-coded.", icon: "neural-net" },
          { text: "Output is probabilistic (confidence scores).", icon: "probability" },
          { text: "Best when rules are too complex to write manually.", icon: "model" },
        ],
      },
      {
        heading: "The Core Difference",
        bullets: [
          { text: "Traditional: Input + Rules → Output.", icon: "compare" },
          { text: "ML: Input + Output (labels) → Learned Rules (model).", icon: "data" },
          { text: "You teach the machine by showing examples.", icon: "train" },
          { text: "This bootcamp teaches you the ML path.", icon: "target" },
        ],
      },
    ],
    table: {
      title: "Side-by-side comparison",
      headers: ["Aspect", "Traditional Programming", "AI / ML"],
      rows: [
        ["Logic source", "Human-written code", "Learned from data"],
        ["Handling novelty", "Fails on unseen cases", "Generalizes (with limits)"],
        ["Maintenance", "Update rules manually", "Retrain with new data"],
        ["Example", "Tax calculator", "Email spam classifier"],
      ],
    },
    speakerNote:
      "Walk the three columns left to right. Use the tax calculator vs spam filter analogy. Emphasize the paradigm shift: in ML, data and labels replace hand-written rules. The neural-network animation shows learned connections — contrast with a fixed if/else tree.",
    note: "Spend ~3 minutes here — this is the mental model for the entire bootcamp.",
    titleIcon: "compare",
  },
  {
    title: "Data: The Real Fuel of AI",
    subtitle: "Why Data Quality Drives Every Model",
    body: "Data is not just an input — it is the engine of artificial intelligence. A model can only learn what its training data represents. Poor, biased, or mislabeled data produces unreliable systems regardless of algorithm choice.",
    bullets: [
      { text: "Quality beats quantity: clean, representative data outperforms massive noisy datasets.", icon: "data" },
      { text: "Labeled data: each example has a known answer (supervised learning — classification, regression).", icon: "check" },
      { text: "Unlabeled data: patterns discovered without explicit answers (clustering, representation learning).", icon: "clustering" },
      { text: "Features: measurable properties extracted from raw data (columns, pixels, words).", icon: "feature" },
      { text: "Garbage in, garbage out (GIGO): bad preprocessing → bad predictions.", icon: "warning" },
      { text: "Bridge to Section 1: we start with data cleaning, scaling, and train/test splits.", icon: "pipeline" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/DataSciencePipeline.png",
    imageAlt: "Data science pipeline from raw data to insights",
    illustration: "preprocessing-pipeline",
    speakerNote:
      "Stress GIGO with a concrete example: train on only one demographic → model fails on others. Connect to tomorrow's Section 1: preprocessing is not optional — it is where many projects succeed or fail. Ask: what data would you need to build a house-price predictor?",
    note: "Link forward: Section 1 covers the preprocessing pipeline in depth.",
    titleIcon: "data",
  },
  {
    title: "Narrow AI (ANI)",
    subtitle: "Artificial Narrow Intelligence — What Exists Today",
    body: "Narrow AI (also called Weak AI or ANI) is designed and trained for one specific task or domain. It can match or exceed human performance in that narrow scope but cannot transfer its skills to unrelated problems.",
    sections: [
      {
        heading: "What It Is",
        bullets: [
          { text: "Specialized systems optimized for a single purpose.", icon: "target" },
          { text: "No general reasoning or common-sense understanding.", icon: "compare" },
        ],
      },
      {
        heading: "Real-World Examples",
        bullets: [
          { text: "Chess engines (Deep Blue, Stockfish) — beat grandmasters at chess only.", icon: "check" },
          { text: "Face recognition on phones — identifies faces, not general vision.", icon: "target" },
          { text: "Spam filters — classify email, cannot write poetry.", icon: "classification" },
          { text: "ChatGPT — excels at language tasks, not physical robotics.", icon: "llm" },
        ],
      },
      {
        heading: "Limitations & Status",
        bullets: [
          { text: "Fails outside its training domain (no true understanding).", icon: "warning" },
          { text: "Status: everywhere today — this is what industry builds and deploys.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Deep_Blue.jpg",
    imageAlt: "Deep Blue chess computer — classic Narrow AI example",
    speakerNote:
      "ANI is the only type of AI that exists in production today. Every tool trainees use — Google Translate, Netflix recommendations, Siri — is Narrow AI. Clarify: ChatGPT feels general but is still narrow (text in, text out). Budget ~2 minutes.",
    note: "Emphasize: ANI = practical, deployable, industry-ready.",
    titleIcon: "target",
  },
  {
    title: "General AI (AGI)",
    subtitle: "Artificial General Intelligence — The Research Goal",
    body: "General AI (AGI) would match human-level cognitive ability across a wide range of tasks — learning, reasoning, and adapting to new domains without retraining from scratch, much like a person who can switch from medicine to music.",
    sections: [
      {
        heading: "What It Would Be",
        bullets: [
          { text: "Human-level versatility across diverse tasks and domains.", icon: "idea" },
          { text: "Transfer learning: skills from one area apply to unrelated areas.", icon: "train" },
          { text: "Common-sense reasoning and abstract problem solving.", icon: "compare" },
        ],
      },
      {
        heading: "Hypothetical Examples",
        bullets: [
          { text: "A single agent that diagnoses patients, writes code, and drives a car.", icon: "workflow" },
          { text: "Learns a new language from a few examples, like a child.", icon: "nlp" },
        ],
      },
      {
        heading: "Current Status",
        bullets: [
          { text: "Not achieved yet — active research at OpenAI, DeepMind, Anthropic, and academia.", icon: "warning" },
          { text: "Large language models show sparks of generality but lack robust reasoning.", icon: "llm" },
          { text: "Timeline estimates vary widely (years to decades).", icon: "metric" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Brain_neuron_growth.jpg",
    imageAlt: "Neural connections — conceptual metaphor for general intelligence",
    speakerNote:
      "AGI is aspirational — distinguish hype from reality. LLMs are impressive but still narrow (text-focused, hallucinate, no persistent memory). Do not alarm trainees; frame as a long-term research frontier. ~2 minutes.",
    note: "Status: research goal — not available as a product today.",
    titleIcon: "neural-net",
  },
  {
    title: "Super AI (ASI)",
    subtitle: "Artificial Super Intelligence — Beyond Human Capability",
    body: "Super AI (ASI) refers to hypothetical systems that surpass human intelligence in virtually every field — scientific creativity, social skills, wisdom, and problem-solving — and could improve themselves at an accelerating rate.",
    sections: [
      {
        heading: "What It Would Mean",
        bullets: [
          { text: "Outperforms the best humans in all cognitive tasks.", icon: "target" },
          { text: "Self-improvement loop: each upgrade makes the next upgrade faster.", icon: "workflow" },
          { text: "Unpredictable impact on science, economy, and society.", icon: "warning" },
        ],
      },
      {
        heading: "Why It Matters (Even If Theoretical)",
        bullets: [
          { text: "AI safety and alignment: ensuring AI goals match human values.", icon: "check" },
          { text: "Ethics frameworks guide today's Narrow AI deployment.", icon: "idea" },
          { text: "Responsible AI: bias, privacy, transparency, and accountability.", icon: "compare" },
        ],
      },
      {
        heading: "Bootcamp Focus",
        bullets: [
          { text: "ASI is science fiction today — but ethics applies to Narrow AI now.", icon: "warning" },
          { text: "This bootcamp builds practical Narrow AI: ML, DL, NLP, and GenAI.", icon: "deploy" },
        ],
      },
    ],
    table: {
      title: "Three types of AI — at a glance",
      headers: ["Type", "Abbrev.", "Scope", "Status"],
      rows: [
        ["Narrow AI", "ANI", "One specific task", "Exists today — industry standard"],
        ["General AI", "AGI", "Human-level, all domains", "Research goal — not yet achieved"],
        ["Super AI", "ASI", "Beyond human, all domains", "Theoretical — ethics still relevant"],
      ],
    },
    speakerNote:
      "Keep ASI brief and grounded — it is theoretical. Pivot to ethics: bias in hiring algorithms is a Narrow AI problem we must solve today. Close with the bootcamp bridge: we focus on ANI skills you can build and deploy. Transition: 'Next — Section 1: Foundations and Data Pre-Processing.'",
    note: "Closing slide — bridge to Section 1 (S1). Total block ~15 min.",
    titleIcon: "warning",
  },
];
