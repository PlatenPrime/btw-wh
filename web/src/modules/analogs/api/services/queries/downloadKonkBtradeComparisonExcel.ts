import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkBtradeComparisonExcelParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  signal?: AbortSignal;
}

export interface DownloadKonkBtradeComparisonExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadKonkBtradeComparisonExcel = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  signal,
}: DownloadKonkBtradeComparisonExcelParams): Promise<DownloadKonkBtradeComparisonExcelResult> => {
  const params = new URLSearchParams({
    konk,
    prod,
    dateFrom,
    dateTo,
  });

  const res = await apiClient.get<Blob>(
    `analog-slices/konk-btrade/comparison-excel?${params.toString()}`,
    {
      responseType: "blob",
      signal,
    },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `konk_btrade_comparison_${konk}_${prod}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};

