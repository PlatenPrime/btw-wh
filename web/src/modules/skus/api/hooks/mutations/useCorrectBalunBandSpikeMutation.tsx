import { correctBalunBandSpike } from "@/modules/skus/api/services/mutations/correctBalunBandSpike";
import type {
  CorrectBalunBandSpikeBodyDto,
  CorrectBalunBandSpikeResponseDto,
} from "@/modules/skus/api/types";
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

interface CorrectBalunBandSpikeVariables {
  skuId: string;
  body: CorrectBalunBandSpikeBodyDto;
}

function toDateLabel(value: string): string {
  return value.slice(0, 10);
}

export function useCorrectBalunBandSpikeMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CorrectBalunBandSpikeResponseDto,
    AxiosError<ApiErrorResponse>,
    CorrectBalunBandSpikeVariables
  >({
    mutationFn: ({ skuId, body }) => correctBalunBandSpike(skuId, body),
    onSuccess: (response, { skuId, body }) => {
      const { data } = response;
      const apply = body.apply === true;

      if (apply && data.applied) {
        void queryClient.invalidateQueries({ queryKey: ["sku-slices"] });
        void queryClient.invalidateQueries({
          queryKey: ["sku-sales-reports", "sales-range", skuId],
        });
        toast.success("Band-spike виправлено", {
          description: `${toDateLabel(data.window.dateFrom)}–${toDateLabel(data.window.dateTo)} · патчів ${data.patches.length}`,
        });
        return;
      }

      if (apply && !data.applied) {
        toast.info("Нічого не застосовано", {
          description:
            data.patches.length === 0
              ? "Немає патчів для запису"
              : "Сервер не записав зміни",
        });
        return;
      }

      if (data.patches.length === 0) {
        toast.info("Патчів немає", {
          description:
            data.skipped.length > 0
              ? `Пропущено вікон: ${data.skipped.length}`
              : "Sandwich band-spike у періоді не знайдено",
        });
        return;
      }

      toast.success("Preview готовий", {
        description: `Патчів ${data.patches.length}${
          data.skipped.length > 0 ? ` · пропущено ${data.skipped.length}` : ""
        }`,
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
        toast.error(errorData?.message || "Помилка валідації / не balun SKU");
        return;
      }

      if (status === 404) {
        toast.error(
          errorData?.message || "Немає SKU або порожній productId",
        );
        return;
      }

      if (status === 401 || status === 403) {
        toast.error(
          errorData?.message || "Недостатньо прав для band-spike корекції",
        );
        return;
      }

      toast.error(
        errorData?.message ||
          error.message ||
          "Не вдалося виправити band-spike. Спробуйте пізніше",
      );
    },
  });
}
