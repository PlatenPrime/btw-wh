import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "../types/dto";

export interface GetAsksByDateParams {
  date: string; // формат даты в виде строки (например, "2024-01-15")
  signal?: AbortSignal;
}

export interface GetAsksByDateResponse {
  message: string;
  data: AskDto[];
  date: string;
  count: number;
}

export const getAsksByDate = async ({
  date,
  signal,
}: GetAsksByDateParams): Promise<GetAsksByDateResponse> => {
  const query = new URLSearchParams({
    date,
  });

  const res = await apiClient.get<GetAsksByDateResponse>(
    `/asks/by-date?${query.toString()}`,
    {
      signal,
    },
  );

  return res.data;
};
