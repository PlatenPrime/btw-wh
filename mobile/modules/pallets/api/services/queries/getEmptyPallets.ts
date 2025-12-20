import { SERVER_URL } from "@/constants/server";
import type { PalletListResponse } from "@/modules/pallets/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export const getEmptyPallets = async (
  signal?: AbortSignal,
): Promise<PalletListResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}pallets/empty`, {
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
    throw new Error(message || "Failed to fetch empty pallets");
  }

  return data as PalletListResponse;
};

