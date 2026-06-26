type BulletItemProps = {
  text: string;
  html?: string;
  icon?: string;
};

export function BulletItem({ text, html }: BulletItemProps) {
  return (
    <li>
      {html ? (
        <span className="notranslate" translate="no" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span className="slide-bullet-text">{text}</span>
      )}
    </li>
  );
}
