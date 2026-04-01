import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkugrSalesExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadSkugrSalesExcel = async (
  skugrId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadSkugrSalesExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `sku-slices/skugr/${skugrId}/sales-excel?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_sales_skugr_${skugrId}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
