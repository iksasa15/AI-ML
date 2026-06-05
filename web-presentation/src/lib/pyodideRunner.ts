const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (names: string | string[]) => Promise<void>;
  setStdout: (options: { batched?: (msg: string) => void }) => void;
  setStderr: (options: { batched?: (msg: string) => void }) => void;
};

type LoadPyodideFn = (config?: { indexURL?: string }) => Promise<PyodideInterface>;

declare global {
  interface Window {
    loadPyodide?: LoadPyodideFn;
  }
}

let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadPromise: Promise<PyodideInterface> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (window.loadPyodide) resolve();
      else existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export async function ensurePyodide(onStatus?: (message: string) => void): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;

  if (!pyodideLoadPromise) {
    pyodideLoadPromise = (async () => {
      onStatus?.("loading-runtime");
      await loadScript(`${PYODIDE_BASE}pyodide.js`);
      if (!window.loadPyodide) {
        throw new Error("Pyodide failed to initialize");
      }
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE });
      onStatus?.("loading-numpy");
      await pyodide.loadPackage("numpy");
      pyodideInstance = pyodide;
      return pyodide;
    })();
  }

  return pyodideLoadPromise;
}

export type RunPythonResult = {
  stdout: string;
  stderr: string;
  error: string | null;
};

export async function runPythonCode(
  code: string,
  onStatus?: (message: string) => void
): Promise<RunPythonResult> {
  const pyodide = await ensurePyodide(onStatus);
  let stdout = "";
  let stderr = "";

  pyodide.setStdout({
    batched: (msg) => {
      stdout += msg;
    },
  });
  pyodide.setStderr({
    batched: (msg) => {
      stderr += msg;
    },
  });

  try {
    onStatus?.("running");
    await pyodide.runPythonAsync(code);
    return { stdout: stdout.trimEnd(), stderr: stderr.trimEnd(), error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: stdout.trimEnd(), stderr: stderr.trimEnd(), error: message };
  }
}

export function isPyodideLoaded(): boolean {
  return pyodideInstance !== null;
}
