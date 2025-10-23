import { bulkCreateZones } from "@/modules/zones/api/services/mutations/bulkCreateZones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useBulkCreateZonesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCreateZones,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Массовое создание завершено", {
        description: `Создано: ${data.results.created}, Пропущено: ${data.results.skipped}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Ошибка массового создания зон", {
        description: error.message,
      });
    },
  });
}

