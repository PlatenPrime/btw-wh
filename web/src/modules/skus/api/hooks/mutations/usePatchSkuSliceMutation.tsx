import { patchSkuSlice } from "@/modules/skus/api/services/mutations/patchSkuSlice";
import type {
  PatchSkuSliceBodyDto,
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

export function usePatchSkuSliceMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PatchSkuSliceResponseDto,
    AxiosError<ApiErrorResponse>,
    PatchSkuSliceVariables
  >({
    mutationFn: ({ skuId, body }) => patchSkuSlice(skuId, body),
    onSuccess: (response, { skuId, body }) => {
      void queryClient.invalidateQueries({ queryKey: ["sku-slices"] });
      void queryClient.invalidateQueries({
        queryKey: ["sku-sales-reports", "sales-range", skuId],
      });

      const { stock, price, previous } = response.data;
      const nextPoint = formatPoint(stock, price);
      toast.success("Зріз оновлено", {
        description: previous
          ? `${body.date}: ${formatPoint(previous.stock, previous.price)} → ${nextPoint}`
          : `${body.date}: ${nextPoint}`,
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
        toast.error(
          errorData?.message ||
            "Немає SKU або документа зрізу на цю дату",
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
