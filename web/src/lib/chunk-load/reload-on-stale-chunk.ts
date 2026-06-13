const CHUNK_RELOAD_KEY = "btw-chunk-reload";

export function reloadOnStaleChunk(): boolean {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
    return false;
  }

  sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  window.location.reload();
  return true;
}

export function clearStaleChunkReloadGuard(): void {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY);
}
