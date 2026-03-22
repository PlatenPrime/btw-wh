import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkuSliceExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadSkuSliceExcel = async (
  skuId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadSkuSliceExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `sku-slices/sku/${skuId}/slice-excel?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_slice_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
