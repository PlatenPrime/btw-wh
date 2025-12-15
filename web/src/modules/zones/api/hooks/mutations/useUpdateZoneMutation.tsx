import { updateZone } from "@/modules/zones/api/services/mutations/updateZone";
import type { UpdateZoneDto } from "@/modules/zones/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateZoneDto }) =>
      updateZone({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones", id] });
      // Инвалидируем segs и blocks, так как зона может быть связана с сегментом
      queryClient.invalidateQueries({ queryKey: ["segs"] });
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      toast.success("Зона успешно обновлена");
    },
    onError: (error: Error) => {
      toast.error("Ошибка обновления зоны", {
        description: error.message,
      });
    },
  });
}



