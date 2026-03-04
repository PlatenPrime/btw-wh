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

          if (
            id.includes("axios") ||
            id.includes("sonner") ||
            id.includes("lucide-react")
          ) {
            return "utils";
          }

          // Все зависимости из node_modules, включая react, react-dom и @radix-ui,
          // попадают в один общий vendor-чанк
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
