import { getCalculationStatus } from "@/modules/defs/api/services/queries/getCalculationStatus";
import type { DefsCalculationStatusResponse } from "@/modules/defs/api/types/dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface UseDefsCalculationStatusOptions {
  enabled?: boolean;
  onStatusChange?: (status: DefsCalculationStatusResponse | undefined) => void;
}

export function useDefsCalculationStatus({
  enabled = false,
  onStatusChange,
}: UseDefsCalculationStatusOptions = {}) {
  const previousStatusRef = useRef<DefsCalculationStatusResponse | undefined>(
    undefined,
  );
  const [shouldPoll, setShouldPoll] = useState(false);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["defs", "calculation-status"],
    queryFn: getCalculationStatus,
    refetchInterval: shouldPoll ? 5000 : false,
    refetchIntervalInBackground: true,
    enabled,
    staleTime: 0,
    gcTime: 0,
  });

  // Отслеживаем изменения статуса и управляем polling
  useEffect(() => {
    if (query.data && query.data !== previousStatusRef.current) {
      const previousData = previousStatusRef.current;
      previousStatusRef.current = query.data;
      onStatusChange?.(query.data);

      // Управляем polling в зависимости от статуса
      if (query.data.data?.isRunning) {
        setShouldPoll(true);
      } else {
        setShouldPoll(false);

        // Если расчет завершился (был запущен, а теперь остановлен), обновляем latest
        if (previousData?.data?.isRunning && !query.data.data?.isRunning) {
          queryClient.invalidateQueries({
            queryKey: ["defs", "latest"],
          });
        }
      }
    }
  }, [query.data, onStatusChange, queryClient]);

  // Включаем polling при enabled
  useEffect(() => {
    if (enabled) {
      setShouldPoll(true);
    } else {
      setShouldPoll(false);
    }
  }, [enabled]);

  return query;
}
