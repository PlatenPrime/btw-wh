import { createDel } from "@/modules/dels/api/services/mutations/createDel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateDelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dels"] });
      toast.success("Поставку створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення поставки", {
        description: error.message,
      });
    },
  });
}
