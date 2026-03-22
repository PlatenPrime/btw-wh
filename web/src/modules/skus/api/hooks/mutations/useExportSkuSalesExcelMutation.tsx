import { getSkuSalesRange } from "@/modules/skus/api/services/queries/getSkuSalesRange";
import {
  exportSkuSalesRangeToXlsx,
  sanitizeExcelFilenamePart,
} from "@/modules/skus/utils/exportSkuSalesRangeToXlsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useExportSkuSalesExcelMutation() {
  return useMutation({
    mutationFn: async ({
      skuId,
      productId,
      dateFrom,
      dateTo,
    }: {
      skuId: string;
      productId: string;
      dateFrom: string;
      dateTo: string;
    }) => {
      const res = await getSkuSalesRange(skuId, dateFrom, dateTo);
      const items = res.data ?? [];
      if (!items.length) {
        throw new Error("Немає даних про продажі за обраний період");
      }
      const base = `sku_sales_${sanitizeExcelFilenamePart(productId)}_${dateFrom}_${dateTo}`;
      exportSkuSalesRangeToXlsx(items, base);
      return { rowCount: items.length };
    },
    onSuccess: ({ rowCount }) => {
      toast.success("Файл успішно завантажено", {
        description: `Рядків: ${rowCount}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Не вдалося сформувати Excel", {
        description: error.message,
      });
    },
  });
}
