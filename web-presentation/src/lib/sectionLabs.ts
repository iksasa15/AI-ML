const REPO = "https://github.com/iksasa15/AI-ML/tree/main";

export type LabLink = {
  label: string;
  href: string;
};

export function getSectionLabs(sectionId: number): LabLink[] {
  switch (sectionId) {
    case 1:
      return [
        {
          label: "Simple Linear Regression",
          href: `${REPO}/code/1-%20Simple%20linear%20regression`,
        },
      ];
    case 2:
      return [
        {
          label: "Multi-Linear Regression",
          href: `${REPO}/code/2-%20Multi-Linear%20Regression`,
        },
        {
          label: "Polynomial Regression",
          href: `${REPO}/code/3-%20Polynomial%20Linear%20Regression`,
        },
      ];
    case 3:
      return [
        {
          label: "Logistic Regression",
          href: `${REPO}/code/9-%20Logistic%20Regression`,
        },
        {
          label: "K-Nearest Neighbors",
          href: `${REPO}/code/10-%20K-Nearest%20Neighbors`,
        },
      ];
    case 4:
      return [
        { label: "Naive Bayes", href: `${REPO}/code/12-%20Naive_Bayes` },
        { label: "Decision Tree", href: `${REPO}/code/13-%20Decision_Tree` },
        { label: "Random Forest", href: `${REPO}/code/14-%20random_forest` },
      ];
    case 5:
      return [{ label: "SVM", href: `${REPO}/code/11-%20SVM` }];
    case 6:
      return [
        {
          label: "Clustering & PCA (slides)",
          href: `${REPO}/web-presentation/src/data/slides/section06-clustering-pca.js`,
        },
      ];
    case 7:
      return [
        {
          label: "Deep Learning labs (7 notebooks)",
          href: `${REPO}/code/15-%20Deep%20Learning`,
        },
        {
          label: "DL topics guide (Arabic)",
          href: `${REPO}/web-presentation/deep-learning-topics.md`,
        },
      ];
    case 14:
      return [
        {
          label: "NLP fundamentals (S8–S12 alternative)",
          href: `${REPO}/web-presentation/README.md#%D9%82%D8%B3%D9%85-%D8%AE%D8%A7%D8%B5-day-1-nlp`,
        },
      ];
    default:
      return [];
  }
}

export function getGlobalResourceLinks(): LabLink[] {
  return [
    { label: "All code labs", href: `${REPO}/code` },
    {
      label: "12-month learning roadmap",
      href: `${REPO}/web-presentation/ai-learning-roadmap-12months.md`,
    },
    {
      label: "Deep learning topics (Arabic)",
      href: `${REPO}/web-presentation/deep-learning-topics.md`,
    },
  ];
}
