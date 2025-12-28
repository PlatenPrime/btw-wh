import { SERVER_URL } from "@/constants/server";
import type { CreateZoneDto, ZoneDto } from "@/modules/zones/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export const createZone = async (
  data: CreateZoneDto,
  signal?: AbortSignal,
): Promise<ZoneDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}zones`, {
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
    throw new Error(message || "Failed to create zone");
  }

  const zoneResponse = responseData as { data: ZoneDto };
  return zoneResponse.data;
};

