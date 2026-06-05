import { useCallback, useState } from "react";
import {
  buildAiSystemPrompt,
  buildAiUserPrompt,
  callClaude,
  readClaudeApiKey,
  type AiMode,
} from "../../lib/claudeApi";
import { slideToPlainText } from "../../lib/slideToText";
import type { SlideRecord } from "../../lib/slideMarkup";
import type { UiStrings } from "../../lib/uiStrings";

type AiAssistantPanelProps = {
  open: boolean;
  ui: UiStrings;
  slide: SlideRecord | undefined;
  slideIndex: number;
  uiLang: "ar" | "en";
  onClose: () => void;
  onOpenSettings: () => void;
};

export function AiAssistantPanel({
  open,
  ui,
  slide,
  slideIndex,
  uiLang,
  onClose,
  onOpenSettings,
}: AiAssistantPanelProps) {
  const t = ui.ai;
  const [mode, setMode] = useState<AiMode>("explain");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAi = useCallback(async () => {
    const apiKey = readClaudeApiKey();
    if (!apiKey) {
      setError(t.noApiKey);
      return;
    }
    if (mode === "qa" && !question.trim()) {
      setError(t.questionRequired);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const slideText = slideToPlainText(slide, slideIndex);
      const text = await callClaude({
        apiKey,
        system: buildAiSystemPrompt(mode, uiLang),
        messages: [
          {
            role: "user",
            content: buildAiUserPrompt(mode, slideText, question),
          },
        ],
      });
      setResponse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }, [mode, question, slide, slideIndex, uiLang, t]);

  if (!open) return null;

  return (
    <div className="trainer-panel trainer-panel--ai" role="dialog" aria-label={t.title}>
      <div className="trainer-panel-head">
        <h2>{t.title}</h2>
        <button type="button" className="trainer-panel-close" onClick={onClose} aria-label={ui.close}>
          ✕
        </button>
      </div>

      <div className="ai-panel-body">
        <div className="ai-mode-tabs" role="tablist">
          {(["explain", "qa", "code"] as AiMode[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={mode === tab}
              className={`ai-mode-tab${mode === tab ? " is-active" : ""}`}
              onClick={() => {
                setMode(tab);
                setResponse("");
                setError(null);
              }}
            >
              {tab === "explain" ? t.explainTab : tab === "qa" ? t.qaTab : t.codeTab}
            </button>
          ))}
        </div>

        <p className="ai-panel-hint">
          {mode === "explain" ? t.explainHint : mode === "qa" ? t.qaHint : t.codeHint}
        </p>

        {mode === "qa" ? (
          <label className="ai-question-label">
            <span>{t.questionLabel}</span>
            <textarea
              className="ai-question-input"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.questionPlaceholder}
            />
          </label>
        ) : null}

        <div className="ai-panel-actions">
          <button type="button" className="quiz-btn" onClick={() => void runAi()} disabled={loading}>
            {loading ? t.loading : t.run}
          </button>
          <button type="button" className="nav-btn" onClick={onOpenSettings}>
            {t.apiKeySettings}
          </button>
        </div>

        {error ? <p className="ai-panel-error" role="alert">{error}</p> : null}

        {response ? (
          <pre className="ai-panel-response" dir="auto">
            {response}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
