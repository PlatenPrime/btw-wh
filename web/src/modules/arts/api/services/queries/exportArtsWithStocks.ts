import { apiClient } from "@/lib/apiClient";
import type { ExportArtsWithStocksResponse } from "@/modules/arts/api/types/dto";

export const exportArtsWithStocks = async (): Promise<ExportArtsWithStocksResponse> => {
  const res = await apiClient.get("/arts/export-with-stocks", {
    responseType: "blob",
  });

  // Extract filename from Content-Disposition header
  const contentDisposition = res.headers["content-disposition"];
  const filename = contentDisposition
    ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || "arts_export_with_stocks.xlsx"
    : "arts_export_with_stocks.xlsx";

  return {
    blob: res.data,
    filename,
  };
};

