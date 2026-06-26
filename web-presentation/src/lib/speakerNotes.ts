import type { SlideRecord } from "./slideMarkup";
import type { DeckScope } from "./traineeProgress";
import { broadcastPresenterNote } from "./presenterSync";

const STORAGE_PREFIX = "ml-presentation-speaker-note-overrides";

export type SpeakerNoteOverrides = Record<string, string>;

function storageKey(scope: DeckScope): string {
  return `${STORAGE_PREFIX}:${scope}`;
}

export function noteOverrideKey(slideIndex: number): string {
  return String(slideIndex);
}

export function readSpeakerNoteOverrides(scope: DeckScope): SpeakerNoteOverrides {
  try {
    const raw = localStorage.getItem(storageKey(scope));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SpeakerNoteOverrides;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeSpeakerNoteOverride(scope: DeckScope, slideIndex: number, text: string) {
  try {
    const store = readSpeakerNoteOverrides(scope);
    const key = noteOverrideKey(slideIndex);
    if (text.trim()) {
      store[key] = text;
    } else {
      delete store[key];
    }
    localStorage.setItem(storageKey(scope), JSON.stringify(store));
    broadcastPresenterNote({ deckScope: scope, slideIndex, text });
    return store;
  } catch {
    return null;
  }
}

export function resetSpeakerNoteOverrides(scope: DeckScope) {
  try {
    localStorage.removeItem(storageKey(scope));
  } catch {
    /* ignore */
  }
}

/** Default trainer note from slide data (not local edits). */
export function getDefaultSpeakerNote(slide: SlideRecord | undefined): string {
  if (!slide) return "";
  const speaker = slide.speakerNote;
  if (typeof speaker === "string" && speaker.trim()) return speaker.trim();
  const note = slide.note;
  if (typeof note === "string" && note.trim()) return note.trim();
  return "";
}

export function getSpeakerNote(
  slide: SlideRecord | undefined,
  scope: DeckScope,
  slideIndex: number,
  overrides?: SpeakerNoteOverrides
): string {
  const store = overrides ?? readSpeakerNoteOverrides(scope);
  const override = store[noteOverrideKey(slideIndex)];
  if (typeof override === "string") return override;
  return getDefaultSpeakerNote(slide);
}

export function generateSpeakerNote(slide: SlideRecord): string {
  if (slide.type === "section-divider" || slide.type === "chapter-divider") {
    const topic = String(slide.subtitle || slide.title || "this section");
    return `Open ${topic}: state learning goals, timing, and how it connects to prior sessions. Preview the 2–3 ideas trainees must leave with.`;
  }

  const title = String(slide.title || "this slide");
  const bullets = Array.isArray(slide.bullets) ? slide.bullets.map(String) : [];
  const columns = Array.isArray(slide.columns)
    ? (slide.columns as { heading?: string; bullets?: string[] }[])
    : [];

  if (typeof slide.note === "string" && slide.note.trim()) {
    return slide.note.trim();
  }

  if (bullets.length >= 2) {
    return `Cover "${title}". Emphasize: ${bullets[0]}; then ${bullets[1]}. Pause for a quick check-in before moving on.`;
  }

  if (bullets.length === 1) {
    return `Cover "${title}". Key point: ${bullets[0]}. Ask one application question from the room.`;
  }

  if (columns.length > 0) {
    const heads = columns
      .map((c) => c.heading)
      .filter(Boolean)
      .slice(0, 2)
      .join(" and ");
    return `Walk through "${title}" column by column${heads ? ` (${heads})` : ""}. Keep pace — one minute per column unless discussion heats up.`;
  }

  if (typeof slide.body === "string" && slide.body.trim()) {
    const snippet = slide.body.trim().slice(0, 120);
    return `Explain "${title}": ${snippet}${slide.body.length > 120 ? "…" : ""}`;
  }

  return `Present "${title}". Tie back to the section objective and invite one question before advancing.`;
}
