import { SERVER_URL } from "@/constants/server";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface UpdateArtLimitRequest {
  limit: number;
}

export const updateArtLimitById = async (
  id: string,
  data: UpdateArtLimitRequest,
): Promise<ArtDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}arts/${id}/limit`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
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
    throw new Error(message || "Failed to update art limit");
  }

  return responseData as ArtDto;
};

