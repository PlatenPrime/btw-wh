import { deleteSkugr } from "@/modules/skugrs/api/services/mutations/deleteSkugr";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSkugrMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skugrId: string) => deleteSkugr(skugrId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skugrs"] });
    },
  });
}
