import { useCallback, useEffect, useRef, useState } from "react";

const TIMER_STORAGE_KEY = "ml-presentation-presenter-timer";

type TimerSnapshot = {
  startedAt: number;
  pausedAt: number | null;
  accumulatedMs: number;
};

function readSnapshot(): TimerSnapshot {
  try {
    const raw = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!raw) return { startedAt: Date.now(), pausedAt: null, accumulatedMs: 0 };
    const parsed = JSON.parse(raw) as TimerSnapshot;
    if (!parsed?.startedAt) return { startedAt: Date.now(), pausedAt: null, accumulatedMs: 0 };
    return parsed;
  } catch {
    return { startedAt: Date.now(), pausedAt: null, accumulatedMs: 0 };
  }
}

function writeSnapshot(snapshot: TimerSnapshot) {
  try {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }
}

export function formatTimerMs(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function elapsedMs(snapshot: TimerSnapshot, now: number): number {
  if (snapshot.pausedAt !== null) {
    return snapshot.accumulatedMs + (snapshot.pausedAt - snapshot.startedAt);
  }
  return snapshot.accumulatedMs + (now - snapshot.startedAt);
}

export function usePresenterTimer() {
  const snapshotRef = useRef<TimerSnapshot>(readSnapshot());
  const [elapsed, setElapsed] = useState(() => elapsedMs(snapshotRef.current, Date.now()));
  const [paused, setPaused] = useState(() => snapshotRef.current.pausedAt !== null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setElapsed(elapsedMs(snapshotRef.current, Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [paused]);

  const persist = useCallback((next: TimerSnapshot) => {
    snapshotRef.current = next;
    writeSnapshot(next);
    setElapsed(elapsedMs(next, Date.now()));
    setPaused(next.pausedAt !== null);
  }, []);

  const togglePause = useCallback(() => {
    const now = Date.now();
    const cur = snapshotRef.current;
    if (cur.pausedAt !== null) {
      persist({
        startedAt: now,
        pausedAt: null,
        accumulatedMs: cur.accumulatedMs + (cur.pausedAt - cur.startedAt),
      });
      return;
    }
    persist({
      ...cur,
      pausedAt: now,
    });
  }, [persist]);

  const reset = useCallback(() => {
    persist({ startedAt: Date.now(), pausedAt: null, accumulatedMs: 0 });
  }, [persist]);

  return {
    elapsed,
    formatted: formatTimerMs(elapsed),
    paused,
    togglePause,
    reset,
  };
}
