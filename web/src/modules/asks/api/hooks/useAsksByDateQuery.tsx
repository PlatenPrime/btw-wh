import { useDebounce } from "@/hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAsksByDate } from "../services/getAsksByDate";
import type { GetAsksByDateResponse } from "../types/dto";

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
