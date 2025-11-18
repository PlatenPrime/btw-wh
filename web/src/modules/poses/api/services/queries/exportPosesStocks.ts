import type { SkladCode } from "@/constants/sklad";
import { apiClient } from "@/lib/apiClient";

interface ExportPosesStocksParams {
  sklad?: SkladCode;
}

interface ExportPosesStocksResponse {
  blob: Blob;
  filename: string;
}

export const exportPosesStocks = async ({
  sklad,
}: ExportPosesStocksParams): Promise<ExportPosesStocksResponse> => {
  const response = await apiClient.post(
    "/poses/export-stocks",
    {
      // сервер ожидает отсутствие поля для выгрузки по всем складам
      ...(sklad ? { sklad } : {}),
    },
    {
      responseType: "blob",
    },
  );

  const contentDisposition = response.headers["content-disposition"];
  const filename =
    contentDisposition
      ?.split("filename=")[1]
      ?.replace(/"/g, "")
      ?.trim() || `poses_stocks_${sklad ?? "all"}.xlsx`;

  return {
    blob: response.data,
    filename,
  };
};

