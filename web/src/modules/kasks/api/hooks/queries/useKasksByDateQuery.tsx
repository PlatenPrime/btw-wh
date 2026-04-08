import { useDebounce } from "@/hooks/useDebounce";
import { getKasksByDate } from "@/modules/kasks/api/services/queries/getKasksByDate";
import type { GetKasksByDateResponse } from "@/modules/kasks/api/types/dto";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseKasksByDateQueryParams {
  date: string;
  enabled?: boolean;
}

export function useKasksByDateQuery({
  date,
  enabled = true,
}: UseKasksByDateQueryParams) {
  const debouncedDate = useDebounce(date, 500);

  return useQuery<GetKasksByDateResponse>({
    queryKey: ["kasks", "by-date", { date: debouncedDate }],
    queryFn: ({ signal }) =>
      getKasksByDate({ date: debouncedDate, signal }),
    placeholderData: keepPreviousData,
    enabled: enabled && !!debouncedDate,
    staleTime: 2 * 60 * 1000,
  });
}
