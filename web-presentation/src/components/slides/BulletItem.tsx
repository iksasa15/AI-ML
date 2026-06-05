import { SlideIcon } from "../icons/SlideIcon";
import { isSlideIconId } from "../../lib/slideIconKeys";

type BulletItemProps = {
  text: string;
  html?: string;
  icon?: string;
};

export function BulletItem({ text, html, icon }: BulletItemProps) {
  const showIcon = icon && isSlideIconId(icon);

  return (
    <li className={showIcon ? "slide-bullet-item slide-bullet-item--icon" : undefined}>
      {showIcon ? (
        <span className="slide-bullet-icon-wrap" aria-hidden="true">
          <SlideIcon id={icon} size="sm" />
        </span>
      ) : null}
      {html ? (
        <span className="notranslate" translate="no" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span className="slide-bullet-text">{text}</span>
      )}
    </li>
  );
}
