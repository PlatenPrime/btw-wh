import { createAnalog } from "@/modules/analogs/api/services/mutations/createAnalog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateAnalogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analogs"] });
      toast.success("Аналог успішно створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення аналога", {
        description: error.message,
      });
    },
  });
}
