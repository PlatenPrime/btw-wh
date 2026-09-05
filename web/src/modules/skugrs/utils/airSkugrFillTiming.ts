export const AIR_SKUGR_PAGE_JITTER_MS = { min: 2_000, max: 4_000 } as const;
export const AIR_SKUGR_GROUP_JITTER_MS = { min: 10_000, max: 20_000 } as const;
export const AIR_SKUGR_RETRY_JITTER_MS = { min: 3_000, max: 6_000 } as const;

export function jitterMs(minMs: number, maxMs: number): number {
  if (!Number.isFinite(minMs) || !Number.isFinite(maxMs) || maxMs <= minMs) {
    return Math.max(0, minMs || 0);
  }
  return minMs + Math.floor(Math.random() * (maxMs - minMs + 1));
}

export function delayMs(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
