import { createProd } from "@/modules/prods/api/services/mutations/createProd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prods"] });
      toast.success("Виробника створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення виробника", {
        description: error.message,
      });
    },
  });
}
