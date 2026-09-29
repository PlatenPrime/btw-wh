import { runSkugrSlicesToday } from "@/modules/sku-analytics/api/services/mutations/runSkugrSlicesToday";
import type { RunSkugrSlicesTodayResponseDto } from "@/modules/sku-analytics/api/types";
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

export function useRunSkugrSlicesTodayMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    RunSkugrSlicesTodayResponseDto,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (skugrId) => runSkugrSlicesToday({ skugrId }),
    onSuccess: (response) => {
      const { sliceDate, total, count, invalid, errors, konkName } =
        response.data;

      void queryClient.invalidateQueries({ queryKey: ["sku-slices"] });

      toast.success("Зрізи групи зібрано", {
        description: `${konkName} · ${sliceDate}: ${count}/${total} ок, invalid ${invalid}, errors ${errors}`,
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

      if (status === 404) {
        toast.error(errorData?.message || "Товарну групу не знайдено");
        return;
      }

      if (status === 409) {
        toast.error(
          errorData?.message ||
            "Scrape цієї групи вже виконується — зачекайте",
        );
        return;
      }

      if (status === 401 || status === 403) {
        toast.error(
          errorData?.message || "Недостатньо прав для збору зрізів групи",
        );
        return;
      }

      toast.error(
        errorData?.message ||
          error.message ||
          "Не вдалося зібрати зрізи. Спробуйте пізніше",
      );
    },
  });
}
