import { getAnalogs } from "@/modules/analogs/api/services/queries/getAnalogs";
import type { GetAnalogsParams } from "@/modules/analogs/api/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseAnalogsQueryParams extends GetAnalogsParams {
  enabled?: boolean;
}

export function useAnalogsQuery({
  page,
  limit,
  konkName = "",
  prodName = "",
  signal,
  enabled = true,
}: UseAnalogsQueryParams) {
  return useQuery({
    queryKey: ["analogs", { page, limit, konkName, prodName }],
    queryFn: ({ signal: querySignal }) =>
      getAnalogs({
        page,
        limit,
        konkName,
        prodName,
        signal: signal ?? querySignal,
      }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
