import type { AxiosInstance } from "axios";
import type { ArtsDto } from "../../types/dto";

export interface GetArtsParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

/**
 * Get arts by params service factory
 */
export const createGetArtsByParamsService = (apiClient: AxiosInstance) => {
  return async ({
    page,
    limit,
    search = "",
    filters = {},
    signal,
  }: GetArtsParams): Promise<ArtsDto> => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      ...Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, String(v)])
      ),
    });

    const res = await apiClient.get<ArtsDto>(`/arts?${query.toString()}`, {
      signal,
    });

    return res.data;
  };
};
