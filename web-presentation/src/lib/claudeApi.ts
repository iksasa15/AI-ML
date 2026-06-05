export const CLAUDE_API_KEY_STORAGE = "ml-presentation-claude-api-key";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export function readClaudeApiKey(): string {
  try {
    return localStorage.getItem(CLAUDE_API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export function writeClaudeApiKey(key: string): void {
  try {
    if (key.trim()) localStorage.setItem(CLAUDE_API_KEY_STORAGE, key.trim());
    else localStorage.removeItem(CLAUDE_API_KEY_STORAGE);
  } catch {
    /* ignore quota errors */
  }
}

type ClaudeMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function callClaude(options: {
  apiKey: string;
  system: string;
  messages: ClaudeMessage[];
}): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": options.apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      system: options.system,
      messages: options.messages,
    }),
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { error?: { message?: string } };
      detail = body.error?.message || detail;
    } catch {
      /* use status text */
    }
    throw new Error(detail || `API error ${response.status}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  const text = (data.content || [])
    .filter((block) => block.type === "text" && block.text)
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (!text) throw new Error("Empty response from Claude API");
  return text;
}

export type AiMode = "explain" | "qa";

export function buildAiSystemPrompt(mode: AiMode, uiLang: "ar" | "en"): string {
  const langHint =
    uiLang === "ar"
      ? "Respond in Arabic when the trainee writes in Arabic; otherwise use clear English."
      : "Use clear, simple English.";

  if (mode === "explain") {
    return `You are a patient ML bootcamp tutor. Explain the slide content in simpler language for mixed beginners. ${langHint} Keep it under 200 words. Use short paragraphs or bullets.`;
  }
  return `You are an ML bootcamp teaching assistant. Answer using ONLY the slide context provided. If unsure, say so. ${langHint}`;
}

export function buildAiUserPrompt(
  mode: AiMode,
  slideText: string,
  question?: string
): string {
  if (mode === "explain") {
    return `Explain this slide more simply:\n\n${slideText}`;
  }
  return `Slide context:\n${slideText}\n\nTrainee question:\n${question || ""}`;
}
