import { updateSkuStockBand } from "@/modules/sku-stock-bands/api/services/mutations/updateSkuStockBand";
import type { UpdateSkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSkuStockBandMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSkuStockBandDto }) =>
      updateSkuStockBand({ id, data }),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ["sku-stock-bands"] });
      void queryClient.invalidateQueries({ queryKey: ["sku-stock-bands", id] });
      toast.success("Діапазон оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення діапазону", {
        description: error.message,
      });
    },
  });
}
