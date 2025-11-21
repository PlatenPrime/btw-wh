import { updateBlock } from "@/modules/blocks/api/services/mutations/updateBlock";
import type { UpdateBlockDto } from "@/modules/blocks/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlockDto }) =>
      updateBlock({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["blocks", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Блок успішно оновлено");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Помилка оновлення блоку");
    },
  });
}

