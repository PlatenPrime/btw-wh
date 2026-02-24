import { updateConstant } from "@/modules/constants/api/services/mutations/updateConstant";
import type { UpdateConstantDto } from "@/modules/constants/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateConstantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateConstantDto }) =>
      updateConstant({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["constants"] });
      queryClient.invalidateQueries({ queryKey: ["constants", id] });
      toast.success("Константу оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення константи", {
        description: error.message,
      });
    },
  });
}
