import { deleteInvalidSkus } from "@/modules/skus/api/services/mutations/deleteInvalidSkus";
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

export function useDeleteInvalidSkusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ konkName }: { konkName: string }) =>
      deleteInvalidSkus(konkName),
    onSuccess: (data) => {
      toast.success("Невалідні SKU видалено", {
        description: `Видалено записів: ${data.deletedCount}`,
      });
      void queryClient.invalidateQueries({ queryKey: ["skusCatalog"] });
      void queryClient.invalidateQueries({ queryKey: ["skusByKonk"] });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося видалити SKU", {
        description: getErrorMessage(error),
      });
    },
  });
}
