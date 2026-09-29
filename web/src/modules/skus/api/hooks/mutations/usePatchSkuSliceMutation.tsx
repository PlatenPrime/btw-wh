import { patchSkuSlice } from "@/modules/skus/api/services/mutations/patchSkuSlice";
import type {
  PatchSkuSliceBodyDto,
  PatchSkuSliceDayResultDto,
  PatchSkuSliceRangeResultDto,
  PatchSkuSliceResponseDto,
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

interface PatchSkuSliceVariables {
  skuId: string;
  body: PatchSkuSliceBodyDto;
}

function formatPoint(stock: number, price: number): string {
  return `${stock} / ${price}`;
}

function isDayResult(
  data: PatchSkuSliceResponseDto["data"],
): data is PatchSkuSliceDayResultDto {
  return "date" in data && !("dateFrom" in data);
}

function isRangeResult(
  data: PatchSkuSliceResponseDto["data"],
): data is PatchSkuSliceRangeResultDto {
  return "dateFrom" in data && "dateTo" in data;
}

function toDateLabel(value: string): string {
  return value.slice(0, 10);
}

export function usePatchSkuSliceMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PatchSkuSliceResponseDto,
    AxiosError<ApiErrorResponse>,
    PatchSkuSliceVariables
  >({
    mutationFn: ({ skuId, body }) => patchSkuSlice(skuId, body),
    onSuccess: (response, { skuId }) => {
      void queryClient.invalidateQueries({ queryKey: ["sku-slices"] });
      void queryClient.invalidateQueries({
        queryKey: ["sku-sales-reports", "sales-range", skuId],
      });

      const { data } = response;
      const nextPoint = formatPoint(data.stock, data.price);

      if (isDayResult(data)) {
        const dateLabel = toDateLabel(data.date);
        toast.success("Зріз оновлено", {
          description: data.previous
            ? `${dateLabel}: ${formatPoint(data.previous.stock, data.previous.price)} → ${nextPoint}`
            : `${dateLabel}: ${nextPoint}${data.created ? " (створено)" : ""}`,
        });
        return;
      }

      if (isRangeResult(data)) {
        toast.success("Зріз оновлено за період", {
          description: `${toDateLabel(data.dateFrom)}–${toDateLabel(data.dateTo)}: ${nextPoint} · днів ${data.updatedCount}`,
        });
      }
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
        toast.error(
          errorData?.message || "Немає SKU або порожній productId",
        );
        return;
      }

      if (status === 401 || status === 403) {
        toast.error(errorData?.message || "Недостатньо прав для правки зрізу");
        return;
      }

      toast.error(
        errorData?.message ||
          error.message ||
          "Не вдалося оновити зріз. Спробуйте пізніше",
      );
    },
  });
}
