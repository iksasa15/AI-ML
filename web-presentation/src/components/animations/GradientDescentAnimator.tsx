import { ConceptDiagramCard } from "./ConceptDiagramCard";

const W = 400;
const H = 180;
const X_MIN = -0.5;
const X_MAX = 4.5;
const MIN_X = 2;

function loss(x: number) {
  return 0.35 * (x - MIN_X) ** 2 + 0.4;
}

function xToSvg(x: number) {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * (W - 40) + 20;
}

function yToSvg(y: number) {
  const maxY = 3.2;
  return H - 20 - (y / maxY) * (H - 40);
}

function buildCurvePath() {
  const steps = 60;
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / steps;
    const y = loss(x);
    const sx = xToSvg(x);
    const sy = yToSvg(y);
    d += i === 0 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
  }
  return d;
}

const CURVE_PATH = buildCurvePath();
const X = MIN_X;
const PX = xToSvg(X);
const PY = yToSvg(loss(X));

export function GradientDescentAnimator() {
  return (
    <ConceptDiagramCard
      title="Gradient Descent"
      subtitle="Loss curve L(w) — minimum at the bottom of the bowl"
      caption={`Converged: w = ${X.toFixed(2)} · L(w) = ${loss(X).toFixed(2)}`}
      wrapClass="concept-svg-wrap--gd"
    >
      <svg
        className="concept-svg concept-svg--gd"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Gradient descent loss curve with minimum marked"
      >
        <line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} className="gd-axis" />
        <line x1={20} y1={20} x2={20} y2={H - 20} className="gd-axis" />
        <path d={CURVE_PATH} className="gd-curve" fill="none" />
        <circle cx={PX} cy={PY} r={7} className="gd-point" />
        <circle cx={PX} cy={PY} r={5} className="gd-minimum" />
        <text x={PX} y={PY - 12} className="gd-min-label" textAnchor="middle">
          min
        </text>
        <line x1={PX} y1={PY} x2={PX} y2={H - 20} className="gd-drop-line" strokeDasharray="4 3" />
        <text x={W / 2} y={H - 4} className="gd-axis-label" textAnchor="middle">
          parameter w
        </text>
        <text x={8} y={24} className="gd-axis-label">
          L(w)
        </text>
      </svg>
    </ConceptDiagramCard>
  );
}
