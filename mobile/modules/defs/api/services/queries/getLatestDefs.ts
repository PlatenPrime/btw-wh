import { SERVER_URL } from "@/constants/server";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

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

  const res = await fetch(`${SERVER_URL}defs/latest`, {
    method: "GET",
    headers,
    signal,
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
};
