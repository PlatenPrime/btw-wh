import { apiClient } from "@/lib/apiClient";
import type { ArtSalesChartResponse } from "@/modules/arts/api/types/art-reports";

export const getArtSalesChartData = async (
  artikul: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<ArtSalesChartResponse> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<ArtSalesChartResponse>(
    `art-chart-reports/artikul/${encodeURIComponent(artikul)}/sales?${params.toString()}`,
    { signal },
  );
  return res.data;
};
