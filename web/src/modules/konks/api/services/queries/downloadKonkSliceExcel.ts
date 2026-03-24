import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkSliceExcelResult {
  blob: Blob;
  filename: string;
}

export const downloadKonkSliceExcel = async (
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<DownloadKonkSliceExcelResult> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  const res = await apiClient.get<Blob>(`sku-slices/konk/excel?${params.toString()}`, {
    responseType: "blob",
    signal,
  });

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_slice_konk_${konk}_${prod}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
