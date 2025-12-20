import { SERVER_URL } from "@/constants/server";
import type { IPallet } from "@/modules/pallets/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export interface MovePalletPosesResponse {
  message: string;
  targetPallet?: IPallet;
}

export const movePalletPoses = async (
  sourcePalletId: string,
  targetPalletId: string,
  signal?: AbortSignal,
): Promise<MovePalletPosesResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}pallets/move-poses`, {
    method: "POST",
    headers,
    body: JSON.stringify({ sourcePalletId, targetPalletId }),
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
    throw new Error(message || "Failed to move pallet poses");
  }

  return responseData as MovePalletPosesResponse;
};

