import { SERVER_URL } from "@/constants/server";
import type { CreateRowDto, RowDto } from "@/modules/rows/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export const createRow = async (
  data: CreateRowDto,
  signal?: AbortSignal,
): Promise<RowDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}rows`, {
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
    throw new Error(message || "Failed to create row");
  }

  return responseData as RowDto;
};

