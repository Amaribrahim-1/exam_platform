import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Raise warning threshold – LandingPage bundles a heavy animation lib
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── React core & router ───────────────────────────────────────────
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          // ── Charting libs (recharts, d3, victory …) ───────────────────────
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3") ||
            id.includes("node_modules/victory")
          ) {
            return "vendor-charts";
          }

          // ── Supabase client ───────────────────────────────────────────────
          if (id.includes("node_modules/@supabase")) {
            return "vendor-supabase";
          }

          // ── React Query ───────────────────────────────────────────────────
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
        },
      },
    },
  },
});

