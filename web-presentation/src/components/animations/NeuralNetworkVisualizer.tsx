import { useMemo } from "react";
import { ConceptDiagramCard } from "./ConceptDiagramCard";

type Layer = { id: string; label: string; nodes: number };

const LAYERS: Layer[] = [
  { id: "input", label: "Input", nodes: 3 },
  { id: "hidden", label: "Hidden", nodes: 4 },
  { id: "output", label: "Output", nodes: 2 },
];

const DEMO_WEIGHTS: Record<string, number> = {
  "i0-h0": 0.6,
  "i0-h1": -0.3,
  "i0-h2": 0.45,
  "i0-h3": 0.2,
  "i1-h0": -0.5,
  "i1-h1": 0.7,
  "i1-h2": 0.15,
  "i1-h3": -0.4,
  "i2-h0": 0.35,
  "i2-h1": 0.55,
  "i2-h2": -0.25,
  "i2-h3": 0.65,
  "h0-o0": 0.5,
  "h0-o1": -0.35,
  "h1-o0": -0.2,
  "h1-o1": 0.6,
  "h2-o0": 0.4,
  "h2-o1": 0.3,
  "h3-o0": -0.45,
  "h3-o1": 0.55,
};

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
          w: DEMO_WEIGHTS[`i${i}-h${h}`] ?? 0.3,
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
          w: DEMO_WEIGHTS[`h${h}-o${o}`] ?? 0.3,
        });
      }
    }
    return list;
  }, []);

  return (
    <ConceptDiagramCard
      title="Neural Network"
      subtitle="Input → Hidden → Output (forward pass)"
      caption="Edge thickness reflects weight magnitude"
      wrapClass="concept-svg-wrap--nn"
    >
      <svg
        className="concept-svg concept-svg--nn"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Neural network diagram with weighted connections"
      >
        {edges.map((edge) => {
          const strokeWidth = 1 + Math.abs(edge.w) * 2.5;
          const opacity = 0.3 + Math.abs(edge.w) * 0.5;
          return (
            <line
              key={edge.id}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              className="nn-edge"
              strokeWidth={strokeWidth}
              strokeOpacity={opacity}
            />
          );
        })}
        {LAYERS.map((layer, layerIndex) =>
          Array.from({ length: layer.nodes }, (_, nodeIndex) => (
            <g key={`${layer.id}-${nodeIndex}`}>
              <circle
                className={`nn-node nn-node--${layer.id}`}
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
                {layer.id === "input"
                  ? `x${nodeIndex + 1}`
                  : layer.id === "output"
                    ? `y${nodeIndex + 1}`
                    : `h${nodeIndex + 1}`}
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
    </ConceptDiagramCard>
  );
}
