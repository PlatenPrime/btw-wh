import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("xlsx")) return "xlsx";
          if (!id.includes("node_modules")) return;

          // React core — одна копия, база для остальных чанков
          if (
            /node_modules[\\/](react|react-dom|scheduler)([\\/]|$)/.test(id)
          ) {
            return "react";
          }
          if (id.includes("react-router") || id.includes("react-router-dom")) {
            return "router";
          }
          if (id.includes("@radix-ui/")) {
            return "radix";
          }
          if (
            id.includes("@tanstack/react-query") &&
            !id.includes("react-query-devtools")
          ) {
            return "query";
          }
          if (id.includes("recharts")) return "recharts";
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform/resolvers") ||
            id.includes("zod")
          ) {
            return "forms";
          }
          if (id.includes("@dnd-kit/")) return "dnd";
          if (
            id.includes("axios") ||
            id.includes("sonner") ||
            id.includes("lucide-react")
          ) {
            return "utils";
          }

          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
  },
  optimizeDeps: {
    include: ["xlsx"],
    exclude: ["@tanstack/react-query-devtools"],
  },
});
