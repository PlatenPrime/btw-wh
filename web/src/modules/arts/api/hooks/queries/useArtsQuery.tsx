// Реэкспорт из shared для обратной совместимости
import { artServices } from "@/lib/apiClient";
import { useArtsQuery as useArtsQueryShared } from "@shared/modules/arts";

export interface UseArtsQueryParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string | number | boolean>;
  enabled?: boolean;
}

export function useArtsQuery(params: UseArtsQueryParams) {
  return useArtsQueryShared({
    ...params,
    getArtsByParams: artServices.getArtsByParams,
  });
}

