import { SERVER_URL } from "@/constants/server";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

const DEFS_FETCH_TIMEOUT_MS = 60_000;

function createCombinedSignal(external?: AbortSignal): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, DEFS_FETCH_TIMEOUT_MS);

  const onExternalAbort = () => {
    controller.abort();
  };

  if (external) {
    if (external.aborted) {
      clearTimeout(timeoutId);
      controller.abort();
    } else {
      external.addEventListener("abort", onExternalAbort, { once: true });
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      external?.removeEventListener("abort", onExternalAbort);
    },
  };
}

export const getLatestDefs = async (
  signal?: AbortSignal,
): Promise<GetLatestDefsResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const { signal: combinedSignal, cleanup } = createCombinedSignal(signal);

  try {
    const res = await fetch(`${SERVER_URL}defs/latest`, {
      method: "GET",
      headers,
      signal: combinedSignal,
    });

    const text = await res.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        typeof data === "object" && data && "message" in data
          ? (data as { message?: string }).message
          : undefined;
      throw new Error(message || "Failed to fetch latest defs");
    }

    return data as GetLatestDefsResponse;
  } catch (error) {
    // Наш timeout (не cancel от React Query)
    if (combinedSignal.aborted && !signal?.aborted) {
      throw new Error(
        "Розрахунок дефіцитів перевищив час очікування. Спробуйте ще раз.",
      );
    }
    throw error;
  } finally {
    cleanup();
  }
};
