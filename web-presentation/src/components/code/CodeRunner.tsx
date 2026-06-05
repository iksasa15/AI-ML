import { python } from "@codemirror/lang-python";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CodeExample } from "../../lib/codeExamples";
import { isPyodideLoaded, runPythonCode } from "../../lib/pyodideRunner";
import type { UiStrings } from "../../lib/uiStrings";

type CodeRunnerProps = {
  example: CodeExample;
  ui: UiStrings;
};

type RunState = "idle" | "loading" | "running" | "done" | "error";

export function CodeRunner({ example, ui }: CodeRunnerProps) {
  const t = ui.codeRunner;
  const editorHostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const initialCodeRef = useRef(example.code);

  const [code, setCode] = useState(example.code);
  const [output, setOutput] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [statusLine, setStatusLine] = useState("");
  const [warnDismissed, setWarnDismissed] = useState(() => {
    try {
      return localStorage.getItem("ml-pyodide-warn-dismissed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    initialCodeRef.current = example.code;
    setCode(example.code);
    setOutput("");
    setRunState("idle");
    setStatusLine("");
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: example.code },
      });
    }
  }, [example.id, example.code]);

  useEffect(() => {
    const host = editorHostRef.current;
    if (!host) return;

    const state = EditorState.create({
      doc: example.code,
      extensions: [
        lineNumbers(),
        python(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          "&": {
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono)",
          },
          ".cm-scroller": {
            minHeight: "180px",
            maxHeight: "280px",
          },
          ".cm-content": {
            padding: "0.65rem 0",
          },
          ".cm-gutters": {
            backgroundColor: "var(--card-2)",
            borderRight: "1px solid var(--border)",
          },
        }),
      ],
    });

    const view = new EditorView({ state, parent: host });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [example.id]);

  const dismissWarning = useCallback(() => {
    setWarnDismissed(true);
    try {
      localStorage.setItem("ml-pyodide-warn-dismissed", "1");
    } catch {
      /* ignore */
    }
  }, []);

  const handleRun = useCallback(async () => {
    setRunState("loading");
    setOutput("");
    setStatusLine(t.statusLoadingRuntime);

    const result = await runPythonCode(code, (status) => {
      if (status === "loading-runtime") setStatusLine(t.statusLoadingRuntime);
      if (status === "loading-numpy") setStatusLine(t.statusLoadingPackages);
      if (status === "running") setStatusLine(t.statusRunning);
    });

    const chunks: string[] = [];
    if (result.stdout) chunks.push(result.stdout);
    if (result.stderr) chunks.push(result.stderr);
    if (result.error) chunks.push(`Error: ${result.error}`);

    setOutput(chunks.join("\n") || t.outputEmpty);
    setRunState(result.error ? "error" : "done");
    setStatusLine("");
  }, [code, t]);

  const handleReset = useCallback(() => {
    const original = initialCodeRef.current;
    setCode(original);
    setOutput("");
    setRunState("idle");
    setStatusLine("");
    viewRef.current?.dispatch({
      changes: { from: 0, to: viewRef.current.state.doc.length, insert: original },
    });
  }, []);

  const showWarning = !warnDismissed && !isPyodideLoaded();

  return (
    <div className="code-runner" dir="ltr" lang="en">
      <div className="code-runner-head">
        <div>
          <h3 className="code-runner-title">{example.title}</h3>
          <p className="code-runner-meta">
            {example.sectionTag} · {example.language}
          </p>
        </div>
        <div className="code-runner-actions">
          <button
            type="button"
            className="code-runner-btn code-runner-btn--primary"
            onClick={handleRun}
            disabled={runState === "loading" || runState === "running"}
          >
            ▶ {t.run}
          </button>
          <button type="button" className="code-runner-btn" onClick={handleReset}>
            {t.reset}
          </button>
        </div>
      </div>

      {showWarning ? (
        <div className="code-runner-warning" role="status">
          <span>{t.pyodideWarning}</span>
          <button type="button" className="code-runner-warn-dismiss" onClick={dismissWarning}>
            {t.dismissWarning}
          </button>
        </div>
      ) : null}

      <div className="code-runner-editor" ref={editorHostRef} />

      {(runState === "loading" || runState === "running") && statusLine ? (
        <p className="code-runner-status">{statusLine}</p>
      ) : null}

      <div className="code-runner-output-wrap">
        <div className="code-runner-output-label">{t.output}</div>
        <pre className={`code-runner-output${runState === "error" ? " is-error" : ""}`}>
          {output || (runState === "idle" ? t.outputPlaceholder : "")}
        </pre>
      </div>
    </div>
  );
}
