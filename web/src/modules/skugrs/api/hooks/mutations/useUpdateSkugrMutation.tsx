import { updateSkugr } from "@/modules/skugrs/api/services/mutations/updateSkugr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateSkugrMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkugr,
    onSuccess: (_res, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["skugrs"] });
      queryClient.invalidateQueries({ queryKey: ["skugrs", "id", id] });
      toast.success("Товарну групу оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення товарної групи", {
        description: error.message,
      });
    },
  });
}
