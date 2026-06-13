import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkusExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadNewSinceSkusExcel = async (
  konkName: string,
  since: string,
  signal?: AbortSignal,
): Promise<DownloadSkusExcelResult> => {
  const params = new URLSearchParams({ konk: konkName, since });
  const path = `sku-excel-reports/catalog/new-since?${params.toString()}`;
  const res = await apiClient.get<Blob>(path, {
    responseType: "blob",
    signal,
  });

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `skus_new_since_${konkName}_${since}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return { blob: res.data, filename };
};
