import { SERVER_URL } from "@/constants/server";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface GetAsksByDateParams {
  date: string; // формат даты в виде строки (например, "2024-01-15")
  signal?: AbortSignal;
}

export const getAsksByDate = async ({
  date,
  signal,
}: GetAsksByDateParams): Promise<GetAsksByDateResponse> => {
  const query = new URLSearchParams({
    date,
  });

  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}asks/by-date?${query.toString()}`, {
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
    throw new Error(message || "Failed to fetch asks");
  }

  return data as GetAsksByDateResponse;
};

