import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** يطابق المسار على GitHub Pages: …/AI-ML/web-presentation/ */
export default defineConfig({
  base: "/AI-ML/web-presentation/",
  plugins: [react()],
});
