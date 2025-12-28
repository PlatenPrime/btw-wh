import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calculateDefs } from "@/modules/defs/api/services/mutations/calculateDefs";

export function useCalculateDefsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => calculateDefs(),
    onSuccess: () => {
      // Инвалидируем кеш статуса расчета, чтобы начать отслеживание
      queryClient.invalidateQueries({
        queryKey: ["defs", "calculation-status"],
      });
      // Инвалидируем кеш latest, чтобы после завершения расчета получить обновленные данные
      queryClient.invalidateQueries({
        queryKey: ["defs", "latest"],
      });
    },
  });
}
