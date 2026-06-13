import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";

function appVersionPlugin(): Plugin {
  return {
    name: "app-version",
    writeBundle(options) {
      const outDir = options.dir ?? path.resolve(__dirname, "dist");
      const version =
        process.env.VERCEL_GIT_COMMIT_SHA ??
        (() => {
          try {
            return execSync("git rev-parse --short HEAD", {
              encoding: "utf-8",
            }).trim();
          } catch {
            return Date.now().toString();
          }
        })();

      writeFileSync(
        path.join(outDir, "version.json"),
        JSON.stringify(
          {
            version,
            builtAt: new Date().toISOString(),
          },
          null,
          2,
        ),
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), appVersionPlugin()],
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
    // lucide-react — большой barrel-пакет; pre-bundling объединяет его в один модуль,
    // устраняя обработку тысяч re-exports при каждом dev cold start.
    include: ["xlsx", "lucide-react"],
    exclude: ["@tanstack/react-query-devtools"],
  },
});
