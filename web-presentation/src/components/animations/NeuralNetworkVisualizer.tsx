import { useCallback, useMemo, useState } from "react";

type Layer = { id: string; label: string; nodes: number };

const LAYERS: Layer[] = [
  { id: "input", label: "Input", nodes: 3 },
  { id: "hidden", label: "Hidden", nodes: 4 },
  { id: "output", label: "Output", nodes: 2 },
];

function randomWeight() {
  return Number((Math.random() * 2 - 1).toFixed(2));
}

function buildInitialWeights() {
  const weights: Record<string, number> = {};
  for (let i = 0; i < LAYERS[0].nodes; i += 1) {
    for (let h = 0; h < LAYERS[1].nodes; h += 1) {
      weights[`i${i}-h${h}`] = randomWeight();
    }
  }
  for (let h = 0; h < LAYERS[1].nodes; h += 1) {
    for (let o = 0; o < LAYERS[2].nodes; o += 1) {
      weights[`h${h}-o${o}`] = randomWeight();
    }
  }
  return weights;
}

const W = 420;
const H = 220;
const NODE_R = 14;

function layerX(index: number) {
  return 50 + index * ((W - 100) / (LAYERS.length - 1));
}

function nodeY(_layerIndex: number, nodeIndex: number, total: number) {
  const gap = (H - 40) / Math.max(total - 1, 1);
  return 30 + nodeIndex * gap;
}

export function NeuralNetworkVisualizer() {
  const [weights, setWeights] = useState(buildInitialWeights);
  const [forwardActive, setForwardActive] = useState(false);
  const [pulseEdge, setPulseEdge] = useState<string | null>(null);

  const edges = useMemo(() => {
    const list: Array<{ id: string; x1: number; y1: number; x2: number; y2: number; w: number }> = [];
    for (let i = 0; i < LAYERS[0].nodes; i += 1) {
      for (let h = 0; h < LAYERS[1].nodes; h += 1) {
        list.push({
          id: `i${i}-h${h}`,
          x1: layerX(0),
          y1: nodeY(0, i, LAYERS[0].nodes),
          x2: layerX(1),
          y2: nodeY(1, h, LAYERS[1].nodes),
          w: weights[`i${i}-h${h}`] ?? 0,
        });
      }
    }
    for (let h = 0; h < LAYERS[1].nodes; h += 1) {
      for (let o = 0; o < LAYERS[2].nodes; o += 1) {
        list.push({
          id: `h${h}-o${o}`,
          x1: layerX(1),
          y1: nodeY(1, h, LAYERS[1].nodes),
          x2: layerX(2),
          y2: nodeY(2, o, LAYERS[2].nodes),
          w: weights[`h${h}-o${o}`] ?? 0,
        });
      }
    }
    return list;
  }, [weights]);

  const shuffleWeights = useCallback(() => {
    setWeights(buildInitialWeights());
    setForwardActive(false);
    setPulseEdge(null);
  }, []);

  const runForwardPass = useCallback(() => {
    setForwardActive(true);
    let step = 0;
    const ids = edges.map((e) => e.id);
    const tick = () => {
      if (step >= ids.length) {
        setPulseEdge(null);
        return;
      }
      setPulseEdge(ids[step]);
      step += 1;
      window.setTimeout(tick, 120);
    };
    tick();
  }, [edges]);

  return (
    <div className="concept-card concept-card--nn">
      <div className="concept-card-head">
        <h3>Neural Network Visualizer</h3>
        <p>Input → Hidden → Output · click edges to nudge weights</p>
      </div>
      <svg
        className="concept-svg concept-svg--nn"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Interactive neural network diagram"
      >
        {edges.map((edge) => {
          const active = forwardActive && pulseEdge === edge.id;
          const strokeWidth = 1 + Math.abs(edge.w) * 2.5;
          const opacity = 0.25 + Math.abs(edge.w) * 0.45;
          return (
            <g key={edge.id}>
              <line
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                className={`nn-edge${active ? " is-flowing" : ""}`}
                strokeWidth={strokeWidth}
                strokeOpacity={opacity}
                onClick={() => {
                  setWeights((prev) => ({
                    ...prev,
                    [edge.id]: Number((prev[edge.id] + (Math.random() > 0.5 ? 0.2 : -0.2)).toFixed(2)),
                  }));
                }}
              />
              {active ? (
                <circle className="nn-flow-dot" r="4">
                  <animateMotion
                    dur="0.35s"
                    repeatCount="1"
                    path={`M${edge.x1},${edge.y1} L${edge.x2},${edge.y2}`}
                  />
                </circle>
              ) : null}
            </g>
          );
        })}
        {LAYERS.map((layer, layerIndex) =>
          Array.from({ length: layer.nodes }, (_, nodeIndex) => (
            <g key={`${layer.id}-${nodeIndex}`}>
              <circle
                className={`nn-node nn-node--${layer.id}${forwardActive && layer.id === "output" && pulseEdge?.startsWith("h") ? " is-lit" : ""}`}
                cx={layerX(layerIndex)}
                cy={nodeY(layerIndex, nodeIndex, layer.nodes)}
                r={NODE_R}
              />
              <text
                className="nn-node-label"
                x={layerX(layerIndex)}
                y={nodeY(layerIndex, nodeIndex, layer.nodes) + 4}
                textAnchor="middle"
              >
                {layer.id === "input" ? `x${nodeIndex + 1}` : layer.id === "output" ? `y${nodeIndex + 1}` : `h${nodeIndex + 1}`}
              </text>
            </g>
          ))
        )}
        {LAYERS.map((layer, layerIndex) => (
          <text
            key={`label-${layer.id}`}
            className="nn-layer-label"
            x={layerX(layerIndex)}
            y={H - 4}
            textAnchor="middle"
          >
            {layer.label}
          </text>
        ))}
      </svg>
      <div className="concept-card-actions">
        <button type="button" className="concept-btn" onClick={runForwardPass}>
          ▶ Forward pass
        </button>
        <button type="button" className="concept-btn concept-btn--ghost" onClick={shuffleWeights}>
          Shuffle weights
        </button>
      </div>
    </div>
  );
}
