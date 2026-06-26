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
      "Keep ASI brief and grounded — it is theoretical. Pivot to ethics: bias in hiring algorithms is a Narrow AI problem we must solve today. Close with the bootcamp bridge: we focus on ANI skills you can build and deploy. Next: a detailed tour through AI history — from Turing to LLMs.",
    note: "Bridge to AI history block (~9 slides).",
    titleIcon: "warning",
  },
  {
    title: "History of Artificial Intelligence",
    subtitle: "From Ancient Ideas to Large Language Models",
    body: "AI did not appear overnight. Its story spans centuries of philosophy and mathematics, decades of boom-and-bust cycles, and a modern renaissance powered by data, GPUs, and deep learning. This timeline explains how we arrived at today's generative AI era.",
    table: {
      title: "AI history at a glance",
      headers: ["Era", "Period", "Key milestone"],
      rows: [
        ["Philosophical roots", "Pre-1950", "Logic, computation theory, Turing"],
        ["Birth of AI", "1956", "Dartmouth Conference — term coined"],
        ["First golden age", "1956–1960s", "Logic Theorist, ELIZA, optimism"],
        ["First AI winter", "1970s", "Funding cuts, unmet promises"],
        ["Expert systems", "1980s", "MYCIN, XCON, backpropagation"],
        ["Second AI winter", "Late 1980s", "Market collapse, symbolic AI limits"],
        ["Modern renaissance", "1990s–2012", "Deep Blue, big data, AlexNet"],
        ["Deep learning & GenAI", "2012–today", "YOLO, Transformers, LLMs"],
      ],
    },
    speakerNote:
      "Walk the timeline table top to bottom — ~2 minutes. Emphasize the boom-bust pattern: winters follow hype. Trainees should see that today's LLM excitement has historical parallels. Ask: which era do you think we are in now?",
    note: "History block opener — ~20–25 min total for the next 9 slides.",
    titleIcon: "workflow",
  },
  {
    title: "Philosophical & Mathematical Roots",
    subtitle: "Before Electronic Computers",
    body: "Long before the word 'Artificial Intelligence' existed, thinkers asked whether reasoning could be mechanized — laying the intellectual foundation for modern AI.",
    sections: [
      {
        heading: "17th–19th Century: Machines & Logic",
        bullets: [
          { text: "Gottfried Leibniz (1646–1716): dreamed of a universal calculus of reasoning.", icon: "idea" },
          { text: "Charles Babbage & Ada Lovelace: Analytical Engine — first programmable machine concept.", icon: "workflow" },
          { text: "George Boole (1847): Boolean algebra — logic as mathematics (AND, OR, NOT).", icon: "compare" },
        ],
      },
      {
        heading: "Early 20th Century: Formal Computation",
        bullets: [
          { text: "Kurt Gödel (1931): limits of formal systems — some truths are unprovable.", icon: "warning" },
          { text: "Alonzo Church & Alan Turing (1936): what can be computed in principle?", icon: "neural-net" },
          { text: "Turing Machine: abstract model of any computer — the blueprint for AI research.", icon: "model" },
        ],
      },
      {
        heading: "Why It Matters",
        bullets: [
          { text: "AI is not about robots — it starts with logic, math, and the limits of computation.", icon: "check" },
          { text: "Every ML model today runs on Turing-equivalent hardware.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Turing_machine.svg",
    imageAlt: "Turing machine — foundational model of computation",
    speakerNote:
      "Connect philosophy to engineering: Leibniz asked 'can we calculate truth?' — 300 years later, we train neural nets on data. Mention Ada Lovelace as the first programmer. Budget ~2–3 minutes.",
    note: "Pre-computer era — no electronic AI yet, only ideas and math.",
    titleIcon: "idea",
  },
  {
    title: "Birth of the Field (1956)",
    subtitle: "Dartmouth Conference & Alan Turing's Legacy",
    body: "Artificial Intelligence was officially born as a research discipline at the Dartmouth Summer Research Project on Artificial Intelligence (1956), organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon.",
    bullets: [
      { text: "John McCarthy coined the term 'Artificial Intelligence' at Dartmouth (1956).", icon: "idea" },
      { text: "Proposal: 'every aspect of learning or intelligence can in principle be precisely described and simulated by a machine.'", icon: "target" },
      { text: "Alan Turing (1912–1954): WWII code-breaker; asked 'Can machines think?' in his 1950 paper.", icon: "compare" },
      { text: "Turing Test: if a human cannot distinguish machine from human in conversation, the machine is intelligent.", icon: "check" },
      { text: "Turing's work on computation and the Turing Test remain touchstones for AI ethics and evaluation.", icon: "workflow" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/John_McCarthy_Stanford.jpg",
    imageAlt: "John McCarthy — coined the term Artificial Intelligence",
    speakerNote:
      "Dartmouth was optimistic: 10 researchers, 8 weeks, bold claims. Turing died in 1954 — two years before Dartmouth — but his 1950 paper and 1936 computation work framed the entire field. Show McCarthy photo. ~2–3 minutes.",
    note: "1956 = official birth year of AI as a field.",
    titleIcon: "idea",
  },
  {
    title: "The First Golden Age",
    subtitle: "High Expectations & Early Programs (1950s–1960s)",
    body: "The first decade after Dartmouth was marked by enormous enthusiasm. Researchers believed human-level AI was only 20 years away — a prediction that would prove premature.",
    bullets: [
      { text: "Logic Theorist (1956, Newell & Simon): first program to prove mathematical theorems — mimicked human problem-solving.", icon: "check" },
      { text: "General Problem Solver (1957): heuristic search for any well-defined problem.", icon: "workflow" },
      { text: "ELIZA (1966, Joseph Weizenbaum): chatbot simulating a Rogerian psychotherapist — fooled many users.", icon: "nlp" },
      { text: "Perceptron (1958, Rosenblatt): early neural network for pattern recognition — initial excitement.", icon: "neural-net" },
      { text: "Funding flowed from DARPA, NSF, and governments — AI was the 'next big thing.'", icon: "deploy" },
      { text: "Hubris: Minsky (1967) — 'Within a generation … the problem of creating AI will substantially be solved.'", icon: "warning" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/IBM7030Stretch.JPG",
    imageAlt: "IBM 7030 Stretch — mainframe era when early AI programs ran",
    speakerNote:
      "ELIZA is a great demo story — users attributed understanding where none existed (a lesson for ChatGPT today). Logic Theorist proved theorems in Principia Mathematica. Contrast the optimism with what came next: the first AI winter. ~2 minutes.",
    note: "Golden age = symbolic AI + early neural nets + massive optimism.",
    titleIcon: "target",
  },
  {
    title: "First AI Winter (1970s)",
    subtitle: "Broken Promises & Funding Collapse",
    body: "By the early 1970s, AI research had failed to deliver on its boldest promises. Governments and agencies cut funding sharply — the first 'AI winter' had arrived.",
    sections: [
      {
        heading: "What Went Wrong",
        bullets: [
          { text: "Combinatorial explosion: search spaces grew faster than computers could explore.", icon: "warning" },
          { text: "Brittle systems: symbolic programs failed on real-world noise and ambiguity.", icon: "compare" },
          { text: "Minsky & Papert (1969): Perceptron book showed single-layer nets cannot solve XOR — neural net funding dropped.", icon: "neural-net" },
        ],
      },
      {
        heading: "Key Events",
        bullets: [
          { text: "Lighthill Report (1973, UK): criticized AI research; led to major UK funding cuts.", icon: "metric" },
          { text: "DARPA reduced grants for undirected 'general AI' research in the mid-1970s.", icon: "deploy" },
          { text: "Speech recognition and machine translation projects underperformed expectations.", icon: "nlp" },
        ],
      },
      {
        heading: "Lesson for Today",
        bullets: [
          { text: "Hype cycles are real — capability must match promises.", icon: "idea" },
          { text: "Narrow, practical wins survive winters; grand claims do not.", icon: "check" },
        ],
      },
    ],
    table: {
      title: "First AI winter — causes vs. effects",
      headers: ["Cause", "Effect"],
      rows: [
        ["Overpromised timelines", "Loss of public and funder trust"],
        ["Limited compute (1970s hardware)", "Could not scale symbolic search"],
        ["Perceptron limitations exposed", "Neural network research stalled ~15 years"],
        ["No big data yet", "Statistical methods lacked fuel"],
      ],
    },
    speakerNote:
      "The Lighthill Report is the classic cautionary tale — read one quote if time allows. Connect to today: every AI hype wave risks a winter if products disappoint. XOR/perceptron story explains why neural nets went quiet until backprop in 1986. ~2–3 minutes.",
    note: "First winter ≈ 1974–1980 — funding drought, not end of research.",
    titleIcon: "warning",
  },
  {
    title: "Expert Systems Boom (1980s)",
    subtitle: "Rule-Based AI & the Neural Network Revival",
    type: "three-columns",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mycin.gif",
    imageAlt: "MYCIN expert system — rule-based medical diagnosis",
    columns: [
      {
        heading: "Expert Systems",
        bullets: [
          { text: "IF-THEN rule engines encoding human domain expertise.", icon: "compare" },
          { text: "MYCIN (1970s–80s): diagnosed blood infections — rivaled human experts.", icon: "check" },
          { text: "XCON (1980): configured DEC VAX computers — saved millions annually.", icon: "deploy" },
          { text: "Commercial boom: AI market reached ~$1B by mid-1980s.", icon: "metric" },
        ],
      },
      {
        heading: "Neural Networks Return",
        bullets: [
          { text: "Backpropagation popularized (Rumelhart, Hinton, Williams, 1986).", icon: "neural-net" },
          { text: "Multi-layer networks could learn non-linear patterns (including XOR).", icon: "train" },
          { text: "Parallel Distributed Processing (PDP) books reignited connectionist research.", icon: "idea" },
          { text: "Still limited by data and compute — not yet mainstream.", icon: "warning" },
        ],
      },
      {
        heading: "Global Context",
        bullets: [
          { text: "Japan Fifth Generation Computer Project (1982): $400M push for AI supercomputers.", icon: "workflow" },
          { text: "US and Europe responded with competing AI funding programs.", icon: "deploy" },
          { text: "AI returned to fashion — but fragility of expert systems would soon show.", icon: "compare" },
        ],
      },
    ],
    speakerNote:
      "Expert systems were the first AI commercial success — MYCIN and XCON are the canonical examples. Backpropagation is the algorithm still used to train deep nets today — mention Hinton's later Nobel (2024). Three columns ~3 minutes.",
    note: "1980s = commercial AI via rules + quiet neural net revival.",
    titleIcon: "compare",
  },
  {
    title: "Second AI Winter (Late 1980s)",
    subtitle: "Market Collapse & Hardware Limits",
    body: "The expert-system bubble burst in the late 1980s. Maintaining rule bases proved expensive, hardware could not keep pace with ambitions, and symbolic AI hit a ceiling — triggering a second funding and market pullback.",
    bullets: [
      { text: "Expert systems were costly to update — rules drifted as domains changed.", icon: "warning" },
      { text: "Desktop PCs replaced specialized Lisp machines — AI hardware startups failed.", icon: "compare" },
      { text: "Japan Fifth Generation project fell short of goals by the early 1990s.", icon: "deploy" },
      { text: "DARPA shifted funding toward specific applications, not general intelligence.", icon: "metric" },
      { text: "AI company valuations collapsed; 'AI' became a risky label in boardrooms.", icon: "warning" },
      { text: "Research continued quietly in universities — seeds for the next wave were planted.", icon: "idea" },
    ],
    table: {
      title: "Two AI winters compared",
      headers: ["", "First winter (1970s)", "Second winter (late 1980s)"],
      rows: [
        ["Trigger", "Lighthill Report, perceptron limits", "Expert system market crash"],
        ["Main victim", "General AI / neural nets", "Commercial AI / Lisp machines"],
        ["What survived", "Academic AI, expert systems niche", "Statistics, ML, backprop research"],
        ["Lesson", "Don't overpromise timelines", "Don't overpromise commercial ROI"],
      ],
    },
    speakerNote:
      "Second winter is less famous but equally important — it cleared hype and set the stage for statistical ML in the 1990s. Draw parallel: both winters followed commercial booms. Research never fully stopped. ~2 minutes.",
    note: "Late 1980s–early 1990s — AI rebranded as ML in many labs.",
    titleIcon: "warning",
  },
  {
    title: "Modern Renaissance (1990s–2012)",
    subtitle: "Deep Blue, Big Data & the Deep Learning Spark",
    body: "AI recovered not through grand symbolic promises but through statistics, data, and faster hardware — culminating in deep learning's breakthrough on ImageNet in 2012.",
    sections: [
      {
        heading: "Landmark Victories",
        bullets: [
          { text: "Deep Blue beats Garry Kasparov at chess (1997, IBM) — Narrow AI triumph.", icon: "target" },
          { text: "IBM Watson wins Jeopardy! (2011) — NLP + search at scale.", icon: "nlp" },
        ],
      },
      {
        heading: "Enablers of the Renaissance",
        bullets: [
          { text: "Internet era: massive datasets became available (web text, images, logs).", icon: "data" },
          { text: "GPUs: parallel matrix ops made neural net training 10–100× faster.", icon: "neural-net" },
          { text: "Statistical ML: SVMs, random forests, boosting dominated Kaggle and industry.", icon: "model" },
        ],
      },
      {
        heading: "The 2012 Turning Point",
        bullets: [
          { text: "ImageNet (2009, Fei-Fei Li): 14M labeled images — benchmark for vision.", icon: "data" },
          { text: "AlexNet (2012, Krizhevsky et al.): deep CNN crushed ImageNet — error rate halved.", icon: "cnn" },
          { text: "Deep learning era officially began — industry pivoted en masse.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Deep_Blue.jpg",
    imageAlt: "Deep Blue chess computer — 1997 Narrow AI milestone",
    illustration: "ml-workflow",
    speakerNote:
      "Deep Blue is Narrow AI — brilliant at chess, useless for anything else. The real shift was data + GPU + ImageNet + AlexNet in 2012. Mention this bootcamp covers the stack that started here: CNNs (S7), NLP (S8–S13), GenAI (S14+). ~3 minutes.",
    note: "1997 Deep Blue → 2012 AlexNet = path from symbolic wins to deep learning.",
    titleIcon: "data",
  },
  {
    title: "Deep Learning & Generative AI Era",
    subtitle: "From YOLO to Large Language Models (2012–Today)",
    body: "Since 2012, AI has advanced at unprecedented speed — from real-time object detection to transformers and chatbots used by hundreds of millions. This is the era this bootcamp prepares you to build in.",
    sections: [
      {
        heading: "Computer Vision & Scale",
        bullets: [
          { text: "YOLO (2016): real-time object detection — AI in cameras, drones, autonomous vehicles.", icon: "cnn" },
          { text: "ResNet, EfficientNet: ever-deeper and more efficient image classifiers.", icon: "neural-net" },
          { text: "AlphaGo (2016): deep RL beats world Go champion — beyond explicit search.", icon: "target" },
        ],
      },
      {
        heading: "Language & Generative AI",
        bullets: [
          { text: "Transformers (2017, 'Attention Is All You Need'): parallel sequence modeling.", icon: "transformer" },
          { text: "BERT (2018), GPT-2/3 (2019–2020): pre-trained language models at scale.", icon: "bert" },
          { text: "ChatGPT (2022): 100M users in 2 months — GenAI enters mainstream.", icon: "llm" },
          { text: "GPT-4, Claude, Gemini, multimodal models (2023–2025): text, image, code, voice.", icon: "llm" },
        ],
      },
      {
        heading: "Bootcamp Bridge",
        bullets: [
          { text: "You will learn the stack behind this era: ML → DL → NLP → GenAI → RAG → MLOps.", icon: "workflow" },
          { text: "History teaches patience: winters follow hype — solid skills outlast trends.", icon: "check" },
          { text: "Next: AI domains and branches — how the field splits into specializations.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Transformer%2C_full_architecture.png/640px-Transformer%2C_full_architecture.png",
    imageAlt: "Transformer architecture — foundation of modern LLMs",
    conceptAnimation: "neural-network",
    speakerNote:
      "This is the era trainees live in. YOLO = vision in production; Transformers = everything in NLP/GenAI. ChatGPT moment = third 'golden age' — but remember the winters. Next: map the major AI domains before we start building. ~3 minutes.",
    note: "Bridge to AI domains block (~7 slides).",
    titleIcon: "llm",
  },
  {
    title: "AI Domains & Branches",
    subtitle: "How the Field Splits into Specializations",
    body: "Artificial Intelligence is not one monolithic technology — it is a family of approaches and application areas. Understanding the map helps you choose the right tools and see where this bootcamp fits.",
    table: {
      title: "AI domains and bootcamp coverage",
      headers: ["Domain", "Focus", "Bootcamp sections"],
      rows: [
        ["Machine Learning", "Patterns & algorithms from data", "S1–S6"],
        ["Deep Learning", "Neural networks at scale", "S7"],
        ["NLP", "Human language understanding & generation", "S8–S13"],
        ["Generative AI / RAG / MLOps", "LLMs, retrieval, production systems", "S14–S16"],
        ["Computer Vision", "Images, video, visual security", "S7 (CNN)"],
        ["Robotics & Autonomous Systems", "Perception + planning + control", "Cross-cutting (CV + ML)"],
        ["Expert Systems", "Rule-based decision making", "Historical context (intro)"],
      ],
    },
    bullets: [
      { text: "Deep Learning is a subset of Machine Learning; NLP and Vision often use DL today.", icon: "compare" },
      { text: "Most modern products combine multiple domains (e.g., self-driving = CV + ML + robotics).", icon: "workflow" },
    ],
    speakerNote:
      "Walk the table row by row — ~2 minutes. Emphasize nesting: DL ⊂ ML, and GenAI is largely NLP + DL. Point trainees to their bootcamp path in the right column. Ask which domain excites them most.",
    note: "Domains block opener — taxonomy before deep dives.",
    titleIcon: "workflow",
  },
  {
    title: "Machine Learning",
    subtitle: "Patterns, Algorithms & Data-Driven Decisions",
    body: "Machine Learning (ML) enables computers to learn patterns from data without being explicitly programmed for every scenario. It is the foundation of modern AI and the starting point of this bootcamp.",
    sections: [
      {
        heading: "Core Idea",
        bullets: [
          { text: "Learn a mapping from inputs (features) to outputs (labels or clusters).", icon: "model" },
          { text: "Generalize from training examples to unseen data.", icon: "train" },
          { text: "Evaluate with held-out test sets and proper metrics.", icon: "metric" },
        ],
      },
      {
        heading: "Learning Types",
        bullets: [
          { text: "Supervised: labeled data — classification & regression.", icon: "classification" },
          { text: "Unsupervised: no labels — clustering, dimensionality reduction.", icon: "clustering" },
          { text: "Reinforcement: reward signals — game playing, robotics control.", icon: "target" },
        ],
      },
      {
        heading: "Algorithms & Bootcamp",
        bullets: [
          { text: "Linear & logistic regression, decision trees, SVM, k-means, PCA.", icon: "tree" },
          { text: "This bootcamp: Sections S1–S6 — preprocessing through classical ML.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Machine_learning_workflow_diagram.png",
    imageAlt: "Machine learning workflow — data to model to prediction",
    illustration: "ml-workflow",
    speakerNote:
      "ML is the workhorse — most business AI is classical ML, not deep learning. Walk supervised vs unsupervised with one example each (spam filter vs customer segments). S1–S6 is where we build this muscle. ~2–3 minutes.",
    note: "ML = patterns and algorithms — bootcamp Weeks/Days 1 focus.",
    titleIcon: "model",
  },
  {
    title: "Deep Learning",
    subtitle: "Simulating Neural Networks Inspired by the Brain",
    body: "Deep Learning (DL) uses multi-layer artificial neural networks to learn hierarchical representations — from edges in images to words in sentences. It powers the breakthroughs of the 2012–today era.",
    sections: [
      {
        heading: "How It Works",
        bullets: [
          { text: "Artificial neurons: weighted inputs → activation → layered composition.", icon: "neural-net" },
          { text: "Backpropagation adjusts weights to minimize prediction error.", icon: "backprop" },
          { text: "Deep = many layers extract features automatically (no hand-crafted rules).", icon: "workflow" },
        ],
      },
      {
        heading: "Key Architectures",
        bullets: [
          { text: "CNNs: spatial patterns in images and video.", icon: "cnn" },
          { text: "RNNs / LSTMs: sequential data (text, time series).", icon: "rnn" },
          { text: "Transformers: parallel attention — foundation of GPT and BERT.", icon: "transformer" },
        ],
      },
      {
        heading: "Requirements & Bootcamp",
        bullets: [
          { text: "Needs large datasets, GPUs, and careful regularization.", icon: "data" },
          { text: "This bootcamp: Section S7 — 7 labs from MLP to CNN and RNN.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/640px-Colored_neural_network.svg.png",
    imageAlt: "Artificial neural network — layers of interconnected nodes",
    conceptAnimation: "neural-network",
    speakerNote:
      "DL is ML with deep nets — not magic, just scalable function approximation. Show the animation: layers learn hierarchy. Mention compute cost honestly. S7 is the deep dive with hands-on TensorFlow/Keras labs. ~2–3 minutes.",
    note: "DL ⊂ ML — neural networks with many layers.",
    titleIcon: "neural-net",
  },
  {
    title: "Natural Language Processing (NLP)",
    subtitle: "How Machines Understand Human Language",
    body: "NLP teaches computers to read, interpret, and generate human language — from tokenizing raw text to building chatbots and machine translation systems.",
    sections: [
      {
        heading: "Core Tasks",
        bullets: [
          { text: "Text cleaning & tokenization: raw text → structured units.", icon: "token" },
          { text: "Understanding: POS tagging, NER, sentiment analysis.", icon: "nlp" },
          { text: "Generation: summarization, translation, conversational AI.", icon: "llm" },
        ],
      },
      {
        heading: "Evolution",
        bullets: [
          { text: "Classical: bag-of-words, n-grams, TF-IDF.", icon: "compare" },
          { text: "Neural: word embeddings (Word2Vec), RNNs, attention.", icon: "embedding" },
          { text: "Modern: pre-trained Transformers (BERT, GPT) — transfer learning for NLP.", icon: "transformer" },
        ],
      },
      {
        heading: "Applications & Bootcamp",
        bullets: [
          { text: "Chatbots, search, spam detection, document classification, code assistants.", icon: "target" },
          { text: "This bootcamp: Sections S8–S13 — cleaning through Seq2Seq and attention.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Natural_language_processing_concept.svg/640px-Natural_language_processing_concept.svg.png",
    imageAlt: "NLP concept — text processing pipeline",
    illustration: "nlp-pipeline",
    speakerNote:
      "NLP is where GenAI lives — but foundations matter (tokenization, embeddings). Demo mentally: 'Apple' the fruit vs company needs context. S8–S13 is the longest NLP arc in the bootcamp. ~2–3 minutes.",
    note: "NLP — language understanding and generation.",
    titleIcon: "nlp",
  },
  {
    title: "Computer Vision",
    subtitle: "Analyzing Images, Video & Visual Security Systems",
    body: "Computer Vision (CV) enables machines to interpret visual data — photographs, video streams, medical scans, and surveillance feeds — extracting meaning from pixels.",
    bullets: [
      { text: "Image classification: what object is in this image? (ResNet, EfficientNet).", icon: "cnn" },
      { text: "Object detection: where are objects and what are they? (YOLO, Faster R-CNN).", icon: "target" },
      { text: "Segmentation: pixel-level boundaries for medical imaging and autonomous driving.", icon: "compare" },
      { text: "Face recognition & biometrics: security systems, phone unlock, access control.", icon: "check" },
      { text: "Video analytics: motion detection, crowd monitoring, anomaly alerts in CCTV.", icon: "workflow" },
      { text: "Powered by CNNs and increasingly Vision Transformers (ViT).", icon: "neural-net" },
      { text: "Bootcamp touchpoint: CNN labs and architectures in Section S7.", icon: "deploy" },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Object_detection_in_cluttered_environments.jpg/640px-Object_detection_in_cluttered_environments.jpg",
    imageAlt: "Object detection — bounding boxes on detected objects in a scene",
    speakerNote:
      "CV is everywhere: phones, cars, hospitals, security cameras. YOLO made real-time detection practical. Security/surveillance is a sensitive application — mention ethics and privacy. CNN content is in S7. ~2 minutes.",
    note: "CV — images, video, and visual security analytics.",
    titleIcon: "cnn",
  },
  {
    title: "Robotics & Autonomous Systems",
    subtitle: "AI That Moves and Acts in the Physical World",
    body: "Robotics combines AI with mechanical systems — sensors, actuators, and real-time control — to create machines that perceive, decide, and act autonomously in dynamic environments.",
    sections: [
      {
        heading: "Core Components",
        bullets: [
          { text: "Perception: cameras, LiDAR, radar → CV + sensor fusion.", icon: "cnn" },
          { text: "Planning: path finding, obstacle avoidance, task scheduling.", icon: "workflow" },
          { text: "Control: motor commands executed in milliseconds.", icon: "target" },
        ],
      },
      {
        heading: "Applications",
        bullets: [
          { text: "Self-driving cars: detect lanes, pedestrians, signs — decide in real time.", icon: "deploy" },
          { text: "Drones: aerial mapping, delivery, inspection.", icon: "target" },
          { text: "Warehouse robots (Amazon, logistics): pick, pack, navigate shelves.", icon: "workflow" },
          { text: "Surgical & industrial robots: precision tasks alongside humans.", icon: "check" },
        ],
      },
      {
        heading: "AI Domains Combined",
        bullets: [
          { text: "Robotics = CV + ML/DL + reinforcement learning + embedded systems.", icon: "compare" },
          { text: "Bootcamp: cross-cutting skills from S1–S7 prepare you for robotics foundations.", icon: "idea" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Vegas_Robot_by_Wirebeard.jpg/640px-Vegas_Robot_by_Wirebeard.jpg",
    imageAlt: "Humanoid robot — AI embodied in physical systems",
    speakerNote:
      "Robotics is where AI meets physics — latency and safety matter more than benchmark scores. Self-driving is the headline example but warehouse bots are deployed at scale today. No dedicated robotics section, but S7 CNN + S1 ML feed into this domain. ~2 minutes.",
    note: "Robotics — perception, planning, and autonomous action.",
    titleIcon: "workflow",
  },
  {
    title: "Expert Systems & Decision Making",
    subtitle: "Rule-Based AI and Modern Alternatives",
    body: "Expert Systems encode human domain knowledge as explicit IF-THEN rules — one of the first commercial AI successes. Understanding them clarifies why statistical ML and deep learning eventually superseded pure rule-based approaches.",
    sections: [
      {
        heading: "How Expert Systems Work",
        bullets: [
          { text: "Knowledge base: facts and rules written by domain experts.", icon: "compare" },
          { text: "Inference engine: applies rules to reach conclusions.", icon: "workflow" },
          { text: "Examples: MYCIN (medical diagnosis), XCON (computer configuration).", icon: "check" },
        ],
      },
      {
        heading: "Strengths & Limits",
        bullets: [
          { text: "Strengths: interpretable, auditable, no training data required.", icon: "idea" },
          { text: "Limits: brittle, expensive to maintain, cannot learn from data.", icon: "warning" },
          { text: "1980s boom → late-1980s collapse (see AI history slides).", icon: "metric" },
        ],
      },
      {
        heading: "Today & Bootcamp",
        bullets: [
          { text: "Modern systems blend rules + ML (hybrid AI in finance, healthcare).", icon: "deploy" },
          { text: "Decision trees in S4 bridge symbolic and statistical approaches.", icon: "tree" },
          { text: "Next: Generative AI and modern applications — the current frontier.", icon: "llm" },
        ],
      },
    ],
    table: {
      title: "Expert systems vs. machine learning",
      headers: ["Aspect", "Expert Systems", "Machine Learning"],
      rows: [
        ["Knowledge source", "Human-written rules", "Learned from data"],
        ["Maintenance", "Manual rule updates", "Retrain on new data"],
        ["Interpretability", "High (explicit rules)", "Varies (trees high, DL low)"],
        ["Best for", "Stable, well-defined domains", "Noisy, high-dimensional data"],
      ],
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mycin.gif",
    imageAlt: "MYCIN expert system — early rule-based medical AI",
    speakerNote:
      "Connect back to the 1980s history slide — expert systems were the first AI gold rush in industry. Today ML dominates, but rules still matter (compliance, safety). Next: Generative AI — how the field looks today in products trainees actually use. ~2–3 minutes.",
    note: "Bridge to Generative AI & modern applications block (~5 slides).",
    titleIcon: "compare",
  },
  {
    title: "Generative AI & Modern Applications",
    subtitle: "From Prediction to Creation",
    body: "Generative AI (GenAI) marks a shift from AI that classifies and predicts to AI that creates — text, images, code, audio, and video. These four slides map the revolution, the technology, industry use cases, and everyday productivity tools.",
    table: {
      title: "GenAI block roadmap",
      headers: ["Topic", "Focus", "Bootcamp link"],
      rows: [
        ["Generative AI revolution", "Why creation changes everything", "S14 — GenAI"],
        ["Large Language Models", "Conversation & context", "S8–S14 — NLP → GenAI"],
        ["Industry applications", "Business, medicine, public security", "S15 — RAG, S16 — MLOps"],
        ["Productivity tools", "Text, image, code generation", "Hands-on throughout bootcamp"],
      ],
    },
    speakerNote:
      "Set expectations for the final intro block — ~10 minutes. GenAI is what brought AI to mainstream attention in 2022–2023. This block connects intro concepts to sections S14–S16. ~1–2 minutes.",
    note: "GenAI block opener — after domains, before Section 1.",
    titleIcon: "llm",
  },
  {
    title: "The Generative AI Revolution",
    subtitle: "Why Creation Changes Everything",
    body: "Traditional AI answers 'What is this?' or 'What will happen?' Generative AI answers 'Create something new that matches this intent' — drafts, designs, code, and synthetic data on demand.",
    sections: [
      {
        heading: "Discriminative vs. Generative",
        bullets: [
          { text: "Discriminative: classify spam vs. ham, predict house prices.", icon: "classification" },
          { text: "Generative: write emails, compose images, synthesize speech.", icon: "llm" },
          { text: "GenAI learns data distributions — then samples new outputs.", icon: "probability" },
        ],
      },
      {
        heading: "Key Breakthroughs",
        bullets: [
          { text: "Transformers (2017): scalable sequence modeling at web scale.", icon: "transformer" },
          { text: "Diffusion models: high-quality image generation (DALL·E, Stable Diffusion, Midjourney).", icon: "cnn" },
          { text: "ChatGPT (2022): conversational interface made GenAI accessible to everyone.", icon: "llm" },
        ],
      },
      {
        heading: "Why It Matters Now",
        bullets: [
          { text: "Lower barrier: natural language replaces complex ML pipelines for many tasks.", icon: "workflow" },
          { text: "Risks: hallucinations, bias, copyright, deepfakes — need guardrails.", icon: "warning" },
          { text: "Bootcamp: Section S14 covers BERT, GPT, attention, and LLM fundamentals.", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/640px-ChatGPT_logo.svg.png",
    imageAlt: "ChatGPT — generative AI entered mainstream use",
    illustration: "transformer-block",
    speakerNote:
      "Contrast spam filter (discriminative) with ChatGPT drafting an email (generative). Mention diffusion briefly for images. Ethics: deepfakes in public security context preview. S14 is the deep dive. ~2–3 minutes.",
    note: "GenAI revolution — prediction → creation paradigm shift.",
    titleIcon: "llm",
  },
  {
    title: "Large Language Models (LLMs)",
    subtitle: "Machine Conversation & Context Understanding",
    body: "Large Language Models are neural networks trained on vast text corpora to predict the next token — enabling fluent conversation, reasoning over context, and task completion from natural-language prompts.",
    sections: [
      {
        heading: "How LLMs Work",
        bullets: [
          { text: "Pre-training: learn language patterns from billions of web pages, books, code.", icon: "train" },
          { text: "Self-attention: weigh every word against every other — capture long-range context.", icon: "attention" },
          { text: "Fine-tuning & RLHF: align outputs with human preferences (helpful, harmless, honest).", icon: "check" },
        ],
      },
      {
        heading: "Context & Conversation",
        bullets: [
          { text: "Context window: how much prior text the model 'remembers' in one session.", icon: "token" },
          { text: "Multi-turn dialogue: model tracks conversation history for coherent replies.", icon: "nlp" },
          { text: "Prompt engineering: instructions, examples, and role-setting steer behavior.", icon: "idea" },
        ],
      },
      {
        heading: "Examples & Bootcamp",
        bullets: [
          { text: "GPT-4, Claude, Gemini, Llama — general-purpose assistants and APIs.", icon: "llm" },
          { text: "Bootcamp path: S8–S13 (NLP foundations) → S14 (BERT, GPT, attention) → S15 (RAG).", icon: "deploy" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Transformer%2C_full_architecture.png/640px-Transformer%2C_full_architecture.png",
    imageAlt: "Transformer architecture — backbone of modern LLMs",
    conceptAnimation: "attention-heatmap",
    speakerNote:
      "LLMs do not 'understand' like humans — they predict likely next tokens, which mimics understanding. Demo concept: context window limits mean long documents need RAG (S15). Attention animation shows how context is weighted. ~2–3 minutes.",
    note: "LLMs — conversation, context windows, and prompt steering.",
    titleIcon: "bert",
  },
  {
    title: "Industry Applications",
    subtitle: "Business, Medicine & Public Security",
    body: "Generative AI is moving from demos to production across high-impact sectors — with distinct opportunities and governance requirements in each.",
    sections: [
      {
        heading: "Business & Enterprise",
        bullets: [
          { text: "Customer support: AI agents resolve tickets, draft responses, summarize calls.", icon: "workflow" },
          { text: "Marketing: personalized content, A/B copy variants, market research synthesis.", icon: "target" },
          { text: "Finance: report generation, fraud narrative analysis, compliance document review.", icon: "metric" },
          { text: "RAG over company docs: grounded answers from internal knowledge bases (S15).", icon: "rag" },
        ],
      },
      {
        heading: "Medicine & Healthcare",
        bullets: [
          { text: "Clinical documentation: draft notes from doctor-patient conversations.", icon: "check" },
          { text: "Literature review: summarize research papers and trial results.", icon: "nlp" },
          { text: "Medical imaging assist: report generation from radiology scans (human-in-the-loop).", icon: "cnn" },
          { text: "Critical: HIPAA/privacy, validation, never replace clinician judgment.", icon: "warning" },
        ],
      },
      {
        heading: "Public Security & Safety",
        bullets: [
          { text: "Intelligence analysis: summarize large document sets, translate multilingual sources.", icon: "compare" },
          { text: "Threat detection: pattern recognition in communications and surveillance metadata.", icon: "target" },
          { text: "Deepfake detection: counter AI-generated misinformation and synthetic media.", icon: "warning" },
          { text: "Ethics: bias, civil liberties, audit trails — MLOps monitoring essential (S16).", icon: "monitoring" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hospital.svg/640px-Hospital.svg.png",
    imageAlt: "Healthcare — high-stakes GenAI application domain",
    illustration: "rag-architecture",
    speakerNote:
      "Walk three columns of use cases — emphasize governance in medicine and public security. Business RAG is the most common enterprise pattern today. Deepfakes link back to CV and ethics from ASI slide. S15 RAG + S16 MLOps are production skills. ~3 minutes.",
    note: "Industry applications — opportunities and governance in each sector.",
    titleIcon: "deploy",
  },
  {
    title: "Daily Productivity Tools",
    subtitle: "Text, Image & Code Generation for Everyone",
    body: "GenAI is already embedded in everyday workflows — not just research labs. Knowing these tools helps trainees use AI responsibly while building their own systems in the bootcamp.",
    sections: [
      {
        heading: "Text Generation",
        bullets: [
          { text: "ChatGPT, Claude, Gemini: drafting, summarizing, translating, brainstorming.", icon: "llm" },
          { text: "Copilot in Word/Outlook: inline writing assistance in familiar apps.", icon: "workflow" },
          { text: "Notion AI, Grammarly: notes, editing, and tone adjustment.", icon: "nlp" },
        ],
      },
      {
        heading: "Image Generation",
        bullets: [
          { text: "DALL·E, Midjourney, Stable Diffusion: marketing visuals, prototypes, storyboards.", icon: "cnn" },
          { text: "Canva AI, Adobe Firefly: design workflows for non-designers.", icon: "target" },
          { text: "Use with care: copyright, consent, and disclosure of AI-generated content.", icon: "warning" },
        ],
      },
      {
        heading: "Code Generation",
        bullets: [
          { text: "GitHub Copilot, Cursor, Codeium: autocomplete, refactor, explain code.", icon: "deploy" },
          { text: "ChatGPT/Claude for debugging, unit tests, and documentation.", icon: "check" },
          { text: "Next: ethics, the future of work, and your learning roadmap.", icon: "idea" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/640px-Octicons-mark-github.svg.png",
    imageAlt: "GitHub — home of Copilot and open-source AI coding tools",
    speakerNote:
      "Make it practical — trainees likely use 2–3 of these already. Code assistants accelerate learning but require review (models hallucinate APIs). Next: responsible AI, careers, and how to grow after this bootcamp. ~2–3 minutes.",
    note: "Bridge to Ethics & Future block (~4 slides).",
    titleIcon: "llm",
  },
  {
    title: "Ethics & the Future",
    subtitle: "Responsible AI, Careers & Your Learning Path",
    body: "Building and deploying AI carries social responsibility. These final intro slides cover ethical risks, the evolving job market, and a practical roadmap for developing your skills — before we start hands-on work in Section 1.",
    table: {
      title: "Closing intro topics",
      headers: ["Topic", "Focus"],
      rows: [
        ["AI ethics", "Bias, privacy, deepfakes"],
        ["Future of jobs", "Human + machine collaboration"],
        ["Learning roadmap", "Start, practice, and grow in AI/ML"],
      ],
    },
    speakerNote:
      "Frame this as the responsible closing of the intro — not fear, but awareness. ~1 minute, then dive into ethics.",
    note: "Ethics & Future block opener.",
    titleIcon: "warning",
  },
  {
    title: "AI Ethics",
    subtitle: "Bias, Privacy & Deepfakes",
    body: "As AI systems influence hiring, healthcare, law enforcement, and public discourse, ethical design is not optional — it is a core engineering requirement.",
    sections: [
      {
        heading: "Bias & Fairness",
        bullets: [
          { text: "Training data reflects historical bias → models can discriminate by race, gender, age.", icon: "warning" },
          { text: "Examples: biased hiring filters, unequal loan approvals, skewed facial recognition.", icon: "compare" },
          { text: "Mitigation: diverse datasets, fairness metrics, human review, audit trails.", icon: "check" },
        ],
      },
      {
        heading: "Privacy",
        bullets: [
          { text: "Models memorize sensitive training data — risk of leakage in outputs.", icon: "warning" },
          { text: "Regulations: GDPR (EU), HIPAA (health), sector-specific data governance.", icon: "compare" },
          { text: "Best practices: anonymization, consent, data minimization, secure pipelines (S1, S16).", icon: "deploy" },
        ],
      },
      {
        heading: "Deepfakes & Misinformation",
        bullets: [
          { text: "Synthetic video/audio/text indistinguishable from real — fraud, political manipulation.", icon: "warning" },
          { text: "Detection tools emerging; watermarking and provenance standards in progress.", icon: "check" },
          { text: "Always disclose AI-generated content; verify before sharing.", icon: "idea" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Deepfake_face_comparison.png/640px-Deepfake_face_comparison.png",
    imageAlt: "Deepfake face comparison — real vs. synthetic media",
    illustration: "confusion-matrix",
    speakerNote:
      "Use one concrete bias example (Amazon hiring tool scrapped). Privacy: never put patient data in public ChatGPT. Deepfakes link to public security slide. Fairness metrics appear in S4 classification. ~3 minutes.",
    note: "AI ethics — bias, privacy, and synthetic media risks.",
    titleIcon: "warning",
  },
  {
    title: "The Future of Jobs",
    subtitle: "Human–Machine Integration & the New Labor Market",
    body: "AI will transform work — not by replacing every job overnight, but by reshaping tasks, roles, and the skills that matter most in a human–machine partnership.",
    sections: [
      {
        heading: "What Changes",
        bullets: [
          { text: "Automation of repetitive tasks: data entry, basic reporting, first-draft content.", icon: "workflow" },
          { text: "Augmentation: AI assists professionals — doctors, lawyers, engineers, analysts.", icon: "deploy" },
          { text: "New roles: ML engineer, prompt engineer, AI ethicist, MLOps specialist, data curator.", icon: "target" },
        ],
      },
      {
        heading: "Human + Machine Model",
        bullets: [
          { text: "Humans: judgment, empathy, creativity, accountability, domain expertise.", icon: "idea" },
          { text: "Machines: speed, scale, pattern detection, 24/7 availability.", icon: "neural-net" },
          { text: "Best outcomes: human-in-the-loop — AI proposes, human approves.", icon: "check" },
        ],
      },
      {
        heading: "Skills That Grow in Value",
        bullets: [
          { text: "Critical thinking, communication, and interdisciplinary problem-solving.", icon: "compare" },
          { text: "Technical: Python, ML pipelines, data literacy — exactly what this bootcamp builds.", icon: "model" },
          { text: "Adaptability: AI tools evolve fast — learn how to learn.", icon: "train" },
        ],
      },
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Human_robot_interaction.jpg/640px-Human_robot_interaction.jpg",
    imageAlt: "Human–robot collaboration — augmented workforce",
    illustration: "mlops-loop",
    speakerNote:
      "Avoid doom or hype — balanced view. Many jobs will change, not vanish. This bootcamp targets the 'AI-augmented professional' who builds and uses systems, not only consumes ChatGPT. Ask: which tasks in your target role could AI assist? ~2–3 minutes.",
    note: "Future of work — augmentation over replacement.",
    titleIcon: "workflow",
  },
  {
    title: "Your Learning Roadmap",
    subtitle: "How to Start & Grow Your AI/ML Skills",
    body: "This bootcamp is your launchpad — not your finish line. A structured path after these five days keeps momentum and builds a portfolio that employers recognize.",
    sections: [
      {
        heading: "Phase 1 — During Bootcamp (Now)",
        bullets: [
          { text: "Follow the daily arc: S1–S6 (ML) → S7 (DL) → S8–S13 (NLP) → S14–S16 (GenAI, RAG, MLOps).", icon: "workflow" },
          { text: "Run every lab notebook — modify hyperparameters, break things, fix them.", icon: "train" },
          { text: "Take notes on concepts you cannot explain — revisit after each section.", icon: "idea" },
        ],
      },
      {
        heading: "Phase 2 — First 3 Months After",
        bullets: [
          { text: "Build 2–3 portfolio projects: classification, NLP, or a small RAG app.", icon: "deploy" },
          { text: "Practice on Kaggle competitions and open datasets.", icon: "target" },
          { text: "Read papers: start with distill.pub and Hugging Face blog posts.", icon: "nlp" },
          { text: "Contribute to open source: scikit-learn docs, Hugging Face models.", icon: "check" },
        ],
      },
      {
        heading: "Phase 3 — Long-Term Growth",
        bullets: [
          { text: "Specialize: vision, NLP, RL, or MLOps based on interest and job market.", icon: "compare" },
          { text: "Stay current: follow arXiv summaries, AI newsletters, and vendor docs.", icon: "llm" },
          { text: "Network: local meetups, GitHub, LinkedIn — share what you build.", icon: "workflow" },
        ],
      },
    ],
    table: {
      title: "Bootcamp → career milestones",
      headers: ["Milestone", "Target"],
      rows: [
        ["Week 1 (bootcamp)", "Complete S1–S16 + core labs"],
        ["Month 1", "1 end-to-end ML project on GitHub"],
        ["Month 3", "NLP or DL project + Kaggle entry"],
        ["Month 6–12", "Specialization + internship or junior role"],
      ],
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Vectorial_map_of_the_learning_path_for_a_data_scientist.png/640px-Vectorial_map_of_the_learning_path_for_a_data_scientist.png",
    imageAlt: "Learning path map for data science and AI careers",
    speakerNote:
      "Point to the table — realistic timeline. Bootcamp gives breadth; depth comes from projects. Mention ai-learning-roadmap-12months.md in repo for extended plan. Close the entire intro: 'You are ready. Section 1 — Foundations and Data Pre-Processing starts now.' ~3 minutes.",
    note: "Final intro slide — bridge to Section 1 (S1). Total intro ~70–75 min.",
    titleIcon: "target",
  },
];
