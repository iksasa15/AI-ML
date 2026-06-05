type TakeawaySlideProps = {
  bullets: string[];
  reflectionQuestion?: string;
};

export function TakeawaySlide({ bullets, reflectionQuestion }: TakeawaySlideProps) {
  const topThree = bullets.slice(0, 3);

  return (
    <div className="takeaway-slide">
      <header className="takeaway-head">
        <p className="takeaway-eyebrow">TAKEAWAYS</p>
        <h2 className="takeaway-title">3 Ideas to Keep</h2>
      </header>
      <ol className="takeaway-list">
        {topThree.map((item, index) => (
          <li key={`${index}-${item.slice(0, 24)}`} className="takeaway-item">
            <span className="takeaway-number">{index + 1}</span>
            <span className="takeaway-text">{item}</span>
          </li>
        ))}
      </ol>
      {reflectionQuestion ? (
        <div className="takeaway-reflection">
          <p className="takeaway-reflection-label">Think about it</p>
          <p className="takeaway-reflection-question">{reflectionQuestion}</p>
        </div>
      ) : null}
    </div>
  );
}
