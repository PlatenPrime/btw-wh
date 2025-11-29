import { apiClient } from "@/lib/apiClient";
import type { ExportArtsWithStocksResponse } from "@/modules/arts/api/types/dto";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const exportArtsWithStocks = async (): Promise<ExportArtsWithStocksResponse> => {
  const res = await apiClient.get("/arts/export-with-stocks", {
    responseType: "blob",
  });

  const contentDisposition = res.headers["content-disposition"];
  const filename = parseContentDisposition(contentDisposition, "arts_export_with_stocks.xlsx");

  return {
    blob: res.data,
    filename,
  };
};

