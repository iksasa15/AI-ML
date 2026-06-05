import type { UiLang } from "./uiStrings";
import type { DeckScope } from "./traineeProgress";

export type PresenterState = {
  currentIndex: number;
  deckScope: DeckScope;
  uiLang: UiLang;
  totalSlides: number;
};

export type PresenterNotePatch = {
  deckScope: DeckScope;
  slideIndex: number;
  text: string;
};

type PresenterMessage =
  | { type: "state"; payload: PresenterState }
  | { type: "note"; payload: PresenterNotePatch };

const CHANNEL_NAME = "ml-presentation-presenter";

function getChannel(): BroadcastChannel | null {
  try {
    return new BroadcastChannel(CHANNEL_NAME);
  } catch {
    return null;
  }
}

export function broadcastPresenterState(state: PresenterState) {
  const channel = getChannel();
  if (!channel) return;
  const message: PresenterMessage = { type: "state", payload: state };
  channel.postMessage(message);
  channel.close();
}

export function broadcastPresenterNote(patch: PresenterNotePatch) {
  const channel = getChannel();
  if (!channel) return;
  const message: PresenterMessage = { type: "note", payload: patch };
  channel.postMessage(message);
  channel.close();
}

export function subscribePresenter(
  onState: (state: PresenterState) => void,
  onNote?: (patch: PresenterNotePatch) => void
): () => void {
  const channel = getChannel();
  if (!channel) return () => {};

  const handler = (event: MessageEvent<PresenterMessage>) => {
    const data = event.data;
    if (!data || typeof data !== "object") return;
    if (data.type === "state") onState(data.payload);
    if (data.type === "note" && onNote) onNote(data.payload);
  };

  channel.addEventListener("message", handler);
  return () => {
    channel.removeEventListener("message", handler);
    channel.close();
  };
}

export const PRESENTER_WINDOW_NAME = "ml-presenter-view";

export function buildPresenterWindowUrl(): string {
  const url = new URL(window.location.href);
  url.searchParams.set("presenter", "1");
  return url.toString();
}

export function isPresenterWindow(): boolean {
  return new URLSearchParams(window.location.search).get("presenter") === "1";
}

const STATE_STORAGE_KEY = "ml-presentation-presenter-state";

export function persistPresenterState(state: PresenterState) {
  try {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  broadcastPresenterState(state);
}

export function readPersistedPresenterState(): PresenterState | null {
  try {
    const raw = localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PresenterState;
  } catch {
    return null;
  }
}

export function openPresenterWindow(): Window | null {
  const win = window.open(
    buildPresenterWindowUrl(),
    PRESENTER_WINDOW_NAME,
    "width=1920,height=1080,menubar=no,toolbar=no,location=no,status=no"
  );
  win?.focus();
  return win;
}
