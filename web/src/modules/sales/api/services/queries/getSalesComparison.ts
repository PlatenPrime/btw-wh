import { apiClient } from "@/lib/apiClient";
import type { SalesComparisonResponse } from "@/modules/sales/api/types";

export const getSalesComparison = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  options?: { abc?: string },
  signal?: AbortSignal,
): Promise<SalesComparisonResponse> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  if (options?.abc) {
    params.set("abc", options.abc);
  }
  const res = await apiClient.get<SalesComparisonResponse>(
    `analog-slices/konk-btrade/sales-comparison?${params.toString()}`,
    { signal },
  );
  return res.data;
};
