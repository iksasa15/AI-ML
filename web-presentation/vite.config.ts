import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/AI-ML/web-presentation/" : "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["assets/**/*"],
      manifest: {
        name: "AI & ML Bootcamp Presentation",
        short_name: "ML Bootcamp",
        description: "Offline-ready bootcamp slide deck",
        theme_color: "#f7f4ef",
        background_color: "#f7f4ef",
        display: "standalone",
        start_url: "./",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2,woff,ttf,png,svg,jpg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/upload\.wikimedia\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "wikimedia-images",
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/miro\.medium\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "medium-images",
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 14 },
            },
          },
          {
            urlPattern: /\/assets\/plots\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "local-plot-images",
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/data/slides/section")) {
            const match = id.match(/section\d+/);
            return match ? `slides-${match[0]}` : "slides";
          }
          if (id.includes("katex")) return "katex";
          if (id.includes("codemirror") || id.includes("@codemirror")) return "codemirror";
        },
      },
    },
  },
}));
