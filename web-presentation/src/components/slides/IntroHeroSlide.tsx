import { useEffect, useState } from "react";
import { AmpersandText } from "../ui/AmpersandText";

type IntroHeroSlideProps = {
  title: string;
  subtitle?: string;
  isActive?: boolean;
};

export function IntroHeroSlide({ title, subtitle, isActive = false }: IntroHeroSlideProps) {
  const [visibleChars, setVisibleChars] = useState(isActive ? 0 : title.length);

  useEffect(() => {
    if (!isActive) {
      setVisibleChars(title.length);
      return;
    }

    setVisibleChars(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleChars(index);
      if (index >= title.length) window.clearInterval(timer);
    }, 55);

    return () => window.clearInterval(timer);
  }, [isActive, title]);

  const shown = title.slice(0, visibleChars);
  const cursorOn = isActive && visibleChars < title.length;

  return (
    <div className="intro-hero">
      <p className="intro-hero-eyebrow">
        <AmpersandText text="AI & MACHINE LEARNING BOOTCAMP" />
      </p>
      <h2 className="intro-hero-title" aria-label={title}>
        <span className="intro-hero-title-text">
          <AmpersandText text={shown} />
        </span>
        {cursorOn ? <span className="intro-hero-cursor" aria-hidden="true" /> : null}
      </h2>
      {subtitle ? <p className="intro-hero-subtitle">{subtitle}</p> : null}
      <div className="intro-hero-accent" aria-hidden="true" />
    </div>
  );
}
