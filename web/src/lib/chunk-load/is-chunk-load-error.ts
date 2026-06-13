export function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const msg = error.message.toLowerCase();

  return (
    error.name === "ChunkLoadError" ||
    msg.includes("failed to fetch dynamically imported module") ||
    msg.includes("dynamically imported module") ||
    msg.includes("loading chunk") ||
    msg.includes("loading css chunk")
  );
}
