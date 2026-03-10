import { apiClient } from "@/lib/apiClient";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";

export interface GetKasksByDateParams {
  date: string;
  signal?: AbortSignal;
}

export const getKasksByDate = async ({
  date,
  signal,
}: GetKasksByDateParams): Promise<GetKasksByDateResponse> => {
  const query = new URLSearchParams({ date });
  const res = await apiClient.get<GetKasksByDateResponse>(
    `/kasks/by-date?${query.toString()}`,
    { signal },
  );
  return res.data;
};
