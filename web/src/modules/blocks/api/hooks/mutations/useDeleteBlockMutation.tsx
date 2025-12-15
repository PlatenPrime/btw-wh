import { deleteBlock } from "@/modules/blocks/api/services/mutations/deleteBlock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export function useDeleteBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlock({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      // Инвалидируем segs, так как блок содержит сегменты
      queryClient.invalidateQueries({ queryKey: ["segs"] });
      toast.success("Блок успішно видалено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        toast.error("Неверний формат ID блоку");
      } else if (status === 404) {
        toast.error(errorData?.message || "Блок не знайдено");
      } else {
        toast.error(errorData?.message || error.message || "Помилка видалення блоку");
      }
    },
  });
}

