const SECTIONS = [
  {
    id: "01",
    title: "Program Information",
    rows: [
      ["Program Name", "AI & ML Bootcamp"],
      ["Trainer Name", "Ahmed Alharbi"],
      ["Technical Field", "AI / Machine Learning / NLP / Generative AI"],
      ["Program Duration", "4 Weeks"],
      ["Number of Sessions", "20 Sessions (suggested)"],
      ["Session Duration", "2 Hours per Session"],
    ],
  },
  {
    id: "02",
    title: "Program Description",
    paragraph:
      "This intensive bootcamp provides a structured and practice-driven pathway from core machine learning concepts to modern NLP and Generative AI systems. Participants develop competence in data preprocessing, supervised and unsupervised learning, neural networks, sequence modeling, and transformer-based architectures. The curriculum balances theory with labs and mini-projects to build job-ready technical skills.",
  },
  {
    id: "03",
    title: "Program Objectives",
    bullets: [
      "Build complete ML pipelines from preprocessing to evaluation.",
      "Compare and select models (regression, classification, clustering, deep learning) based on data and constraints.",
      "Implement practical NLP workflows, including tokenization and language modeling basics.",
      "Explain and apply key GenAI concepts (BERT, T5, GPT, Attention) in real scenarios.",
      "Present model results with appropriate metrics and interpretation.",
    ],
  },
  {
    id: "04",
    title: "Target Audience",
    bullets: [
      "University students in Computer Science / IT / Data Science.",
      "Beginners seeking a strong practical foundation in AI and ML.",
      "Junior IT professionals transitioning to data and AI roles.",
    ],
  },
  {
    id: "05",
    title: "Prerequisites",
    bullets: [
      "Basic computer literacy and command-line familiarity.",
      "Introductory Python and data handling knowledge.",
      "Ability to install and run required tools locally.",
    ],
  },
  {
    id: "06",
    title: "Tools and Technical Environment",
    bullets: [
      "Python 3.x, Jupyter Notebook, VS Code/Cursor",
      "NumPy, Pandas, scikit-learn",
      "Matplotlib / Seaborn",
      "TensorFlow or PyTorch (introductory level)",
      "Hugging Face ecosystem for NLP/LLM demos",
      "Git and GitHub for version tracking",
    ],
  },
  {
    id: "07",
    title: "Course Structure (4 Weeks)",
    bullets: [
      "Week 1: Foundations, preprocessing, feature engineering, regression basics",
      "Week 2: Classification methods, metrics, Naive Bayes, Trees, Random Forest, SVM",
      "Week 3: Clustering, PCA, deep learning fundamentals, CNN/RNN intro",
      "Week 4: NLP workflows, Seq2Seq, Attention, BERT/T5/GPT, mini GenAI project",
    ],
  },
  {
    id: "08",
    title: "Topic Deep Dive (Sample)",
    rows: [
      ["Topic Title", "Tokenization for Modern NLP Systems"],
      [
        "Academic Overview",
        "Tokenization is a core representational stage that directly affects model efficiency, out-of-vocabulary behavior, and semantic coverage. Modern NLP systems rely on subword approaches to balance vocabulary size and generalization.",
      ],
      ["Core Theoretical Concepts", "Whitespace tokenization, BPE, WordPiece, Unigram LM, OOV handling"],
      ["Learning Taxonomy Level", "Apply / Analyze"],
      [
        "Relationship to Other Topics",
        "Builds on text preprocessing and supports language modeling, transformers, and generation quality.",
      ],
      ["Real-World Relevance", "Required in NLP engineer, LLM engineer, and AI product roles."],
      [
        "Recommended Teaching Approach",
        "Concept briefing (20m) + guided comparison (20m) + hands-on tokenizer lab (40m).",
      ],
      [
        "Assessment Indicators",
        "Student can justify tokenizer choice and demonstrate tokenization behavior on real samples.",
      ],
      ["Estimated Teaching Time", "1 Session x 2 Hours"],
      ["Key References", "Jurafsky & Martin NLP; SentencePiece docs; Hugging Face tokenizers docs."],
    ],
    bullets: [
      "Learning outcomes: compare tokenization algorithms, diagnose tokenization issues, and select suitable strategy for downstream modeling.",
      'Common misconception 1: "Tokenization is just splitting by spaces." -> Tokenizer design is a model-quality decision.',
      'Common misconception 2: "Any tokenizer works the same." -> Different algorithms affect performance and sequence length.',
    ],
  },
  {
    id: "09",
    title: "Session Plan (Sample)",
    rows: [
      ["Session Number", "01"],
      ["Session Title", "ML Foundations and Data Workflow"],
      ["Key Concepts", "Dataset lifecycle | train/test split | feature scaling"],
      [
        "Content Explanation",
        "Introduce the ML workflow and why preprocessing quality drives downstream performance.",
      ],
      [
        "Practical Lab",
        "Clean a dataset, split data, apply scaling, and compare baseline model behavior.",
      ],
      ["Tools Used", "Python, Pandas, scikit-learn, Jupyter"],
      ["Trainer Notes", "Emphasize data leakage risks and metric selection discipline."],
    ],
  },
  {
    id: "10",
    title: "Practical Labs",
    bullets: [
      "Lab 1: End-to-end preprocessing and baseline regression",
      "Lab 2: Classification benchmark (LogReg vs SVM vs Random Forest)",
      "Lab 3: Clustering + PCA interpretation",
      "Lab 4: NLP tokenization and N-gram language modeling",
      "Lab 5: Mini GenAI workflow with transformer-based model",
    ],
  },
  {
    id: "11",
    title: "Learning Resources",
    rows: [
      ["Recommended Courses", "Fast.ai, DeepLearning.AI, Hugging Face Course"],
      ["Recommended Books", "Hands-On ML (Geron), Deep Learning (Goodfellow), Speech and Language Processing"],
      ["Recommended Channels", "StatQuest, 3Blue1Brown, Hugging Face"],
      ["Official Docs", "scikit-learn.org | pytorch.org / tensorflow.org | huggingface.co/docs"],
    ],
  },
  {
    id: "12",
    title: "Curriculum Improvement Notes",
    paragraph:
      "Capture pacing feedback weekly, identify difficult concepts early, and adjust lab complexity to cohort readiness.",
  },
];

type TemplateSection = (typeof SECTIONS)[number];

export function MentorshipTemplate() {
  return (
    <>
      <div className="template-meta">
        <span className="template-pill">Curriculum</span>
        <span className="template-meta-text">Training Curriculum Template · Trainer Edition</span>
        <span className="template-pill subtle">Filled Draft</span>
      </div>
      <div className="template-grid">
        {SECTIONS.map((section: TemplateSection) => (
          <article key={section.id} className="template-section">
            <div className="template-section-head">
              <span className="template-section-id">{section.id}</span>
              <h3>{section.title}</h3>
            </div>
            {"paragraph" in section && section.paragraph ? (
              <p className="template-paragraph">{section.paragraph}</p>
            ) : null}
            {"rows" in section && section.rows ? (
              <div className="template-rows">
                {section.rows.map(([label, value], rowIdx) => (
                  <div key={`${section.id}-r${rowIdx}`} className="template-row">
                    <span className="template-row-label">{label}</span>
                    <p className="template-row-value">{value}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {"bullets" in section && section.bullets ? (
              <ul className="template-bullets">
                {section.bullets.map((item, bi) => (
                  <li key={`${section.id}-b${bi}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
