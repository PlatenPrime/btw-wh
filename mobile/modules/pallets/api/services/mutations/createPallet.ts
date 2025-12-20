import { SERVER_URL } from "@/constants/server";
import type { CreatePalletDto, PalletResponse } from "@/modules/pallets/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export const createPallet = async (
  data: CreatePalletDto,
  signal?: AbortSignal,
): Promise<PalletResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}pallets`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    signal,
  });

  const text = await res.text();
  let responseData: unknown = null;
  try {
    responseData = text ? JSON.parse(text) : null;
  } catch {
    responseData = null;
  }

  if (!res.ok) {
    const message =
      typeof responseData === "object" &&
      responseData &&
      "message" in responseData
        ? (responseData as { message?: string }).message
        : undefined;
    throw new Error(message || "Failed to create pallet");
  }

  return responseData as PalletResponse;
};

