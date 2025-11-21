import { deleteBlock } from "@/modules/blocks/api/services/mutations/deleteBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlock({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Блок успішно видалено");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Помилка видалення блоку");
    },
  });
}

