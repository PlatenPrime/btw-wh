import { useMutation } from "@tanstack/react-query";
import { updateAllBtradeStocks } from "@/modules/arts/api/services/mutations/updateAllBtradeStocks";
import { toast } from "sonner";

export function useUpdateAllBtradeStocksMutation() {
  return useMutation({
    mutationFn: () => updateAllBtradeStocks(),

    onSuccess: (data) => {
      toast.success("Процес оновлення залишків Btrade запущено", {
        description: data.message,
      });
    },

    onError: (error: Error) => {
      toast.error("Помилка при запуску оновлення залишків Btrade", {
        description: error.message,
      });
    },
  });
}

