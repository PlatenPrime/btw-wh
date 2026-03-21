import { createSkugr } from "@/modules/skugrs/api/services/mutations/createSkugr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSkugrMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkugr,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      toast.success("Товарну групу успішно створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення товарної групи", {
        description: error.message,
      });
    },
  });
}
