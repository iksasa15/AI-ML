import { PPT_HEIGHT_PX } from "./slideCanvas";
import { collectSplittableBlocks, measureHeight, packBlocks } from "./contentPagination";

function getFrameParts(frame: HTMLElement) {
  const header = frame.querySelector<HTMLElement>(".slide-frame-header");
  const footer = frame.querySelector<HTMLElement>(".slide-frame-footer");
  const content = frame.querySelector<HTMLElement>(".slide-frame-content");
  const dividerBody = frame.querySelector<HTMLElement>(".slide-frame-divider-body");
  return { header, footer, content, dividerBody };
}

function buildPrintPage(
  frame: HTMLElement,
  contentBlocks: HTMLElement[],
  pageIndex: number,
  pageCount: number
): HTMLElement {
  const page = document.createElement("section");
  page.className = "print-page";
  page.dataset.page = String(pageIndex + 1);
  page.dataset.pageCount = String(pageCount);

  const canvas = document.createElement("div");
  canvas.className = "print-page-canvas";

  const frameClone = frame.cloneNode(false) as HTMLElement;
  frameClone.className = frame.className;

  const { header, footer, content, dividerBody } = getFrameParts(frame);

  if (dividerBody) {
    const bodyClone = dividerBody.cloneNode(true) as HTMLElement;
    frameClone.appendChild(bodyClone);
    if (footer) frameClone.appendChild(footer.cloneNode(true));
  } else {
    if (header) {
      const headerClone = header.cloneNode(true) as HTMLElement;
      if (pageIndex > 0) {
        const continued = document.createElement("span");
        continued.className = "print-page-continued";
        continued.textContent = ` (${pageIndex + 1}/${pageCount})`;
        headerClone.appendChild(continued);
      }
      frameClone.appendChild(headerClone);
    }

    const contentShell = document.createElement("div");
    contentShell.className = content?.className || "slide-frame-content";
    for (const block of contentBlocks) {
      contentShell.appendChild(block.cloneNode(true));
    }
    frameClone.appendChild(contentShell);

    if (footer) frameClone.appendChild(footer.cloneNode(true));
  }

  canvas.appendChild(frameClone);
  page.appendChild(canvas);
  return page;
}

function paginateSingleSlide(slideEl: HTMLElement): HTMLElement[] {
  const frame = slideEl.querySelector<HTMLElement>(".slide-frame");
  if (!frame) {
    const page = document.createElement("section");
    page.className = "print-page";
    page.innerHTML = slideEl.innerHTML;
    return [page];
  }

  const { content, dividerBody } = getFrameParts(frame);

  if (dividerBody || !content) {
    const totalHeight = measureHeight(slideEl);
    if (totalHeight <= PPT_HEIGHT_PX) {
      const page = document.createElement("section");
      page.className = "print-page";
      const canvas = document.createElement("div");
      canvas.className = "print-page-canvas";
      canvas.appendChild(frame.cloneNode(true));
      page.appendChild(canvas);
      return [page];
    }
  }

  if (!content) {
    const page = document.createElement("section");
    page.className = "print-page";
    const canvas = document.createElement("div");
    canvas.className = "print-page-canvas";
    canvas.appendChild(frame.cloneNode(true));
    page.appendChild(canvas);
    return [page];
  }

  const header = frame.querySelector<HTMLElement>(".slide-frame-header");
  const footer = frame.querySelector<HTMLElement>(".slide-frame-footer");
  const chromeHeight =
    (header ? measureHeight(header) : 0) + (footer ? measureHeight(footer) : 0);
  const bodyBudget = Math.max(PPT_HEIGHT_PX - chromeHeight - 8, PPT_HEIGHT_PX * 0.45);

  const blocks = collectSplittableBlocks(content);
  const probe = document.createElement("div");
  for (const block of blocks) probe.appendChild(block.cloneNode(true));
  const totalBodyHeight = measureHeight(probe);

  if (totalBodyHeight <= bodyBudget) {
    const page = document.createElement("section");
    page.className = "print-page";
    const canvas = document.createElement("div");
    canvas.className = "print-page-canvas";
    canvas.appendChild(frame.cloneNode(true));
    page.appendChild(canvas);
    return [page];
  }

  const packed = packBlocks(blocks, bodyBudget);
  return packed.map((pageBlocks, index) => buildPrintPage(frame, pageBlocks, index, packed.length));
}

export function paginatePrintDeck(container: HTMLElement) {
  const slides = Array.from(container.querySelectorAll<HTMLElement>(".print-slide"));
  if (!slides.length) return;

  const pages: HTMLElement[] = [];
  for (const slide of slides) {
    pages.push(...paginateSingleSlide(slide));
  }
  if (!pages.length) return;

  const fragment = document.createDocumentFragment();
  for (const page of pages) {
    fragment.appendChild(page);
  }
  container.replaceChildren(fragment);
}
