import { deleteZone } from "@/modules/zones/api/services/mutations/deleteZone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteZoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteZone,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      queryClient.removeQueries({ queryKey: ["zones", id] });
      toast.success("Зона успешно удалена");
    },
    onError: (error: Error) => {
      toast.error("Ошибка удаления зоны", {
        description: error.message,
      });
    },
  });
}



