import { SERVER_URL } from "@/constants/server";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface GetAsksByArtikulParams {
  artikul: string;
  signal?: AbortSignal;
}

export const getAsksByArtikul = async ({
  artikul,
  signal,
}: GetAsksByArtikulParams): Promise<GetAsksByArtikulResponse> => {
  const query = new URLSearchParams({
    artikul,
  });

  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}asks/by-artikul?${query.toString()}`, {
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
    throw new Error(message || "Failed to fetch asks by artikul");
  }

  return data as GetAsksByArtikulResponse;
};
