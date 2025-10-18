// Реэкспорт из shared для обратной совместимости
import { artServices } from "@/lib/apiClient";
import { useArtsInfiniteQuery as useArtsInfiniteQueryShared } from "@shared/modules/arts";

export interface UseArtsInfiniteQueryParams {
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  enabled?: boolean;
}

export function useArtsInfiniteQuery(params: UseArtsInfiniteQueryParams) {
  return useArtsInfiniteQueryShared({
    ...params,
    getArtsByParams: artServices.getArtsByParams,
  });
}

