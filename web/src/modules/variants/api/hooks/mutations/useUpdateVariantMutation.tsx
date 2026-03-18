import { updateVariant } from "@/modules/variants/api/services/mutations/updateVariant";
import type { UpdateVariantDto } from "@/modules/variants/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVariantDto }) =>
      updateVariant({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      queryClient.invalidateQueries({ queryKey: ["variants", "id", id] });
      toast.success("Варіант успішно оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення варіанта", {
        description: error.message,
      });
    },
  });
}

