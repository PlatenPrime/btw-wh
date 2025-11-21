import { createBlock } from "@/modules/blocks/api/services/mutations/createBlock";
import type { CreateBlockDto } from "@/modules/blocks/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlockDto) => createBlock({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Блок успішно створено");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Помилка створення блоку");
    },
  });
}

