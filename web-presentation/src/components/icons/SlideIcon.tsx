import type { SlideIconId } from "../../lib/slideIconKeys";

type SlideIconProps = {
  id: SlideIconId | string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function iconSvg(id: string) {
  switch (id) {
    case "train":
      return (
        <>
          <rect x="6" y="10" width="20" height="14" rx="2" fill="currentColor" opacity="0.35" />
          <path d="M10 18h12M10 14h8" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "test":
      return (
        <>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16l3 3 6-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      );
    case "scaling":
      return (
        <>
          <path d="M8 22V10h6v12M18 22V6h6v16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </>
      );
    case "encoding":
      return (
        <>
          <rect x="6" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="16" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.75" />
          <rect x="11" y="18" width="8" height="8" rx="1" fill="currentColor" />
        </>
      );
    case "missing-data":
      return (
        <>
          <rect x="7" y="9" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16h8M12 20h5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
        </>
      );
    case "leakage":
      return (
        <>
          <path d="M8 20 L16 12 L24 20" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="16" cy="10" r="3" fill="currentColor" />
        </>
      );
    case "regression":
      return (
        <>
          <line x1="8" y1="22" x2="24" y2="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="19" r="2" fill="currentColor" />
          <circle cx="22" cy="10" r="2" fill="currentColor" />
        </>
      );
    case "classification":
      return (
        <>
          <circle cx="11" cy="16" r="5" fill="currentColor" opacity="0.4" />
          <circle cx="21" cy="16" r="5" fill="currentColor" opacity="0.85" />
        </>
      );
    case "tree":
      return (
        <>
          <circle cx="16" cy="8" r="3" fill="currentColor" />
          <circle cx="10" cy="18" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="22" cy="18" r="3" fill="currentColor" opacity="0.7" />
          <path d="M16 11 L10 15 M16 11 L22 15" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "forest":
      return (
        <>
          <circle cx="10" cy="12" r="2.5" fill="currentColor" />
          <circle cx="16" cy="10" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="22" cy="12" r="2.5" fill="currentColor" />
          <circle cx="13" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="19" cy="20" r="2.5" fill="currentColor" opacity="0.6" />
        </>
      );
    case "svm":
    case "margin":
      return (
        <>
          <line x1="8" y1="22" x2="24" y2="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="18" r="2" fill="currentColor" />
          <circle cx="20" cy="10" r="2" fill="currentColor" />
        </>
      );
    case "clustering":
      return (
        <>
          <circle cx="11" cy="14" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="14" cy="20" r="3" fill="currentColor" opacity="0.85" />
        </>
      );
    case "pca":
    case "dimension":
      return (
        <>
          <ellipse cx="16" cy="16" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "naive-bayes":
    case "probability":
      return (
        <>
          <text x="16" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor">
            P
          </text>
        </>
      );
    case "neural-net":
    case "backprop":
      return (
        <>
          <circle cx="10" cy="16" r="3" fill="currentColor" />
          <circle cx="16" cy="10" r="3" fill="currentColor" />
          <circle cx="16" cy="22" r="3" fill="currentColor" />
          <circle cx="22" cy="16" r="3" fill="currentColor" />
          <path d="M10 16 L16 10 M10 16 L16 22 M16 10 L22 16 M16 22 L22 16" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </>
      );
    case "cnn":
      return (
        <>
          <rect x="8" y="10" width="16" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="13" width="4" height="4" fill="currentColor" opacity="0.5" />
          <rect x="17" y="13" width="4" height="4" fill="currentColor" opacity="0.8" />
        </>
      );
    case "rnn":
      return (
        <>
          <path d="M8 16 Q16 8 24 16 Q16 24 8 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </>
      );
    case "regularization":
      return (
        <>
          <path d="M8 20 Q16 6 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M8 22 Q16 12 24 22" fill="none" stroke="currentColor" strokeWidth="2" />
        </>
      );
    case "token":
      return (
        <>
          <rect x="7" y="12" width="6" height="8" rx="1" fill="currentColor" opacity="0.5" />
          <rect x="14" y="12" width="10" height="8" rx="1" fill="currentColor" />
        </>
      );
    case "embedding":
      return (
        <>
          <circle cx="10" cy="16" r="2" fill="currentColor" />
          <circle cx="16" cy="12" r="2" fill="currentColor" />
          <circle cx="22" cy="16" r="2" fill="currentColor" />
          <circle cx="16" cy="20" r="2" fill="currentColor" opacity="0.6" />
        </>
      );
    case "seq2seq":
      return (
        <>
          <path d="M8 16h6l4-4v8l-4-4h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "attention":
    case "transformer":
      return (
        <>
          <rect x="8" y="10" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "bert":
    case "llm":
      return (
        <>
          <rect x="8" y="9" width="16" height="14" rx="2" fill="currentColor" opacity="0.2" />
          <text x="16" y="19" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">
            AI
          </text>
        </>
      );
    case "rag":
      return (
        <>
          <circle cx="11" cy="16" r="4" fill="currentColor" opacity="0.4" />
          <rect x="16" y="12" width="10" height="8" rx="1" fill="currentColor" />
          <path d="M18 16h6" stroke="#fff" strokeWidth="1" />
        </>
      );
    case "vector-db":
      return (
        <>
          <ellipse cx="16" cy="10" rx="8" ry="3" fill="currentColor" opacity="0.5" />
          <path d="M8 10v10c0 2 16 2 16 0V10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "monitoring":
    case "deploy":
      return (
        <>
          <polyline points="8,20 12,14 16,17 20,10 24,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "formula":
      return (
        <text x="16" y="20" textAnchor="middle" fontSize="16" fontWeight="600" fill="currentColor">
          ƒ
        </text>
      );
    case "table":
      return (
        <>
          <rect x="8" y="9" width="16" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1="14" y1="9" x2="14" y2="23" stroke="currentColor" strokeWidth="1" />
        </>
      );
    case "check":
      return (
        <path d="M9 16l4 4 10-12" fill="none" stroke="currentColor" strokeWidth="2" />
      );
    case "warning":
      return (
        <>
          <path d="M16 7 L26 23 H6 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="12" x2="16" y2="17" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="currentColor" />
        </>
      );
    case "feature":
      return (
        <>
          <rect x="7" y="11" width="6" height="10" rx="1" fill="currentColor" opacity="0.45" />
          <rect x="14" y="9" width="6" height="12" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="21" y="13" width="6" height="8" rx="1" fill="currentColor" />
        </>
      );
    case "model":
      return (
        <>
          <rect x="9" y="10" width="14" height="12" rx="2" fill="currentColor" opacity="0.25" />
          <path d="M12 16h8M12 13h5" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "evaluate":
    case "metric":
      return (
        <>
          <path d="M8 20 L12 14 L16 17 L20 10 L24 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "threshold":
      return (
        <>
          <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M8 18 Q16 10 24 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "kernel":
      return (
        <>
          <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.4" />
        </>
      );
    case "workflow":
    case "pipeline":
      return (
        <>
          <circle cx="9" cy="16" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.75" />
          <circle cx="23" cy="16" r="3" fill="currentColor" />
          <path d="M12 16h2M18 16h2" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "nlp":
      return (
        <>
          <rect x="7" y="11" width="18" height="10" rx="2" fill="currentColor" opacity="0.2" />
          <text x="16" y="19" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">
            NLP
          </text>
        </>
      );
    case "idea":
      return (
        <>
          <circle cx="16" cy="14" r="5" fill="currentColor" opacity="0.3" />
          <path d="M13 22h6" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
    case "compare":
      return (
        <>
          <path d="M8 12h8v10H8zM18 16h8v6h-8z" fill="currentColor" opacity="0.5" />
        </>
      );
    case "data":
    default:
      return (
        <>
          <ellipse cx="16" cy="11" rx="9" ry="3" fill="currentColor" opacity="0.45" />
          <path d="M7 11v10c0 2 18 2 18 0V11" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      );
  }
}

export function SlideIcon({ id, className = "", size = "md" }: SlideIconProps) {
  const dim = size === "sm" ? 20 : size === "lg" ? 36 : 28;
  return (
    <svg
      className={`slide-icon ${className}`.trim()}
      width={dim}
      height={dim}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      {iconSvg(id)}
    </svg>
  );
}
