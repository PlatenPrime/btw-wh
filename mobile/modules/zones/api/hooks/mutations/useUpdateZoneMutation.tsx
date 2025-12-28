import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateZone } from "@/modules/zones/api/services/mutations/updateZone";
import type { UpdateZoneDto, ZoneDto } from "@/modules/zones/api/types/dto";

export function useUpdateZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ zoneId, data }: { zoneId: string; data: UpdateZoneDto }) =>
      updateZone(zoneId, data),
    onSuccess: (updatedZone) => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      
      // Обновляем кеш для конкретной зоны
      queryClient.setQueryData(["zones"], (oldData: { data: ZoneDto[] } | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((zone) =>
            zone._id === updatedZone._id ? updatedZone : zone,
          ),
        };
      });
    },
  });
}

