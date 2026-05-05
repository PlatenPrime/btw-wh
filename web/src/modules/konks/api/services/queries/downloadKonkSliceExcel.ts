import { apiClient } from "@/lib/apiClient";
import { appendSkugrIds } from "@/modules/sku-slices/api/utils/appendSkugrIds";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export interface DownloadKonkSliceExcelResult {
  blob: Blob;
  filename: string;
}

export interface DownloadKonkSliceExcelParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds?: string[];
  signal?: AbortSignal;
}

export const downloadKonkSliceExcel = async ({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  signal,
}: DownloadKonkSliceExcelParams): Promise<DownloadKonkSliceExcelResult> => {
  const params = new URLSearchParams({ konk, prod, dateFrom, dateTo });
  appendSkugrIds(params, skugrIds);
  const res = await apiClient.get<Blob>(
    `sku-slices/konk/excel?${params.toString()}`,
    {
      responseType: "blob",
      signal,
    },
  );

  const contentDisposition = res.headers["content-disposition"];
  const fallbackFilename = `sku_slice_konk_${konk}_${prod}_${dateFrom}_${dateTo}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: res.data,
    filename,
  };
};
