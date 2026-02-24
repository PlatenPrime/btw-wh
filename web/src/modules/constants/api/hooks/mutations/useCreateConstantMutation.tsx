import { createConstant } from "@/modules/constants/api/services/mutations/createConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateConstantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConstant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["constants"] });
      toast.success("Константу створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення константи", {
        description: error.message,
      });
    },
  });
}
