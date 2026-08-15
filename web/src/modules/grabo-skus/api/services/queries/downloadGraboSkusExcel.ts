import { apiClient } from "@/lib/apiClient";
import type { DownloadGraboSkusExcelResult } from "@/modules/grabo-skus/api/types";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const downloadGraboSkusExcel = async (
  signal?: AbortSignal,
): Promise<DownloadGraboSkusExcelResult> => {
  const res = await apiClient.get<Blob>("/grabo-skus/excel", {
    responseType: "blob",
    signal,
  });

  const contentDisposition = res.headers["content-disposition"];
  const filename = parseContentDisposition(
    contentDisposition,
    "graboskus.xlsx",
  );

  return { blob: res.data, filename };
};
