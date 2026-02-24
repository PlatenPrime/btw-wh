import { deleteConstant } from "@/modules/constants/api/services/mutations/deleteConstant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteConstantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (constantId: string) => deleteConstant(constantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["constants"] });
      toast.success("Константу видалено");
    },
    onError: (error: Error) => {
      toast.error("Помилка видалення константи", {
        description: error.message,
      });
    },
  });
}
