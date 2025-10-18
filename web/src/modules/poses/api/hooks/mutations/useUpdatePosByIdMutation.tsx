import { updatePos } from "@/modules/poses/api/services";
import type { UpdatePosDto } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePosByIdMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePosDto }) =>
      updatePos(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
    },
  });
}
