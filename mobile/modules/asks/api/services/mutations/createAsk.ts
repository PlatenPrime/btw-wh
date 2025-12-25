import { SERVER_URL } from "@/constants/server";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { getItem } from "@/modules/auth/utils/storage";

export interface CreateAskRequest {
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  sklad?: "pogrebi" | "merezhi";
  askerId: string;
}

export const createAsk = async (
  data: CreateAskRequest,
  signal?: AbortSignal,
): Promise<AskDto> => {
  const token = await getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${SERVER_URL}asks`, {
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
    throw new Error(message || "Failed to create ask");
  }

  return responseData as AskDto;
};

