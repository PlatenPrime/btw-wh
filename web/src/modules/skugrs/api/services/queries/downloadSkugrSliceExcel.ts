import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkugrSliceExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadSkugrSliceExcel = async (
  skugrId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadSkugrSliceExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `sku-slices/skugr/${skugrId}/slice-excel?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_slice_skugr_${skugrId}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
