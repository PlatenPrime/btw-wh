import { createKask } from "@/modules/kasks/api/services/mutations/createKask";
import type { CreateKaskDto } from "@/modules/kasks/api/types/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateKaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateKaskDto) => createKask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kasks"] });
      toast.success("Запит до каси створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення", {
        description: error.message,
      });
    },
  });
}
