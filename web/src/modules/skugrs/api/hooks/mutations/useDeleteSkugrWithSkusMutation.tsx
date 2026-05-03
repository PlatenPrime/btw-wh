import { deleteSkugrWithSkus } from "@/modules/skugrs/api/services/mutations/deleteSkugrWithSkus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteSkugrWithSkusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skugrId: string) => deleteSkugrWithSkus(skugrId),
    onSuccess: (res, skugrId) => {
      void queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      void queryClient.invalidateQueries({ queryKey: ["skugrs", "id", skugrId] });
      void queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
      void queryClient.invalidateQueries({ queryKey: ["skusCatalog"] });
      void queryClient.invalidateQueries({ queryKey: ["skusByKonk"] });
      const { deletedSkusCount, modifiedSkugrsCount } = res.data;
      toast.success("Групу та її товари видалено", {
        description: `Видалено SKU: ${deletedSkusCount}, оновлено інших груп: ${modifiedSkugrsCount}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося видалити групу з товарами", {
        description: error.message,
      });
    },
  });
}
