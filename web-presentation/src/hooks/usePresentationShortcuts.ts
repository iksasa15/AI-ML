import { useEffect } from "react";
import { arrowKeyToAction } from "../lib/rtlNavigation";

type ShortcutHandlers = {
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onToggleNotes: () => void;
  onOpenPresenter?: () => void;
  onToggleQuiz: () => void;
  onEscape: () => void;
  rtlNav?: boolean;
  enabled?: boolean;
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function usePresentationShortcuts(handlers: ShortcutHandlers) {
  const { enabled = true, rtlNav = false } = handlers;

  useEffect(() => {
    if (!enabled) return;

    const onKey = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      if (event.key === "Escape") {
        handlers.onEscape();
        return;
      }

      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        handlers.onNext();
        return;
      }

      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        handlers.onToggleFullscreen();
        return;
      }

      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        handlers.onToggleNotes();
        return;
      }

      if (event.key === "p" || event.key === "P") {
        event.preventDefault();
        handlers.onOpenPresenter?.();
        return;
      }

      if (event.key === "q" || event.key === "Q") {
        event.preventDefault();
        handlers.onToggleQuiz();
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const action = arrowKeyToAction(event.key, rtlNav);
        if (action === "next") handlers.onNext();
        else handlers.onPrev();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handlers, enabled, rtlNav]);
}
