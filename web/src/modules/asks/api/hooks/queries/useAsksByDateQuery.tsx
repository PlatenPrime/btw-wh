import { getAsksByDate } from "@/modules/asks/api/services";
import type { GetAsksByDateResponse } from "@/modules/asks/api/types";
import { useDebounce } from "@shared/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseAsksByDateQueryParams {
  date: string;
  enabled?: boolean;
}

export function useAsksByDateQuery({
  date,
  enabled = true,
}: UseAsksByDateQueryParams) {
  const debouncedDate = useDebounce(date, 300);

  return useQuery<GetAsksByDateResponse>({
    queryKey: ["asks", "by-date", { date: debouncedDate }],
    queryFn: ({ signal }) =>
      getAsksByDate({
        date: debouncedDate,
        signal,
      }),
    placeholderData: keepPreviousData,
    enabled: enabled && !!debouncedDate,
    staleTime: 2 * 60 * 1000, // 2 минуты
  });
}
