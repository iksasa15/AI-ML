import { useMemo, useState } from "react";

const TOKENS = ["The", "cat", "sat", "on", "mat"];

/** Demo attention weights — row i attends to columns */
const ATTENTION: number[][] = [
  [0.55, 0.2, 0.1, 0.08, 0.07],
  [0.15, 0.5, 0.15, 0.1, 0.1],
  [0.08, 0.22, 0.45, 0.15, 0.1],
  [0.05, 0.1, 0.2, 0.25, 0.4],
  [0.1, 0.15, 0.1, 0.2, 0.45],
];

function heatColor(weight: number, active: boolean): string {
  const alpha = active ? 0.35 + weight * 0.65 : 0.08 + weight * 0.35;
  return `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
}

export function AttentionHeatmap() {
  const [activeRow, setActiveRow] = useState(2);

  const colHighlights = useMemo(() => ATTENTION[activeRow] ?? [], [activeRow]);

  return (
    <div className="concept-card concept-card--attn">
      <div className="concept-card-head">
        <h3>Attention Heatmap</h3>
        <p>How each token attends to others — click a row to inspect</p>
      </div>
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
                  <button
                    type="button"
                    className={`attn-row-btn${activeRow === rowIndex ? " is-active" : ""}`}
                    onClick={() => setActiveRow(rowIndex)}
                  >
                    {rowToken}
                  </button>
                </th>
                {ATTENTION[rowIndex].map((weight, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`attn-cell${activeRow === rowIndex ? " is-row-active" : ""}${colHighlights[colIndex] === Math.max(...colHighlights) && activeRow === rowIndex ? " is-peak" : ""}`}
                    style={{ backgroundColor: heatColor(weight, activeRow === rowIndex) }}
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
      <p className="concept-caption" dir="ltr" lang="en">
        Query: <strong>{TOKENS[activeRow]}</strong> — darker cells = stronger attention
      </p>
    </div>
  );
}
