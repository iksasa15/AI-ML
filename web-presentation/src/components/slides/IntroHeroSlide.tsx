import { AmpersandText } from "../ui/AmpersandText";

type IntroHeroSlideProps = {
  title: string;
  subtitle?: string;
  isActive?: boolean;
};

export function IntroHeroSlide({ title, subtitle }: IntroHeroSlideProps) {
  return (
    <div className="intro-hero">
      <p className="intro-hero-eyebrow">
        <AmpersandText text="AI & Machine Learning Bootcamp" />
      </p>
      <h2 className="intro-hero-title">
        <AmpersandText text={title} />
      </h2>
      {subtitle ? <p className="intro-hero-subtitle">{subtitle}</p> : null}
      <div className="intro-hero-accent" aria-hidden="true" />
    </div>
  );
}
