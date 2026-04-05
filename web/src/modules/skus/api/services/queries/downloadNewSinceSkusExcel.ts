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
  const params = new URLSearchParams({ since });
  const path = `skus/konk/${encodeURIComponent(konkName)}/new-since-excel?${params.toString()}`;
  const res = await apiClient.get<Blob>(path, {
    responseType: "blob",
    signal,
  });

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `skus_new_since_${konkName}_${since}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return { blob: res.data, filename };
};
