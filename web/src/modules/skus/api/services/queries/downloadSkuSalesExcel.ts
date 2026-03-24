import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkuSalesExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadSkuSalesExcel = async (
  skuId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadSkuSalesExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `sku-slices/sku/${skuId}/sales-excel?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_sales_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
