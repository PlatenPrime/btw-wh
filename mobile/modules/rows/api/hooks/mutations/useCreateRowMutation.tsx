import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRow } from "@/modules/rows/api/services/mutations/createRow";
import type { CreateRowDto } from "@/modules/rows/api/types/dto";

export function useCreateRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRowDto) => createRow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rows"] });
    },
    onError: () => {
    },
  });
}

