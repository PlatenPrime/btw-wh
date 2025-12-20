import { SERVER_URL } from "@/constants/server";
import type { ArtsDto } from "@/modules/arts/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface GetArtsParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

export const getArtsByParams = async ({
  page,
  limit,
  search = "",
  filters = {},
  signal,
}: GetArtsParams): Promise<ArtsDto> => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    ...Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, String(v)])
    ),
  });

  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}arts?${query.toString()}`, {
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
    throw new Error(message || "Failed to fetch arts");
  }

  return data as ArtsDto;
};
