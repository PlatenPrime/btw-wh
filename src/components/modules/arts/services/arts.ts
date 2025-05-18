// services/arts.ts
import { apiClient } from "@/lib/apiClient";
import type { ArtResponseData } from "@/components/modules/arts/types/types";

export interface GetArtsParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
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
