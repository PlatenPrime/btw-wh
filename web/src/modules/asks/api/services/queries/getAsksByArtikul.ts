import { apiClient } from "@/lib/apiClient";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";

export interface GetAsksByArtikulParams {
  artikul: string;
  signal?: AbortSignal;
}

export const getAsksByArtikul = async ({
  artikul,
  signal,
}: GetAsksByArtikulParams): Promise<GetAsksByArtikulResponse> => {
  const query = new URLSearchParams({
    artikul,
  });

  const res = await apiClient.get<GetAsksByArtikulResponse>(
    `/asks/by-artikul?${query.toString()}`,
    {
      signal,
    },
  );

  return res.data;
};
