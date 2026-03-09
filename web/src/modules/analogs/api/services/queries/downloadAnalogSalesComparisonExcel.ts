import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadAnalogSalesComparisonExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadAnalogSalesComparisonExcel = async (
  analogId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadAnalogSalesComparisonExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `analog-slices/analog/${analogId}/sales-comparison-excel?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `analog_sales_comparison_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
