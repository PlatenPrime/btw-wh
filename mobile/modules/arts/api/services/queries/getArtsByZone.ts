import { SERVER_URL } from "@/constants/server";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface ArtsByZoneResponse {
  data: ArtDto[];
  total: number;
}

export const getArtsByZone = async (
  zone: string,
  signal?: AbortSignal,
): Promise<ArtsByZoneResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}arts/zone/${zone}`, {
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
    throw new Error(message || "Failed to fetch arts by zone");
  }

  return data as ArtsByZoneResponse;
};

