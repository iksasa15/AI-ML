import { collectSplittableBlocks, measureHeight, packBlocks } from "./contentPagination";

const OVERLAY_CLASS = "slide-content-overlay";
const PAGES_CLASS = "slide-content-pages";
const PAGE_CLASS = "slide-content-page";
const HIDDEN_CLASS = "slide-live-block--hidden";

function hasInteractiveContent(content: HTMLElement): boolean {
  return Boolean(
    content.querySelector(".concept-card, .concept-btn, button, input, select, textarea")
  );
}

function getTopLevelBlocks(content: HTMLElement): HTMLElement[] {
  return Array.from(content.children).filter((node): node is HTMLElement => node instanceof HTMLElement);
}

export function resetLiveSlidePagination(slideEl: HTMLElement) {
  const frame = slideEl.querySelector<HTMLElement>(".slide-frame");
  const content = slideEl.querySelector<HTMLElement>(".slide-frame-content");
  if (content) {
    content.classList.remove("slide-frame-content--live-paged");
    content.style.removeProperty("visibility");
    content.querySelectorAll(".slide-live-block").forEach((node) => {
      node.classList.remove("slide-live-block", HIDDEN_CLASS);
      node.removeAttribute("data-live-page");
    });
  }
  frame?.querySelector(`.${OVERLAY_CLASS}`)?.remove();
}

function buildPages(packed: HTMLElement[][]): HTMLElement {
  const pagesEl = document.createElement("div");
  pagesEl.className = PAGES_CLASS;

  packed.forEach((pageBlocks, index) => {
    const page = document.createElement("div");
    page.className = PAGE_CLASS;
    page.dataset.page = String(index);
    if (index > 0) page.dataset.continued = "true";
    for (const block of pageBlocks) {
      page.appendChild(block);
    }
    pagesEl.appendChild(page);
  });

  return pagesEl;
}

function applyInPlacePagination(
  content: HTMLElement,
  blocks: HTMLElement[],
  packed: HTMLElement[][],
  activePage: number
): number {
  const pageByBlock: number[] = [];
  packed.forEach((page, pageIndex) => {
    for (let i = 0; i < page.length; i += 1) {
      pageByBlock.push(pageIndex);
    }
  });

  blocks.forEach((block, index) => {
    const page = pageByBlock[index] ?? 0;
    block.classList.add("slide-live-block");
    block.dataset.livePage = String(page);
    block.classList.toggle(HIDDEN_CLASS, page !== activePage);
  });

  content.classList.add("slide-frame-content--live-paged");
  return packed.length;
}

function applyOverlayPagination(
  frame: HTMLElement,
  content: HTMLElement,
  packed: HTMLElement[][]
): number {
  const overlay = frame.querySelector<HTMLElement>(`.${OVERLAY_CLASS}`) ?? document.createElement("div");
  overlay.className = OVERLAY_CLASS;
  overlay.innerHTML = "";
  overlay.appendChild(buildPages(packed));
  if (!overlay.parentElement) frame.appendChild(overlay);
  content.style.visibility = "hidden";
  return packed.length;
}

export function setLiveSlidePage(slideEl: HTMLElement, pageIndex: number) {
  const content = slideEl.querySelector<HTMLElement>(".slide-frame-content");
  if (content?.classList.contains("slide-frame-content--live-paged")) {
    content.querySelectorAll<HTMLElement>(".slide-live-block").forEach((block) => {
      const page = Number(block.dataset.livePage ?? "0");
      block.classList.toggle(HIDDEN_CLASS, page !== pageIndex);
    });
    return;
  }

  slideEl.querySelectorAll<HTMLElement>(`.${PAGE_CLASS}`).forEach((page, index) => {
    page.classList.toggle("is-active", index === pageIndex);
  });
}

export function shouldPaginateSlide(slideEl: HTMLElement): boolean {
  if (slideEl.classList.contains("slide--divider")) return false;
  const frame = slideEl.querySelector(".slide-frame");
  if (!frame || frame.classList.contains("slide-frame--divider")) return false;
  return Boolean(frame.querySelector(".slide-frame-content"));
}

export function applyLiveSlidePagination(slideEl: HTMLElement, activePage: number): number {
  const frame = slideEl.querySelector<HTMLElement>(".slide-frame");
  const content = slideEl.querySelector<HTMLElement>(".slide-frame-content");
  if (!frame || !content) {
    resetLiveSlidePagination(slideEl);
    return 1;
  }

  resetLiveSlidePagination(slideEl);

  const budget = content.clientHeight;
  if (budget <= 0) return 1;

  const interactive = hasInteractiveContent(content);
  const topLevel = getTopLevelBlocks(content);
  if (!topLevel.length) return 1;

  let measureBlocks: HTMLElement[];
  if (interactive) {
    measureBlocks = topLevel.map((block) => block.cloneNode(true) as HTMLElement);
  } else {
    const probe = document.createElement("div");
    probe.className = content.className;
    topLevel.forEach((block) => probe.appendChild(block.cloneNode(true)));
    measureBlocks = collectSplittableBlocks(probe);
  }

  const probe = document.createElement("div");
  probe.className = content.className;
  measureBlocks.forEach((block) => probe.appendChild(block.cloneNode(true)));
  const totalHeight = measureHeight(probe);

  if (totalHeight <= budget + 2) return 1;

  const packed = packBlocks(
    measureBlocks.map((block) => block.cloneNode(true) as HTMLElement),
    budget
  );

  if (interactive) {
    const coarsePacked = packBlocks(
      topLevel.map((block) => block.cloneNode(true) as HTMLElement),
      budget
    );
    return applyInPlacePagination(content, topLevel, coarsePacked, activePage);
  }

  applyOverlayPagination(frame, content, packed);
  const safePage = Math.min(Math.max(activePage, 0), packed.length - 1);
  setLiveSlidePage(slideEl, safePage);
  return packed.length;
}
