import { updateAnalog } from "@/modules/analogs/api/services/mutations/updateAnalog";
import type { UpdateAnalogDto } from "@/modules/analogs/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateAnalogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnalogDto }) =>
      updateAnalog({ id, data }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["analogs"] });
      queryClient.invalidateQueries({ queryKey: ["analogs", "id", id] });
      toast.success("Аналог успішно оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення аналога", {
        description: error.message,
      });
    },
  });
}
