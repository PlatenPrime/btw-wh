import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { isChunkLoadError } from "@/lib/chunk-load/is-chunk-load-error";
import { reloadOnStaleChunk } from "@/lib/chunk-load/reload-on-stale-chunk";

const RETRY_DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function loadWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
): Promise<{ default: T }> {
  try {
    return await factory();
  } catch (error) {
    if (!isChunkLoadError(error)) {
      throw error;
    }

    await delay(RETRY_DELAY_MS);

    try {
      return await factory();
    } catch (retryError) {
      if (isChunkLoadError(retryError) && reloadOnStaleChunk()) {
        return new Promise(() => {});
      }

      throw retryError;
    }
  }
}

export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() => loadWithRetry(factory));
}
