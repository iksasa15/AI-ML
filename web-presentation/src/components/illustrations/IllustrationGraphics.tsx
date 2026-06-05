import type { SlideIllustrationId } from "../../lib/slideIllustrations";

type Props = { id: SlideIllustrationId };

export function IllustrationGraphics({ id }: Props) {
  switch (id) {
    case "ml-workflow":
      return (
        <svg viewBox="0 0 400 80" role="img" aria-hidden="true">
          {["Data", "Preprocess", "Train", "Evaluate", "Deploy"].map((label, i) => (
            <g key={label} transform={`translate(${i * 78}, 0)`}>
              <rect x="4" y="20" width="70" height="40" rx="6" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" />
              <text x="39" y="45" textAnchor="middle" fontSize="11" fill="currentColor">
                {label}
              </text>
              {i < 4 ? <path d="M74 40h8" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr)" /> : null}
            </g>
          ))}
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      );
    case "train-test-split":
      return (
        <svg viewBox="0 0 400 100" role="img" aria-hidden="true">
          <rect x="20" y="25" width="220" height="50" rx="6" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" />
          <text x="130" y="55" textAnchor="middle" fontSize="13" fill="currentColor">
            Train 80%
          </text>
          <rect x="260" y="25" width="120" height="50" rx="6" fill="var(--color-gold)" opacity="0.25" stroke="var(--color-gold)" />
          <text x="320" y="55" textAnchor="middle" fontSize="13" fill="currentColor">
            Test 20%
          </text>
        </svg>
      );
    case "preprocessing-pipeline":
      return (
        <svg viewBox="0 0 400 90" role="img" aria-hidden="true">
          {["Clean", "Scale", "Encode", "Split"].map((label, i) => (
            <g key={label} transform={`translate(${i * 95 + 10}, 15)`}>
              <rect width="80" height="60" rx="8" fill="var(--card-3)" stroke="var(--border)" />
              <text x="40" y="38" textAnchor="middle" fontSize="11" fill="currentColor">
                {label}
              </text>
            </g>
          ))}
        </svg>
      );
    case "bias-variance":
      return (
        <svg viewBox="0 0 400 120" role="img" aria-hidden="true">
          <path d="M40 90 Q120 30 200 70 T360 50" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <text x="60" y="105" fontSize="11" fill="currentColor">
            High bias
          </text>
          <text x="280" y="40" fontSize="11" fill="currentColor">
            High variance
          </text>
          <circle cx="200" cy="70" r="5" fill="var(--color-gold)" />
          <text x="200" y="95" textAnchor="middle" fontSize="10" fill="currentColor">
            sweet spot
          </text>
        </svg>
      );
    case "confusion-matrix":
      return (
        <svg viewBox="0 0 200 160" role="img" aria-hidden="true">
          <rect x="50" y="20" width="50" height="50" fill="var(--accent)" opacity="0.35" />
          <rect x="100" y="20" width="50" height="50" fill="var(--accent)" opacity="0.1" />
          <rect x="50" y="70" width="50" height="50" fill="var(--accent)" opacity="0.1" />
          <rect x="100" y="70" width="50" height="50" fill="var(--accent)" opacity="0.35" />
          <text x="75" y="52" textAnchor="middle" fontSize="10" fill="currentColor">
            TP
          </text>
          <text x="125" y="52" textAnchor="middle" fontSize="10" fill="currentColor">
            FP
          </text>
          <text x="75" y="102" textAnchor="middle" fontSize="10" fill="currentColor">
            FN
          </text>
          <text x="125" y="102" textAnchor="middle" fontSize="10" fill="currentColor">
            TN
          </text>
        </svg>
      );
    case "rag-architecture":
      return (
        <svg viewBox="0 0 400 100" role="img" aria-hidden="true">
          <rect x="10" y="30" width="70" height="40" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" />
          <text x="45" y="55" textAnchor="middle" fontSize="10">
            Query
          </text>
          <rect x="100" y="30" width="80" height="40" rx="4" fill="var(--color-gold)" opacity="0.2" stroke="var(--color-gold)" />
          <text x="140" y="55" textAnchor="middle" fontSize="10">
            Retrieve
          </text>
          <rect x="200" y="30" width="80" height="40" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" />
          <text x="240" y="55" textAnchor="middle" fontSize="10">
            Augment
          </text>
          <rect x="300" y="30" width="80" height="40" rx="4" fill="var(--accent)" opacity="0.35" stroke="var(--accent)" />
          <text x="340" y="55" textAnchor="middle" fontSize="10">
            LLM
          </text>
        </svg>
      );
    case "transformer-block":
      return (
        <svg viewBox="0 0 300 140" role="img" aria-hidden="true">
          <rect x="100" y="10" width="100" height="30" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" />
          <text x="150" y="30" textAnchor="middle" fontSize="10">
            Self-Attention
          </text>
          <rect x="100" y="50" width="100" height="30" rx="4" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" />
          <text x="150" y="70" textAnchor="middle" fontSize="10">
            Feed-Forward
          </text>
          <path d="M150 40v10M150 80v20" stroke="var(--accent)" strokeWidth="2" />
          <text x="150" y="125" textAnchor="middle" fontSize="10">
            Output
          </text>
        </svg>
      );
    case "nlp-pipeline":
      return (
        <svg viewBox="0 0 400 80" role="img" aria-hidden="true">
          {["Tokenize", "Embed", "Encode", "Predict"].map((label, i) => (
            <g key={label} transform={`translate(${i * 95 + 15}, 15)`}>
              <rect width="80" height="50" rx="6" fill="var(--accent)" opacity={0.15 + i * 0.08} stroke="var(--accent)" />
              <text x="40" y="32" textAnchor="middle" fontSize="10" fill="currentColor">
                {label}
              </text>
            </g>
          ))}
        </svg>
      );
    case "mlops-loop":
      return (
        <svg viewBox="0 0 200 160" role="img" aria-hidden="true">
          <circle cx="100" cy="80" r="55" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />
          {["Train", "Deploy", "Monitor", "Retrain"].map((label, i) => {
            const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const x = 100 + Math.cos(a) * 55;
            const y = 80 + Math.sin(a) * 55;
            return (
              <text key={label} x={x} y={y} textAnchor="middle" fontSize="9" fill="currentColor">
                {label}
              </text>
            );
          })}
        </svg>
      );
    case "encoding-types":
      return (
        <svg viewBox="0 0 300 100" role="img" aria-hidden="true">
          <text x="50" y="55" fontSize="11" fill="currentColor">
            Cat
          </text>
          <rect x="90" y="35" width="30" height="30" fill="var(--accent)" opacity="0.8" />
          <rect x="125" y="35" width="30" height="30" fill="var(--accent)" opacity="0.2" />
          <rect x="160" y="35" width="30" height="30" fill="var(--accent)" opacity="0.2" />
          <text x="220" y="55" fontSize="10" fill="var(--muted)">
            one-hot
          </text>
        </svg>
      );
    case "decision-tree":
      return (
        <svg viewBox="0 0 300 140" role="img" aria-hidden="true">
          <circle cx="150" cy="25" r="10" fill="var(--accent)" opacity="0.8" />
          <circle cx="100" cy="70" r="8" fill="var(--accent)" opacity="0.55" />
          <circle cx="200" cy="70" r="8" fill="var(--accent)" opacity="0.55" />
          <circle cx="75" cy="115" r="6" fill="var(--color-gold)" opacity="0.7" />
          <circle cx="125" cy="115" r="6" fill="var(--color-gold)" opacity="0.7" />
          <path d="M150 35 L100 62 M150 35 L200 62 M100 78 L75 109 M100 78 L125 109" stroke="var(--accent)" strokeWidth="1.5" />
        </svg>
      );
    case "sigmoid-curve":
      return (
        <svg viewBox="0 0 400 120" role="img" aria-hidden="true">
          <path d="M60 100 Q200 100 200 60 T340 20" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          <line x1="60" y1="100" x2="340" y2="100" stroke="var(--border)" />
          <line x1="60" y1="20" x2="60" y2="100" stroke="var(--border)" />
        </svg>
      );
    case "pca-axes":
      return (
        <svg viewBox="0 0 300 140" role="img" aria-hidden="true">
          <ellipse cx="150" cy="70" rx="80" ry="35" fill="var(--accent)" opacity="0.12" />
          <line x1="150" y1="70" x2="230" y2="45" stroke="var(--color-gold)" strokeWidth="2" />
          <line x1="150" y1="70" x2="90" y2="110" stroke="var(--accent)" strokeWidth="2" />
          <text x="235" y="42" fontSize="10" fill="currentColor">
            PC1
          </text>
          <text x="75" y="118" fontSize="10" fill="currentColor">
            PC2
          </text>
        </svg>
      );
    case "token-flow":
      return (
        <svg viewBox="0 0 400 80" role="img" aria-hidden="true">
          <text x="50" y="45" fontSize="12" fill="currentColor">
            hello
          </text>
          <path d="M110 40h30" stroke="var(--accent)" strokeWidth="2" />
          {["hel", "##lo"].map((tok, i) => (
            <g key={tok} transform={`translate(${150 + i * 70}, 22)`}>
              <rect width="55" height="36" rx="4" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" />
              <text x="27" y="23" textAnchor="middle" fontSize="11" fill="currentColor">
                {tok}
              </text>
            </g>
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 80" role="img" aria-hidden="true">
          <rect x="40" y="15" width="320" height="50" rx="8" fill="var(--accent)" opacity="0.12" stroke="var(--accent)" />
          <text x="200" y="48" textAnchor="middle" fontSize="12" fill="currentColor">
            {id.replace(/-/g, " ")}
          </text>
        </svg>
      );
  }
}
