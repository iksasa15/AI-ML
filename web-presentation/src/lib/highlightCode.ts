import { escapeHTML } from "./slideMarkup";

type TokenKind = "keyword" | "string" | "comment" | "number" | "builtin" | "plain";

const KEYWORDS: Record<string, Set<string>> = {
  python: new Set([
    "def", "class", "import", "from", "return", "if", "elif", "else", "for", "while",
    "in", "not", "and", "or", "True", "False", "None", "with", "as", "try", "except",
    "finally", "raise", "lambda", "yield", "pass", "break", "continue", "global",
    "nonlocal", "async", "await",
  ]),
  javascript: new Set([
    "const", "let", "var", "function", "return", "if", "else", "for", "while", "class",
    "import", "export", "from", "new", "this", "true", "false", "null", "undefined",
    "async", "await", "try", "catch", "finally", "throw", "typeof", "instanceof",
  ]),
  typescript: new Set([
    "const", "let", "var", "function", "return", "if", "else", "for", "while", "class",
    "import", "export", "from", "new", "this", "true", "false", "null", "undefined",
    "async", "await", "interface", "type", "enum", "implements", "extends", "public",
    "private", "protected", "readonly",
  ]),
};

const BUILTINS: Record<string, Set<string>> = {
  python: new Set(["print", "len", "range", "str", "int", "float", "list", "dict", "set", "tuple"]),
  javascript: new Set(["console", "Math", "Array", "Object", "String", "Number", "JSON", "Promise"]),
  typescript: new Set(["console", "Math", "Array", "Object", "String", "Number", "JSON", "Promise"]),
};

function wrap(kind: TokenKind, text: string): string {
  return `<span class="tok-${kind}">${escapeHTML(text)}</span>`;
}

function highlightPython(code: string): string {
  const lines = code.split("\n");
  return lines
    .map((line) => {
      const commentMatch = line.match(/^(\s*)(#.*)$/);
      if (commentMatch) {
        return `${commentMatch[1]}${wrap("comment", commentMatch[2])}`;
      }

      let result = "";
      let i = 0;
      while (i < line.length) {
        const rest = line.slice(i);

        const strMatch = rest.match(/^('''[\s\S]*?'''|"""[\s\S]*?"""|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/);
        if (strMatch) {
          result += wrap("string", strMatch[0]);
          i += strMatch[0].length;
          continue;
        }

        const wordMatch = rest.match(/^[A-Za-z_]\w*/);
        if (wordMatch) {
          const word = wordMatch[0];
          if (KEYWORDS.python.has(word)) result += wrap("keyword", word);
          else if (BUILTINS.python.has(word)) result += wrap("builtin", word);
          else result += escapeHTML(word);
          i += word.length;
          continue;
        }

        const numMatch = rest.match(/^\d+(?:\.\d+)?/);
        if (numMatch) {
          result += wrap("number", numMatch[0]);
          i += numMatch[0].length;
          continue;
        }

        result += escapeHTML(rest[0]);
        i += 1;
      }

      return result;
    })
    .join("\n");
}

function highlightJsLike(code: string, lang: "javascript" | "typescript"): string {
  const keywords = KEYWORDS[lang];
  const builtins = BUILTINS[lang];

  return code
    .split("\n")
    .map((line) => {
      const commentMatch = line.match(/^(\s*)(\/\/.*)$/);
      if (commentMatch) {
        return `${commentMatch[1]}${wrap("comment", commentMatch[2])}`;
      }

      let result = "";
      let i = 0;
      while (i < line.length) {
        const rest = line.slice(i);

        const strMatch = rest.match(/^(`[^`]*`|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")/);
        if (strMatch) {
          result += wrap("string", strMatch[0]);
          i += strMatch[0].length;
          continue;
        }

        const wordMatch = rest.match(/^[A-Za-z_$]\w*/);
        if (wordMatch) {
          const word = wordMatch[0];
          if (keywords.has(word)) result += wrap("keyword", word);
          else if (builtins.has(word)) result += wrap("builtin", word);
          else result += escapeHTML(word);
          i += word.length;
          continue;
        }

        const numMatch = rest.match(/^\d+(?:\.\d+)?/);
        if (numMatch) {
          result += wrap("number", numMatch[0]);
          i += numMatch[0].length;
          continue;
        }

        result += escapeHTML(rest[0]);
        i += 1;
      }

      return result;
    })
    .join("\n");
}

/** Lightweight syntax highlight — no external dependency */
export function highlightCode(code: string, language = "python"): string {
  const lang = language.toLowerCase();
  if (lang === "javascript" || lang === "js") return highlightJsLike(code, "javascript");
  if (lang === "typescript" || lang === "ts") return highlightJsLike(code, "typescript");
  return highlightPython(code);
}
