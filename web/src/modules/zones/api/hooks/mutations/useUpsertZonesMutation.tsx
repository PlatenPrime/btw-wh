import { upsertZones } from "@/modules/zones/api/services/mutations/upsertZones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpsertZonesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertZones,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Массовое создание/обновление завершено", {
        description: `Создано: ${data.result.upsertedCount}, Обновлено: ${data.result.modifiedCount}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Ошибка массового создания/обновления зон", {
        description: error.message,
      });
    },
  });
}
