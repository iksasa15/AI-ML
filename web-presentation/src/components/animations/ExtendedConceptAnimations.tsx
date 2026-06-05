import type { ConceptAnimationId } from "../../lib/conceptAnimations";
import { ConceptDiagramCard } from "./ConceptDiagramCard";

type AnimProps = { id: ConceptAnimationId };

export function TrainTestSplitAnim() {
  const ratio = 0.8;
  const trainW = 280 * ratio;
  const testW = 280 * (1 - ratio);

  return (
    <ConceptDiagramCard
      title="Train / Test Split"
      subtitle="Hold-out partition — train wide, test narrow"
      caption="Typical split: 80% train · 20% test"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 100" aria-hidden="true">
        <rect x="40" y="30" width={trainW} height="40" rx="6" fill="var(--accent)" opacity="0.35" stroke="var(--accent)" />
        <rect x={40 + trainW + 10} y="30" width={testW} height="40" rx="6" fill="var(--color-gold)" opacity="0.35" stroke="var(--color-gold)" />
        <text x={40 + trainW / 2} y="55" textAnchor="middle" fontSize="12" fill="currentColor">
          Train 80%
        </text>
        <text x={40 + trainW + 10 + testW / 2} y="55" textAnchor="middle" fontSize="12" fill="currentColor">
          Test 20%
        </text>
      </svg>
    </ConceptDiagramCard>
  );
}

export function FeatureScalingAnim() {
  const h1 = 60;
  const h2 = 35;
  const h3 = 47;

  return (
    <ConceptDiagramCard
      title="Feature Scaling"
      subtitle="Features brought to a comparable range"
      caption="After scaling — heights are comparable"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 120" aria-hidden="true">
        <rect x="80" y={90 - h1} width="40" height={h1} fill="var(--accent)" opacity="0.7" />
        <rect x="160" y={90 - h2} width="40" height={h2} fill="var(--accent)" />
        <rect x="240" y={90 - h3} width="40" height={h3} fill="var(--color-gold)" opacity="0.8" />
        <line x1="60" y1="90" x2="320" y2="90" stroke="var(--border)" />
      </svg>
    </ConceptDiagramCard>
  );
}

export function EncodingComparisonAnim() {
  const labels = ["One-Hot", "Dummy", "Ordinal"];

  return (
    <ConceptDiagramCard
      title="Encoding Comparison"
      subtitle="Three ways to encode categorical variables"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 120" aria-hidden="true">
        {labels.map((label, i) => (
          <g key={label} transform={`translate(${40 + i * 120}, 10)`}>
            <text x="50" y="18" textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="600">
              {label}
            </text>
            <rect x="20" y="28" width="60" height="50" rx="4" fill="var(--accent)" opacity={0.25 + i * 0.15} stroke="var(--accent)" />
            {[0, 1, 2].map((j) => (
              <rect
                key={j}
                x={28 + j * 16}
                y="40"
                width="12"
                height="28"
                rx="2"
                fill="var(--accent)"
                opacity={j === i ? 0.85 : 0.2}
              />
            ))}
          </g>
        ))}
      </svg>
    </ConceptDiagramCard>
  );
}

export function SigmoidThresholdAnim() {
  const threshold = 0.5;
  const tx = 60 + threshold * 280;

  return (
    <ConceptDiagramCard
      title="Sigmoid & Threshold"
      subtitle="Probability cutoff for classification"
      caption={`Decision threshold τ = ${threshold}`}
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 140" aria-hidden="true">
        <path d="M60 110 Q200 20 340 110" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
        <line x1={tx} y1="20" x2={tx} y2="120" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="4 3" />
        <text x={tx} y="15" textAnchor="middle" fontSize="10" fill="currentColor">
          τ = 0.5
        </text>
      </svg>
    </ConceptDiagramCard>
  );
}

export function KMeansClusteringAnim() {
  const centers = [
    { x: 120, y: 70, c: "var(--accent)" },
    { x: 200, y: 50, c: "var(--color-gold)" },
    { x: 280, y: 80, c: "var(--accent)" },
  ];

  return (
    <ConceptDiagramCard
      title="K-Means Clustering"
      subtitle="Points grouped around centroids"
      caption="3 clusters · centroids marked with rings"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 120" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => {
          const cx = centers[i % 3].x + Math.sin(i * 1.4) * 22;
          const cy = centers[i % 3].y + Math.cos(i * 1.1) * 14;
          return <circle key={i} cx={cx} cy={cy} r="4" fill={centers[i % 3].c} opacity="0.7" />;
        })}
        {centers.map((c, i) => (
          <circle key={`c-${i}`} cx={c.x} cy={c.y} r="8" fill="none" stroke={c.c} strokeWidth="2" />
        ))}
      </svg>
    </ConceptDiagramCard>
  );
}

export function DecisionTreeSplitAnim() {
  return (
    <ConceptDiagramCard
      title="Decision Tree Split"
      subtitle="Recursive partitioning by feature threshold"
      caption="Root → branches → leaf nodes"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 140" aria-hidden="true">
        <circle cx="200" cy="25" r="10" fill="var(--accent)" opacity="0.8" />
        <line x1="200" y1="35" x2="120" y2="65" stroke="var(--accent)" />
        <line x1="200" y1="35" x2="280" y2="65" stroke="var(--accent)" />
        <circle cx="120" cy="75" r="8" fill="var(--accent)" opacity="0.6" />
        <circle cx="280" cy="75" r="8" fill="var(--accent)" opacity="0.6" />
        <line x1="120" y1="83" x2="80" y2="110" stroke="var(--color-gold)" />
        <line x1="120" y1="83" x2="160" y2="110" stroke="var(--color-gold)" />
        <circle cx="80" cy="118" r="6" fill="var(--color-gold)" opacity="0.7" />
        <circle cx="160" cy="118" r="6" fill="var(--color-gold)" opacity="0.7" />
      </svg>
    </ConceptDiagramCard>
  );
}

export function SvmMarginAnim() {
  const margin = 55;

  return (
    <ConceptDiagramCard
      title="SVM Maximum Margin"
      subtitle="Widest gap between classes"
      caption="Support vectors define the margin"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 140" aria-hidden="true">
        <line x1="80" y1="120" x2="320" y2="30" stroke="var(--accent)" strokeWidth="2" />
        <line x1={200 - margin} y1="120" x2={320 - margin} y2="30" stroke="var(--color-gold)" strokeDasharray="5 4" opacity="0.6" />
        <line x1={200 + margin} y1="120" x2={320 + margin} y2="30" stroke="var(--color-gold)" strokeDasharray="5 4" opacity="0.6" />
        <circle cx="140" cy="95" r="6" fill="var(--accent)" />
        <circle cx="260" cy="55" r="6" fill="var(--accent)" />
      </svg>
    </ConceptDiagramCard>
  );
}

export function PcaProjectionAnim() {
  const angle = 28;
  const rad = (angle * Math.PI) / 180;

  return (
    <ConceptDiagramCard
      title="PCA Projection"
      subtitle="First principal component along max variance"
      caption={`PC1 angle ≈ ${angle}°`}
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 140" aria-hidden="true">
        <ellipse cx="200" cy="70" rx="90" ry="35" fill="var(--accent)" opacity="0.12" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={160 + i * 7} cy={55 + Math.sin(i) * 20} r="3" fill="var(--accent)" opacity="0.6" />
        ))}
        <line
          x1="200"
          y1="70"
          x2={200 + Math.cos(rad) * 80}
          y2={70 + Math.sin(rad) * 30}
          stroke="var(--color-gold)"
          strokeWidth="2"
        />
      </svg>
    </ConceptDiagramCard>
  );
}

export function ConfusionMatrixAnim() {
  const cells = ["TP", "FP", "FN", "TN"];

  return (
    <ConceptDiagramCard
      title="Confusion Matrix"
      subtitle="Actual vs predicted class counts"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 200 160" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const isDiag = i === 0 || i === 3;
          return (
            <rect
              key={i}
              x={50 + col * 50}
              y={30 + row * 50}
              width="50"
              height="50"
              fill="var(--accent)"
              opacity={isDiag ? 0.45 : 0.18}
              stroke="var(--accent)"
            />
          );
        })}
        {cells.map((label, i) => (
          <text
            key={label}
            x={75 + (i % 2) * 50}
            y={62 + Math.floor(i / 2) * 50}
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
          >
            {label}
          </text>
        ))}
      </svg>
    </ConceptDiagramCard>
  );
}

export function TokenizationFlowAnim() {
  const tokens = ["▁Hel", "lo", "▁wor", "ld"];

  return (
    <ConceptDiagramCard
      title="Tokenization Flow"
      subtitle="Text → subword tokens"
      caption={`"Hello world" → ${tokens.length} tokens`}
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 100" aria-hidden="true">
        <text x="60" y="40" fontSize="14" fill="currentColor">
          Hello world
        </text>
        <path d="M60 50 H340" stroke="var(--border)" strokeWidth="1" markerEnd="url(#tok-arr)" />
        {tokens.map((tok, i) => (
          <g key={tok} transform={`translate(${70 + i * 70}, 58)`}>
            <rect width="60" height="28" rx="4" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" />
            <text x="30" y="18" textAnchor="middle" fontSize="11" fill="currentColor">
              {tok}
            </text>
          </g>
        ))}
        <defs>
          <marker id="tok-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
          </marker>
        </defs>
      </svg>
    </ConceptDiagramCard>
  );
}

export function Seq2SeqAttentionAnim() {
  return (
    <ConceptDiagramCard
      title="Seq2Seq + Attention"
      subtitle="Decoder attends to encoder states"
      caption="Attention link from encoder step to decoder"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 120" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={60 + i * 50} y="30" width="40" height="25" rx="3" fill="var(--accent)" opacity={i === 2 ? 0.7 : 0.25} />
        ))}
        <text x="155" y="48" textAnchor="middle" fontSize="9" fill="var(--muted)">
          encoder
        </text>
        <rect x="280" y="70" width="60" height="30" rx="4" fill="var(--color-gold)" opacity="0.5" />
        <text x="310" y="90" textAnchor="middle" fontSize="9" fill="currentColor">
          decoder
        </text>
        <path d="M160 55 Q220 65 280 85" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
      </svg>
    </ConceptDiagramCard>
  );
}

export function RagPipelineAnim() {
  const stages = ["Query", "Retrieve", "Augment", "Generate"];

  return (
    <ConceptDiagramCard
      title="RAG Pipeline"
      subtitle="Retrieve context, then generate"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 100" aria-hidden="true">
        {stages.map((label, i) => (
          <g key={label} transform={`translate(${30 + i * 90}, 30)`}>
            <rect width="75" height="40" rx="5" fill="var(--accent)" opacity={0.2 + i * 0.1} stroke="var(--accent)" />
            <text x="37" y="25" textAnchor="middle" fontSize="10" fill="currentColor">
              {label}
            </text>
          </g>
        ))}
        <path d="M105 50 H120 M195 50 H210 M285 50 H300" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#rag-arr)" />
        <defs>
          <marker id="rag-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
          </marker>
        </defs>
      </svg>
    </ConceptDiagramCard>
  );
}

export function MlopsLifecycleAnim() {
  const phases = ["Train", "Deploy", "Monitor", "Retrain"];

  return (
    <ConceptDiagramCard
      title="MLOps Lifecycle"
      subtitle="Continuous train → deploy → monitor loop"
      wrapClass="concept-svg-wrap--gd"
    >
      <svg className="concept-svg" viewBox="0 0 400 120" aria-hidden="true">
        <circle cx="200" cy="60" r="45" fill="none" stroke="var(--border)" strokeWidth="2" />
        {phases.map((label, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 45;
          const y = 60 + Math.sin(a) * 45;
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="12" fill="var(--accent)" opacity="0.55" />
              <text x={x} y={y + 28} textAnchor="middle" fontSize="9" fill="currentColor">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </ConceptDiagramCard>
  );
}

export function ExtendedConceptAnimation({ id }: AnimProps) {
  switch (id) {
    case "train-test-split":
      return <TrainTestSplitAnim />;
    case "feature-scaling":
      return <FeatureScalingAnim />;
    case "encoding-comparison":
      return <EncodingComparisonAnim />;
    case "sigmoid-threshold":
      return <SigmoidThresholdAnim />;
    case "kmeans-clustering":
      return <KMeansClusteringAnim />;
    case "decision-tree-split":
      return <DecisionTreeSplitAnim />;
    case "svm-margin":
      return <SvmMarginAnim />;
    case "pca-projection":
      return <PcaProjectionAnim />;
    case "confusion-matrix":
      return <ConfusionMatrixAnim />;
    case "tokenization-flow":
      return <TokenizationFlowAnim />;
    case "seq2seq-attention":
      return <Seq2SeqAttentionAnim />;
    case "rag-pipeline":
      return <RagPipelineAnim />;
    case "mlops-lifecycle":
      return <MlopsLifecycleAnim />;
    default:
      return null;
  }
}
