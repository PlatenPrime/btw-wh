import { getLatestDefs } from "@/modules/defs/api/services/queries/getLatestDefs";
import { useQuery } from "@tanstack/react-query";

export function useLatestDefsQuery() {
  return useQuery({
    queryKey: ["defs", "latest"],
    queryFn: () => getLatestDefs(),
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: 1,
    // Добавляем polling для автоматического обновления после расчета
    refetchInterval: 30000, // Каждые 30 секунд
    refetchIntervalInBackground: true,
  });
}
