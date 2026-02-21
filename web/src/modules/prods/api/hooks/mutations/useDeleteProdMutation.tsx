import { deleteProd } from "@/modules/prods/api/services/mutations/deleteProd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProdMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (prodId: string) => deleteProd(prodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prods"] });
    },
  });
}
