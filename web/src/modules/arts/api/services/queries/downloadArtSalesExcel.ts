import { apiClient } from "@/lib/apiClient";
import type { DownloadArtExcelResult } from "@/modules/arts/api/types/art-reports";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const downloadArtSalesExcel = async (
  artikul: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadArtExcelResult> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<Blob>(
    `art-excel-reports/artikul/${encodeURIComponent(artikul)}/sales?${params.toString()}`,
    { responseType: "blob", signal },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `art_sales_${artikul}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
