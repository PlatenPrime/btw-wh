import { isChunkLoadError } from "@/lib/chunk-load/is-chunk-load-error";
import { reloadOnStaleChunk } from "@/lib/chunk-load/reload-on-stale-chunk";

let isSetup = false;

export function setupStaleChunkHandlers(): void {
  if (isSetup || typeof window === "undefined") {
    return;
  }

  isSetup = true;

  window.addEventListener("vite:preloadError", () => {
    reloadOnStaleChunk();
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (isChunkLoadError(event.reason)) {
      event.preventDefault();
      reloadOnStaleChunk();
    }
  });
}
