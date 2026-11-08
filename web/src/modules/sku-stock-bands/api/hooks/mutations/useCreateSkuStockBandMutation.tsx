import { createSkuStockBand } from "@/modules/sku-stock-bands/api/services/mutations/createSkuStockBand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSkuStockBandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkuStockBand,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["sku-stock-bands"] });
      toast.success("Діапазон створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення діапазону", {
        description: error.message,
      });
    },
  });
}
