import type { SkladCode } from "@/constants/sklad";
import { apiClient } from "@/lib/apiClient";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

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
  const fallbackFilename = `poses_stocks_${sklad ?? "all"}.xlsx`;
  const filename = parseContentDisposition(contentDisposition, fallbackFilename);

  return {
    blob: response.data,
    filename,
  };
};

