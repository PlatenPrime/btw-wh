import { SERVER_URL } from "@/constants/server";
import type { IPos } from "@/modules/poses/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export interface GetPosesByPalletIdParams {
  sortBy?: "artikul" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export const getPosesByPalletId = async (
  palletId: string,
  params?: GetPosesByPalletIdParams,
  signal?: AbortSignal,
): Promise<IPos[]> => {
  const { sortBy = "updatedAt", sortOrder = "desc" } = params || {};

  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const query = new URLSearchParams({
    sortBy,
    sortOrder,
  });

  const res = await fetch(`${SERVER_URL}poses/by-pallet/${palletId}?${query.toString()}`, {
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
    throw new Error(message || "Failed to fetch poses");
  }

  return data as IPos[];
};

