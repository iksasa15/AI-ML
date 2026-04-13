declare module "katex/dist/contrib/auto-render.mjs" {
  import type { KatexOptions } from "katex";

  export interface AutoRenderOptions extends KatexOptions {
    delimiters?: { left: string; right: string; display: boolean }[];
    ignoredTags?: Set<string>;
    ignoredClasses?: string[];
    errorCallback?: (msg: string, err: Error) => void;
  }

  export default function renderMathInElement(elem: HTMLElement, options?: AutoRenderOptions): void;
}
