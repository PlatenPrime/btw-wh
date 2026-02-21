import { updateProd } from "@/modules/prods/api/services/mutations/updateProd";
import type { UpdateProdDto } from "@/modules/prods/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProdDto }) =>
      updateProd({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["prods"] });
      queryClient.invalidateQueries({ queryKey: ["prods", id] });
      toast.success("Виробника оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення виробника", {
        description: error.message,
      });
    },
  });
}
