import { deleteVariant } from "@/modules/variants/api/services/mutations/deleteVariant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariant,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.removeQueries({ queryKey: ["variants", "id", id] });
      toast.success("Варіант успішно видалено");
    },
    onError: (error: Error) => {
      toast.error("Помилка видалення варіанта", {
        description: error.message,
      });
    },
  });
}

