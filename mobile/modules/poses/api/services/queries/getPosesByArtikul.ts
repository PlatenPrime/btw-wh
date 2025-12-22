import { SERVER_URL } from "@/constants/server";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export const getPosesByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<GetPosesByArtikulResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}poses/by-artikul/${artikul}`, {
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
    throw new Error(message || "Failed to fetch poses by artikul");
  }

  // Проверяем структуру ответа (может быть обернут в { success, data })
  if (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "data" in data
  ) {
    return (data as { success: boolean; data: GetPosesByArtikulResponse }).data;
  }

  return data as GetPosesByArtikulResponse;
};

