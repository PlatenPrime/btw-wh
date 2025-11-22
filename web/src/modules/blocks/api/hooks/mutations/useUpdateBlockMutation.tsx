import { updateBlock } from "@/modules/blocks/api/services/mutations/updateBlock";
import type { UpdateBlockDto } from "@/modules/blocks/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
  duplicateFields?: string[];
}

export function useUpdateBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlockDto }) =>
      updateBlock({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["blocks", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast.success("Блок успішно оновлено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        // Ошибка валидации
        if (errorData?.errors && errorData.errors.length > 0) {
          const validationMessages = errorData.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          toast.error(`Помилка валідації: ${validationMessages}`);
        } else {
          toast.error(errorData?.message || "Помилка валідації даних");
        }
      } else if (status === 404) {
        // Блок или зоны не найдены
        toast.error(errorData?.message || "Блок або зони не знайдено");
      } else if (status === 409) {
        // Дубликат title
        if (errorData?.duplicateFields?.includes("title")) {
          toast.error("Блок з таким назвою вже існує");
        } else {
          toast.error(errorData?.message || "Конфлікт даних");
        }
      } else {
        // Другие ошибки (500, network и т.д.)
        toast.error(errorData?.message || error.message || "Помилка оновлення блоку");
      }
    },
  });
}

