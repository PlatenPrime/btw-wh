import { purgePromotedFromNewsku } from "@/modules/skugrs/api/services/mutations/purgePromotedFromNewsku";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePurgePromotedFromNewskuMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => purgePromotedFromNewsku(),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      void queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
      void queryClient.invalidateQueries({ queryKey: ["skusCatalog"] });

      const { groupsModified, uniqueSkusRemoved, linksRemoved } = res.data;
      toast.success("Новинки очищено від дублікатів", {
        description: `Груп змінено: ${groupsModified}. Унікальних SKU: ${uniqueSkusRemoved}. Посилань прибрано: ${linksRemoved}.`,
      });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося очистити Новинки", {
        description: error.message,
      });
    },
  });
}
