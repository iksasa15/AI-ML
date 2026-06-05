import { Fragment } from "react";
import { hasAmpersand, splitOnAmpersand } from "../../lib/ampersandText";

type AmpersandTextProps = {
  text: string;
  className?: string;
};

export function AmpersandText({ text, className = "text-amp" }: AmpersandTextProps) {
  if (!hasAmpersand(text)) return text;

  const parts = splitOnAmpersand(text);
  return parts.map((part, index) => (
    <Fragment key={`${index}-${part}`}>
      {index > 0 ? (
        <>
          {" "}
          <span className={className} aria-label=" and ">
            &amp;
          </span>{" "}
        </>
      ) : null}
      {part}
    </Fragment>
  ));
}
