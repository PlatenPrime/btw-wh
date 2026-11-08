import { deleteSkuStockBand } from "@/modules/sku-stock-bands/api/services/mutations/deleteSkuStockBand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteSkuStockBandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSkuStockBand(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["sku-stock-bands"] });
      toast.success("Діапазон видалено");
    },
    onError: (error: Error) => {
      toast.error("Помилка видалення діапазону", {
        description: error.message,
      });
    },
  });
}
