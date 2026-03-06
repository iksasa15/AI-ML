const presentationData = {
  title: "Machine Learning Course",
  slides: [
    {
      title: "The Machine Learning Process",
      subtitle: "The 3 Main Steps",
      type: "three-columns",
      columns: [
        {
          heading: "Step 1: Data Pre-Processing",
          bullets: [
            "Import the data",
            "Clean the data",
            "Split into training and test sets",
            "Feature scaling",
          ],
        },
        {
          heading: "Step 2: Modelling",
          bullets: [
            "Build the model",
            "Train the model",
            "Make predictions",
          ],
        },
        {
          heading: "Step 3: Evaluation",
          bullets: [
            "Calculate performance metrics",
            "Make a final prediction",
          ],
        },
      ],
    },
    {
      title: "Training Set & Test Set",
      subtitle: "Key Idea",
      imageUrl:
        "https://miro.medium.com/v2/resize:fit:1160/format:webp/1*OECM6SWmlhVzebmSuvMtBg.png",
      imageAlt: "Training Set and Test Set",
      bullets: [
        "Training Set: Data used by the model to learn patterns.",
        "Test Set: New, unseen data used to check model performance.",
      ],
      note: "We train on one part of the data, then test on another part to make sure the model generalizes well.",
    },
    {
      title: "Feature Scaling",
      subtitle: "What is Feature Scaling?",
      body: "Feature scaling means adjusting feature values to a similar range using methods like standardization and normalization.",
      bullets: [
        "It prevents large-value features from dominating smaller-value features.",
        "It improves performance for distance-based and gradient-based algorithms (e.g., KNN, SVM, Gradient Descent).",
        "It helps training converge faster.",
      ],
      table: {
        title: "Example (Before vs After Scaling)",
        headers: [
          "Student",
          "Height (cm) - Before",
          "Weight (kg) - Before",
          "Height (Scaled)",
          "Weight (Scaled)",
        ],
        rows: [
          ["A", "150", "50", "0.25", "0.22"],
          ["B", "170", "70", "0.58", "0.67"],
          ["C", "185", "85", "0.83", "1.00"],
        ],
      },
      note: "Before scaling, height and weight have different numeric ranges. After scaling, both features are on a comparable scale and contribute more fairly.",
    },
    {
      title: "Feature Scaling Methods",
      sections: [
        {
          heading: "1) Normalization (Min-Max Scaling)",
          body: "Normalization transforms each value to a range between 0 and 1.",
          formula: "x_norm = (x - x_min) / (x_max - x_min)",
          bullets: [
            "Useful for models that depend on distances or absolute magnitudes.",
            "Common choice for algorithms such as KNN and K-Means.",
          ],
        },
        {
          heading: "2) Standardization (Z-score Scaling)",
          body: "Standardization centers data around 0 with a standard deviation of 1.",
          formula: "z = (x - mu) / sigma",
          bullets: [
            "mu = mean of the feature, sigma = standard deviation of the feature.",
            "Preferred when features are close to a Gaussian distribution.",
            "Works well with Logistic Regression, SVM, and Linear Regression.",
          ],
        },
      ],
    },
    {
      title: "Feature Scaling Example (Normalization)",
      body: "Given feature values: [20, 40, 60, 80, 100]",
      bullets: [
        "x_min = 20",
        "x_max = 100",
        "Formula: x_norm = (x - x_min) / (x_max - x_min)",
      ],
      table: {
        title: "Before vs After Normalization",
        headers: ["Original Value (x)", "Normalized Value (x_norm)"],
        rows: [
          ["20", "0.00"],
          ["40", "0.25"],
          ["60", "0.50"],
          ["80", "0.75"],
          ["100", "1.00"],
        ],
      },
      note: "This table shows how all values are scaled to the range [0, 1].",
    },
  ],
};

const deckTitle = document.getElementById("deck-title");
const slideContainer = document.getElementById("slide-container");
const currentSlideEl = document.getElementById("current-slide");
const totalSlidesEl = document.getElementById("total-slides");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dotsContainer = document.getElementById("dots");
const downloadPdfBtn = document.getElementById("download-pdf-btn");
const printContainer = document.getElementById("print-container");

let currentIndex = 0;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildSlideMarkup(slide) {
  if (slide.type === "three-columns") {
    const columnsHTML = (slide.columns || [])
      .map((col) => {
        const colBullets = (col.bullets || [])
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join("");
        return `
          <article class="step-card">
            <h3>${escapeHTML(col.heading || "")}</h3>
            <ul>${colBullets}</ul>
          </article>
        `;
      })
      .join("");

    return `
      <h2>${escapeHTML(slide.title)}</h2>
      ${slide.subtitle ? `<p>${escapeHTML(slide.subtitle)}</p>` : ""}
      <div class="steps-grid">${columnsHTML}</div>
    `;
  }

  const bulletsHTML = (slide.bullets || [])
    .map((item) => `<li>${escapeHTML(item)}</li>`)
    .join("");

  const sectionsHTML = (slide.sections || [])
    .map((section) => {
      const sectionBullets = (section.bullets || [])
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("");
      return `
        <article class="content-card">
          <h3>${escapeHTML(section.heading || "")}</h3>
          ${section.body ? `<p>${escapeHTML(section.body)}</p>` : ""}
          ${section.formula ? `<pre class="formula">${escapeHTML(section.formula)}</pre>` : ""}
          ${sectionBullets ? `<ul>${sectionBullets}</ul>` : ""}
        </article>
      `;
    })
    .join("");

  const tableHTML = slide.table
    ? `
      <div class="table-wrap">
        ${slide.table.title ? `<h3>${escapeHTML(slide.table.title)}</h3>` : ""}
        <table>
          <thead>
            <tr>
              ${(slide.table.headers || [])
                .map((header) => `<th>${escapeHTML(header)}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${(slide.table.rows || [])
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `
    : "";

  const imageHTML = slide.imageUrl
    ? `
      <figure class="slide-image">
        <img src="${escapeHTML(slide.imageUrl)}" alt="${escapeHTML(slide.imageAlt || "slide image")}" />
      </figure>
    `
    : "";

  return `
    <h2>${escapeHTML(slide.title)}</h2>
    ${slide.subtitle ? `<p>${escapeHTML(slide.subtitle)}</p>` : ""}
    ${slide.body ? `<p>${escapeHTML(slide.body)}</p>` : ""}
    ${imageHTML}
    ${bulletsHTML ? `<ul>${bulletsHTML}</ul>` : ""}
    ${sectionsHTML ? `<div class="content-sections">${sectionsHTML}</div>` : ""}
    ${tableHTML}
    ${slide.note ? `<p class="note-box">${escapeHTML(slide.note)}</p>` : ""}
  `;
}

function renderPrintDeck() {
  const allSlidesHTML = presentationData.slides
    .map((slide) => {
      return `<section class="slide print-slide">${buildSlideMarkup(slide)}</section>`;
    })
    .join("");

  printContainer.innerHTML = allSlidesHTML;
}

function renderSlide() {
  const slide = presentationData.slides[currentIndex];
  slideContainer.innerHTML = buildSlideMarkup(slide);

  currentSlideEl.textContent = String(currentIndex + 1);
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === presentationData.slides.length - 1;

  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function buildDots() {
  dotsContainer.innerHTML = "";
  presentationData.slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `اذهب للشريحة ${index + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = index;
      renderSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function goNext() {
  if (currentIndex < presentationData.slides.length - 1) {
    currentIndex += 1;
    renderSlide();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderSlide();
  }
}

function init() {
  deckTitle.textContent = presentationData.title;
  totalSlidesEl.textContent = String(presentationData.slides.length);
  buildDots();
  renderSlide();

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
  downloadPdfBtn.addEventListener("click", () => {
    renderPrintDeck();
    window.print();
  });

  window.addEventListener("beforeprint", renderPrintDeck);
  window.addEventListener("afterprint", () => {
    printContainer.innerHTML = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      goNext();
    }
    if (event.key === "ArrowLeft") {
      goPrev();
    }
  });
}

init();
