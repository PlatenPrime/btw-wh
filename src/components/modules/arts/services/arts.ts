// services/arts.ts
import { apiClient } from "@/lib/apiClient";
import type { ArtResponseData } from "@/components/modules/arts/types/types";
import type { Art } from "@/components/modules/arts/types/types";

export interface GetArtsParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}


export interface GetBtradeArtInfo {
  nameukr: string;
  price: number;
  quantity: number;
  artikul: string;
}

export const getArts = async ({
  page,
  limit,
  search = "",
  filters = {},
  signal,
}: GetArtsParams): Promise<ArtResponseData> => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    ...Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, String(v)])
    ),
  });

  const res = await apiClient.get<ArtResponseData>(`/arts?${query.toString()}`, {
    signal,
  });

  return res.data;
};



export const getArtByArtikul = async (
  artikul: string,
  signal?: AbortSignal
): Promise<Art> => {
  const res = await apiClient.get<Art>(`/arts/artikul/${artikul}`, { signal });
  return res.data;
};


export const getBtradeInfoByArtikul = async (
  artikul: string,
  signal?: AbortSignal
): Promise<GetBtradeArtInfo> => {
  const res = await apiClient.get<GetBtradeArtInfo>(`/arts/btrade/${artikul}`, { signal });
  return res.data;
}

export function getBigImageUrl(artikul: string | undefined): string {
  return `https://sharik.ua/images/elements_big/${artikul}_m1.jpg`;
}

export function getSmallImageUrl(artikul: string | undefined): string {
  return `https://sharik.ua/images/elements_big_prev/prev_${artikul}_m1.jpg`;
}