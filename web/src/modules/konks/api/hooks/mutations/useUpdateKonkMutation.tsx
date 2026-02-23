import { updateKonk } from "@/modules/konks/api/services/mutations/updateKonk";
import type { UpdateKonkDto } from "@/modules/konks/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateKonkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateKonkDto }) =>
      updateKonk({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["konks"] });
      queryClient.invalidateQueries({ queryKey: ["konks", id] });
      toast.success("Конкурента оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення конкурента", {
        description: error.message,
      });
    },
  });
}
