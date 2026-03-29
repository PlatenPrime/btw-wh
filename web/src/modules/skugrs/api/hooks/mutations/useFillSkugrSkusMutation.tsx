import { fillSkugrSkus } from "@/modules/skugrs/api/services/mutations/fillSkugrSkus";
import type { FillSkugrSkusBody } from "@/modules/skugrs/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFillSkugrSkusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body?: FillSkugrSkusBody;
    }) => fillSkugrSkus({ id, body }),
    onSuccess: (res, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      queryClient.invalidateQueries({ queryKey: ["skugrs", "id", id] });
      queryClient.invalidateQueries({ queryKey: ["skusBySkugr"] });
      const s = res.stats;
      toast.success("Групу заповнено з браузера", {
        description: `Отримано: ${s.fetched}, створено: ${s.created}, додано існуючих: ${s.linkedExisting}, пропущено в групі: ${s.skippedAlreadyInGroup}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося заповнити групу", {
        description: error.message,
      });
    },
  });
}
