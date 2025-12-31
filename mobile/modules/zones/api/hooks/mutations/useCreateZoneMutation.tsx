import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createZone } from "@/modules/zones/api/services/mutations/createZone";
import type { CreateZoneDto } from "@/modules/zones/api/types/dto";

export function useCreateZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateZoneDto) => createZone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
    onError: () => {
    },
  });
}

