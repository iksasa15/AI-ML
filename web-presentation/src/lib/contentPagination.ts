import { PPT_WIDTH_PX } from "./slideCanvas";

const MEASURE_ROOT_CLASS = "print-measure-root";

export function createMeasureRoot(): HTMLElement {
  const existing = document.querySelector<HTMLElement>(`.${MEASURE_ROOT_CLASS}`);
  if (existing) return existing;

  const root = document.createElement("div");
  root.className = MEASURE_ROOT_CLASS;
  root.setAttribute("aria-hidden", "true");
  Object.assign(root.style, {
    position: "fixed",
    left: "-12000px",
    top: "0",
    width: `${PPT_WIDTH_PX}px`,
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: "-1",
  });
  document.body.appendChild(root);
  return root;
}

export function measureHeight(element: HTMLElement, width = PPT_WIDTH_PX): number {
  const root = createMeasureRoot();
  const box = document.createElement("div");
  box.className = "slide-frame-content";
  box.style.width = `${width}px`;
  box.appendChild(element);
  root.appendChild(box);
  const height = box.getBoundingClientRect().height;
  root.removeChild(box);
  return height;
}

function splitContentCard(card: HTMLElement): HTMLElement[] {
  const heading = card.querySelector("h3");
  const chunks: HTMLElement[] = [];

  for (const child of Array.from(card.children)) {
    if (!(child instanceof HTMLElement) || child.tagName === "H3") continue;
    const article = document.createElement("article");
    article.className = card.className;
    if (heading) article.appendChild(heading.cloneNode(true));
    article.appendChild(child.cloneNode(true));
    chunks.push(article);
  }

  return chunks.length ? chunks : [card.cloneNode(true) as HTMLElement];
}

export function collectSplittableBlocks(container: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = [];

  for (const child of Array.from(container.children)) {
    if (!(child instanceof HTMLElement)) continue;

    if (child.tagName === "UL") {
      for (const li of Array.from(child.children)) {
        const list = document.createElement("ul");
        list.className = child.className;
        list.appendChild(li.cloneNode(true));
        blocks.push(list);
      }
      continue;
    }

    if (child.classList.contains("content-sections")) {
      for (const article of Array.from(child.children)) {
        if (article instanceof HTMLElement) {
          blocks.push(...splitContentCard(article));
        }
      }
      continue;
    }

    if (child.classList.contains("content-card")) {
      blocks.push(...splitContentCard(child));
      continue;
    }

    if (child.classList.contains("slide-columns-three")) {
      for (const column of Array.from(child.children)) {
        if (column instanceof HTMLElement) blocks.push(column.cloneNode(true) as HTMLElement);
      }
      continue;
    }

    if (child.classList.contains("concept-card")) {
      blocks.push(child.cloneNode(true) as HTMLElement);
      continue;
    }

    if (child.classList.contains("illustration-slot")) {
      blocks.push(child.cloneNode(true) as HTMLElement);
      continue;
    }

    blocks.push(child.cloneNode(true) as HTMLElement);
  }

  return blocks;
}

export function packBlocks(blocks: HTMLElement[], maxHeight: number): HTMLElement[][] {
  const pages: HTMLElement[][] = [];
  let current: HTMLElement[] = [];
  let used = 0;

  for (const block of blocks) {
    const blockHeight = measureHeight(block);

    if (blockHeight > maxHeight) {
      if (current.length) {
        pages.push(current);
        current = [];
        used = 0;
      }
      pages.push([block]);
      continue;
    }

    if (used + blockHeight > maxHeight && current.length) {
      pages.push(current);
      current = [];
      used = 0;
    }

    current.push(block);
    used += blockHeight;
  }

  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}
