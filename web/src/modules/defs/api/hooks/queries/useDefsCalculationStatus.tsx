import { getCalculationStatus } from "@/modules/defs/api/services/queries/getCalculationStatus";
import type { DefsCalculationStatusResponse } from "@/modules/defs/api/types/dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useDefsCalculationStatus() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["defs", "calculation-status"],
    queryFn: getCalculationStatus,
    refetchInterval: () => {
      // Получаем данные из кеша для проверки статуса
      const cachedData =
        queryClient.getQueryData<DefsCalculationStatusResponse>([
          "defs",
          "calculation-status",
        ]);
      return cachedData?.data?.isRunning ? 5000 : false;
    },
    refetchIntervalInBackground: true,
    enabled: false, // Включаем только когда нужно
  });
}
