import { ILLUSTRATION_CAPTIONS, isSlideIllustrationId } from "../../lib/slideIllustrations";
import type { SlideRecord } from "../../lib/slideMarkup";
import { IllustrationGraphics } from "./IllustrationGraphics";

type IllustrationSlotProps = {
  slide: SlideRecord;
};

export function IllustrationSlot({ slide }: IllustrationSlotProps) {
  const raw = typeof slide.illustration === "string" ? slide.illustration : "";
  if (!raw || !isSlideIllustrationId(raw)) return null;

  return (
    <figure className="illustration-slot" aria-label={ILLUSTRATION_CAPTIONS[raw]}>
      <IllustrationGraphics id={raw} />
      <figcaption className="illustration-slot-caption">{ILLUSTRATION_CAPTIONS[raw]}</figcaption>
    </figure>
  );
}
