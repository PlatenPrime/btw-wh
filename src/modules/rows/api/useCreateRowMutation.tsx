import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRowDto } from "../types/dto";
import { createRow } from "./createRow";

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
