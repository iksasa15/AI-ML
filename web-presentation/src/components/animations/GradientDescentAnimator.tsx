import { useCallback, useEffect, useState } from "react";

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

export function GradientDescentAnimator() {
  const [playing, setPlaying] = useState(false);
  const [x, setX] = useState(0.4);
  const step = useCallback(() => {
    setX((prev) => {
      const grad = 0.7 * (prev - MIN_X);
      const next = prev - 0.04 * grad;
      if (Math.abs(next - MIN_X) < 0.02) {
        setPlaying(false);
        return MIN_X;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(step, 80);
    return () => window.clearInterval(id);
  }, [playing, step]);

  const px = xToSvg(x);
  const py = yToSvg(loss(x));

  return (
    <div className="concept-card concept-card--gd">
      <div className="concept-card-head">
        <h3>Gradient Descent Animator</h3>
        <p>Loss curve L(w) — the point descends toward the minimum</p>
      </div>
      <div className="concept-svg-wrap concept-svg-wrap--gd">
      <svg
        className="concept-svg concept-svg--gd"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Gradient descent on loss curve"
      >
        <line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} className="gd-axis" />
        <line x1={20} y1={20} x2={20} y2={H - 20} className="gd-axis" />
        <path d={CURVE_PATH} className="gd-curve" fill="none" />
        <circle cx={xToSvg(MIN_X)} cy={yToSvg(loss(MIN_X))} r={5} className="gd-minimum" />
        <text x={xToSvg(MIN_X)} y={yToSvg(loss(MIN_X)) - 10} className="gd-min-label" textAnchor="middle">
          min
        </text>
        <circle cx={px} cy={py} r={7} className={`gd-point${playing ? " is-moving" : ""}`} />
        {playing ? (
          <line x1={px} y1={py} x2={px} y2={H - 20} className="gd-drop-line" strokeDasharray="4 3" />
        ) : null}
        <text x={W / 2} y={H - 4} className="gd-axis-label" textAnchor="middle">
          parameter w
        </text>
        <text x={8} y={24} className="gd-axis-label">
          L(w)
        </text>
      </svg>
      </div>
      <div className="concept-card-actions">
        <button type="button" className="concept-btn" onClick={() => setPlaying((p) => !p)}>
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          type="button"
          className="concept-btn concept-btn--ghost"
          onClick={() => {
            setPlaying(false);
            setX(0.4);
          }}
        >
          Reset
        </button>
        <span className="concept-meta">w = {x.toFixed(2)} · L = {loss(x).toFixed(2)}</span>
      </div>
    </div>
  );
}
