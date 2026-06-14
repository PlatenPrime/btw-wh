import { apiClient } from "@/lib/apiClient";
import type { ArtStockChartResponse } from "@/modules/arts/api/types/art-reports";

export const getArtStockChartData = async (
  artikul: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<ArtStockChartResponse> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<ArtStockChartResponse>(
    `art-chart-reports/artikul/${encodeURIComponent(artikul)}/stock?${params.toString()}`,
    { signal },
  );
  return res.data;
};
