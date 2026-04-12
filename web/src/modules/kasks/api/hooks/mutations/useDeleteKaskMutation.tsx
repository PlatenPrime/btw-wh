import { deleteKask } from "@/modules/kasks/api/services/mutations/deleteKask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteKaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["kasks", "delete"],
    mutationFn: (id: string) => deleteKask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kasks"] });
      toast.success("Запис видалено");
    },
    onError: (error: Error) => {
      toast.error("Помилка видалення", {
        description: error.message,
      });
    },
  });
}
