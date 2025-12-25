import { SERVER_URL } from "@/constants/server";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export const completeAskById = async (
  id: string,
  solverId: string,
  signal?: AbortSignal,
): Promise<AskDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}asks/${id}/complete`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ solverId }),
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
    throw new Error(message || "Failed to complete ask");
  }

  return responseData as AskDto;
};

