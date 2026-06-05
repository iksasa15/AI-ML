import { getCodeExampleForSlide } from "../../lib/codeExamples";
import type { SlideRecord } from "../../lib/slideMarkup";
import type { UiStrings } from "../../lib/uiStrings";
import { CodeRunner } from "./CodeRunner";

type LiveCodeSlotProps = {
  slide: SlideRecord;
  ui: UiStrings;
};

export function LiveCodeSlot({ slide, ui }: LiveCodeSlotProps) {
  const example = getCodeExampleForSlide(slide);
  if (!example) return null;
  return <CodeRunner example={example} ui={ui} />;
}
