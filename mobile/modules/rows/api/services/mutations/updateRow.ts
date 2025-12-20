import { SERVER_URL } from "@/constants/server";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export const updateRow = async (
  rowId: string,
  data: UpdateRowDto,
  signal?: AbortSignal,
): Promise<RowDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}rows/${rowId}`, {
    method: "PUT",
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
    throw new Error(message || "Failed to update row");
  }

  return responseData as RowDto;
};

