import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkSalesComparisonExcelParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  abc?: string;
  sortBy?: "abc";
  signal?: AbortSignal;
}

export interface DownloadKonkSalesComparisonExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadKonkSalesComparisonExcel = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  abc,
  sortBy,
  signal,
}: DownloadKonkSalesComparisonExcelParams): Promise<DownloadKonkSalesComparisonExcelResult> => {
  const params = new URLSearchParams({
    konk,
    prod,
    dateFrom,
    dateTo,
  });
  if (abc) {
    params.set("abc", abc);
  }
  if (sortBy === "abc") {
    params.set("sortBy", sortBy);
  }

  const res = await apiClient.get<Blob>(
    `analog-slices/konk-btrade/sales-comparison-excel?${params.toString()}`,
    {
      responseType: "blob",
      signal,
    },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sales_comparison_${konk}_${prod}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
