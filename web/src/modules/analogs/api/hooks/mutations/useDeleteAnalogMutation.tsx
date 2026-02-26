import { deleteAnalog } from "@/modules/analogs/api/services/mutations/deleteAnalog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteAnalogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnalog,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["analogs"] });
      queryClient.removeQueries({ queryKey: ["analogs", "id", id] });
      toast.success("Аналог успішно видалено");
    },
    onError: (error: Error) => {
      toast.error("Помилка видалення аналога", {
        description: error.message,
      });
    },
  });
}
