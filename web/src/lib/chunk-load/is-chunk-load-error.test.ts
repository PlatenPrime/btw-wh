import { describe, expect, it } from "vitest";
import { isChunkLoadError } from "@/lib/chunk-load/is-chunk-load-error";

describe("isChunkLoadError", () => {
  it("returns true for ChunkLoadError name", () => {
    const error = new Error("Loading chunk 123 failed");
    error.name = "ChunkLoadError";
    expect(isChunkLoadError(error)).toBe(true);
  });

  it("returns true for Vite dynamic import failure", () => {
    const error = new Error(
      "Failed to fetch dynamically imported module: https://example.com/assets/Arts-abc.js",
    );
    expect(isChunkLoadError(error)).toBe(true);
  });

  it("returns true for loading chunk message", () => {
    const error = new Error("Loading chunk vendors failed.");
    expect(isChunkLoadError(error)).toBe(true);
  });

  it("returns true for loading css chunk message", () => {
    const error = new Error("Loading CSS chunk styles failed.");
    expect(isChunkLoadError(error)).toBe(true);
  });

  it("returns false for unrelated errors", () => {
    expect(isChunkLoadError(new Error("Network request failed"))).toBe(false);
    expect(isChunkLoadError("string error")).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
  });
});
