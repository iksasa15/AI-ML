import { useEffect, useState } from "react";
import type { SlideRecord } from "../../lib/slideMarkup";
import { subscribePresenter } from "../../lib/presenterSync";
import { getSpeakerNote, writeSpeakerNoteOverride } from "../../lib/speakerNotes";
import type { DeckScope } from "../../lib/traineeProgress";
import type { UiStrings } from "../../lib/uiStrings";

type SpeakerNotesPanelProps = {
  open: boolean;
  ui: UiStrings;
  slide: SlideRecord | undefined;
  slideIndex: number;
  deckScope: DeckScope;
  onClose: () => void;
};

export function SpeakerNotesPanel({
  open,
  ui,
  slide,
  slideIndex,
  deckScope,
  onClose,
}: SpeakerNotesPanelProps) {
  const [draft, setDraft] = useState("");
  const resolved = getSpeakerNote(slide, deckScope, slideIndex);

  useEffect(() => {
    if (open) setDraft(resolved);
  }, [open, resolved, slideIndex]);

  useEffect(() => {
    return subscribePresenter(
      () => {},
      (patch) => {
        if (patch.deckScope === deckScope && patch.slideIndex === slideIndex) {
          setDraft(patch.text);
        }
      }
    );
  }, [deckScope, slideIndex]);

  if (!open) return null;

  const save = () => {
    writeSpeakerNoteOverride(deckScope, slideIndex, draft);
  };

  return (
    <div className="trainer-panel trainer-panel--notes" role="dialog" aria-label={ui.nav.speakerNotes}>
      <div className="trainer-panel-head">
        <div>
          <h3>{ui.nav.speakerNotes}</h3>
          <p className="trainer-panel-sub" dir="ltr" lang="en">
            {String(slide?.title || "")}
          </p>
        </div>
        <button type="button" className="trainer-panel-close" onClick={onClose} aria-label={ui.close}>
          ✕
        </button>
      </div>
      <div className="trainer-panel-body trainer-panel-body--notes">
        {resolved || draft ? null : (
          <p className="trainer-panel-empty">{ui.nav.speakerNotesEmpty}</p>
        )}
        <textarea
          className="trainer-notes-editor"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          placeholder={ui.presenter.notesPlaceholder}
          dir="auto"
          rows={5}
        />
        <p className="trainer-notes-hint">{ui.presenter.notesAutoSave}</p>
      </div>
    </div>
  );
}
