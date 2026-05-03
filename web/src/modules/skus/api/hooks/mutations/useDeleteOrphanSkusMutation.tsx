import { deleteOrphanSkus } from "@/modules/skus/api/services/mutations/deleteOrphanSkus";
import type { DeleteOrphanSkusQueryDto } from "@/modules/skus/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message;
    if (typeof msg === "string") return msg;
  }
  return error instanceof Error ? error.message : "Невідома помилка";
}

export function useDeleteOrphanSkusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filters: DeleteOrphanSkusQueryDto) => deleteOrphanSkus(filters),
    onSuccess: (data) => {
      toast.success("SKU без групи видалено", {
        description: `Видалено записів: ${data.deletedCount}`,
      });
      void queryClient.invalidateQueries({ queryKey: ["skusCatalog"] });
      void queryClient.invalidateQueries({ queryKey: ["skusByKonk"] });
      void queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
    },
    onError: (error: unknown) => {
      toast.error("Не вдалося видалити SKU без групи", {
        description: getErrorMessage(error),
      });
    },
  });
}
