import { createKonk } from "@/modules/konks/api/services/mutations/createKonk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateKonkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKonk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["konks"] });
      toast.success("Конкурента створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення конкурента", {
        description: error.message,
      });
    },
  });
}
