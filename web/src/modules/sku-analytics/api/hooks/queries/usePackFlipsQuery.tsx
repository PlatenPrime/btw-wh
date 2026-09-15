import { getPackFlips } from "@/modules/sku-analytics/api/services/queries/getPackFlips";
import { useQuery } from "@tanstack/react-query";

export interface UsePackFlipsQueryParams {
  konkName: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function usePackFlipsQuery({
  konkName,
  dateFrom,
  dateTo,
  enabled = false,
}: UsePackFlipsQueryParams) {
  const canRun = Boolean(konkName && dateFrom && dateTo);

  return useQuery({
    queryKey: ["sku-slices", "pack-flips", konkName, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getPackFlips({
        konkName,
        dateFrom,
        dateTo,
        signal,
      }),
    enabled: canRun && enabled,
    staleTime: 30 * 1000,
  });
}
