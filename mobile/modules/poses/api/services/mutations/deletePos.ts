import { SERVER_URL } from "@/constants/server";
import type { DeletePosResponse } from "@/modules/poses/api/types";
import { getItem } from "@/modules/auth/utils/storage";

export const deletePos = async (
  id: string,
  signal?: AbortSignal,
): Promise<DeletePosResponse> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}poses/${id}`, {
    method: "DELETE",
    headers,
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
    throw new Error(message || "Failed to delete pos");
  }

  return responseData as DeletePosResponse;
};

