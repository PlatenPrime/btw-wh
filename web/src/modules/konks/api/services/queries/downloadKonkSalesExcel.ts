import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkSalesExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadKonkSalesExcel = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadKonkSalesExcelResult> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `sku-slices/konk/sales-excel?${params.toString()}`,
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
