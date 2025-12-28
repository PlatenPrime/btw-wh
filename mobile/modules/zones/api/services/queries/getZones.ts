import { SERVER_URL } from "@/constants/server";
import type { GetZonesParams, ZonesResponseDto } from "@/modules/zones/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export const getZones = async ({
  page,
  limit,
  search = "",
  sortBy = "sector",
  sortOrder = "asc",
  signal,
}: GetZonesParams): Promise<ZonesResponseDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    sortBy,
    sortOrder,
  });

  const res = await fetch(`${SERVER_URL}zones?${query.toString()}`, {
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
    throw new Error(message || "Failed to fetch zones");
  }

  return data as ZonesResponseDto;
};

