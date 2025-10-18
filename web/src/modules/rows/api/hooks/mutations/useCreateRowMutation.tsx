import { createRow } from "@/modules/rows/api/services";
import type { CreateRowDto } from "@/modules/rows/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRowDto) => createRow(data),
    onSuccess: () => {
      // Invalidate and refetch rows list
      queryClient.invalidateQueries({ queryKey: ["rows"] });
    },
  });
}
