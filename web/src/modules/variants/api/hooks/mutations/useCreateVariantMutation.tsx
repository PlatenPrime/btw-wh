import { createVariant } from "@/modules/variants/api/services/mutations/createVariant";
import type { CreateVariantDto } from "@/modules/variants/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variants"] });
      toast.success("Варіант успішно створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення варіанта", {
        description: error.message,
      });
    },
  });
}

export type { CreateVariantDto };

