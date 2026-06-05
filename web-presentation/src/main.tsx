import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import PresenterApp from "./PresenterApp";
import { isPresenterWindow } from "./lib/presenterSync";
import "katex/dist/katex.min.css";
import "./index.css";
import "./styles/animations.css";
import "./styles/presenter.css";
import "./styles/virtual-slides.css";
import "./styles/content-slides.css";
import "./styles/rtl-polish.css";
import "./styles/accessibility.css";
import "./styles/intro-slides.css";
import "./styles/section-dividers.css";
import "./styles/ai-assistant.css";

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

const Root = isPresenterWindow() ? PresenterApp : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
