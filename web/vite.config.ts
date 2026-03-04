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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("xlsx")) return "xlsx";
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom")) return "vendor-react";
          if (id.includes("react/") || id.includes("react\\")) return "vendor-react";
          if (id.includes("@radix-ui")) return "ui";
          if (id.includes("axios") || id.includes("sonner") || id.includes("lucide-react")) {
            return "utils";
          }
          if (id.includes("recharts")) return "vendor-recharts";
          if (id.includes("@tanstack/react-query") && !id.includes("devtools")) {
            return "vendor-query";
          }
          if (id.includes("react-day-picker")) return "vendor-day-picker";
          if (id.includes("date-fns")) return "vendor-date-fns";
          if (id.includes("@dnd-kit")) return "vendor-dnd";
          if (id.includes("react-hook-form") || id.includes("@hookform")) return "vendor-forms";
          if (id.includes("zod")) return "vendor-zod";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("react-virtuoso")) return "vendor-virtuoso";
          if (id.includes("next-themes")) return "vendor-themes";
          if (
            id.includes("class-variance-authority") ||
            id.includes("clsx") ||
            id.includes("tailwind-merge")
          ) {
            return "vendor-libs";
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
