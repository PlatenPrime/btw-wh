import { apiClient } from "@/lib/apiClient";
import { appendSkugrIds } from "@/modules/sku-analytics/api/utils/appendSkugrIds";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkSalesExcelResult {
  blob: Blob;
  filename: string;
}

export interface DownloadKonkSalesExcelParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  sortBy?: "sales" | "revenue";
  skugrIds?: string[];
  signal?: AbortSignal;
}

export const downloadKonkSalesExcel = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  sortBy,
  skugrIds,
  signal,
}: DownloadKonkSalesExcelParams): Promise<DownloadKonkSalesExcelResult> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  if (sortBy) {
    params.set("sortBy", sortBy);
  }
  appendSkugrIds(params, skugrIds);
  const res = await apiClient.get<Blob>(
    `sku-excel-reports/konk/sales?${params.toString()}`,
    {
      responseType: "blob",
      signal,
    },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_sales_konk_${konk}_${prod}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
