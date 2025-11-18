import { updateBtradeStockByArtikul } from "@/modules/arts/api/services/mutations/updateBtradeStockByArtikul";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseUpdateBtradeStockMutationProps {
  artikul: Pick<ArtDto, "artikul">;
}

export function useUpdateBtradeStockMutation({
  artikul,
}: UseUpdateBtradeStockMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artikul: string) => updateBtradeStockByArtikul(artikul),

    onSuccess: () => {
      // Инвалидируем кеш для конкретного артикула и списка артикулов
      queryClient.invalidateQueries({
        queryKey: ["art", { artikul: artikul }],
      });
      queryClient.invalidateQueries({ queryKey: ["arts"] });
      toast.success("BtradeStock успешно обновлен");
    },

    onError: (error: Error) => {
      toast.error("Ошибка обновления BtradeStock", {
        description: error.message,
      });
    },
  });
}
