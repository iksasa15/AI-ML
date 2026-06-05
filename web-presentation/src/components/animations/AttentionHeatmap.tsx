import { useMemo } from "react";
import { ConceptDiagramCard } from "./ConceptDiagramCard";

const TOKENS = ["The", "cat", "sat", "on", "mat"];

const ATTENTION: number[][] = [
  [0.55, 0.2, 0.1, 0.08, 0.07],
  [0.15, 0.5, 0.15, 0.1, 0.1],
  [0.08, 0.22, 0.45, 0.15, 0.1],
  [0.05, 0.1, 0.2, 0.25, 0.4],
  [0.1, 0.15, 0.1, 0.2, 0.45],
];

function heatColor(weight: number): string {
  const alpha = 0.12 + weight * 0.75;
  return `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
}

export function AttentionHeatmap() {
  const peakCells = useMemo(
    () =>
      ATTENTION.map((row) => {
        const max = Math.max(...row);
        return row.map((w) => w === max);
      }),
    []
  );

  return (
    <ConceptDiagramCard
      title="Attention Heatmap"
      subtitle="How each token attends to others"
      caption="Darker cells = stronger attention weight"
    >
      <div className="attn-matrix-wrap">
        <table className="attn-matrix">
          <thead>
            <tr>
              <th />
              {TOKENS.map((token) => (
                <th key={token} dir="ltr" lang="en">
                  {token}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOKENS.map((rowToken, rowIndex) => (
              <tr key={rowToken}>
                <th dir="ltr" lang="en">
                  {rowToken}
                </th>
                {ATTENTION[rowIndex].map((weight, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`attn-cell${peakCells[rowIndex][colIndex] ? " is-peak" : ""}`}
                    style={{ backgroundColor: heatColor(weight) }}
                    title={`${rowToken} → ${TOKENS[colIndex]}: ${(weight * 100).toFixed(0)}%`}
                  >
                    {(weight * 100).toFixed(0)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ConceptDiagramCard>
  );
}
