import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadSkusExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadInvalidSkusExcel = async (
  konkName: string,
  signal?: AbortSignal,
): Promise<DownloadSkusExcelResult> => {
  const path = `skus/konk/${encodeURIComponent(konkName)}/invalid-excel`;
  const res = await apiClient.get<Blob>(path, {
    responseType: "blob",
    signal,
  });

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `skus_invalid_${konkName}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return { blob: res.data, filename };
};
