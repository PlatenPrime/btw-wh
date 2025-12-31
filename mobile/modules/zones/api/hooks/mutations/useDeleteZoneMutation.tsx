import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteZone } from "@/modules/zones/api/services/mutations/deleteZone";

export function useDeleteZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (zoneId: string) => deleteZone(zoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    },
    onError: () => {
    },
  });
}

