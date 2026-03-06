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

  return `
    <h2>${escapeHTML(slide.title)}</h2>
    <p>${escapeHTML(slide.body || "")}</p>
    ${bulletsHTML ? `<ul>${bulletsHTML}</ul>` : ""}
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
