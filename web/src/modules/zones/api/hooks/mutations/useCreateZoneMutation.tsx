import { createZone } from "@/modules/zones/api/services/mutations/createZone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Зона успешно создана");
    },
    onError: (error: Error) => {
      toast.error("Ошибка создания зоны", {
        description: error.message,
      });
    },
  });
}



