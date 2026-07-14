import { runCompensatingSlice } from "@/modules/sku-analytics/api/services/mutations/runCompensatingSlice";
import type { RunCompensatingSliceResponseDto } from "@/modules/sku-analytics/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

export function useRunCompensatingSliceMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    RunCompensatingSliceResponseDto,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (konkName) => runCompensatingSlice({ konkName }),
    onSuccess: (response) => {
      const { analog, sku, sliceDate, konkName } = response.data;

      queryClient.invalidateQueries({ queryKey: ["sku-slices"] });

      toast.success("Компенсуючий зріз завершено", {
        description: `${konkName} · ${sliceDate}: analog ${analog.updated}/${analog.refetched}, sku ${sku.updated}/${sku.refetched} (оновлено/опитано)`,
      });
    },
    onError: (error) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        if (errorData?.errors && errorData.errors.length > 0) {
          const validationMessages = errorData.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          toast.error(`Помилка валідації: ${validationMessages}`);
          return;
        }

        toast.error(errorData?.message || "Помилка валідації даних");
        return;
      }

      if (status === 409) {
        toast.error(
          errorData?.message ||
            "Компенсація для цього конкурента вже виконується",
        );
        return;
      }

      toast.error(
        errorData?.message ||
          error.message ||
          "Не вдалося виконати компенсуючий зріз. Спробуйте пізніше",
      );
    },
  });
}
