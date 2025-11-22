import { recalculateZonesSectors } from "@/modules/blocks/api/services/mutations/recalculateZonesSectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export function useRecalculateZonesSectorsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => recalculateZonesSectors({}),
    onSuccess: (data) => {
      // Инвалидируем все query, связанные с зонами и блоками, чтобы обновить сектора
      queryClient.invalidateQueries({ queryKey: ["zones"] }); // Все зоны
      queryClient.invalidateQueries({ queryKey: ["zones-infinite"] }); // Infinite query зон
      queryClient.invalidateQueries({ queryKey: ["zones", "by-block"] }); // Зоны по блокам
      queryClient.invalidateQueries({ queryKey: ["blocks"] }); // Блоки
      
      toast.success(
        `Сектора успішно перераховано. Оновлено ${data.data.updatedZones} зон у ${data.data.blocksProcessed} блоках`
      );
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      toast.error(errorData?.message || error.message || "Помилка перерахунку секторів");
    },
  });
}

