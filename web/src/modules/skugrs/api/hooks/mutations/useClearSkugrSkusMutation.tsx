import { clearSkugrSkus } from "@/modules/skugrs/api/services/mutations/clearSkugrSkus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useClearSkugrSkusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skugrId: string) => clearSkugrSkus(skugrId),
    onSuccess: (_res, skugrId) => {
      void queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      void queryClient.invalidateQueries({ queryKey: ["skugrs", "id", skugrId] });
      void queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
      void queryClient.invalidateQueries({ queryKey: ["skusCatalog"] });
      toast.success("Склад групи очищено", {
        description: "Посилання на SKU у групі видалено; картки товарів у базі залишились.",
      });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося очистити групу", {
        description: error.message,
      });
    },
  });
}
